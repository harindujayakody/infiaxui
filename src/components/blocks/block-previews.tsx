"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, User, Cloud, Database, Cpu, Layers, Zap, Bot } from "lucide-react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

// 1. Image Generation Loader Preview (Matches Card 1 from screenshot)
export function ImageGenerationLoaderPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-3 group/loader bg-[#090A0F]">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:12px_12px]" />

      {/* Main Inner Card Graphic */}
      <div className="relative z-10 w-[90%] h-[84%] rounded-xl bg-[#12141c] border border-blue-500/20 overflow-hidden flex flex-col justify-between p-3 shadow-2xl">
        {/* Top header simulation */}
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
        <div className="relative flex-1 my-2 rounded-lg bg-gradient-to-br from-indigo-950/60 via-purple-900/40 to-slate-900 overflow-hidden flex items-center justify-center border border-white/[0.05]">
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
      className="relative w-full h-full overflow-hidden flex items-center justify-center p-3 cursor-pointer bg-[#0A0A0E]"
    >
      <motion.div
        animate={{
          rotateY: offset.x * 1.5,
          rotateX: -offset.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-[85%] h-[90%] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-sky-900 via-amber-900/60 to-emerald-950"
      >
        <div
          style={{
            transform: isHovered
              ? `translate(${offset.x * 0.8}px, ${offset.y * 0.8}px)`
              : "translate(0, 0)",
          }}
          className="absolute inset-0 mix-blend-screen opacity-70 transition-transform duration-100 bg-gradient-to-tr from-rose-600/40 via-amber-500/30 to-sky-600/40"
        />

        <div
          style={{
            transform: isHovered
              ? `translate(${-offset.x * 0.8}px, ${-offset.y * 0.8}px)`
              : "translate(0, 0)",
          }}
          className="absolute inset-0 mix-blend-screen opacity-70 transition-transform duration-100 bg-gradient-to-bl from-cyan-600/40 via-emerald-500/30 to-blue-600/40"
        />

        <div className="relative size-full flex flex-col justify-between p-3 select-none">
          <div className="space-y-1">
            <div className="w-16 h-3 rounded-full bg-gradient-to-r from-amber-200 to-orange-400 blur-[2px] opacity-80" />
            <div className="w-24 h-5 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-amber-200 blur-[3px] opacity-90 ml-2" />
          </div>

          <div className="flex items-end justify-between">
            <div className="size-3.5 rounded-full bg-indigo-950 border border-amber-300/40 shadow-sm" />
            <span className="text-[9px] font-mono text-amber-200/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
              RGB Tilt
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  )
}

// 3. Cloud Shader Preview (Matches Card 3 from screenshot)
export function CloudShaderPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#2563eb] via-[#60a5fa] to-[#93c5fd] flex flex-col justify-between p-4 shadow-inner">
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

      <div className="relative z-10 text-center space-y-1 pt-1">
        <h4 className="text-white text-xs font-bold tracking-tight drop-shadow-sm">
          Banking above the clouds
        </h4>
        <p className="text-white/80 text-[10px] max-w-[180px] mx-auto leading-tight truncate">
          Soft procedural clouds with organic drift
        </p>
      </div>

      <div className="relative z-10 w-full rounded-lg bg-white/90 backdrop-blur-md p-2 shadow-lg border border-white/40 space-y-1.5 text-zinc-800">
        <div className="flex items-center justify-between text-[9px] font-medium text-zinc-600">
          <span>Total Balance</span>
          <span className="text-blue-600 font-bold">$124,500</span>
        </div>
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

// 4. Hero Sections Preview (Matches Card 4 from screenshot)
export function HeroSectionsPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#090a0f] flex flex-col justify-between p-4 group/hero">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-transparent opacity-80" />

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

// 5. Animated Beam Real Component Showcase on Card
export function AnimatedBeamMiniPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-between overflow-hidden bg-[#090A0F] px-5 sm:px-7 select-none"
    >
      {/* Left Input Nodes */}
      <div className="flex flex-col justify-between h-[125px] z-10">
        <div
          ref={div1Ref}
          className="z-10 flex size-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-md text-emerald-400 hover:scale-110 transition-transform"
        >
          <Cloud className="size-4" />
        </div>
        <div
          ref={div2Ref}
          className="z-10 flex size-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-md text-sky-400 hover:scale-110 transition-transform"
        >
          <Zap className="size-4" />
        </div>
      </div>

      {/* Center Hub Node */}
      <div className="flex flex-col justify-center z-10">
        <div
          ref={div3Ref}
          className="z-10 flex size-12 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.35)] text-blue-400 hover:scale-110 transition-transform"
        >
          <User className="size-6" />
        </div>
      </div>

      {/* Right Output Nodes */}
      <div className="flex flex-col justify-between h-[125px] z-10">
        <div
          ref={div4Ref}
          className="z-10 flex size-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-md text-amber-400 hover:scale-110 transition-transform"
        >
          <Database className="size-4" />
        </div>
        <div
          ref={div5Ref}
          className="z-10 flex size-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-md text-purple-400 hover:scale-110 transition-transform"
        >
          <Bot className="size-4" />
        </div>
      </div>

      {/* Real AnimatedBeam Component Instances */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div3Ref}
        curvature={-25}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        curvature={25}
        gradientStartColor="#38bdf8"
        gradientStopColor="#3b82f6"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={-25}
        gradientStartColor="#3b82f6"
        gradientStopColor="#f59e0b"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div5Ref}
        curvature={25}
        gradientStartColor="#3b82f6"
        gradientStopColor="#a855f7"
        duration={3}
      />
    </div>
  )
}

// 6. Bento Grid Mini Preview
export function BentoGridMiniPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#090A0F] p-4 flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2 flex-1">
        <div className="col-span-2 rounded-lg bg-zinc-900/90 border border-white/10 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-400">Analytics</span>
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded" />
        </div>
        <div className="col-span-1 rounded-lg bg-zinc-900/90 border border-white/10 p-2 flex flex-col items-center justify-center">
          <Cpu className="size-4 text-cyan-400" />
          <span className="text-[8px] font-mono text-zinc-400 mt-1">99.8%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 h-9">
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
    <div className="relative w-full h-full overflow-hidden bg-[#07080c] flex items-center justify-center p-3">
      <div className="relative size-24 rounded-full border border-blue-500/30 bg-blue-950/20 shadow-[0_0_30px_rgba(59,130,246,0.25)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 h-[1px] bg-blue-400/30" />
        <div className="absolute inset-y-0 w-[1px] bg-blue-400/30" />
        <div className="absolute size-20 rounded-full border border-blue-400/20" />
        <div className="absolute size-14 rounded-full border border-cyan-400/30" />
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
    <div className="relative w-full h-full overflow-hidden bg-[#090A0F] flex items-end justify-center pb-5">
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
