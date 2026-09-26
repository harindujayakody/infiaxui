import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ArrowLeftRight, Check, Languages, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function DirectionGuide() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DirectionProvider</code> component configures the global or sub-tree text direction (<code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ltr</code> or <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">rtl</code>) for your application. This is essential for supporting right-to-left languages such as Arabic, Hebrew, Urdu, and Persian.
        </p>
      </section>

      {/* Interactive Demo */}
      <section id="interactive" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Direction Switcher</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Switch between LTR and RTL below to see how layouts, alignments, icons, and input controls adapt automatically.
        </p>

        <div className="flex items-center gap-2">
          {(["ltr", "rtl"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium border uppercase tracking-wider transition-colors flex items-center gap-1.5",
                direction === dir
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              <Globe className="size-3.5" />
              <span>{dir}</span>
            </button>
          ))}
        </div>

        <div
          dir={direction}
          className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all space-y-6"
        >
          {/* Card Preview */}
          <div className="max-w-md mx-auto p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                  {direction === "rtl" ? "س" : "JD"}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-main)]">
                    {direction === "rtl" ? "سارة أحمد" : "Sarah Jenkins"}
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {direction === "rtl" ? "مديرة المنتج" : "Product Designer"}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                {direction === "rtl" ? "نشط الآن" : "Active"}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {direction === "rtl"
                ? "لوحة التحكم تدعم بشكل كامل التخطيط من اليمين إلى اليسار مع محاذاة تلقائية لجميع العناصر."
                : "The dashboard fully supports bidirectional layouts with automatic flow mirroring across components."}
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
              <button className="flex-1 h-8 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity">
                {direction === "rtl" ? "قبول الدعوة" : "Accept Invite"}
              </button>
              <button className="flex-1 h-8 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors">
                {direction === "rtl" ? "رفض" : "Decline"}
              </button>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { DirectionProvider } from "@/components/ui/direction"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="${direction}">
      <body>
        <DirectionProvider direction="${direction}">
          {children}
        </DirectionProvider>
      </body>
    </html>
  )
}`}
        />
      </section>

      {/* useDirection Hook */}
      <section id="hook" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">useDirection Hook</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Retrieve the current ambient direction from any child component within the tree.
        </p>

        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="size-5 text-[var(--text-muted)]" />
            <div>
              <div className="text-xs font-semibold text-[var(--text-main)]">Current Ambient Direction</div>
              <div className="text-[11px] text-[var(--text-muted)]">Read from React Context</div>
            </div>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold uppercase">
            {direction}
          </span>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { useDirection } from "@/components/ui/direction"

function DynamicIndicator() {
  const direction = useDirection()
  
  return (
    <div>
      Current text direction: <strong>{direction}</strong>
    </div>
  )
}`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Hook</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DirectionProvider.direction</td>
                <td className="p-3 font-mono">"ltr" | "rtl"</td>
                <td className="p-3 font-mono">"ltr"</td>
                <td className="p-3">Sets the text direction for all descendant components</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">useDirection()</td>
                <td className="p-3 font-mono">() =&gt; "ltr" | "rtl"</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Hook that returns the nearest active direction context value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
