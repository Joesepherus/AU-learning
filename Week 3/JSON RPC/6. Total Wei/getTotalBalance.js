require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
  console.log("addresses", addresses);
  const batch = [
    // TODO: fill in with several JSON RPC requests
  ];
  for (let i = 0; i < addresses.length; i++) {
    batch.push({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [addresses[i], "latest"],
    });
  }
  console.log("batch", batch);

  const response = await axios.post(url, batch);

  // use this if you want to inspect the response data!
  console.log("response", response.data);

  // return the total balance of all the addresses
  const totalResult = response.data.reduce(
    (sum, { result }) => sum + parseInt(result),
    0
  );
  console.log("totalResult", totalResult);
  return totalResult;
}

module.exports = getTotalBalance;
