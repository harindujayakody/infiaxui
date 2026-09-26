import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import {
  Settings,
  Info,
  Copy,
  Trash2,
  AlertTriangle,
  Keyboard,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

// ---------- Minimal self-contained Tooltip primitives for the demo ----------
function TooltipRoot({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function TooltipTrigger({
  children,
  tooltipId,
}: {
  children: React.ReactNode
  tooltipId: string
}) {
  return (
    <span
      aria-describedby={tooltipId}
      className="inline-block"
    >
      {children}
    </span>
  )
}

interface TooltipPopoverProps {
  id: string
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  shortcut?: string
}

function Tip({ id, content, children, side = "top", shortcut }: TooltipPopoverProps) {
  const [visible, setVisible] = useState(false)

  const placements = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2.5 py-1 text-xs text-[var(--text-main)] shadow-lg ${placements[side]} flex items-center gap-1.5`}
        >
          {content}
          {shortcut && (
            <kbd className="ml-1 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-1 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
              {shortcut}
            </kbd>
          )}
        </span>
      )}
    </span>
  )
}

export function TooltipGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Tooltip</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)]">
          <div>Tooltip</div>
          <div className="pl-4">├── TooltipTrigger</div>
          <div className="pl-4">└── TooltipContent</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Hover or focus the trigger to reveal the tooltip popup.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Tip id="tip-basic" content="Add to library">
            <Button variant="outline">Hover</Button>
          </Tip>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`}
        />
      </section>

      {/* Side */}
      <section id="side" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Side</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">side</code> prop to change the position of the tooltip.
        </p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-center gap-4">
          <Tip id="tip-top" content="Tooltip on top" side="top">
            <Button variant="outline" size="sm">Top</Button>
          </Tip>
          <Tip id="tip-right" content="Tooltip on right" side="right">
            <Button variant="outline" size="sm">Right</Button>
          </Tip>
          <Tip id="tip-bottom" content="Tooltip on bottom" side="bottom">
            <Button variant="outline" size="sm">Bottom</Button>
          </Tip>
          <Tip id="tip-left" content="Tooltip on left" side="left">
            <Button variant="outline" size="sm">Left</Button>
          </Tip>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger>Top</TooltipTrigger>
  <TooltipContent side="top">Tooltip on top</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>Right</TooltipTrigger>
  <TooltipContent side="right">Tooltip on right</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>Bottom</TooltipTrigger>
  <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger>Left</TooltipTrigger>
  <TooltipContent side="left">Tooltip on left</TooltipContent>
</Tooltip>`}
        />
      </section>

      {/* With Keyboard Shortcut */}
      <section id="with-keyboard-shortcut" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Keyboard Shortcut</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Embed a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;kbd&gt;</code> element inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TooltipContent</code> to display a keyboard shortcut.
        </p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-center gap-4">
          <Tip id="tip-cmd-c" content="Copy" shortcut="⌘C">
            <Button variant="outline" size="sm">
              <Copy className="size-3.5 mr-1.5" />
              Copy
            </Button>
          </Tip>
          <Tip id="tip-del" content="Delete" shortcut="⌫">
            <Button variant="outline" size="sm">
              <Trash2 className="size-3.5 mr-1.5" />
              Delete
            </Button>
          </Tip>
          <Tip id="tip-settings" content="Settings" shortcut="⌘,">
            <Button variant="outline" size="sm">
              <Settings className="size-3.5 mr-1.5" />
              Settings
            </Button>
          </Tip>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">
      <Copy className="size-4 mr-2" />
      Copy
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    Copy
    <kbd className="ml-2 rounded bg-muted border px-1 py-0.5 font-mono text-xs">
      ⌘C
    </kbd>
  </TooltipContent>
</Tooltip>`}
        />
      </section>

      {/* Disabled Button */}
      <section id="disabled-button" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled Button</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Disabled buttons don't fire pointer events. Wrap the button in a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;span&gt;</code> so the tooltip still triggers.
        </p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Tip id="tip-disabled" content="You don't have permission to do this">
            <span tabIndex={0}>
              <Button variant="outline" disabled className="pointer-events-none">
                <AlertTriangle className="size-3.5 mr-1.5 text-amber-400" />
                Restricted
              </Button>
            </span>
          </Tip>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger asChild>
    {/* Wrap disabled button in a span so pointer events still fire */}
    <span tabIndex={0}>
      <Button variant="outline" disabled className="pointer-events-none">
        Restricted
      </Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>
    You don't have permission to do this
  </TooltipContent>
</Tooltip>`}
        />
      </section>

      {/* Rich Content */}
      <section id="rich-content" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Rich Content</h2>
        <p className="text-sm text-[var(--text-muted)]">
          <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TooltipContent</code> accepts any React content including icons, links, and formatted text.
        </p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Tip
            id="tip-info"
            content={
              <span className="flex items-start gap-2 max-w-[180px] whitespace-normal">
                <Info className="size-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Pro plan required. <span className="text-sky-400 underline cursor-pointer">Upgrade now →</span></span>
              </span>
            }
          >
            <Button variant="outline" size="sm">
              <Info className="size-3.5 mr-1.5" />
              Learn More
            </Button>
          </Tip>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Learn More</Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-[180px]">
    <div className="flex items-start gap-2">
      <Info className="size-3.5 text-sky-400 mt-0.5 shrink-0" />
      <span>
        Pro plan required.{" "}
        <a href="/pricing" className="underline">Upgrade now →</a>
      </span>
    </div>
  </TooltipContent>
</Tooltip>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Tooltip works seamlessly in RTL layouts. See the <a href="/docs/rtl" className="underline text-[var(--text-muted)] hover:text-[var(--text-main)]">RTL configuration guide</a> for setup.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4">
          <Tip id="tip-rtl-l" content="محاذاة لليسار" side="top">
            <Button variant="outline" size="sm">
              <AlignLeft className="size-3.5" />
            </Button>
          </Tip>
          <Tip id="tip-rtl-c" content="توسيط" side="top">
            <Button variant="outline" size="sm">
              <AlignCenter className="size-3.5" />
            </Button>
          </Tip>
          <Tip id="tip-rtl-r" content="محاذاة لليمين" side="top">
            <Button variant="outline" size="sm">
              <AlignRight className="size-3.5" />
            </Button>
          </Tip>
        </div>
      </section>

      {/* TooltipProvider */}
      <section id="provider" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">TooltipProvider</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Wrap your app root with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TooltipProvider</code> to share tooltip delay settings across all tooltip instances.
        </p>
        <CodeBlock
          language="tsx"
          code={`// app/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider delayDuration={300}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`}
        />
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
                <td className="p-3 font-mono text-[var(--text-main)]">side</td>
                <td className="p-3 font-mono">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3 font-mono">"top"</td>
                <td className="p-3">Preferred side to display tooltip</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">sideOffset</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4</td>
                <td className="p-3">Pixel gap between trigger and tooltip</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">delayDuration</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">700</td>
                <td className="p-3">Milliseconds before tooltip appears</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">open</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled open state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onOpenChange</td>
                <td className="p-3 font-mono">(open: boolean) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback when open state changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
