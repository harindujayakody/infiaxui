import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Search, Mail, Copy, Check, Loader2, Globe, Send, ChevronDown } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { cn } from "@/lib/utils"

export function InputGroupGuide() {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchVal, setSearchVal] = useState("")

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">InputGroup</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "InputGroup",
            "├── InputGroupInput or InputGroupTextarea",
            "├── InputGroupAddon",
            "├── InputGroupButton",
            "└── InputGroupText",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic & Icon Addons */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Leading & Trailing Addons</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Prepend and append search icons, currency indicators, and action buttons.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 max-w-md mx-auto">
          {/* Leading search icon */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 size-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] pl-9 pr-3 text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--text-main)] transition-colors"
            />
          </div>

          {/* Currency prefix & suffix */}
          <div className="flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] overflow-hidden">
            <span className="flex items-center px-3 bg-[var(--bg-subtle)] border-r border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-mono">
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              className="h-9 flex-1 bg-transparent px-3 text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <span className="flex items-center px-3 bg-[var(--bg-subtle)] border-l border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-mono">
              USD
            </span>
          </div>

          {/* Copyable link with button addon */}
          <div className="flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] overflow-hidden">
            <input
              readOnly
              value="https://infiaxui.dev/components/input-group"
              className="h-9 flex-1 bg-transparent px-3 text-xs text-[var(--text-muted)] focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] transition-colors text-xs text-[var(--text-main)] font-medium border-l border-[var(--border-subtle)]"
            >
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

{/* Search with leading icon */}
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>

{/* URL with copy button */}
<InputGroup>
  <InputGroupInput value="https://..." readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton onClick={handleCopy}>Copy</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
        />
      </section>

      {/* Textarea with bottom action bar */}
      <section id="textarea" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Textarea with Actions Bar</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Embed prompt actions, token counters, and submit buttons beneath a textarea.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3 space-y-3">
            <textarea
              rows={3}
              placeholder="Ask AI a question or request a refactor..."
              className="w-full resize-none bg-transparent text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5">
              <span className="text-[10px] text-[var(--text-muted)]">Markdown supported</span>
              <Button size="sm" className="h-7 text-xs px-3">
                <Send className="size-3 mr-1" /> Send
              </Button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<InputGroup>
  <InputGroupTextarea placeholder="Ask a question..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Addon alignments flip cleanly with logical <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">inline-start</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">inline-end</code> properties in RTL.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="relative flex items-center max-w-md mx-auto">
            <Search className="absolute right-3 size-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث في المكونات..."
              className="h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] pr-9 pl-3 text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
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
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">InputGroupAddon</td>
                <td className="p-3 font-mono">align</td>
                <td className="p-3 font-mono">"inline-start" | "inline-end" | "block-start" | "block-end"</td>
                <td className="p-3">Position of the addon relative to the input element</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">InputGroupButton</td>
                <td className="p-3 font-mono">size</td>
                <td className="p-3 font-mono">"xs" | "icon-xs" | "sm" | "icon-sm"</td>
                <td className="p-3">Scale size for embedded action buttons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
