import Link from "next/link";
import React from "react";

const SurveySuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Survey created</h1>
        <p className="text-gray-600 mb-6">
          Thank you for creating the survey. Your responses have been recorded.
        </p>
        <Link href="/surveyor">
          <button className="px-6 py-2 bg-custom-dark-brown text-white rounded-md hover:bg-custom-light-brown transition">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SurveySuccess;
