"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MorphPillCardDemo } from "./morph-pill-card-demo"

export function MorphPillCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/idynamics-demo`

  const componentSourceCode = `"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Timer,
  RotateCcw,
  Mic,
  Square,
  ArrowUpRight,
  X,
  Volume2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DynamicIslandMode = "music" | "timer" | "record" | "profile"

export interface DynamicIslandProps {
  initialMode?: DynamicIslandMode
  defaultOpen?: boolean
  className?: string
  onModeChange?: (mode: DynamicIslandMode) => void
}

const openSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.8,
}

const closeSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.75,
}

export function MorphPillDeck({
  initialMode = "music",
  defaultOpen = false,
  className,
  onModeChange,
}: DynamicIslandProps) {
  const [mode, setMode] = useState<DynamicIslandMode>(initialMode)
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [musicProgress, setMusicProgress] = useState<number>(42)
  const [timerSeconds, setTimerSeconds] = useState<number>(1458)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)
  const [isRecording, setIsRecording] = useState<boolean>(true)
  const [recordSeconds, setRecordSeconds] = useState<number>(84)
  const [hasConnected, setHasConnected] = useState<boolean>(false)

  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => {
      setRecordSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const getIslandDimensions = () => {
    if (!isOpen) {
      switch (mode) {
        case "music":
          return { width: 182, height: 38, radius: 999 }
        case "timer":
          return { width: 160, height: 38, radius: 999 }
        case "record":
          return { width: 168, height: 38, radius: 999 }
        case "profile":
          return { width: 154, height: 38, radius: 999 }
        default:
          return { width: 160, height: 38, radius: 999 }
      }
    }

    switch (mode) {
      case "music":
        return { width: 376, height: 178, radius: 34 }
      case "timer":
        return { width: 360, height: 172, radius: 34 }
      case "record":
        return { width: 360, height: 172, radius: 34 }
      case "profile":
        return { width: 368, height: 184, radius: 34 }
      default:
        return { width: 360, height: 172, radius: 34 }
    }
  }

  const { width, height, radius } = getIslandDimensions()

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return \`\${m.toString().padStart(2, "0")}:\${s.toString().padStart(2, "0")}\`
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-start py-6 select-none", className)}>
      <div className="flex items-center gap-1 mb-10 p-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-lg">
        {[
          { id: "music", label: "Now Playing" },
          { id: "timer", label: "Focus Timer" },
          { id: "record", label: "Voice Memo" },
          { id: "profile", label: "Profile" },
        ].map((tab) => {
          const isActive = mode === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setMode(tab.id as DynamicIslandMode)
                setIsOpen(true)
                onModeChange?.(tab.id as DynamicIslandMode)
              }}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "text-slate-100 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-island-mode-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-slate-800 border border-slate-700/70 rounded-full shadow-sm"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="relative flex justify-center" style={{ transformOrigin: "top center" }}>
        <motion.div
          layout
          onClick={() => setIsOpen(!isOpen)}
          transition={isOpen ? openSpring : closeSpring}
          style={{
            width,
            height,
            borderRadius: radius,
            background: "#000000",
            overflow: "hidden",
            cursor: "pointer",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: isOpen
              ? "0 24px 70px -12px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.12)"
              : "0 8px 24px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
          }}
          className="relative transition-colors"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key={\`expanded-\${mode}\`}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.1, duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  filter: "blur(6px)",
                  transition: { duration: 0.1 },
                }}
                style={{ width, height }}
                className="p-4 text-white flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mode Contents */}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-island"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.08, duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(4px)",
                  transition: { duration: 0.08 },
                }}
                style={{ width, height }}
                className="flex items-center justify-between px-3.5 size-full text-white"
              >
                {/* Collapsed Wings */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}`

  const usageCode = `import { MorphPillDeck } from "@/components/ui/morph-pill-card"

export function DynamicIslandDemo() {
  return (
    <div className="flex items-center justify-center min-h-[480px] bg-[#0A0A0A] rounded-2xl border border-slate-800">
      <MorphPillDeck initialMode="music" defaultOpen={true} />
    </div>
  )
}`

  return (
    <div className="space-y-10 pb-16">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">iDynamics</h1>
        <p className="text-base text-zinc-400">
          An authentic Apple Dynamic Island morphing surface that physically transforms between compact wings and expanded interactive cards with smooth spring physics.
        </p>
      </div>

      {/* Live Interactive Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <MorphPillCardDemo />
      </div>

      {/* Installation Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#18181b] border border-white/10">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-mono text-sm text-zinc-200">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-400" />
                <span>{cliCode}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/morph-pill-card.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  type="button"
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {copiedKey === "manual-comp" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto">
          <button
            type="button"
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Props Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121214]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">initialMode</td>
                <td className="px-4 py-3 text-purple-400">"music" | "timer" | "record" | "profile"</td>
                <td className="px-4 py-3 text-zinc-500">"music"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Active interactive card mode.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">defaultOpen</td>
                <td className="px-4 py-3 text-purple-400">boolean</td>
                <td className="px-4 py-3 text-zinc-500">false</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Whether the Dynamic Island starts expanded.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">className</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Outer container styling.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">onModeChange</td>
                <td className="px-4 py-3 text-purple-400">(mode) =&gt; void</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Callback triggered on tab selection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
