"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2, CheckCircle2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImageGenerationLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  duration?: number
  autoStart?: boolean
  className?: string
  statusMessages?: string[]
  onComplete?: () => void
}

const DEFAULT_STATUS_MESSAGES = [
  "Sampling latent noise...",
  "Applying diffusion step 14/50...",
  "Synthesizing high-frequency lattice...",
  "Enhancing color grading & dynamic range...",
  "Finalizing render...",
]

export function ImageGenerationLoader({
  src,
  alt = "Generated Artwork",
  duration = 4000,
  autoStart = true,
  className,
  statusMessages = DEFAULT_STATUS_MESSAGES,
  onComplete,
  ...props
}: ImageGenerationLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(autoStart)
  const [messageIndex, setMessageIndex] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const startGeneration = () => {
    setIsGenerating(true)
    setProgress(0)
    setMessageIndex(0)
    startTimeRef.current = performance.now()

    const update = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(rawPct)

      const msgIdx = Math.min(
        statusMessages.length - 1,
        Math.floor((rawPct / 100) * statusMessages.length)
      )
      setMessageIndex(msgIdx)

      if (rawPct < 100) {
        animationFrameRef.current = requestAnimationFrame(update)
      } else {
        setIsGenerating(false)
        onComplete?.()
      }
    }

    animationFrameRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    if (autoStart) {
      startGeneration()
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [autoStart, duration])

  return (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] p-3 sm:p-4 shadow-2xl group select-none",
        className
      )}
      {...props}
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2.5 rounded-full transition-colors",
              isGenerating ? "bg-cyan-400 animate-pulse" : "bg-emerald-400"
            )}
          />
          <span className="text-xs font-mono font-medium text-zinc-300">
            {isGenerating ? "Generating Neural Asset" : "Generation Complete"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
            {progress}%
          </span>
          {!isGenerating && (
            <button
              onClick={startGeneration}
              title="Regenerate"
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Frame Container */}
      <div className="relative aspect-[4/3] w-full my-3 rounded-xl overflow-hidden bg-black/80 border border-white/[0.08] flex items-center justify-center">
        {/* Base Image */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isGenerating ? "scale-105 filter blur-md contrast-125" : "scale-100 filter blur-0"
          )}
        />

        {/* Progress-based Image Reveal Slice */}
        {isGenerating && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`,
            }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover scale-100 filter blur-0 brightness-110"
            />
          </div>
        )}

        {/* Grid Lattice Overlay */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isGenerating ? "opacity-40" : "opacity-0"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Sweeping Laser Scanner Line */}
        {isGenerating && (
          <div
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgba(34,211,238,1)] z-20 pointer-events-none transition-all duration-75 ease-out"
            style={{
              top: `${progress}%`,
            }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-3 bg-cyan-300 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
          </div>
        )}

        {/* Random Pixel Noise Matrix overlay when actively generating */}
        {isGenerating && (
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-cyan-950/20 to-black/60 pointer-events-none mix-blend-overlay" />
        )}
      </div>

      {/* Status Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <Loader2 className="size-3.5 text-cyan-400 animate-spin" />
          ) : (
            <CheckCircle2 className="size-3.5 text-emerald-400" />
          )}
          <span className="text-xs font-mono text-zinc-400 truncate max-w-[260px] sm:max-w-xs">
            {isGenerating ? statusMessages[messageIndex] : "Render completed in 4.0s"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <Sparkles className="size-3 text-cyan-400/80" />
          <span>SDXL Turbo</span>
        </div>
      </div>
    </div>
  )
}
