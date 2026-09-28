"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Phone,
  PhoneOff,
  Mic,
  Volume2,
  Airplay,
  ArrowUpRight,
  X,
  Package,
  CheckCircle2,
  Sparkles,
  Music2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DynamicIslandMode = "music" | "call" | "profile" | "delivery"

export interface DynamicIslandItem {
  id: string
  mode: DynamicIslandMode
  label: string
  icon?: React.ReactNode
}

export interface DynamicIslandProps {
  initialMode?: DynamicIslandMode
  defaultOpen?: boolean
  className?: string
}

// Spring configuration matching Apple Dynamic Island physics
const openSpring = {
  type: "spring" as const,
  stiffness: 440,
  damping: 30,
  mass: 0.8,
}

const closeSpring = {
  type: "spring" as const,
  stiffness: 440,
  damping: 35,
  mass: 0.8,
}

export function MorphPillDeck({
  initialMode = "music",
  defaultOpen = false,
  className,
}: DynamicIslandProps) {
  const [mode, setMode] = useState<DynamicIslandMode>(initialMode)
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Sizing recipe for each mode
  const getIslandDimensions = () => {
    if (!isOpen) {
      switch (mode) {
        case "music":
          return { width: 174, height: 38, radius: 999 }
        case "call":
          return { width: 160, height: 38, radius: 999 }
        case "profile":
          return { width: 148, height: 38, radius: 999 }
        case "delivery":
          return { width: 168, height: 38, radius: 999 }
        default:
          return { width: 150, height: 38, radius: 999 }
      }
    }

    switch (mode) {
      case "music":
        return { width: 380, height: 185, radius: 36 }
      case "call":
        return { width: 370, height: 190, radius: 36 }
      case "profile":
        return { width: 370, height: 200, radius: 36 }
      case "delivery":
        return { width: 370, height: 185, radius: 36 }
      default:
        return { width: 370, height: 190, radius: 36 }
    }
  }

  const { width, height, radius } = getIslandDimensions()

  return (
    <div className={cn("relative flex flex-col items-center justify-start py-8 select-none", className)}>
      {/* Mode Switcher Toolbar using Shadcn Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 bg-neutral-900/90 p-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-xl">
        {[
          { id: "music", label: "Music Player", icon: <Music2 className="size-3.5" /> },
          { id: "call", label: "Phone Call", icon: <Phone className="size-3.5 text-emerald-400" /> },
          { id: "profile", label: "Creator Profile", icon: <Sparkles className="size-3.5 text-amber-400" /> },
          { id: "delivery", label: "Delivery", icon: <Package className="size-3.5 text-cyan-400" /> },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={mode === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode(tab.id as DynamicIslandMode)
              setIsOpen(true)
            }}
            className={cn(
              "rounded-full text-xs font-medium h-7 px-3 gap-1.5 transition-all",
              mode === tab.id
                ? "bg-white text-black hover:bg-zinc-200 shadow-md font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Dynamic Island Single Morphing Black Surface */}
      <div className="relative flex justify-center" style={{ transformOrigin: "top center" }}>
        <motion.div
          layout
          onClick={() => setIsOpen(!isOpen)}
          transition={isOpen ? openSpring : closeSpring}
          style={{
            width,
            height,
            borderRadius: radius,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            boxShadow: isOpen
              ? "0 25px 70px -10px rgba(0,0,0,0.95), 0 0 1px 1px rgba(255,255,255,0.18)"
              : "0 10px 30px -5px rgba(0,0,0,0.7)",
          }}
          className="relative transition-colors"
        >
          {/* Subtle Dynamic Island Specular Gloss */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              /* ================= EXPANDED DYNAMIC ISLAND STATES ================= */
              <motion.div
                key={`expanded-${mode}`}
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
                style={{ width, height }}
                className="p-4 text-white flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. MUSIC PLAYER EXPANDED */}
                {mode === "music" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&q=80"
                          alt="Album Art"
                          className="size-12 rounded-xl object-cover border border-white/20 shadow-md"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate tracking-tight">
                            Starboy (feat. Daft Punk)
                          </h4>
                          <p className="text-xs text-zinc-400 truncate">The Weeknd • Starboy</p>
                        </div>
                      </div>

                      {/* Equalizer Visualizer */}
                      <div className="flex items-end gap-0.5 h-5 px-2">
                        {[0.8, 0.4, 1, 0.6, 0.9].map((val, i) => (
                          <motion.span
                            key={i}
                            animate={
                              isPlaying
                                ? { height: ["20%", "100%", "40%", "85%", "30%"] }
                                : { height: "20%" }
                            }
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                            className="w-1 rounded-full bg-red-500"
                            style={{ height: `${val * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="space-y-1">
                      <div className="relative h-1 w-full rounded-full bg-white/20 overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-[42%] bg-white rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                        <span>1:42</span>
                        <span>-2:08</span>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-between pt-1">
                      <Airplay className="size-4 text-zinc-400 hover:text-white cursor-pointer" />
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <SkipBack className="size-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform active:scale-95 shadow-md cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="size-4 fill-current" />
                          ) : (
                            <Play className="size-4 fill-current ml-0.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <SkipForward className="size-4 fill-current" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  </>
                )}

                {/* 2. PHONE CALL EXPANDED */}
                {mode === "call" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                            alt="Caller"
                            className="size-12 rounded-full object-cover border border-white/20"
                          />
                          <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-black" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            Sarah Jenkins
                          </h4>
                          <p className="text-xs text-emerald-400 font-mono">03:42 • HD Audio</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    {/* Call Actions */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn(
                          "rounded-xl flex flex-col h-14 p-1.5 gap-1 text-[10px] bg-white/10 border-white/10 text-zinc-300 hover:text-white",
                          isMuted && "bg-white text-black hover:bg-zinc-200"
                        )}
                      >
                        <Mic className="size-4" />
                        <span>{isMuted ? "Muted" : "Mute"}</span>
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl flex flex-col h-14 p-1.5 gap-1 text-[10px] bg-white/10 border-white/10 text-zinc-300 hover:text-white"
                      >
                        <Volume2 className="size-4" />
                        <span>Speaker</span>
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl flex flex-col h-14 p-1.5 gap-1 text-[10px] bg-white/10 border-white/10 text-zinc-300 hover:text-white"
                      >
                        <Airplay className="size-4" />
                        <span>AirPlay</span>
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl flex flex-col h-14 p-1.5 gap-1 text-[10px] bg-red-600 hover:bg-red-700 text-white font-bold"
                      >
                        <PhoneOff className="size-4" />
                        <span>End</span>
                      </Button>
                    </div>
                  </>
                )}

                {/* 3. CREATOR PROFILE EXPANDED */}
                {mode === "profile" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                          alt="Maya Okafor"
                          className="size-12 rounded-2xl object-cover border border-white/20 shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-white tracking-tight">
                              Maya Okafor
                            </h4>
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <p className="text-xs text-zinc-400">Lead Interaction Designer</p>
                          <p className="text-[10px] text-zinc-500 font-mono">Northline • Lisbon</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.04] p-2.5 rounded-xl border border-white/5 line-clamp-2">
                      Shapes how digital products feel in motion — from zero-state to fluid micro-transitions.
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <span className="text-[10px] text-zinc-400 font-mono">Available UTC+0</span>
                      <Button
                        size="sm"
                        className="rounded-lg h-7 px-3 bg-white text-black hover:bg-zinc-200 text-xs font-semibold gap-1"
                      >
                        <span>Say hello</span>
                        <ArrowUpRight className="size-3 stroke-[2.5]" />
                      </Button>
                    </div>
                  </>
                )}

                {/* 4. DELIVERY STATUS EXPANDED */}
                {mode === "delivery" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <Package className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            Arc Table Lamp
                          </h4>
                          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="size-3" />
                            <span>Arriving in 8 mins</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    {/* Progress meter */}
                    <div className="space-y-1.5 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                      <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                        <span>Dispatched</span>
                        <span className="text-white font-semibold">Near your address</span>
                        <span>Delivered</span>
                      </div>
                      <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-[78%] bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-zinc-400 font-mono">Order #84920</span>
                      <Button
                        size="sm"
                        className="rounded-lg h-7 px-3 bg-white text-black hover:bg-zinc-200 text-xs font-semibold gap-1"
                      >
                        <span>Track Live Map</span>
                        <ArrowUpRight className="size-3 stroke-[2.5]" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              /* ================= COLLAPSED DYNAMIC ISLAND PILL WINGS ================= */
              <motion.div
                key="collapsed-island"
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
                style={{ width, height }}
                className="flex items-center justify-between px-3 size-full text-white"
              >
                {/* 1. Collapsed Music */}
                {mode === "music" && (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                        alt="Music Art"
                        className="size-5 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-white truncate max-w-[85px]">
                        Starboy
                      </span>
                    </div>

                    {/* Mini Waveform */}
                    <div className="flex items-end gap-0.5 h-3">
                      {[0.8, 0.4, 1, 0.6].map((val, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: ["20%", "100%", "40%", "85%"] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                          className="w-0.5 rounded-full bg-red-500"
                          style={{ height: `${val * 100}%` }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* 2. Collapsed Call */}
                {mode === "call" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        alt="Sarah"
                        className="size-5 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-white truncate max-w-[70px]">
                        Sarah
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>03:42</span>
                    </div>
                  </>
                )}

                {/* 3. Collapsed Profile */}
                {mode === "profile" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        alt="Maya"
                        className="size-5 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-white truncate max-w-[75px]">
                        Maya O.
                      </span>
                    </div>
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </>
                )}

                {/* 4. Collapsed Delivery */}
                {mode === "delivery" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Package className="size-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-medium text-white truncate max-w-[80px]">
                        Arc Lamp
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
                      8m
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="text-xs text-zinc-500 mt-8 font-mono">
        {isOpen ? "Click close button or tap island to collapse" : "Click island to expand interactive controls"}
      </p>
    </div>
  )
}
