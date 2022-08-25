class Node {
  constructor(value, behavior = 0) {
    this.value = value;
    this.behavior = behavior;
    this.childs = [];
  }
}
class Trie {
  constructor() {
    this.root = new Node("");
  }
  addNode(curNode, value, behavior = 0) {
    if (!curNode.childs.some((c) => c.value === value)) {
      curNode.childs.push(new Node(value, behavior));
    }
  }
  addWord(curNode, word) {
    if (word.length === 1) {
      this.addNode(curNode, word, 1);
      return "Add Successfull";
    }
    this.addNode(curNode, word[0]);
    curNode.childs.forEach(
      (c) => c.value === word[0] && this.addWord(c, word.slice(1))
    );
  }
  removeWord(curNode, word) {
    if (word.length === 0) {
      curNode.behavior = 0;
      return "Remove Successfull";
    }
    curNode.childs.forEach(
      (c) => c.value === word[0] && this.removeWord(c, word.slice(1))
    );
  }

  search(curNode, word) {
    const childs = curNode.childs.filter((c) => c.value === word[0]);
    if (childs.length > 0) {
      for (const key in childs) {
        if (childs[key].value === word[0]) {
          if (childs[key].behavior === 1) {
            return true;
          } else {
            return this.search(childs[key], word.slice(1));
          }
        }
      }
    }
    return false;
  }

  support(curNode, word) {
    if (curNode.behavior == 1) {
      return word;
    }
    for (const key in curNode.childs) {
      const newWord = word + curNode.childs[key].value;
      return this.support(curNode.childs[key], newWord);
    }
    return false;
  }
  mean(curNode, word, orig = word) {
    if (word.length === 1 && curNode.behavior === 1) {
      return orig;
    }
    if (word.length === 0) {
      return this.support(curNode, orig);
    }
    for (let key in curNode.childs) {
      if (curNode.childs[key].value === word[0]) {
        return this.mean(curNode.childs[key], word.slice(1), orig);
      }
    }
    return false;
  }
}

trie = new Trie();
trie.addWord(trie.root, "hello");
trie.addWord(trie.root, "help");
trie.addWord(trie.root, "javascript");
trie.addWord(trie.root, "jax");
trie.removeWord(trie.root, "jax");
console.log(trie.mean(trie.root, "java"), trie.search(trie.root, "javascript"));
