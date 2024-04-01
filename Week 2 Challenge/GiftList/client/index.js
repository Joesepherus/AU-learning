const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const merkleTree = new MerkleTree(niceList);

const serverUrl = "http://localhost:1225";
const root = merkleTree.getRoot();
console.log("root: ", root);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Traci McDermott";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
  });

  console.log({ gift });
}

main();
