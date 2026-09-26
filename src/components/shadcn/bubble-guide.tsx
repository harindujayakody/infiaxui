import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  BubbleDemo,
  BubbleVariantsDemo,
  BubbleAlignmentDemo,
  BubbleGroupDemo,
  BubbleLinkButtonDemo,
  BubbleReactionsDemo,
  BubbleCollapsibleDemo,
  BubbleTooltipDemo,
  BubblePopoverDemo,
} from "@/components/shadcn/bubble-demo"

export function BubbleGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section matching user screenshot media_1790424573691.png */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 flex items-center justify-center min-h-[360px]">
          <BubbleDemo />
        </div>
      </section>

      {/* Intro Description */}
      <div className="text-sm text-[var(--text-muted)] leading-relaxed">
        The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Bubble</code> component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.
      </div>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="bubble"
        dependencies="lucide-react"
        sourcePath="components/ui/bubble.tsx"
        sourceCode={`import * as React from "react"
import { cn } from "@/lib/utils"

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"
  align?: "start" | "end"
  children?: React.ReactNode
}

// Bubble, BubbleContent, BubbleReactions, BubbleGroup
export { Bubble, BubbleContent, BubbleReactions, BubbleGroup }`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Bubble>
  <BubbleContent>
    I checked the registry output and removed the stale route.
  </BubbleContent>
  <BubbleReactions>
    <span>👍</span>
  </BubbleReactions>
</Bubble>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a bubble structure:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>BubbleGroup</div>
          <div className="pl-4">├── Bubble</div>
          <div className="pl-8">├── BubbleContent</div>
          <div className="pl-8">└── BubbleReactions</div>
          <div className="pl-4">└── Bubble</div>
          <div className="pl-8">└── BubbleContent</div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variants</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant</code> to change the visual treatment of the bubble.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[300px]">
          <BubbleVariantsDemo />
        </div>
      </section>

      {/* Alignment */}
      <section id="alignment" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Alignment</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Align bubbles to the <code className="font-mono text-xs">start</code> (incoming) or <code className="font-mono text-xs">end</code> (outgoing).
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleAlignmentDemo />
        </div>
      </section>

      {/* Bubble Group */}
      <section id="group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Bubble Group</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleGroupDemo />
        </div>
      </section>

      {/* Links and Buttons */}
      <section id="link-button" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Polymorphic Links & Buttons</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleLinkButtonDemo />
        </div>
      </section>

      {/* Reactions */}
      <section id="reactions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Reactions</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleReactionsDemo />
        </div>
      </section>

      {/* Show More / Collapsible */}
      <section id="collapsible" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Collapsible Content</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleCollapsibleDemo />
        </div>
      </section>

      {/* Tooltip */}
      <section id="tooltip" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Timestamp Tooltip</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubbleTooltipDemo />
        </div>
      </section>

      {/* Popover */}
      <section id="popover" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Diagnostic Popover</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <BubblePopoverDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">Bubble.variant</td>
                <td className="p-3">"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"</td>
                <td className="p-3">"default"</td>
                <td className="p-3 font-sans">Visual presentation style.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">Bubble.align</td>
                <td className="p-3">"start" | "end"</td>
                <td className="p-3">"start"</td>
                <td className="p-3 font-sans">Inline alignment (start for received, end for sent).</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">BubbleReactions.side</td>
                <td className="p-3">"top" | "bottom"</td>
                <td className="p-3">"bottom"</td>
                <td className="p-3 font-sans">Edge where reactions anchor.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
