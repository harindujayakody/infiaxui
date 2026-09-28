"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X, Music2 } from "lucide-react"
import { MorphPillDeck } from "@/components/ui/morph-pill-card"
import { cn } from "@/lib/utils"

export function MorphPillCardDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[520px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-12 shadow-2xl select-none",
        className
      )}
    >
      {/* Dynamic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-2xl text-center">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
            Apple Dynamic Island
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Single Morphing Black Pill Surface
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Switch between Music, Phone Call, Profile, and Delivery modes. Tap the island to expand or collapse with authentic spring physics.
          </p>
        </div>

        <MorphPillDeck initialMode="music" defaultOpen={true} />
      </div>
    </div>
  )
}

export function MorphPillCardBlockPreview() {
  const [open, setOpen] = useState(false)

  const spring = {
    type: "spring" as const,
    stiffness: 440,
    damping: open ? 30 : 35,
  }

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="relative flex justify-center" style={{ transformOrigin: "top center" }}>
        <motion.div
          layout
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          transition={spring}
          style={{
            width: open ? 220 : 130,
            height: open ? 120 : 36,
            borderRadius: open ? 26 : 999,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            boxShadow: open
              ? "0 10px 40px rgba(0,0,0,0.9), 0 0 1px 1px rgba(255,255,255,0.15)"
              : "0 6px 16px rgba(0,0,0,0.6)",
          }}
          className="relative transition-colors"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="mini-open"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.1, duration: 0.18 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(6px)",
                  transition: { duration: 0.1 },
                }}
                style={{ width: 220, height: 120 }}
                className="p-3 text-white flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                      alt="Starboy"
                      className="size-7 rounded-lg object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">Starboy</p>
                      <p className="text-[9px] text-zinc-400 truncate">The Weeknd</p>
                    </div>
                  </div>
                  <X className="size-3 text-zinc-400" />
                </div>

                {/* Mini audio equalizer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-end gap-0.5 h-3">
                    {[0.9, 0.4, 1, 0.6, 0.8].map((val, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["20%", "100%", "40%", "85%"] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.15,
                        }}
                        className="w-0.5 rounded-full bg-red-500"
                        style={{ height: `${val * 100}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400">1:42 / 3:50</span>
                </div>

                <div className="w-full py-1 rounded-md bg-white text-black font-semibold text-[8px] flex items-center justify-center gap-1 shadow-sm">
                  <span>Open Player</span>
                  <ArrowUpRight className="size-2.5" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mini-closed"
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
                style={{ width: 130, height: 36 }}
                className="flex items-center justify-between px-2.5 size-full text-white"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                    alt="Starboy"
                    className="size-4 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <span className="text-[10px] font-medium text-white truncate">Starboy</span>
                </div>
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-red-500 rounded-full" />
                  <span className="w-0.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-red-500 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
