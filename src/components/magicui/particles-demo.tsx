"use client"

import React, { useState } from "react"
import { RefreshCw } from "lucide-react"
import { Particles } from "@/components/magicui/particles"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference media_1790460477862.png
export function ParticlesDemo({ className }: { className?: string }) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div
      className={cn(
        "relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none",
        className
      )}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white pointer-events-none">
        Particles
      </p>

      <Particles
        key={refreshKey}
        className="absolute inset-0"
        quantity={110}
        ease={80}
        color="#ffffff"
        refresh={false}
      />

      {/* Subtle refresh button */}
      <button
        onClick={() => setRefreshKey((k) => k + 1)}
        className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616]/90 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#202020] hover:text-white shadow-lg active:scale-95"
        title="Reset particle field"
      >
        <RefreshCw className="size-3.5" />
        <span>Reset</span>
      </button>
    </div>
  )
}

// 2. Custom Color Field Showcase
export function ParticlesColorDemo({ className }: { className?: string }) {
  const [color, setColor] = useState("#38bdf8")

  const colors = [
    { label: "Sky Blue", value: "#38bdf8" },
    { label: "Emerald", value: "#10b981" },
    { label: "Violet", value: "#a855f7" },
    { label: "Amber", value: "#f59e0b" },
    { label: "White", value: "#ffffff" },
  ]

  return (
    <div
      className={cn(
        "relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-6",
        className
      )}
    >
      {/* Color switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 z-10">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(c.value)}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5",
              color === c.value
                ? "border-white/40 bg-white/10 text-white font-semibold"
                : "border-white/10 bg-[#161616] text-zinc-400 hover:text-white hover:border-white/20"
            )}
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: c.value }}
            />
            {c.label}
          </button>
        ))}
      </div>

      <p className="z-10 whitespace-pre-wrap text-center text-3xl sm:text-4xl font-bold tracking-tight text-white pointer-events-none">
        Interactive Field
      </p>

      <Particles
        className="absolute inset-0"
        quantity={130}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}

// 3. Compact Real Component Card Preview for /blocks Grid matching media_1790460477862.png
export function ParticlesBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <p className="z-10 text-2xl font-bold tracking-tight text-white pointer-events-none">
        Particles
      </p>
      <Particles
        className="absolute inset-0"
        quantity={45}
        ease={80}
        color="#ffffff"
      />
    </div>
  )
}
