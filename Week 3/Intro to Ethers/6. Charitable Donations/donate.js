const { utils, providers, Wallet } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

async function sendEther({ value, to }, wallet) {
  return wallet.sendTransaction({
    value,
    to,
    gasLimit: 0x5208,
    gasPrice: 0x3b9aca00,
  });
}

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
  console.log("charities", charities);
  const wallet = new Wallet(privateKey, provider);

  // TODO: donate to charity!
  for (let i = 0; i < charities.length; i++) {
    await sendEther(
      { value: utils.parseEther("1.0"), to: charities[i] },
      wallet
    );
  }
}

module.exports = donate;
