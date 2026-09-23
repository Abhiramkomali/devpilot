# DevPilot — Project Architecture

## 1. Main components

### Frontend
Technology: Next.js + React + TypeScript

Responsibility:
- Accept repository URL
- Send analysis request to backend
- Display loading, errors, and results
- Eventually display code-analysis findings

### Backend
Technology: Node.js + Express + TypeScript

Responsibility:
- Receive repository URL
- Validate and parse the URL
- Communicate with GitHub
- Retrieve repository metadata and tree
- Eventually retrieve source-code contents
- Run analysis
- Return structured results

### GitHub API
Responsibility:
- Provide repository information
- Provide repository tree/file paths
- Provide actual file contents

## 2. Request flow

```text
Frontend
  │
  │ POST /api/analyze
  ▼
Express backend
  │
  │ authenticated HTTP request
  ▼
GitHub API
  │
  ▼
Repository data
  │
  ▼
Backend processing
  │
  ▼
JSON response
  │
  ▼
Frontend
```

## 3. Why separate frontend and backend?

The frontend is responsible for user interaction and presentation. The backend handles secrets, external API calls, repository processing, and analysis.

This separation prevents sensitive credentials such as the GitHub token from being placed in browser-side code.

## 4. Future architecture

```text
GitHub
   ↓
Repository Tree
   ↓
Relevant Files
   ↓
File Contents
   ↓
Static Analysis / AST
   ↓
AI Analysis
   ↓
Structured Findings
   ↓
Results Dashboard
```
