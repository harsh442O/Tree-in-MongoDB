const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Tree = require("../models/binaryTree");
const addNodes = require("../functions/addNode");

router.get("/add", (req, res) => {
  addNodes([
    [1, 2, 3],
    [2, 4, 5],
    [3, 6, 7],
  ]);
  res.send("Added the Binary Tree");
});

router.get("/bfs/:value", async (req, res) => {
  const { value } = req.params;
  const resId = await Tree.findOne({ value: value });
  if (!resId) {
    return res.status(400).json({ message: "Invalid node" });
  }

  const queue = [resId._id];
  const visited = new Set();

  while (queue.length > 0) {
    const currentNodeId = queue.shift();
    const curr = await Tree.findById(currentNodeId);
    if (!curr) break;
    if (visited.has(curr.value)) continue;

    visited.add(curr.value);

    // Find the current node in the database
    const node = await Tree.findById(currentNodeId);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return res.json({ visited: Array.from(visited) });
});

router.get("/", (req, res) => {
  res.status(200).send("Hello");
});

module.exports = router;
