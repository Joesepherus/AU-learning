class Tree {
  constructor() {
    this.root = null;
  }

  recursiveAdd(parent, child) {
    console.log("parent", parent);
    console.log("child", child);
    if (child.data < parent.data) {
      parent.left = child;
    } else if (child.data > parent.data) {
      parent.right = child;
    }
  }

  addNode(node) {
    if (!this.root) {
      this.root = node;
      return;
    }
    this.recursiveAdd(this.root, node);
  }
}

module.exports = Tree;
