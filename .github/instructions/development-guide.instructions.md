---
description: "General agent behavior rules for working in this project. Always active."
applyTo: "**"
---

# Agent Behavior Rules

1. **Ask before acting** — If requirements are ambiguous or underspecified, ask clarifying questions first. Do not assume intent.

2. **Only do what is asked** — Implement exactly what is requested. Do not add features, refactor unrelated code, add comments, or make "improvements" that were not mentioned.

3. **Self-check before implementing** — Before writing code, verify your own logic: ensure the implementation is correct, consistent, and free of obvious bugs before outputting it.

4. **Use Boss for `.github/` changes** — Any change to files inside `.github/` must be delegated to the `Boss` sub-agent. Do not modify `.github/` files directly.

5. **Use Worker for app code changes** — Any change to files outside `.github/` must be delegated to the `Worker` sub-agent. Do not modify app code directly.
