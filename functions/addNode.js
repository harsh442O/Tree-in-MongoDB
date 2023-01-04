const mongoose = require("mongoose");
const Tree = require("../models/binaryTree");

async function addNodes(tree) {
  const nodeMap = new Map();
  for (const [parentValue, ...childValues] of tree) {
    let parentNode = nodeMap.get(parentValue);
    if (!parentNode) {
      parentNode = new Tree({ value: parentValue });
      nodeMap.set(parentValue, parentNode);
    }
    for (const childValue of childValues) {
      let childNode = nodeMap.get(childValue);
      if (!childNode) {
        childNode = new Tree({ value: childValue });
        nodeMap.set(childValue, childNode);
      }
      if (!parentNode.left) {
        parentNode.left = childNode._id;
      } else {
        parentNode.right = childNode._id;
      }
    }
  }
  await Tree.insertMany(Array.from(nodeMap.values()));
}

module.exports = addNodes;
