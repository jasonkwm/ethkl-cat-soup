"use client";
import { SelectionScreen } from "../components/SelectionScreen.js";
import { useGlobalContext } from "../context/GlobalProvider.jsx";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { Web3 } from "web3";
import Image from "next/image.js";
import { useState, useEffect } from "react";
import { useWeb3AuthContext } from "@/context/Web3AuthProvider";

export default function Home() {
  const { account, setAccount, walletInstalled, setWalletInstalled, provider, setProvider } =
    useGlobalContext();
  const [error, setError] = useState("");
  // const { isLoggedIn, userInfo } = useWeb3AuthContext();
	
	const {isLoggedIn, setIsLoggedIn, web3Auth, setWeb3Auth, web3AuthProvider, setWeb3AuthProvider, userInfo, setUserInfo, signMessage, getAccounts, getPrivateKey, sendTransaction, getBalance, getUserInfo, login,} = useWeb3AuthContext
  // console.log("userInfo");

  // if (!isLoggedIn && !userInfo) return;

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        if (!accounts.length) {
          setProvider(null);
          setAccount("");
        }
      });
    }
  }, []);

  return (
    <div className="w-90 mx-auto">
      <div className="border-bottom primary-dark">
        <Image
          src="/logo.png"
          width={500}
          height={500}
          alt="logo"
          style={{ maxWidth: "10%" }}
        ></Image>
      </div>
      <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
        {account ? (
          <h5 className="d-flex justify-content-end mt-3">
            <Badge>{account.slice(0, 7) + "....." + account.slice(-5)}</Badge>
          </h5>
        ) : null}
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          {provider ? (
            <SelectionScreen provider={provider} />
          ) : (
            <Button
              onClick={login}
              className="primary my-2"
              disabled={isLoggedIn ? true : false}
            >
              Connect
            </Button>
          )}
          {walletInstalled ? null : (
            <Alert className="warning">
              Wallet Extension Not Installed. Please install Metamask.
            </Alert>
          )}
          {error ? <Alert className="warning">{error}</Alert> : null}
        </div>
      </div>
    </div>
  );
}
