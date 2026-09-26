import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  ChevronRight,
  Check,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Save,
  Printer,
  Copy,
  Trash2,
  Bookmark,
  Share2,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function ContextMenuGuide() {
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null)
  const [subOpen, setSubOpen] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showUrls, setShowUrls] = useState(false)
  const [person, setPerson] = useState("pedro")

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct custom right-click menus using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ContextMenu</code> component suite:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "ContextMenu",
            "├── ContextMenuTrigger",
            "└── ContextMenuContent",
            "    ├── ContextMenuGroup",
            "    │   ├── ContextMenuItem (with ContextMenuShortcut)",
            "    │   ├── ContextMenuCheckboxItem",
            "    │   └── ContextMenuRadioGroup",
            "    │       └── ContextMenuRadioItem",
            "    ├── ContextMenuSeparator",
            "    └── ContextMenuSub",
            "        ├── ContextMenuSubTrigger",
            "        └── ContextMenuSubContent",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Demo (Right-Click Area)</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Right-click (or secondary tap) inside the designated canvas below to reveal the context menu.
        </p>

        <div className="relative">
          <div
            onContextMenu={handleContextMenu}
            onClick={() => setMenuPos(null)}
            className="h-72 rounded-2xl border-2 border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center justify-center text-center p-6 cursor-context-menu select-none transition-colors hover:border-indigo-500/40"
          >
            <div className="size-10 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-muted)] mb-3">
              <Share2 className="size-5" />
            </div>
            <p className="text-sm font-semibold text-[var(--text-main)]">
              Right click anywhere in this container
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xs">
              Context menu will open directly at your mouse coordinates with full submenus and shortcut support.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMenuPos({ x: 140, y: 110 })
              }}
              className="mt-4 text-[11px] px-3 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Or click here to simulate right-click
            </button>
          </div>

          <AnimatePresence>
            {menuPos && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                style={{
                  top: Math.min(menuPos.y, 80),
                  left: Math.min(menuPos.x, 320),
                }}
                className="absolute z-50 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl text-xs space-y-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setMenuPos(null)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="size-3.5 text-[var(--text-muted)]" />
                    Back
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘[</span>
                </button>

                <button
                  onClick={() => setMenuPos(null)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                >
                  <span className="flex items-center gap-2">
                    <ArrowRight className="size-3.5 text-[var(--text-muted)]" />
                    Forward
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘]</span>
                </button>

                <button
                  onClick={() => setMenuPos(null)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                >
                  <span className="flex items-center gap-2">
                    <RotateCw className="size-3.5 text-[var(--text-muted)]" />
                    Reload
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘R</span>
                </button>

                <div className="h-px bg-[var(--border-subtle)] my-1" />

                {/* Submenu */}
                <div
                  className="relative"
                  onMouseEnter={() => setSubOpen(true)}
                  onMouseLeave={() => setSubOpen(false)}
                >
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]">
                    <span className="flex items-center gap-2">
                      <Bookmark className="size-3.5 text-[var(--text-muted)]" />
                      More Tools
                    </span>
                    <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                  </button>

                  <AnimatePresence>
                    {subOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        className="absolute left-full top-0 ml-1 w-48 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5"
                      >
                        <button
                          onClick={() => {
                            setSubOpen(false)
                            setMenuPos(null)
                          }}
                          className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                        >
                          <span>Save Page As...</span>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono">⇧⌘S</span>
                        </button>
                        <button
                          onClick={() => {
                            setSubOpen(false)
                            setMenuPos(null)
                          }}
                          className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                        >
                          <span>Create Shortcut...</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-px bg-[var(--border-subtle)] my-1" />

                {/* Checkboxes */}
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                >
                  <span>Show Bookmarks</span>
                  {showBookmarks && <Check className="size-3.5 text-indigo-500" />}
                </button>

                <button
                  onClick={() => setShowUrls(!showUrls)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                >
                  <span>Show Full URLs</span>
                  {showUrls && <Check className="size-3.5 text-indigo-500" />}
                </button>

                <div className="h-px bg-[var(--border-subtle)] my-1" />

                <button
                  onClick={() => setMenuPos(null)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-red-500/10 text-red-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="size-3.5" />
                    Delete
                  </span>
                  <span className="text-[10px] text-red-500/70 font-mono">⌫</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
        />
      </section>

      {/* RTL & Logical Placement */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL & Logical Placement</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">side="inline-end"</code> to position context menus logically relative to document text flow.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-xs mx-auto space-y-1">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-subtle)] text-xs font-medium">
            <span>إعادة تحميل</span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘R</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)]">
            <span>حفظ الصفحة باسم...</span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">⇧⌘S</span>
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
                <td className="p-3 font-mono text-[var(--text-main)]">ContextMenuTrigger.asChild</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Pass-through wrapper for custom interactive canvas</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ContextMenuItem.inset</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Adds leading indentation to align with checkboxes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ContextMenuItem.variant</td>
                <td className="p-3 font-mono">"default" | "destructive"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Applies destructive styling for delete actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
