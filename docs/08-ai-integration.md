# DevPilot — AI Integration

## 1. Why use AI?

Traditional static analysis can identify known patterns. AI can help explain code, summarize findings, and reason about context.

## 2. Planned flow

```text
Source code
    ↓
Static analysis
    ↓
Candidate findings
    ↓
AI model
    ↓
Structured explanation
    ↓
Frontend
```

## 3. Why not send the whole repository to AI?

Large repositories can be expensive and inefficient to process. We should first identify relevant files and findings, then send focused context.

## 4. Structured output

The AI layer should eventually return predictable data rather than uncontrolled prose.

Conceptually:

```json
{
  "file": "src/example.cpp",
  "line": 42,
  "severity": "medium",
  "category": "bug",
  "title": "Possible division by zero",
  "explanation": "...",
  "suggestion": "..."
}
```

The exact schema will be designed when we implement the AI layer.
