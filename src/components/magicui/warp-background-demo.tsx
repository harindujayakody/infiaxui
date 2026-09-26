"use client"

import React from "react"
import { WarpBackground } from "@/components/magicui/warp-background"
import { Sparkles, Trophy, Rocket } from "lucide-react"

// 1. Default Warp Background Demo matching user screenshot (media_1790455223368.png)
export function WarpBackgroundDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <WarpBackground
        perspective={120}
        beamsPerSide={4}
        beamSize={5}
        beamDuration={3.5}
        className="w-full max-w-xl min-h-[360px] p-6 sm:p-12 shadow-2xl"
      >
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl max-w-md text-left transition-all hover:scale-[1.01]">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] tracking-tight">
            Congratulations on Your Promotion!
          </h3>
          <p className="mt-2.5 text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
            Your hard work and dedication have paid off. We're thrilled to see you take this next step in your career. Keep up the fantastic work!
          </p>
        </div>
      </WarpBackground>
    </div>
  )
}

// 2. High-Speed Warp Tunnel Demo
export function WarpBackgroundCustomDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <WarpBackground
        perspective={160}
        beamsPerSide={6}
        beamSize={4}
        beamDuration={1.8}
        className="w-full max-w-xl min-h-[340px] p-6 sm:p-10 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 p-6 backdrop-blur-md shadow-2xl text-center max-w-sm">
          <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Rocket className="size-5" />
          </div>
          <h4 className="text-base font-semibold text-[var(--text-main)]">
            Hyperdrive Acceleration
          </h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Configured with higher beam density (<code className="font-mono text-purple-300">beamsPerSide=6</code>) and accelerated flow duration (<code className="font-mono text-purple-300">beamDuration=1.8s</code>).
          </p>
        </div>
      </WarpBackground>
    </div>
  )
}

// 3. Real Component Preview for /blocks Grid Card
export function WarpBackgroundBlockPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#090A0F] p-3 select-none overflow-hidden">
      <WarpBackground
        perspective={90}
        beamsPerSide={3}
        beamSize={6}
        beamDuration={2.8}
        className="w-full h-full min-h-[170px] p-2 sm:p-3 border-0 bg-transparent flex items-center justify-center rounded-none"
      >
        <div className="rounded-xl border border-white/15 bg-zinc-900/90 px-4 py-3 backdrop-blur-md shadow-xl max-w-[240px] text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white">
            <Trophy className="size-3.5 text-amber-400" />
            <span>Promotion Warp</span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-400 leading-snug line-clamp-2">
            Time warping perspective background with floating beams.
          </p>
        </div>
      </WarpBackground>
    </div>
  )
}
