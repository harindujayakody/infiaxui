"use client"

import React, { useState } from "react"
import { Copy, Check, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GlareHoverDemo,
  GlareHoverDemoCTA,
  GlareHoverDemoAlert,
} from "@/components/magicui/glare-hover-demo"

export function GlareHoverGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add glare-hover`

  const componentSourceCode = `import type { ComponentProps, CSSProperties } from "react"
import { useMemo } from "react"

import { cn } from "@/lib/utils"

export interface GlareHoverProps extends ComponentProps<"div"> {
  width?: string
  height?: string
  background?: string
  color?: Color
  opacity?: number
  angle?: number
  size?: number
  duration?: number
  playOnce?: boolean
}

type Color = \`#\${string}\`
type RGBA = \`rgba(\${number},\${number},\${number},\${number})\`

function parseHEX(color: Color, opacity: number): RGBA | Color {
  const hex = color.replace("#", "")
  const parse = (h: string) => Number.parseInt(h, 16)
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return \`rgba(\${parse(hex.slice(0, 2))},\${parse(hex.slice(2, 4))},\${parse(hex.slice(4, 6))},\${opacity})\`
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return \`rgba(\${parse(hex[0] + hex[0])},\${parse(hex[1] + hex[1])},\${parse(hex[2] + hex[2])},\${opacity})\`
  }

  return color
}

function GlareHover({
  background = "#000",
  children,
  color = "#ffffff",
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}: GlareHoverProps) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity])

  const cssVars = {
    "--gh-angle": \`\${angle}deg\`,
    "--gh-duration": \`\${duration}ms\`,
    "--gh-size": \`\${size}%\`,
    "--gh-rgba": rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  } as CSSProperties

  return (
    <div
      {...props}
      className={cn(
        "relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
        // BEFORE ELEMENT
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
        // GRADIENT
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
        // SIZE + POSITION
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        // TRANSITION
        !playOnce &&
          "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        playOnce &&
          "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
        // HOVER EFFECT
        "hover:before:[background-position:100%_100%,0_0]",
        className
      )}
      style={cssVars}
    >
      {children}
    </div>
  )
}

export { GlareHover }`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Glare Hover
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A diagonal light glare on hover using a <code className="text-zinc-200 font-mono text-xs">::before</code> gradient, CSS variables, and background-position animation—no extra global keyframes required.
        </p>
      </div>

      {/* Main Interactive Demo matching user reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white tracking-tight">Preview</h2>
          <span className="text-xs text-zinc-500 font-mono">Hover to trigger glare sweep</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 flex items-center justify-center">
          <GlareHoverDemo />
        </div>
      </div>

      {/* Examples Header */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white tracking-tight">Examples</h2>

        {/* Example 1: CTA Banner */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            CTA Card
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Add an optical sheen to conversion banners and premium tier cards.
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 flex items-center justify-center">
            <GlareHoverDemoCTA />
          </div>
        </div>

        {/* Example 2: Alerts */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Alerts
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Highlight critical alerts, system warnings, or important toasts with responsive hover glares.
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 flex items-center justify-center">
            <GlareHoverDemoAlert />
          </div>
        </div>
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4 pt-4 border-t border-white/10">
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

          <TabsContent value="manual" className="mt-4 space-y-4">
            <p className="text-sm text-zinc-400">
              Copy and paste the following code into your project at{" "}
              <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">
                @/components/ui/glare-hover.tsx
              </code>
              :
            </p>
            <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px]">
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Usage</h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          The effect is implemented with a <code className="text-zinc-200">::before</code> pseudo-element: a linear-gradient tile moves from one corner to the opposite on hover. Color is parsed from hex into rgba for the glare band.
        </p>
        <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <pre>{`import { GlareHover } from "@/components/ui/glare-hover"

export default function PricingCard() {
  return (
    <GlareHover className="rounded-2xl border border-white/10 bg-[#161616] p-6">
      <h3>Pro Plan</h3>
      <p>$49/mo</p>
    </GlareHover>
  )
}`}</pre>
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
                <td className="px-4 py-3 text-cyan-400 font-semibold">children</td>
                <td className="px-4 py-3 text-zinc-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">—</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Content inside the wrapper.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">className</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">—</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Classes on the root div (use rounded-*, overflow-hidden, etc.).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">background</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">"#000"</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Root background color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">color</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">"#ffffff"</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Glare highlight (hex #rgb / #rrggbb).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">opacity</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0.5</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Alpha for the parsed glare color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">angle</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">-45</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Gradient angle in degrees (--gh-angle).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">size</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">250</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Glare tile size in % (--gh-size).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">duration</td>
                <td className="px-4 py-3 text-zinc-400">number</td>
                <td className="px-4 py-3 text-zinc-500">650</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Transition duration in ms (--gh-duration).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">playOnce</td>
                <td className="px-4 py-3 text-zinc-400">boolean</td>
                <td className="px-4 py-3 text-zinc-500">false</td>
                <td className="px-4 py-3 font-sans text-zinc-300">If true, animation runs on hover only (no transition until hover).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">width</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">—</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Optional width on the root style.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">height</td>
                <td className="px-4 py-3 text-zinc-400">string</td>
                <td className="px-4 py-3 text-zinc-500">—</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Optional height on the root style.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-4 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Credit to</span>
          <a
            href="https://github.com/chishiyac"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-medium"
          >
            @chishiyac <ExternalLink className="size-3" />
          </a>
          <span>for the component.</span>
        </div>
      </div>
    </div>
  )
}

