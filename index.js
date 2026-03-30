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

app.get("/posts", (req, res) => {
  const author = req.query.author;
  if (author) {
    return res.json(posts.filter((e) => e.author === author));
  }
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((e) => e.id === Number(req.params.id));

  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(201).json(post);
});

app.post("/posts", (req, res) => {
  const { title, author, body } = req.body;
  if (!title || !author || !body)
    return res.status(400).json({ error: "title, author, and body required" });

  const post = { id: nextId++, title, author, body };
  posts.push(post);
  res.status(201).json(post);
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((e) => e.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "post not found" });
  const deleted = posts.splice(index, 1);
  res.status(200).json({ deleted: deleted[0] });
});

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});
