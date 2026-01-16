import { Tree, prettyPrint } from "./binarytree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// const tree = new Tree(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K']);

tree.insert(24)
tree.insert(25)

// prettyPrint(tree.root)
// console.log(tree.find(324))
function printTree(){  
    let tempString = '';
    tree.levelOrderForEach((node) => {
      tempString += `${node.data} `;
    })
    console.log(`Level Order: ${tempString}`)
    tempString = '';
    tree.preOrderForEach((node) => {
      tempString += `${node.data} `;
    })
    console.log(`Preorder: ${tempString}`);
    tempString = '';
    tree.inOrderForEach((node) => {
      tempString += `${node.data} `;
    })
    console.log(`Inorder: ${tempString}`);
    tempString = '';
    tree.postOrderForEach((node) => {
      tempString += `${node.data} `;
    })
  console.log(`Postorder: ${tempString}`);
}
printTree();
prettyPrint(tree.root)
console.log(tree.isBalanced(tree.root.right));
tree.rebalance();
prettyPrint(tree.root)
console.log(tree.isBalanced(tree.root.right));
printTree();
