"use client"

import React from "react"
import { HeroSection } from "@/components/ui/hero-section"
import { LayoutTemplate, Sparkles, ArrowRight, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSectionDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl select-none",
        className
      )}
    >
      <HeroSection />

      {/* Bottom Feature Preview Strip matching screenshot */}
      <div className="border-t border-white/[0.08] bg-[#0c0d12] p-6 sm:p-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Idea to website in <br />
              <span className="text-blue-400">minutes, not hours.</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ship production-ready landing pages with pre-built modular blocks designed for conversion.
            </p>
          </div>

          {/* DevStudio Mini Window Mockup */}
          <div className="w-full md:w-auto flex-1 max-w-md rounded-xl border border-white/10 bg-[#14161f] p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded bg-blue-500" />
                <span className="text-xs font-bold text-white font-mono">DevStudio</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                <span>Work</span>
                <span>Services</span>
                <span>Pricing</span>
                <span>Contact</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 rounded bg-white/10 w-4/5" />
              <div className="h-2 rounded bg-white/5 w-3/5" />
              <div className="h-16 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-white/5 mt-2 flex items-center justify-center text-[10px] text-zinc-400">
                Interactive Showcase Frame
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSectionsBlockPreview() {
  return (
    <div className="relative size-full flex flex-col justify-between overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <div className="space-y-1.5 text-center pt-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono">
          25+ Layouts
        </span>
        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
          Build world class websites at{" "}
          <span className="border border-dashed border-zinc-500 px-1 rounded bg-white/5 text-blue-400">
            warp speed
          </span>
        </h4>
        <p className="text-[9px] text-zinc-400 max-w-[200px] mx-auto truncate">
          Meticulously crafted hero layouts and components.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 py-2">
        <span className="px-2.5 py-1 rounded-md bg-white text-black text-[8px] font-bold">
          Explore
        </span>
        <span className="px-2.5 py-1 rounded-md border border-white/20 text-white text-[8px] font-medium">
          Access
        </span>
      </div>

      <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[8px] text-zinc-500">
        <span>Trusted by 10k+ founders</span>
        <div className="flex items-center gap-1 font-mono text-zinc-400">
          <span>▲ Next.js</span>
          <span>⚛ React</span>
        </div>
      </div>
    </div>
  )
}
