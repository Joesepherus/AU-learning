class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  recursiveCall(leaves, concat) {
    // console.log("leaves", leaves)
    let res = [];
    if (leaves.length === 0) return;
    if (leaves.length === 1) return leaves[0];

    for (let i = 0; i < leaves.length; i++) {
        res.push(concat(leaves[i], leaves[i + 1]));
      i++;
    }
    res = this.recursiveCall(res, concat);
    // console.log("res", res)

    return res;
  }

  getRoot() {
    return this.recursiveCall(this.leaves, this.concat);
  }
}

module.exports = MerkleTree;
