"use client"

import React from "react"
import { MagicCard } from "@/components/magicui/magic-card"
import { Sparkles, Layers, ArrowRight, ShieldCheck, Zap } from "lucide-react"

// 1. Default Spotlight Border & Gradient Demo
export function MagicCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <MagicCard
          gradientSize={240}
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
          gradientColor="#262626"
          gradientOpacity={0.6}
          className="p-6 cursor-pointer"
        >
          <div className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-main)]">
                Spotlight Gradient
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Smooth cursor-tracking spotlight border with customizable color spectrums and radial glows.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium pt-2">
              <span>Explore effects</span>
              <ArrowRight className="size-3.5" />
            </div>
          </div>
        </MagicCard>

        <MagicCard
          gradientSize={240}
          gradientFrom="#38bdf8"
          gradientTo="#818cf8"
          gradientColor="#262626"
          gradientOpacity={0.6}
          className="p-6 cursor-pointer"
        >
          <div className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-main)]">
                Dynamic Highlights
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Highlights borders on hover using GPU-accelerated motion templates and spring-damped curves.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium pt-2">
              <span>View details</span>
              <ArrowRight className="size-3.5" />
            </div>
          </div>
        </MagicCard>
      </div>
    </div>
  )
}

// 2. Orb Mode Demo
export function MagicCardOrbDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <MagicCard
        mode="orb"
        glowFrom="#ee4f27"
        glowTo="#6b21ef"
        glowAngle={90}
        glowSize={380}
        glowBlur={50}
        glowOpacity={0.85}
        gradientFrom="#f97316"
        gradientTo="#a855f7"
        className="w-full max-w-md p-8 cursor-pointer"
      >
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Zap className="size-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-main)]">
              Orb Spring Physics
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-sm leading-relaxed">
              Orb mode renders a luminous fluid sphere that springs smoothly toward your pointer with realistic inertial deceleration.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>Interactive Spring Damping</span>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}

// 3. Real Component Preview for /blocks Grid Card
export function MagicCardBlockPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#090A0F] p-4 select-none overflow-hidden">
      <MagicCard
        gradientSize={180}
        gradientFrom="#a855f7"
        gradientTo="#ec4899"
        gradientColor="#262626"
        gradientOpacity={0.65}
        className="w-full max-w-[280px] p-4 cursor-pointer"
      >
        <div className="flex flex-col gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/20">
            <Sparkles className="size-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white">Spotlight Glow</span>
            <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
              Cursor-following border spotlight with spring physics.
            </p>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}
