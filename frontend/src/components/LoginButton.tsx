"use client";

import { useWeb3AuthContext } from "@/context/Web3AuthProvider";
import { WALLET_PLUGINS } from "@web3auth/base";

export default function LoginButton() {
  const { web3Auth, setUserInfo, setWeb3AuthProvider, setIsLoggedIn } = useWeb3AuthContext();
  const handleLogin = async () => {
		if (!web3Auth) {
			console.log("web3Auth not initialized yet");
			return;
		}
		const web3authProvider = await web3Auth.connectTo(WALLET_PLUGINS.AUTH, {
			loginProvider: "jwt",
			extraLoginOptions: {
				domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
				verifierIdField: "sub",
				connection: "worldcoin",
				// connection: "google-oauth2", // Use this to skip Auth0 Modal for Google login.
			},
		});
		setWeb3AuthProvider(web3authProvider);
	}

  return (
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
      Login
    </button>
  );
}
