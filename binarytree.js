import { mergeSort } from "./mergesort.js";

class Node{
  constructor(data = null, left = null, right = null){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree{
  constructor(array){
    this.root = this.buildTree(array);
  }
  arrToBST(arr, start, end){
    if(start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.arrToBST(arr, start, mid - 1);
    root.right = this.arrToBST(arr, mid + 1, end);
    return root;
  }
  buildTree(array){
    const SortedArr = mergeSort(array);
    return this.arrToBST(SortedArr, 0, SortedArr.length - 1);
  }
  insert(value){
    if(this.root == null){
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    while(true){
      if(value == this.root.data) return;
      if(value < current.data) {
        if(current.left == null){
          current.left = new Node(value);
          return;
        }
        current = current.left;
      }
      else{
        if(current.right == null){
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  }
  deleteItem(value){
    let current = this.root;
    let parent = null;
    while (current !== null && current.data !== value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (current === null) return;
    // 2 children
    if (current.left !== null && current.right !== null) {
      let succParent = current;
      let successor = current.right;
      while (successor.left !== null) {
        succParent = successor;
        successor = successor.left;
      }
      current.data = successor.data;
      current = successor;
      parent = succParent;
    }
    // 0 or 1 child
    const child = current.left !== null ? current.left : current.right;
    if (parent === null) {
      this.root = child;
    }
    else if (parent.left === current) {
      parent.left = child;
    }
    else {
      parent.right = child;
    }
  }
  find(value){
    let current = this.root;
    while(true){
      if(current.data == value) return current;
      if(current.data < value) current = current.right;
      else current = current.left;
    }
  }
  levelOrderForEach(callback){
    if(typeof callback !== 'function') throw new Error("Callback function is required");
    if(this.root === null) return;
    const queue = [this.root];
    while(queue.length > 0){
      const current = queue.shift();
      callback(current);
      if(current.left !== null) queue.push(current.left);
      if(current.right !== null) queue.push(current.right);
    }
  }
  levelOrderForEachRecur(callback){
    if(typeof callback !== 'function') throw new Error("Callback function is required");
    const queue = [];
    if(this.root !== null) queue.push(this.root);
    const traverse = () => {
      if(queue.length === 0) return;
      const node = queue.shift();
      callback(node);
      if(node.left !== null) queue.push(node.left);
      if(node.right !== null) queue.push(node.right);
      traverse();
    };
    traverse();
  }
  inOrderForEach(callback){
    if(typeof callback !== 'function') throw new Error("Callback function is required");
    const traverse = (node) => {
      if(node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }
    traverse(this.root);
  }
  preOrderForEach(callback){
    if(typeof callback !== 'function') throw new Error("Callback function is required");
    const traverse = (node) => {
      if(node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }
  postOrderForEach(callback){
    if(typeof callback !== 'function') throw new Error("Callback function is required");
    const traverse = (node) => {
      if(node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }
    traverse(this.root);
  }
  height(value){
    let height = -1;
    let start = this.find(value);
    if(start === null) return null;
    let queue = [start];
    while(queue.length > 0){
      let levelSize = queue.length;
      while(levelSize--){
        const node = queue.shift();
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
      }
      height++;
    }
    return height;
  }
  depth(value){
    let count = 0;
    let current = this.root;
    while(true){
      if(current.data == value) return count;
      if(current.data < value){
        if(current.right){
          current = current.right;
          count++;
        }
        else return null
      }
      if(current.data > value){
        if(current.left){
          current = current.left;
          count++;
        }
        else return null
      }
    }
  }
  isBalanced(node = this.root){
    if(node == null) return true;
    const leftHeight = node.left ? this.height(node.left.data) : -1;
    const rightHeight = node.right ? this.height(node.right.data) : -1;
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance(){
    const newArray = [];
    const traverse = (node) => {
      if(node == null) return;
      traverse(node.left);
      newArray.push(node.data);
      traverse(node.right);
    }
    traverse(this.root);
    this.root = this.buildTree(newArray);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export { Tree, prettyPrint }