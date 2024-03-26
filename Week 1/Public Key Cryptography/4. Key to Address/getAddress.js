const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
  const firstByte = publicKey.slice(1);
  const kecak = keccak256(firstByte);
  const lastBytes = kecak.slice(-20);
  console.log("kecak", kecak);
  return lastBytes;
}

module.exports = getAddress;
