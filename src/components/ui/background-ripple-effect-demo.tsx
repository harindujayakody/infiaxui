"use client"

import React from "react"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"

// 1. Primary Showcase matching screenshot media_1790460815394.png
export function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-[440px] sm:min-h-[520px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-6 sm:p-10 select-none shadow-2xl">
      <BackgroundRippleEffect rows={9} cols={22} cellSize={48} />
      <div className="relative z-10 mx-auto max-w-4xl text-center pointer-events-none mt-4">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Interactive Background
          <br />
          Boxes Ripple Effect
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Hover over the boxes above and click. To be used on backgrounds of hero
          sections OR Call to Action sections. I beg you don&apos;t use it everywhere.
        </p>
      </div>
    </div>
  )
}

// 2. Blocks Page Preview (Compact interactive preview for /blocks)
export function BackgroundRippleEffectBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center p-4 select-none">
      <BackgroundRippleEffect rows={6} cols={14} cellSize={32} />
      <div className="relative z-10 text-center pointer-events-none px-4">
        <p className="text-sm font-bold text-white tracking-tight">
          Interactive Ripple Grid
        </p>
        <p className="text-[11px] text-neutral-400 mt-1">
          Click any cell to trigger radial wave
        </p>
      </div>
    </div>
  )
}
