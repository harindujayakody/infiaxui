import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  ChevronDown,
  Copy,
  Download,
  Share2,
  Trash2,
  Bookmark,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ButtonGroupGuide() {
  const [format, setFormat] = useState<string[]>(["bold"])
  const [alignment, setAlignment] = useState("left")
  const [splitOpen, setSplitOpen] = useState(false)

  const toggleFormat = (f: string) => {
    setFormat((prev) => (prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]))
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct cohesive segmented action toolbars using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ButtonGroup</code> components:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "ButtonGroup (orientation='horizontal' | 'vertical')",
            "├── Button | Input",
            "├── ButtonGroupSeparator",
            "└── ButtonGroupText",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Segmented Toolbar</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Grouped action buttons with seamless borders and hover states.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-center gap-6">
          {/* Text Style Group */}
          <div className="inline-flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] p-0.5 shadow-sm">
            <button
              onClick={() => toggleFormat("bold")}
              className={cn(
                "p-2 rounded-md transition-colors",
                format.includes("bold") ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              <Bold className="size-4" />
            </button>
            <button
              onClick={() => toggleFormat("italic")}
              className={cn(
                "p-2 rounded-md transition-colors",
                format.includes("italic") ? "bg-[var(--bg-subtle)] text-[var(--text-main)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              <Italic className="size-4" />
            </button>
            <button
              onClick={() => toggleFormat("underline")}
              className={cn(
                "p-2 rounded-md transition-colors",
                format.includes("underline") ? "bg-[var(--bg-subtle)] text-[var(--text-main)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              <Underline className="size-4" />
            </button>
          </div>

          {/* Alignment Group */}
          <div className="inline-flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] p-0.5 shadow-sm">
            {[
              { id: "left", icon: AlignLeft },
              { id: "center", icon: AlignCenter },
              { id: "right", icon: AlignRight },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setAlignment(item.id)}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    alignment === item.id ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  )}
                >
                  <Icon className="size-4" />
                </button>
              )
            })}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline } from "lucide-react"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="size-4" />
      </Button>
    </ButtonGroup>
  )
}`}
        />
      </section>

      {/* Split Button Demo */}
      <section id="split" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Split Button with Dropdown</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair a primary action with a secondary dropdown chevron trigger.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="relative inline-flex rounded-lg shadow-sm">
            <button className="h-9 px-3.5 rounded-l-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Download className="size-3.5" />
              <span>Download Bundle</span>
            </button>
            <button
              onClick={() => setSplitOpen(!splitOpen)}
              className="h-9 px-2 rounded-r-lg bg-[var(--text-main)] text-[var(--bg-page)] border-l border-white/20 hover:opacity-90 transition-opacity"
            >
              <ChevronDown className="size-3.5" />
            </button>

            {splitOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5">
                <button
                  onClick={() => setSplitOpen(false)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                >
                  <Copy className="size-3.5 text-[var(--text-muted)]" />
                  <span>Copy Download URL</span>
                </button>
                <button
                  onClick={() => setSplitOpen(false)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                >
                  <Share2 className="size-3.5 text-[var(--text-muted)]" />
                  <span>Share with Team</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<ButtonGroup>
  <Button>Download Bundle</Button>
  <ButtonGroupSeparator />
  <Button size="icon">
    <ChevronDown className="size-4" />
  </Button>
</ButtonGroup>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Connected borders and corner radiuses automatically flip in right-to-left layout mode.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-xs mx-auto flex justify-center">
          <div className="inline-flex rounded-lg shadow-sm">
            <button className="h-8 px-3 rounded-r-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium">
              حفظ
            </button>
            <button className="h-8 px-2 rounded-l-lg bg-[var(--text-main)] text-[var(--bg-page)] border-r border-white/20">
              <ChevronDown className="size-3" />
            </button>
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
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ButtonGroup.orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3 font-mono">"horizontal"</td>
                <td className="p-3">Arrangement axis of button children</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ButtonGroupSeparator</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Hairline divider between adjacent buttons</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ButtonGroupText</td>
                <td className="p-3 font-mono">HTMLSpanElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Text label or adornment integrated inside the button group container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
