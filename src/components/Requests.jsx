import React from 'react'
import axios from "axios"
import { useEffect } from "react"
import {useSelector} from "react-redux"
import RequestCard from './RequestCard'


const Requests = () => {
    const RequestReceived = async ()=>{
        const res = await axios.get(
            "http://localhost:5555/user/requests/received",
            {withCredentials:true}
        )
    }

    useEffect(()=>{
        RequestReceived();
    },[])


  return (
    <div className="flex justify-center mt-4">
      <RequestCard />
    </div>
  )
}

export default Requests;