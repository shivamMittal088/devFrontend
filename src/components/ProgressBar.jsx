import React from 'react'
import { useSelector } from 'react-redux';

const ProgressBar = () => {
    const DEFAULT_AVATAR = "/mnt/data/80ff4d7f-3670-4ccd-8f77-1585495cc937.png";

    const user = useSelector((store)=>store.user)

    const WEIGHTS = {
    firstName: 0.10,  // 10%
    lastName: 0.05,   // 5%
    age: 0.10,        // 10%
    bio: 0.20,        // 20%
    skills: 0.20,     // 20%
    photoURL: 0.20,   // 20%
    emailId: 0.10,    // 10%
    gender: 0.05,     // 5%
    };

    let count = 0;

    const computeCalculation = ()=>{
        const checks = {
            firstName : user.firstName,
            lastName : user.lastName,
            age : user.age,
            bio : user.bio && user.bio?.length > 20,
            skills : user.skills && user.skills[0]?.length > 0,
            photoURL : user.photoURL,
            emailId : user.emailId,
            gender : user.gender,
        }

        for(let [key,value] of Object.entries(checks)){
            if(value){
                count += WEIGHTS[key]
            }else{
                count += 0;
            }
        }

        const percentage = count * 100 ;
        const rounded = Math.round(percentage);
        return rounded;
    }

    const percentage = computeCalculation();

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 rounded-2xl p-5">
        
        {/* Top Row: Avatar + Percent */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || DEFAULT_AVATAR}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border shadow"
          />

          <div>
            <p className="text-gray-600 text-sm">Profile Completion</p>
            <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-inner"
            style={{
              width: `${percentage}%`,
              transition: "width 500ms ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;