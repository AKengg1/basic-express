const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.send("Welcome to server");
});

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});
