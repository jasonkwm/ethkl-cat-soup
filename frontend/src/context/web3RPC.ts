import CryptoSurvey from "@/contract/CryptoSurvey";
import type { IProvider } from "@web3auth/base";
import Web3 from "web3";

export default class EthereumRpc {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts());

      return address;
    } catch (error) {
      return error;
    }
  }

	async contractInteract(): Promise<any> {
		const web3 = new Web3(this.provider as any);

		const abi = CryptoSurvey.abi;
		const deployedAddress = CryptoSurvey.address;
		const myContract = new web3.eth.Contract(abi, deployedAddress);
		const accounts = await web3.eth.getAccounts();
		const defaultAccount = accounts[0];

		try {
			// Get the current value of my number
			const myNumber = await myContract.methods.myNumber().call();
			console.log("myNumber value: " + myNumber);

			// Increment my number
			const receipt = await myContract.methods
				.setMyNumber(BigInt(myNumber) + 1n)
				.send({
					from: defaultAccount,
					gas: 1000000,
					gasPrice: "10000000000",
				});
		}
    catch(e) {
      console.log(e.message)
    }
	}

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address), // Balance is in wei
        "ether"
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction (): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;

      const amount = web3.utils.toWei("0.001", "ether"); // Convert 1 ether to wei
      let transaction = {
        from: fromAddress,
        to: destination,
        data: "0x",
        value: amount,
      }

      // calculate gas transaction before sending
      transaction = { ...transaction, gas: await web3.eth.estimateGas(transaction)} as any;

      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction(transaction);

      return this.toStringJson(receipt);
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!" // configure your own password here.
      );

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  toStringJson = (data: any) => {
    // can't serialize a BigInt, so this hack
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
  }
}
