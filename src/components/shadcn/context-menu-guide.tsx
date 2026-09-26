import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  ContextMenuDemo,
  ContextMenuBasicDemo,
  ContextMenuSubmenuDemo,
  ContextMenuShortcutsDemo,
  ContextMenuGroupsDemo,
  ContextMenuIconsDemo,
  ContextMenuCheckboxesDemo,
  ContextMenuRadioDemo,
  ContextMenuDestructiveDemo,
  ContextMenuSidesDemo,
  ContextMenuRtlDemo,
} from "@/components/shadcn/context-menu-demo"

export function ContextMenuGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <ContextMenuDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="context-menu"
        dependencies="@base-ui/react framer-motion lucide-react"
        sourcePath="components/ui/context-menu.tsx"
        sourceCode={`import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// ContextMenu primitives
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`}
        />
        <CodeBlock
          language="tsx"
          code={`<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ContextMenu</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>ContextMenu</div>
          <div className="pl-4">├── ContextMenuTrigger</div>
          <div className="pl-4">└── ContextMenuContent</div>
          <div className="pl-8">├── ContextMenuGroup</div>
          <div className="pl-12">├── ContextMenuLabel</div>
          <div className="pl-12">├── ContextMenuItem</div>
          <div className="pl-12">└── ContextMenuCheckboxItem</div>
          <div className="pl-8">├── ContextMenuSeparator</div>
          <div className="pl-8">├── ContextMenuRadioGroup</div>
          <div className="pl-12">└── ContextMenuRadioItem</div>
          <div className="pl-8">└── ContextMenuSub</div>
          <div className="pl-12">├── ContextMenuSubTrigger</div>
          <div className="pl-12">└── ContextMenuSubContent</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuBasicDemo />
        </div>
      </section>

      {/* Submenu */}
      <section id="submenu" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Submenu</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuSubmenuDemo />
        </div>
      </section>

      {/* Shortcuts */}
      <section id="shortcuts" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Shortcuts</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuShortcutsDemo />
        </div>
      </section>

      {/* Groups */}
      <section id="groups" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Groups</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuGroupsDemo />
        </div>
      </section>

      {/* Icons */}
      <section id="icons" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Icons</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuIconsDemo />
        </div>
      </section>

      {/* Checkboxes */}
      <section id="checkboxes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Checkboxes</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuCheckboxesDemo />
        </div>
      </section>

      {/* Radio */}
      <section id="radio" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Radio Group</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuRadioDemo />
        </div>
      </section>

      {/* Destructive */}
      <section id="destructive" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Destructive Action</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuDestructiveDemo />
        </div>
      </section>

      {/* Sides */}
      <section id="sides" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sides Placement</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuSidesDemo />
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <ContextMenuRtlDemo />
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
                <td className="p-3 text-[var(--text-main)] font-semibold">ContextMenu</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Root container managing right-click position and state.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">ContextMenuContent.side</td>
                <td className="p-3">"inline-start" | "inline-end"</td>
                <td className="p-3">"inline-start"</td>
                <td className="p-3 font-sans">Logical placement side of the context menu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
