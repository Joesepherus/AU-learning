const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("../1. Hash Message/hashMessage");
const PRIVATE_KEY =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
  const hashedMsg = hashMessage(msg);
  const signedMsg = secp.sign(hashedMsg, PRIVATE_KEY, { recovered: true });
  console.log("signedMsg", signedMsg);
  return signedMsg;
}

module.exports = signMessage;
