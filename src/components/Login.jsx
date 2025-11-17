import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  console.log("Rendering Login component");
  const [EmailId, setEmailId] = useState("anamika123@gmail.com");
  const [Password, setPassword] = useState("anamik@123");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  

  // Use onSubmit on the form and prevent default browser submit
  const handleLogin = async (e) => {
    try {
      console.log("Attempting login with:", { EmailId, Password });
      e.preventDefault(); // ← important: prevents native form submit / reload
      const res = await axios.post(
        "http://localhost:5555/login", // <- ensure this port matches your backend
        { emailId: EmailId, password: Password },
        { withCredentials: true } // to send cookies with the request
      );
      console.log("Login response:", res.data);
      dispatch(addUser(res.data) ); // <- dispatch user data to Redux store
      navigate("/Feed");

     }
    catch (err) {
      setError("Login Failed : " + (err.message))

      console.error("Login error:",err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-rose-500 to-yellow-400 p-4">
      <div className="max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Login to DevTinder
        </h2>

        {/* attach onSubmit to the form (not onClick on button) */}
        <form className="space-y-3">
          <div>
            <label className="text-white text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-1 rounded-lg bg-white/80 focus:bg-white outline-none shadow-md"
              required
              value={EmailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-1 rounded-lg bg-white/80 focus:bg-white outline-none shadow-md"
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-red-600 text-sm">{error}</p>


          {/* keep button type submit (form handles submit) */}
          <button
            type="submit"
            className="w-24 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
