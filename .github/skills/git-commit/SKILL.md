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

### 1. 确认当前分支及变更范围

```bash
git branch --show-current
```

根据当前分支，校验本次变更是否合规：

| 分支               | 允许的变更                                                                                         | 禁止的变更                  |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------- |
| `main`             | 业务代码（`app/`、`components/`、`lib/`、`server/`、`docs/` 等）；或 merge `copilot-settings` 分支 | `.github/` 目录下的任何文件 |
| `copilot-settings` | 仅限 `.github/` 目录下的文件（agents、instructions、skills 等）                                    | 所有 `.github/` 之外的文件  |

**为什么要分两个分支？**

- `main`：vibe coding 实践分支，面向 visitor 展示 vibe coding 的结果。只存业务代码。
- `copilot-settings`：Copilot 配置复用分支，供他人 fork 后直接复用这套配置。不能混入业务代码，否则别人 fork 时会带走不必要的内容。

如果变更内容违反上述规则，**立即停止**，告知用户并建议切换到正确的分支后再继续。

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
