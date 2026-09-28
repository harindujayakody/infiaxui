"use client"

import React, { useState } from "react"
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/magicui/terminal"
import { RotateCcw } from "lucide-react"

// 1. Primary Terminal Showcase matching screenshot media_1790455384344.png
export function TerminalDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-3" />
          <span>Replay Sequence</span>
        </button>
      </div>

      <Terminal key={key} className="w-full">
        <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>
        <AnimatedSpan className="text-emerald-400">
          ✔ Preflight checks.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Verifying framework. Found Next.js.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Validating Tailwind CSS.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Validating import alias.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Writing components.json.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Checking registry.
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Updating tailwind.config.ts
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Updating app/globals.css
        </AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">
          ✔ Installing dependencies.
        </AnimatedSpan>
        <AnimatedSpan className="text-blue-400">
          ℹ Updated 1 file:
        </AnimatedSpan>
        <AnimatedSpan className="text-blue-400 pl-4">
          - lib/utils.ts
        </AnimatedSpan>
        <TypingAnimation className="text-zinc-200">
          Success! Project initialization completed.
        </TypingAnimation>
        <AnimatedSpan className="text-zinc-500">
          You may now add components.
        </AnimatedSpan>
      </Terminal>
    </div>
  )
}

// 2. Custom Delays Example (sequence={false})
export function TerminalCustomDelayDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-3" />
          <span>Replay Custom Delays</span>
        </button>
      </div>

      <Terminal key={key} sequence={false} className="w-full">
        <TypingAnimation delay={0}>npm create vite@latest my-app</TypingAnimation>
        <AnimatedSpan delay={1000} className="text-emerald-400">
          ✔ Scaffolding project in ./my-app...
        </AnimatedSpan>
        <AnimatedSpan delay={1800} className="text-sky-400">
          Done. Now run:
        </AnimatedSpan>
        <AnimatedSpan delay={2400} className="text-zinc-300 pl-4">
          cd my-app
        </AnimatedSpan>
        <AnimatedSpan delay={2800} className="text-zinc-300 pl-4">
          npm install
        </AnimatedSpan>
        <AnimatedSpan delay={3200} className="text-zinc-300 pl-4">
          npm run dev
        </AnimatedSpan>
      </Terminal>
    </div>
  )
}

// 3. Blocks Page Preview (Real interactive terminal, NO double borders, NO inner frame)
export function TerminalBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-3 select-none">
      <Terminal className="w-full max-w-[340px] max-h-[175px] shadow-xl border-zinc-800/80 scale-[0.88] sm:scale-95 origin-center">
        <TypingAnimation duration={35}>&gt; npx @infiax/ui add terminal</TypingAnimation>
        <AnimatedSpan className="text-emerald-400">✔ Downloading terminal package...</AnimatedSpan>
        <AnimatedSpan className="text-emerald-400">✔ Generating sequence provider</AnimatedSpan>
        <AnimatedSpan className="text-blue-400">ℹ Created components/ui/terminal.tsx</AnimatedSpan>
        <TypingAnimation duration={25} className="text-zinc-200">Success! Terminal ready.</TypingAnimation>
      </Terminal>
    </div>
  )
}

