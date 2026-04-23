/**
 * @file page.tsx
 * @description About page — explains why oh-my-copilot was built and introduces
 * the author. Two sections: "Why I Built This" and "About Me".
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why oh-my-copilot was built, and the person behind it — Alex Chen, full-stack engineer and open-source contributor.",
};

/**
 * @description About page with two sections: project motivation and author bio.
 * @returns Full about page layout.
 */
export default function AboutPage(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      {/* Page header */}
      <header className="animate-fade-in-up mb-16">
        <p className="mb-2 font-mono text-xs text-accent">// whoami</p>
        <h1 className="font-mono text-4xl font-bold text-foreground md:text-5xl">
          About
        </h1>
      </header>

      {/* Why I Built This */}
      <section
        className="animate-fade-in-up mb-8"
        style={{ animationDelay: "0.1s" }}
        aria-labelledby="why-heading"
      >
        <div className="blog-card relative overflow-hidden rounded-2xl p-8 md:p-12">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-accent"
            aria-hidden="true"
          />
          <div className="pl-4">
            <h2
              id="why-heading"
              className="mb-6 font-mono text-2xl font-semibold text-foreground"
            >
              Why I Built This
            </h2>
            <div className="flex flex-col gap-4 leading-relaxed text-(--text-secondary)">
              <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm text-accent italic">
                &ldquo;I wanted to turn GitHub Copilot from a tab-completion tool into an actual engineering team.&rdquo;
              </blockquote>
              <p>
                I use <span className="font-mono text-accent">GitHub Copilot</span> every
                day, but I kept feeling like it wasn&apos;t living up to its potential.
                Most developers treat it as an autocomplete upgrade. I wanted something
                different — a structured workflow where specialised agents handle
                planning, implementation, testing, and review as a coordinated team.
              </p>
              <p>
                After a few weeks studying VS Code&apos;s agent system, I built
                Boss, Worker, Tester, Objector, and Teacher — each with a clear role
                and a strict scope. The first time Boss routed a feature request all
                the way from spec to commit without me writing a line of code, I knew
                the direction was right.
              </p>
              <p>
                This config is open-source because good tooling should be shared. If
                it helps you ship faster, a star on GitHub is the best thanks.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["VS Code", "GitHub Copilot", "Agent Design", "Next.js", "Go", "Open Source"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-(--border-color) bg-(--accent-dim) px-3 py-1 font-mono text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
        aria-labelledby="author-heading"
      >
        <div className="blog-card rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-(--border-color) bg-surface font-mono text-2xl text-accent md:h-32 md:w-32"
              aria-hidden="true"
            >
              &gt;_
            </div>
            <div className="flex flex-col gap-4">
              <h2
                id="author-heading"
                className="font-mono text-2xl font-semibold text-foreground"
              >
                Alex Chen
              </h2>
              <div className="flex flex-col gap-3 leading-relaxed text-(--text-secondary)">
                <p>
                  Full-stack engineer focused on{" "}
                  <span className="font-mono text-accent">Next.js</span> and{" "}
                  <span className="font-mono text-accent">Go</span>. I work at a
                  B2B SaaS company by day, and spend evenings on open-source
                  projects and technical writing.
                </p>
                <p>
                  I&apos;m interested in developer tooling, AI-assisted workflows, and
                  the craft of building interfaces that feel genuinely good to use —
                  fast, accessible, and a little beautiful.
                </p>
                <p>
                  oh-my-copilot is my most-used personal project. I rely on it for
                  every feature I ship.
                </p>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Alex Chen on GitHub"
                  className="font-mono text-sm text-accent transition-colors hover:underline"
                >
                  GitHub &rarr;
                </a>
                <a
                  href="#"
                  aria-label="Alex Chen on Twitter"
                  className="font-mono text-sm text-(--text-muted) transition-colors hover:text-accent"
                >
                  Twitter &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div
        className="animate-fade-in-up mt-12 text-center"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/get-started"
          className="inline-block rounded-lg bg-accent px-7 py-3 font-mono text-sm font-semibold text-[#060d1a] transition-opacity hover:opacity-85"
        >
          Get Started &rarr;
        </Link>
      </div>
    </div>
  );
}
