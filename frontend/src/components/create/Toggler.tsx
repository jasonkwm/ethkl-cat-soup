"use client";
import { useSurveyorContext } from "@/context/SurveyorProvider";
import React from "react";

const Toggler: React.FC = () => {
  const { toggleReplies, setToggleReplies } = useSurveyorContext();
  return (
    <div className="flex text-center justify-between w-48 bg-slate-200 rounded-full">
      <button
        onClick={() => setToggleReplies(true)}
        className={`px-4 py-2 rounded-full bg-slate-200 transition-colors text-white no-underline ${
          toggleReplies ? "!bg-custom-dark-brown hover:bg-custom-dark-brown" : ""
        }`}
        disabled={toggleReplies}
      >
        Replies
      </button>
      <button
        onClick={() => setToggleReplies(false)}
        className={`px-4 py-2 rounded-full bg-slate-200 transition-colors text-white no-underline ${
          !toggleReplies ? "!bg-custom-dark-brown hover:bg-custom-dark-brown" : ""
        }`}
        disabled={!toggleReplies}
      >
        Requests
      </button>
    </div>
  );
};

export default Toggler;
