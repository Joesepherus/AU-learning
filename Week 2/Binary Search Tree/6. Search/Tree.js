class Tree {
  constructor() {
    this.root = null;
  }

  recursiveAdd(parent, child) {
    console.log("parent", parent);
    console.log("child", child);
    if (child.data < parent.data) {
      if (parent.left) {
        this.recursiveAdd(parent.left, child);
      } else {
        parent.left = child;
      }
    } else if (child.data > parent.data) {
      if (parent.right) {
        this.recursiveAdd(parent.right, child);
      } else {
        parent.right = child;
      }
    }
  }

  addNode(node) {
    if (!this.root) {
      this.root = node;
      return;
    }
    this.recursiveAdd(this.root, node);
  }

  recursiveSearch(parent, number) {
    console.log("parent", parent);
    console.log("number", number);
    let found;
    if (number === parent.data) {
      console.log("found the number!", number);
      return true;
    }
    if (number < parent.data) {
      if (parent.left) {
        found = this.recursiveSearch(parent.left, number);
      } else {
        return false;
      }
    } else if (number > parent.data) {
      if (parent.right) {
        found = this.recursiveSearch(parent.right, number);
      } else {
        return false;
      }
    }
    return found;
  }

  hasNode(number) {
    return this.recursiveSearch(this.root, number);
  }
}

module.exports = Tree;
