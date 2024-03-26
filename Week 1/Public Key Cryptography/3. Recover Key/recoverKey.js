const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("../1. Hash Message/hashMessage");

async function recoverKey(message, signature, recoveryBit) {
  const hashed = hashMessage(message);
  const publicKey = secp.recoverPublicKey(hashed, signature, recoveryBit);
  return publicKey;
}

module.exports = recoverKey;
