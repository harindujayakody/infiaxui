"use client"

import React, { useState } from "react"
import { Check, Copy, Music2, Phone, Navigation, Timer, Layers, Terminal } from "lucide-react"
import { IDynamics, DynamicActivityType } from "./morph-pill-card"
import { cn } from "@/lib/utils"

export function MorphPillCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const basicUsageCode = `import { useState } from "react"
import { IDynamics } from "@/components/ui/morph-pill-card"

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-8 bg-[#030712]">
      <IDynamics
        activity="music"
        isOpen={isOpen}
        onToggle={setIsOpen}
      />
    </div>
  )
}`

  const splitUsageCode = `import { IDynamics } from "@/components/ui/morph-pill-card"

export function DualActivityDemo() {
  return (
    <IDynamics
      activity="music"
      showSplitBubble={true}
      defaultOpen={false}
    />
  )
}`

  return (
    <div className="space-y-12 pb-16">
      {/* Example 1: Interactive Activity States */}
      <div id="activity-states" className="scroll-mt-20 space-y-4 pt-4 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h3 className="type-h2 text-[var(--text-main)]">Autonomous Activity States</h3>
          <p className="type-body text-[var(--text-muted)] text-sm">
            iDynamics dynamically adjusts its internal layout, aspect ratio, and tactile controls depending on the active background system activity.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#030712] p-8 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-8 w-full">
            <IDynamics activity="music" defaultOpen={false} />
            <p className="text-xs font-mono text-slate-500">
              Click the capsule to reveal audio scrubber, volume toggle, and track controls.
            </p>
          </div>
        </div>
      </div>

      {/* Example 2: Dual Activity Split Mode */}
      <div id="split-bubble" className="scroll-mt-20 space-y-4 pt-4 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h3 className="type-h2 text-[var(--text-main)]">Signature Split Island</h3>
          <p className="type-body text-[var(--text-muted)] text-sm">
            When multiple live background activities are active, the surface detaches into a dual-island formation with synchronized spring physics.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#030712] p-8 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-6">
            <IDynamics activity="music" showSplitBubble={true} defaultOpen={false} />
            <p className="text-xs font-mono text-slate-500">
              Main media island with companion timer indicator.
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl border border-slate-800 bg-[#090D16] p-4 font-mono text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => copyToClipboard(splitUsageCode, "split-code")}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copiedKey === "split-code" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          </button>
          <pre className="text-slate-200 leading-relaxed">
            <code>{splitUsageCode}</code>
          </pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props-reference" className="scroll-mt-20 space-y-4 pt-4 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h3 className="type-h2 text-[var(--text-main)]">Props Reference</h3>
          <p className="type-body text-[var(--text-muted)] text-sm">
            Complete API specification for the <code className="font-mono text-slate-200">IDynamics</code> surface component.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090D16]">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase text-slate-400 font-mono">
              <tr>
                <th className="px-5 py-3.5">Prop</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Default</th>
                <th className="px-5 py-3.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">activity</td>
                <td className="px-5 py-3.5 text-purple-400">"music" | "call" | "navigation" | "timer"</td>
                <td className="px-5 py-3.5 text-slate-500">"music"</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Active interactive status state.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">isOpen</td>
                <td className="px-5 py-3.5 text-purple-400">boolean</td>
                <td className="px-5 py-3.5 text-slate-500">undefined</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Controlled expansion state.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">defaultOpen</td>
                <td className="px-5 py-3.5 text-purple-400">boolean</td>
                <td className="px-5 py-3.5 text-slate-500">false</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Initial expansion state when uncontrolled.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">showSplitBubble</td>
                <td className="px-5 py-3.5 text-purple-400">boolean</td>
                <td className="px-5 py-3.5 text-slate-500">false</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Enables secondary companion circular bubble.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">onToggle</td>
                <td className="px-5 py-3.5 text-purple-400">(open: boolean) =&gt; void</td>
                <td className="px-5 py-3.5 text-slate-500">undefined</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Callback invoked when expansion state toggles.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">onActivityChange</td>
                <td className="px-5 py-3.5 text-purple-400">(activity) =&gt; void</td>
                <td className="px-5 py-3.5 text-slate-500">undefined</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Callback invoked on internal activity switch.</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-cyan-400 font-bold">className</td>
                <td className="px-5 py-3.5 text-purple-400">string</td>
                <td className="px-5 py-3.5 text-slate-500">undefined</td>
                <td className="px-5 py-3.5 text-slate-300 font-sans">Optional CSS class names for container.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Keyboard & Accessibility */}
      <div id="accessibility" className="scroll-mt-20 space-y-4 pt-4 border-t border-[var(--border-subtle)]">
        <div className="space-y-1">
          <h3 className="type-h2 text-[var(--text-main)]">Accessibility &amp; Shortcuts</h3>
          <p className="type-body text-[var(--text-muted)] text-sm">
            iDynamics ships with built-in keyboard accessibility and screen-reader status indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-[#090D16] flex items-center justify-between">
            <span className="text-slate-300 font-sans">Dismiss / Collapse</span>
            <kbd className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
              Escape
            </kbd>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-[#090D16] flex items-center justify-between">
            <span className="text-slate-300 font-sans">Toggle Expansion</span>
            <div className="flex gap-1.5">
              <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
                Space
              </kbd>
              <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
                Enter
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
