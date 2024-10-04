"use client";
import Link from "next/link";

const CreateNavbar = () => {
  const publicKey = "0x6f80ee5F3Dc35d32D7d4D3777130971e3A24455f";
  const shortenKey = (key: string) => `${key.slice(0, 6)}...${key.slice(-4)}`;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Left section */}
      <div className="flex space-x-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white no-underline"
        >
          Home
        </Link>
      </div>

      {/* Middle section */}
      <div className="flex space-x-4">
        <Link
          href={"/create"}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white no-underline"
        >
          Dashboard
        </Link>
        <button className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors">
          Create Survey
        </button>
      </div>

      {/* Right section */}
      <div>
        <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors">
          {shortenKey(publicKey)}
        </button>
      </div>
    </nav>
  );
};

export default CreateNavbar;
