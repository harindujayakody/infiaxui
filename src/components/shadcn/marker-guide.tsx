import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, FileText, Loader2, Sparkles, ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

function Marker({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode
  variant?: "default" | "border" | "separator"
  className?: string
}) {
  if (variant === "separator") {
    return (
      <div className={cn("relative my-4 flex items-center justify-center select-none", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-subtle)]" />
        </div>
        <div className="relative bg-[var(--bg-card)] px-3 text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs text-[var(--text-muted)] py-1.5",
        variant === "border" && "border-b border-[var(--border-subtle)] pb-2 mb-2",
        className
      )}
    >
      {children}
    </div>
  )
}

function MarkerIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div aria-hidden="true" className={cn("size-3.5 shrink-0 text-[var(--text-muted)]", className)}>{children}</div>
}

function MarkerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("flex-1", className)}>{children}</span>
}

export function MarkerGuide() {
  const [isThinking, setIsThinking] = useState(true)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Marker</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Marker</div>
          <div className="pl-4">├── MarkerIcon</div>
          <div className="pl-4">└── MarkerContent</div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variants</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Switch between <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">border</code>, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">separator</code> layouts.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 max-w-md mx-auto">
          {/* Default inline marker */}
          <Marker>
            <MarkerIcon><Check className="size-3.5 text-emerald-400" /></MarkerIcon>
            <MarkerContent>Explored 4 files in repository</MarkerContent>
          </Marker>

          {/* Separator marker */}
          <Marker variant="separator">
            Today
          </Marker>

          {/* Bordered status marker */}
          <Marker variant="border">
            <MarkerIcon><FileText className="size-3.5 text-sky-400" /></MarkerIcon>
            <MarkerContent>Opened implementation notes</MarkerContent>
          </Marker>

          {/* Streaming status marker */}
          <div
            className="flex items-center gap-2 text-xs text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-main)] transition-colors"
            onClick={() => setIsThinking(!isThinking)}
          >
            <MarkerIcon>
              {isThinking ? <Loader2 className="size-3.5 animate-spin text-sky-400" /> : <Sparkles className="size-3.5 text-amber-400" />}
            </MarkerIcon>
            <MarkerContent>
              {isThinking ? "Thinking and searching documentation..." : "Completed analysis"}
            </MarkerContent>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

{/* Default status note */}
<Marker>
  <MarkerIcon><CheckIcon /></MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>

{/* Labeled divider */}
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>

{/* Bordered row */}
<Marker variant="border">
  <MarkerIcon><FileTextIcon /></MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>`}
        />
      </section>

      {/* Links & Buttons */}
      <section id="links" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Links & Buttons</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Render markers as interactive links with hover transitions.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <a
            href="#pr"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)]/60 px-3.5 py-2 text-xs text-[var(--text-main)] hover:border-[var(--text-muted)] transition-colors shadow-sm"
          >
            <FileText className="size-3.5 text-sky-400" />
            <span>View Pull Request #142</span>
            <ExternalLink className="size-3 text-[var(--text-muted)] ml-1" />
          </a>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Marker render={<a href="/pull/142" />}>
  <MarkerIcon><FileTextIcon /></MarkerIcon>
  <MarkerContent>View the pull request</MarkerContent>
</Marker>`}
        />
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Accessibility</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
          <p>
            • For active background tasks or AI reasoning steps, set <code className="text-[var(--text-main)] font-mono">role="status"</code> so screen readers announce the progress update.
          </p>
          <p>
            • Labeled separators contain decorative dividers with real text — do not add <code className="text-[var(--text-main)] font-mono">role="separator"</code> to them so the label remains announceable.
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
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">"default" | "border" | "separator"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Layout style of the conversation marker</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">render</td>
                <td className="p-3 font-mono">ReactElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Render as an interactive element like &lt;a&gt; or &lt;button&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
