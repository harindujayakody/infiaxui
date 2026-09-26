import React, { useState, useRef, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, ChevronRight, FileText, Folder, Globe, Printer, Share2, Terminal, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function MenubarGuide() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showFullUrls, setShowFullUrls] = useState(false)
  const [selectedUser, setSelectedUser] = useState("pedro")
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Menubar</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Menubar",
            "└── MenubarMenu",
            "    ├── MenubarTrigger",
            "    └── MenubarContent",
            "        ├── MenubarGroup",
            "        │   ├── MenubarItem",
            "        │   └── MenubarItem",
            "        ├── MenubarSeparator",
            "        ├── MenubarCheckboxItem",
            "        └── MenubarRadioGroup",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Live Interactive Demo */}
      <section id="demo" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Live Interactive Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Desktop-style top command bar with submenus, checkboxes, radio items, and keyboard shortcut indicators.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center justify-center min-h-[320px]">
          <div ref={barRef} className="relative">
            <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-xs select-none shadow-sm">
              {["File", "Edit", "View", "Profiles"].map((menu) => (
                <button
                  key={menu}
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                  className={cn(
                    "px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer",
                    activeMenu === menu
                      ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]/50"
                  )}
                >
                  {menu}
                </button>
              ))}
            </div>

            {/* Menu Popups */}
            <AnimatePresence>
              {activeMenu === "File" && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1.5 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl text-xs z-50 space-y-1"
                >
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left">
                    <span>New Tab</span>
                    <kbd className="font-mono text-[10px] text-[var(--text-muted)]">⌘T</kbd>
                  </button>
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left">
                    <span>New Window</span>
                    <kbd className="font-mono text-[10px] text-[var(--text-muted)]">⌘N</kbd>
                  </button>
                  <div className="h-px bg-[var(--border-subtle)] my-1" />
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left">
                    <span className="flex items-center gap-2"><Share2 className="size-3.5" /> Share</span>
                  </button>
                  <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left">
                    <span className="flex items-center gap-2"><Printer className="size-3.5" /> Print</span>
                    <kbd className="font-mono text-[10px] text-[var(--text-muted)]">⌘P</kbd>
                  </button>
                </motion.div>
              )}

              {activeMenu === "View" && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-16 top-full mt-1.5 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl text-xs z-50 space-y-1"
                >
                  <button
                    onClick={() => setShowBookmarks(!showBookmarks)}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left"
                  >
                    <span>Show Bookmarks</span>
                    {showBookmarks && <Check className="size-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => setShowFullUrls(!showFullUrls)}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left"
                  >
                    <span>Show Full URLs</span>
                    {showFullUrls && <Check className="size-3.5 text-emerald-400" />}
                  </button>
                </motion.div>
              )}

              {activeMenu === "Profiles" && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-32 top-full mt-1.5 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl text-xs z-50 space-y-1"
                >
                  {[
                    { id: "pedro", label: "Pedro Duarte" },
                    { id: "colm", label: "Colm Tuite" },
                    { id: "adam", label: "Adam Wathan" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedUser(p.id)}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-left"
                    >
                      <span>{p.label}</span>
                      {selectedUser === p.id && <Check className="size-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked>Show Bookmarks</MenubarCheckboxItem>
      <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Menubar items order naturally in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)]/60 p-1 text-xs">
            <span className="px-3 py-1.5 text-[var(--text-main)] font-medium">ملف</span>
            <span className="px-3 py-1.5 text-[var(--text-muted)]">تعديل</span>
            <span className="px-3 py-1.5 text-[var(--text-muted)]">عرض</span>
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
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Menubar</td>
                <td className="p-3">Horizontal container for top-level menu triggers</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MenubarCheckboxItem</td>
                <td className="p-3">Toggleable menu item with check indicator</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MenubarRadioGroup</td>
                <td className="p-3">Container for mutually exclusive radio selection items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MenubarShortcut</td>
                <td className="p-3">Right-aligned keyboard combination indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
