"use client"

import React from "react"
import { MorphingText } from "@/components/magicui/morphing-text"
import { cn } from "@/lib/utils"

const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
]

// 1. Primary Showcase matching user reference screenshot media_1790461103196.png
export function MorphingTextDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[340px] sm:h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 text-white shadow-2xl select-none",
        className
      )}
    >
      <MorphingText texts={texts} className="text-white" />
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid
export function MorphingTextBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <MorphingText
        texts={["Smooth", "Morphing", "Animation", "Magic UI"]}
        className="text-white text-3xl sm:text-4xl h-10 sm:h-12"
      />
    </div>
  )
}
