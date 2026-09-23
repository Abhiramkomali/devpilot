# DevPilot — Testing and Debugging Log

This file records real problems encountered while building DevPilot and what each problem taught us.

## Problem 1 — `await` outside an async function

### Error

```text
"await" can only be used inside an "async" function
```

### Cause

An `await` expression was placed inside a function that was not declared `async`.

### Lesson

Asynchronous network operations return Promises. `await` is used inside an asynchronous context to wait for the result.

---

## Problem 2 — Repository URL validation

### Error

```text
Please provide a valid GitHub repository URL
```

### Cause

The backend's repository URL parsing/validation logic rejected the supplied value.

### Lesson

User input must be validated before it is used to construct external API requests.

---

## Problem 3 — Repository not accessible

### Error

```text
Repository not found or is not publicly accessible
```

### Cause

At that point the backend could not access the requested repository through the GitHub API.

### Lesson

A repository URL being syntactically valid does not guarantee that an API request has access to the repository.

---

## Problem 4 — GitHub API rate limit

### Error

```text
API rate limit exceeded
status: 403
```

### Cause

The GitHub API request was unauthenticated and the available request limit was exhausted.

### Solution

We created a fine-grained GitHub token, stored it in `.env`, loaded it with dotenv, and attached it as a Bearer token.

### Result

The authenticated request succeeded:

```text
success : True
message : Repository analyzed successfully
```

---

## Problem 5 — Protecting `.env`

### Observation

`git status` showed changes to:

```text
backend/package.json
backend/package-lock.json
backend/server.ts
```

but did not show `.env`.

### Lesson

The `.env` ignore rule is working, so the secret file is not being tracked by Git.

## Testing principle

When adding a feature:
1. Make one focused change.
2. Start the affected service.
3. Test the endpoint or UI.
4. Read the actual error.
5. Fix the root cause.
6. Retest.
7. Commit the working checkpoint.
