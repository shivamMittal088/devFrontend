import React from 'react'
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch();

    const getFeed = async()=>{
        try{
            const res = await axios.get(
                "http://localhost:5555/feed",
                { withCredentials: true }
            );

            dispatch(addFeed(res?.data));
            console.log("Feed fetched:", res.data);
        }
        catch(err){
            console.log("Error fetching feed:", err);
        }
    }

    const feed = useSelector((store)=>store?.feed?.data??[]);
    console.log("Feed in store:", feed);
    

    useEffect(()=>{
        getFeed();
    }, []);

    if(!feed) return;
    

    
     return feed && feed.length > 0 &&(
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
        <UserCard user={feed[0]} />
    </div>
  );
}

export default Feed