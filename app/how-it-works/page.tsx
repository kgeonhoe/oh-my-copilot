/**
 * @file page.tsx
 * @description How It Works page — explains the three usage scenarios, introduces
 * the full agent team, and describes the branch strategy for the oh-my-copilot config.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how oh-my-copilot's Boss agent routes your requests across specialised agents for planning, implementation, testing, and review.",
};

interface ScenarioCardProps {
  /** Display number shown as a large background accent. */
  readonly number: string;
  /** Scenario label (used as heading). */
  readonly label: string;
  /** When this scenario applies. */
  readonly trigger: string;
  /** What happens when this scenario is activated. */
  readonly description: string;
  /** Delay index for stagger animation. */
  readonly index: number;
}

/**
 * @description Card explaining one of the three Boss routing scenarios.
 * @param props - {@link ScenarioCardProps}
 * @returns A styled scenario card.
 */
function ScenarioCard({
  number,
  label,
  trigger,
  description,
  index,
}: ScenarioCardProps): React.JSX.Element {
  return (
    <div
      className="animate-fade-in-up blog-card relative overflow-hidden rounded-xl p-7"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="absolute right-5 top-4 font-mono text-7xl font-bold text-accent select-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        {number}
      </div>
      <p className="mb-1 font-mono text-xs text-accent">// scenario {number}</p>
      <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">
        {label}
      </h3>
      <p className="mb-3 text-xs font-mono text-(--text-muted) bg-(--accent-dim) border border-(--border-color) inline-block px-2 py-0.5 rounded">
        when: {trigger}
      </p>
      <p className="text-sm text-(--text-secondary) leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface AgentCardProps {
  /** Agent name (e.g. "Boss"). */
  readonly name: string;
  /** One-line role description. */
  readonly role: string;
  /** Longer explanation of what the agent does. */
  readonly description: string;
  /** Delay index for stagger animation. */
  readonly index: number;
}

/**
 * @description Card for a single agent in the agent team roster.
 * @param props - {@link AgentCardProps}
 * @returns A styled agent card.
 */
function AgentCard({
  name,
  role,
  description,
  index,
}: AgentCardProps): React.JSX.Element {
  return (
    <div
      className="animate-fade-in-up blog-card rounded-xl p-6"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start gap-4">
        <span
          className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg border border-(--border-color) bg-(--accent-dim) font-mono text-sm font-bold text-accent"
          aria-hidden="true"
        >
          @
        </span>
        <div>
          <p className="font-mono text-base font-semibold text-foreground">
            {name}
          </p>
          <p className="font-mono text-xs text-accent mb-2">{role}</p>
          <p className="text-sm text-(--text-secondary) leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * @description How It Works page: three scenarios, agent team roster, and branch strategy.
 * @returns Full how-it-works page layout.
 */
export default function HowItWorksPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      {/* ── Page header ─────────────────────────────────── */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">// architecture</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          How It Works
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
          Every request you make goes through{" "}
          <span className="font-mono text-accent">Boss</span> — the routing
          agent that decides which specialists to delegate to based on what
          you&apos;re trying to do.
        </p>
      </header>

      {/* ── Section 1: The Three Scenarios ──────────────── */}
      <section className="mb-20" aria-labelledby="scenarios-heading">
        <div
          className="animate-fade-in-up mb-8"
          style={{ animationDelay: "0.05s" }}
        >
          <p className="mb-1 font-mono text-xs text-accent">// boss.routes</p>
          <h2
            id="scenarios-heading"
            className="font-mono text-2xl font-semibold text-foreground"
          >
            The Three Scenarios
          </h2>
          <p className="mt-2 text-sm text-(--text-secondary) max-w-xl">
            Boss analyses your message and routes it to one of three tracks —
            each with a different team composition and workflow.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <ScenarioCard
            number="01"
            label="Build"
            trigger="new feature / bug fix"
            description="Boss hands off to Worker for full-stack implementation, then Tester writes and runs tests, then Objector reviews for security and quality before you commit."
            index={1}
          />
          <ScenarioCard
            number="02"
            label="Configure"
            trigger="change .github/ settings"
            description="Any request touching instructions, skills, agents, or prompts is routed to the specialised agent-customization skill — never mixed with app code changes."
            index={2}
          />
          <ScenarioCard
            number="03"
            label="Discuss"
            trigger="explore / understand"
            description="Boss switches to Teacher mode: Feynman-style explanations, concept breakdowns, and architecture discussions before a single line of code is written."
            index={3}
          />
        </div>
      </section>

      {/* ── Section 2: The Agent Team ───────────────────── */}
      <section className="mb-20" aria-labelledby="team-heading">
        <div className="animate-fade-in-up mb-8">
          <p className="mb-1 font-mono text-xs text-accent">// agent.team</p>
          <h2
            id="team-heading"
            className="font-mono text-2xl font-semibold text-foreground"
          >
            The Agent Team
          </h2>
          <p className="mt-2 text-sm text-(--text-secondary) max-w-xl">
            Five specialised agents, each with a distinct skill set and scope.
            You only ever talk to Boss — the rest are activated automatically.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AgentCard
            name="Boss"
            role="Routing & orchestration"
            description="Your single point of contact. Reads your intent, selects the right scenario, and delegates to Worker, Tester, Objector, or Teacher accordingly."
            index={0}
          />
          <AgentCard
            name="Worker"
            role="Full-stack implementation"
            description="Builds the feature end-to-end: types → data layer → API → hooks → UI components → page. Follows all coding instructions and reports back on every decision."
            index={1}
          />
          <AgentCard
            name="Tester"
            role="Unit tests & E2E coverage"
            description="Writes Jest/Vitest unit tests for new logic and generates Playwright E2E scripts. Runs tests and reports failures before the implementation is considered done."
            index={2}
          />
          <AgentCard
            name="Objector"
            role="Critical review"
            description="Reads the implementation report and raises objections on security gaps, performance anti-patterns, SEO issues, and accessibility failures — before code ships."
            index={3}
          />
          <AgentCard
            name="Teacher"
            role="Feynman-style explanations"
            description="Breaks down any concept, architecture, or codebase decision into clear, layered explanations. Ideal before starting a new feature or after a confusing Objector report."
            index={4}
          />
        </div>
      </section>

      {/* ── Section 3: Branch Strategy ──────────────────── */}
      <section className="mb-20" aria-labelledby="branch-heading">
        <div className="animate-fade-in-up mb-8">
          <p className="mb-1 font-mono text-xs text-accent">// git.strategy</p>
          <h2
            id="branch-heading"
            className="font-mono text-2xl font-semibold text-foreground"
          >
            Branch Strategy
          </h2>
        </div>

        <div
          className="animate-fade-in-up blog-card rounded-xl p-7"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-sm font-semibold text-accent mb-2">
                main
              </p>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                The promotional website you&apos;re reading right now. Built
                with Next.js + Tailwind and deployed as the public face of the
                project. Clone this branch if you want to run or fork the site.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-accent mb-2">
                copilot-settings
              </p>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                Contains only the{" "}
                <span className="font-mono text-accent">.github/</span>{" "}
                directory — the instructions, skills, agents, and prompts. Check
                out this branch and copy{" "}
                <span className="font-mono text-accent">.github/</span> into
                your own project to activate the full agent system.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-(--border-color) bg-surface px-4 py-3 font-mono text-sm text-accent overflow-x-auto">
            <span className="text-(--text-muted) mr-2 select-none">$</span>
            git checkout copilot-settings &amp;&amp; cp -r .github/
            ../your-project/
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div
        className="animate-fade-in-up text-center"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/get-started"
          className="inline-block rounded-lg bg-accent px-7 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}
