class MerkleTree {
    constructor(leaves, concat) {
      this.leaves = leaves;
      this.concat = concat;
    }
  
    recursiveCall(leaves, concat) {
      let res = [];
      if (leaves.length === 0) return;
      if (leaves.length === 1) return leaves[0];
  
      for (let i = 0; i < leaves.length; i++) {
        if (!leaves[i + 1]) res.push(leaves[i]);
        else {
          res.push(concat(leaves[i], leaves[i + 1]));
        }
        i++;
      }
      res = this.recursiveCall(res, concat);
  
      return res;
    }
  
    recursiveCallProof(leaves, concat, index, idkParam) {
      let res = [];
      let pos = index;
  
      let idk = idkParam;
      if (leaves.length === 0) return;
      if (leaves.length === 1) return { res: leaves[0], idk: idk };
  
      for (let i = 0; i < leaves.length; i++) {
        if (!leaves[i + 1]) {
          if (pos === i) {
            pos = res.length;
          }
  
          res.push(leaves[i]);
        } else {
          if (pos === i) {
            idk.push({ data: leaves[i + 1], left: false });
            pos = res.length;
          }
          if (pos === i + 1) {
            idk.push({ data: leaves[i], left: true });
            pos = res.length;
          }
          res.push(concat(leaves[i], leaves[i + 1]));
        }
        i++;
      }
      const oh = this.recursiveCallProof(res, concat, pos, idk);
  
      res = oh.res;
      idk = oh.idk;
  
      return { res, idk };
    }
  
    getProof(index) {
      const lol = this.recursiveCallProof(this.leaves, this.concat, index, []);
      return lol.idk;
    }
  
    getRoot() {
      return this.recursiveCall(this.leaves, this.concat);
    }
  }
  
  module.exports = MerkleTree;
  