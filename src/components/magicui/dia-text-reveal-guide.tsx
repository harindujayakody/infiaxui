"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders, RefreshCw, Palette } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DiaTextRevealDemo,
  DiaTextRevealCustomGradientDemo,
  DiaTextRevealRotatingDemo,
} from "./dia-text-reveal-demo"

export function DiaTextRevealGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add dia-text-reveal`

  const componentSourceCode = `"use client"

import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF

  if (bandStart >= 100) {
    return \`linear-gradient(90deg, \${textColor}, \${textColor})\`
  }
  const n = colors.length
  const parts: string[] = []

  if (bandStart > 0)
    parts.push(\`\${textColor} 0%\`, \`\${textColor} \${bandStart.toFixed(2)}%\`)

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
    parts.push(\`\${c} \${pct.toFixed(2)}%\`)
  })

  if (bandEnd < 100)
    parts.push(\`transparent \${bandEnd.toFixed(2)}%\`, \`transparent 100%\`)

  return \`linear-gradient(90deg, \${parts.join(", ")})\`
}

function measureWidths(el: HTMLElement, texts: string[]) {
  if (typeof document === "undefined" || !el.parentElement) return texts.map(() => 0)
  const ghost = el.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  })
  el.parentElement.appendChild(ghost)
  const widths = texts.map((t) => {
    ghost.textContent = t
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

export interface DiaTextRevealProps
  extends Omit<
    HTMLMotionProps<"span">,
    "ref" | "children" | "style" | "animate" | "transition" | "color"
  > {
  text: string | string[]
  colors?: string[]
  textColor?: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  startOnView?: boolean
  once?: boolean
  className?: string
  fixedWidth?: boolean
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1
  const prefersReducedMotion = useReducedMotion()

  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  })
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  }

  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const playRef = useRef<() => void>(null!)
  const stopRef = useRef<(() => void) | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

  const sweepPos = useMotionValue(SWEEP_START)

  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  )

  const isInView = useInView(spanRef, { once, amount: 0.1 })

  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    setMeasuredWidths(measureWidths(el, texts))
  }, [Array.isArray(text) ? text.join("\\0") : text])

  playRef.current = () => {
    const { duration, delay, repeat, repeatDelay, texts } = optsRef.current

    sweepPos.set(SWEEP_START)

    const controls = animate(sweepPos, SWEEP_END, {
      duration,
      delay,
      ease: sweepEase,
      onComplete() {
        if (!repeat) return
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts.length
          indexRef.current = next
          setActiveIndex(next)
          playRef.current()
        }, repeatDelay * 1000)
      },
    })

    stopRef.current = () => controls.stop()
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END)
      return
    }
    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    hasPlayedRef.current = true
    playRef.current()

    return () => {
      stopRef.current?.()
      clearTimeout(timerRef.current)
    }
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos])

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined

  return (
    <motion.span
      ref={spanRef}
      className={cn("align-bottom leading-[100%] text-inherit", className)}
      style={{
        transform: "translateY(-2px)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...(isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dia Text Reveal
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A horizontal color band sweeps across text with a gradient shine, then settles on your theme foreground color.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <DiaTextRevealDemo />
      </div>

      {/* Installation Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-white/10 p-1 rounded-xl">
            <TabsTrigger
              value="cli"
              className="data-[state=active]:bg-[#262626] data-[state=active]:text-white text-zinc-400 text-xs px-3.5 py-1.5 rounded-lg transition-all"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="data-[state=active]:bg-[#262626] data-[state=active]:text-white text-zinc-400 text-xs px-3.5 py-1.5 rounded-lg transition-all"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-400" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="text-zinc-400 hover:text-white transition-colors"
                title="Copy command"
              >
                {copiedKey === "cli" ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                1. Copy and paste the component code into{" "}
                <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">
                  @/components/ui/dia-text-reveal.tsx
                </code>
                :
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[420px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "source")}
                  className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedKey === "source" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <button
            onClick={() =>
              copyToClipboard(
                `import { DiaTextReveal } from "@/components/ui/dia-text-reveal"

export default function Hero() {
  return (
    <h1 className="text-4xl font-bold">
      Welcome to <DiaTextReveal text="Magic UI" />
    </h1>
  )
}`,
                "usage"
              )
            }
            className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre>{`import { DiaTextReveal } from "@/components/ui/dia-text-reveal"

export default function Hero() {
  return (
    <h1 className="text-4xl font-bold">
      Welcome to <DiaTextReveal text="Magic UI" />
    </h1>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Custom Gradient */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Palette className="size-4 text-zinc-400" />
            Custom Gradient
          </h3>
          <p className="text-sm text-zinc-400">
            Override <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">colors</code> for a personalized color palette across the sweep.
          </p>
          <DiaTextRevealCustomGradientDemo />
        </div>

        {/* Rotating Phrases */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <RefreshCw className="size-4 text-zinc-400" />
            Rotating Phrases in a Heading
          </h3>
          <p className="text-sm text-zinc-400">
            Pass <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">text</code> as an array and enable{" "}
            <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">repeat</code> to cycle through phrases smoothly.
          </p>
          <DiaTextRevealRotatingDemo />
        </div>
      </div>

      {/* Props Reference */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Props</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#161616]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-mono">
                <th className="py-3 px-4">Prop</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Default</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
              <tr>
                <td className="py-3 px-4 text-emerald-400">text</td>
                <td className="py-3 px-4 text-zinc-400">string | string[]</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Text to display. Pass an array to rotate strings.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">colors</td>
                <td className="py-3 px-4 text-zinc-400">string[]</td>
                <td className="py-3 px-4 text-zinc-500">[#c679c4, ...]</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Colors sampled across the moving gradient band.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">textColor</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">var(--foreground)</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Solid text color after the sweep completes.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">duration</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1.5</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Duration of one sweep pass in seconds.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">delay</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Delay before the sweep starts in seconds.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">repeat</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">false</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Replay sweep or advance to next string when text is an array.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">repeatDelay</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0.5</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Pause duration in seconds between cycles.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">fixedWidth</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">false</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Lock width to widest string when text is an array.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h2 className="text-xl font-semibold text-white tracking-tight">Credits</h2>
        <p className="text-sm text-zinc-400">
          Created by{" "}
          <a
            href="https://github.com/chishiyac"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline inline-flex items-center gap-1 font-medium"
          >
            @chishiyac
            <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}

