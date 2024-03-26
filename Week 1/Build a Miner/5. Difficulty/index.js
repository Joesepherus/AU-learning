const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.unshift(transaction);
}

function mine() {
  // TODO: mine a block
  const blockId = blocks.length;
  const transactions = [];
  while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
    transactions.push(mempool.pop());
  }
  const block = { id: blockId, transactions };
  let jsonBlock = JSON.stringify(block);
  block.nonce = 0;
  let shaBlock = SHA256(jsonBlock);
  let integur = BigInt(`0x${shaBlock}`);
  while (integur >= TARGET_DIFFICULTY) {
    block.nonce++;
    jsonBlock = JSON.stringify(block);

    shaBlock = SHA256(jsonBlock);
    integur = BigInt(`0x${shaBlock}`);
  }
  blocks.push({ ...block, hash: shaBlock });
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
