"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TechStackItem {
  name: string
  icon?: React.ReactNode
}

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  titlePrefix?: string
  highlightedText?: string
  description?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  avatars?: string[]
  trustedText?: string
  className?: string
}

export function HeroSection({
  titlePrefix = "Build world class websites at",
  highlightedText = "warp speed",
  description = "Access an ever-growing collection of premium, meticulously crafted templates and component packs. Save time and focus on what matters—building standout websites that captivate your audience.",
  primaryCtaText = "Explore Collection",
  secondaryCtaText = "Unlock Unlimited Access",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80",
  ],
  trustedText = "Trusted by Founders and Entrepreneurs from all over the world",
  className,
  ...props
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white px-4 sm:px-8 py-16 sm:py-24 transition-colors select-none",
        className
      )}
      {...props}
    >
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Main Title with Selection Bounding Box */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          <span>{titlePrefix} </span>
          <span className="relative inline-block px-3 py-1 mt-1 sm:mt-0">
            {/* Selection Box Outline with Corner Handles */}
            <span className="absolute inset-0 border-2 border-dashed border-zinc-400 dark:border-zinc-500 rounded-lg bg-zinc-500/10 pointer-events-none" />
            <span className="absolute -top-1 -left-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -top-1 -right-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -bottom-1 -left-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -bottom-1 -right-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="relative z-10">{highlightedText}</span>
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>

        {/* CTA Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onPrimaryCtaClick}
            className="rounded-xl bg-black dark:bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-white dark:text-black hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            {primaryCtaText}
          </button>
          <button
            onClick={onSecondaryCtaClick}
            className="rounded-xl border border-zinc-300 dark:border-white/20 bg-transparent px-6 py-3 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            {secondaryCtaText}
          </button>
        </div>

        {/* Social Proof & Tech Stack Section */}
        <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-white/[0.08] w-full flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Avatar Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden p-1">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Founder ${i + 1}`}
                  className="inline-block size-8 sm:size-9 rounded-full ring-2 ring-white dark:ring-[#0A0A0A] object-cover"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
              {trustedText}
            </span>
          </div>

          {/* Tech Stack Logos */}
          <div className="flex items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="font-bold font-mono">▲</span>
              <span>Next.js</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-cyan-400 font-bold">⚛</span>
              <span>React</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-teal-400 font-bold">≈</span>
              <span>TailwindCSS</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-purple-400 font-bold">☲</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
