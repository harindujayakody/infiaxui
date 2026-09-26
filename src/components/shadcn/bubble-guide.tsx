import React, { useState } from "react"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
  BubbleGroup,
} from "@/components/shadcn/bubble"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/shadcn/collapsible"
import { Tooltip } from "@/components/shadcn/tooltip"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronDown, ThumbsUp, Heart, Smile, Sparkles, Check, AlertCircle } from "lucide-react"

export function BubbleGuide() {
  const [isBubbleExpanded, setIsBubbleExpanded] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Introduction */}
      <section id="introduction" className="scroll-mt-20 space-y-4">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Bubble</code> component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          For full-featured chat interfaces, use the <code className="text-[var(--text-main)] font-mono">Message</code> component. <code className="text-[var(--text-main)] font-mono">Bubble</code> is intentionally scoped to the bubble surface. Place avatars, names, timestamps, metadata, and message-level actions in <code className="text-[var(--text-main)] font-mono">Message</code>.
        </p>
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a bubble:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`Bubble
├── BubbleContent
└── BubbleReactions`}
        />

        <p className="text-sm text-[var(--text-muted)] pt-2">
          Use <code className="text-[var(--text-main)] font-mono">BubbleGroup</code> to group consecutive bubbles from the same sender:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent`}
        />
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Features</h2>
        <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-muted)]">
          <li>Seven visual variants, from a strong primary bubble to unframed ghost content</li>
          <li>Start and end alignment for sender and receiver bubbles</li>
          <li>Reactions that anchor to the bubble edge with configurable side and alignment</li>
          <li>Bubbles size to their content, up to 80% of the container width</li>
          <li>Polymorphic content via <code className="text-[var(--text-main)]">render</code> for link and button bubbles</li>
          <li>Customizable styling through the <code className="text-[var(--text-main)]">className</code> prop on every part</li>
        </ul>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variants</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant</code> to change the visual treatment of the bubble.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
          <Bubble variant="default" align="end">
            <BubbleContent>Default primary user message bubble</BubbleContent>
          </Bubble>
          <Bubble variant="secondary" align="start">
            <BubbleContent>Secondary neutral response bubble</BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="start">
            <BubbleContent>Tinted brand accent notification bubble</BubbleContent>
          </Bubble>
          <Bubble variant="muted" align="start">
            <BubbleContent>Muted lower-emphasis system context</BubbleContent>
          </Bubble>
          <Bubble variant="outline" align="start">
            <BubbleContent>Outline bordered bubble for structured content</BubbleContent>
          </Bubble>
          <Bubble variant="ghost" align="start">
            <BubbleContent>Ghost unframed assistant rich response</BubbleContent>
          </Bubble>
          <Bubble variant="destructive" align="start">
            <BubbleContent>Destructive bubble: An error occurred during payment processing.</BubbleContent>
          </Bubble>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Bubble variant="default" align="end">
  <BubbleContent>Default primary user message bubble</BubbleContent>
</Bubble>
<Bubble variant="secondary" align="start">
  <BubbleContent>Secondary neutral response bubble</BubbleContent>
</Bubble>
<Bubble variant="tinted" align="start">
  <BubbleContent>Tinted brand accent notification bubble</BubbleContent>
</Bubble>
<Bubble variant="muted" align="start">
  <BubbleContent>Muted lower-emphasis system context</BubbleContent>
</Bubble>
<Bubble variant="outline" align="start">
  <BubbleContent>Outline bordered bubble for structured content</BubbleContent>
</Bubble>
<Bubble variant="ghost" align="start">
  <BubbleContent>Ghost unframed assistant rich response</BubbleContent>
</Bubble>
<Bubble variant="destructive" align="start">
  <BubbleContent>Destructive error bubble</BubbleContent>
</Bubble>`}
        />
      </section>

      {/* Alignment */}
      <section id="alignment" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Alignment</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">align</code> on <code className="text-[var(--text-main)] font-mono">Bubble</code> to align the bubble to the start or end of the conversation.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <Bubble variant="secondary" align="start">
            <BubbleContent>Hello! How can I help you today?</BubbleContent>
          </Bubble>
          <Bubble variant="default" align="end">
            <BubbleContent>I would like to explore the new Shadcn UI components.</BubbleContent>
          </Bubble>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Bubble variant="secondary" align="start">
  <BubbleContent>Hello! How can I help you today?</BubbleContent>
</Bubble>
<Bubble variant="default" align="end">
  <BubbleContent>I would like to explore the new Shadcn UI components.</BubbleContent>
</Bubble>`}
        />
      </section>

      {/* Bubble Group */}
      <section id="bubble-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Bubble Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">BubbleGroup</code> to group consecutive bubbles from the same sender.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <BubbleGroup>
            <Bubble variant="default" align="end">
              <BubbleContent>Hey, did you see the new release?</BubbleContent>
            </Bubble>
            <Bubble variant="default" align="end">
              <BubbleContent>It comes with 57 clean Shadcn components!</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </div>

        <CodeBlock
          language="tsx"
          code={`<BubbleGroup>
  <Bubble variant="default" align="end">
    <BubbleContent>Hey, did you see the new release?</BubbleContent>
  </Bubble>
  <Bubble variant="default" align="end">
    <BubbleContent>It comes with 57 clean Shadcn components!</BubbleContent>
  </Bubble>
</BubbleGroup>`}
        />
      </section>

      {/* Links and Buttons */}
      <section id="links-and-buttons" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Links and Buttons</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can turn a bubble into an interactive link or button using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">render</code> prop on <code className="text-[var(--text-main)] font-mono">BubbleContent</code>.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Bubble variant="muted" align="start">
            <BubbleContent
              render={
                <button
                  type="button"
                  onClick={() => alert("Bubble button clicked!")}
                  className="cursor-pointer hover:underline text-left text-[var(--brand)] font-medium"
                />
              }
            >
              Click here to view installation instructions →
            </BubbleContent>
          </Bubble>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Bubble variant="muted" align="start">
  <BubbleContent
    render={
      <button
        type="button"
        onClick={() => handleClick()}
        className="cursor-pointer hover:underline text-[var(--brand)]"
      />
    }
  >
    Click here to view installation instructions →
  </BubbleContent>
</Bubble>`}
        />
      </section>

      {/* Reactions */}
      <section id="reactions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Reactions</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">BubbleReactions</code> for bubble reactions. Anchors smoothly to the bubble edge.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
          <Bubble variant="secondary" align="start">
            <BubbleContent>The new responsive layouts are super fast and clean.</BubbleContent>
            <BubbleReactions side="bottom" align="end">
              <span>👍</span>
              <span>🔥</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px]">+3</span>
            </BubbleReactions>
          </Bubble>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Bubble variant="secondary" align="start">
  <BubbleContent>The new responsive layouts are super fast and clean.</BubbleContent>
  <BubbleReactions side="bottom" align="end">
    <span>👍</span>
    <span>🔥</span>
    <span>+3</span>
  </BubbleReactions>
</Bubble>`}
        />
      </section>

      {/* Show More / Collapsible */}
      <section id="show-more" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Show More / Collapsible</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Long bubble content can be composed with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Collapsible</code> for a show more or show less interaction.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Bubble variant="secondary" align="start">
            <BubbleContent>
              <div className="space-y-1">
                <div>Here is the initial summary of the log analysis.</div>
                <Collapsible open={isBubbleExpanded} onOpenChange={setIsBubbleExpanded}>
                  <CollapsibleContent>
                    <div className="pt-2 text-[var(--text-muted)] border-t border-[var(--border-subtle)] mt-2 font-mono text-[11px]">
                      [INFO] 2026-09-26 14:30:12 System booted successfully.<br />
                      [INFO] 2026-09-26 14:30:15 Vite dev server active.<br />
                      [INFO] 2026-09-26 14:30:18 57 components verified.
                    </div>
                  </CollapsibleContent>
                  <CollapsibleTrigger className="mt-2 text-[11px] text-[var(--brand)] font-medium hover:underline flex items-center gap-1 cursor-pointer">
                    <span>{isBubbleExpanded ? "Show less" : "Show more logs"}</span>
                    <ChevronDown className={`size-3 transition-transform ${isBubbleExpanded ? "rotate-180" : ""}`} />
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </BubbleContent>
          </Bubble>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Bubble variant="secondary">
  <BubbleContent>
    <div>Here is the initial summary.</div>
    <Collapsible>
      <CollapsibleContent>
        <div className="pt-2 font-mono text-xs">Detailed logs here...</div>
      </CollapsibleContent>
      <CollapsibleTrigger>Show more</CollapsibleTrigger>
    </Collapsible>
  </BubbleContent>
</Bubble>`}
        />
      </section>

      {/* Tooltip */}
      <section id="tooltip" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Tooltip</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Wrap a bubble in a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Tooltip</code> to reveal metadata on hover, such as read receipts.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex justify-end">
          <Tooltip content="Delivered & Read at 2:30 PM">
            <Bubble variant="default" align="end">
              <BubbleContent>Hover to check delivery timestamp</BubbleContent>
            </Bubble>
          </Tooltip>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Complete props specification for <code className="text-[var(--text-main)] font-mono">Bubble</code> primitives.
        </p>

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
                <td className="p-3 font-mono">&quot;default&quot; | &quot;secondary&quot; | &quot;muted&quot; | &quot;tinted&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;destructive&quot;</td>
                <td className="p-3 font-mono">&quot;default&quot;</td>
                <td className="p-3">The bubble visual treatment.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">align</td>
                <td className="p-3 font-mono">&quot;start&quot; | &quot;end&quot;</td>
                <td className="p-3 font-mono">&quot;start&quot;</td>
                <td className="p-3">Inline alignment of the bubble.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">render</td>
                <td className="p-3 font-mono">ReactElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Polymorphic render element for BubbleContent.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">side</td>
                <td className="p-3 font-mono">&quot;top&quot; | &quot;bottom&quot;</td>
                <td className="p-3 font-mono">&quot;bottom&quot;</td>
                <td className="p-3">Side of bubble to anchor reactions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
