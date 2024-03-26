const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [
      new Block("Joseph") /* TODO: Create the genesis block here */,
    ];
  }

  addBlock(block) {
    const previousHash = this.chain[this.chain.length - 1].toHash();
    console.log("previousHash", previousHash);
    block.previousHash = previousHash;
    this.chain.push(block);
  }
}

module.exports = Blockchain;
