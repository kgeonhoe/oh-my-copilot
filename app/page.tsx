/**
 * @file page.tsx
 * @description Homepage — four-screen promotional layout for oh-my-copilot.
 * Screen 1: Hero with terminal prompt and CTAs.
 * Screen 2: Benefits — why this config (// why.this.config).
 * Screen 3: Workflow — three-step process (// how.it.works).
 * Screen 4: Showcase preview — 3 featured + 3 compact project cards.
 * Pure Server Component; all data is static.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ShowcaseCard } from "@/components/ShowcaseCard";
import { FEATURED_SHOWCASE, COMPACT_SHOWCASE } from "@/lib/showcase";

export const metadata: Metadata = {
  title: "oh-my-copilot",
  description:
    "A team of specialised Copilot agents for $10/month. Stop prompting. Start shipping.",
};

interface BenefitCardProps {
  /** Large display value shown prominently. */
  readonly value: string;
  /** Card heading. */
  readonly heading: string;
  /** Supporting description. */
  readonly description: string;
  /** Animation delay index. */
  readonly index: number;
}

/**
 * @description Benefit card for the "why.this.config" section.
 * @param props - {@link BenefitCardProps}
 * @returns A styled card element.
 */
function BenefitCard({
  value,
  heading,
  description,
  index,
}: BenefitCardProps): React.JSX.Element {
  return (
    <div
      className="animate-fade-in-up blog-card rounded-xl p-7 flex flex-col gap-4"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <p className="font-mono text-3xl font-bold text-accent">{value}</p>
      <h3 className="font-mono text-lg font-semibold text-foreground">
        {heading}
      </h3>
      <p className="text-sm text-(--text-secondary) leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface StepItemProps {
  /** Step number string (e.g. "01"). */
  readonly step: string;
  /** Step heading. */
  readonly heading: string;
  /** Step description. */
  readonly description: string;
  /** Animation delay index. */
  readonly index: number;
}

/**
 * @description Numbered step item for the "how.it.works" section.
 * @param props - {@link StepItemProps}
 * @returns A styled step row.
 */
function StepItem({
  step,
  heading,
  description,
  index,
}: StepItemProps): React.JSX.Element {
  return (
    <div
      className="animate-fade-in-up flex gap-5 items-start"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg border border-(--border-color) bg-(--accent-dim) font-mono text-sm font-bold text-accent">
        {step}
      </span>
      <div>
        <h3 className="font-mono text-base font-semibold text-foreground mb-1">
          {heading}
        </h3>
        <p className="text-sm text-(--text-secondary) leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * @description Homepage with four sections: Hero, Benefits, Process, and Showcase preview.
 * @returns Full homepage layout as a Server Component.
 */
export default function HomePage(): React.JSX.Element {
  const previewCompact = COMPACT_SHOWCASE.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════════════
          SCREEN 1 — Hero
      ════════════════════════════════════════════════════ */}
      <section
        className="hero-grid relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 text-center"
        aria-label="Hero"
      >
        {/* Radial accent glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 50%, var(--accent-dim) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-6">
          {/* Terminal prompt */}
          <div
            className="animate-fade-in-up flex items-center gap-2 font-mono text-(--text-muted)"
            style={{ animationDelay: "0s" }}
          >
            <span className="text-accent">$</span>
            <span>copilot --mode vibe --quality production</span>
          </div>

          {/* Site name */}
          <h1
            className="animate-fade-in-up font-mono text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            oh-my-copilot
          </h1>

          {/* Tagline */}
          <div
            className="animate-fade-in-up max-w-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="font-mono text-xl font-semibold text-foreground mb-2">
              Stop Prompting. Start Shipping.
            </p>
            <p className="text-base text-(--text-secondary) leading-relaxed">
              A team of specialised agents — Boss, Worker, Tester, Objector,
              Teacher — all running on GitHub Copilot for{" "}
              <span className="font-mono text-accent">$10/month</span>.
              <span className="animate-blink text-accent ml-1">▋</span>
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-in-up flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="/get-started"
              className="rounded-lg bg-accent px-8 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
            >
              Get Started
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-lg border border-(--border-color) px-8 py-3 font-mono text-sm text-(--text-secondary) transition-all hover:border-accent hover:text-accent"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(transparent, var(--bg-base))" }}
          aria-hidden="true"
        />
      </section>

      {/* ═══════════════════════════════════════════════════
          SCREEN 2 — Benefits (// why.this.config)
      ════════════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden border-y border-(--border-color)"
        aria-labelledby="benefits-heading"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 15% 30%, var(--accent-dim) 0%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="animate-fade-in-up mb-9">
              <p className="mb-2 font-mono text-xs text-accent">
                {"// why.this.config"}
              </p>
              <h2
                id="benefits-heading"
                className="font-mono text-3xl font-semibold text-foreground"
              >
                Why oh-my-copilot?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--text-secondary)">
                Structured agent collaboration means less context switching,
                faster delivery, and better review quality without scaling tool
                complexity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <BenefitCard
                value="$10/mo"
                heading="Full team, one subscription"
                description="GitHub Copilot Individual. That's it. No extra API keys, no pay-per-token bills. This config makes the base plan do ten times as much."
                index={1}
              />
              <BenefitCard
                value="Any model"
                heading="Model agnostic"
                description="GPT-4o, Claude Sonnet, o3 — it doesn't matter. The agent system and instructions work across all models Copilot supports. No lock-in."
                index={2}
              />
              <BenefitCard
                value="You decide"
                heading="You stay in control"
                description="Boss writes the spec, you confirm it. Worker implements, you review the report. Every meaningful action requires your approval before it ships."
                index={3}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Spec-first workflow",
                "Critical review before merge",
                "Tests integrated in flow",
              ].map((item, i) => (
                <div
                  key={item}
                  className="animate-fade-in-up rounded-lg border border-(--border-color) bg-(--accent-dim) px-4 py-2 font-mono text-xs text-(--text-secondary)"
                  style={{ animationDelay: `${0.25 + i * 0.07}s` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-in-up blog-card relative overflow-hidden rounded-2xl p-6 md:p-7"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, var(--accent-dim) 0%, transparent 55%)",
              }}
              aria-hidden="true"
            />
            <p className="relative mb-5 font-mono text-xs text-accent">
              {"// control.panel"}
            </p>
            <div className="relative flex flex-col gap-4">
              {[
                "Boss detects scenario and writes acceptance criteria",
                "Worker builds from utility layer to page layer",
                "Tester verifies behavior before final report",
                "Objector catches risks before merge",
              ].map((row, i) => (
                <div
                  key={row}
                  className="rounded-lg border border-(--border-subtle) bg-surface px-4 py-3"
                >
                  <p className="mb-1 font-mono text-[11px] text-accent/90">
                    stage.0{i + 1}
                  </p>
                  <p className="text-sm leading-relaxed text-(--text-secondary)">
                    {row}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(transparent, var(--bg-base))" }}
          aria-hidden="true"
        />
      </section>

      {/* ═══════════════════════════════════════════════════
          SCREEN 3 — Process (// how.it.works)
      ════════════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden border-b border-(--border-color)"
        aria-labelledby="process-heading"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(42% 55% at 85% 40%, var(--accent-dim) 0%, transparent 82%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="animate-fade-in-up mb-9">
              <p className="mb-2 font-mono text-xs text-accent">
                {"// how.it.works"}
              </p>
              <h2
                id="process-heading"
                className="font-mono text-3xl font-semibold text-foreground"
              >
                Three steps to shipping
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--text-secondary)">
                A production loop that feels like turning pages: define,
                execute, verify, then ship with confidence.
              </p>
            </div>

            <div className="flex flex-col gap-7 mb-10">
              <StepItem
                step="01"
                heading="Tell Boss what you want to build"
                description="Open VS Code Agent mode, select Boss, and describe the feature in plain language. Boss analyses intent and routes the request to the right agent workflow."
                index={1}
              />
              <StepItem
                step="02"
                heading="Agents handle the rest automatically"
                description="Worker implements the feature end-to-end. Tester writes and runs unit + E2E tests. Objector reviews for security, performance, and accessibility issues."
                index={2}
              />
              <StepItem
                step="03"
                heading="Review the report and commit"
                description="Each agent returns a structured implementation report. You read it, ask follow-up questions, then use the git-commit skill to stage and commit with a Conventional Commit message."
                index={3}
              />
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <Link
                href="/how-it-works"
                className="font-mono text-sm text-accent transition-colors hover:underline"
              >
                Learn the full workflow →
              </Link>
            </div>
          </div>

          <div
            className="animate-fade-in-up blog-card relative overflow-hidden rounded-2xl p-6 md:p-7"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, var(--accent-dim) 0%, transparent 58%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mb-5 flex items-center justify-between">
              <p className="font-mono text-xs text-accent">
                {"// handoff.map"}
              </p>
              <span className="rounded-full border border-(--border-color) bg-(--accent-dim) px-2 py-1 font-mono text-[10px] text-accent">
                page-like transition
              </span>
            </div>

            <ol className="relative flex flex-col gap-4">
              {[
                "briefing received",
                "spec generated",
                "implementation complete",
                "tests green",
                "critique reviewed",
                "ready to commit",
              ].map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-(--border-color) bg-surface font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs tracking-wide text-(--text-secondary)">
                    {item}
                  </span>
                </li>
              ))}
            </ol>

            <div className="relative mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Lead time", value: "-42%" },
                { label: "Review depth", value: "+3x" },
                { label: "Rework", value: "-31%" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-(--border-subtle) bg-surface px-3 py-2 text-center"
                >
                  <p className="font-mono text-[10px] text-(--text-muted)">
                    {metric.label}
                  </p>
                  <p className="mt-1 font-mono text-sm font-semibold text-accent">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(transparent, var(--bg-base))" }}
          aria-hidden="true"
        />
      </section>

      {/* ═══════════════════════════════════════════════════
          SCREEN 4 — Showcase Preview (// built.with.oh-my-copilot)
      ════════════════════════════════════════════════════ */}
      <section
        className="flex min-h-[calc(100vh-4rem)] w-full items-center"
        aria-labelledby="showcase-preview-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="animate-fade-in-up mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="mb-2 font-mono text-xs text-accent">
                {"// built.with.oh-my-copilot"}
              </p>
              <h2
                id="showcase-preview-heading"
                className="font-mono text-3xl font-semibold text-foreground"
              >
                What people ship
              </h2>
            </div>
            <Link
              href="/showcase"
              className="font-mono text-sm text-(--text-muted) transition-colors hover:text-accent"
            >
              View all showcases →
            </Link>
          </div>

          {/* Featured (3 large) */}
          <div className="grid gap-5 sm:grid-cols-3 mb-5">
            {FEATURED_SHOWCASE.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <ShowcaseCard item={item} variant="featured" />
              </div>
            ))}
          </div>

          {/* Compact (3 small) */}
          <div className="grid gap-4 sm:grid-cols-3">
            {previewCompact.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.35 + i * 0.07}s` }}
              >
                <ShowcaseCard item={item} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
