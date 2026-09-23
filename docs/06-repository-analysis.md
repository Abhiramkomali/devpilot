# DevPilot — Repository Analysis

## 1. Purpose

Repository analysis is the stage where DevPilot turns a GitHub repository URL into a structured set of files that can later be inspected.

## 2. Current pipeline

```text
Repository URL
      ↓
Validate URL
      ↓
Extract owner/repository
      ↓
Get repository metadata
      ↓
Determine default branch
      ↓
Get recursive Git tree
      ↓
Filter relevant source files
```

## 3. Why we do not analyze everything immediately

Repositories may contain:
- images
- documentation
- dependencies
- generated files
- lock files
- build output
- binary files

Analyzing all of them would waste processing time and could create noisy results.

## 4. Next feature

The current tree stage gives us file paths. The next feature is to retrieve the actual content of selected files.

Target pipeline:

```text
Tree
 ↓
Source file path
 ↓
GitHub file-content request
 ↓
Decoded source code
 ↓
Analyzer
```

## 5. Future concerns

We will need limits for:
- maximum number of files
- maximum file size
- unsupported/binary files
- repositories with huge trees
- API rate limits
- duplicate requests
- timeouts
