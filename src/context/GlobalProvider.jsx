"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3AuthProvider, setWeb3AuthProvider] = useState(null);
  const [userInfo, setUserInfo] = useState();

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        web3AuthProvider,
        setWeb3AuthProvider,
        userInfo,
        setUserInfo,
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
