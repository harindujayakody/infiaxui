"use client"

import React from "react"
import { Ripple } from "@/components/magicui/ripple"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching media_1790460056038.png
export function RippleDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-4xl sm:text-5xl font-bold tracking-tight text-white pointer-events-none">
        Ripple
      </p>
      <Ripple />
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid matching media_1790460056038.png
export function RippleBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <p className="z-10 text-xl sm:text-2xl font-bold tracking-tight text-white pointer-events-none">
        Ripple
      </p>
      <Ripple mainCircleSize={110} numCircles={5} />
    </div>
  )
}
