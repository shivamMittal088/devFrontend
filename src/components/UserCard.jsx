const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const UserCard = ( {user ,className} ) => {

  if (!user) return null; // or return a guest card
  console.log("UserCard props.user (type):", typeof user, user);


  const { photoURL,firstName, lastName, age, gender, bio ,skills} = user;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Unknown";

  return user && (
    <div
      className={`
        w-80 bg-white rounded-2xl p-6 
        border border-gray-200 shadow-md
        transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400">
          <img
            src={photoURL || DEFAULT_AVATAR}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover bg-gray-100"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-900">{fullName}</h3>

        {/* Age + Gender */}
        <p className="text-sm text-gray-600">
          {age || "—"} <span className="mx-1">•</span> {gender || "—"}
        </p>

         <h5 className="text-l font-semibold text-gray-600">{skills}</h5>


        {/* Bio */}
        <p className="text-center text-sm text-gray-500 mt-1">
          {bio || "This user has no bio yet."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-center gap-3">
        {/* Ignore */}
        <button
          className="
            px-4 py-2 rounded-md 
            bg-gray-100 text-gray-700 border border-gray-300 
            hover:bg-gray-200 transition
          "
        >
          Ignore
        </button>

        {/* Send Request */}
        <button
          className="
            px-5 py-2 rounded-md 
            bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white shadow-md 
            hover:brightness-105 transition
          "
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default UserCard;
