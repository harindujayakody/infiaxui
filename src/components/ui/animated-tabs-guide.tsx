"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedTabsDemo } from "./animated-tabs-demo"

export function AnimatedTabsGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/tabs-demo`

  const componentSourceCode = `"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode
}

export interface AnimatedTabsProps {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}

export function AnimatedTabs({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  const [hovering, setHovering] = useState(false)

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full p-1.5 rounded-full bg-[#18181b]/80 border border-white/10 backdrop-blur-md",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer outline-none",
              active.value === tab.value ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200",
              tabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="active-tab-indicator"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block z-10">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8 w-full", contentClassName)}
      />
    </div>
  )
}

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string
  tabs: Tab[]
  active: Tab
  hovering?: boolean
}) => {
  const isSelected = (tab: Tab) => tab.value === tabs[0].value

  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: hovering ? idx * -25 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.15 : 0,
          }}
          animate={{
            y: isSelected(tab) ? [0, 10, 0] : 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  )
}`

  const usageCode = `import { AnimatedTabs } from "@/components/ui/animated-tabs"

const tabs = [
  {
    title: "Product",
    value: "product",
    content: (
      <div className="w-full h-full rounded-2xl p-10 text-white bg-gradient-to-br from-purple-900 to-indigo-950">
        <p className="text-2xl font-bold">Product Tab</p>
      </div>
    ),
  },
  {
    title: "Services",
    value: "services",
    content: (
      <div className="w-full h-full rounded-2xl p-10 text-white bg-gradient-to-br from-blue-900 to-cyan-950">
        <p className="text-2xl font-bold">Services Tab</p>
      </div>
    ),
  },
]

export default function Example() {
  return <AnimatedTabs tabs={tabs} />
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Animated Tabs</h1>
        <p className="text-base text-zinc-400">
          Tabs to switch content smoothly with spring physics, background pill animation, and layered stacked card transitions.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <AnimatedTabsDemo />
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#18181b] border border-white/10">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-mono text-sm text-zinc-200">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-400" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/animated-tabs.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                >
                  {copiedKey === "manual-comp" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto">
          <button
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Props Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121214]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">tabs</td>
                <td className="px-4 py-3 text-purple-400">Tab[]</td>
                <td className="px-4 py-3 text-zinc-500">required</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Array of tab items with title, value, and content.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">containerClassName</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Class name for the tabs pill navigation header.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">contentClassName</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Class name for the tab content container.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
