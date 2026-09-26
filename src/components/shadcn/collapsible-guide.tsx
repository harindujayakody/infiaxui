import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronsUpDown, Folder, FolderOpen, FileText, ChevronRight, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function CollapsibleGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [folderOpen, setFolderOpen] = useState(true)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Animate collapsible panels with the minimal <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Collapsible</code> component structure:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Collapsible (open={...} onOpenChange={...})",
            "├── CollapsibleTrigger",
            "└── CollapsibleContent",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Collapsible</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Starred repositories collapse with smooth height animations.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-main)]">
                @peduarte starred 3 repositories
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <ChevronsUpDown className="size-4" />
              </button>
            </div>

            <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--text-main)]">
              @radix-ui/primitives
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--text-main)]">
                    @radix-ui/colors
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-mono text-[var(--text-main)]">
                    @stitches/react
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
        />
      </section>

      {/* File Tree Nested Collapsible */}
      <section id="file-tree" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Nested File Tree</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct hierarchical directories and treeviews by nesting <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Collapsible</code> elements.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto font-mono text-xs">
          <div className="space-y-1">
            <div
              onClick={() => setFolderOpen(!folderOpen)}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--bg-subtle)] cursor-pointer text-[var(--text-main)]"
            >
              <ChevronRight
                className={cn("size-3.5 transition-transform text-[var(--text-muted)]", folderOpen && "rotate-90")}
              />
              {folderOpen ? (
                <FolderOpen className="size-4 text-amber-500" />
              ) : (
                <Folder className="size-4 text-amber-500" />
              )}
              <span className="font-semibold">src/components</span>
            </div>

            <AnimatePresence initial={false}>
              {folderOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 space-y-1 border-l border-[var(--border-subtle)] ml-3"
                >
                  <div className="flex items-center gap-2 p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">
                    <FileText className="size-3.5" />
                    <span>button.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">
                    <FileText className="size-3.5" />
                    <span>dialog.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">
                    <FileText className="size-3.5" />
                    <span>collapsible.tsx</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Collapsible defaultOpen>
  <CollapsibleTrigger className="flex items-center gap-2 font-semibold">
    <Folder className="size-4" />
    <span>src/components</span>
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-6 space-y-1 border-l">
    <div className="flex items-center gap-2">button.tsx</div>
    <div className="flex items-center gap-2">dialog.tsx</div>
  </CollapsibleContent>
</Collapsible>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Nested indentation and trigger carets mirror dynamically in right-to-left layout mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-subtle)] text-xs font-semibold">
            <span>الأسئلة الشائعة حول الاستخدام</span>
            <ChevronsUpDown className="size-3.5 text-[var(--text-muted)]" />
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
                <td className="p-3 font-mono text-[var(--text-main)]">Collapsible.open</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled boolean visibility state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Collapsible.defaultOpen</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Initial open state for uncontrolled usage</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">CollapsibleTrigger.asChild</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Merges props onto the child toggle button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
