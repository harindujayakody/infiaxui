"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Timer,
  RotateCcw,
  Mic,
  Square,
  Sparkles,
  ArrowUpRight,
  X,
  Volume2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DynamicIslandMode = "music" | "timer" | "record" | "profile"

export interface DynamicIslandProps {
  initialMode?: DynamicIslandMode
  defaultOpen?: boolean
  className?: string
  onModeChange?: (mode: DynamicIslandMode) => void
}

// Apple Dynamic Island organic spring configuration
const openSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.8,
}

const closeSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.75,
}

export function MorphPillDeck({
  initialMode = "music",
  defaultOpen = false,
  className,
  onModeChange,
}: DynamicIslandProps) {
  const [mode, setMode] = useState<DynamicIslandMode>(initialMode)
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  // Music state
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [musicProgress, setMusicProgress] = useState<number>(42)

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(1458) // 24m 18s
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)

  // Record state
  const [isRecording, setIsRecording] = useState<boolean>(true)
  const [recordSeconds, setRecordSeconds] = useState<number>(84) // 1m 24s

  // Connect state
  const [hasConnected, setHasConnected] = useState<boolean>(false)

  // Timer ticker
  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Record ticker
  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => {
      setRecordSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleTabChange = (newMode: DynamicIslandMode) => {
    setMode(newMode)
    setIsOpen(true)
    onModeChange?.(newMode)
  }

  // Exact hardware-measured dimensions
  const getIslandDimensions = () => {
    if (!isOpen) {
      switch (mode) {
        case "music":
          return { width: 182, height: 38, radius: 999 }
        case "timer":
          return { width: 160, height: 38, radius: 999 }
        case "record":
          return { width: 168, height: 38, radius: 999 }
        case "profile":
          return { width: 154, height: 38, radius: 999 }
        default:
          return { width: 160, height: 38, radius: 999 }
      }
    }

    switch (mode) {
      case "music":
        return { width: 376, height: 178, radius: 34 }
      case "timer":
        return { width: 360, height: 172, radius: 34 }
      case "record":
        return { width: 360, height: 172, radius: 34 }
      case "profile":
        return { width: 368, height: 184, radius: 34 }
      default:
        return { width: 360, height: 172, radius: 34 }
    }
  }

  const { width, height, radius } = getIslandDimensions()

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-start py-6 select-none", className)}>
      {/* Refined Slate Segmented Navigation */}
      <div className="flex items-center gap-1 mb-10 p-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg shadow-black/40">
        {[
          { id: "music", label: "Now Playing" },
          { id: "timer", label: "Focus Timer" },
          { id: "record", label: "Voice Memo" },
          { id: "profile", label: "Profile" },
        ].map((tab) => {
          const isActive = mode === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as DynamicIslandMode)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "text-slate-100 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-island-mode-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-slate-800 border border-slate-700/70 rounded-full shadow-sm"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Morphing Dynamic Island Surface */}
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
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: isOpen
              ? "0 24px 70px -12px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.12)"
              : "0 8px 24px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
          }}
          className="relative transition-colors"
        >
          {/* Hardware Top Specular Rim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              /* ================= EXPANDED DYNAMIC ISLAND ================= */
              <motion.div
                key={`expanded-${mode}`}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.1, duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  filter: "blur(6px)",
                  transition: { duration: 0.1 },
                }}
                style={{ width, height }}
                className="p-4 text-white flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. NOW PLAYING EXPANDED */}
                {mode === "music" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&q=80"
                          alt="Album Art"
                          className="size-11 rounded-xl object-cover border border-white/15 shrink-0 shadow-md"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate tracking-tight">
                            Starboy
                          </h4>
                          <p className="text-xs text-slate-400 truncate">The Weeknd • Starboy</p>
                        </div>
                      </div>

                      {/* Sound Waveform */}
                      <div className="flex items-end gap-0.5 h-4 px-2">
                        {[0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={
                              isPlaying
                                ? { height: ["25%", "100%", "35%", "85%", "40%"] }
                                : { height: "25%" }
                            }
                            transition={{
                              duration: 0.85,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: i * 0.12,
                              ease: "easeInOut",
                            }}
                            className="w-0.5 rounded-full bg-slate-200"
                            style={{ height: `${h * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Minimal Scrubber */}
                    <div className="space-y-1 pt-1">
                      <div
                        className="relative h-1 w-full rounded-full bg-slate-800 cursor-pointer overflow-hidden"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
                          setMusicProgress(Math.max(0, Math.min(100, pct)))
                        }}
                      >
                        <div
                          className="absolute left-0 top-0 h-full bg-slate-200 rounded-full transition-all duration-150"
                          style={{ width: `${musicProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>1:42</span>
                        <span>-2:08</span>
                      </div>
                    </div>

                    {/* Media Controls */}
                    <div className="flex items-center justify-between pt-0.5">
                      <Volume2 className="size-4 text-slate-400 hover:text-white transition-colors cursor-pointer" />

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Previous"
                        >
                          <SkipBack className="size-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-slate-200 transition-transform active:scale-95 shadow-md cursor-pointer"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause className="size-4 fill-current" />
                          ) : (
                            <Play className="size-4 fill-current ml-0.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Next"
                        >
                          <SkipForward className="size-4 fill-current" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Collapse"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  </>
                )}

                {/* 2. FOCUS TIMER EXPANDED */}
                {mode === "timer" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-slate-300">
                          <Timer className="size-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white tracking-tight">
                            Deep Work Session
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono">Pomodoro Sprint</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-2 py-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
                      <span className="text-3xl font-mono font-bold tracking-tight text-white">
                        {formatTime(timerSeconds)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTimerSeconds(1500)}
                          className="size-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Reset to 25m"
                        >
                          <RotateCcw className="size-3.5" />
                        </button>
                        <Button
                          size="sm"
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={cn(
                            "rounded-full h-8 px-4 text-xs font-semibold transition-all",
                            isTimerRunning
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                              : "bg-white text-black hover:bg-slate-200"
                          )}
                        >
                          {isTimerRunning ? "Pause" : "Resume"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                      <span>Target: 25:00</span>
                      <span className="text-slate-300">Block 3 of 4</span>
                    </div>
                  </>
                )}

                {/* 3. VOICE MEMO EXPANDED */}
                {mode === "record" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                          <Mic className="size-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-semibold text-white tracking-tight">
                              Voice Note
                            </h4>
                            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">48 kHz • Lossless</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    {/* Audio recording waveform */}
                    <div className="flex items-center justify-center gap-1 h-8 px-3 bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden">
                      {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 1.0, 0.6, 0.8, 0.4, 0.9, 0.7, 0.3, 0.6, 0.8, 0.5].map(
                        (val, i) => (
                          <motion.span
                            key={i}
                            animate={
                              isRecording
                                ? { height: ["20%", "95%", "30%", "80%"] }
                                : { height: "20%" }
                            }
                            transition={{
                              duration: 0.7,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: (i % 5) * 0.1,
                              ease: "easeInOut",
                            }}
                            className="w-1 rounded-full bg-rose-500/80"
                            style={{ height: `${val * 100}%` }}
                          />
                        )
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono font-semibold text-white">
                        {formatTime(recordSeconds)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => setIsRecording(!isRecording)}
                        className={cn(
                          "rounded-full h-7 px-3 text-xs font-semibold gap-1.5",
                          isRecording
                            ? "bg-rose-600 hover:bg-rose-700 text-white"
                            : "bg-white text-black hover:bg-slate-200"
                        )}
                      >
                        {isRecording ? (
                          <>
                            <Square className="size-3 fill-current" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="size-3 fill-current" />
                            <span>Resume</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}

                {/* 4. CREATOR PROFILE EXPANDED */}
                {mode === "profile" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                          alt="Maya Okafor"
                          className="size-11 rounded-full object-cover border border-white/20 shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-semibold text-white tracking-tight">
                              Maya Okafor
                            </h4>
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <p className="text-xs text-slate-400">Interaction Designer</p>
                          <p className="text-[10px] text-slate-500 font-mono">Lisbon • UTC+0</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 line-clamp-2">
                      Crafts fluid micro-interactions and motion systems for modern web interfaces.
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-mono">Available for Q4</span>
                      <Button
                        size="sm"
                        onClick={() => setHasConnected(true)}
                        className="rounded-lg h-7 px-3 bg-white text-black hover:bg-slate-200 text-xs font-semibold gap-1 transition-all"
                      >
                        {hasConnected ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Connected</span>
                          </>
                        ) : (
                          <>
                            <span>Connect</span>
                            <ArrowUpRight className="size-3 stroke-[2.5]" />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              /* ================= COLLAPSED DYNAMIC ISLAND WINGS ================= */
              <motion.div
                key="collapsed-island"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.08, duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(4px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width, height }}
                className="flex items-center justify-between px-3.5 size-full text-white"
              >
                {/* 1. Collapsed Music */}
                {mode === "music" && (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                        alt="Music Art"
                        className="size-4 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-200 truncate max-w-[90px]">
                        Starboy
                      </span>
                    </div>

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
                          className="w-0.5 rounded-full bg-slate-300"
                          style={{ height: `${val * 100}%` }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* 2. Collapsed Focus Timer */}
                {mode === "timer" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Timer className="size-3.5 text-slate-400 shrink-0" />
                      <span className="text-xs font-medium text-slate-200 truncate">Focus</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-300">
                      {formatTime(timerSeconds)}
                    </span>
                  </>
                )}

                {/* 3. Collapsed Voice Memo */}
                {mode === "record" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="size-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                      <span className="text-xs font-medium text-slate-200 truncate">Memo</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-rose-400">
                      {formatTime(recordSeconds)}
                    </span>
                  </>
                )}

                {/* 4. Collapsed Profile */}
                {mode === "profile" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        alt="Maya"
                        className="size-4 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-200 truncate max-w-[75px]">
                        Maya O.
                      </span>
                    </div>
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="text-xs text-slate-500 mt-6 font-mono">
        {isOpen ? "Tap island or press Esc to collapse" : "Tap island to expand interactive controls"}
      </p>
    </div>
  )
}
