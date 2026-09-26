"use client"

import React from "react"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching screenshot media_1790461077497.png
export function FlickeringGridDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.15}
      />
    </div>
  )
}

// 2. Rounded Radial Gradient Mask Showcase
export function FlickeringGridRoundedDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[360px] sm:h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none",
        className
      )}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-3xl sm:text-4xl font-semibold tracking-tight text-white pointer-events-none mb-2">
        Flickering Grid
      </p>
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)] [-webkit-mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.2}
      />
    </div>
  )
}

// 3. Compact Real Component Card Preview for /blocks Grid
export function FlickeringGridBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full [mask-image:radial-gradient(circle_at_center,white,transparent_80%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_80%)]"
        squareSize={3}
        gridGap={4}
        color="#9CA3AF"
        maxOpacity={0.5}
        flickerChance={0.25}
      />
    </div>
  )
}
