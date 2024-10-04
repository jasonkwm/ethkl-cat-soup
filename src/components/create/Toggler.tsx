"use client";
import React, { useState } from "react";

const Toggler: React.FC = () => {
  const [isReplies, setIsReplies] = useState(true);
  return (
    <div className="flex text-center justify-between w-48 bg-slate-200 rounded-full">
      <button
        onClick={() => setIsReplies(true)}
        className={`px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white no-underline ${
          isReplies ? "bg-gray-500 hover:bg-gray-500" : ""
        }`}
        disabled={isReplies}
      >
        Replies
      </button>
      <button
        onClick={() => setIsReplies(false)}
        className={`px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white no-underline ${
          !isReplies ? "bg-gray-500 hover:bg-gray-500" : ""
        }`}
        disabled={!isReplies}
      >
        Requests
      </button>
    </div>
  );
};

export default Toggler;
