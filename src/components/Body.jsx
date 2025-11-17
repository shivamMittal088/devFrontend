import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HelloModal from "./HelloModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (user?.firstName) {
      setShowModal(true);
    }
  }, [user]);

  const fetchUser = async()=>{
    try{
      if(userData){
        return ;
      }
      
      const res = await axios.get(
        "http://localhost:5555/profile/view",
        { withCredentials:true }
      )
      console.log("Fetched user data:", res.data);

      dispatch(addUser(res.data));

    }
    catch(err){
      if(err.response.status === 401){
        navigate("/Login");
      }
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])


  return (
    <div>
      <Header />

      {/* Show modal below header */}
      {showModal && (
        <HelloModal
          name={user.firstName}
          onClose={() => setShowModal(false)}
        />
      )}

      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
