import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Search,
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  HelpCircle,
  Laptop,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function CommandGuide() {
  const [query, setQuery] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const items = [
    { id: "cal", label: "Calendar", group: "Suggestions", icon: Calendar, shortcut: "⌘C" },
    { id: "emoji", label: "Search Emoji", group: "Suggestions", icon: Smile, shortcut: "⌘E" },
    { id: "calc", label: "Calculator", group: "Suggestions", icon: Calculator, shortcut: "⌘N" },
    { id: "profile", label: "Profile", group: "Settings", icon: User, shortcut: "⌘P" },
    { id: "billing", label: "Billing", group: "Settings", icon: CreditCard, shortcut: "⌘B" },
    { id: "settings", label: "Settings", group: "Settings", icon: Settings, shortcut: "⌘S" },
    { id: "help", label: "Help & Docs", group: "Support", icon: HelpCircle, shortcut: "⇧⌘H" },
  ]

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const groups = Array.from(new Set(filteredItems.map((i) => i.group)))

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build accessible command palettes and instant search menus using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Command</code> primitives:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Command",
            "├── CommandInput",
            "└── CommandList",
            "    ├── CommandEmpty",
            "    ├── CommandGroup",
            "    │   ├── CommandItem (with CommandShortcut)",
            "    │   └── CommandItem",
            "    ├── CommandSeparator",
            "    └── CommandGroup",
            "        └── CommandItem",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Command Menu</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Fast, keyboard-navigable command palette with live text filtering.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-lg mx-auto">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] overflow-hidden shadow-lg">
            {/* Input */}
            <div className="flex items-center px-3 border-b border-[var(--border-subtle)]">
              <Search className="size-4 text-[var(--text-muted)] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full h-11 px-3 bg-transparent text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* List */}
            <div className="p-2 max-h-64 overflow-y-auto space-y-3">
              {filteredItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-[var(--text-muted)]">
                  No results found for <span className="font-semibold text-[var(--text-main)]">"{query}"</span>.
                </div>
              ) : (
                groups.map((group) => {
                  const groupItems = filteredItems.filter((i) => i.group === group)
                  return (
                    <div key={group} className="space-y-1">
                      <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                        {group}
                      </div>
                      {groupItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors text-[var(--text-main)]"
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="size-3.5 text-[var(--text-muted)]" />
                              <span>{item.label}</span>
                            </div>
                            <span className="text-[10px] font-mono text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                              {item.shortcut}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenuDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`}
        />
      </section>

      {/* Modal Dialog Variant */}
      <section id="dialog" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">In a Modal Dialog</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] font-mono text-xs">⌘K</kbd> or trigger below to launch as a global quick search overlay.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <button
            onClick={() => setOpenDialog(true)}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)] flex items-center gap-3 hover:bg-[var(--bg-subtle)] shadow-sm"
          >
            <Search className="size-3.5 text-[var(--text-muted)]" />
            <span>Quick search...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>

          <AnimatePresence>
            {openDialog && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenDialog(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="fixed left-1/2 top-28 -translate-x-1/2 w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl z-50 overflow-hidden text-xs"
                >
                  <div className="flex items-center px-4 border-b border-[var(--border-subtle)]">
                    <Search className="size-4 text-[var(--text-muted)]" />
                    <input
                      autoFocus
                      placeholder="Search files, actions, or jump to..."
                      className="w-full h-12 px-3 bg-transparent text-xs text-[var(--text-main)] focus:outline-none"
                    />
                    <kbd
                      onClick={() => setOpenDialog(false)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-page)] border border-[var(--border-subtle)] cursor-pointer"
                    >
                      ESC
                    </kbd>
                  </div>

                  <div className="p-2 max-h-60 overflow-y-auto space-y-1">
                    <div className="px-2 py-1 text-[10px] uppercase font-semibold text-[var(--text-muted)]">
                      Recent Actions
                    </div>
                    <div
                      onClick={() => setOpenDialog(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="size-3.5 text-indigo-500" />
                        Generate Documentation
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">⌘G</span>
                    </div>
                    <div
                      onClick={() => setOpenDialog(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="size-3.5 text-[var(--text-muted)]" />
                        Workspace Preferences
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">⌘,</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Search input and keyboard shortcut tags automatically align to the opposing side in RTL.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-subtle)] text-xs">
            <span>لوحة التحكم الرئيسية</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">⌘H</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)]">
            <span>إعدادات الفريق</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">⌘T</span>
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
                <td className="p-3 font-mono text-[var(--text-main)]">Command.filter</td>
                <td className="p-3 font-mono">(value: string, search: string) =&gt; number</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Custom scoring filter function for ranked search results</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">CommandGroup.heading</td>
                <td className="p-3 font-mono">ReactNode</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Sticky section group label text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">CommandShortcut</td>
                <td className="p-3 font-mono">HTMLSpanElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Trailing keyboard shortcut pill badge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
