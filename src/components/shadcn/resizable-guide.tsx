import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { GripVertical, GripHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function ResizableGuide() {
  const [hRatio, setHRatio] = useState(50)
  const [vRatio, setVRatio] = useState(50)
  const [handleRatio, setHandleRatio] = useState(30)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ResizablePanelGroup</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>ResizablePanelGroup</div>
          <div className="pl-4">├── ResizablePanel</div>
          <div className="pl-4">├── ResizableHandle</div>
          <div className="pl-4">└── ResizablePanel</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Drag the slider handle or divider to resize the panels.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex h-48 w-full rounded-xl border border-[var(--border-subtle)] overflow-hidden">
            <div
              style={{ width: `${hRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/40 p-6 text-xs font-medium text-[var(--text-muted)] transition-all select-none"
            >
              Panel One ({hRatio}%)
            </div>
            <div className="relative flex items-center justify-center w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-main)] cursor-col-resize transition-colors group">
              <input
                type="range"
                min="20"
                max="80"
                value={hRatio}
                onChange={(e) => setHRatio(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-col-resize w-full h-full"
              />
            </div>
            <div
              style={{ width: `${100 - hRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/60 p-6 text-xs font-medium text-[var(--text-muted)] transition-all select-none"
            >
              Panel Two ({100 - hRatio}%)
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

<ResizablePanelGroup orientation="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`}
        />
      </section>

      {/* Vertical */}
      <section id="vertical" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Vertical</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for vertically stacked resizable panels.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex flex-col h-64 w-full rounded-xl border border-[var(--border-subtle)] overflow-hidden">
            <div
              style={{ height: `${vRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/40 text-xs font-medium text-[var(--text-muted)] select-none"
            >
              Top Panel ({vRatio}%)
            </div>
            <div className="relative flex items-center justify-center h-2 bg-[var(--border-subtle)] hover:bg-[var(--text-main)] cursor-row-resize transition-colors">
              <input
                type="range"
                min="20"
                max="80"
                value={vRatio}
                onChange={(e) => setVRatio(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize w-full h-full"
              />
            </div>
            <div
              style={{ height: `${100 - vRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/60 text-xs font-medium text-[var(--text-muted)] select-none"
            >
              Bottom Panel ({100 - vRatio}%)
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ResizablePanelGroup orientation="vertical" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={25}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Header</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={75}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`}
        />
      </section>

      {/* Handle */}
      <section id="handle" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Handle</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">withHandle</code> prop on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ResizableHandle</code> to show a visible drag grip icon.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex h-48 w-full rounded-xl border border-[var(--border-subtle)] overflow-hidden">
            <div
              style={{ width: `${handleRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/40 p-4 text-xs font-medium text-[var(--text-muted)] select-none"
            >
              Sidebar ({handleRatio}%)
            </div>
            <div className="relative flex items-center justify-center w-4 bg-[var(--bg-subtle)] border-x border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] transition-colors">
              <GripVertical className="size-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="range"
                min="15"
                max="50"
                value={handleRatio}
                onChange={(e) => setHandleRatio(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-col-resize w-full h-full"
              />
            </div>
            <div
              style={{ width: `${100 - handleRatio}%` }}
              className="flex items-center justify-center bg-[var(--bg-page)]/60 p-4 text-xs font-medium text-[var(--text-muted)] select-none"
            >
              Main Content ({100 - handleRatio}%)
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={30}>
    Sidebar
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>
    Main Content
  </ResizablePanel>
</ResizablePanelGroup>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Resizable panels support RTL layout order. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex h-36 w-full rounded-xl border border-[var(--border-subtle)] overflow-hidden">
            <div className="flex items-center justify-center w-1/2 bg-[var(--bg-page)]/40 text-xs font-medium text-[var(--text-muted)]">
              اللوحة الأولى (يمين)
            </div>
            <div className="w-1.5 bg-[var(--border-subtle)]" />
            <div className="flex items-center justify-center w-1/2 bg-[var(--bg-page)]/60 text-xs font-medium text-[var(--text-muted)]">
              اللوحة الثانية (يسار)
            </div>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section id="changelog" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Changelog</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              2025-02-02
            </span>
            <span className="text-xs font-semibold text-[var(--text-main)]">
              react-resizable-panels v4
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Updated to <code className="text-[var(--text-main)] font-mono">react-resizable-panels</code> v4. Primitive rename mappings:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)]">
                  <th className="py-1 pr-4">v3</th>
                  <th className="py-1">v4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
                <tr><td className="py-1 pr-4 text-red-400">PanelGroup</td><td className="py-1 text-emerald-400">Group</td></tr>
                <tr><td className="py-1 pr-4 text-red-400">PanelResizeHandle</td><td className="py-1 text-emerald-400">Separator</td></tr>
                <tr><td className="py-1 pr-4 text-red-400">direction</td><td className="py-1 text-emerald-400">orientation</td></tr>
                <tr><td className="py-1 pr-4 text-red-400">onLayout</td><td className="py-1 text-emerald-400">onLayoutChange</td></tr>
              </tbody>
            </table>
          </div>
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
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3">Resize direction axis</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">defaultSize</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3">Initial panel percentage size (0–100)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">minSize</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3">Minimum panel percentage size</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">withHandle</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">Renders a visible grip icon inside the handle</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
