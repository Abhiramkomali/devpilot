# DevPilot — GitHub API Code Walkthrough

## 1. Repository API request

DevPilot constructs a GitHub repository API URL from the repository owner and name.

Conceptually:

```text
https://api.github.com/repos/{owner}/{repo}
```

### Purpose
Retrieve repository-level information such as repository metadata and the default branch.

## 2. Authenticated request

```ts
const githubResponse = await fetch(githubApiUrl, {
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "DevPilot/1.0",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});
```

### Line-by-line

`fetch(githubApiUrl)`
- Sends the request to GitHub.

`Accept`
- Tells GitHub which API representation we expect.

`User-Agent`
- Identifies the application making the request.

`Authorization`
- Sends the token used to authenticate the request.

`await`
- Waits for the HTTP response.

## 3. Checking the response

The backend should check whether GitHub returned a successful HTTP status before trusting the response data.

This is important because an HTTP request can complete while GitHub reports an error such as 404 or 403.

## 4. Tree API

DevPilot then requests the repository Git tree.

Conceptually:

```text
https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1
```

### Why?
The tree tells DevPilot which files exist and where they are located.

## 5. `recursive=1`

This asks GitHub to include nested entries rather than only the top level.

## 6. Source-file filtering

DevPilot maintains a list of source-code extensions.

Example:

```ts
const sourceExtensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".h",
  ".hpp",
];
```

### Why?
A repository may contain images, documentation, lock files, build output, and other non-source files. Filtering reduces unnecessary processing.

## 7. Real problem encountered: rate limiting

Initial unauthenticated GitHub requests produced:

```text
API rate limit exceeded
status: 403
```

### Solution
We created a GitHub fine-grained personal access token with restricted repository access and read permissions, stored it in `.env`, and attached it to backend GitHub requests.

## 8. Important security rule

The token must never be committed to Git.

Our `.gitignore` contains:

```text
.env
.env.local
.env.*.local
```

This keeps local environment files out of Git tracking.
