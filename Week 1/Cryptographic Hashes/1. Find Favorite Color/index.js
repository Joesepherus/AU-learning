const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

// given a hash, return the color that created the hash
function findColor(hash) {
  console.log("hash", hash);
  for (color of COLORS) {
    console.log("color", color);

    const colorBytes = utf8ToBytes(color);
    const colorHashed = sha256(colorBytes);
    console.log("colorHashed", colorHashed);

    if (toHex(colorHashed) === toHex(hash)) return color;
  }
}

module.exports = findColor;
