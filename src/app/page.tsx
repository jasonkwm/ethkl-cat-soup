"use client";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import LogoutButton from "@/components/LogoutButton";
export default function Home() {
  const { isLoggedIn, userInfo } = useWeb3AuthContext();
  console.log("userInfo");
  if (!isLoggedIn && !userInfo) return;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>CAT SOUP</h1>
      <p>start of greateness</p>
      <LogoutButton />
    </div>
  );
}
