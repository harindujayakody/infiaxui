import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Sparkles,
  Terminal,
  FolderPlus,
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu,
  Globe,
  Copy,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function InstallationGuide() {
  const [framework, setFramework] = useState<"next" | "vite" | "tanstack" | "laravel" | "react-router" | "astro" | "manual">("next")
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("npm")

  const frameworkCommands: Record<string, Record<string, string>> = {
    next: {
      npm: "npx shadcn@latest init -t next",
      pnpm: "pnpm dlx shadcn@latest init -t next",
      yarn: "npx shadcn@latest init -t next",
      bun: "bunx --bun shadcn@latest init -t next",
    },
    vite: {
      npm: "npx shadcn@latest init -t vite",
      pnpm: "pnpm dlx shadcn@latest init -t vite",
      yarn: "npx shadcn@latest init -t vite",
      bun: "bunx --bun shadcn@latest init -t vite",
    },
    tanstack: {
      npm: "npx shadcn@latest init -t start",
      pnpm: "pnpm dlx shadcn@latest init -t start",
      yarn: "npx shadcn@latest init -t start",
      bun: "bunx --bun shadcn@latest init -t start",
    },
    laravel: {
      npm: "laravel new my-app\ncd my-app\nnpx shadcn@latest init",
      pnpm: "laravel new my-app\ncd my-app\npnpm dlx shadcn@latest init",
      yarn: "laravel new my-app\ncd my-app\nyarn dlx shadcn@latest init",
      bun: "laravel new my-app\ncd my-app\nbunx --bun shadcn@latest init",
    },
    "react-router": {
      npm: "npx shadcn@latest init -t react-router",
      pnpm: "pnpm dlx shadcn@latest init -t react-router",
      yarn: "npx shadcn@latest init -t react-router",
      bun: "bunx --bun shadcn@latest init -t react-router",
    },
    astro: {
      npm: "npx shadcn@latest init -t astro",
      pnpm: "pnpm dlx shadcn@latest init -t astro",
      yarn: "npx shadcn@latest init -t astro",
      bun: "bunx --bun shadcn@latest init -t astro",
    },
    manual: {
      npm: "npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react",
      pnpm: "pnpm add tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react",
      yarn: "yarn add tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react",
      bun: "bun add tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react",
    },
  }

  const frameworks = [
    { id: "next", name: "Next.js", tag: "App Router / Pages" },
    { id: "vite", name: "Vite", tag: "SPA / React" },
    { id: "tanstack", name: "TanStack Start", tag: "Full-stack SSR" },
    { id: "laravel", name: "Laravel", tag: "Inertia / React" },
    { id: "react-router", name: "React Router", tag: "v7 Framework" },
    { id: "astro", name: "Astro", tag: "Content Islands" },
    { id: "manual", name: "Manual Setup", tag: "Custom Bundler" },
  ] as const

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Recommended Callout */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-3 shadow-sm">
        <Sparkles className="size-4 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold">Recommended for new projects:</span>
          <p className="text-emerald-700 dark:text-emerald-300">
            Use <strong className="underline cursor-pointer">shadcn/create</strong> to build your preset visually and generate the right setup command for your framework.
          </p>
        </div>
      </div>

      {/* Starting Point Cards */}
      <section id="starting-points" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Choose your starting point</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="#use-create"
            className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] transition-all space-y-1.5 group block"
          >
            <div className="font-semibold text-xs text-[var(--text-main)] flex items-center justify-between">
              <span>Use shadcn/create</span>
              <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Build your preset visually and generate a framework setup command.
            </p>
          </a>

          <a
            href="#use-cli"
            className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] transition-all space-y-1.5 group block"
          >
            <div className="font-semibold text-xs text-[var(--text-main)] flex items-center justify-between">
              <span>Use the CLI</span>
              <Terminal className="size-3.5 text-[var(--text-muted)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Scaffold a supported template directly from your terminal.
            </p>
          </a>

          <a
            href="#existing-project"
            className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] transition-all space-y-1.5 group block"
          >
            <div className="font-semibold text-xs text-[var(--text-main)] flex items-center justify-between">
              <span>Existing Project</span>
              <FolderPlus className="size-3.5 text-[var(--text-muted)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Add shadcn/ui to a project you already created.
            </p>
          </a>
        </div>
      </section>

      {/* Interactive Framework Selector */}
      <section id="choose-framework" className="scroll-mt-20 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="type-h2 text-[var(--text-main)]">Choose Your Framework</h2>
          {/* Package Manager Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPkgManager(pm)}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                  pkgManager === pm
                    ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Framework Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {frameworks.map((f) => (
            <button
              key={f.id}
              onClick={() => setFramework(f.id)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all space-y-1",
                framework === f.id
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] shadow-sm"
                  : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]/50"
              )}
            >
              <div className="font-semibold text-xs text-[var(--text-main)]">{f.name}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{f.tag}</div>
            </button>
          ))}
        </div>

        {/* Dynamic Code Command */}
        <div className="pt-2">
          <CodeBlock
            language="bash"
            code={frameworkCommands[framework][pkgManager]}
          />
        </div>
      </section>

      {/* Structure & Configuration Guide */}
      <section id="project-structure" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Recommended Project Structure</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard directory layout for components, utilities, and styling tokens:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "my-app",
            "├── src",
            "│   ├── components",
            "│   │   ├── ui",
            "│   │   │   ├── button.tsx",
            "│   │   │   ├── dialog.tsx",
            "│   │   │   └── ...",
            "│   │   └── layout",
            "│   ├── lib",
            "│   │   └── utils.ts",
            "│   └── app (or routes)",
            "├── components.json",
            "└── tailwind.config.ts",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* components.json reference */}
      <section id="components-json" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">components.json Configuration</h2>
        <p className="text-sm text-[var(--text-muted)]">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">components.json</code> file holds setup configuration for the shadcn CLI:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`}
        />
      </section>

      {/* utils.ts helper */}
      <section id="utils-helper" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Utility Helper (cn)</h2>
        <p className="text-sm text-[var(--text-muted)]">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">cn</code> helper combines <code className="font-mono">clsx</code> and <code className="font-mono">tailwind-merge</code> for conflict-free conditional classNames:
        </p>

        <CodeBlock
          language="ts"
          code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
        />
      </section>
    </div>
  )
}
