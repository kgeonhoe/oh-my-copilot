---
name: git-commit
description: "Stage all changes, analyze the diff, and generate a Conventional Commits message, then commit. Use when: committing work, writing commit messages, git commit, stage and commit, conventional commits."
argument-hint: "Optional extra context or scope hint (e.g. 'scope: comment-system')"
---

# Git Commit

Stages all changes, inspects the diff, generates a Conventional Commits message, commits, and prints the result for verification.

## When to Use

- You're ready to commit your current work
- You want a well-formed Conventional Commits message generated for you
- You want to stage everything and commit in one step

## Procedure

### 1. Confirm Current Branch and Scope of Changes

```bash
git branch --show-current
```

Verify if the current changes are compliant based on the branch:

| Branch             | Allowed Changes                                                                                               | Forbidden Changes                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `main`             | Business code (`app/`, `components/`, `lib/`, `server/`, `docs/`, etc.); or merging `copilot-settings` branch | Any file under `.github/` directory |
| `copilot-settings` | Only files under `.github/` directory (agents, instructions, skills, etc.)                                    | All files outside `.github/`        |

**Why two branches?**

- `main`: Vibe coding practice branch, showcasing vibe coding results to visitors. Only stores business code.
- `copilot-settings`: Copilot configuration reuse branch, so others can fork and directly reuse these settings. It must not mix business code, otherwise irrelevant content is included when forked.

If the changes violate the rules above, **stop immediately**, inform the user, and suggest switching to the correct branch before proceeding.

### 2. Stage Everything

```bash
git add -A
```

### 3. Review the Staged Diff

```bash
git diff --staged --stat
```

Read the stat output to understand which files changed and in what direction (added, modified, deleted).

If nothing is staged (empty output), stop and inform the user — there is nothing to commit.

### 4. Generate the Commit Message

Use the diff stat (and optionally the full diff for non-obvious changes) to compose a message following [Conventional Commits](https://www.conventionalcommits.org/):

**Format:**

```
<type>(<scope>): <short summary>

- <key decision or non-obvious change>
- <key decision or non-obvious change>
```

**Type selection:**

| Type       | When to use                                |
| ---------- | ------------------------------------------ |
| `feat`     | New user-facing feature                    |
| `fix`      | Bug fix                                    |
| `refactor` | Code restructuring without behavior change |
| `test`     | Adding or updating tests                   |
| `docs`     | Documentation only                         |
| `chore`    | Build, tooling, config, dependencies       |

**Scope:** The feature or module name in kebab-case (e.g., `comment-system`, `blog-parser`, `navbar`). Omit if the change is truly cross-cutting.

**Rules:**

- Summary line ≤ 72 characters, imperative mood ("add", not "added" or "adds")
- Body is optional — include only for non-obvious decisions or breaking changes
- No period at the end of the summary line

### 5. Commit

```bash
git commit -m "<type>(<scope>): <summary>"
```

If there is a meaningful body, use:

```bash
git commit -m "<type>(<scope>): <summary>" -m "- decision 1\n- decision 2"
```

### 6. Confirm

```bash
git log --oneline -1
```

Print the commit hash and full message so the user can verify.
