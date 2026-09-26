"use client"

import React from "react"
import { GlareHover } from "@/components/magicui/glare-hover"
import { Sparkles, ArrowRight, ShieldCheck, Zap, AlertTriangle, Layers } from "lucide-react"

// 1. Default Demo (Main Showcase)
export function GlareHoverDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <GlareHover
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl transition-transform hover:scale-[1.01]"
        color="#ffffff"
        opacity={0.35}
        angle={-45}
        size={260}
        duration={600}
      >
        <div className="flex max-w-sm flex-col gap-3 p-6 text-left">
          <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--text-main)]">
              Diagonal Light Glare
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Hover over this card to watch a smooth optical diagonal glare sweep across the surface using native CSS variables.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Zero extra keyframes</span>
          </div>
        </div>
      </GlareHover>
    </div>
  )
}

// 2. CTA Demo
export function GlareHoverDemoCTA() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <GlareHover
        className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-[var(--bg-card)] shadow-2xl"
        color="#a78bfa"
        opacity={0.4}
        angle={-35}
        size={300}
        duration={550}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Pro Features Unlocked
          </span>
          <h3 className="text-lg font-bold text-[var(--text-main)]">
            Supercharge Your Workflow
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
            Gain access to cinematic interactive components and production blocks with instant copy-paste.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90 transition-opacity">
            <span>Get Started</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </GlareHover>
    </div>
  )
}

// 3. Alert Demo
export function GlareHoverDemoAlert() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <GlareHover
        className="w-full max-w-md rounded-xl border border-amber-500/30 bg-amber-500/5 shadow-lg"
        color="#fbbf24"
        opacity={0.3}
        angle={-50}
        size={240}
        duration={500}
      >
        <div className="flex items-start gap-3.5 p-4 text-left">
          <AlertTriangle className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-semibold text-amber-200">
              High Traffic Volume Detected
            </h5>
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              API concurrency reached 94% of allocated threshold. Hover to verify automated rate limit scaling status.
            </p>
          </div>
        </div>
      </GlareHover>
    </div>
  )
}

// 4. Compact Card Preview for /blocks Grid
export function GlareHoverBlockCardPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 select-none">
      <GlareHover
        className="w-[90%] rounded-xl border border-white/10 bg-[#12141c] p-4 shadow-xl"
        color="#60a5fa"
        opacity={0.45}
        angle={-45}
        size={260}
        duration={600}
      >
        <div className="flex flex-col gap-2.5 w-full text-left">
          <div className="flex items-center justify-between">
            <div className="size-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="size-4" />
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Hover Me
            </span>
          </div>
          <div className="space-y-1">
            <div className="h-3 w-28 bg-white/20 rounded animate-pulse" />
            <div className="h-2 w-36 bg-white/10 rounded" />
          </div>
        </div>
      </GlareHover>
    </div>
  )
}
