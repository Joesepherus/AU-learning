const Block = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [
      new Block("Joseph") /* TODO: Create the genesis block here */,
    ];
  }
}

module.exports = Blockchain;
