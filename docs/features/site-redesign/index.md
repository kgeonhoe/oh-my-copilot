# Feature: Site Redesign — oh-my-copilot Promotional Site

## 目标与背景

将当前的"前端技术博客"改造成 **oh-my-copilot 配置的推广网站**。目标是让访客：

1. 理解这套 Copilot 配置是什么、能解决什么问题
2. 被 Showcase 说服（别人用它做出了真实产品）
3. 立即知道怎么上手（Get Started）

**没有后端**。所有数据静态化，Changelog 和 Showcase 数据直接写在源码里。

---

## 验收标准（Acceptance Criteria）

- [ ] 导航栏更新为：首页 / Get Started / How It Works / Showcase / Changelog / About
- [ ] 首页：Hero 区域 CTA 按钮改为 "Get Started" + "How It Works"
- [ ] 首页：第二屏展示三张优势卡片（成本、模型无关、可控）
- [ ] 首页：第三屏展示使用流程三步骤
- [ ] 首页：第四屏展示 Showcase 预览（3大+3小项目卡片，底部链接到 /showcase）
- [ ] 首页：移除"Recent Posts"模块（不再是博客）
- [ ] 新建 `/how-it-works` 页面：解释三种场景 + Agent 协作流程图
- [ ] 新建 `/showcase` 页面：3 个大项目 + 6 个小项目，含占位数据
- [ ] 新建 `/changelog` 页面：替换原 `/blog` 路由，展示版本更新日志
- [ ] 更新 `/about` 页面：Why I Did This + 作者自我介绍（虚构但可信内容）
- [ ] 更新 `/get-started` 页面：明确三个前置条件（VS Code、Copilot 订阅、fork 哪个分支）
- [ ] 删除 `docs/blogs/` 中原有的 6 篇技术博客文章
- [ ] 删除 `app/blog/` 路由目录（不再需要 blog 功能）
- [ ] `lib/blog.ts` 和 `types/blog.ts` 若不再被引用则一并删除

---

## 范围（In / Out of Scope）

**In scope:**

- 所有页面的内容替换与新页面创建
- 导航栏重构
- 首页四屏重构
- Changelog 数据（静态，写在组件或独立数据文件里）
- Showcase 数据（静态占位数据）
- About 页面内容重写

**Out of scope:**

- 后端 API
- 用户认证
- 评论系统
- Showcase 项目的实际链接（占位 `#`）
- 主题系统、动画、全局 CSS 不动

---

## 数据流

纯静态 Next.js App Router。所有数据（Changelog entries、Showcase items）以 TypeScript 常量的形式定义在 `lib/` 目录下的数据文件中，Server Components 直接 import 使用。

```
lib/changelog.ts   — ChangelogEntry[] 常量
lib/showcase.ts    — ShowcaseItem[] 常量
```

---

## 路由 & 组件规划

### 路由

| 路由             | 状态     | 说明                |
| ---------------- | -------- | ------------------- |
| `/`              | 改造     | 四屏首页            |
| `/get-started`   | 更新     | 三步骤 + 前置条件   |
| `/how-it-works`  | **新建** | 三场景 + Agent 流程 |
| `/showcase`      | **新建** | 大项目 + 小项目     |
| `/changelog`     | **新建** | 版本日志            |
| `/about`         | 改造     | Why + 作者介绍      |
| `/blog` 及子路由 | **删除** | 不再需要            |

### 新增组件

| 组件             | 位置                            | 说明                   |
| ---------------- | ------------------------------- | ---------------------- |
| `ShowcaseCard`   | `components/ShowcaseCard.tsx`   | 单个 showcase 项目卡片 |
| `ChangelogEntry` | `components/ChangelogEntry.tsx` | 单条 changelog 记录    |

### 新增数据文件

| 文件                 | 说明                |
| -------------------- | ------------------- |
| `lib/changelog.ts`   | Changelog 条目数据  |
| `lib/showcase.ts`    | Showcase 项目数据   |
| `types/changelog.ts` | ChangelogEntry 类型 |
| `types/showcase.ts`  | ShowcaseItem 类型   |

---

## 页面内容详细设计

### 首页 `/`

**Hero（第一屏）**

- Terminal prompt：`$ copilot --mode vibe --quality production`
- 主标题：`oh-my-copilot`
- 副标题：`Stop Prompting. Start Shipping.` + 一行解释（a team of specialized agents for $10/month）
- CTA：`Get Started`（filled，链接 `/get-started`） + `How It Works`（ghost，链接 `/how-it-works`）
- 保留现有动画和背景光晕效果
- 移除 Stat badges（posts 数量等旧数据）

**优势（第二屏）**

- 标题：`// why.this.config`
- 三张卡片：
  1. **$10/month** — Copilot 个人版价格，这套配置让它发挥十倍价值
  2. **Model Agnostic** — GPT-4o、Claude Sonnet 都能跑，不绑定最贵模型
  3. **You Stay In Control** — Boss 写 Spec 你确认，每一步你说了算

**流程（第三屏）**

- 标题：`// how.it.works`
- 三步：① 告诉 Boss 你要做什么 → ② Agents 自动分工：规划→实现→测试→评审 → ③ 你审阅报告，一键提交
- 底部链接：`Learn the full workflow →`（到 `/how-it-works`）

**Showcase 预览（第四屏）**

- 标题：`// built.with.oh-my-copilot`
- 3 大项目卡片（横向宽卡片）+ 3 小项目（小格子）
- 底部：`View all showcases →`（到 `/showcase`）

---

### `/how-it-works`

三个 Section：

**Section 1 — The Three Scenarios**
用三张卡片解释 Boss 路由的三个场景：

- Scenario 1：业务开发（新功能/改 bug）
- Scenario 2：配置优化（改 .github/）
- Scenario 3：讨论（先聊清楚再动手）

**Section 2 — The Agent Team**
用列表或卡片介绍每个 Agent：

- **Boss** — 你的对话入口，判断场景，调度其他 Agents
- **Worker** — 全栈实现者，Next.js + Go
- **Tester** — 写并运行单元测试 + E2E 测试
- **Objector** — 批评性评审，挑安全/性能/SEO 问题
- **Teacher** — Feynman 式教学，解释任何概念

**Section 3 — The Branch Strategy**
解释 `main` vs `copilot-settings` 分支的设计意图。

---

### `/showcase`

**大项目（3个）** — 宽卡片，含描述、技术标签、状态标签（Live / Coming Soon）

1. **TeamFlow** — 团队任务管理 SaaS
2. **StoreFront** — 全栈电商平台
3. **DevNest** — 开发者代码片段管理器

**小项目（6个）** — 小格网格
CashLens / QuickMark / JobBoard / RecipeBox / FocusRing / FreelanceCRM

每个项目包含：name、description、tech tags（Next.js / Go / Tailwind 等）、status（"Coming Soon"）、link（`#`）

---

### `/changelog`

数据结构：

```ts
interface ChangelogEntry {
  version: string; // "v0.1.0"
  date: string; // "2026-04-23"
  title: string; // "Initial Release"
  highlights: string[]; // bullet list of changes
  type: "major" | "minor" | "patch";
}
```

初始数据（3条，时间轴倒序）：

- **v0.3.0** (2026-04-23) — Agent 协作体系完善：新增 Tester E2E、Objector 评审、deploy skill
- **v0.2.0** (2026-04-10) — 全栈覆盖：新增 go-gin、docker instructions；Worker 支持后端生成
- **v0.1.0** (2026-03-28) — 初始发布：Boss/Worker/Teacher 三 Agent，git-commit skill，基础 instruction 体系

---

### `/about`

两个 Section：

**Why I Built This**

> 我每天都在用 GitHub Copilot，但一直觉得它没发挥出应有的潜力。大多数人把它当成补全工具——我想把它变成一支工程团队。
>
> 花了几周时间研究 VS Code 的 agent 系统，把 Boss、Worker、Tester、Objector 这套协作流程打磨出来。第一次让 Boss 自动把一个功能从讨论做到上线，我就知道这条路走对了。
>
> 这个配置是开源的，因为好东西应该被更多人用到。如果它帮到了你，star 一下就是最好的回报。

**About Me**

- 名字：**Alex Chen**（占位，用户可替换）
- 职业：全栈工程师，专注 Next.js + Go
- 背景：在一家 B2B SaaS 公司工作，业余时间做开源项目和写技术内容
- 链接：GitHub（`#`）、Twitter（`#`）

---

### `/get-started`（更新）

改为三个明确步骤：

1. **前置条件** — VS Code + GitHub Copilot 订阅（个人版 $10/月）
2. **Fork & Checkout** — fork 仓库，切换到 `copilot-settings` 分支，复制 `.github/` 目录到自己的项目
3. **开始对话** — 在 VS Code 中打开 Agent 模式，@Boss 说出你想做的事

---

## 边界情况 & 错误状态

- Showcase 项目 link 为 `#`，点击不跳转（`target="_blank"` 加 `onClick preventDefault` 或直接不加 href）
- Changelog 数据为静态常量，无加载状态
- `/blog` 路由删除后，任何旧书签访问 `/blog/*` 会 404，暂不加重定向（Out of scope）

---

## 开放问题

- 无。所有设计决策已在讨论中确定。
