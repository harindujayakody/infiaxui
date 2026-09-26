"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { Floating3DParticlesColorDemo } from "@/components/magicui/floating-3d-particles-demo"

export function Floating3DParticlesGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Floating3DParticlesProps extends Omit<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  "width" | "height"
> {
  quantity?: number
  color?: string
  size?: number
  opacity?: number
  drift?: number
  depth?: number
}

interface Particle {
  angle: number
  radius: number
  y: number
  size: number
  angularSpeed: number
  opacity: number
  screenX: number
  screenY: number
  projectedScale: number
}

const MOBILE_BREAKPOINT = 768
const SPREAD_FACTOR = 1.2
const MAX_DPR = 2

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "").trim()
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean

  if (!/^[0-9a-f]{6}$/i.test(full)) return \`rgba(139,92,246,\${alpha})\`

  const n = Number.parseInt(full, 16)
  return \`rgba(\${(n >> 16) & 0xff},\${(n >> 8) & 0xff},\${n & 0xff},\${alpha})\`
}

function deriveProjection(depth: number) {
  const t = Math.max(0, Math.min(1, depth))
  const fov = 800 - t * 600
  const perspectiveDistance = 100 + t * 700
  const depthRange = t * Math.min(400, fov + perspectiveDistance - 1)
  return { fov, perspectiveDistance, depthRange }
}

function spawnParticle(
  width: number,
  height: number,
  size: number,
  opacity: number
): Particle {
  const sizeVariance = size * 0.4
  const opacityVariance = 0.2
  return {
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.max(width, height) * SPREAD_FACTOR,
    y: (Math.random() - 0.5) * height * 2,
    size: Math.max(0.5, size - sizeVariance + Math.random() * sizeVariance * 2),
    angularSpeed: 0.0015 + Math.random() * 0.001,
    opacity: Math.min(
      1,
      Math.max(
        0,
        opacity - opacityVariance + Math.random() * opacityVariance * 2
      )
    ),
    screenX: 0,
    screenY: 0,
    projectedScale: 1,
  }
}

export function Floating3DParticles({
  quantity = 400,
  color = "#8B5CF6",
  size = 5,
  opacity = 0.3,
  drift = 0.8,
  depth = 0.5,
  className,
  style,
  ...canvasProps
}: Floating3DParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ioRef = React.useRef<IntersectionObserver | null>(null)
  const stateRef = React.useRef({
    mounted: false,
    paused: false,
    reducedMotion: false,
    rafId: null as number | null,
  })

  const colorRef = React.useRef(color)
  colorRef.current = color

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const s = stateRef.current
    s.mounted = true
    s.paused = false

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let staticDirty = true

    const { fov, perspectiveDistance, depthRange } = deriveProjection(depth)

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncReducedMotion = () => {
      s.reducedMotion = mq.matches
    }
    syncReducedMotion()

    const draw = (p: Particle) => {
      const r = Math.max(0, p.size * p.projectedScale)
      if (r <= 0) return

      ctx.beginPath()
      ctx.fillStyle = hexToRgba(colorRef.current, p.opacity)
      ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2

      for (const p of particles) {
        const denom = Math.max(1, fov + perspectiveDistance)
        const scale = fov / denom
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale
        p.screenY = cy + p.y * scale
        p.projectedScale = scale
        draw(p)
      }
    }

    const tick = () => {
      if (!s.mounted) return

      if (s.paused) {
        s.rafId = requestAnimationFrame(tick)
        return
      }

      if (s.reducedMotion) {
        if (staticDirty) {
          staticDirty = false
          staticFrame()
        }
        s.rafId = requestAnimationFrame(tick)
        return
      }

      staticDirty = true

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      for (const p of particles) {
        p.angle += p.angularSpeed
        p.y -= drift

        if (p.y < -height) {
          p.y = height
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR
        } else if (p.y > height) {
          p.y = -height
          p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR
        }

        const denom = Math.max(
          1,
          fov + perspectiveDistance + Math.sin(p.angle) * depthRange
        )
        const scale = fov / denom

        p.screenX = cx + Math.cos(p.angle) * p.radius * scale
        p.screenY = cy + p.y * scale
        p.projectedScale = scale
      }

      particles.sort((a, b) => a.projectedScale - b.projectedScale)
      for (const p of particles) draw(p)

      s.rafId = requestAnimationFrame(tick)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))

      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT
      const count = isMobile ? Math.round(quantity * 0.2) : quantity

      particles = Array.from({ length: Math.max(0, count) }, () =>
        spawnParticle(width, height, size, opacity)
      )

      staticDirty = true
    }

    const onVisibilityChange = () => {
      s.paused = document.hidden
    }

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null
    if (ro) {
      ro.observe(canvas)
    } else {
      window.addEventListener("resize", resize)
    }

    if (typeof IntersectionObserver !== "undefined") {
      ioRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry) s.paused = document.hidden || !entry.isIntersecting
        },
        { threshold: 0 }
      )
      ioRef.current.observe(canvas)
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    mq.addEventListener("change", syncReducedMotion)

    resize()
    s.rafId = requestAnimationFrame(tick)

    return () => {
      s.mounted = false
      if (s.rafId !== null) {
        cancelAnimationFrame(s.rafId)
        s.rafId = null
      }
      ro?.disconnect()
      if (!ro) window.removeEventListener("resize", resize)
      ioRef.current?.disconnect()
      ioRef.current = null
      document.removeEventListener("visibilitychange", onVisibilityChange)
      mq.removeEventListener("change", syncReducedMotion)
    }
  }, [quantity, size, opacity, drift, depth])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      style={style}
      {...canvasProps}
    />
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Floating 3D Particles"
        componentSlug="floating-3d-particles"
        dependencies=""
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/floating-3d-particles.tsx"
      />

      {/* Usage Section */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          <code className="text-zinc-200 font-mono text-xs">Floating3DParticles</code> renders an absolutely positioned <code className="text-zinc-200 font-mono text-xs">canvas</code> (<code className="text-zinc-200 font-mono text-xs">inset-0</code>, <code className="text-zinc-200 font-mono text-xs">pointer-events-none</code>). Place it inside a relative container and layer any foreground content above it with <code className="text-zinc-200 font-mono text-xs">z-10</code>.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "usage-particles",
                `import { Floating3DParticles } from "@/components/magicui/floating-3d-particles"\n\nexport function Hero() {\n  return (\n    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A]">\n      <Floating3DParticles color="#FFFFFF" quantity={400} />\n      <div className="relative z-10 text-center">\n        <h2 className="text-3xl font-bold text-white">Build Something Magical</h2>\n      </div>\n    </div>\n  )\n}`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "usage-particles" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`import { Floating3DParticles } from "@/components/magicui/floating-3d-particles"

export function Hero() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A]">
      <Floating3DParticles color="#FFFFFF" quantity={400} />
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Build Something Magical</h2>
      </div>
    </div>
  )
}`}</code>
          </pre>
        </div>
      </div>

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore custom chromatic particle tints and depth parameters.
        </p>
      </div>

      {/* Example: Colored Particle Atmosphere */}
      <div id="example-color" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Colored Atmosphere
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Set <code className="text-zinc-200 font-mono text-xs">color="#8B5CF6"</code> to impart an electric violet or branded cosmic ambient glow.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <Floating3DParticlesColorDemo />
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;Floating3DParticles /&gt;</code>.
        </p>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-[var(--text-muted)]">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">quantity</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">400</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Number of particles on desktop viewports. Scales down to 20% on mobile screens (&lt; 768px).
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">color</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#8B5CF6"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Particle color (supports 3-digit or 6-digit hex string).
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">size</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">5</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Mean particle radius in px. Each particle varies within ±40% of this value.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">opacity</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.3</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Mean particle opacity (0–1). Each particle randomly varies within ±0.2.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">drift</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.8</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Vertical floating speed in px per frame. Positive drifts upward, negative downward.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">depth</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.5</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  3D depth intensity (0–1). 0 = flat 2D plane; 1 = pronounced near/far scaling.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Additional CSS classes applied to the canvas element.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits Section */}
      <div id="credits" className="scroll-mt-20 space-y-2 pt-6 border-t border-[var(--border-subtle)] text-[13px] text-[var(--text-muted)]">
        <h4 className="font-semibold text-[var(--text-main)] text-[14px]">Credits</h4>
        <p>
          Component designed and credited to{" "}
          <span className="text-zinc-200 font-medium">Miles</span>.
        </p>
      </div>
    </div>
  )
}
