"use client";
import { SelectionScreen } from "../components/SelectionScreen.js";
import { useGlobalContext } from "../context/GlobalProvider.jsx";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { Web3 } from "web3";
import { useState, useEffect } from "react";

export default function Home() {
  const {account, setAccount, walletInstalled, setWalletInstalled, provider, setProvider} = useGlobalContext()
  const [error, setError] = useState("");

  useEffect(() => {
    if(window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts)=>{
          setAccount(accounts[0]);
          if (!accounts.length) {
            setProvider(null)
            setAccount("")
          }
      })
    }
  },[]);

  return (
    <div className="container">
      {account? <h5 className="d-flex justify-content-end mt-3"><Badge>{account.slice(0, 7) + "....." + account.slice(-5)}</Badge></h5>:null}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"80vh"}}>
        {provider? (
          <SelectionScreen provider={provider} />
        ) : (
          <Button
            onClick={async function () {
              try {
                if (!window.ethereum) {
                  setWalletInstalled(false)
                }
                else {
                  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                  const web3 = new Web3(window.ethereum);
                  setProvider(web3);
                  setAccount(accounts[0]);
                }
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
)}
