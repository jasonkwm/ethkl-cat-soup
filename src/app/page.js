"use client"
import { SelectionScreen } from '../Component/SelectionScreen.js';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import web



export default function Home() {
  const [page, setPage] = useState("")
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [account, setAccount] = useState("")
  const [error, setError] = useState("")
  const [provider, setProvider] = useState("")
  const { isLoggedIn, userInfo } = useWeb3AuthContext();
  console.log("userInfo");
  
  if (!isLoggedIn && !userInfo) return;
  
  useEffect(()=>{
    window.ethereum? setWalletInstalled(true):setWalletInstalled(false)
  },[])


  return (
    <div class="container">
      
      <div className="d-flex flex-column justify-content-center vh-100 align-items-center">
        {page === "selectionScreen"? <SelectionScreen/> : 
          <Button onClick={async function(){
            try {
              await window.ethereum.request({ method: "eth_requestAccounts" });


            }
            catch(e) {
              setError(e.message)
            }

          }} className="primary my-2" disabled={walletInstalled? false:true}>Connect</Button>}
          {walletInstalled? null:<Alert className="warning">Wallet Extension Not Installed. Please install Metamask.</Alert>}
          {walletInstalled? null:<Alert className="warning">Wallet Extension Not Installed. Please install Metamask.</Alert>}
      </div>
    </div>
  );
}
