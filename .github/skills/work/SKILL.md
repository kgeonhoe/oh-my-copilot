---
name: work
description: "Implement a new feature in this Next.js + Tailwind project. Use when adding a feature from a markdown spec: abstract logic, define API/data flow, audit existing code for reuse, decompose into small parts, implement, write unit tests, then update the spec with findings."
argument-hint: "Path to feature spec (e.g. .github/features/my-feature/index.md)"
---

# Feature Implementation Workflow

你是当前对话中的全栈工程师角色，负责将 spec 文档变成干净可运行的代码。你在 Boss 的上下文中运行，**共享完整的对话历史**，不需要通过 spec 重新理解需求背景。

技术栈：**Next.js 15 App Router + Tailwind + Shadcn/ui**（前端）+ **Go + Gin**（后端，如涉及）。

---

## 第一步 — 确认分支

确认当前在 `main` 分支（Boss 的场景 1 流程已完成分支切换，通常已就绪）：

```bash
git branch --show-current
```

---

## Phase 0 — 侦查代码库

读取以下文件，了解现状（利用对话中已有的上下文，跳过已知内容）：

1. spec 文档（`.github/features/<name>/index.md`）
2. `AGENTS.md` — 项目约束
3. `.github/instructions/nextjs-tailwind.instructions.md` — 前端规范
4. `.github/instructions/general-frontend.instructions.md` — TypeScript 规范
5. `.github/instructions/go-gin.instructions.md` — 后端规范（如涉及后端）
6. `app/` 目录结构 — 现有路由
7. `components/`、`lib/`、`types/` — 可复用模块
8. `server/` — 后端现有代码（如存在）
9. `package.json` — 可用依赖

对每个找到的候选模块，判断：**直接复用**、**扩展**、还是**新建**。

---

## Phase 1 — 拆解实现计划

将 spec 拆解为独立可测试的实现单元，按以下顺序排列：

```
纯函数 / 工具函数
  → 类型定义
  → 后端 API（Gin Handler + 路由注册）
  → 前端数据层（Server Actions / fetch utils）
  → 自定义 Hooks
  → UI 组件（从叶子到容器）
  → 页面（Page / Layout）
```

**列出每个文件的路径和职责，再开始写代码。**

---

## Phase 2 — 实现

按 Phase 1 的顺序自底向上实现，**不跳步骤**。

### 前端规范

- 遵循 `.github/instructions/nextjs-tailwind.instructions.md`
- 遵循 `.github/instructions/general-frontend.instructions.md`（文档注释规范见 development-guide，始终生效）
- 加载并遵循 `.github/skills/frontend-design/SKILL.md` 的设计原则
- 优先使用 Shadcn/ui 组件（`npx shadcn@latest add <component>` 如未安装）
- Server Component 优先，仅在需要浏览器 API 或 hooks 时加 `"use client"`
- 所有图片用 `next/image`，所有内部链接用 `next/link`
- 样式用 Tailwind utilities + `cn()`，不用 inline style

### 后端规范

- 遵循 `.github/instructions/go-gin.instructions.md`
- Handler 只做请求解析 + 调用 Service + 返回响应，业务逻辑放 Service 层
- 所有 Handler 必须有错误处理，返回统一的 JSON 错误格式
- 新路由在路由文件中注册，不在 main.go 里散写

### 通用规范

- 每个文件有 JSDoc / GoDoc 文件头说明
- 无 `any` 类型（TypeScript），无 `interface{}` 滥用（Go）
- 只实现 spec 里描述的内容，不加额外功能

### 每个文件的 checklist

- [ ] JSDoc / GoDoc 文件头
- [ ] 所有导出符号有文档注释
- [ ] 无 `any` 类型
- [ ] 无多余 import
- [ ] Tailwind 类名遵循项目 token 约定
- [ ] `"use client"` 仅在必要处出现

---

## Phase 3 — 更新 Spec 文档

实现完成后，在 spec 文档（`.github/features/<name>/index.md`）末尾追加 `## Implementation Notes` 章节：

```markdown
## Implementation Notes

### Decisions & Deviations

- [与 spec 不同的地方及原因]

### Reused Components / Utilities

- `ComponentName` — [为何复用 / 如何扩展]

### New Abstractions Introduced

- `lib/foo.ts` — [做什么，为何抽象]

### Known Gaps / Follow-ups

- [范围外的内容、技术债、后续工作]
```

**追加，不删除原有内容。**

---

## Phase 4 — 实现报告

向 Boss 返回结构化报告：

```
## 实现报告

### 新增 / 修改 / 删除的文件
- `path/to/file.tsx` — [职责描述]
- `server/handler/xxx.go` — [职责描述]

### 关键决策
- [非显而易见的技术选择 + 原因]

### 已知局限
- [未实现的边界情况，或 spec 中模糊的地方]
```
