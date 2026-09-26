import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { CalendarDays, ExternalLink, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function HoverCardGuide() {
  const [isHovered, setIsHovered] = useState(false)
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right">("bottom")
  const [sideHovered, setSideHovered] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">HoverCard</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "HoverCard",
            "├── HoverCardTrigger",
            "└── HoverCardContent",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Hover over the link below to preview user account metadata and bio.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[var(--text-main)] underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              @nextjs
            </a>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl z-50 text-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      N
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-xs text-[var(--text-main)]">Next.js</div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        The React Framework – created and maintained by @vercel.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                    <CalendarDays className="size-3.5" />
                    <span>Joined December 2021</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="https://nextjs.org" className="underline font-medium">
      @nextjs
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm text-muted-foreground">
          The React Framework – created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2 text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          Joined December 2021
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        />
      </section>

      {/* Sides & Positioning */}
      <section id="sides" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Positioning & Sides</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control placement with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">side</code> (top, bottom, left, right) and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">align</code> (start, center, end).
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            {(["top", "bottom", "left", "right"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium border transition-colors",
                  side === s
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setSideHovered(true)}
            onMouseLeave={() => setSideHovered(false)}
          >
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] cursor-pointer">
              Hover me ({side})
            </span>

            <AnimatePresence>
              {sideHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "absolute z-50 w-48 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 text-xs shadow-xl text-center",
                    side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
                    side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
                    side === "left" && "right-full mr-2 top-1/2 -translate-y-1/2",
                    side === "right" && "left-full ml-2 top-1/2 -translate-y-1/2"
                  )}
                >
                  Positioned at <strong>{side}</strong>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent side="${side}" align="center">
    Positioned at ${side}
  </HoverCardContent>
</HoverCard>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Hover cards align and flip according to document text direction in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <span className="text-xs font-semibold text-[var(--text-main)] underline underline-offset-4">
            @المطور
          </span>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">delay</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">100</td>
                <td className="p-3">Delay in milliseconds before opening on hover</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">closeDelay</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">300</td>
                <td className="p-3">Delay in milliseconds before closing on unhover</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">side</td>
                <td className="p-3 font-mono">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3 font-mono">"bottom"</td>
                <td className="p-3">Placement side relative to trigger anchor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
