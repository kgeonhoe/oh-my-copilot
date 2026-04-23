/**
 * @file page.tsx
 * @description Get Started page — explains how to use the oh-my-copilot .github
 * configuration to supercharge VS Code Copilot for vibe coding workflows.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Learn how to use the oh-my-copilot .github config to unlock enhanced Copilot workflows for vibe coding.",
};

interface StepProps {
  /** Step number (1-based). */
  readonly number: number;
  /** Short step label. */
  readonly label: string;
  /** Step description. */
  readonly description: React.ReactNode;
  /** Optional code snippet or terminal command. */
  readonly code?: string;
}

/**
 * @description Numbered step card in the Get Started guide.
 * @param props - {@link StepProps}
 * @returns A styled step card.
 */
function Step({
  number,
  label,
  description,
  code,
}: StepProps): React.JSX.Element {
  return (
    <div
      className="animate-fade-in-up blog-card relative overflow-hidden rounded-2xl p-8"
      style={{ animationDelay: `${number * 0.1}s` }}
    >
      {/* Step number accent */}
      <div
        className="absolute right-6 top-6 font-mono text-6xl font-bold opacity-[0.06] text-accent select-none"
        aria-hidden="true"
      >
        {String(number).padStart(2, "0")}
      </div>

      <p className="mb-1 font-mono text-xs text-accent">// step {number}</p>
      <h3 className="mb-3 font-mono text-xl font-semibold text-foreground">
        {label}
      </h3>
      <div className="text-(--text-secondary) leading-relaxed">
        {description}
      </div>

      {code && (
        <div className="mt-4 rounded-lg bg-surface border border-(--border-color) px-4 py-3 font-mono text-sm text-accent overflow-x-auto">
          <span className="text-(--text-muted) select-none mr-2">$</span>
          {code}
        </div>
      )}
    </div>
  );
}

interface FileItemProps {
  /** File path relative to the repo root. */
  readonly path: string;
  /** Brief description of what this file does. */
  readonly description: string;
  /** Optional badge text (e.g. "always active"). */
  readonly badge?: string;
}

/**
 * @description A single config file listed in the directory overview.
 * @param props - {@link FileItemProps}
 * @returns A styled file row.
 */
function FileItem({
  path,
  description,
  badge,
}: FileItemProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 py-3 border-b border-(--border-color) last:border-0">
      <span className="shrink-0 font-mono text-sm text-accent">{path}</span>
      <span className="flex-1 text-sm text-(--text-secondary)">
        {description}
      </span>
      {badge && (
        <span className="shrink-0 rounded-full bg-(--accent-dim) border border-(--border-color) px-2 py-0.5 font-mono text-xs text-(--text-muted)">
          {badge}
        </span>
      )}
    </div>
  );
}

/**
 * @description Get Started page explaining the .github vibe coding config.
 * @returns Full get-started page layout.
 */
export default function GetStartedPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      {/* ── Page header ────────────────────────────────── */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">// init</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          Get Started
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
          The <span className="font-mono text-accent">.github/</span> folder in
          this repo is a ready-to-fork Copilot enhancement kit. Drop it into any
          project and instantly unlock structured instructions, skills, and
          agents for high-quality vibe coding.
        </p>
      </header>

      {/* ── What's inside ──────────────────────────────── */}
      <section
        className="animate-fade-in-up mb-16"
        style={{ animationDelay: "0.1s" }}
        aria-labelledby="config-heading"
      >
        <p className="mb-1 font-mono text-xs text-accent">// ls .github/</p>
        <h2
          id="config-heading"
          className="mb-6 font-mono text-2xl font-semibold text-foreground"
        >
          What&apos;s Inside
        </h2>

        <div className="blog-card rounded-2xl p-8">
          <FileItem
            path=".github/instructions/*.instructions.md"
            description="Always-on coding rules Copilot follows in every conversation — style, conventions, security."
            badge="always active"
          />
          <FileItem
            path=".github/skills/*/SKILL.md"
            description="Reusable domain workflows (frontend design, testing, feature work) loaded on demand."
            badge="on demand"
          />
          <FileItem
            path=".github/agents/*.agent.md"
            description="Specialized sub-agents — Worker, Teacher, Objector — each with a distinct role and expertise."
          />
          <FileItem
            path="AGENTS.md"
            description="Project-level facts: monorepo layout, commands, architecture, and conventions for the AI to follow."
          />
        </div>
      </section>

      {/* ── Steps ──────────────────────────────────────── */}
      <section aria-labelledby="steps-heading" className="mb-16">
        <p className="mb-1 font-mono text-xs text-accent">// how-to</p>
        <h2
          id="steps-heading"
          className="mb-6 font-mono text-2xl font-semibold text-foreground"
        >
          Setup in 3 Steps
        </h2>

        <div className="flex flex-col gap-6">
          <Step
            number={1}
            label="Fork or clone this repo"
            description={
              <p>
                Start by forking{" "}
                <span className="font-mono text-accent">oh-my-copilot</span> on
                GitHub or clone the{" "}
                <span className="font-mono text-accent">.github/</span> folder
                directly into your own project. The config is self-contained —
                no extra dependencies required.
              </p>
            }
            code="git clone https://github.com/your-handle/oh-my-copilot"
          />

          <Step
            number={2}
            label="Open in VS Code with Copilot"
            description={
              <p>
                Make sure{" "}
                <span className="font-mono text-accent">GitHub Copilot</span>{" "}
                (Chat) is installed and signed in. VS Code automatically picks
                up{" "}
                <span className="font-mono text-accent">
                  .github/instructions/
                </span>{" "}
                and applies them to every chat message. No configuration step
                needed.
              </p>
            }
            code="code ."
          />

          <Step
            number={3}
            label="Start vibe coding"
            description={
              <>
                <p className="mb-3">
                  Open a Copilot chat and start describing what you want to
                  build. Use{" "}
                  <span className="font-mono text-accent">Worker</span> mode to
                  implement full features end-to-end,{" "}
                  <span className="font-mono text-accent">Teacher</span> to
                  understand any concept, and{" "}
                  <span className="font-mono text-accent">Objector</span> to get
                  adversarial code review before shipping.
                </p>
                <p>
                  Skills like{" "}
                  <span className="font-mono text-accent">frontend-design</span>{" "}
                  and{" "}
                  <span className="font-mono text-accent">webapp-testing</span>{" "}
                  load automatically when the task requires them.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* ── Tips ───────────────────────────────────────── */}
      <section
        className="animate-fade-in-up mb-16"
        style={{ animationDelay: "0.4s" }}
        aria-labelledby="tips-heading"
      >
        <p className="mb-1 font-mono text-xs text-accent">// pro-tips</p>
        <h2
          id="tips-heading"
          className="mb-6 font-mono text-2xl font-semibold text-foreground"
        >
          Tips for Best Results
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Keep AGENTS.md current",
              body: "Update it whenever your stack or conventions change. It's the AI's map of your project.",
            },
            {
              title: "Write feature specs first",
              body: "Ask Worker to write a spec before coding. Review it, then say 'ok' — this prevents scope creep.",
            },
            {
              title: "Use Objector before shipping",
              body: "Run adversarial review on critical features. It catches security, UX, and edge-case issues early.",
            },
            {
              title: "Trust the skills",
              body: "Skills encode months of prompt engineering. Don't override them unless you know what you're doing.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="blog-card rounded-xl p-6">
              <h3 className="mb-2 font-mono text-sm font-semibold text-accent">
                {title}
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <footer
        className="animate-fade-in-up blog-card rounded-2xl p-8 text-center"
        style={{ animationDelay: "0.5s" }}
      >
        <p className="mb-2 font-mono text-xs text-accent">// ready?</p>
        <h2 className="mb-4 font-mono text-2xl font-semibold text-foreground">
          Ready to ship?
        </h2>
        <p className="mb-6 text-(--text-secondary)">
          Read the blog posts for real examples, or visit the About page to
          understand the philosophy behind this project.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="rounded-lg bg-accent px-6 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
          >
            /blog
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-(--border-color) px-6 py-3 font-mono text-sm text-(--text-secondary) transition-all hover:border-accent hover:text-accent"
          >
            /about
          </Link>
        </div>
      </footer>
    </div>
  );
}
