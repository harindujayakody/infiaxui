import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./navigation-menu"
import { Sparkles, Layers, BookOpen, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const componentsList: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "/components/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/components/progress",
    description: "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Scroll-area",
    href: "/components/scroll-area",
    description: "Visually or semantically separates content with custom scrollbars.",
  },
  {
    title: "Tabs",
    href: "/components/tabs",
    description: "A set of layered sections of content that display one panel at a time.",
  },
  {
    title: "Tooltip",
    href: "/components/tooltip",
    description: "A popup that displays information related to an element when focused or hovered.",
  },
]

export function NavigationMenuDemo({ direction = "ltr" }: { direction?: "ltr" | "rtl" }) {
  return (
    <NavigationMenu direction={direction}>
      <NavigationMenuList>
        {/* Item 1: Getting Started */}
        <NavigationMenuItem value="getting-started">
          <NavigationMenuTrigger value="getting-started">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent value="getting-started" className="md:w-[450px] lg:w-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-1">
              <div className="md:col-span-2 flex flex-col justify-end p-4 rounded-xl bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-indigo-500/20 border border-[var(--border-subtle)] space-y-2 select-none">
                <div className="size-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center shadow-sm">
                  <Sparkles className="size-4 text-indigo-500" />
                </div>
                <div className="font-semibold text-xs text-[var(--text-main)]">shadcn/ui</div>
                <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                  Beautifully designed components built with Tailwind CSS and Base UI.
                </p>
              </div>

              <div className="md:col-span-3 space-y-1">
                <NavigationMenuLink href="/docs/introduction">
                  <div className="font-medium text-xs text-[var(--text-main)] mb-0.5">Introduction</div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </p>
                </NavigationMenuLink>

                <NavigationMenuLink href="/docs/installation">
                  <div className="font-medium text-xs text-[var(--text-main)] mb-0.5">Installation</div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                    How to install dependencies and structure your app.
                  </p>
                </NavigationMenuLink>

                <NavigationMenuLink href="/docs/theming">
                  <div className="font-medium text-xs text-[var(--text-main)] mb-0.5">Typography</div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                    Styles for headings, paragraphs, lists, and code blocks.
                  </p>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Item 2: Components */}
        <NavigationMenuItem value="components">
          <NavigationMenuTrigger value="components">
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent value="components" className="w-[450px] md:w-[540px]">
            <div className="grid grid-cols-2 gap-2 p-1">
              {componentsList.map((component) => (
                <NavigationMenuLink key={component.title} href={component.href}>
                  <div className="font-medium text-xs text-[var(--text-main)] mb-0.5">
                    {component.title}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-snug">
                    {component.description}
                  </p>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Item 3: Direct Link */}
        <NavigationMenuItem>
          <a
            href="/docs"
            className={cn(navigationMenuTriggerStyle(), "no-underline")}
          >
            Documentation
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function NavigationMenuRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center">
      <NavigationMenuDemo direction="rtl" />
    </div>
  )
}
