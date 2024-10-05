"use client";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import Link from "next/link";

const ParticipateNavbar = () => {
  const { publicKey } = useWeb3AuthContext();
  const shortenKey = (key: string) => `${key.slice(0, 6)}...${key.slice(-4)}`;
  const handleCopyClick = () => {
    navigator.clipboard.writeText(publicKey).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy: ");
      }
    );
  };

  return (
    <nav
      className="flex justify-between items-center text-white"
      style={{
        border: "black solid 0.5px",
        borderRadius: "30px 30px 0px 0px",
        paddingRight: "25px",
      }}
    >
      {/* Left section */}
      <div className="flex space-x-4">
        <Link href="/" className="px-4 py-2 rounded-lg transition-colors text-white no-underline">
          <img
            src="/logo.png"
            width={500}
            height={500}
            alt="logo"
            style={{ maxWidth: "20%" }}
          ></img>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link
          href={"/participate"}
          className="px-4 py-2 rounded-lg bg-white hover:bg-custom-hover-white text-black transition-all no-underline"
        >
          Participate Dashboard
        </Link>
        <button
          onClick={handleCopyClick}
          className="px-4 py-2 rounded-lg bg-white hover:bg-white-600 text-black transition-colors"
        >
          {shortenKey(publicKey ? publicKey : "")}
        </button>
      </div>
    </nav>
  );
};

export default ParticipateNavbar;
