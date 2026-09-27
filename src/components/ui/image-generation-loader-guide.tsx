"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGenerationLoaderDemo } from "./image-generation-loader-demo"

export function ImageGenerationLoaderGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/image-generation-loader-demo`

  const componentSourceCode = `"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2, CheckCircle2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImageGenerationLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  duration?: number
  autoStart?: boolean
  className?: string
  statusMessages?: string[]
  onComplete?: () => void
}

const DEFAULT_STATUS_MESSAGES = [
  "Sampling latent noise...",
  "Applying diffusion step 14/50...",
  "Synthesizing high-frequency lattice...",
  "Enhancing color grading & dynamic range...",
  "Finalizing render...",
]

export function ImageGenerationLoader({
  src,
  alt = "Generated Artwork",
  duration = 4000,
  autoStart = true,
  className,
  statusMessages = DEFAULT_STATUS_MESSAGES,
  onComplete,
  ...props
}: ImageGenerationLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(autoStart)
  const [messageIndex, setMessageIndex] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const startGeneration = () => {
    setIsGenerating(true)
    setProgress(0)
    setMessageIndex(0)
    startTimeRef.current = performance.now()

    const update = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(rawPct)

      const msgIdx = Math.min(
        statusMessages.length - 1,
        Math.floor((rawPct / 100) * statusMessages.length)
      )
      setMessageIndex(msgIdx)

      if (rawPct < 100) {
        animationFrameRef.current = requestAnimationFrame(update)
      } else {
        setIsGenerating(false)
        onComplete?.()
      }
    }

    animationFrameRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    if (autoStart) {
      startGeneration()
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [autoStart, duration])

  return (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] p-3 sm:p-4 shadow-2xl group select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2.5 rounded-full transition-colors",
              isGenerating ? "bg-cyan-400 animate-pulse" : "bg-emerald-400"
            )}
          />
          <span className="text-xs font-mono font-medium text-zinc-300">
            {isGenerating ? "Generating Neural Asset" : "Generation Complete"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
            {progress}%
          </span>
          {!isGenerating && (
            <button
              onClick={startGeneration}
              title="Regenerate"
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full my-3 rounded-xl overflow-hidden bg-black/80 border border-white/[0.08] flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isGenerating ? "scale-105 filter blur-md contrast-125" : "scale-100 filter blur-0"
          )}
        />

        {isGenerating && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              clipPath: \`polygon(0 0, 100% 0, 100% \${progress}%, 0 \${progress}%)\`,
            }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover scale-100 filter blur-0 brightness-110"
            />
          </div>
        )}

        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isGenerating ? "opacity-40" : "opacity-0"
          )}
          style={{
            backgroundImage: \`linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)\`,
            backgroundSize: "20px 20px",
          }}
        />

        {isGenerating && (
          <div
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgba(34,211,238,1)] z-20 pointer-events-none transition-all duration-75 ease-out"
            style={{
              top: \`\${progress}%\`,
            }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-3 bg-cyan-300 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {isGenerating ? (
            <Loader2 className="size-3.5 text-cyan-400 animate-spin" />
          ) : (
            <CheckCircle2 className="size-3.5 text-emerald-400" />
          )}
          <span className="text-xs font-mono text-zinc-400 truncate max-w-[260px] sm:max-w-xs">
            {isGenerating ? statusMessages[messageIndex] : "Render completed in 4.0s"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <Sparkles className="size-3 text-cyan-400/80" />
          <span>SDXL Turbo</span>
        </div>
      </div>
    </div>
  )
}`

  const usageCode = `import { ImageGenerationLoader } from "@/components/ui/image-generation-loader"

export default function Example() {
  return (
    <ImageGenerationLoader
      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
      alt="Abstract artwork"
      duration={4000}
    />
  )
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Image Generation Loader</h1>
        <p className="text-base text-zinc-400">
          A canvas loader that scans across an image with animated pixel grids, text masks, and progress overlays.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <ImageGenerationLoaderDemo />
      </div>

      {/* Installation Tabs */}
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
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/image-generation-loader.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
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
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Table */}
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
                <td className="px-4 py-3 text-cyan-400 font-bold">src</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">required</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">URL source for the generated image.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">duration</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">4000</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Total duration for the scanline animation in ms.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">autoStart</td>
                <td className="px-4 py-3 text-purple-400">boolean</td>
                <td className="px-4 py-3 text-zinc-500">true</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Automatically trigger generation sequence on mount.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">statusMessages</td>
                <td className="px-4 py-3 text-purple-400">string[]</td>
                <td className="px-4 py-3 text-zinc-500">DEFAULT_STATUS_MESSAGES</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Step messages displayed at the bottom during render.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
