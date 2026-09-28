"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ArrowUpRight, X, Sparkles, User, ShoppingBag, Radio, ChevronRight } from "lucide-react"
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
  className?: string
}

export const DEFAULT_CARDS_DATA: MorphPillItem[] = [
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

const springConfig = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.8,
}

export function MorphPillDeck({
  items = DEFAULT_CARDS_DATA,
  defaultActiveId = null,
  className,
}: MorphPillDeckProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveId(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const activeItem = items.find((i) => i.id === activeId)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[380px] w-full p-4 sm:p-8 select-none",
        className
      )}
    >
      <LayoutGroup id="morph-pill-island-deck">
        <div className="relative flex flex-col items-center justify-center w-full max-w-md">
          {/* Main Apple Dynamic Island Continuous Morph Surface */}
          <AnimatePresence mode="wait">
            {activeItem ? (
              /* Expanded Island State (Single Surface Physical Morph) */
              <motion.div
                key={`expanded-${activeItem.id}`}
                layoutId="island-surface"
                transition={springConfig}
                className="relative w-full max-w-[360px] sm:max-w-[390px] bg-black text-white rounded-[28px] border border-white/15 p-5 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9),0_0_30px_0px_rgba(255,255,255,0.06)] overflow-hidden z-30"
              >
                {/* Specular Ambient Glow */}
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />

                {/* Top Island Header with mini status bar & close button */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                      {activeItem.pill.type || "DYNAMIC ISLAND"}
                    </span>
                  </div>

                  {/* Switch switcher pills right inside the expanded header */}
                  <div className="flex items-center gap-1.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        className={cn(
                          "size-6 rounded-full overflow-hidden border transition-all cursor-pointer",
                          activeId === item.id
                            ? "border-white scale-110 shadow-sm"
                            : "border-white/20 opacity-50 hover:opacity-100"
                        )}
                        title={item.pill.label}
                      >
                        <img
                          src={item.pill.avatar || item.pill.image}
                          alt={item.pill.label}
                          className="size-full object-cover"
                        />
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setActiveId(null)}
                      className="size-6 ml-1.5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title="Collapse Island"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Main Content Body */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, delay: 0.05 }}
                  className="pt-4 space-y-4"
                >
                  <div className="flex items-start gap-3.5">
                    <motion.img
                      layoutId={`island-avatar-${activeItem.id}`}
                      transition={springConfig}
                      src={activeItem.pill.avatar || activeItem.pill.image}
                      alt={activeItem.content.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/15 shrink-0 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white truncate tracking-tight">
                          {activeItem.content.title}
                        </h3>
                        {activeItem.content.price && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-mono shrink-0">
                            {activeItem.content.price}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {activeItem.content.subtitle}
                      </p>
                      {activeItem.content.company && (
                        <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                          {activeItem.content.company}
                        </p>
                      )}
                      {activeItem.content.time && (
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono mt-1 border border-blue-500/20">
                          {activeItem.content.time}
                        </span>
                      )}
                    </div>
                  </div>

                  {activeItem.content.bio && (
                    <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.03] p-3 rounded-xl border border-white/5">
                      {activeItem.content.bio}
                    </p>
                  )}

                  {/* Primary CTA Button */}
                  {activeItem.content.actionText && (
                    <button
                      type="button"
                      onClick={() => activeItem.content.onAction?.()}
                      className="w-full py-2.5 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg cursor-pointer"
                    >
                      <span>{activeItem.content.actionText}</span>
                      <ArrowUpRight className="size-3.5 stroke-[2.5]" />
                    </button>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              /* Collapsed Island Pill Dock (Single Continuous Surface) */
              <motion.div
                key="collapsed-dock"
                layoutId="island-surface"
                transition={springConfig}
                className="relative flex items-center gap-2 bg-black text-white px-2.5 py-2 rounded-full border border-white/15 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.8),0_0_20px_0px_rgba(255,255,255,0.05)] backdrop-blur-xl"
              >
                {items.map((item) => {
                  const imageSrc = item.pill.avatar || item.pill.image

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={springConfig}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-zinc-200 hover:text-white transition-colors cursor-pointer text-xs font-medium"
                    >
                      {imageSrc && (
                        <motion.img
                          layoutId={`island-avatar-${item.id}`}
                          transition={springConfig}
                          src={imageSrc}
                          alt={item.pill.label}
                          className="size-5 rounded-full object-cover border border-white/20 shrink-0"
                        />
                      )}
                      <span className="whitespace-nowrap tracking-tight">{item.pill.label}</span>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  )
}
