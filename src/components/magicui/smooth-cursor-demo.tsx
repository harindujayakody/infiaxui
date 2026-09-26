"use client"

import React, { useRef, useState } from "react"
import { SmoothCursor, DefaultCursorSVG } from "@/components/magicui/smooth-cursor"
import { Sparkles, MousePointer, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// Custom Neon Gradient Cursor
function NeonCursorSVG() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-75 blur-sm animate-pulse" />
      <div className="relative size-4 rounded-full bg-cyan-400 border border-white shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
    </div>
  )
}

// 1. Primary Showcase matching media_1790456351152.png
export function SmoothCursorDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] select-none p-6 shadow-2xl"
    >
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Center text matching user reference screenshot */}
      <p className="pointer-events-none z-10 text-base sm:text-lg font-normal text-zinc-300 tracking-tight select-none">
        Move your mouse around
      </p>

      {/* Physics smooth cursor scoped to container */}
      <SmoothCursor containerRef={containerRef} />
    </div>
  )
}

// 2. Interactive Playground with Toggleable Custom Cursors & Hover Cards
export function SmoothCursorInteractiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursorType, setCursorType] = useState<"default" | "neon">("default")

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[400px] w-full flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 select-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

      {/* Controls */}
      <div className="z-10 flex flex-wrap items-center justify-between w-full gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-zinc-400">Interactive Canvas</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#161616] p-1">
          <button
            onClick={() => setCursorType("default")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              cursorType === "default"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <MousePointer className="size-3" />
            Classic Stealth
          </button>
          <button
            onClick={() => setCursorType("neon")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              cursorType === "neon"
                ? "bg-cyan-500 text-black font-semibold shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Zap className="size-3" />
            Neon Orb
          </button>
        </div>
      </div>

      {/* Center Target Interactive Elements */}
      <div className="z-10 flex flex-col items-center justify-center gap-4 py-8 text-center max-w-md">
        <p className="pointer-events-none text-zinc-400 text-sm">
          Notice the smooth rotational inertia as your mouse turns corners.
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-2">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 bg-[#161616]/70 backdrop-blur-sm transition-transform hover:scale-105 duration-200">
            <Sparkles className="size-4 text-cyan-400" />
            <span className="text-xs font-medium text-zinc-300">Physics Motion</span>
            <span className="text-[11px] text-zinc-500">Mass & Dampened Spring</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 bg-[#161616]/70 backdrop-blur-sm transition-transform hover:scale-105 duration-200">
            <ShieldCheck className="size-4 text-indigo-400" />
            <span className="text-xs font-medium text-zinc-300">RAF Throttled</span>
            <span className="text-[11px] text-zinc-500">60–120 FPS Fluidity</span>
          </div>
        </div>
      </div>

      <div className="z-10 flex items-center justify-center w-full">
        <span className="text-xs font-mono text-zinc-500">
          Touch devices are automatically bypassed
        </span>
      </div>

      {/* Physics smooth cursor */}
      <SmoothCursor
        containerRef={containerRef}
        cursor={cursorType === "default" ? <DefaultCursorSVG /> : <NeonCursorSVG />}
      />
    </div>
  )
}

// 3. Compact Card Preview for /blocks Grid
export function SmoothCursorBlockPreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] select-none p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_75%)]" />

      {/* Static preview cursor placed nicely in top-right quadrant if pointer hasn't moved yet */}
      <div className="pointer-events-none flex flex-col items-center justify-center gap-2 z-10 text-center">
        <p className="text-zinc-400 text-xs sm:text-[13px] font-medium tracking-normal select-none">
          Move your mouse around
        </p>
        <span className="text-[11px] font-mono text-zinc-600">
          Hover to test cursor physics
        </span>
      </div>

      <SmoothCursor containerRef={containerRef} />
    </div>
  )
}
