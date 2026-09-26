import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  DropdownMenuDemo,
  DropdownMenuBasicDemo,
  DropdownMenuSubmenuDemo,
  DropdownMenuShortcutsDemo,
  DropdownMenuIconsDemo,
  DropdownMenuCheckboxesDemo,
  DropdownMenuRadioGroupDemo,
  DropdownMenuDestructiveDemo,
  DropdownMenuAvatarDemo,
  DropdownMenuComplexDemo,
  DropdownMenuRtlDemo,
} from "@/components/shadcn/dropdown-menu-demo"

export function DropdownMenuGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <DropdownMenuDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="dropdown-menu"
        dependencies="@base-ui/react framer-motion lucide-react"
        sourcePath="components/ui/dropdown-menu.tsx"
        sourceCode={`import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// Context and dropdown menu components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`}
        />
        <CodeBlock
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenu</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>DropdownMenu</div>
          <div className="pl-4">├── DropdownMenuTrigger</div>
          <div className="pl-4">└── DropdownMenuContent</div>
          <div className="pl-8">├── DropdownMenuGroup</div>
          <div className="pl-12">├── DropdownMenuLabel</div>
          <div className="pl-12">├── DropdownMenuItem</div>
          <div className="pl-12">└── DropdownMenuCheckboxItem</div>
          <div className="pl-8">├── DropdownMenuSeparator</div>
          <div className="pl-8">├── DropdownMenuRadioGroup</div>
          <div className="pl-12">└── DropdownMenuRadioItem</div>
          <div className="pl-8">└── DropdownMenuSub</div>
          <div className="pl-12">├── DropdownMenuSubTrigger</div>
          <div className="pl-12">└── DropdownMenuSubContent</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuBasicDemo />
        </div>
      </section>

      {/* Submenu */}
      <section id="submenu" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Submenu</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuSub</code> to nest secondary action groups.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuSubmenuDemo />
        </div>
      </section>

      {/* Shortcuts */}
      <section id="shortcuts" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Shortcuts</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuShortcutsDemo />
        </div>
      </section>

      {/* Icons */}
      <section id="icons" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Icons</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuIconsDemo />
        </div>
      </section>

      {/* Checkboxes */}
      <section id="checkboxes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Checkboxes</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuCheckboxesDemo />
        </div>
      </section>

      {/* Radio Group */}
      <section id="radio-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Radio Group</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuRadioGroupDemo />
        </div>
      </section>

      {/* Destructive */}
      <section id="destructive" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Destructive Action</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuDestructiveDemo />
        </div>
      </section>

      {/* Avatar */}
      <section id="avatar" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar Trigger</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuAvatarDemo />
        </div>
      </section>

      {/* Complex */}
      <section id="complex" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Complex Dropdown</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <DropdownMenuComplexDemo />
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DropdownMenuRtlDemo />
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
                <td className="p-3 text-[var(--text-main)] font-semibold">DropdownMenu</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Root dropdown menu container.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">DropdownMenuContent.align</td>
                <td className="p-3">"start" | "center" | "end"</td>
                <td className="p-3">"start"</td>
                <td className="p-3 font-sans">Alignment relative to trigger button.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">DropdownMenuItem.variant</td>
                <td className="p-3">"default" | "destructive"</td>
                <td className="p-3">"default"</td>
                <td className="p-3 font-sans">Visual style variant for standard or destructive items.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
