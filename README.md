import {useSelector} from "react-redux";
import axios from "axios";
import {useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const ProfileForm = ({user})=> {

  console.log("afdafafa:", user);

  // state variables for form fields tracking can be added here
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);

  // <-- KEEP error as null when empty (not an empty string or object)
  const [error ,setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  // ---------- minimal helper to normalize server/axios errors ----------
  const parseServerError = (err) => {
    const resp = err?.response?.data;
    if (!resp) return err?.message || "Unknown error";

    if (typeof resp === "string") return resp;

    // common Mongoose ValidationError shape
    if (resp.message && resp.errors && typeof resp.errors === "object") {
      const fieldMessages = Object.keys(resp.errors).map((k) => {
        const e = resp.errors[k];
        return e?.message ? `${k}: ${e.message}` : `${k}: ${String(e)}`;
      });
      return [resp.message, ...fieldMessages].join(" • ");
    }

    // if response has a message
    if (resp.message) return resp.message;

    // fallback
    try {
      return JSON.stringify(resp);
    } catch {
      return String(resp);
    }
  };

  const handleSaveProfile = async (e)=>{
    e?.preventDefault?.();

    // Clear Errors -> set to null (not "")
    setError(null);
    try{

      // Implement profile save logic here
      const res = await axios.patch(
        "http://localhost:5555/profile/edit",
        {
          firstName,
          lastName,
          age,
          bio,
          photoURL,
          gender,
          skills
        },
        {withCredentials: true}
      );

      console.log("Profile update response:", res);

      // update redux store
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    catch(err){
      // <-- store a friendly string (never an object)
      console.error("Profile update error:", err?.response?.data ?? err);
      setError(parseServerError(err));
    }

  }

  return user && (
     <div className="flex flex-col md:flex-row justify-center items-start md:gap-10 mt-8 px-4">

    <div
      className="w-full max-w-md mx-auto z-10 mt-2 mb-8 bg-white p-3 rounded-2xl border border-black shadow-lg space-y-4"
    >
      <h2 className="text-center text-2xl font-semibold">Edit Profile</h2>

      <label className="block text-sm">
        <span className="text-gray-700">First Name</span>
        <input 
        name="firstName" 
        className="mt-1 block w-full border rounded-md p-2" 
        value = {firstName}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        />
      </label>

      <label className="block text-sm">
        <span className="text-gray-700">Last Name</span>
        <input 
        name="lastName" 
        className="mt-1 block w-full border rounded-md p-2" 
        value={lastName} 
        onChange={(e)=>{
          setLastName(e.target.value)
        }}
        />
      </label>

      <label className="block text-sm">
        <span className="text-gray-700">Photo URL</span>
        <input 
        name="photoURL" 
        className="mt-1 block w-full border rounded-md p-2" 
        value = {photoURL}
        onChange={(e)=>{
          setPhotoURL(e.target.value)
        }} 
        />
      </label>

      <label className="block text-sm">
        <span className="text-gray-700">Gender</span>
        <select 
        name="gender" 
        className="mt-1 block w-full border rounded-md p-2"
        value={gender}
        onChange={(e)=>{
          setGender(e.target.value)
        }}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-gray-700">Age</span>
        <input 
        type="number" 
        name="age"
        className="mt-1 block w-full border rounded-md p-2" 
        value={age}
          onChange={(e)=>{
            setAge(e.target.value)
          }}
        />
      </label>


      <label className="block text-sm">
        <span className="text-gray-700">Skills</span>
        <input 
        type="text" 
        name="skills"
        className="mt-1 block w-full border rounded-md p-2" 
        value={skills}
          onChange={(e)=>{
            setSkills(e.target.value)
          }}
        />
      </label>



      <label className="block text-sm">
        <span className="text-gray-700">Bio</span>
        <textarea 
        name="bio"
        rows="3" className="mt-1 block w-full border rounded-md p-2" 
        value={bio}
        onChange={(e)=>{
          setBio(e.target.value)
        }}
        />
      </label>

      <button 
      className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      onClick={handleSaveProfile}
      >
        Save Profile
      </button>

      {/* error is always a string (or null) now */}
      {error && (
        <p className="text-red-500 text-sm text-center break-words">{error}</p>
      )}
    </div>



    {/* ============================
            Live Preview Card (UserCard)
         ============================ */}



    {user && (<UserCard 
    className="mx-auto mt-4 border-black shadow-lg"
    user={ {firstName , lastName , age , gender , bio , photoURL ,skills}} 
    />)
    }


    {showToast && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                  bg-white/80 backdrop-blur-md shadow-xl 
                  border border-gray-200 rounded-xl px-6 py-3 
                  flex items-center gap-3 animate-fadeIn">
    <svg
      className="w-6 h-6 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>

    <span className="font-medium text-gray-800">
      Profile saved successfully!
    </span>
  </div>
)}



    
    </div>
  );
}

export default ProfileForm;
