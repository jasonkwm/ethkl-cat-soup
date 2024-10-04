"use client";

import { useWeb3AuthContext } from "@/context/Web3AuthProvider";

export default function LogoutButton() {
  const { web3Auth, setUserInfo, setWeb3AuthProvider, setIsLoggedIn } = useWeb3AuthContext();
  const handleLogOut = async () => {
    await web3Auth.logout();
    setUserInfo(undefined);
    setWeb3AuthProvider(null);
    setIsLoggedIn(false);
  };

  return (
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
      Logout
    </button>
  );
}
