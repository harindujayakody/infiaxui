"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X, Sparkles, Phone, Music, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MorphPillItem {
  id: string
  pill: {
    type?: "profile" | "product" | "event" | string
    avatar?: string
    image?: string
    label: string
    badge?: string
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
  className?: string
}

export const DEFAULT_CARDS_DATA: MorphPillItem[] = [
  {
    id: "profile",
    pill: {
      type: "profile",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      label: "Maya Okafor",
      badge: "Active",
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
      badge: "€240",
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
      badge: "Live",
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

export function MorphPillDeck({
  items = DEFAULT_CARDS_DATA,
  defaultActiveId = null,
  className,
}: MorphPillDeckProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId)
  const [selectedTabId, setSelectedTabId] = useState<string>(items[0]?.id || "profile")

  const activeItem = items.find((i) => i.id === (activeId || selectedTabId)) || items[0]
  const isOpen = Boolean(activeId)

  // Spring physics matching Apple Dynamic Island recipe
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: isOpen ? 30 : 35, // Softer damping on close to settle cleanly without wobble
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-start py-8 select-none", className)}>
      {/* Top Selector pills when collapsed to pick which card to inspect */}
      <div className="flex items-center gap-2 mb-8 bg-neutral-900/90 p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSelectedTabId(item.id)
              setActiveId(item.id)
            }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
              activeItem.id === item.id
                ? "bg-white text-black font-semibold shadow-md"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <img
              src={item.pill.avatar || item.pill.image}
              alt={item.pill.label}
              className="size-4 rounded-full object-cover"
            />
            <span>{item.pill.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Island Morphing Surface */}
      <div className="relative flex justify-center" style={{ transformOrigin: "top center" }}>
        <motion.div
          layout
          onClick={() => setActiveId(isOpen ? null : activeItem.id)}
          transition={springTransition}
          style={{
            width: isOpen ? 370 : 138,
            height: isOpen ? 190 : 38,
            borderRadius: isOpen ? 36 : 999,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: isOpen
              ? "0 20px 60px -10px rgba(0,0,0,0.85), 0 0 1px 1px rgba(255,255,255,0.15)"
              : "0 10px 25px -5px rgba(0,0,0,0.6)",
          }}
          className="relative transition-colors"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              /* Expanded Island Card Content */
              <motion.div
                key={`expanded-${activeItem.id}`}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.12, duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(8px)",
                  transition: { duration: 0.12 },
                }}
                style={{ width: 370, height: 190 }}
                className="p-4 text-white flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={activeItem.pill.avatar || activeItem.pill.image}
                      alt={activeItem.content.title}
                      className="size-10 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">
                          {activeItem.content.title}
                        </h4>
                        {activeItem.content.price && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            {activeItem.content.price}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {activeItem.content.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="size-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Collapse"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* Body bio */}
                {activeItem.content.bio && (
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed px-1">
                    {activeItem.content.bio}
                  </p>
                )}

                {/* Footer action button */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {activeItem.content.company || activeItem.content.time || "Northline Studio"}
                  </span>
                  {activeItem.content.actionText && (
                    <button
                      type="button"
                      onClick={() => activeItem.content.onAction?.()}
                      className="py-1.5 px-3 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow"
                    >
                      <span>{activeItem.content.actionText}</span>
                      <ArrowUpRight className="size-3 stroke-[2.5]" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Collapsed Pill Content */
              <motion.div
                key="collapsed-pill"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.08, duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(4px)",
                  transition: { duration: 0.1 },
                }}
                style={{ width: 138, height: 38 }}
                className="flex items-center justify-between px-2.5 size-full text-white"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src={activeItem.pill.avatar || activeItem.pill.image}
                    alt={activeItem.pill.label}
                    className="size-5 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <span className="text-xs font-medium text-white truncate max-w-[70px]">
                    {activeItem.pill.label}
                  </span>
                </div>
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="text-xs text-zinc-500 mt-6 font-mono">
        {isOpen ? "Click close button or outside to collapse" : "Click the pill to open the island"}
      </p>
    </div>
  )
}
