/**
 * @file page.tsx
 * @description Get Started page — three steps to activating the oh-my-copilot
 * configuration: prerequisites, fork and checkout, then start chatting with Boss.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Three steps to activating oh-my-copilot: VS Code, a Copilot subscription, and two git commands.",
};

interface StepProps {
  readonly number: number;
  readonly label: string;
  readonly description: React.ReactNode;
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
      <div
        className="absolute right-6 top-6 font-mono text-6xl font-bold opacity-[0.06] text-accent select-none"
        aria-hidden="true"
      >
        {String(number).padStart(2, "0")}
      </div>
      <p className="mb-1 font-mono text-xs text-accent">
        {"// step "}
        {number}
      </p>
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

/**
 * @description Get Started page with three prerequisite steps for activating
 * the oh-my-copilot configuration in a VS Code project.
 * @returns Full get-started page layout.
 */
export default function GetStartedPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Page header */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">{"// init"}</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          Get Started
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary) leading-relaxed max-w-2xl">
          Three steps. Two git commands. One{" "}
          <span className="font-mono text-accent">$10/month</span> subscription.
          That is all it takes to activate a full agent engineering team in VS
          Code.
        </p>
      </header>

      {/* Prerequisites callout */}
      <section
        className="animate-fade-in-up mb-12"
        style={{ animationDelay: "0.05s" }}
        aria-labelledby="prereqs-heading"
      >
        <div className="blog-card rounded-xl p-6">
          <p className="mb-3 font-mono text-xs text-accent">
            {"// prerequisites"}
          </p>
          <h2
            id="prereqs-heading"
            className="mb-4 font-mono text-base font-semibold text-foreground"
          >
            Before you start, you need:
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              {
                check: "VS Code",
                detail:
                  "Any recent version. The agent system is built into Copilot Chat.",
              },
              {
                check: "GitHub Copilot subscription",
                detail:
                  "Individual plan ($10/mo). Copilot Chat and Agent mode must be enabled.",
              },
              {
                check: "A GitHub account",
                detail: "Needed to fork the repo and push your own projects.",
              },
            ].map(({ check, detail }) => (
              <li
                key={check}
                className="flex items-start gap-2 text-sm text-(--text-secondary)"
              >
                <span className="shrink-0 text-accent font-mono mt-0.5">✓</span>
                <span>
                  <span className="font-mono text-foreground">{check}</span> —{" "}
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section aria-labelledby="steps-heading" className="mb-16">
        <p className="mb-1 font-mono text-xs text-accent">{"// setup"}</p>
        <h2
          id="steps-heading"
          className="mb-6 font-mono text-2xl font-semibold text-foreground"
        >
          Three Steps
        </h2>

        <div className="flex flex-col gap-6">
          <Step
            number={1}
            label="Fork the repo and check out copilot-settings"
            description={
              <p>
                Fork{" "}
                <span className="font-mono text-accent">oh-my-copilot</span> on
                GitHub, then locally check out the{" "}
                <span className="font-mono text-accent">copilot-settings</span>{" "}
                branch. This branch contains only the{" "}
                <span className="font-mono text-accent">.github/</span>{" "}
                directory — no app code, no dependencies.
              </p>
            }
            code="git clone https://github.com/YOUR_HANDLE/oh-my-copilot -b copilot-settings"
          />

          <Step
            number={2}
            label="Copy .github/ into your project"
            description={
              <p>
                Copy the entire{" "}
                <span className="font-mono text-accent">.github/</span> folder
                from the cloned repo into the root of your own project. VS Code
                and Copilot will automatically pick up all instructions, skills,
                agents, and prompts inside it — no extra configuration required.
              </p>
            }
            code="cp -r oh-my-copilot/.github/ your-project/"
          />

          <Step
            number={3}
            label="Open Agent mode and talk to Boss"
            description={
              <>
                <p className="mb-3">
                  Open your project in VS Code. In Copilot Chat, switch to{" "}
                  <span className="font-mono text-accent">Agent</span> mode and
                  select the <span className="font-mono text-accent">Boss</span>{" "}
                  agent. Describe what you want to build in plain language —
                  Boss will route your request to the right agent workflow
                  automatically.
                </p>
                <p>
                  Try starting with:{" "}
                  <span className="font-mono text-accent">
                    &ldquo;I want to add user authentication to my app.&rdquo;
                  </span>
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* CTA */}
      <div
        className="animate-fade-in-up blog-card rounded-2xl p-8 text-center"
        style={{ animationDelay: "0.45s" }}
      >
        <p className="mb-2 font-mono text-xs text-accent">{"// next"}</p>
        <h2 className="mb-4 font-mono text-2xl font-semibold text-foreground">
          Understand the system
        </h2>
        <p className="mb-6 text-(--text-secondary)">
          Read How It Works to understand the three routing scenarios and what
          each agent specialises in — before you start your first session.
        </p>
        <Link
          href="/how-it-works"
          className="inline-block rounded-lg bg-accent px-7 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
        >
          How It Works &rarr;
        </Link>
      </div>
    </div>
  );
}
