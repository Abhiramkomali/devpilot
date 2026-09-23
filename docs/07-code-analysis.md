# DevPilot — Code Analysis

This document covers the planned analysis layer.

## 1. Static analysis

Static analysis examines source code without executing the program.

Examples:
- unreachable code
- suspicious conditions
- possible null/undefined access
- unused variables
- risky operations
- complexity problems

## 2. AST — Abstract Syntax Tree

An AST represents source code as a structured tree.

Example:

```text
IfStatement
├── Condition
│   └── x == 10
└── Body
    └── function call
```

### Why DevPilot may use ASTs
Text search only sees characters. An AST gives us structural information about the program.

## 3. Planned analysis layers

```text
Source code
   ↓
Language-specific parsing
   ↓
AST / static checks
   ↓
Potential findings
   ↓
AI explanation
```

## 4. Categories of findings

### Bugs
Potential programming errors.

### Security
Potential vulnerabilities or unsafe patterns.

### Performance
Potentially inefficient operations.

### Code quality
Readability, duplication, complexity, and maintainability concerns.

## 5. Important design principle

AI should not be the only layer. Deterministic checks and language tooling can identify concrete patterns, while an AI model can help explain findings and reason about context.

This hybrid design is one of the concepts we will develop further.
