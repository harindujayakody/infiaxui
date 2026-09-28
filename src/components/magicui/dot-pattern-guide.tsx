"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders, Sun } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DotPatternDemo,
  DotPatternLinearGradientDemo,
  DotPatternGlowDemo,
} from "./dot-pattern-demo"

export function DotPatternGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add dot-pattern`

  const componentSourceCode = `"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  [key: string]: unknown
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!glow) return
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: w, height: h } = containerRef.current.getBoundingClientRect()
        setDimensions({ width: w, height: h })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [glow])

  const dots = Array.from(
    {
      length:
        glow && dimensions.width && dimensions.height
          ? Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height)
          : 0,
    },
    (_, i) => {
      const cols = Math.ceil(dimensions.width / width) || 1
      const col = i % cols
      const row = Math.floor(i / cols)
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }
    }
  )

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        {!glow ? (
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle id="pattern-circle" cx={cx} cy={cy} r={cr} fill="currentColor" />
          </pattern>
        ) : (
          <radialGradient id={\`\${id}-gradient\`}>
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      {!glow ? (
        <rect width="100%" height="100%" strokeWidth={0} fill={\`url(#\${id})\`} />
      ) : (
        dots.map((dot) => (
          <motion.circle
            key={\`\${dot.x}-\${dot.y}\`}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={\`url(#\${id}-gradient)\`}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))
      )}
    </svg>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dot Pattern
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A background dot pattern made with SVGs, fully customizable using Tailwind CSS.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <DotPatternDemo />
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
                  @/components/ui/dot-pattern.tsx
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
                `import { DotPattern } from "@/components/ui/dot-pattern"

export default function Background() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <DotPattern
        width={16}
        height={16}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/50 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
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
          <pre>{`import { DotPattern } from "@/components/ui/dot-pattern"

export default function Background() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <DotPattern
        width={16}
        height={16}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/50 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Linear Gradient */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Layers className="size-4 text-zinc-400" />
            Linear Gradient Mask
          </h3>
          <p className="text-sm text-zinc-400">
            Fade the dot pattern corner-to-corner using Tailwind CSS arbitrary mask utility classes.
          </p>
          <DotPatternLinearGradientDemo />
        </div>

        {/* Animated Glow */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Sparkles className="size-4 text-emerald-400" />
            With Glow Effect
          </h3>
          <p className="text-sm text-zinc-400">
            Enable <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">glow=&#123;true&#125;</code> to activate subtle animated pulsating glowing dots across the grid.
          </p>
          <DotPatternGlowDemo />
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
                <td className="py-3 px-4 text-emerald-400">width</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">16</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Horizontal spacing between dots.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">height</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">16</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Vertical spacing between dots.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">x</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  X position offset of the pattern.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">y</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Y position offset of the pattern.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">cx</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  X position within the pattern tile.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">cy</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Y position within the pattern tile.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">cr</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Radius of each individual dot circle.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">glow</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">false</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Activates the glowing pulsating animation effect.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">className</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">undefined</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Tailwind CSS classes for stroke color, mask gradients, and position.
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
          <span className="text-zinc-200 font-medium">dillionverma</span>.
        </p>
      </div>
    </div>
  )
}

