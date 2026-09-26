import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-1.5 font-mono text-[10px] font-medium text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </kbd>
  )
}

function KbdGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("inline-flex items-center gap-1", className)}>{children}</div>
}

export function KbdGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Kbd</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">KbdGroup</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Kbd</div>
          <div>KbdGroup</div>
          <div className="pl-4">├── Kbd</div>
          <div className="pl-4">└── Kbd</div>
        </div>
      </section>

      {/* Basic & Groups */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic & Groups</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Individual keys and multi-key combinations.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-6 flex-wrap">
          <Kbd>⌘</Kbd>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"

<Kbd>Ctrl</Kbd>

<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
        />
      </section>

      {/* Button & Input Pairings */}
      <section id="pairings" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Button & Search Pairings</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Embed keyboard shortcut badges inside action buttons and search input fields.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" className="gap-2 text-xs">
            <span>Command Palette</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--text-muted)]" />
            <Input placeholder="Search docs..." className="pl-8 pr-12 text-xs" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Kbd>/</Kbd>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Inside Button */}
<Button variant="outline" className="gap-2">
  <span>Command Palette</span>
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</Button>

{/* Inside Search Field */}
<div className="relative">
  <Input placeholder="Search docs..." />
  <div className="absolute right-2 top-1/2 -translate-y-1/2">
    <Kbd>/</Kbd>
  </div>
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Kbd groups preserve logical key sequence order in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Button variant="outline" className="gap-2 text-xs">
            <span>لوحة الأوامر</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Kbd</td>
                <td className="p-3">Renders an inline keyboard key tag</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">KbdGroup</td>
                <td className="p-3">Groups multiple key elements into a single keyboard shortcut combo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
