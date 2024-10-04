require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-web3-v4");

module.exports = {
  solidity: "0.8.27",
  networks: {
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io' || '',
      accounts:["c221d9dd5e7f11ac40c7aae0c5d83990a01d1696c87dfd0205e19ce2b2e06475"]
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "IFQY47H4YI25XETTBZBTCC1IET39DVTC3M",
      scrollSepolia: "FRUPAFMV6GMW72Y1NF2BA3MMDDQ5WGUP4S",
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};