// ConnectionsShimmer.jsx
import React from "react";

const ConnectionsShimmer = ({ count = 4 }) => {
  const items = Array.from({ length: count });

  const baseLight = "bg-gray-200";
  const midLight = "bg-gray-300";
  const baseDark = "bg-slate-700";
  const midDark = "bg-slate-600";

  return (
    <div
      role="status"
      aria-busy="true"
      className="w-full flex flex-col items-center gap-3 mt-6"
    >
      {items.map((_, i) => (
        <article
          key={i}
          className="
            w-[80%] sm:w-[60%] lg:w-[45%]     /* smaller width */
            flex items-center gap-3 p-3 rounded-lg
            bg-white/80 dark:bg-slate-900/70
            border border-black/5 dark:border-white/5
            shadow-sm animate-pulse
          "
        >
          {/* Avatar skeleton */}
          <div
            className={`
              w-10 h-10 rounded-full flex-shrink-0
              ${baseLight} dark:${baseDark}
            `}
            aria-hidden="true"
          />

          {/* Content skeleton */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className={`h-3 rounded-md w-2/3 ${midLight} dark:${midDark}`} />
            <div className={`h-2 rounded-md w-1/2 ${baseLight} dark:${baseDark}`} />

            <div className="flex gap-2 pt-1">
              <div className={`h-7 w-16 rounded-md ${midLight} dark:${midDark}`} />
              <div className={`h-7 w-10 rounded-md ${baseLight} dark:${baseDark}`} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConnectionsShimmer;
