"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders, Palette } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParticlesDemo, ParticlesColorDemo } from "./particles-demo"

export function ParticlesGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add particles`

  const componentSourceCode = `"use client"

import React, {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { cn } from "@/lib/utils"

interface MousePosition {
  x: number
  y: number
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return mousePosition
}

export interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  let cleanHex = hex.replace("#", "")

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(cleanHex, 16)
  if (isNaN(hexInt)) return [255, 255, 255]
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mousePosition = useMousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * (canvasSize.current.w || 300))
    const y = Math.floor(Math.random() * (canvasSize.current.h || 300))
    const translateX = 0
    const translateY = 0
    const pSize = Math.floor(Math.random() * 2) + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const rgb = hexToRgb(color)

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      context.current.fillStyle = \`rgba(\${rgb.join(", ")}, \${alpha})\`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      )
    }
  }

  const drawParticles = () => {
    clearContext()
    circles.current = []
    const particleCount = quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight

      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = \`\${canvasSize.current.w}px\`
      canvasRef.current.style.height = \`\${canvasSize.current.h}px\`
      context.current.scale(dpr, dpr)

      drawParticles()
    }
  }

  const initCanvas = () => {
    resizeCanvas()
  }

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = mousePosition.x - rect.left - w / 2
      const y = mousePosition.y - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }
  }

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = () => {
    clearContext()
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      )
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      drawCircle(circle, true)

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        const newCircle = circleParams()
        drawCircle(newCircle)
      }
    })
    rafID.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    rafID.current = window.requestAnimationFrame(animate)

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current)
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [color])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Particles
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <ParticlesDemo />
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
                  @/components/ui/particles.tsx
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
                `import { Particles } from "@/components/ui/particles"

export default function Hero() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <span className="pointer-events-none text-center text-7xl font-bold text-white">
        Particles
      </span>
      <Particles className="absolute inset-0" quantity={100} ease={80} color="#ffffff" refresh />
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
          <pre>{`import { Particles } from "@/components/ui/particles"

export default function Hero() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
      <span className="pointer-events-none text-center text-7xl font-bold text-white">
        Particles
      </span>
      <Particles className="absolute inset-0" quantity={100} ease={80} color="#ffffff" refresh />
    </div>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Custom Color Field */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Palette className="size-4 text-zinc-400" />
            Custom Color Palette
          </h3>
          <p className="text-sm text-zinc-400">
            Set custom particle colors and adjust density and mouse responsiveness.
          </p>
          <ParticlesColorDemo />
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
                <td className="py-3 px-4 text-emerald-400">quantity</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">100</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  The number of particles rendered in the field.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">staticity</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">50</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Mouse movement resistance / magnetism factor.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">ease</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">50</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Easing factor applied when tracking cursor coordinates.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">size</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0.4</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Base radius for individual particle circles.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">color</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">"#ffffff"</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Hex color value for the particles.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">refresh</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">false</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Trigger to reinitialize and redraw all particle positions.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">vx</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Horizontal constant drift velocity.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">vy</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">0</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Vertical constant drift velocity.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">className</td>
                <td className="py-3 px-4 text-zinc-400">string</td>
                <td className="py-3 px-4 text-zinc-500">undefined</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Additional CSS classes applied to the container element.
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

