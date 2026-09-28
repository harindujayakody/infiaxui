"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders, Info, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PixelImageDemo, PixelImageGridDemo } from "./pixel-image-demo"

export function PixelImageGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add pixel-image`

  const componentSourceCode = `"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export type Grid = {
  rows: number
  cols: number
}

export const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

export type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

export interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  className?: string
  alt?: string
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  alt = "Pixel image",
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    setIsVisible(true)
    const colorTimeout = setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)
    return () => clearTimeout(colorTimeout)
  }, [colorRevealDelay])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = \`polygon(
        \${col * (100 / cols)}% \${row * (100 / rows)}%,
        \${(col + 1) * (100 / cols)}% \${row * (100 / rows)}%,
        \${(col + 1) * (100 / cols)}% \${(row + 1) * (100 / rows)}%,
        \${col * (100 / cols)}% \${(row + 1) * (100 / rows)}%
      )\`

      const delay = Math.random() * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div className={cn("relative h-72 w-72 select-none md:h-96 md:w-96", className)}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: \`\${piece.delay}ms\`,
            transitionDuration: \`\${pixelFadeInDuration}ms\`,
          }}
        >
          <img
            src={src}
            alt={\`\${alt} piece \${index + 1}\`}
            className={cn(
              "size-full rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? \`filter \${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)\`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Pixel Image
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A component that displays your image with a pixelated effect, enhancing the visual appeal of any image on your website.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <PixelImageDemo />
      </div>

      {/* Features List */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white tracking-tight">Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-400">
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Pixelated image reveal animation
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Customizable grid size and layout
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Supports grayscale-to-color animation
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Adjustable animation duration and delay
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Lightweight and easy to use
          </li>
        </ul>
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
                  @/components/ui/pixel-image.tsx
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
                `import { PixelImage } from "@/components/ui/pixel-image"

export default function PixelHero() {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelImage src="/pixel-image-demo.png" grid="8x8" />
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
          <pre>{`import { PixelImage } from "@/components/ui/pixel-image"

export default function PixelHero() {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelImage src="/pixel-image-demo.png" grid="8x8" />
    </div>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Interactive Grid Variations */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Sliders className="size-4 text-zinc-400" />
            Grid Presets (6x4, 8x8, 8x3, 4x6, 3x8)
          </h3>
          <p className="text-sm text-zinc-400">
            Switch between predefined grid configurations to alter the density and aspect ratio of individual pixel blocks.
          </p>
          <PixelImageGridDemo />
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
                <td className="py-3 px-4 text-emerald-400">src</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  The image source URL.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">grid</td>
                <td className="py-3 px-4 text-zinc-400">"6x4" | "8x8" | "8x3" | "4x6" | "3x8"</td>
                <td className="py-3 px-4 text-zinc-500">"8x8"</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Predefined grid layout preset.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">customGrid</td>
                <td className="py-3 px-4 text-zinc-400">&#123; rows: number; cols: number &#125;</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Custom grid layout (overrides predefined grid).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">grayscaleAnimation</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">true</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Whether to animate smoothly from grayscale to full color.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">pixelFadeInDuration</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1000</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Duration in milliseconds for each pixel block fade-in.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">maxAnimationDelay</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1200</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Maximum random delay in milliseconds for individual pieces.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">colorRevealDelay</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">1500</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Delay in milliseconds before starting color transition.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Section */}
      <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#161616] p-4 text-sm text-zinc-400">
        <Info className="size-5 shrink-0 text-zinc-400 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-zinc-200">Accessibility Note:</strong> Since the pixelation effect is purely decorative, make sure to provide text alternatives (like descriptions or labels) for any important content shown in the image.
        </p>
      </div>

      {/* Credits */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h2 className="text-xl font-semibold text-white tracking-tight">Credits</h2>
        <p className="text-sm text-zinc-400">
          Created by{" "}
          <a
            href="https://x.com/dharminnagar"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline inline-flex items-center gap-1 font-medium"
          >
            @dharminnagar
            <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}

