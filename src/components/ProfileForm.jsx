import {useSelector} from "react-redux";
import axios from "axios";
import {useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const ProfileForm = ()=> {

  const user = useSelector((store) => store.user);
  

  console.log("afdafafa:", user);

  // state variables for form fields tracking can be added here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [error ,setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  
// Sync local state whenever user prop changes (or appears after an async fetch)
  useEffect(() => {
  setFirstName(user?.firstName ?? "");
  setLastName(user?.lastName ?? "");
  setPhotoURL(user?.photoUrl ?? user?.photoURL ?? "");
  setAge(user?.age ?? "");
  setGender(user?.gender ?? "");
  setAbout(user?.about ?? "");
  setSkills(Array.isArray(user?.skills) ? user.skills.join(", ") : (user?.skills ?? ""));
}, [user]);

if (!user) return null;   // <--- add this line


  const handleSaveProfile = async (e)=>{
    //Clear Errors
    setError("");

    try{

    // Implement profile save logic here
    const res = await axios.patch(
      "http://localhost:5555/profile/edit",
      {
        firstName,
        lastName,
        age,
        about,
        photoURL,
        gender
      },
      {withCredentials: true}
    );

    console.log("Profile update response:", res);

    // Implement code to update the redux store if needed
    // for this basiclly we need to make reducer that helps to update user info in the store
    dispatch(addUser(res?.data));
    setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    catch(err){
      setError(err?.response?.data);
    }

  }

  return user && (
    <>
    <div
      className="w-full max-w-md mx-auto z-10 mt-16 mb-16 bg-white p-6 rounded-2xl border border-gray-200 shadow-md space-y-4"
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
        <span className="text-gray-700">About</span>
        <textarea 
        name="about"
        rows="3" className="mt-1 block w-full border rounded-md p-2" 
        value={about}
        onChange={(e)=>{
          setAbout(e.target.value)
        }}
        />
      </label>

      <button 
      className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      onClick={handleSaveProfile}
      >
        Save Profile
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>



    {/* ============================
            Live Preview Card (UserCard)
         ============================ */}





    {user && (<UserCard 
    className="mx-auto mb-16 mt-8"
    user={ {firstName , lastName , age , gender , about , photoURL ,skills}} 
    />)
    }


    {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}


    
    </>
  );
}

export default ProfileForm;