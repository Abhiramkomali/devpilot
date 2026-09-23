# DevPilot — Security

## 1. GitHub token

The GitHub token is a secret credential.

It must not be:
- hardcoded in source files
- committed to Git
- sent to the browser
- pasted into public documentation
- included in screenshots

## 2. `.env`

The token is stored locally in:

```text
backend/.env
```

Example structure:

```env
GITHUB_TOKEN=YOUR_TOKEN
```

The actual token should never be documented.

## 3. `.gitignore`

The project already ignores:

```text
.env
.env.local
.env.*.local
```

Therefore the local token file is not intended to be committed.

## 4. Fine-grained permissions

For the current DevPilot use case, the GitHub token was configured with restricted repository access and read-only repository permissions.

This follows the principle of least privilege: give an application only the access it needs.

## 5. If a token is exposed

Revoke the exposed token in GitHub and create a replacement. Never attempt to hide a leaked token by merely deleting it from the latest commit.
