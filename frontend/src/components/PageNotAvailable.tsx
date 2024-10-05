import React from "react";

const PageNotAvailable: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Page Not Available</h1>
        <p className="text-gray-700 mb-6">
          This page is not available. Please log in to access it.
        </p>
        <button
          // onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default PageNotAvailable;
