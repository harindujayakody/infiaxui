import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  MenubarDemo,
  MenubarCheckboxDemo,
  MenubarRadioDemo,
  MenubarSubmenuDemo,
  MenubarIconsDemo,
  MenubarRtlDemo,
} from "@/components/shadcn/menubar-demo"

export function MenubarGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <MenubarDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="menubar"
        dependencies="@base-ui/react framer-motion lucide-react"
        sourcePath="components/ui/menubar.tsx"
        sourceCode={`import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenubarContextValue {
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
  hasActiveMenu: boolean
  menubarRef: React.RefObject<HTMLDivElement | null>
}

const MenubarContext = React.createContext<MenubarContextValue | null>(null)

export function useMenubar() {
  const context = React.useContext(MenubarContext)
  if (!context) throw new Error("useMenubar must be used within a Menubar")
  return context
}

export const Menubar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string | null
    defaultValue?: string | null
    onValueChange?: (value: string | null) => void
  }
>(({ className, value: controlledValue, defaultValue = null, onValueChange, children, ...props }, ref) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue)
  const isControlled = controlledValue !== undefined
  const activeMenu = isControlled ? controlledValue : uncontrolledValue
  const menubarRef = React.useRef<HTMLDivElement | null>(null)

  const setActiveMenu = React.useCallback(
    (nextValue: string | null) => {
      if (!isControlled) setUncontrolledValue(nextValue)
      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange]
  )

  React.useEffect(() => {
    if (!activeMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeMenu, setActiveMenu])

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu, hasActiveMenu: Boolean(activeMenu), menubarRef }}>
      <div
        ref={(node) => {
          menubarRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "inline-flex h-9 items-center space-x-1 rounded-lg border border-border bg-card p-1 shadow-sm select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  )
})
Menubar.displayName = "Menubar"`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Menubar</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Menubar</div>
          <div className="pl-4">└── MenubarMenu</div>
          <div className="pl-8">├── MenubarTrigger</div>
          <div className="pl-8">└── MenubarContent</div>
          <div className="pl-12">├── MenubarItem</div>
          <div className="pl-12">├── MenubarCheckboxItem</div>
          <div className="pl-12">├── MenubarRadioGroup</div>
          <div className="pl-16">└── MenubarRadioItem</div>
          <div className="pl-12">├── MenubarSub</div>
          <div className="pl-16">├── MenubarSubTrigger</div>
          <div className="pl-16">└── MenubarSubContent</div>
          <div className="pl-12">├── MenubarSeparator</div>
          <div className="pl-12">└── MenubarShortcut</div>
        </div>
      </section>

      {/* Examples: Checkbox */}
      <section id="checkbox" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Checkbox Items</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarCheckboxItem</code> to provide toggleable settings with checkmark indicators.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <MenubarCheckboxDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarCheckboxItem,
} from "@/components/ui/menubar"

export function MenubarCheckboxDemo() {
  const [showStatus, setShowStatus] = React.useState(true)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Appearance</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
            Status Bar
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
        />
      </section>

      {/* Examples: Radio Group */}
      <section id="radio" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Radio Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarRadioGroup</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarRadioItem</code> for mutually exclusive selection options.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <MenubarRadioDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
} from "@/components/ui/menubar"

export function MenubarRadioDemo() {
  const [theme, setTheme] = React.useState("dark")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Color Theme: {theme}</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Select Theme</MenubarLabel>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Light High Contrast</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark Modern</MenubarRadioItem>
            <MenubarRadioItem value="system">System Default</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
        />
      </section>

      {/* Examples: Submenu */}
      <section id="submenu" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Submenus</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Nest menus with smooth hover flyouts using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarSub</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarSubTrigger</code>, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MenubarSubContent</code>.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <MenubarSubmenuDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Export Project</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Quick Export as PNG</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Export As...</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>PDF Document (.pdf)</MenubarItem>
          <MenubarItem>Vector Graphics (.svg)</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />
      </section>

      {/* Examples: With Icons */}
      <section id="icons" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Icons</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add icons alongside items for clear visual hierarchy and quick scanning.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <MenubarIconsDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { FileText, FolderOpen, Save, Trash2 } from "lucide-react"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/components/ui/menubar"

export function MenubarIconsDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="gap-2">
            <FileText className="size-3.5 text-muted-foreground" />
            <span>New File</span>
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem className="gap-2">
            <FolderOpen className="size-3.5 text-muted-foreground" />
            <span>Open Folder</span>
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
        />
      </section>

      {/* Examples: RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Menubar supports right-to-left layout direction seamlessly.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <MenubarRtlDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`<div dir="rtl">
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger className="font-arabic">ملف</MenubarTrigger>
      <MenubarContent align="start">
        <MenubarItem className="justify-between">
          <span>علامة تبويب جديدة</span>
          <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</div>`}
        />
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
                <td className="p-3 text-[var(--text-main)] font-semibold">Menubar</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">The root container holding top-level menus.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">MenubarTrigger</td>
                <td className="p-3">HTMLButtonElement</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Button activating a specific menu dropdown on click/hover.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">MenubarContent.align</td>
                <td className="p-3">"start" | "center" | "end"</td>
                <td className="p-3">"start"</td>
                <td className="p-3 font-sans">Alignment relative to trigger button.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">MenubarCheckboxItem.checked</td>
                <td className="p-3">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3 font-sans">Checked state for toggle items.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">MenubarRadioGroup.value</td>
                <td className="p-3">string</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Selected radio value.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
