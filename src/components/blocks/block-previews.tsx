"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, User, Cloud, Database, Cpu, Layers, Star, Zap, Terminal } from "lucide-react"

// 1. Image Generation Loader Preview (Matches Card 1 from screenshot)
export function ImageGenerationLoaderPreview() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full rounded-xl overflow-hidden bg-[#0c0d12] flex items-center justify-center p-3 border border-white/[0.06] group/loader"
    >
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:12px_12px]" />

      {/* Main Inner Card Graphic */}
      <div className="relative z-10 w-[88%] h-[82%] rounded-lg bg-[#12141c] border border-blue-500/20 overflow-hidden flex flex-col justify-between p-3 shadow-2xl">
        {/* Subtle top header simulation */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-300">Prompt: Cybernetic garden</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            92%
          </span>
        </div>

        {/* Center Artwork Mockup with Scanning Beam */}
        <div className="relative flex-1 my-2 rounded bg-gradient-to-br from-indigo-950/60 via-purple-900/40 to-slate-900 overflow-hidden flex items-center justify-center border border-white/[0.05]">
          {/* Neon landscape illustration */}
          <div className="relative size-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 blur-sm opacity-60" />
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950 to-transparent opacity-90" />

          {/* Sweeping Laser Scan Beam */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)] z-20"
          />

          {/* Shimmering pixel dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px] opacity-25" />
        </div>

        {/* Bottom User Pill */}
        <div className="flex items-center gap-2 pt-1">
          <div className="size-4 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-[8px] text-white font-bold">
            G
          </div>
          <span className="text-[10px] text-zinc-400 font-mono truncate">
            Generating pixel lattice...
          </span>
        </div>
      </div>
    </div>
  )
}

// 2. Chromatic Image Preview (Matches Card 2 from screenshot)
export function ChromaticImagePreview() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    setOffset({ x, y })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
      className="relative w-full h-full rounded-xl overflow-hidden bg-[#0d0e12] flex items-center justify-center p-3 border border-white/[0.06] cursor-pointer"
    >
      {/* Artwork container with chromatic RGB split & 3D tilt */}
      <motion.div
        animate={{
          rotateY: offset.x * 1.5,
          rotateX: -offset.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-[85%] h-[88%] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-sky-900 via-amber-900/60 to-emerald-950"
      >
        {/* Layer 1: Red Channel Displacement */}
        <div
          style={{
            transform: isHovered
              ? `translate(${offset.x * 0.8}px, ${offset.y * 0.8}px)`
              : "translate(0, 0)",
          }}
          className="absolute inset-0 mix-blend-screen opacity-70 transition-transform duration-100 bg-gradient-to-tr from-rose-600/40 via-amber-500/30 to-sky-600/40"
        />

        {/* Layer 2: Cyan Channel Displacement */}
        <div
          style={{
            transform: isHovered
              ? `translate(${-offset.x * 0.8}px, ${-offset.y * 0.8}px)`
              : "translate(0, 0)",
          }}
          className="absolute inset-0 mix-blend-screen opacity-70 transition-transform duration-100 bg-gradient-to-bl from-cyan-600/40 via-emerald-500/30 to-blue-600/40"
        />

        {/* Painted Sunset Sky Graphic matching screenshot */}
        <div className="relative size-full flex flex-col justify-between p-3 select-none">
          {/* Dramatic Glowing Clouds */}
          <div className="space-y-1">
            <div className="w-16 h-3 rounded-full bg-gradient-to-r from-amber-200 to-orange-400 blur-[2px] opacity-80" />
            <div className="w-24 h-5 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-amber-200 blur-[3px] opacity-90 ml-2" />
          </div>

          {/* Solitary figure / mountain silhouette */}
          <div className="flex items-end justify-between">
            <div className="size-3.5 rounded-full bg-indigo-950 border border-amber-300/40 shadow-sm" />
            <span className="text-[9px] font-mono text-amber-200/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
              RGB Tilt
            </span>
          </div>
        </div>

        {/* Highlighting sheen on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  )
}

// 3. Cloud Shader Preview (Matches Card 3 from screenshot)
export function CloudShaderPreview() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#2563eb] via-[#60a5fa] to-[#93c5fd] flex flex-col justify-between p-3.5 border border-white/[0.08] shadow-inner">
      {/* Procedural Drifting Clouds */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 size-40 rounded-full bg-white/40 blur-xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 -right-8 size-48 rounded-full bg-white/30 blur-2xl pointer-events-none"
      />

      {/* Hero Text */}
      <div className="relative z-10 text-center space-y-1 pt-1">
        <h4 className="text-white text-xs font-bold tracking-tight drop-shadow-sm">
          Banking above the clouds
        </h4>
        <p className="text-white/80 text-[10px] max-w-[180px] mx-auto leading-tight truncate">
          Soft procedural clouds with organic drift
        </p>
      </div>

      {/* Translucent SaaS Dashboard Mockup underneath */}
      <div className="relative z-10 w-full rounded-lg bg-white/90 backdrop-blur-md p-2 shadow-lg border border-white/40 space-y-1.5 text-zinc-800">
        <div className="flex items-center justify-between text-[9px] font-medium text-zinc-600">
          <span>Total Balance</span>
          <span className="text-blue-600 font-bold">$124,500</span>
        </div>
        {/* Mini Chart Bars */}
        <div className="flex items-end gap-1 h-5 pt-1">
          <div className="flex-1 bg-blue-200 rounded-t h-2" />
          <div className="flex-1 bg-blue-300 rounded-t h-3.5" />
          <div className="flex-1 bg-blue-500 rounded-t h-5" />
          <div className="flex-1 bg-blue-400 rounded-t h-4" />
          <div className="flex-1 bg-blue-600 rounded-t h-4.5" />
        </div>
      </div>
    </div>
  )
}

// 4. Hero Sections Preview (Matches Card 4 from screenshot with gold star badge)
export function HeroSectionsPreview() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#090a0f] flex flex-col justify-between p-3.5 border border-white/[0.08] group/hero">
      {/* Top Right Star Badge */}
      <div className="absolute top-2.5 right-2.5 z-20 size-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
        <Star className="size-3 fill-amber-400 text-amber-400" />
      </div>

      {/* Background Matrix Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-transparent opacity-80" />

      {/* Mini Hero Mockup */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-2 space-y-1.5">
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
          v2.4 Released
        </span>
        <h4 className="text-white text-[11px] font-bold leading-tight max-w-[200px] tracking-tight">
          Convert Figma to code with pixel perfect accuracy.
        </h4>
        <p className="text-zinc-400 text-[9px] max-w-[170px] leading-tight truncate">
          Production code generated in seconds
        </p>

        {/* Mini CTA Button */}
        <div className="pt-1">
          <div className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-medium shadow-md shadow-blue-500/20 flex items-center gap-1 transition-colors">
            <span>Start Free</span>
            <ArrowRight className="size-2.5" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Animated Beam Mini Preview
export function AnimatedBeamMiniPreview() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0c0d12] flex items-center justify-between px-6 border border-white/[0.06]">
      {/* Node 1 */}
      <div className="relative z-10 size-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400 shadow-md">
        <User className="size-4" />
      </div>

      {/* Flowing Laser SVG Beam */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 50 80 Q 120 40 190 80"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <motion.path
          d="M 50 80 Q 120 40 190 80"
          fill="none"
          stroke="url(#beam-gradient-mini)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="40 180"
          animate={{
            strokeDashoffset: [220, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <defs>
          <linearGradient id="beam-gradient-mini" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Node 2 */}
      <div className="relative z-10 size-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-purple-400 shadow-md">
        <Cloud className="size-4" />
      </div>
    </div>
  )
}

// 6. Bento Grid Mini Preview
export function BentoGridMiniPreview() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0a0f] p-3 border border-white/[0.06] flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {/* Cell 1 */}
        <div className="col-span-2 rounded-lg bg-zinc-900/90 border border-white/10 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-400">Analytics</span>
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded" />
        </div>
        {/* Cell 2 */}
        <div className="col-span-1 rounded-lg bg-zinc-900/90 border border-white/10 p-2 flex flex-col items-center justify-center">
          <Cpu className="size-4 text-cyan-400" />
          <span className="text-[8px] font-mono text-zinc-400 mt-1">99.8%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 h-9">
        <div className="col-span-1 rounded-lg bg-zinc-900/90 border border-white/10 flex items-center justify-center">
          <Zap className="size-3.5 text-amber-400" />
        </div>
        <div className="col-span-2 rounded-lg bg-zinc-900/90 border border-white/10 px-2 flex items-center justify-between text-[9px] text-zinc-400 font-mono">
          <span>Fast Deploy</span>
          <span className="text-emerald-400 font-bold">12ms</span>
        </div>
      </div>
    </div>
  )
}

// 7. Interactive Globe Mini Preview
export function GlobeMiniPreview() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07080c] flex items-center justify-center p-3 border border-white/[0.06]">
      <div className="relative size-24 rounded-full border border-blue-500/30 bg-blue-950/20 shadow-[0_0_30px_rgba(59,130,246,0.25)] flex items-center justify-center overflow-hidden">
        {/* Lat / Long lines */}
        <div className="absolute inset-x-0 h-[1px] bg-blue-400/30" />
        <div className="absolute inset-y-0 w-[1px] bg-blue-400/30" />
        <div className="absolute size-20 rounded-full border border-blue-400/20" />
        <div className="absolute size-14 rounded-full border border-cyan-400/30" />

        {/* Rotating Connection Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-full"
        />

        <div className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
      </div>
    </div>
  )
}

// 8. Dock Mini Preview
export function DockMiniPreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const icons = [User, Cloud, Database, Cpu, Layers]

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0c0d12] flex items-end justify-center pb-4 border border-white/[0.06]">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-2xl">
        {icons.map((Icon, idx) => {
          const isHovered = hoveredIdx === idx
          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                scale: isHovered ? 1.35 : 1,
                y: isHovered ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="size-7 rounded-xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 cursor-pointer shadow"
            >
              <Icon className="size-3.5" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
