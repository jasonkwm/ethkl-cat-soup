import Link from "next/link";
import React from "react";

const ParticipateSuccess: React.FC<any> = ({txHash, setSelectedSurvey}:{txHash:string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Survey created</h1>
        <p className="text-gray-600 mb-6">
          Thank you for participating in the survey. Your responses have been recorded.
        </p>
        {txHash && <p>Transaction Hash: {txHash}</p>}
        <button onClick={()=>setSelectedSurvey(null)}className="px-6 py-2 bg-custom-dark-brown text-white rounded-md hover:bg-custom-light-brown transition">
          Back to Dashboard
        </button>
        
      </div>
    </div>
  );
};

export default ParticipateSuccess;
