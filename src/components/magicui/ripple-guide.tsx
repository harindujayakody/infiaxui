"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Waves } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RippleDemo } from "./ripple-demo"

export function RippleGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/ripple`

  const componentSourceCode = `import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = \`\${i * 0.06}s\`
        const borderStyle = "solid"

        return (
          <div
            key={i}
            className="animate-ripple bg-foreground/15 absolute rounded-full border shadow-xl"
            style={
              {
                "--i": i,
                width: \`\${size}px\`,
                height: \`\${size}px\`,
                opacity: Math.max(opacity, 0.03),
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: "var(--foreground)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"`

  const cssKeyframesCode = `@keyframes ripple {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.9);
  }
}

.animate-ripple {
  animation: ripple var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite;
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Ripple
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          An animated ripple effect typically used behind elements to emphasize them.
        </p>
      </div>

      {/* Main Interactive Demo matching user reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white tracking-tight">Preview</h2>
          <span className="text-xs text-zinc-500 font-mono">Concentric pulsing circles</span>
        </div>
        <RippleDemo />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Waves className="size-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Harmonic Waves</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Calculates staggered scale delays dynamically across concentric circles for hypnotic pulsing depth.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="size-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">CSS Accelerated</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Powered entirely by CSS transform animations with hardware GPU acceleration and zero JS runtime overhead.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="size-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Fully Configurable</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Easily adjust initial circle size, base opacity, number of waves, and custom container masking.
            </p>
          </div>
        </div>
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-white/10 p-0.5">
            <TabsTrigger
              value="cli"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-3">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-500" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="text-zinc-400 hover:text-white transition-colors ml-2"
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
                  @/components/ui/ripple.tsx
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

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                2. Add the required keyframes to your global CSS:
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <button
                  onClick={() => copyToClipboard(cssKeyframesCode, "css")}
                  className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-white transition-colors"
                  title="Copy CSS"
                >
                  {copiedKey === "css" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre>{cssKeyframesCode}</pre>
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
                `import { Ripple } from "@/components/ui/ripple"

export default function HeroSection() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Ripple
      </p>
      <Ripple />
    </div>
  )`,
                "usage"
              )
            }
            className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre>{`import { Ripple } from "@/components/ui/ripple"

export default function HeroSection() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Ripple
      </p>
      <Ripple />
    </div>
  )`}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Props</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#161616]">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/5 font-mono text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">mainCircleSize</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">210</td>
                <td className="px-4 py-3 font-sans text-zinc-300">The diameter size of the center main circle in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">mainCircleOpacity</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0.24</td>
                <td className="px-4 py-3 font-sans text-zinc-300">The opacity of the innermost ripple circle</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">numCircles</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">8</td>
                <td className="px-4 py-3 font-sans text-zinc-300">The total number of concentric ripple circles to render</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">className</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">-</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Optional CSS class names for the container wrapper</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-4 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Component by</span>
          <a
            href="https://twitter.com/dillionverma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-medium"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>
          <span>for Magic UI.</span>
        </div>
      </div>
    </div>
  )
}
