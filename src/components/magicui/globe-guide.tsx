"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobeDemo, GlobeInteractiveDemo } from "./globe-demo"

export function GlobeGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/globe`

  const manualNpmCode = `npm install cobe framer-motion`

  const globeComponentCode = `"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}`

  const usageSnippet = `import { Globe } from "@/components/magicui/globe"

export function GlobeHero() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-[#0A0A0A] pb-40 pt-8">
      <span className="bg-gradient-to-b from-white to-zinc-700 bg-clip-text text-8xl font-semibold text-transparent">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Globe</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          An autorotating, interactive, and highly performant globe made using WebGL. Built on top of Cobe with pointer drag-to-rotate physics, smooth spring interpolation, and customizable pinpoint markers.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Default Showcase */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Default Globe
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Full showcase with luminous dome, gradient headline typography, and orange pinpoint markers.
          </p>
          <div className="flex justify-center p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <GlobeDemo />
          </div>
        </div>

        {/* Example 2: Interactive Network */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Interactive Network Stage
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            With city location toggles and real-time state coordinates.
          </p>
          <div className="flex justify-center p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <GlobeInteractiveDemo />
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-3.5 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-zinc-400" />
                  {cliCode}
                </span>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  1
                </span>
                <span>Install the following dependencies:</span>
              </div>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-3.5 font-mono text-xs text-zinc-200">
                <div className="flex items-center justify-between">
                  <span>{manualNpmCode}</span>
                  <button
                    onClick={() => copyToClipboard(manualNpmCode, "manual-deps")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "manual-deps" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  2
                </span>
                <span>Copy and paste the component code into your project:</span>
              </div>
              <div className="relative max-h-96 overflow-y-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex justify-end pb-2">
                  <button
                    onClick={() => copyToClipboard(globeComponentCode, "component-code")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "component-code" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
                <pre>{globeComponentCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Usage
        </h3>
        <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
          <div className="flex justify-end pb-2">
            <button
              onClick={() => copyToClipboard(usageSnippet, "usage")}
              className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedKey === "usage" ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
          <pre>{usageSnippet}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props
        </h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
              <tr>
                <td className="p-3 text-pink-400 font-semibold">className</td>
                <td className="p-3 text-zinc-400">string</td>
                <td className="p-3 text-zinc-500">-</td>
                <td className="p-3 font-sans text-zinc-300">Custom CSS classes for container positioning.</td>
              </tr>
              <tr>
                <td className="p-3 text-pink-400 font-semibold">config</td>
                <td className="p-3 text-zinc-400">COBEOptions</td>
                <td className="p-3 text-zinc-500">GLOBE_CONFIG</td>
                <td className="p-3 font-sans text-zinc-300">
                  WebGL configuration options for resolution, markers, angles, and lighting.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* COBE Options Documentation */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold tracking-tight">
          Key Cobe Configuration Options
        </h4>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
              <tr>
                <th className="p-3">Option</th>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
              <tr>
                <td className="p-3 text-sky-400">devicePixelRatio</td>
                <td className="p-3 text-zinc-400">number</td>
                <td className="p-3 font-sans text-zinc-300">HiDPI / Retina scale factor (default: 2).</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">phi / theta</td>
                <td className="p-3 text-zinc-400">number</td>
                <td className="p-3 font-sans text-zinc-300">Initial horizontal rotation and vertical tilt angle.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">mapSamples</td>
                <td className="p-3 text-zinc-400">number</td>
                <td className="p-3 font-sans text-zinc-300">Total dot density rendering geographic landmasses.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">baseColor / markerColor</td>
                <td className="p-3 text-zinc-400">[r, g, b]</td>
                <td className="p-3 font-sans text-zinc-300">Normalized RGB [0..1] colors for land and pinpoint markers.</td>
              </tr>
              <tr>
                <td className="p-3 text-sky-400">markers</td>
                <td className="p-3 text-zinc-400">Marker[]</td>
                <td className="p-3 font-sans text-zinc-300">Array of coordinates &#123; location: [lat, lng], size &#125;.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center justify-between">
        <span>
          Built on top of{" "}
          <a
            href="https://cobe.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-main)] underline hover:text-white"
          >
            Cobe
          </a>{" "}
          by Shu Ding. Authored by @dillionverma for Magic UI.
        </span>
        <a
          href="https://magicui.design/docs/components/globe"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
        >
          <span>Magic UI Docs</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}
