"use client"

import React, { forwardRef, useRef } from "react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { cn } from "@/lib/utils"
import {
  User,
  Bot,
  Database,
  Cloud,
  FileText,
  Zap,
  Share2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-transform hover:scale-110",
        className
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

// 1. Integration Demo (Default Hero Showcase)
export function AnimatedBeamDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-[360px] w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-xl",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[220px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="text-emerald-400 bg-[var(--bg-page)]">
            <Cloud className="size-5" />
          </Circle>
          <Circle ref={div5Ref} className="text-amber-400 bg-[var(--bg-page)]">
            <Database className="size-5" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="text-sky-400 bg-[var(--bg-page)]">
            <FileText className="size-5" />
          </Circle>
          <Circle ref={div4Ref} className="size-16 border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <User className="size-7" />
          </Circle>
          <Circle ref={div6Ref} className="text-purple-400 bg-[var(--bg-page)]">
            <Bot className="size-5" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="text-rose-400 bg-[var(--bg-page)]">
            <Zap className="size-5" />
          </Circle>
          <Circle ref={div7Ref} className="text-indigo-400 bg-[var(--bg-page)]">
            <Share2 className="size-5" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-20}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        gradientStartColor="#38bdf8"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={20}
        gradientStartColor="#f43f5e"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        curvature={-20}
        gradientStartColor="#3b82f6"
        gradientStopColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        gradientStartColor="#3b82f6"
        gradientStopColor="#a855f7"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div7Ref}
        curvature={20}
        gradientStartColor="#3b82f6"
        gradientStopColor="#6366f1"
      />
    </div>
  )
}

// 2. Uni-Directional Demo
export function AnimatedBeamUniDirectionalDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[180px] w-full max-w-md items-center justify-between overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-12"
    >
      <Circle ref={fromRef} className="text-amber-400">
        <User className="size-5" />
      </Circle>
      <Circle ref={toRef} className="text-sky-400">
        <Bot className="size-5" />
      </Circle>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        duration={3}
        gradientStartColor="#f59e0b"
        gradientStopColor="#38bdf8"
      />
    </div>
  )
}

// 3. Bi-Directional Demo
export function AnimatedBeamBiDirectionalDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[180px] w-full max-w-md items-center justify-between overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-12"
    >
      <Circle ref={fromRef} className="text-emerald-400">
        <Database className="size-5" />
      </Circle>
      <Circle ref={toRef} className="text-purple-400">
        <Cloud className="size-5" />
      </Circle>
      {/* Forward beam */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#a855f7"
      />
      {/* Reverse beam */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        duration={4}
        reverse
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
    </div>
  )
}

// 4. Multiple Inputs Demo
export function AnimatedBeamMultipleInputsDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const in1Ref = useRef<HTMLDivElement>(null)
  const in2Ref = useRef<HTMLDivElement>(null)
  const in3Ref = useRef<HTMLDivElement>(null)
  const outRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[240px] w-full max-w-md items-center justify-between overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-8"
    >
      <div className="flex flex-col gap-5">
        <Circle ref={in1Ref} className="text-rose-400">
          <Zap className="size-4" />
        </Circle>
        <Circle ref={in2Ref} className="text-sky-400">
          <FileText className="size-4" />
        </Circle>
        <Circle ref={in3Ref} className="text-amber-400">
          <Database className="size-4" />
        </Circle>
      </div>
      <Circle ref={outRef} className="size-14 border-blue-500/50 bg-blue-500/10 text-blue-400">
        <Cpu className="size-6" />
      </Circle>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={in1Ref}
        toRef={outRef}
        curvature={-25}
        gradientStartColor="#f43f5e"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={in2Ref}
        toRef={outRef}
        gradientStartColor="#38bdf8"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={in3Ref}
        toRef={outRef}
        curvature={25}
        gradientStartColor="#f59e0b"
        gradientStopColor="#3b82f6"
      />
    </div>
  )
}

// 5. Multiple Outputs Demo
export function AnimatedBeamMultipleOutputsDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inRef = useRef<HTMLDivElement>(null)
  const out1Ref = useRef<HTMLDivElement>(null)
  const out2Ref = useRef<HTMLDivElement>(null)
  const out3Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[240px] w-full max-w-md items-center justify-between overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-8"
    >
      <Circle ref={inRef} className="size-14 border-purple-500/50 bg-purple-500/10 text-purple-400">
        <Sparkles className="size-6" />
      </Circle>
      <div className="flex flex-col gap-5">
        <Circle ref={out1Ref} className="text-emerald-400">
          <Cloud className="size-4" />
        </Circle>
        <Circle ref={out2Ref} className="text-indigo-400">
          <Share2 className="size-4" />
        </Circle>
        <Circle ref={out3Ref} className="text-amber-400">
          <Layers className="size-4" />
        </Circle>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={inRef}
        toRef={out1Ref}
        curvature={-25}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={inRef}
        toRef={out2Ref}
        gradientStartColor="#a855f7"
        gradientStopColor="#6366f1"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={inRef}
        toRef={out3Ref}
        curvature={25}
        gradientStartColor="#a855f7"
        gradientStopColor="#f59e0b"
      />
    </div>
  )
}
