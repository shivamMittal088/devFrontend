import React from 'react';
import axios from "axios"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeRequests } from '../utils/requestsSlice';

const RequestCard = ( {user ,requestsId })=> {
  // const photoURL = "https://rollingstoneindia.com/wp-content/uploads/2024/09/IMG_8914-1536x1152.jpg";
  // const firstName = "SHIVAM"
  // const lastName = "Mittal"
  // const gender = "male"
  // const age = 23
  // const bio = "Hello, how are you"

  const {_id ,firstName ,lastName ,gender ,age ,bio ,skills ,photoURL} = user;
  const dispatch = useDispatch();

  const handleAccept = async ()=>{
    console.log("handle click workings .....");
    try{
      const res = await axios.patch(
        `http://localhost:5555/request/review/accepted/${_id}`,
        {},
        {withCredentials : true}
      )

      console.log("accepted call made with id ",requestsId);

      dispatch(removeRequests(_id));
      // learning very imp about redux .
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <article
      className="w-full max-w-screen-lg p-2  rounded-2xl border border-black bg-transparent backdrop-blur-sm transition-transform transform hover:scale-[1.02] hover:shadow-2xl hover:bg-white/5"
      role="region"
      aria-label={`Request from ${firstName || ''} ${lastName || ''}`}>

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={photoURL || 'https://via.placeholder.com/80'}
            alt={`${firstName || 'User'} ${lastName || ''}`}
            className="h-20 w-20 rounded-full object-cover border-2 border-black/80"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold leading-tight">
            {firstName || 'First'} {lastName || 'Last'}
          </h3>
          <p className="text-sm opacity-80">{gender ? `${gender} • ${age ?? '—'} yrs` : `${age ?? '—'} yrs`}</p>
        </div>
      </div>

      <h4 className="mt-1 text-sm leading-relaxed text-justify text-black">{bio || 'No bio provided.'}</h4>

      <div className="flex gap-3 mt-1">
        <button
          className="flex-1 rounded-xl border border-black/90 bg-transparent text-sm transition-colors hover:bg-black/5 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
          aria-label="Ignore request"
        >
          Ignore
        </button>

        <button
          className="flex-1 py-2 rounded-xl bg-black text-white text-sm font-semibold transition-transform transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
          aria-label="Accept request"
          onClick = {handleAccept}
        >
          Accept
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
