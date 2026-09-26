"use client"

import React from "react"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference screenshot media_1790461238882.png
export function BackgroundGradientAnimationDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[440px] sm:h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl select-none",
        className
      )}
    >
      <BackgroundGradientAnimation containerClassName="absolute inset-0 size-full">
        <div className="absolute z-50 inset-0 flex items-center justify-center px-4 pointer-events-none select-none text-center">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/95 via-white/80 to-white/30">
            Gradients X Animations
          </p>
        </div>
      </BackgroundGradientAnimation>
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid
export function BackgroundGradientAnimationBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] select-none">
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0 size-full"
        size="70%"
      >
        <div className="absolute z-50 inset-0 flex items-center justify-center px-3 pointer-events-none text-center">
          <p className="text-base sm:text-lg font-bold tracking-tight bg-clip-text text-transparent drop-shadow-lg bg-gradient-to-b from-white/95 to-white/40">
            Gradients X Animations
          </p>
        </div>
      </BackgroundGradientAnimation>
    </div>
  )
}
