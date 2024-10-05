"use client";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
  UX_MODE,
} from "@web3auth/base";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import RPC from "./web3RPC"; // for using web3.js

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
  web3Auth: Web3AuthNoModal;
  setWeb3Auth: (value: Web3AuthNoModal) => void;
  web3AuthProvider: IProvider | null;
  setWeb3AuthProvider: (value: IProvider | null) => void;
  userInfo: any;
  setUserInfo: (value: any) => void;
  signMessage: any;
  getAccounts: any;
  getPrivateKey: any;
  sendTransaction: any;
  getBalance: any;
  getUserInfo: any;
  login: any;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);
const isConnected = async (web3auth: any) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return false;
  }
  return web3auth.status === "connected";
};

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3Auth, setWeb3Auth] = useState<any>();
  const [web3AuthProvider, setWeb3AuthProvider] = useState<IProvider | null>(null);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    if (userInfo) return;
    console.log("_______________________________________________________");
    console.log(process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
    const init = async () => {
      try {
        // await web3Auth.initModal();
        const web3AuthInstance = new Web3AuthNoModal({
          clientId:
            "BAc5PRf-Nkjn-R-XkaNZH1mpEP4A-yVqun0G9eEa6YGb11_iT53AASOE1b80Og2R-z9cqu3s9MZw5l3FEgCccK8",
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });
        const authAdapter = new AuthAdapter({
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            loginConfig: {
              jwt: {
                verifier: "web3auth-world-id-verifier",
                typeOfLogin: "jwt",
                clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
              },
            },
          },
        });
        web3AuthInstance.configureAdapter(authAdapter);
        setWeb3Auth(web3AuthInstance);
        await web3AuthInstance.init();
        setWeb3AuthProvider(web3AuthInstance.provider);
        if (web3AuthInstance.connected) {
          const user = await web3AuthInstance.getUserInfo();
          setUserInfo(user);
          setIsLoggedIn(true);

          console.log("userInfo", user);
          console.log("web3authProvider", web3AuthProvider);
          console.log("web3auth", web3AuthInstance);
          console.log("idtoken: ", user.idToken);
          console.log("auth0token: ", user.oAuthIdToken);
          const rpc = new RPC(web3AuthInstance.provider as any);
          console.log("Wallet Address: ", await rpc.getAccounts());
          console.log("Private Key: ", await rpc.getPrivateKey());
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (web3Auth && web3Auth.connected) {
      setIsLoggedIn(true);
    }
  }, [web3Auth]);

  //WARN: --------------------------------------------------------------------------------------
  const login = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "jwt",
      extraLoginOptions: {
        domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
        verifierIdField: "sub",
        connection: "worldcoin",
        // connection: "google-oauth2", // Use this to skip Auth0 Modal for Google login.
      },
    });
    setWeb3AuthProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setIsLoggedIn(false);
    setWeb3AuthProvider(null);
  };

  const authenticateUser = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    const idToken = await web3Auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    console.log(user);
  };

  const getChainId = async () => {
    if (!web3AuthProvider) {
      console.log("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };

  const getAccounts = async () => {
    if (!web3AuthProvider) {
      console.log("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!web3AuthProvider) {
      console.log("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!web3AuthProvider) {
      console.log("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!web3AuthProvider) {
      console.log("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const getPrivateKey = async () => {
    if (!web3AuthProvider) {
      uiConsole("web3AuthProvider not initialized yet");
      return;
    }
    const rpc = new RPC(web3AuthProvider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
    uiConsole(privateKey);
  };

  //WARN: -------------------------------------------------------------------------------------------------------------

  return (
    <Web3AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        web3Auth,
        setWeb3Auth,
        web3AuthProvider,
        setWeb3AuthProvider,
        userInfo,
        setUserInfo,
        signMessage,
        getAccounts,
        getPrivateKey,
        sendTransaction,
        getBalance,
        getUserInfo,
        login,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3AuthContext = (): Web3AuthContextType => {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a MyProvider");
  }
  return context;
};
