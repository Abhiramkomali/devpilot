# DevPilot — Git and GitHub Concepts

## 1. Repository

A repository is the project managed by Git. It contains source files, configuration, documentation, and Git history.

In DevPilot, a repository is the input that we want to inspect.

## 2. Commit

A commit is a saved snapshot of changes in Git history.

Why it matters in DevPilot:
We use commits as checkpoints so working functionality can be restored if a later feature introduces a problem.

## 3. Branch

A branch is a movable reference to a line of development.

Our main development branch is `main`.

## 4. Git tree

A Git tree represents the structure of files and directories at a particular point in a repository.

Think of it as a map of the repository.

Example:

```text
Repository
├── README.md      → blob
├── main.cpp       → blob
└── src/           → tree
    ├── app.cpp    → blob
    └── utils.cpp  → blob
```

## 5. Blob

A blob represents file contents in Git.

A blob can contain C++, JavaScript, Python, text, or other file content. The blob concept is about storing file contents, not about a specific programming language.

## 6. Tree vs blob

| Concept | Meaning |
|---|---|
| Tree | Directory/repository structure |
| Blob | File contents |

Key takeaway:

> Tree = structure; Blob = file contents.

## 7. Why DevPilot needs the tree

DevPilot should understand the repository structure before deciding which source files to analyze.

```text
Repository
   ↓
Tree
   ↓
File paths
   ↓
Filter source files
   ↓
Read selected files
   ↓
Analyze
```

## 8. `recursive=1`

When requesting a Git tree from GitHub, `recursive=1` asks for entries inside subdirectories as well.

Without recursion, a nested directory may appear without all of its contents.

With recursion, DevPilot can receive paths such as:

```text
src/monitor.cpp
src/logger.cpp
include/monitor.h
```

## 9. Repository tree is not the source code

The tree gives DevPilot information such as:

```text
src/main.cpp
```

It does not automatically mean DevPilot has the complete contents of `main.cpp`.

That is why the next feature is source-file retrieval.

## 10. Useful interview questions

**Q: What is a Git tree?**

A: A Git tree represents the directory and file structure of a repository at a particular point in its history.

**Q: What is a Git blob?**

A: A Git blob stores file contents.

**Q: Why does DevPilot retrieve the tree before reading files?**

A: It lets DevPilot understand the repository structure and choose relevant files before downloading and analyzing their contents.
