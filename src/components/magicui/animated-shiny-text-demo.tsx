"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

// 1. Primary Showcase matching media_1790456130219.png
export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex min-h-[220px] sm:min-h-[260px] w-full items-center justify-center p-6 select-none">
      <div
        className={cn(
          "group rounded-full border border-white/10 bg-[#161616] px-4 py-1.5 text-sm sm:text-base text-zinc-300 transition-all ease-in hover:cursor-pointer hover:border-zinc-700 hover:bg-zinc-800/90 shadow-lg inline-flex items-center"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-white hover:duration-300">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-300 text-sm">✨</span>
            <span>Introducing Magic UI</span>
          </span>
          <ArrowRight className="ml-1.5 size-3.5 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:text-zinc-200" />
        </AnimatedShinyText>
      </div>
    </div>
  )
}

// 2. Headline Variation Demo
export function AnimatedShinyTextHeadlineDemo() {
  return (
    <div className="flex flex-col gap-6 w-full items-center justify-center p-6 text-center select-none">
      <div className="space-y-3 max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          <AnimatedShinyText shimmerWidth={140} className="font-extrabold text-transparent">
            Build Faster With Modern UI
          </AnimatedShinyText>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Deliver captivating visual polish with smooth, high-performance CSS gradient animations.
        </p>
      </div>
    </div>
  )
}

// 3. Compact Real Component Card Preview for /blocks Grid
export function AnimatedShinyTextBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 select-none">
      <div
        className={cn(
          "group rounded-full border border-white/10 bg-[#161616] px-3.5 py-1.5 text-xs text-zinc-300 transition-all ease-in hover:cursor-pointer hover:border-zinc-700 hover:bg-zinc-800/90 shadow-md inline-flex items-center"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-300 text-xs">✨</span>
            <span>Introducing Magic UI</span>
          </span>
          <ArrowRight className="ml-1 size-3 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:text-zinc-200" />
        </AnimatedShinyText>
      </div>
    </div>
  )
}
