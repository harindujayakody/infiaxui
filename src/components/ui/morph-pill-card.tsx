"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Timer,
  RotateCcw,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Navigation,
  Volume2,
  VolumeX,
  Plus,
  X,
  Radio,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DynamicActivityType = "music" | "call" | "navigation" | "timer"
export type DynamicIslandMode = DynamicActivityType | "record" | "profile"

export interface IDynamicsProps {
  activity?: DynamicActivityType
  isOpen?: boolean
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
  onActivityChange?: (activity: DynamicActivityType) => void
  showSplitBubble?: boolean
  className?: string
}

export type DynamicIslandProps = IDynamicsProps & {
  initialMode?: DynamicIslandMode
}

// Apple Dynamic Island organic spring configuration
const openSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.8,
}

const closeSpring = {
  type: "spring" as const,
  stiffness: 440,
  damping: 32,
  mass: 0.75,
}

export function IDynamics({
  activity: externalActivity,
  isOpen: externalIsOpen,
  defaultOpen = false,
  onToggle,
  onActivityChange,
  showSplitBubble = false,
  className,
}: IDynamicsProps) {
  // Support both controlled and uncontrolled states
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen)
  const isControlledOpen = externalIsOpen !== undefined
  const isOpen = isControlledOpen ? externalIsOpen : internalOpen

  const [internalActivity, setInternalActivity] = useState<DynamicActivityType>(
    externalActivity ?? "music"
  )
  const activity = externalActivity ?? internalActivity

  // Synchronize external activity prop if changed
  useEffect(() => {
    if (externalActivity && externalActivity !== internalActivity) {
      setInternalActivity(externalActivity)
    }
  }, [externalActivity, internalActivity])

  const handleToggle = (nextOpen?: boolean) => {
    const value = nextOpen !== undefined ? nextOpen : !isOpen
    if (!isControlledOpen) {
      setInternalOpen(value)
    }
    onToggle?.(value)
  }

  const handleActivitySwitch = (newAct: DynamicActivityType) => {
    setInternalActivity(newAct)
    onActivityChange?.(newAct)
  }

  // --- Music Activity State ---
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [musicProgressSec, setMusicProgressSec] = useState<number>(104) // 1:44
  const musicDurationSec = 228 // 3:48
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // --- Call Activity State ---
  const [callDuration, setCallDuration] = useState<number>(142) // 2:22
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false)

  // --- Timer Activity State ---
  const [timerSeconds, setTimerSeconds] = useState<number>(1458) // 24m 18s
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)

  // Music progress ticker
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setMusicProgressSec((prev) => (prev >= musicDurationSec ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying, musicDurationSec])

  // Call duration ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer ticker
  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleToggle(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  // Exact hardware-measured dimensions for Apple Dynamic Island
  const getIslandDimensions = () => {
    if (!isOpen) {
      if (showSplitBubble) {
        return { width: 160, height: 36, radius: 999 }
      }
      switch (activity) {
        case "music":
          return { width: 204, height: 36, radius: 999 }
        case "call":
          return { width: 184, height: 36, radius: 999 }
        case "navigation":
          return { width: 196, height: 36, radius: 999 }
        case "timer":
          return { width: 168, height: 36, radius: 999 }
        default:
          return { width: 184, height: 36, radius: 999 }
      }
    }

    switch (activity) {
      case "music":
        return { width: 368, height: 182, radius: 36 }
      case "call":
        return { width: 368, height: 176, radius: 36 }
      case "navigation":
        return { width: 368, height: 172, radius: 36 }
      case "timer":
        return { width: 368, height: 172, radius: 36 }
      default:
        return { width: 368, height: 176, radius: 36 }
    }
  }

  const { width, height, radius } = getIslandDimensions()

  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative flex items-center gap-2" style={{ transformOrigin: "top center" }}>
        {/* Main Morphing Dynamic Island Body */}
        <motion.div
          layout
          onClick={() => handleToggle()}
          transition={isOpen ? openSpring : closeSpring}
          style={{
            width,
            height,
            borderRadius: radius,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: isOpen
              ? "0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.12)"
              : "0 8px 24px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
          }}
          className="relative transition-colors"
          role="region"
          aria-label="Dynamic Island"
        >
          {/* Specular Top Rim Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-30" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              /* ================= EXPANDED SURFACE ================= */
              <motion.div
                key={`expanded-${activity}`}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.08, duration: 0.18 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(6px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width, height }}
                className="p-4 text-white flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. NOW PLAYING EXPANDED */}
                {activity === "music" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&q=80"
                          alt="Album Art"
                          className="size-11 rounded-xl object-cover border border-white/20 shrink-0 shadow-md"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-semibold text-white truncate tracking-tight">
                              After Hours
                            </h4>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-slate-300 uppercase">
                              Lossless
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate">The Weeknd</p>
                        </div>
                      </div>

                      {/* Equalizer Visualizer */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-end gap-0.5 h-4 px-1.5">
                          {[0.8, 0.4, 1.0, 0.6, 0.9].map((h, i) => (
                            <motion.span
                              key={i}
                              animate={
                                isPlaying
                                  ? { height: ["25%", "100%", "35%", "85%", "40%"] }
                                  : { height: "25%" }
                              }
                              transition={{
                                duration: 0.8,
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

                        <button
                          type="button"
                          onClick={() => handleToggle(false)}
                          className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Collapse Island"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Interactive Scrubber */}
                    <div className="space-y-1 pt-1">
                      <div
                        className="relative h-1.5 w-full rounded-full bg-slate-800 cursor-pointer overflow-hidden group"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                          setMusicProgressSec(Math.round(pct * musicDurationSec))
                        }}
                      >
                        <div
                          className="absolute left-0 top-0 h-full bg-slate-200 rounded-full transition-all duration-100"
                          style={{
                            width: `${(musicProgressSec / musicDurationSec) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 tabular-nums">
                        <span>{formatTime(musicProgressSec)}</span>
                        <span>-{formatTime(musicDurationSec - musicProgressSec)}</span>
                      </div>
                    </div>

                    {/* Media Playback Controls */}
                    <div className="flex items-center justify-between pt-0.5">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="size-4 text-rose-400" /> : <Volume2 className="size-4" />}
                      </button>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setMusicProgressSec(Math.max(0, musicProgressSec - 15))}
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Previous 15 seconds"
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
                          onClick={() =>
                            setMusicProgressSec(Math.min(musicDurationSec, musicProgressSec + 15))
                          }
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Next 15 seconds"
                        >
                          <SkipForward className="size-4 fill-current" />
                        </button>
                      </div>

                      {/* In-Island Activity Switcher Dots */}
                      <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-full border border-slate-800">
                        {(["music", "call", "navigation", "timer"] as DynamicActivityType[]).map((act) => (
                          <button
                            key={act}
                            type="button"
                            onClick={() => handleActivitySwitch(act)}
                            className={cn(
                              "size-2 rounded-full transition-all cursor-pointer",
                              activity === act ? "bg-white scale-125" : "bg-slate-600 hover:bg-slate-400"
                            )}
                            title={`Switch to ${act}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 2. ACTIVE PHONE CALL EXPANDED */}
                {activity === "call" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                            alt="Caller"
                            className="size-11 rounded-full object-cover border border-emerald-500/50 shadow-md"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-black" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-semibold text-white tracking-tight truncate">
                              Sarah Jenkins
                            </h4>
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <p className="text-xs text-slate-400">Mobile • HD Voice</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                          {formatTime(callDuration)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggle(false)}
                          className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Waveform indicator */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-mono">Audio</span>
                        <div className="flex items-end gap-0.5 h-3 ml-2">
                          {[0.4, 0.9, 0.6, 0.8, 0.3, 0.7, 0.5].map((v, i) => (
                            <motion.span
                              key={i}
                              animate={{ height: ["20%", "100%", "30%"] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.1,
                              }}
                              className="w-0.5 rounded-full bg-emerald-400"
                              style={{ height: `${v * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">AirPods Pro</span>
                    </div>

                    {/* Call Actions */}
                    <div className="flex items-center justify-between pt-0.5">
                      <button
                        type="button"
                        onClick={() => setIsMicMuted(!isMicMuted)}
                        className={cn(
                          "size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                          isMicMuted ? "bg-rose-500/20 text-rose-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                        )}
                        title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
                      >
                        {isMicMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                      </button>

                      <Button
                        size="sm"
                        onClick={() => handleToggle(false)}
                        className="rounded-full h-8 px-5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-rose-950/50"
                      >
                        <PhoneOff className="size-3.5 fill-current" />
                        <span>End Call</span>
                      </Button>

                      <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-full border border-slate-800">
                        {(["music", "call", "navigation", "timer"] as DynamicActivityType[]).map((act) => (
                          <button
                            key={act}
                            type="button"
                            onClick={() => handleActivitySwitch(act)}
                            className={cn(
                              "size-2 rounded-full transition-all cursor-pointer",
                              activity === act ? "bg-white scale-125" : "bg-slate-600 hover:bg-slate-400"
                            )}
                            title={`Switch to ${act}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 3. TURN-BY-TURN NAVIGATION EXPANDED */}
                {activity === "navigation" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                          <Navigation className="size-5 fill-current rotate-45" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white tracking-tight">
                            In 250 meters
                          </h4>
                          <p className="text-xs text-slate-300 font-medium">Turn Right on Grand Ave</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggle(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    {/* Route Progress Bar */}
                    <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-semibold">14 min</span>
                        <span className="text-slate-400">4.2 miles</span>
                        <span className="text-slate-300">ETA 9:55 AM</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-2/3" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[11px] font-mono text-slate-400">Next: Exit 42B</span>

                      <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-full border border-slate-800">
                        {(["music", "call", "navigation", "timer"] as DynamicActivityType[]).map((act) => (
                          <button
                            key={act}
                            type="button"
                            onClick={() => handleActivitySwitch(act)}
                            className={cn(
                              "size-2 rounded-full transition-all cursor-pointer",
                              activity === act ? "bg-white scale-125" : "bg-slate-600 hover:bg-slate-400"
                            )}
                            title={`Switch to ${act}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 4. FOCUS TIMER EXPANDED */}
                {activity === "timer" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Timer className="size-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white tracking-tight">
                            Focus Session
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono">Deep Work • Sprint 2</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggle(false)}
                        className="size-6 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                      <span className="text-3xl font-mono font-bold tracking-tight text-white tabular-nums">
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

                    <div className="flex items-center justify-between pt-0.5">
                      <button
                        type="button"
                        onClick={() => setTimerSeconds((prev) => prev + 300)}
                        className="text-[11px] font-mono text-amber-400/90 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="size-3" />
                        <span>Add 5 min</span>
                      </button>

                      <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-full border border-slate-800">
                        {(["music", "call", "navigation", "timer"] as DynamicActivityType[]).map((act) => (
                          <button
                            key={act}
                            type="button"
                            onClick={() => handleActivitySwitch(act)}
                            className={cn(
                              "size-2 rounded-full transition-all cursor-pointer",
                              activity === act ? "bg-white scale-125" : "bg-slate-600 hover:bg-slate-400"
                            )}
                            title={`Switch to ${act}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              /* ================= COLLAPSED STATUS WINGS ================= */
              <motion.div
                key={`collapsed-${activity}`}
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
                className="flex items-center justify-between px-3 size-full text-white"
              >
                {/* 1. Collapsed Music */}
                {activity === "music" && (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                        alt="Album Art"
                        className="size-4 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-200 truncate max-w-[85px]">
                        After Hours
                      </span>
                    </div>

                    <div className="flex items-end gap-0.5 h-3">
                      {[0.8, 0.4, 1.0, 0.6].map((val, i) => (
                        <motion.span
                          key={i}
                          animate={
                            isPlaying
                              ? { height: ["20%", "100%", "40%", "85%"] }
                              : { height: "20%" }
                          }
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

                {/* 2. Collapsed Call */}
                {activity === "call" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="relative">
                        <Phone className="size-3 text-emerald-400 fill-current shrink-0" />
                        <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <span className="text-xs font-medium text-emerald-300 truncate">
                        Sarah J.
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-emerald-400 tabular-nums">
                      {formatTime(callDuration)}
                    </span>
                  </>
                )}

                {/* 3. Collapsed Navigation */}
                {activity === "navigation" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Navigation className="size-3 text-emerald-400 fill-current rotate-45 shrink-0" />
                      <span className="text-xs font-medium text-slate-200 truncate">Grand Ave</span>
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-emerald-400">
                      250 m
                    </span>
                  </>
                )}

                {/* 4. Collapsed Timer */}
                {activity === "timer" && (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Timer className="size-3 text-amber-400 shrink-0" />
                      <span className="text-xs font-medium text-slate-200 truncate">Focus</span>
                    </div>

                    <span className="text-[11px] font-mono font-semibold text-amber-300 tabular-nums">
                      {formatTime(timerSeconds)}
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Apple Signature Split-Bubble (Dual Activity) */}
        {showSplitBubble && !isOpen && (
          <motion.div
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={openSpring}
            onClick={() => handleToggle()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.7)",
            }}
            className="flex items-center justify-center cursor-pointer text-amber-400 hover:border-white/30 transition-colors"
            title="Active Timer Activity"
          >
            <Timer className="size-3.5" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Aliases for seamless developer compatibility
export const DynamicIsland = IDynamics
export const MorphPillDeck = IDynamics
export default IDynamics
