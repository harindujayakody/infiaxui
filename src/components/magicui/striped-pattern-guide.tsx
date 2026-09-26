"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  StripedPatternDemo,
  StripedPatternRightDemo,
  StripedPatternDashedDemo,
} from "./striped-pattern-demo"

export function StripedPatternGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/striped-pattern`

  const componentSourceCode = `import React, { useId } from "react"
import { cn } from "@/lib/utils"

export interface StripedPatternProps extends React.SVGProps<SVGSVGElement> {
  direction?: "left" | "right"
  width?: number | string
  height?: number | string
}

export function StripedPattern({
  direction = "left",
  className,
  width = 14,
  height = 14,
  ...props
}: StripedPatternProps) {
  const id = useId()
  const w = Number(width)
  const h = Number(height)

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          {direction === "left" ? (
            <>
              <line x1="0" y1={h} x2={w} y2="0" stroke="currentColor" />
              <line x1={-w} y1={h} x2="0" y2="0" stroke="currentColor" />
              <line x1={w} y1={h} x2={w * 2} y2="0" stroke="currentColor" />
            </>
          ) : (
            <>
              <line x1="0" y1="0" x2={w} y2={h} stroke="currentColor" />
              <line x1={-w} y1="0" x2="0" y2={h} stroke="currentColor" />
              <line x1={w} y1={h} x2={w * 2} y2="0" stroke="currentColor" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={\`url(#\${id})\`} />
    </svg>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Striped Pattern
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A background striped pattern made with SVGs, fully customizable using Tailwind CSS.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <StripedPatternDemo />
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
                  @/components/ui/striped-pattern.tsx
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
                `import { StripedPattern } from "@/components/ui/striped-pattern"

export default function Background() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <StripedPattern
        direction="left"
        width={14}
        height={14}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
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
          <pre>{`import { StripedPattern } from "@/components/ui/striped-pattern"

export default function Background() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <StripedPattern
        direction="left"
        width={14}
        height={14}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Direction Right */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Sliders className="size-4 text-zinc-400" />
            Direction Right
          </h3>
          <p className="text-sm text-zinc-400">
            Render the pattern in reverse diagonal orientation by specifying{" "}
            <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">
              direction="right"
            </code>
            .
          </p>
          <StripedPatternRightDemo />
        </div>

        {/* Dashed lines */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Layers className="size-4 text-zinc-400" />
            Dashed Stroke Style
          </h3>
          <p className="text-sm text-zinc-400">
            Use standard SVG stroke attributes such as{" "}
            <code className="text-zinc-200 bg-white/5 px-1 py-0.5 rounded text-xs font-mono">
              strokeDasharray="4 4"
            </code>{" "}
            to create dashed or dotted striped textures.
          </p>
          <StripedPatternDashedDemo />
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
                <td className="py-3 px-4 text-emerald-400">direction</td>
                <td className="py-3 px-4 text-zinc-400">"left" | "right"</td>
                <td className="py-3 px-4 text-zinc-500">"left"</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Diagonal angle of the stripes.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">width</td>
                <td className="py-3 px-4 text-zinc-400">number | string</td>
                <td className="py-3 px-4 text-zinc-500">14</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Pattern repeat unit width in pixels.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">height</td>
                <td className="py-3 px-4 text-zinc-400">number | string</td>
                <td className="py-3 px-4 text-zinc-500">14</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Pattern repeat unit height in pixels.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">className</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">undefined</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Tailwind CSS classes for stroke color, opacity, masks, and position.
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
          <span className="text-zinc-200 font-medium">matheusfigueiredo</span> with inspiration from{" "}
          <a
            href="https://x.com/chishiyac"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline inline-flex items-center gap-1"
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
