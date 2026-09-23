# DevPilot — Project Overview

## 1. What is DevPilot?

DevPilot is a developer tool that accepts a GitHub repository URL, retrieves the repository structure and source code, analyzes the code, and presents useful findings to the developer.

The long-term goal is to provide an automated code-review experience that can identify potential bugs, security concerns, performance issues, and code-quality problems, then explain those findings clearly.

## 2. Current development flow

```text
User enters GitHub repository URL
        ↓
Next.js frontend
        ↓
Express/TypeScript backend
        ↓
GitHub REST API
        ↓
Repository information
        ↓
Git tree / file paths
        ↓
Actual source-code contents
        ↓
Code analysis
        ↓
Analysis results
        ↓
Next.js results UI
```

## 3. Current progress

We are tracking DevPilot at approximately 33% complete.

Completed foundation:
- Next.js frontend setup
- Express + TypeScript backend
- Frontend-to-backend API connection
- GitHub repository URL validation
- GitHub API authentication
- Repository information retrieval
- Repository tree retrieval
- Source-file identification
- Successful API testing

Next major milestone:
- Retrieve actual source-code contents from selected files.

## 4. Project principle

DevPilot is being built as a learning project as well as a software project. Every significant implementation should be documented with:
- What the code does
- Why we wrote it
- What happens when it executes
- What happens without it
- Where the concept is useful
- Problems encountered
- Interview/viva questions
