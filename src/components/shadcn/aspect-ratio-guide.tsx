import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Image as ImageIcon, Film, Smartphone, Monitor, Square } from "lucide-react"
import { cn } from "@/lib/utils"

export function AspectRatioGuide() {
  const [ratio, setRatio] = useState<number>(16 / 9)
  const [label, setLabel] = useState("16 / 9 (Video)")

  const ratios = [
    { label: "16 / 9 (Video)", value: 16 / 9, icon: Monitor },
    { label: "1 / 1 (Square)", value: 1 / 1, icon: Square },
    { label: "9 / 16 (Story / Reel)", value: 9 / 16, icon: Smartphone },
    { label: "4 / 3 (Classic)", value: 4 / 3, icon: Film },
    { label: "21 / 9 (Cinematic)", value: 21 / 9, icon: Monitor },
  ]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AspectRatio</code> component constrains content to a designated aspect ratio (<code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ratio</code> prop), preventing layout shifts while media assets load.
        </p>
      </section>

      {/* Interactive Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Aspect Ratio Switcher</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Select standard media aspect ratios to see responsive container scaling.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {ratios.map((r) => {
            const Icon = r.icon
            const isSelected = ratio === r.value
            return (
              <button
                key={r.label}
                onClick={() => {
                  setRatio(r.value)
                  setLabel(r.label)
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5",
                  isSelected
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                <Icon className="size-3.5" />
                <span>{r.label.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-lg mx-auto flex flex-col items-center">
          <div
            style={{ aspectRatio: ratio }}
            className="w-full max-h-[340px] rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-tr from-indigo-950/40 via-purple-900/30 to-blue-900/40 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-all duration-300 shadow-xl"
          >
            <div className="size-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-2 shadow">
              <ImageIcon className="size-6" />
            </div>
            <div className="text-xs font-semibold text-white">
              Aspect Ratio: {label}
            </div>
            <div className="text-[10px] text-white/70 font-mono mt-0.5">
              ratio={'{'}{ratio.toFixed(2)}{'}'}
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function AspectRatioDemo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={${ratio === 16 / 9 ? "16 / 9" : ratio === 1 ? "1 / 1" : ratio === 9 / 16 ? "9 / 16" : "4 / 3"}}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Aspect ratio containers maintain geometry and scaling regardless of document writing direction.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto text-center">
          <span className="text-xs font-medium text-[var(--text-muted)]">
            نسبة العرض إلى الارتفاع ثابتة لجميع الوسائط
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
                <td className="p-3 font-mono text-[var(--text-main)]">ratio</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Target width-to-height ratio fraction (e.g. 16 / 9)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Custom styling passed to the ratio box wrapper</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
