"use client"

import React, { useState } from "react"
import { Sun, Moon, Sparkles, Sliders } from "lucide-react"
import {
  AnimatedThemeToggler,
  type TransitionVariant,
} from "@/components/magicui/animated-theme-toggler"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference media_1790460329226.png
export function ThemeTogglerDemo({ className }: { className?: string }) {
  const [variant, setVariant] = useState<TransitionVariant>("circle")
  const [fromCenter, setFromCenter] = useState(false)
  const [duration, setDuration] = useState(450)

  const variants: TransitionVariant[] = [
    "circle",
    "square",
    "diamond",
    "hexagon",
    "triangle",
    "rectangle",
    "star",
  ]

  return (
    <div
      className={cn(
        "relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-8",
        className
      )}
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 z-10 max-w-lg">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-lg border transition-all capitalize",
              variant === v
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold"
                : "border-white/10 bg-[#161616] text-zinc-400 hover:text-white hover:border-white/20"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Main Interactive Button matching reference image media_1790460329226.png */}
      <div className="flex flex-col items-center gap-3">
        <AnimatedThemeToggler
          variant={variant}
          fromCenter={fromCenter}
          duration={duration}
          className="size-16 sm:size-20 rounded-full bg-black text-white dark:bg-white dark:text-black border border-white/20 dark:border-black/20 shadow-2xl hover:scale-105 active:scale-95 transition-all"
        />
        <p className="text-xs text-zinc-500 font-mono tracking-wide">
          Click to reveal with shape: <span className="text-zinc-300 font-semibold">{variant}</span>
        </p>
      </div>

      {/* Settings toggle */}
      <div className="flex items-center gap-4 text-xs text-zinc-400">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={fromCenter}
            onChange={(e) => setFromCenter(e.target.checked)}
            className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0"
          />
          <span>Expand from Viewport Center</span>
        </label>
      </div>
    </div>
  )
}

// 2. Star Shape Variant Showcase
export function ThemeTogglerStarDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-4",
        className
      )}
    >
      <AnimatedThemeToggler
        variant="star"
        duration={550}
        fromCenter
        className="size-16 rounded-full bg-black text-white dark:bg-white dark:text-black border border-white/20 dark:border-black/20 shadow-2xl hover:scale-105 transition-all"
      />
      <span className="text-xs text-zinc-400 font-mono">variant="star" (fromCenter)</span>
    </div>
  )
}

// 3. Diamond Shape Variant Showcase
export function ThemeTogglerDiamondDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-4",
        className
      )}
    >
      <AnimatedThemeToggler
        variant="diamond"
        duration={450}
        className="size-16 rounded-full bg-black text-white dark:bg-white dark:text-black border border-white/20 dark:border-black/20 shadow-2xl hover:scale-105 transition-all"
      />
      <span className="text-xs text-zinc-400 font-mono">variant="diamond"</span>
    </div>
  )
}

// 4. Hexagon Shape Variant Showcase
export function ThemeTogglerHexagonDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-4",
        className
      )}
    >
      <AnimatedThemeToggler
        variant="hexagon"
        duration={500}
        className="size-16 rounded-full bg-black text-white dark:bg-white dark:text-black border border-white/20 dark:border-black/20 shadow-2xl hover:scale-105 transition-all"
      />
      <span className="text-xs text-zinc-400 font-mono">variant="hexagon"</span>
    </div>
  )
}

// 5. Compact Real Component Card Preview for /blocks Grid matching media_1790460329226.png
export function ThemeTogglerBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <div className="flex size-14 items-center justify-center rounded-full bg-black text-white border border-white/20 shadow-2xl">
        <Sun className="size-6 text-white" />
      </div>
    </div>
  )
}
