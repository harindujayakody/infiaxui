"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MorphPillCardDemo } from "./morph-pill-card-demo"

export function MorphPillCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/morph-pill-card-demo`

  const componentSourceCode = `"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MorphPillItem {
  id: string
  pill: {
    type?: "profile" | "product" | "event" | string
    avatar?: string
    image?: string
    label: string
  }
  content: {
    title: string
    subtitle?: string
    company?: string
    email?: string
    location?: string
    price?: string
    time?: string
    bio?: string
    actionText?: string
    onAction?: () => void
  }
}

export interface MorphPillDeckProps {
  items?: MorphPillItem[]
  defaultActiveId?: string | null
  trigger?: "click" | "hover" | "both"
  className?: string
  deckClassName?: string
}

export function MorphPillDeck({
  items = [],
  defaultActiveId = null,
  trigger = "both",
  className,
  deckClassName,
}: MorphPillDeckProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId)

  const handleMouseEnter = (id: string) => {
    if (trigger === "hover" || trigger === "both") {
      setActiveId(id)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setActiveId(null)
    }
  }

  const handleClick = (id: string) => {
    if (trigger === "click" || trigger === "both") {
      setActiveId((current) => (current === id ? null : id))
    }
  }

  return (
    <div className={cn("relative flex items-center justify-center p-4 sm:p-8 select-none", className)}>
      <div
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 bg-neutral-900/90 p-2.5 sm:p-3 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl",
          deckClassName
        )}
      >
        {items.map((item) => {
          const isActive = activeId === item.id
          const imageSrc = item.pill.avatar || item.pill.image

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
            >
              {/* Collapsed Pill Button */}
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={cn(
                  "flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium",
                  isActive
                    ? "bg-neutral-800 border-white/30 text-white shadow-lg shadow-white/5"
                    : "bg-neutral-900/90 border-white/10 text-neutral-300 hover:bg-neutral-800/70 hover:border-white/20 hover:text-white"
                )}
              >
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={item.pill.label}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white/10 shrink-0"
                  />
                )}
                <span className="whitespace-nowrap">{item.pill.label}</span>
              </button>

              {/* Expanded Card Overlay */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-neutral-900/95 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl z-50 backdrop-blur-2xl overflow-hidden"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        {imageSrc && (
                          <img
                            src={imageSrc}
                            alt={item.content.title}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-white/10 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-white truncate">
                            {item.content.title}
                          </h4>
                          <p className="text-xs text-neutral-400 truncate">
                            {item.content.subtitle}
                          </p>
                          {item.content.price && (
                            <span className="inline-block text-xs font-semibold text-emerald-400 mt-0.5">
                              {item.content.price}
                            </span>
                          )}
                          {item.content.time && (
                            <span className="inline-block text-xs font-medium text-blue-400 mt-0.5">
                              {item.content.time}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.content.bio && (
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {item.content.bio}
                        </p>
                      )}

                      {item.content.actionText && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            item.content.onAction?.()
                          }}
                          className="mt-1 w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-white/10 hover:border-white/20 text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                        >
                          <span>{item.content.actionText}</span>
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}`

  const usageCode = `import { MorphPillDeck, MorphPillItem } from "@/components/ui/morph-pill-card"

const CARDS_DATA: MorphPillItem[] = [
  {
    id: "profile",
    pill: {
      type: "profile",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      label: "Maya Okafor",
    },
    content: {
      title: "Maya Okafor",
      subtitle: "Lead Interaction Designer",
      company: "Northline • Lisbon",
      email: "maya@northline.studio",
      location: "Remote, UTC+0",
      bio: "Shapes how the product feels in motion — from first-run flows to the small transitions that make an interface feel considered.",
      actionText: "Say hello",
    },
  },
  {
    id: "product",
    pill: {
      type: "product",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80",
      label: "Arc Table Lamp",
    },
    content: {
      title: "Arc Table Lamp",
      subtitle: "Hand-spun brass, dimmable",
      price: "€240",
      bio: "A single sweep of brushed brass with a warm, glare-free shade. Made to order in small batches.",
      actionText: "See the lamp",
    },
  },
  {
    id: "event",
    pill: {
      type: "event",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80",
      label: "Low Tide Sessions",
    },
    content: {
      title: "Low Tide Sessions",
      subtitle: "Live set • Episode 12",
      time: "Fri 21 Nov • 20:00",
      bio: "Ambient electronic textures and relaxed downtempo grooves recorded live from the coastal studio.",
      actionText: "Listen live",
    },
  },
]

export function MorphPillDeckDemo() {
  return (
    <div className="flex items-center justify-center min-h-[480px] bg-[#0A0A0A] rounded-2xl border border-white/10">
      <MorphPillDeck items={CARDS_DATA} defaultActiveId="profile" />
    </div>
  )
}`

  return (
    <div className="space-y-10 pb-16">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Morph Pill Card</h1>
        <p className="text-base text-zinc-400">
          An avatar pill that grows into a full profile or product card on hover. It is one surface moving between two measured layouts, so the pill visibly becomes the card instead of a card appearing behind it.
        </p>
      </div>

      {/* Live Interactive Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <MorphPillCardDemo />
      </div>

      {/* Installation Section */}
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
                type="button"
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/morph-pill-card.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  type="button"
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
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
            type="button"
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
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
                <td className="px-4 py-3 text-cyan-400 font-bold">items</td>
                <td className="px-4 py-3 text-purple-400">MorphPillItem[]</td>
                <td className="px-4 py-3 text-zinc-500">DEFAULT_CARDS_DATA</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Array of pill deck item objects with pill metadata and card contents.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">defaultActiveId</td>
                <td className="px-4 py-3 text-purple-400">string | null</td>
                <td className="px-4 py-3 text-zinc-500">null</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">ID of the card to initially display expanded.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">trigger</td>
                <td className="px-4 py-3 text-purple-400">"click" | "hover" | "both"</td>
                <td className="px-4 py-3 text-zinc-500">"both"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Trigger mechanism for expanding and collapsing pill cards.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">className</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Outer container styling.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">deckClassName</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Floating pill deck pill bar container styling.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
