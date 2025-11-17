import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    function onDocClick(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const handleLogout = async () => {
  try {
    setOpen(false);
    await axios.post("http://localhost:5555/logout", {}, { withCredentials: true });

    // navigate first so protected components unmount
    navigate("/Login", { replace: true });

    // schedule clear after current call stack — safe because components will unmount
    setTimeout(() => dispatch(removeUser()), 0);
    // or microtask:
    // Promise.resolve().then(() => dispatch(removeUser()));
  } catch (err) {
    console.error("Logout error:", err?.response?.data || err.message);
  }
};


  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 z-50">
        <div className="backdrop-blur-sm bg-gradient-to-r from-indigo-600 via-rose-500 to-yellow-400/90 bg-opacity-90 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/20 shadow-sm ring-1 ring-white/30">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8H9L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22L9 16H15L12 22Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <div className="text-white font-extrabold text-2xl tracking-tight">DEVTINDER</div>
                <div className="text-white/80 text-sm -mt-0.5">Match with code & culture</div>
              </div>
            </div>

            {user && (
              <nav className="flex items-center gap-6">
                <div className="relative">
                  <button
                    ref={btnRef}
                    onClick={() => setOpen((s) => !s)}
                    aria-expanded={open}
                    aria-haspopup="true"
                    className="flex items-center gap-3 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <img
                        src={user?.photoURL || "https://i.pravatar.cc/64?img=47"}
                        alt="profileURL"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </button>

                  {open && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/10 transition-all"
                      role="menu"
                      aria-label="Profile menu"
                    >
                      <div className="px-4 py-3 border-b">
                        <div className="text-sm font-semibold">{user?.firstName ?? ""} {user?.lastName ?? ""}</div>
                        <div className="text-xs text-gray-500">Frontend Engineer</div>
                      </div>

                      <Link
                        to="/profile"
                        role="menuitem"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>

                      <a href="#settings" className="block w-full text-left px-4 py-3 hover:bg-gray-50">
                        Settings
                      </a>

                      <a
                        href="#logout"
                        className="px-4 hover:bg-gray-50 cursor-pointer w-full block py-3 text-left"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      <div className="h-20" />
    </>
  );
};

export default Header;
