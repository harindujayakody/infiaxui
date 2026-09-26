"use client"

import React from "react"
import { Floating3DParticles } from "@/components/magicui/floating-3d-particles"
import { ArrowRight, Sparkles } from "lucide-react"

// 1. Default Demo matching user screenshot (media_1790455252964.png)
export function Floating3DParticlesDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <div className="relative flex min-h-[420px] w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-6 text-center shadow-2xl">
        {/* Pseudo-3D Floating Particle Field */}
        <Floating3DParticles
          color="#FFFFFF"
          quantity={360}
          size={4}
          opacity={0.32}
          drift={0.75}
          depth={0.65}
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-lg space-y-3 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Build something magical
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-md mx-auto">
            A pseudo-3D particle background that stays behind your content with continuous rotation and buoyant drift.
          </p>
          <div className="pt-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black transition-all hover:bg-zinc-200 hover:scale-105 shadow-lg cursor-pointer">
              <span>Get Started</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Colored Particle Field Demo (Purple / Blue accent)
export function Floating3DParticlesColorDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <div className="relative flex min-h-[360px] w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center shadow-2xl">
        <Floating3DParticles
          color="#8B5CF6"
          quantity={320}
          size={5}
          opacity={0.4}
          drift={0.6}
          depth={0.7}
        />

        <div className="relative z-10 max-w-md space-y-2.5 px-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300">
            <Sparkles className="size-3 text-purple-400" />
            <span>Violet Atmosphere</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-main)]">
            Depth-Aware Projection
          </h3>
          <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
            Particles scale according to simulated Z-depth and sort using the painter&apos;s algorithm for realistic layering.
          </p>
        </div>
      </div>
    </div>
  )
}

// 3. Real Component Preview for /blocks Grid Card
export function Floating3DParticlesBlockPreview() {
  return (
    <div className="relative w-full h-full min-h-[170px] flex items-center justify-center bg-[#090A0F] p-4 select-none overflow-hidden">
      <Floating3DParticles
        color="#FFFFFF"
        quantity={120}
        size={3.5}
        opacity={0.35}
        drift={0.6}
        depth={0.6}
      />
      <div className="relative z-10 text-center px-2">
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-white">
          <Sparkles className="size-3.5 text-purple-400" />
          <span>3D Particle Field</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-400 leading-snug line-clamp-2">
          Depth-aware particle field with continuous rotation and buoyant drift.
        </p>
      </div>
    </div>
  )
}
