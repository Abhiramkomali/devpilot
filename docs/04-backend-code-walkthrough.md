# DevPilot — Backend Code Walkthrough

This document explains the important backend code in the context of DevPilot.

## 1. Express

Example:

```ts
import express from "express";
```

### What does it do?
Imports Express so the backend can create an HTTP server and API routes.

### Why did we write it?
DevPilot needs a server that can receive requests from the Next.js frontend.

### What happens when it executes?
Node.js loads the Express package and makes the imported functionality available to the file.

### What happens without it?
The backend cannot use Express to create its API server.

### Where else is it useful?
Express is commonly used to build Node.js HTTP APIs and web servers.

---

## 2. CORS

Example:

```ts
import cors from "cors";
```

### Why did we use it?
The frontend and backend run on different local origins/ports during development. CORS controls whether browser requests between those origins are permitted.

### What happens?
The Express application can use CORS middleware to add the appropriate HTTP response headers.

---

## 3. Environment variables

Example:

```ts
import "dotenv/config";
```

### What does it do?
Loads values from `.env` into the Node.js environment.

### Why did DevPilot need it?
The GitHub token is a secret and should not be hardcoded in source code.

### Flow

```text
.env
 ↓
dotenv
 ↓
process.env.GITHUB_TOKEN
 ↓
GitHub request
```

### What happens without it?
The token may be unavailable to the application, causing authenticated GitHub requests to fail.

### Security rule
Never commit `.env` or expose the token in frontend code.

---

## 4. `async`

Backend API handlers that perform network requests need asynchronous execution.

Example:

```ts
app.post("/api/analyze", async (req, res) => {
```

### Why?
Network requests take time. JavaScript represents their eventual results with Promises.

`async` allows the function to use `await`.

---

## 5. `await`

Example:

```ts
const githubResponse = await fetch(githubApiUrl, ...);
```

### What does it do?
Waits for the Promise returned by `fetch()` to settle before continuing with the next dependent operation.

### Why?
DevPilot needs GitHub's response before it can inspect the repository data.

### Important error we encountered

We previously received:

```text
"await" can only be used inside an "async" function
```

The cause was using `await` inside a function that was not declared `async`.

### Key takeaway

If a function contains `await`, it normally needs to be an asynchronous function.

---

## 6. `fetch()`

Example:

```ts
const githubResponse = await fetch(githubApiUrl, {
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "DevPilot/1.0",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});
```

### What does it do?
Sends an HTTP request to the GitHub API.

### Why DevPilot uses it
DevPilot needs external repository data.

### Runtime flow

```text
fetch()
 ↓
HTTP request
 ↓
GitHub API
 ↓
HTTP response
 ↓
githubResponse
```

---

## 7. Authorization header

Example:

```ts
Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
```

### What does it do?
Attaches the GitHub token to the API request.

### Why did we add it?
Our unauthenticated request previously failed with:

```text
403 API rate limit exceeded
```

Authentication allows GitHub to associate the request with the authorized token and apply the token's access permissions and rate limits.

### Security
The token comes from the backend environment rather than being hardcoded.

---

## 8. `process.env`

Example:

```ts
process.env.GITHUB_TOKEN
```

### What does it do?
Reads the `GITHUB_TOKEN` environment variable available to the Node.js process.

### Why?
Keeps secrets outside the source code.

---

## 9. Real testing result

After adding the token, our request successfully returned:

```text
success : True
message : Repository analyzed successfully
```

This confirmed that the backend could authenticate and communicate with GitHub successfully.
