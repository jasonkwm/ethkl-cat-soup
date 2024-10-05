// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoSurveyV1Module", (m) => {
  
  const CryptoSurveyV1 = m.contract("CryptoSurveyV1", []);

  return { CryptoSurveyV1 };
});
