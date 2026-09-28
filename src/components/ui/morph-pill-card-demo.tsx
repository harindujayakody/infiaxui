"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Music2,
  Phone,
  Navigation,
  Timer,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Wifi,
  BatteryCharging,
  Signal,
  Sun,
  Calendar,
  CloudRain,
  ChevronRight,
  Flashlight,
  Camera,
  X,
  Play,
  ArrowUpRight,
} from "lucide-react"
import { IDynamics, DynamicActivityType } from "@/components/ui/morph-pill-card"
import { cn } from "@/lib/utils"

export function MorphPillCardDemo({ className }: { className?: string }) {
  const [activity, setActivity] = useState<DynamicActivityType>("music")
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [splitMode, setSplitMode] = useState<boolean>(false)

  const activities: { id: DynamicActivityType; label: string; icon: React.ReactNode }[] = [
    { id: "music", label: "Media Player", icon: <Music2 className="size-3.5" /> },
    { id: "call", label: "Incoming Call", icon: <Phone className="size-3.5" /> },
    { id: "navigation", label: "Navigation", icon: <Navigation className="size-3.5" /> },
    { id: "timer", label: "Focus Timer", icon: <Timer className="size-3.5" /> },
  ]

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-[#030712] p-4 sm:p-8 md:p-12 shadow-2xl select-none",
        className
      )}
    >
      {/* Ambient Slate Backlight Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-slate-800/25 rounded-full blur-[110px] pointer-events-none" />

      {/* Realistic Slate Device Chassis */}
      <div className="relative z-10 w-full max-w-[390px] rounded-[48px] border-[3px] border-slate-700/80 bg-[#0A0F1D] p-3 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Device Inner Screen */}
        <div className="relative flex flex-col justify-between h-[580px] w-full overflow-hidden rounded-[38px] bg-[#000000] border border-white/5 pt-3 pb-4 px-4">
          {/* Top Status Bar with Dynamic Island Embedded */}
          <div className="relative w-full z-20">
            {/* Status Flanks */}
            <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-slate-300 pointer-events-none mb-1">
              <span className="font-mono tracking-tight text-white font-bold pl-1">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-300 pr-1">
                <Signal className="size-3 stroke-[2.5]" />
                <Wifi className="size-3 stroke-[2.5]" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-mono">100%</span>
                  <BatteryCharging className="size-3.5 text-emerald-400 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* The Dynamic Island Component */}
            <div className="flex justify-center -mt-2">
              <IDynamics
                activity={activity}
                isOpen={isOpen}
                onToggle={(open) => setIsOpen(open)}
                onActivityChange={(act) => setActivity(act)}
                showSplitBubble={splitMode}
              />
            </div>
          </div>

          {/* Realistic Slate OS Lockscreen Canvas (Behind / Below Island) */}
          <div className="relative flex-1 flex flex-col items-center justify-between pt-6 pb-2 text-center pointer-events-none">
            {/* Date & Big Time */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Monday, October 24
              </p>
              <h1 className="text-6xl font-light tracking-tighter text-slate-100 font-sans">
                09:41
              </h1>
            </div>

            {/* Glanceable Slate Widget Cards */}
            <div className="w-full space-y-2.5 px-2">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-slate-800/90 flex items-center justify-center text-slate-300">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">Design Systems Sync</h5>
                    <p className="text-[10px] text-slate-400 font-mono">10:00 AM • Main Studio</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                  In 19m
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-slate-800/90 flex items-center justify-center text-cyan-400">
                    <Sun className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">San Francisco</h5>
                    <p className="text-[10px] text-slate-400">68° Mostly Clear</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">H:72° L:54°</span>
              </div>
            </div>

            {/* Bottom Actions & Home Indicator */}
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-between px-4">
                <div className="size-10 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300">
                  <Flashlight className="size-4" />
                </div>
                <div className="size-10 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300">
                  <Camera className="size-4" />
                </div>
              </div>
              <div className="w-32 h-1 bg-slate-600/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Refined Slate Technical Control Console (No pill design) */}
      <div className="relative z-10 mt-8 w-full max-w-xl flex flex-col items-center gap-3">
        {/* Activity Trigger Toolbar */}
        <div className="flex items-center flex-wrap justify-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg">
          {activities.map((item) => {
            const isActive = activity === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActivity(item.id)
                  setIsOpen(true)
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700/60"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* State Toggle & Split Island Controls */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isOpen ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
            <span>{isOpen ? "Collapse Island" : "Expand Island"}</span>
          </button>

          <button
            type="button"
            onClick={() => setSplitMode(!splitMode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md border transition-colors cursor-pointer",
              splitMode
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300"
            )}
          >
            <Layers className="size-3" />
            <span>Dual Activity Split {splitMode ? "On" : "Off"}</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 font-mono text-center">
          Tap the Dynamic Island directly to trigger organic Apple spring physics.
        </p>
      </div>
    </div>
  )
}

export function MorphPillCardBlockPreview() {
  const [open, setOpen] = useState(false)

  const spring = {
    type: "spring" as const,
    stiffness: 420,
    damping: open ? 28 : 32,
    mass: 0.8,
  }

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#030712] p-4 select-none">
      <div className="relative flex justify-center" style={{ transformOrigin: "top center" }}>
        <motion.div
          layout
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          transition={spring}
          style={{
            width: open ? 240 : 144,
            height: open ? 120 : 34,
            borderRadius: open ? 24 : 999,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: open
              ? "0 14px 40px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.12)"
              : "0 4px 16px rgba(0, 0, 0, 0.7)",
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
                  transition: { delay: 0.08, duration: 0.18 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(4px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width: 240, height: 120 }}
                className="p-3 text-white flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                      alt="After Hours"
                      className="size-7 rounded-lg object-cover border border-white/15 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-white truncate leading-tight">After Hours</p>
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
                  <span className="text-[9px] font-mono text-slate-400 tabular-nums">1:44 / 3:48</span>
                </div>

                <div className="w-full py-1 rounded-md bg-white text-black font-semibold text-[9px] flex items-center justify-center gap-1 shadow-sm">
                  <span>Dynamic Island</span>
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
                style={{ width: 144, height: 34 }}
                className="flex items-center justify-between px-2.5 size-full text-white"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=120&q=80"
                    alt="Album"
                    className="size-3.5 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <span className="text-[10px] font-medium text-slate-200 truncate">After Hours</span>
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
