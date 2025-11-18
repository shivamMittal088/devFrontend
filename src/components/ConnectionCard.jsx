import React from "react";

/**
 * Props:
 *   - connectionData: { firstName, lastName, photoURL, bio, age, gender, skills }
 */
const ConnectionCard = ({ connectionData})=> {
  const {
    firstName = "",
    lastName = "",
    photoURL = "",
    bio = "",
    age = "",
    gender = "",
    skills = [],
  } = connectionData;

  const fullName = `${firstName}${lastName ? " " + lastName : ""}`;
  const avatar = photoURL || `https://api.dicebear.com/6.x/thumbs/svg?seed=${encodeURIComponent(firstName || lastName || "user")}`;

  // handle skills coming as JSON string or array
  let parsedSkills = [];
  try {
    if (typeof skills === "string") {
      // try to parse JSON string like '["a","b"]' else fallback to comma split
      parsedSkills = JSON.parse(skills);
      if (!Array.isArray(parsedSkills)) parsedSkills = skills.split(",").map(s => s.trim());
    } else if (Array.isArray(skills)) {
      parsedSkills = skills;
    }
  } catch (e) {
    parsedSkills = (skills || "").toString().split(",").map(s => s.trim()).filter(Boolean);
  }

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
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {fullName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">{gender}</p>
          </div>

          {/* small age badge */}
          <div className="text-right">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">Age: {age ?? "—"}</span>
          </div>
        </div>

        {/* bio */}
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {bio || "This is a default bio"}
        </p>

        {/* skills */}
        {parsedSkills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {parsedSkills.slice(0, 6).map((s, i) => (
              <span
                key={s + i}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200"
              >
                {s}
              </span>
            ))}
            {parsedSkills.length > 6 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200">
                +{parsedSkills.length - 6}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ConnectionCard;