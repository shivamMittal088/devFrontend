// src/components/HelloModal.jsx
import React, { useEffect, useState } from "react";

const HelloModal = ({ name = "there", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // small enter animation
    const enter = setTimeout(() => setVisible(true), 10);

    // auto-close after 3 seconds (fade out first)
    const autoClose = setTimeout(() => {
      setVisible(false);
      // allow animation to finish before actually closing
      setTimeout(() => onClose(), 300);
    }, 5000);

    return () => {
      clearTimeout(autoClose);
      clearTimeout(enter);
    };
  }, [onClose]);

  return (
    // fixed & centered just below header
    <div
      aria-live="polite"
      className="fixed left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      style={{ top: "4.5rem" }} // tweak to sit below your header (4.5rem ~= 72px)
    >
      <div
        // pointer-events-none on outer so clicks pass through; inner card re-enables pointer events
        className={`pointer-events-auto mx-4 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        } transition-all duration-300 ease-out`}
      >
        <div className="max-w-xs w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 px-6 py-3 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-indigo-600">
            Hello {name} <span role="img" aria-label="wave">👋</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">Welcome to DevTinder!</p>
        </div>
      </div>
    </div>
  );
};

export default HelloModal;
