import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setConnections} from "../utils/connectionsSlice"
import { useSelector } from 'react-redux';
import ConnectionCard from './ConnectionCard';
import {URL} from "../Constants";
import UserCard from './UserCard';

const Connections = () => {
    const dispatch = useDispatch();
    const connectionsData = useSelector((store)=> store.connections?.data);

    console.log("connectionsDataInComponent", connectionsData);
    try{
    const handleConnections = async()=>{
        const res = await axios.get(
            URL + "user/connections",
            { withCredentials: true }
        )

        console.log("connectionsFromBackend", res.data);

        dispatch(setConnections(res.data));
    }

    useEffect(()=>{
        handleConnections()
    },[])

    console.log("connectionsDataAfterDispatch", connectionsData);

    

    }
    catch(err){
        console.log("Error while fetching connections", err);
    }


    if (!connectionsData) return;

    if (connectionsData.length === 0) return <h1> No Connections Found</h1>;
    

  return (
  connectionsData && (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Title Bar */}
      <div className="w-full py-6 bg-gradient-to-r from-indigo-600 via-rose-500 to-yellow-400 shadow-md">
        <h1 className="text-3xl text-white font-bold text-center tracking-wide">
          Connections
        </h1>
        <p className="text-center text-white/80 text-sm mt-1">
          People you are connected with
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex justify-center py-8 px-4">
        <div className="w-full max-w-3xl space-y-4">
          {connectionsData.map((entry) => (
            <ConnectionCard key={entry._id ?? entry.id} connectionData={entry} />
          ))}
        </div>
      </main>
    </div>
  )
);

  }


export default Connections