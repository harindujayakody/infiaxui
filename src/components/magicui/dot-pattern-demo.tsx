"use client"

import React from "react"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference media_1790460446679.png
export function DotPatternDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <DotPattern
        width={16}
        height={16}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/50 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}

// 2. Linear Gradient Mask Showcase
export function DotPatternLinearGradientDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none",
        className
      )}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-3xl sm:text-4xl font-semibold tracking-tight text-white pointer-events-none">
        Linear Gradient Mask
      </p>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/40 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] [-webkit-mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />
    </div>
  )
}

// 3. Glowing Dots Animation Showcase
export function DotPatternGlowDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none",
        className
      )}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-3xl sm:text-4xl font-semibold tracking-tight text-white pointer-events-none">
        Animated Glow Effect
      </p>
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.5}
        glow={true}
        className="text-emerald-400/80 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}

// 4. Compact Real Component Card Preview for /blocks Grid matching media_1790460446679.png
export function DotPatternBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <DotPattern
        width={14}
        height={14}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/50 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
      />
    </div>
  )
}
