const TrieNode = require("./TrieNode");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            node.children[word[i]] = node.children[word[i]]
                ? node.children[word[i]]
                : new TrieNode(word[i]);
            // console.log("node", node)
            node = node.children[word[i]];

            if (i == word.length - 1) {
                node.isWord = true;
            }
        }
    }

    contains(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (i === 0) {
                node = node.children[word[i]];
            }
            let char = word[i];
            console.log("char", char);
            let next = word[i + 1];
            console.log("next", next);
            console.log("node.key", node.key);
            if (char === node.key && node.children[next]) {
                node = node.children[next];
            } else if (node.isWord && i === word.length - 1) {
            } else return false;
        }
        return true;
    }
}

module.exports = Trie;
