"use client";
import { SelectionScreen } from "../Component/SelectionScreen.js";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { Web3 } from "web3";

export default function Home() {
  const [account, changeAccount] = useState(true);
  const [walletInstalled, setWalletInstalled] = useState(true);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState("");
  // const { isLoggedIn, userInfo } = useWeb3AuthContext();
  // console.log("userInfo");

  // if (!isLoggedIn && !userInfo) return;

  useEffect(() => {
    window.ethereum ? setWalletInstalled(true) : setWalletInstalled(false);
  }, []);

  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
        {provider ? (
          <SelectionScreen provider={provider} />
        ) : (
          <Button
            onClick={async function () {
              try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const web3 = new Web3(window.ethereum);
                setProvider(web3);
              } catch (e) {
                setError(e.message);
              }
            }}
            className="primary my-2"
            disabled={walletInstalled ? false : true}
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
  );
}
