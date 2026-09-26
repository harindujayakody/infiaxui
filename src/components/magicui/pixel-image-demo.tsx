"use client"

import React, { useState } from "react"
import { RotateCcw } from "lucide-react"
import { PixelImage, type PredefinedGridKey } from "@/components/magicui/pixel-image"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference media_1790460165009.png
export function PixelImageDemo({ className }: { className?: string }) {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div
      className={cn(
        "relative flex min-h-[460px] sm:min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none",
        className
      )}
    >
      <div className="relative">
        <PixelImage
          key={replayKey}
          src="/pixel-image-demo.png"
          grid="6x4"
          grayscaleAnimation={true}
          pixelFadeInDuration={1000}
          maxAnimationDelay={1200}
          colorRevealDelay={1300}
          className="h-72 w-72 md:h-80 md:w-80 shadow-2xl"
          alt="Nyhavn Copenhagen canal with colorful buildings and red boat"
        />

        {/* Replay action control */}
        <button
          onClick={() => setReplayKey((prev) => prev + 1)}
          className="absolute -bottom-4 right-0 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616]/90 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#202020] hover:text-white shadow-lg active:scale-95"
          title="Replay pixel animation"
        >
          <RotateCcw className="size-3.5" />
          <span>Replay</span>
        </button>
      </div>
    </div>
  )
}

// 2. Grid Variant Showcase with Interactive Selector
export function PixelImageGridDemo({ className }: { className?: string }) {
  const [selectedGrid, setSelectedGrid] = useState<PredefinedGridKey>("8x8")
  const [key, setKey] = useState(0)

  const handleSelect = (g: PredefinedGridKey) => {
    setSelectedGrid(g)
    setKey((prev) => prev + 1)
  }

  const grids: PredefinedGridKey[] = ["6x4", "8x8", "8x3", "4x6", "3x8"]

  return (
    <div
      className={cn(
        "relative flex min-h-[440px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none gap-6",
        className
      )}
    >
      {/* Grid selector buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 z-10">
        {grids.map((g) => (
          <button
            key={g}
            onClick={() => handleSelect(g)}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-lg border transition-all",
              selectedGrid === g
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold"
                : "border-white/10 bg-[#161616] text-zinc-400 hover:text-white hover:border-white/20"
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <PixelImage
        key={key}
        src="/pixel-image-demo.png"
        grid={selectedGrid}
        grayscaleAnimation={true}
        className="h-64 w-64 md:h-72 md:w-72 shadow-2xl"
        alt="Pixel Image Grid variation"
      />
    </div>
  )
}

// 3. Compact Real Component Card Preview for /blocks Grid matching media_1790460165009.png
export function PixelImageBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <div className="relative size-36 sm:size-40 overflow-hidden rounded-2xl shadow-xl border border-white/10">
        <PixelImage
          src="/pixel-image-demo.png"
          grid="6x4"
          grayscaleAnimation={true}
          pixelFadeInDuration={800}
          maxAnimationDelay={900}
          colorRevealDelay={1000}
          className="size-full"
          alt="Pixel Image card preview"
        />
      </div>
    </div>
  )
}
