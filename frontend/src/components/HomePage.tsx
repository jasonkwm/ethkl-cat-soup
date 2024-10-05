import Link from "next/link";
import React from "react";

const RoleSelection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Role</h1>
        <div className="space-y-4">
          <Link href="/create">
            <button className="w-64 px-6 py-3 bg-blue-500 text-white text-xl rounded-md hover:bg-blue-600 transition">
              Surveyor
            </button>
          </Link>
          <Link href={"/participant"}>
            <button className="w-64 px-6 py-3 bg-green-500 text-white text-xl rounded-md hover:bg-green-600 transition">
              Participant
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
