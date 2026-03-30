const express = require("express");

const app = express();

//middlewares

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} - ${req.method} - ${req.url}]`);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(`responded in ${Date.now() - start}ms`);
  });
  next();
});
//handmade database

let posts = [
  { id: 1, title: "Hello World", author: "alice", body: "My first post" },
  { id: 2, title: "Express is great", author: "bob", body: "Learning backend" },
  {
    id: 3,
    title: "Middleware magic",
    author: "alice",
    body: "Next and next and next",
  },
];
let nextId = 4;

//routes
app.get("/", (_, res) => {
  res.send("Welcome to server");
});

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});
