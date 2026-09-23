# DevPilot — Learning Notes

This is the personal learning log for the project.

## Current milestone

Approximately 33% complete.

## Concepts learned so far

### Git and GitHub
- Repository
- Commit
- Branch
- Git tree
- Git blob
- GitHub REST API
- Recursive tree retrieval

### Backend
- Node.js
- Express
- TypeScript
- HTTP API routes
- `fetch`
- Promises
- `async`
- `await`
- environment variables
- dotenv
- request headers
- authorization

### Security
- API tokens
- `.env`
- `.gitignore`
- least-privilege permissions

### Debugging
- Reading backend errors
- Testing APIs with PowerShell
- Understanding HTTP status codes
- Git checkpoints

## Key mental models

### Tree vs blob

```text
Tree → structure
Blob  → file contents
```

### DevPilot repository pipeline

```text
URL
 ↓
Repository metadata
 ↓
Git tree
 ↓
Source paths
 ↓
File contents
 ↓
Analysis
 ↓
Findings
```

## Real lessons from mistakes

1. `await` requires an appropriate asynchronous context.
2. External API calls can fail even when the local server is running.
3. Authentication and authorization are different from URL validation.
4. Secrets should live outside source code.
5. Testing the real endpoint is better than assuming code works.
6. Git checkpoints make iterative development safer.

## Next concepts to learn

1. GitHub file contents API
2. File content decoding
3. Repository size limits
4. Static analysis
5. ASTs
6. Language parsers
7. Structured analysis results
8. AI/LLM integration
9. Frontend results dashboard
10. Testing and deployment
