import React, { useState } from "react"
import { Check, Copy, ExternalLink, Rss, ArrowRight, Sparkles, Terminal, ChevronRight, CheckCircle2 } from "lucide-react"

export function ShadcnChangelog() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Interactive Questionnaire state for the live preview widget in changelog
  const [questionStep, setQuestionStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const questions = [
    {
      title: "What should we prioritize in your stack?",
      options: [
        { id: "opt-1", label: "Next.js App Router with Server Actions", badge: "Default" },
        { id: "opt-2", label: "Vite + React SPA with TanStack Router", badge: "Popular" },
        { id: "opt-3", label: "Remix / React Router v7", badge: "Full-stack" },
      ],
    },
    {
      title: "Which UI component architecture do you prefer?",
      options: [
        { id: "opt-4", label: "Radix UI Primitives (Standard Shadcn)", badge: "Proven" },
        { id: "opt-5", label: "Base UI by MUI Team", badge: "New default" },
        { id: "opt-6", label: "React Aria Components", badge: "Accessible" },
      ],
    },
    {
      title: "How do you manage company design tokens?",
      options: [
        { id: "opt-7", label: "Pure CSS variables with HSL/Hex (#0A0A0A)", badge: "Clean" },
        { id: "opt-8", label: "Tailwind CSS v4 theme config", badge: "Modern" },
        { id: "opt-9", label: "Custom design registry with GitHub CLI", badge: "Enterprise" },
      ],
    },
  ]

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const currentQ = questions[questionStep]

  return (
    <div className="py-8 lg:py-10 max-w-4xl mx-auto space-y-16 px-2 sm:px-4">
      {/* Top Header */}
      <div className="space-y-4 pb-8 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="type-h1 text-[var(--text-main)] font-semibold tracking-tight">
              Changelog
            </h1>
            <p className="type-body text-[var(--text-muted)]">
              Latest updates and announcements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://ui.shadcn.com/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] type-link-12 font-medium transition-colors"
            >
              <Rss className="size-3.5 text-orange-400" />
              <span>RSS</span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-mono font-medium">
              <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              v1.2.0 Current
            </div>
          </div>
        </div>
      </div>

      {/* 0. September 2026 - Component URLs & Code Inspector */}
      <section id="september-2026-urls-and-inspector" className="space-y-6 scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-blue-400 font-semibold">
              September 2026
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="type-caption text-[var(--text-muted)] font-mono">v1.2.0</span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight flex items-center gap-2 group">
            <a href="#september-2026-urls-and-inspector" className="hover:underline">
              Clean Component URLs, Real Code Inspector & Slider Primitive
            </a>
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          We have upgraded the navigation and code inspection experience across all components. Every component now lives on its own dedicated canonical path (<code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-mono text-sm">/components/:name</code>) with instant browser back/forward history synchronization, replacing hash-based routing.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <h3 className="type-heading text-[var(--text-main)] font-semibold">1 Page Per Component URLs</h3>
            <p className="type-small-body text-[var(--text-muted)]">
              Clean URLs like <code className="text-[var(--text-main)] font-mono">/components/button</code> and <code className="text-[var(--text-main)] font-mono">/components/slider</code> with full SPA state preservation and deep-linking support.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <h3 className="type-heading text-[var(--text-main)] font-semibold">Authentic "View Code" Inspector</h3>
            <p className="type-small-body text-[var(--text-muted)]">
              Clicking "View Code" displays complete, runnable TypeScript demo code with syntax highlighting, line numbers, and copy feedback.
            </p>
          </div>
        </div>
      </section>

      {/* 1. September 2026 - cn */}
      <section id="september-2026-cn" className="space-y-6 scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-blue-400 font-semibold">
              September 2026
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="type-caption text-[var(--text-muted)] font-mono">v1.1.0</span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight flex items-center gap-2 group">
            <a href="#september-2026-cn" className="hover:underline">
              September 2026 - cn
            </a>
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          Every shadcn component now imports <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-mono text-sm">cn</code> from the <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-mono text-sm">cn</code> package. For years, every shadcn project started with the same five lines in <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-mono text-sm">lib/utils.ts</code>: <code className="px-1 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">import clsx</code>, <code className="px-1 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">import twMerge</code>, wrap one in the other, export it as <code className="px-1 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code>. It worked, but it meant two dependencies and a helper you had to copy into every project.
        </p>

        {/* Code Snippet */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden font-mono text-xs sm:text-sm shadow-md">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block" />
                <span className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block" />
              </div>
              <div className="h-3 w-px bg-[var(--border-subtle)]" />
              <span className="text-[var(--text-muted)] font-mono text-xs">Component usage</span>
            </div>
            <button
              onClick={() => handleCopy("code-cn-1", `import { cn } from "cn"\n\n;<div className={cn("flex items-center", className)} />`)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              {copiedId === "code-cn-1" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "code-cn-1" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-[var(--text-main)] leading-relaxed">
            <span className="text-purple-400">import</span> {"{ "}
            <span className="text-blue-300">cn</span>
            {" }"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"cn"</span>{"\n\n"}
            <span className="text-[var(--text-muted)]">;</span>&lt;<span className="text-rose-400">div</span> <span className="text-sky-300">className</span>={"{ "}
            <span className="text-blue-300">cn</span>(
            <span className="text-emerald-300">"flex items-center"</span>, <span className="text-blue-200">className</span>
            ){" }"} /&gt;
          </pre>
        </div>

        {/* Subsections */}
        <div className="space-y-6 pt-2">
          <div id="what-changed" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              What changed
            </h3>
            <ul className="list-disc list-inside space-y-2 type-body text-[var(--text-muted)]">
              <li>
                Registry components, blocks and examples import <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> from <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> instead of <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">@/lib/utils</code>.
              </li>
              <li>
                <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">npx shadcn init</code> installs <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> and generates a one-line <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">lib/utils.ts</code>.
              </li>
              <li>
                Every registry item that uses <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> declares it as a dependency, so <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">npx shadcn add</code> installs it in projects created before this change.
              </li>
            </ul>
          </div>

          <div id="lib-utils" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              lib/utils.ts
            </h3>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              The <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">utils</code> registry item still exists. It now re-exports <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> so your own code keeps working and you still have a single place for project helpers.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden font-mono text-xs sm:text-sm shadow-md">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 group/dots">
                    <span className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block" />
                    <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block" />
                    <span className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block" />
                  </div>
                  <div className="h-3 w-px bg-[var(--border-subtle)]" />
                  <span className="text-[var(--text-muted)] font-mono text-xs">lib/utils.ts</span>
                </div>
                <button
                  onClick={() => handleCopy("code-utils", `export { cn } from "cn"`)}
                  className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  {copiedId === "code-utils" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  <span>{copiedId === "code-utils" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-[var(--text-main)]">
                <span className="text-purple-400">export</span> {"{ "}
                <span className="text-blue-300">cn</span>
                {" }"} <span className="text-purple-400">from</span> <span className="text-emerald-300">"cn"</span>
              </pre>
            </div>
          </div>

          <div id="existing-projects" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              Existing projects
            </h3>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              Nothing breaks. Your <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">lib/utils.ts</code> keeps working and new components install <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">cn</code> next to it. To move the rest of your project over and drop <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">clsx</code> and <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">tailwind-merge</code>, run the migration:
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 sm:p-4 flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-emerald-400">$ npx shadcn@latest migrate cn</span>
              <button
                onClick={() => handleCopy("cmd-mig", "npx shadcn@latest migrate cn")}
                className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors ml-2 shrink-0"
              >
                {copiedId === "cmd-mig" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. August 2026 - Private GitHub Registries */}
      <section id="august-2026-registries" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-purple-400 font-semibold">
              August 2026
            </span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight">
            August 2026 - Private GitHub Registries
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          GitHub registries now work with private repositories. In June, we made it possible to turn any public GitHub repository into a registry. Teams asked for the same thing for their internal code: design systems, feature kits, agent rules and conventions that should not be public. You can now install from private repositories without third-party token hosting.
        </p>

        <div className="space-y-6">
          <div id="zero-configuration" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              Zero configuration
            </h3>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              If you are logged in to the GitHub CLI, there is nothing to set up:
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 sm:p-4 flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-blue-400">$ gh auth login</span>
              <button
                onClick={() => handleCopy("cmd-gh", "gh auth login")}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {copiedId === "cmd-gh" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              When a repository is not publicly readable, the CLI reads it through <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">gh</code> using your stored credentials. The token stays inside the GitHub CLI. It never enters the shadcn process.
            </p>
          </div>

          <div id="ci-support" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              CI support
            </h3>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              Where the GitHub CLI is not installed, set <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">GH_TOKEN</code> or <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">GITHUB_TOKEN</code>:
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 sm:p-4 flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-purple-400 truncate">$ GH_TOKEN=github_pat_xxx npx shadcn@latest add acme/internal-toolkit/auth-kit</span>
              <button
                onClick={() => handleCopy("cmd-ci", "GH_TOKEN=github_pat_xxx npx shadcn@latest add acme/internal-toolkit/auth-kit")}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] shrink-0 ml-2"
              >
                {copiedId === "cmd-ci" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </div>

          <div id="works-with-every-command" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              Works with every command
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { cmd: "npx shadcn@latest list acme/internal-toolkit", label: "List items" },
                { cmd: "npx shadcn@latest search acme/internal-toolkit --query auth", label: "Search registry" },
                { cmd: "npx shadcn@latest view acme/internal-toolkit/auth-kit", label: "Inspect item" },
                { cmd: "npx shadcn@latest registry validate acme/internal-toolkit", label: "Validate registry" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1">
                  <div className="type-caption text-[var(--text-muted)]">{item.label}</div>
                  <div className="font-mono text-xs text-[var(--text-main)] truncate">{item.cmd}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="how-it-works" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              How it works
            </h3>
            <p className="type-body text-[var(--text-muted)] leading-relaxed">
              Public repositories are read anonymously, exactly as before. No credentials are used and the GitHub CLI is never invoked. The CLI tries anonymous access first and only uses your credentials when the repository is not publicly readable. Private files are read through GitHub's Contents API, pinned to the default branch commit hash for security.
            </p>
          </div>
        </div>
      </section>

      {/* 3. August 2026 - Human in the Loop */}
      <section id="august-2026-human-in-the-loop" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              August 2026
            </span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight">
            August 2026 - Human in the Loop
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">@shadcn/helpers</code> can now mock human-in-the-loop flows for the AI SDK. A scripted conversation can pause for real user input, wait for an approval, and continue with whatever the user decided. Everything streams through the real <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">useChat</code> lifecycle, so your tool cards, approval prompts, and question flows render identically.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden font-mono text-xs sm:text-sm shadow-md">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block" />
                <span className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block" />
              </div>
              <div className="h-3 w-px bg-[var(--border-subtle)]" />
              <span className="text-[var(--text-muted)] font-mono text-xs">AI SDK Helper Mock</span>
            </div>
            <button
              onClick={() => handleCopy("code-hitl", `chat\n  .assistant(({ writer }) => {\n    writer.text("That will archive 3 drafts. I need your approval.")\n    writer.tool("archiveDrafts", {\n      input: { count: 3 },\n      needsApproval: true,\n      output: { archived: 3 },\n    })\n  })`)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              {copiedId === "code-hitl" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "code-hitl" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-[var(--text-main)] leading-relaxed">
            <span className="text-blue-300">chat</span>{"\n"}
            {"  "}.<span className="text-amber-300">assistant</span>(({"{"} <span className="text-sky-300">writer</span> {"}"}) =&gt; {"{\n"}
            {"    "}<span className="text-sky-300">writer</span>.<span className="text-amber-300">text</span>(<span className="text-emerald-300">"That will archive 3 drafts. I need your approval."</span>){"\n"}
            {"    "}<span className="text-sky-300">writer</span>.<span className="text-amber-300">tool</span>(<span className="text-emerald-300">"archiveDrafts"</span>, {"{\n"}
            {"      "}<span className="text-purple-300">input</span>: {"{ "}<span className="text-purple-300">count</span>: <span className="text-amber-300">3</span>{" },"}{"\n"}
            {"      "}<span className="text-purple-300">needsApproval</span>: <span className="text-rose-400">true</span>,{"\n"}
            {"      "}<span className="text-purple-300">output</span>: {"{ "}<span className="text-purple-300">archived</span>: <span className="text-amber-300">3</span>{" },"}{"\n"}
            {"    }"}){"\n"}
            {"  }"})
          </pre>
        </div>
      </section>

      {/* 4. August 2026 - Questionnaire (With Interactive Live Demo!) */}
      <section id="august-2026-questionnaire" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-sky-400 font-semibold">
              August 2026
            </span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight">
            August 2026 - Questionnaire
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          Today, we're releasing <strong className="text-[var(--text-main)] font-medium">Questionnaire</strong>, a new component for multi-step question flows. Use it for agent clarification prompts, onboarding, surveys, intake forms, and configuration. Questionnaire is available for Base UI, React Aria, and Radix across all styles.
        </p>

        {/* Live Interactive Questionnaire Component Demo - Matching Screenshot! */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <div className="type-caption text-[var(--text-muted)] font-mono">
                Question {questionStep + 1} of {questions.length}
              </div>
              <h4 className="type-heading text-[var(--text-main)] font-semibold mt-1">
                {currentQ.title}
              </h4>
            </div>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`size-2 rounded-full transition-colors ${
                    i === questionStep ? "bg-blue-500 scale-125" : i < questionStep ? "bg-[var(--text-main)]" : "bg-[var(--border-subtle)]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Option list */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedAnswer(opt.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 text-[var(--text-main)] font-medium shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--text-muted)] text-[var(--text-main)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-[var(--text-muted)] bg-transparent"
                      }`}
                    >
                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="type-body">{opt.label}</span>
                  </div>
                  <span className="type-caption font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                    {opt.badge}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setSelectedAnswer(null)
                setQuestionStep((s) => (s + 1) % questions.length)
              }}
              className="type-link-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--bg-card)]"
            >
              Skip
            </button>
            <div className="flex items-center gap-2">
              {questionStep > 0 && (
                <button
                  onClick={() => {
                    setSelectedAnswer(null)
                    setQuestionStep((s) => s - 1)
                  }}
                  className="type-link-12 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]"
                >
                  Back
                </button>
              )}
              <button
                disabled={!selectedAnswer}
                onClick={() => {
                  setSelectedAnswer(null)
                  setQuestionStep((s) => (s + 1) % questions.length)
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 type-link-12 font-medium transition-all"
              >
                <span>{questionStep === questions.length - 1 ? "Submit" : "Next Question"}</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div id="questionnaire-features" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              Features
            </h3>
            <ul className="list-disc list-inside space-y-2 type-body text-[var(--text-muted)]">
              <li>Single and multiple selection with native radios and checkboxes.</li>
              <li>Freeform answers alongside fixed choices.</li>
              <li>Explicit skipping for optional questions.</li>
              <li>Previous, next, submit, and custom progress controls.</li>
              <li>Required and custom validation with schema parsing.</li>
              <li>Controlled navigation, saved defaults, and conditional question branching.</li>
            </ul>
          </div>

          <div id="questionnaire-installation" className="space-y-3 scroll-mt-20">
            <h3 className="type-heading text-[var(--text-main)] font-medium">
              Installation
            </h3>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 sm:p-4 flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-emerald-400">$ npx shadcn@latest add questionnaire</span>
              <button
                onClick={() => handleCopy("cmd-q", "npx shadcn@latest add questionnaire")}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                {copiedId === "cmd-q" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. July 2026 - Dynamic Search */}
      <section id="july-2026-dynamic-search" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="type-caption font-mono uppercase tracking-wider text-amber-400 font-semibold">
              July 2026
            </span>
          </div>
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight">
            July 2026 - Dynamic Search
          </h2>
        </div>

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          Registries can now handle search server-side. When you run <code className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs">shadcn search</code>, the CLI forwards the search parameters to your registry as query params. Return the matching items with a pagination object and the CLI uses your results as-is. This makes search fast for large registries: no more downloading the whole index up front.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 sm:p-4 flex items-center justify-between font-mono text-xs sm:text-sm">
          <span className="text-blue-400 truncate">$ npx shadcn@latest search --registry https://ui.example.com --query button</span>
          <button
            onClick={() => handleCopy("cmd-search", "npx shadcn@latest search --registry https://ui.example.com --query button")}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors shrink-0 ml-2"
          >
            {copiedId === "cmd-search" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </section>

      {/* 6. More Updates Grid - Matching Screenshot! */}
      <section id="more-updates" className="space-y-6 pt-6 border-t border-[var(--border-subtle)] scroll-mt-20">
        <div className="space-y-2">
          <h2 className="type-h2 text-[var(--text-main)] font-semibold tracking-tight">
            More Updates
          </h2>
          <p className="type-body text-[var(--text-muted)]">
            Previous releases and major milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { date: "July 2026", title: "Toast" },
            { date: "July 2026", title: "React Aria" },
            { date: "July 2026", title: "Introducing @shadcn/helpers" },
            { date: "July 2026", title: "Introducing shadcn/typeset" },
            { date: "July 2026", title: "Base UI as the Default" },
            { date: "June 2026", title: "Components for Chat Interfaces" },
            { date: "June 2026", title: "GitHub Registries" },
            { date: "May 2026", title: "shadcn eject" },
            { date: "May 2026", title: "Introducing Rhea" },
            { date: "May 2026", title: "Registry Include and Validate" },
            { date: "May 2026", title: "Package Imports and Target Aliases" },
            { date: "April 2026", title: "shadcn preset" },
            { date: "April 2026", title: "Pointer Cursor" },
            { date: "March 2026", title: "Radix Themes 3.0 Support" },
            { date: "February 2026", title: "v0.9.0 Major CLI Update" },
            { date: "January 2026", title: "Dark Mode Contrast Improvements" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-all cursor-pointer group"
            >
              <div className="space-y-1">
                <span className="type-caption font-mono text-[var(--text-muted)]">
                  {item.date}
                </span>
                <h4 className="type-heading text-[var(--text-main)] font-medium group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
              </div>
              <div className="flex justify-end pt-2 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
