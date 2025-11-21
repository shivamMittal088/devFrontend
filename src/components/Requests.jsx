import React from 'react'
import axios from "axios"
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import RequestCard from './RequestCard'
import { addRequests } from "../utils/requestsSlice"


const Requests = () => {
  const dispatch = useDispatch()
  const requestsData = useSelector((store)=>store.requests);

    try{
      const fetchRequests = async ()=>{
        const res = await axios.get(
            "http://localhost:5555/user/requests/received",
            { withCredentials : true }
        )

        console.log("Requests Received : ",res.data);
        dispatch(addRequests(res.data.data));
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    console.log("request data : ",requestsData);
    }
    catch(err){
      console.log(err);
    }

    if(!requestsData) return ;
     if (requestsData.length === 0){
      return <h1 className="flex justify-center my-10"> No Requests Found</h1>;
     }


     

  return (
    requestsData && (<div className="flex flex-col items-center mt-12 gap-8 mb-40">
      {
      requestsData.map((entity)=>{
        const {_id , firstName, lastName, photoURL , age, gender, about } = entity.fromUserId;
        const user = entity.fromUserId;
        return <RequestCard 
        key={entity._id} 
        user = {user} 
        // requestsId = {entity._id} 
        />
      })
}
    </div>
    )
  )
}

export default Requests;