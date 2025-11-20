import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devLogo } from "../Constants";
import { FiLogIn } from "react-icons/fi";


const Login = () => {
  console.log("Rendering Login component");
  const [FirstName,setFirstName] = useState("");
  const [LastName ,setLastName] = useState("")
  const [age,setAge] = useState("")
  const [bio,setBio] = useState("");
  const [gender ,setGender] = useState("");
  const [photoURL , setPhotoURL] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [createAccount, setCreateAccount] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  
  

  const handleLogin = async (e) => {
    try {
      console.log("Attempting login with:", { EmailId, Password });
      e.preventDefault(); // ← important: prevents native form submit / reload
      const res = await axios.post(
        "http://localhost:5555/login", // <- ensure this port matches your backend
        { 
          emailId: EmailId, 
          password: Password 
        },
        { withCredentials: true } // to send cookies with the request
      );

      console.log("Login response:", res.data);
      dispatch(addUser(res.data)); // <- dispatch user data to Redux store
      navigate("/Feed");
    } 
    catch (err) {
      setError("Login Failed : " + err.message);
      console.error("Login error:", err.message);
    }
  };



  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5555/signup", 
        {
          firstName : FirstName,
          lastName : LastName,
          emailId : EmailId,
          password:Password,
          age : age,
          bio:bio,
          gender:gender,
          photoURL : photoURL,
        }, 
        { withCredentials: true });


    } catch (err) {
      console.log("Signup failed",err.message);
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-rose-500 to-yellow-400 p-6">
      <div className="w-full max-w-md">
        <div className="mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with logo */}
          <div className="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <img
              src={devLogo}
              alt="logo"
              className="w-12 h-12 rounded-lg object-cover shadow-md"
            />
            <div>
              <h1 className="text-white text-xl font-extrabold leading-tight">DEVTINDER</h1>
              <p className="text-white/90 text-sm">Developed for developers community</p>
            </div>
          </div>

          <div className="p-8">
            {login && (
              <h2 className="text-2xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
                Login to DevTinder
              </h2>
            )}

            {signUp && (
              <h2 className="text-2xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
                SignUp to DevTinder
              </h2>
            )}

            {/* attach onSubmit to the form (not onClick on button) */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {signUp && (
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-white">First Name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-white">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                  <label className="text-white font-semibold text-sm">Gender</label>

                  <select
                  className="w-full bg-white/90 text-gray-800 px-3 py-2 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                  onChange={(e) => setGender(e.target.value)}
                  >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  </select>
                  </div>


                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-white">Age</label>
                    <input
                      type="text"
                      placeholder="Age"
                      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-white">Bio</label>
                    <input
                      type="text"
                      placeholder="Short bio"
                      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>


                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-sm font-semibold text-white flex items-center justify-between">
                      <span>Photo URL</span>
                      <span className="text-xs text-white/70">Optional</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Photo URL"
                      className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onChange={(e) => setPhotoURL(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-white">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  required
                  value={EmailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="text-red-500 text-sm min-h-[1.25rem]">{error}</p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                {login && (
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}

                {signUp && (
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    onClick={handleSignup}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Sign Up
                  </button>
                )}

                {login && (
                  <button
                    type="button"
                    className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:opacity-95 active:scale-95 transition-all duration-200"
                    onClick={() => {
                      setLogin(false);
                      setCreateAccount(false);
                      setSignUp(true);
                    }}
                  >
                    Create Account
                  </button>
                )}

                {signUp && (
  <div className="w-full mt-4 flex justify-center">
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full shadow-lg">
      
      {/* Text */}
      <span className="text-sm text-white/90">
        Already have an account?
      </span>

      {/* Button with icon */}
      <button
        type="button"
        onClick={() => {
          setSignUp(false);
          setLogin(true);
        }}
        className="flex items-center gap-2 text-white font-semibold text-sm px-3 py-1 
                   rounded-md bg-blue-600 hover:bg-blue-700 transition"
      >
        <FiLogIn size={16} />
        Login
      </button>

    </div>
  </div>
)}



              </div>
            </form>

            <div className="mt-6 text-center text-white/80 text-sm">
              <span>By creating an account you agree to our </span>
              <a href="#" className="text-white underline">
                Terms
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
