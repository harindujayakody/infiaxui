"use client"

import React from "react"
import { GlareHover } from "@/components/magicui/glare-hover"
import { Check, ArrowRight, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference screenshot (media_1790459905252.png)
export function GlareHoverDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <GlareHover
        className="w-full max-w-[340px] rounded-2xl border border-white/10 bg-[#161616] p-6 sm:p-7 shadow-2xl select-none text-left transition-transform hover:scale-[1.01]"
        color="#ffffff"
        opacity={0.3}
        angle={-45}
        size={250}
        duration={650}
      >
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Pro
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                For teams that need more.
              </p>
            </div>
            <span className="rounded-full bg-zinc-200 px-3 py-0.5 text-xs font-semibold text-zinc-900 shadow-sm">
              Popular
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline my-6">
            <span className="text-4xl font-extrabold text-white tracking-tight">
              $49
            </span>
            <span className="text-sm font-normal text-zinc-400 ml-1">/mo</span>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
              <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
              <span>Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
              <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
              <span>Team collaboration</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
              <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
              <span>Advanced analytics</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-500">
              <span className="mx-1 text-base leading-none">·</span>
              <span>SSO (coming soon)</span>
            </div>
          </div>

          {/* Action button */}
          <button className="w-full py-2.5 px-4 rounded-xl bg-zinc-200 hover:bg-white text-zinc-900 font-semibold text-sm transition-colors shadow-sm cursor-pointer">
            Get started
          </button>
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
        className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-[#161616] shadow-2xl select-none"
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
          <h3 className="text-lg font-bold text-white">
            Supercharge Your Workflow
          </h3>
          <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
            Gain access to cinematic interactive components and production blocks with instant copy-paste.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer">
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
        className="w-full max-w-md rounded-xl border border-amber-500/30 bg-amber-500/5 shadow-lg select-none"
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

// 4. Compact Card Preview for /blocks Grid matching the Pro card design
export function GlareHoverBlockCardPreview() {
  return (
    <div className="relative size-full flex items-center justify-center p-3 select-none">
      <GlareHover
        className="w-[90%] max-w-[280px] rounded-xl border border-white/10 bg-[#161616] p-3.5 shadow-xl text-left"
        color="#ffffff"
        opacity={0.35}
        angle={-45}
        size={250}
        duration={650}
      >
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-bold text-white">Pro</span>
              <p className="text-[10px] text-zinc-400">For teams that need more.</p>
            </div>
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[9px] font-semibold text-zinc-900">
              Popular
            </span>
          </div>

          <div className="flex items-baseline">
            <span className="text-xl font-extrabold text-white">$49</span>
            <span className="text-[10px] text-zinc-400 ml-1">/mo</span>
          </div>

          <div className="space-y-1 my-1">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
              <Check className="size-3 text-white" strokeWidth={2.5} />
              <span>Unlimited projects</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
              <Check className="size-3 text-white" strokeWidth={2.5} />
              <span>Team collaboration</span>
            </div>
          </div>

          <div className="w-full py-1 text-center rounded-lg bg-zinc-200 text-zinc-900 font-semibold text-[10px]">
            Get started
          </div>
        </div>
      </GlareHover>
    </div>
  )
}
