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
import Link from "next/link";

export default function Home() {
  const { account, setAccount, walletInstalled, setWalletInstalled, provider, setProvider } =
    useGlobalContext();
  const [error, setError] = useState("");
  // const { isLoggedIn, userInfo } = useWeb3AuthContext();

  const {
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
  } = useWeb3AuthContext();
  // console.log("userInfo");

  const { publicKey } = useWeb3AuthContext();
  const shortenKey = (key) => `${key.slice(0, 6)}...${key.slice(-4)}`;
  const handleCopyClick = () => {
    navigator.clipboard.writeText(publicKey).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy: ");
      }
    );
  };

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
    <div className="mx-auto" style={{width: "70%"}}>
	    <nav
	      className="flex justify-between items-center text-white"
	      style={{
	        border: "black solid 0.5px",
	        borderRadius: "30px 30px 0px 0px",
	        paddingRight: "25px",
	      }}
	    >
	      <div className="flex space-x-4">
		    <Link href="/" className="px-4 py-2 rounded-lg transition-colors text-white no-underline">
		      <img
		        src="/logo.png"
		        width={500}
		        height={500}
		        alt="logo"
		        style={{ maxWidth: "20%" }}
		      ></img>
		    </Link>
		  </div>
		  <div>
	        {account ? (
	          <h5>
	            <Badge>{account.slice(0, 7) + "....." + account.slice(-5)}</Badge>
	          </h5>
	        ) : null}
	        <div>
	          {web3Auth && web3Auth.connected ? (
	            <SelectionScreen />
	          ) : (
	            <Button onClick={login} className="my-2 bg-white text-black border-white" disabled={isLoggedIn ? true : false}>
	              Connect
	            </Button>
	          )}
	          {walletInstalled ? null : (
	            <Alert className="warning">
	              Wallet extension not installed. Please install Metamask.
	            </Alert>
	          )}
	          {error ? <Alert className="warning">{error}</Alert> : null}
	        </div>
	      </div>
		  <button
	          onClick={handleCopyClick}
	          className="px-4 py-2 rounded-lg bg-white hover:bg-white-600 text-black transition-colors"
	        >
	          {shortenKey(publicKey ? publicKey : "")}
	        </button>
		</nav>
      <div style={{ padding: "60px 100px", border: "solid 0.5px", borderTop: "0px" }}>
			  <div className="flex justify-center align-center">
				  <img
			        src="/logo.png"
			        width={500}
			        height={500}
			        alt="logo"
			        style={{ maxWidth: "30%" }}
			      ></img>
				  <div style={{margin: "10px 20px", justifyContent: "center", alignItems: "center", padding: "20px"}}>
				  	<h1>Crypto Survey</h1>
					<p>Create, distribute, and participate in secure, transparent, and fair surveys, on the blockchain to ensure anonymity and protect data while fostering trust</p>
				  </div>
			  </div>
			  <hr/>
			  <div className="flex justify-center align-center">
				  <img
			        src="/1.png"
			        alt="1"
			        style={{ maxWidth: "40%" }}
			      ></img>
				  <div style={{margin: "10px 20px", justifyContent: "center", alignItems: "center", padding: "20px"}}>
				  	<h1>Transparency and Trust</h1>
					<p>Blockchain’s cryptographic techniques ensure that survey data is securely stored and tamper-proof, reducing the risk of unauthorized access and data breaches. Reducing concerns about bias or data  manipulation from a single entity</p>
				  </div>
			  </div>
			  <div className="flex justify-center align-center">
				  <div style={{margin: "10px 20px", justifyContent: "center", alignItems: "center", padding: "20px"}}>
				  	<h1>Accessibility and Inclusivity</h1>
					<p>A decentralized platform can be accessed globally, allowing more diverse voices, especially from underrepresented communities</p>
				  </div>
				  <img
			        src="/4.png"
			        alt="1"
			       	style={{maxWidth: "50%", height: "auto"}}
			      ></img>
			  </div>
			  <div className="flex justify-center align-center">
				  <img
			        src="/5.png"
			        alt="1"
			       	style={{maxWidth: "50%", height: "auto"}}
			      ></img>
				  <div style={{margin: "10px 20px", justifyContent: "center", alignItems: "center", padding: "20px"}}>
				  	<h1>Incentives for Participation</h1>
					<p>Smart contracts encoded to automatically distribute reward tokens to users</p>
				  </div>
			  </div>
      </div>
    </div>
  );
}
