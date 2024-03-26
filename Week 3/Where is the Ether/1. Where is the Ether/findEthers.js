const { providers } = require("ethers");
const { ganacheProvider } = require("./config");

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
  const foundAddresses = [];
  const blockNumber = await provider.getBlockNumber();
  console.log("blockNumber", blockNumber);
  for (let i = 0; i <= blockNumber; i++) {
    const block = await provider.getBlockWithTransactions(i);
    const transactions = block.transactions;
    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].from === address) {
        foundAddresses.push(transactions[j].to);
      }
    }
  }
  console.log("foundAddresses", foundAddresses);
  return foundAddresses;
}

module.exports = findEther;
