import React from "react"
import { Badge } from "@/components/shadcn/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, ArrowRight, Loader2, Star, Sparkles } from "lucide-react"

export function BadgeGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Variants */}
      <section id="variants" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variants</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant</code> prop to change the visual variant of the badge.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link Badge</Badge>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link Badge</Badge>`}
        />
      </section>

      {/* With Icon */}
      <section id="with-icon" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Icon</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can render an icon inside the badge at the start or end.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <Badge variant="secondary">
            <Check className="size-3 text-emerald-400" />
            <span>Verified</span>
          </Badge>
          <Badge variant="default">
            <span>Explore</span>
            <ArrowRight className="size-3" />
          </Badge>
          <Badge variant="outline">
            <Sparkles className="size-3 text-amber-400" />
            <span>Featured</span>
          </Badge>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Badge variant="secondary">
  <Check className="size-3 text-emerald-400" />
  <span>Verified</span>
</Badge>
<Badge variant="default">
  <span>Explore</span>
  <ArrowRight className="size-3" />
</Badge>`}
        />
      </section>

      {/* With Spinner */}
      <section id="with-spinner" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Spinner</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can render a spinner inside the badge to indicate ongoing loading state.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <Badge variant="secondary">
            <Loader2 className="size-3 animate-spin text-[var(--brand)]" />
            <span>Syncing</span>
          </Badge>
          <Badge variant="outline">
            <Loader2 className="size-3 animate-spin text-[var(--text-muted)]" />
            <span>Processing</span>
          </Badge>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Badge variant="secondary">
  <Loader2 className="size-3 animate-spin" />
  <span>Syncing</span>
</Badge>`}
        />
      </section>

      {/* Link */}
      <section id="link" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Link</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">render</code> prop or pass an anchor tag to render a clickable badge.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-3">
          <Badge
            variant="outline"
            render={
              <a
                href="#link"
                className="cursor-pointer hover:bg-[var(--bg-subtle)] hover:text-[var(--brand)] transition-colors"
              />
            }
          >
            <span>Documentation ↗</span>
          </Badge>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Badge variant="outline" render={<a href="/docs" />}>
  Documentation ↗
</Badge>`}
        />
      </section>

      {/* Custom Colors */}
      <section id="custom-colors" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Custom Colors</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can customize the colors of a badge by adding custom utility classes.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
            Success
          </Badge>
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20">
            Warning
          </Badge>
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20">
            Pro Plan
          </Badge>
          <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/20">
            New Feature
          </Badge>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
  Success
</Badge>
<Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
  Warning
</Badge>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Badges support seamless right-to-left layout and flipped inline icon alignment.
        </p>

        {/* Live Demo */}
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <Badge variant="secondary">
            <Check className="size-3 text-emerald-400" />
            <span>مكتمل</span>
          </Badge>
          <Badge variant="default">
            <span>موصى به</span>
            <Star className="size-3" />
          </Badge>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">&quot;default&quot; | &quot;secondary&quot; | &quot;destructive&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;link&quot;</td>
                <td className="p-3 font-mono">&quot;default&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">render</td>
                <td className="p-3 font-mono">ReactElement</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
