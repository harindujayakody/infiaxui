import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  ChevronRight,
  Check,
  User,
  CreditCard,
  Settings,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  Plus,
  LogOut,
  Sliders,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DropdownMenuGuide() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openCheckboxes, setOpenCheckboxes] = useState(false)
  const [openRadio, setOpenRadio] = useState(false)
  const [openSub, setOpenSub] = useState(false)
  const [subOpen, setSubOpen] = useState(false)

  // Checkbox states
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  // Radio state
  const [theme, setTheme] = useState("system")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct rich nested menus with the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenu</code> component suite:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "DropdownMenu",
            "├── DropdownMenuTrigger",
            "└── DropdownMenuContent",
            "    ├── DropdownMenuLabel",
            "    ├── DropdownMenuGroup",
            "    │   ├── DropdownMenuItem (with DropdownMenuShortcut)",
            "    │   ├── DropdownMenuCheckboxItem",
            "    │   └── DropdownMenuRadioGroup",
            "    │       └── DropdownMenuRadioItem",
            "    ├── DropdownMenuSeparator",
            "    └── DropdownMenuSub",
            "        ├── DropdownMenuSubTrigger",
            "        └── DropdownMenuSubContent",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Profile Menu */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Dropdown Menu</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard profile menu with groups, keyboard shortcuts, and destructive action item.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[300px]">
          <div className="relative">
            <button
              onClick={() => setOpenBasic(!openBasic)}
              className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors shadow-sm"
            >
              Open Menu
            </button>

            <AnimatePresence>
              {openBasic && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs"
                >
                  <div className="px-2 py-1.5 font-semibold text-[11px] text-[var(--text-main)]">
                    My Account
                  </div>
                  <div className="h-px bg-[var(--border-subtle)] my-1" />

                  <div className="space-y-0.5">
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                    >
                      <span className="flex items-center gap-2">
                        <User className="size-3.5 text-[var(--text-muted)]" />
                        Profile
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">⇧⌘P</span>
                    </button>
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                    >
                      <span className="flex items-center gap-2">
                        <CreditCard className="size-3.5 text-[var(--text-muted)]" />
                        Billing
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘B</span>
                    </button>
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Settings className="size-3.5 text-[var(--text-muted)]" />
                        Settings
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘S</span>
                    </button>
                  </div>

                  <div className="h-px bg-[var(--border-subtle)] my-1" />

                  <button
                    onClick={() => setOpenBasic(false)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-red-500/10 text-red-500 text-left transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="size-3.5" />
                      Log out
                    </span>
                    <span className="text-[10px] text-red-500/70 font-mono">⇧⌘Q</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
        />
      </section>

      {/* Checkboxes Demo */}
      <section id="checkboxes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Checkboxes</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Multi-select items using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuCheckboxItem</code>.
        </p>

        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <div className="relative">
            <button
              onClick={() => setOpenCheckboxes(!openCheckboxes)}
              className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)] flex items-center gap-2"
            >
              <Sliders className="size-3.5" />
              <span>View Options</span>
            </button>

            <AnimatePresence>
              {openCheckboxes && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5"
                >
                  <div className="px-2 py-1 font-semibold text-[11px] text-[var(--text-main)]">
                    Appearance
                  </div>
                  <div className="h-px bg-[var(--border-subtle)] my-1" />

                  <button
                    onClick={() => setShowStatusBar(!showStatusBar)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  >
                    <span>Status Bar</span>
                    {showStatusBar && <Check className="size-3.5 text-indigo-500" />}
                  </button>

                  <button
                    onClick={() => setShowActivityBar(!showActivityBar)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  >
                    <span>Activity Bar</span>
                    {showActivityBar && <Check className="size-3.5 text-indigo-500" />}
                  </button>

                  <button
                    onClick={() => setShowPanel(!showPanel)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  >
                    <span>Output Panel</span>
                    {showPanel && <Check className="size-3.5 text-indigo-500" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivityBar}
      onCheckedChange={setShowActivityBar}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* Radio Group Demo */}
      <section id="radio-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Radio Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Single-select choice groups using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuRadioGroup</code>.
        </p>

        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <div className="relative">
            <button
              onClick={() => setOpenRadio(!openRadio)}
              className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)] capitalize"
            >
              Theme: {theme}
            </button>

            <AnimatePresence>
              {openRadio && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5"
                >
                  <div className="px-2 py-1 font-semibold text-[11px] text-[var(--text-main)]">
                    Select Theme
                  </div>
                  <div className="h-px bg-[var(--border-subtle)] my-1" />

                  {["light", "dark", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t)
                        setOpenRadio(false)
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] capitalize text-[var(--text-main)]"
                    >
                      <span>{t}</span>
                      {theme === t && <div className="size-1.5 rounded-full bg-indigo-500" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Theme</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-48">
    <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* Nested Submenus */}
      <section id="submenus" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Nested Submenus</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Cascade secondary flyout submenus with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenuSub</code>.
        </p>

        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <div className="relative">
            <button
              onClick={() => setOpenSub(!openSub)}
              className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)]"
            >
              Collaborate
            </button>

            <AnimatePresence>
              {openSub && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5"
                >
                  <button
                    onClick={() => setOpenSub(false)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  >
                    <Users className="size-3.5 text-[var(--text-muted)]" />
                    <span>Team Members</span>
                  </button>

                  {/* Sub Trigger */}
                  <div
                    className="relative"
                    onMouseEnter={() => setSubOpen(true)}
                    onMouseLeave={() => setSubOpen(false)}
                  >
                    <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]">
                      <span className="flex items-center gap-2">
                        <UserPlus className="size-3.5 text-[var(--text-muted)]" />
                        <span>Invite Users</span>
                      </span>
                      <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                    </button>

                    {/* Sub Content */}
                    <AnimatePresence>
                      {subOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          className="absolute left-full top-0 ml-1 w-44 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs space-y-0.5"
                        >
                          <button
                            onClick={() => {
                              setSubOpen(false)
                              setOpenSub(false)
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                          >
                            <Mail className="size-3.5 text-[var(--text-muted)]" />
                            <span>Email Link</span>
                          </button>
                          <button
                            onClick={() => {
                              setSubOpen(false)
                              setOpenSub(false)
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                          >
                            <MessageSquare className="size-3.5 text-[var(--text-muted)]" />
                            <span>Slack Channel</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Collaborate</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuItem>
      <Users className="mr-2 size-4" />
      <span>Team Members</span>
    </DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <UserPlus className="mr-2 size-4" />
        <span>Invite Users</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>
          <Mail className="mr-2 size-4" />
          <span>Email Link</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 size-4" />
          <span>Slack Channel</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Icons, submenus, and keyboard shortcuts mirror dynamically in RTL.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-xs mx-auto space-y-1">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-subtle)] text-xs font-medium">
            <span>الملف الشخصي</span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘P</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)]">
            <span>الإعدادات</span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">⌘S</span>
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
                <td className="p-3 font-mono text-[var(--text-main)]">DropdownMenuContent.align</td>
                <td className="p-3 font-mono">"start" | "center" | "end"</td>
                <td className="p-3 font-mono">"start"</td>
                <td className="p-3">Horizontal alignment relative to trigger</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DropdownMenuItem.variant</td>
                <td className="p-3 font-mono">"default" | "destructive"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Changes text and highlight color to destructive red</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DropdownMenuCheckboxItem.checked</td>
                <td className="p-3 font-mono">boolean | "indeterminate"</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Controlled toggle state with checkmark icon</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DropdownMenuRadioGroup.value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Selected value among radio children</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
