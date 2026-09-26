import React, { useState, useRef, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronDown, Sparkles, BookOpen, Layers } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function NavigationMenuGuide() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">NavigationMenu</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "NavigationMenu",
            "└── NavigationMenuList",
            "    ├── NavigationMenuItem",
            "    │   ├── NavigationMenuTrigger",
            "    │   └── NavigationMenuContent",
            "    │       ├── NavigationMenuLink",
            "    │       └── NavigationMenuLink",
            "    └── NavigationMenuItem",
            "        └── NavigationMenuLink",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Hover or click the navigation items to reveal rich dropdown panels.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[300px]">
          <div ref={navRef} className="relative">
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/60 p-1">
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "getting-started" ? null : "getting-started")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  activeMenu === "getting-started"
                    ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                Getting started
                <ChevronDown className={cn("size-3 transition-transform duration-200", activeMenu === "getting-started" && "rotate-180")} />
              </button>

              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "components" ? null : "components")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  activeMenu === "components"
                    ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                Components
                <ChevronDown className={cn("size-3 transition-transform duration-200", activeMenu === "components" && "rotate-180")} />
              </button>

              <a
                href="#docs"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                Documentation
              </a>
            </div>

            {/* Dropdown popup */}
            <AnimatePresence>
              {activeMenu === "getting-started" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full mt-2 w-96 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl p-4 z-50 grid grid-cols-2 gap-3"
                >
                  <div className="flex flex-col justify-end p-4 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-[var(--border-subtle)] space-y-1">
                    <Sparkles className="size-5 text-[var(--text-main)] mb-2" />
                    <h4 className="text-xs font-semibold text-[var(--text-main)]">shadcn/ui</h4>
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                      Beautifully designed components copy and paste into your apps.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <a href="#intro" className="block p-2 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors">
                      <div className="text-xs font-semibold text-[var(--text-main)]">Introduction</div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Re-usable components built using Base UI.</div>
                    </a>
                    <a href="#install" className="block p-2 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors">
                      <div className="text-xs font-semibold text-[var(--text-main)]">Installation</div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">How to install dependencies and structure your app.</div>
                    </a>
                  </div>
                </motion.div>
              )}

              {activeMenu === "components" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl p-3 z-50 space-y-1"
                >
                  {[
                    { title: "Alert Dialog", desc: "A modal dialog that interrupts the user." },
                    { title: "Hover Card", desc: "For sighted users to preview content." },
                    { title: "Progress", desc: "Displays task completion progress." },
                    { title: "Scroll-area", desc: "Custom cross-browser scrollbar styling." },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={`#${item.title.toLowerCase()}`}
                      className="block p-2 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <div className="text-xs font-semibold text-[var(--text-main)]">{item.title}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">{item.desc}</div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Beautifully designed components built with Tailwind CSS.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        />
      </section>

      {/* Link Component */}
      <section id="link-component" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Link Component</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">render</code> prop to compose custom framework links like Next.js <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Link</code>.
        </p>
        <CodeBlock
          language="tsx"
          code={`import Link from "next/link"
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink render={<Link href="/docs" />} className={navigationMenuTriggerStyle()}>
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Navigation menu dropdowns align in RTL reading direction.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/60 p-1 text-xs">
            <span className="px-3 py-1.5 font-medium text-[var(--text-main)]">البداية</span>
            <span className="px-3 py-1.5 text-[var(--text-muted)]">المكونات</span>
            <span className="px-3 py-1.5 text-[var(--text-muted)]">التوثيق</span>
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
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenu</td>
                <td className="p-3">Root wrapper for the navigation structure</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenuList</td>
                <td className="p-3">Container for top-level navigation items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenuItem</td>
                <td className="p-3">Wraps an individual trigger or direct link</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenuTrigger</td>
                <td className="p-3">Button toggling the dropdown content panel</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenuContent</td>
                <td className="p-3">Flyout panel displaying sub-navigation items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NavigationMenuLink</td>
                <td className="p-3">Accessible navigational anchor link</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
