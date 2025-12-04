import React from "react";
import { Link } from "react-router-dom";
/**
 * Props:
 *   - connectionData: { firstName, lastName, photoURL, bio, age, gender, skills }
 */
const ConnectionCard = ({ connectionData})=> {
  const {
    firstName,
    lastName,
    photoURL,
    _id,
  } = connectionData;

  const fullName = `${firstName}${lastName ? " " + lastName : ""}`;
  const avatar = photoURL || `https://api.dicebear.com/6.x/thumbs/svg?seed=${encodeURIComponent(firstName || lastName || "user")}`;

  return (
    <article
      className="
        w-full
        bg-white/90 dark:bg-slate-900/90
        border border-black/10 dark:border-white/10
        rounded-lg
        shadow-sm
        hover:shadow-md
        transition-transform
        transform hover:-translate-y-1
        p-3
        flex items-start gap-4
      "
    >
      {/* avatar */}
      <img
        src={avatar}
        alt={fullName}
        className="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-black/10"
      />

      {/* content */}
      <div className="flex-1 min-w-0 flex items-center justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {fullName}
          </h3>
        </div>

        {/* ✔ CHAT BUTTON ON RIGHT */}
        <Link
        to = { "/WebChat/" + _id }
          className="
            px-3 py-1
            text-sm
            bg-blue-500 hover:bg-blue-600
            text-white
            rounded-md
            shadow-sm
            transition
          "
        >
          Chat
        </Link>
      </div>
    </article>
  );
}

export default ConnectionCard;