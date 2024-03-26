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

    const block = { id: blockId };

    blocks.push({ ...block });
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};
