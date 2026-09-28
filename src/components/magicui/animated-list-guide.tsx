"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedListDemo } from "./animated-list-demo"

export function AnimatedListGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add animated-list`

  const componentSourceCode = `"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null

      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"`

  const demoSnippet = `import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const notifications: Item[] = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]

export function AnimatedListDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
      <AnimatedList delay={1500}>
        {notifications.map((item, idx) => (
          <figure
            key={idx}
            className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 bg-[#161616]/90 border border-white/10 shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-row items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-lg leading-none">{item.icon}</span>
              </div>
              <div className="flex flex-col overflow-hidden text-left">
                <figcaption className="flex flex-row items-center whitespace-pre text-sm sm:text-base font-semibold text-white">
                  <span>{item.name}</span>
                  <span className="mx-1 text-zinc-500 font-normal">·</span>
                  <span className="text-xs text-zinc-500 font-normal font-mono">{item.time}</span>
                </figcaption>
                <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          </figure>
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Animated List
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.
        </p>
      </div>

      {/* Main Interactive Demo matching user reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white tracking-tight">Preview</h2>
          <span className="text-xs text-zinc-500 font-mono">Sequential spring entrance</span>
        </div>
        <AnimatedListDemo />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="size-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Spring Layout Physics</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Items push existing elements downwards organically using Framer Motion layout transitions.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className="size-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Configurable Interval</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Easily customize the stagger delay between sequential notifications to match your page pacing.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="size-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Universal Children</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Accepts any React children: notification cards, timeline feeds, activity streams, or message popups.
            </p>
          </div>
        </div>
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-white/10 p-0.5">
            <TabsTrigger
              value="cli"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-3">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-500" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="text-zinc-400 hover:text-white transition-colors ml-2"
                title="Copy command"
              >
                {copiedKey === "cli" ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                1. Install Framer Motion dependencies:
              </p>
              <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-300">
                <span>npm install framer-motion</span>
                <button
                  onClick={() =>
                    copyToClipboard("npm install framer-motion", "dep")
                  }
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedKey === "dep" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                2. Copy and paste the component code into{" "}
                <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">
                  @/components/ui/animated-list.tsx
                </code>
                :
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "source")}
                  className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedKey === "source" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <button
            onClick={() => copyToClipboard(demoSnippet, "usage")}
            className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre>{`import { AnimatedList } from "@/components/ui/animated-list"

export default function NotificationsFeed() {
  return (
    <AnimatedList delay={1500}>
      {notifications.map((item, idx) => (
        <NotificationCard key={idx} {...item} />
      ))}
    </AnimatedList>
  )
}`}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Props</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#161616]">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/5 font-mono text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">children</td>
                <td className="px-4 py-3 text-zinc-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">-</td>
                <td className="px-4 py-3 font-sans text-zinc-300">The items to display and animate sequentially</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">delay</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">1000</td>
                <td className="px-4 py-3 font-sans text-zinc-300">The delay interval between each new item in milliseconds</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">className</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">-</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Optional CSS class names for custom layout styling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-4 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Component by</span>
          <a
            href="https://twitter.com/dillionverma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-medium"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>
          <span>for Magic UI.</span>
        </div>
      </div>
    </div>
  )
}

