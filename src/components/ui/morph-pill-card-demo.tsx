"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { MorphPillDeck, DEFAULT_CARDS_DATA } from "@/components/ui/morph-pill-card"
import { cn } from "@/lib/utils"

export function MorphPillCardDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] sm:min-h-[560px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-12 shadow-2xl select-none",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl text-center">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
            Interactive Morphing Surface
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Hover or Click any pill
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            An avatar pill that smoothly expands into a full profile or product card without abrupt layout shifts.
          </p>
        </div>

        <MorphPillDeck items={DEFAULT_CARDS_DATA} defaultActiveId="profile" />
      </div>
    </div>
  )
}

export function MorphPillCardBlockPreview() {
  const [activeMiniId, setActiveMiniId] = useState<string>("maya")

  const miniItems = [
    {
      id: "maya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      label: "Maya O.",
      title: "Maya Okafor",
      role: "Interaction Lead",
      tag: "Lisbon",
    },
    {
      id: "arc",
      avatar: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=120&q=80",
      label: "Arc Lamp",
      title: "Arc Table Lamp",
      role: "Brushed Brass",
      tag: "€240",
    },
  ]

  const activeItem = miniItems.find((i) => i.id === activeMiniId) || miniItems[0]

  return (
    <div className="relative size-full flex flex-col items-center justify-between overflow-hidden bg-[#0A0A0A] p-4 select-none">
      {/* Top Preview Card */}
      <div className="w-full flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[210px] rounded-xl border border-white/10 bg-[#12141c] p-2.5 shadow-xl space-y-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={activeItem.avatar}
                alt={activeItem.title}
                className="w-8 h-8 rounded-lg object-cover border border-white/10"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-white truncate">{activeItem.title}</p>
                <p className="text-[9px] text-zinc-400 truncate">{activeItem.role}</p>
              </div>
              <span className="text-[9px] font-semibold text-emerald-400 shrink-0 font-mono">
                {activeItem.tag}
              </span>
            </div>
            <div className="w-full py-1 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[8px] text-zinc-300 font-medium">
              <span>View details</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini Pill Dock */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-md">
        {miniItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActiveMiniId(item.id)
            }}
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] transition-all",
              activeMiniId === item.id
                ? "bg-neutral-800 text-white border border-white/20"
                : "text-zinc-400 hover:text-white"
            )}
          >
            <img src={item.avatar} alt={item.label} className="w-3.5 h-3.5 rounded-full object-cover" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
