const mongoose = require("mongoose");

const binaryTreeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "binaryTree",
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "binaryTree",
  },
});

const binaryTreeModel = mongoose.model("binaryTree", binaryTreeSchema);

module.exports = binaryTreeModel;
