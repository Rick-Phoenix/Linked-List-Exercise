class LinkedList {
  constructor() {
    this.list = null;
  }

  prepend(value) {
    this.list = makeNode(value, this.list);
  }

  append(value, list = this.list) {
    if (this.list === null) return this.prepend(value);
    if (list.next === null) {
      list.next = makeNode(value, null);
      return;
    }
    else this.append(value, list.next);
  }

  calcSize(list = this.list) {
    if (this.list === null) return 0;
    if (list.next === null) return 1;
    return 1 + this.calcSize(list.next); 
  }

  calcTail(node = this.list) {
    if (this.list === null) return undefined;
    if (node.next === null) return node;
    return this.calcTail(node.next);
  }

  pop(node = this.list) {
    if (node.next.next === null) {
      node.next = null;
      return;
    }
    return this.pop(node.next);
  }

  getNodeFromIndex(indexEnd, indexStart = 0,  node = this.list) {
    if (node === null) return undefined;
    if (indexEnd === indexStart) return node;
    return this.getNodeFromIndex(indexEnd, ++indexStart, node.next);
  }

  getIndexFromNode(nodeValue, index = 0, node = this.list) {
    if (node === null || node.next === null) return undefined;
    index++;
    if (node.next.value == nodeValue) return index;
    return this.getIndexFromNode(nodeValue, index, node.next);
  }

  insertAt(value, index) {
    const targetNode = this.getNodeFromIndex(index);
    const nodeCopy = {...targetNode};
    targetNode.value = value;
    targetNode.next = nodeCopy;
  }

  removeAt(index) {
    if (index <= 0) return;
    const targetNode = this.getNodeFromIndex(index);
    const previousNode = this.getNodeFromIndex(index - 1);
    const next = targetNode.next;
    previousNode.next = next;
  }

  contains(value) {
    if (this.getIndexFromNode(value)) return true;
    return false;
  }

  find(value) {
    if (this.getIndexFromNode(value)) return this.getIndexFromNode(value);
    else return null;
  }

  at(index) {
    return this.getNodeFromIndex(index);
  }

  toString(node = this.list) {
    if (node.next === null) return node.value + '.';
    return node.value + ', ' + this.toString(node.next);
  }

  get size() {
    return this.calcSize();
  }

  get head() {
    return this.list;
  }

  get tail() {
    return this.calcTail()
  }
}

function makeNode(value, next) {
  return {
    value: value,
    next: next,
  }
}
