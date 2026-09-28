"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X, Play, Pause, Timer, Music2 } from "lucide-react"
import { MorphPillDeck } from "@/components/ui/morph-pill-card"
import { cn } from "@/lib/utils"

export function MorphPillCardDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      {/* Subtle Slate Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-2 w-full max-w-2xl text-center">
        <div className="space-y-1.5 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Hardware Morphing Surface</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            iDynamics
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            A single black surface with continuous layout spring physics that smoothly transforms between collapsed wings and expanded cards.
          </p>
        </div>

        <MorphPillDeck initialMode="music" defaultOpen={true} />
      </div>
    </div>
  )
}

export function MorphPillCardBlockPreview() {
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const spring = {
    type: "spring" as const,
    stiffness: 400,
    damping: open ? 28 : 32,
    mass: 0.8,
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
            width: open ? 230 : 136,
            height: open ? 116 : 34,
            borderRadius: open ? 24 : 999,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: open
              ? "0 12px 36px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.12)"
              : "0 4px 14px rgba(0, 0, 0, 0.6)",
          }}
          className="relative transition-colors"
        >
          {/* Specular Rim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="mini-open"
                initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.1, duration: 0.18 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(4px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width: 230, height: 116 }}
                className="p-3 text-white flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                      alt="Starboy"
                      className="size-7 rounded-lg object-cover border border-white/15 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-white truncate leading-tight">Starboy</p>
                      <p className="text-[9px] text-slate-400 truncate">The Weeknd</p>
                    </div>
                  </div>
                  <X className="size-3 text-slate-400 hover:text-white" />
                </div>

                {/* Sound wave */}
                <div className="flex items-center justify-between pt-0.5">
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
                        className="w-0.5 rounded-full bg-slate-300"
                        style={{ height: `${val * 100}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">1:42 / 3:50</span>
                </div>

                <div className="w-full py-1 rounded-md bg-white text-black font-semibold text-[9px] flex items-center justify-center gap-1 shadow-sm">
                  <span>Open Island</span>
                  <ArrowUpRight className="size-2.5 stroke-[2.5]" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mini-closed"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(3px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.08, duration: 0.12 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(3px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width: 136, height: 34 }}
                className="flex items-center justify-between px-2.5 size-full text-white"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                    alt="Starboy"
                    className="size-3.5 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <span className="text-[10px] font-medium text-slate-200 truncate">Starboy</span>
                </div>
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-slate-300 rounded-full" />
                  <span className="w-0.5 h-1 bg-slate-300 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-slate-300 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
