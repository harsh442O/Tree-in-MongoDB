const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/modelTree")
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error");
    console.log(err);
  });

app.use("/", require("./routes/tree.js"));

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
