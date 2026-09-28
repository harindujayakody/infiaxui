"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ArrowUpRight, Sparkles, X } from "lucide-react"
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
            Apple Dynamic Island Morph
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Click to expand the Island
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            One single continuous surface that physically stretches and transforms between compact pill and full card layout with spring physics.
          </p>
        </div>

        <MorphPillDeck items={DEFAULT_CARDS_DATA} defaultActiveId="profile" />
      </div>
    </div>
  )
}

export function MorphPillCardBlockPreview() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  const spring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 30,
    mass: 0.8,
  }

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <LayoutGroup id="morph-pill-block-preview">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="mini-expanded"
              layoutId="mini-island-surface"
              transition={spring}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
              className="w-full max-w-[210px] rounded-2xl border border-white/15 bg-black p-3 shadow-xl space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase">ISLAND</span>
                </div>
                <div className="flex items-center gap-1 text-[8px] text-zinc-400">
                  <X className="size-3 text-zinc-400 hover:text-white" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.img
                  layoutId="mini-avatar"
                  transition={spring}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Maya Okafor"
                  className="w-8 h-8 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-white truncate">Maya Okafor</p>
                  <p className="text-[9px] text-zinc-400 truncate">Interaction Lead</p>
                </div>
              </div>

              <div className="w-full py-1 rounded-lg bg-white text-black font-semibold text-[8px] flex items-center justify-center gap-1 shadow-sm">
                <span>Say hello</span>
                <ArrowUpRight className="size-2.5" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mini-collapsed"
              layoutId="mini-island-surface"
              transition={spring}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(true)
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-white/20 shadow-lg cursor-pointer hover:border-white/40"
            >
              <motion.img
                layoutId="mini-avatar"
                transition={spring}
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Maya Okafor"
                className="w-4 h-4 rounded-full object-cover border border-white/20 shrink-0"
              />
              <span className="text-[10px] font-medium text-white tracking-tight">Maya Okafor</span>
              <span className="size-1.5 rounded-full bg-emerald-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}
