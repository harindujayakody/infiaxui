import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Sparkles, Bell, ArrowUpRight, ShieldCheck, MoreVertical, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

export function CardGuide() {
  const [size, setSize] = useState<"default" | "sm">("default")
  const [edgeToEdge, setEdgeToEdge] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build structured containers using the updated <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Card</code> primitives:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Card (size='default' | 'sm')",
            "├── CardHeader",
            "│   ├── CardTitle",
            "│   ├── CardDescription",
            "│   └── CardAction",
            "├── CardContent",
            "└── CardFooter",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Card Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Toggle size presets and edge-to-edge content configurations.
        </p>

        <div className="flex items-center gap-2">
          {(["default", "sm"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium border capitalize transition-colors",
                size === s
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              Size: {s}
            </button>
          ))}
          <button
            onClick={() => setEdgeToEdge(!edgeToEdge)}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium border transition-colors",
              edgeToEdge
                ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            )}
          >
            {edgeToEdge ? "Edge-to-Edge: ON" : "Edge-to-Edge: OFF"}
          </button>
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] max-w-md mx-auto">
          {/* Card Component */}
          <div
            className={cn(
              "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-lg transition-all",
              size === "sm" ? "p-4 space-y-3" : "p-6 space-y-4"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={cn("font-bold text-[var(--text-main)]", size === "sm" ? "text-sm" : "text-base")}>
                    Pro Subscription
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Billed annually at $240/yr. Renews on Oct 14, 2026.
                </p>
              </div>

              {/* CardAction */}
              <button className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>

            {/* Content */}
            {edgeToEdge ? (
              <div className="-mx-6 bg-[var(--bg-subtle)]/50 p-4 border-y border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Monthly Bandwidth</span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">1.4 TB / 2.0 TB</span>
                </div>
                <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[70%]" />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Monthly Bandwidth</span>
                  <span className="font-mono font-semibold text-[var(--text-main)]">1.4 TB / 2.0 TB</span>
                </div>
                <div className="w-full bg-[var(--bg-subtle)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[70%]" />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                Auto-renewal enabled
              </span>
              <button className="h-7 px-3 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90">
                Manage Plan
              </button>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SubscriptionCard() {
  return (
    <Card size="${size}">
      <CardHeader>
        <CardTitle>Pro Subscription</CardTitle>
        <CardDescription>Billed annually at $240/yr.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <ArrowUpRight className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Active usage: 1.4 TB / 2.0 TB</p>
      </CardContent>
      <CardFooter>
        <Button>Manage Plan</Button>
      </CardFooter>
    </Card>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Card header actions and footer alignment mirror automatically in RTL environments.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto space-y-2">
          <h4 className="text-xs font-semibold text-[var(--text-main)]">
            بيانات الاشتراك السنوي
          </h4>
          <p className="text-[11px] text-[var(--text-muted)]">
            محاذاة كاملة للبطاقة والتذييل وفق قواعد النص من اليمين إلى اليسار.
          </p>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Card.size</td>
                <td className="p-3 font-mono">"default" | "sm"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Changes inner padding and component gap spacing</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">CardAction</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Top-trailing slot in the card header for buttons or badges</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">CardFooter</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Bottom container with built-in border and background tint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
