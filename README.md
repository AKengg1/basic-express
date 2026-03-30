# Blog API

A simple REST API built with Node.js and Express. Built as a learning project to understand routing, middleware, and HTTP methods.

## What I learned
- Setting up an Express server from scratch
- Writing and chaining middleware functions
- Route params (`req.params`) and query strings (`req.query`)
- Reading request bodies (`req.body`)
- HTTP status codes (200, 201, 400, 404)
- GET, POST, DELETE routes
- How `req` travels through the middleware chain
- Redirecting requests with `res.redirect()`

Server runs at `http://localhost:3000`

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts?author=alice` | Filter posts by author |
| GET | `/posts/:id` | Get a single post |
| POST | `/posts` | Create a new post |
| DELETE | `/posts/:id` | Delete a post |
| GET | `/health` | Server status |
| GET | `/` | Redirects to `/dashboard` |
| GET | `/dashboard` | Dashboard page |

## Example requests

### Get all posts
```bash
curl http://localhost:3000/posts
```

### Create a post
```powershell
Invoke-WebRequest -Uri http://localhost:3000/posts -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"title":"My post","author":"ali","body":"hello world"}' -UseBasicParsing
```

### Delete a post
```powershell
Invoke-WebRequest -Uri http://localhost:3000/posts/1 -Method DELETE -UseBasicParsing
```

## Middleware

Three middleware functions run on every request:
- **Logger** — logs method, URL and timestamp
- **JSON parser** — parses incoming request bodies
- **Timer** — logs how long each response took

## Note
Data is stored in memory. It resets every time the server restarts. A real database will be added in a future project.
