"use client"

import React, { useState } from "react"
import { RotateCcw } from "lucide-react"
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference media_1790460196920.png
export function DiaTextRevealDemo({ className }: { className?: string }) {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white">
          <DiaTextReveal
            key={replayKey}
            text="Magic"
            repeat
            repeatDelay={1.5}
            duration={1.6}
            textColor="#ffffff"
          />
        </h2>
      </div>

      {/* Manual replay control */}
      <button
        onClick={() => setReplayKey((k) => k + 1)}
        className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616]/90 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#202020] hover:text-white shadow-lg active:scale-95"
        title="Replay reveal sweep"
      >
        <RotateCcw className="size-3.5" />
        <span>Replay</span>
      </button>
    </div>
  )
}

// 2. Custom Gradient Showcase
export function DiaTextRevealCustomGradientDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none text-center",
        className
      )}
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
        Experience{" "}
        <DiaTextReveal
          text="hyper speed"
          colors={["#38bdf8", "#818cf8", "#c084fc", "#f472b6"]}
          repeat
          repeatDelay={1.4}
          duration={1.5}
          textColor="#ffffff"
        />
      </h3>
    </div>
  )
}

// 3. Rotating Phrases Showcase
export function DiaTextRevealRotatingDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none text-center",
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
        Learn to{" "}
        <DiaTextReveal
          repeat
          repeatDelay={1.2}
          text={["build faster", "ship smarter", "scale easier"]}
          textColor="#ffffff"
          duration={1.4}
        />
      </h2>
    </div>
  )
}

// 4. Compact Real Component Card Preview for /blocks Grid matching media_1790460196920.png
export function DiaTextRevealBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        <DiaTextReveal
          text="Magic"
          repeat
          repeatDelay={1.5}
          duration={1.5}
          textColor="#ffffff"
        />
      </span>
    </div>
  )
}
