"use client";
import Link from "next/link";

const ParticipateNavbar = () => {
  const publicKey = "0x6f80ee5F3Dc35d32D7d4D3777130971e3A24455f";
  const shortenKey = (key: string) => `${key.slice(0, 6)}...${key.slice(-4)}`;

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
          className="px-4 py-2 rounded-lg bg-white hover:bg-custom-hover-white transition-all no-underline"
        >
          Participate Dashboard
        </Link>
        <button className="px-4 py-2 rounded-lg bg-white hover:bg-white-600 text-black transition-colors">
          {shortenKey(publicKey)}
        </button>
      </div>
    </nav>
  );
};

export default ParticipateNavbar;
