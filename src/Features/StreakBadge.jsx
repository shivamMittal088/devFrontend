import React from "react";



const StreakBadge = ({streak}) => {
  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-2 py-2 rounded-xl shadow-md border border-white/30 animate-fadeIn cursor-pointer hover:scale-105 transition-all duration-200">
      
      {/* Flame Icon */}
      <span className="text-xs animate-pulse drop-shadow-lg">
        🔥
      </span>

      {/* Streak Number */}
      <span className="text-lg font-bold text-white tracking-wide drop-shadow-md">
        {streak} Days
      </span>
    </div>
  );
};

export default StreakBadge;
