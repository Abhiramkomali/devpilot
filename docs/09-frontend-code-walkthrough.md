# DevPilot — Frontend Code Walkthrough

## 1. Responsibility

The Next.js frontend is responsible for user interaction and displaying analysis results.

## 2. Repository URL state

The repository URL entered by the user is stored in React state so the UI can use the current value.

## 3. Calling the backend

The frontend sends an HTTP POST request to:

```text
/api/analyze
```

The request body contains the repository URL.

### Why?
The backend needs to know which repository to analyze.

## 4. Frontend/backend separation

The frontend should not contain the GitHub token.

The browser sends:

```text
repository URL
```

to the backend.

The backend handles:

```text
GitHub token
GitHub API
repository processing
```

This keeps the secret on the server side.
