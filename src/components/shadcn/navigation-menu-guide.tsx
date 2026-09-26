import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  ArrowRight,
  Globe,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { NavigationMenuDemo, NavigationMenuRtlDemo } from "./navigation-menu-demo"
import { cn } from "@/lib/utils"

export function NavigationMenuGuide() {
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")

  const manualComponentCode = `import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-lg bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] focus:bg-[var(--bg-subtle)] focus:text-[var(--text-main)] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
)

interface NavigationMenuContextType {
  activeValue: string | null
  setActiveValue: (value: string | null) => void
  direction?: "ltr" | "rtl"
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType>({
  activeValue: null,
  setActiveValue: () => {},
  direction: "ltr",
})

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  direction?: "ltr" | "rtl"
}

export function NavigationMenu({
  className,
  children,
  direction = "ltr",
  ...props
}: NavigationMenuProps) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null)
  const menuRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveValue(null)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <NavigationMenuContext.Provider value={{ activeValue, setActiveValue, direction }}>
      <nav
        ref={menuRef}
        dir={direction}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
}

export function NavigationMenuList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value?: string
}

export function NavigationMenuItem({
  className,
  value,
  children,
  ...props
}: NavigationMenuItemProps) {
  return (
    <li className={cn("relative", className)} {...props}>
      {children}
    </li>
  )
}

interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function NavigationMenuTrigger({
  className,
  children,
  value,
  ...props
}: NavigationMenuTriggerProps) {
  const { activeValue, setActiveValue } = React.useContext(NavigationMenuContext)
  const isOpen = activeValue === value

  return (
    <button
      type="button"
      onClick={() => setActiveValue(isOpen ? null : value)}
      onMouseEnter={() => setActiveValue(value)}
      className={cn(
        navigationMenuTriggerStyle(),
        isOpen && "bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm",
        "gap-1",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "size-3 text-[var(--text-muted)] transition-transform duration-200",
          isOpen && "rotate-180 text-[var(--text-main)]"
        )}
        aria-hidden="true"
      />
    </button>
  )
}

interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function NavigationMenuContent({
  className,
  children,
  value,
  ...props
}: NavigationMenuContentProps) {
  const { activeValue, direction } = React.useContext(NavigationMenuContext)
  const isOpen = activeValue === value

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-full mt-2 w-auto min-w-[320px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-xl z-50",
            direction === "rtl" ? "right-0" : "left-0",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  render?: React.ReactNode
}

export function NavigationMenuLink({
  className,
  render,
  children,
  ...props
}: NavigationMenuLinkProps) {
  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<{ className?: string; children?: React.ReactNode }>, {
      className: cn(navigationMenuTriggerStyle(), className),
      children,
    })
  }

  return (
    <a
      className={cn(
        "block select-none rounded-lg p-3 text-xs leading-none no-underline outline-none transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] focus:bg-[var(--bg-subtle)] focus:text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Interactive Preview Section */}
      <section id="interactive-demo" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Preview</h2>
        <div className="p-8 sm:p-16 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[384px] shadow-sm">
          <NavigationMenuDemo />
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-1 border-b border-[var(--border-subtle)] pb-2">
            <button
              onClick={() => setInstallTab("cli")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                installTab === "cli"
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              Command
            </button>
            <button
              onClick={() => setInstallTab("manual")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                installTab === "manual"
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              Manual
            </button>
          </div>

          {installTab === "cli" ? (
            <CodeBlock
              code="npx shadcn@latest add navigation-menu"
              language="bash"
              fileName="Terminal"
            />
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  1. Install the following dependencies:
                </span>
                <CodeBlock
                  code="npm install @base-ui/react framer-motion class-variance-authority"
                  language="bash"
                  fileName="Terminal"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  2. Copy and paste the following code into your project:
                </span>
                <CodeBlock
                  code={manualComponentCode}
                  language="tsx"
                  fileName="components/ui/navigation-menu.tsx"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>

        <CodeBlock
          code={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"`}
          language="tsx"
          fileName="Import"
        />

        <CodeBlock
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
          language="tsx"
          fileName="Usage Example"
        />
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">NavigationMenu</code>:
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-1">
          <div>NavigationMenu</div>
          <div className="pl-4">├── NavigationMenuList</div>
          <div className="pl-8">├── NavigationMenuItem</div>
          <div className="pl-12">├── NavigationMenuTrigger</div>
          <div className="pl-12">└── NavigationMenuContent</div>
          <div className="pl-16">├── NavigationMenuLink</div>
          <div className="pl-16">└── NavigationMenuLink</div>
          <div className="pl-8">└── NavigationMenuItem</div>
          <div className="pl-12">└── NavigationMenuLink</div>
          <div className="pl-4">└── NavigationMenuIndicator</div>
        </div>
      </section>

      {/* Link Component */}
      <section id="link-component" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Link Component</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">render</code> prop to compose a custom link component such as Next.js <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Link</code>:
        </p>

        <CodeBlock
          code={`import Link from "next/link"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link href="/docs" />}
        className={navigationMenuTriggerStyle()}
      >
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}`}
          language="tsx"
          fileName="components/nav-link.tsx"
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-indigo-500" />
          <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        </div>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, the dropdown positioning and layout automatically adapt when wrapped in a right-to-left context.
        </p>

        <div className="p-8 sm:p-16 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[384px] shadow-sm">
          <NavigationMenuRtlDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="type-body text-[var(--text-muted)]">
          See the official Base UI / Radix documentation for comprehensive prop references:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://base-ui.com/react/components/navigation-menu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors"
          >
            <span>Base UI Navigation Menu Docs</span>
            <ExternalLink className="size-3 text-[var(--text-muted)]" />
          </a>
          <a
            href="https://base-ui.com/react/components/navigation-menu#api-reference"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors"
          >
            <span>API Reference</span>
            <ExternalLink className="size-3 text-[var(--text-muted)]" />
          </a>
        </div>
      </section>
    </div>
  )
}
