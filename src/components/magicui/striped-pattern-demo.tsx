"use client"

import React from "react"
import { StripedPattern } from "@/components/magicui/striped-pattern"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching media_1790460098994.png
export function StripedPatternDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <StripedPattern
        direction="left"
        width={14}
        height={14}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}

// 2. Right Direction Showcase
export function StripedPatternRightDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <StripedPattern
        direction="right"
        width={16}
        height={16}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}

// 3. Dashed Variant Showcase
export function StripedPatternDashedDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <StripedPattern
        direction="left"
        width={16}
        height={16}
        strokeDasharray="4 4"
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}

// 4. Compact Real Component Card Preview for /blocks Grid
export function StripedPatternBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <StripedPattern
        direction="left"
        width={12}
        height={12}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
      />
    </div>
  )
}
