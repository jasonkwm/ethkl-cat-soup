"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [walletInstalled, setWalletInstalled] = useState(true);
  const [provider, setProvider] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        account,
        setAccount,
        walletInstalled,
        setWalletInstalled,
        provider,
        setProvider,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a MyProvider");
  }
  return context;
};
