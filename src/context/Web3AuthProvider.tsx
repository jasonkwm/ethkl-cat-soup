"use client";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const chainConfig = {
  chainId: "0x82750",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: "https://rpc.scroll.io	",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://scrollscan.com/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

// Create the context
interface Web3AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  web3Auth: Web3Auth;
  setWeb3Auth: (value: Web3Auth) => void;
  provider: IProvider | null;
  setProvider: (value: IProvider | null) => void;
  userInfo: any;
  setUserInfo: (value: any) => void;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);
const web3AuthInstance = new Web3Auth({
  clientId:
    "BL6jNtqT31zHotB7RUsEqMe3jL8RAfF0-ThCGHjXKYVd5PpYHSmAehv0IDvpPZ3YkcSf4qKWu_048U9LWfroM_Y",
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
const isConnected = async (web3auth: any) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return false;
  }
  return web3auth.status === "connected";
};

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3Auth, setWeb3Auth] = useState(web3AuthInstance);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    if (userInfo) return;
    const init = async () => {
      try {
        await web3Auth.initModal();
        const provider = await web3Auth.connect();
        setProvider(provider);
        if (web3Auth.connected) {
          const user = await web3Auth.getUserInfo();
          setUserInfo(user);
          setIsLoggedIn(true);
          console.log("userInfo", userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (web3Auth.connected) {
      setIsLoggedIn(true);
    }
  }, [web3Auth]);

  return (
    <Web3AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        web3Auth,
        setWeb3Auth,
        provider,
        setProvider,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = (): Web3AuthContextType => {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a MyProvider");
  }
  return context;
};
