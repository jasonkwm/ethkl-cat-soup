import EthCrypto from 'eth-crypto';
import { Web3 } from "web3";



export async function encryptCID(address, CID) {
    let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    let provider = new Web3(window.ethereum)
    let message="encryption"
    const messagePrefix = `\x19Ethereum Signed Message:\n${message.length}${message}`;
    const signature= await provider.eth.personal.sign(message, address,"")
    const publicKey = EthCrypto.recoverPublicKey(signature, EthCrypto.hash.keccak256(messagePrefix))
    let encrypted = await EthCrypto.encryptWithPublicKey(publicKey,CID)
    return encrypted;
}

export async function decryptCID(privateKey, encryptedCID) {
    let decryptedCID =await EthCrypto.decryptWithPrivateKey(privateKey,encryptedCID)
    return decryptedCID;
}