"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlickeringGridDemo, FlickeringGridRoundedDemo } from "./flickering-grid-demo"

export function FlickeringGridGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add flickering-grid`

  const componentSourceCode = `"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return \`rgba(0, 0, 0,\`
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return "rgba(255, 0, 0,"
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return \`rgba(\${r}, \${g}, \${b},\`
    }
    return toRGBA(color)
  }, [color])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = \`\${width}px\`
      canvas.style.height = \`\${height}px\`

      if (width <= 0 || height <= 0) {
        return { cols: 0, rows: 0, squares: new Float32Array(0), dpr }
      }

      const cols = Math.ceil(width / (squareSize + gridGap))
      const rows = Math.ceil(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity]
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      if (cols === 0 || rows === 0) return

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          ctx.fillStyle = \`\${memoizedColor}\${opacity})\`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext("2d") ?? null
    let animationFrameId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let gridParams: ReturnType<typeof setupCanvas> | null = null

    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth
        const newHeight = height || container.clientHeight
        setCanvasSize({ width: newWidth, height: newHeight })
        gridParams = setupCanvas(canvas, newWidth, newHeight)
      }

      updateCanvasSize()

      let lastTime = 0
      const animate = (time: number) => {
        if (!isInView || !gridParams) return

        const deltaTime = (time - lastTime) / 1000
        lastTime = time

        updateSquares(gridParams.squares, deltaTime)
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        )
        animationFrameId = requestAnimationFrame(animate)
      }

      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize()
      })
      resizeObserver.observe(container)

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0 }
      )
      intersectionObserver.observe(canvas)

      if (isInView) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div
      ref={containerRef}
      className={cn(\`h-full w-full \${className}\`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}`

  const usageSnippet = `import { FlickeringGrid } from "@/components/magicui/flickering-grid"

export function FlickeringGridDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-background">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    </div>
  )
}`

  return (
    <div className="space-y-10 text-[var(--text-main)]">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Flickering Grid</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A flickering grid background made with SVGs, fully customizable using Tailwind CSS.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Preview
        </h3>
        <div className="relative flex min-h-[480px] w-full items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-4 sm:p-8">
          <FlickeringGridDemo />
        </div>
      </div>

      {/* Examples: Rounded */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples: Rounded Mask
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Using a CSS radial-gradient mask to smoothly fade edges into the background.
        </p>
        <div className="relative flex min-h-[420px] w-full items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-4 sm:p-8">
          <FlickeringGridRoundedDemo />
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="pt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="size-4 shrink-0 text-amber-400" />
                  <span className="text-zinc-300">{cliCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  aria-label="Copy CLI command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="pt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                Copy the component code into{" "}
                <code className="text-amber-400 bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded font-mono">
                  @/components/magicui/flickering-grid.tsx
                </code>
                :
              </p>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200 max-h-[420px] overflow-y-auto">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual")}
                  className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
                  aria-label="Copy source code"
                >
                  {copiedKey === "manual" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
                <pre className="text-zinc-300 leading-relaxed font-mono">
                  {componentSourceCode}
                </pre>
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
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-3.5 text-green-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-zinc-300 leading-relaxed font-mono">
            {usageSnippet}
          </pre>
        </div>
      </div>

      {/* Props Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props
        </h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] border-b border-[var(--border-subtle)] font-mono">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">squareSize</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">4</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Size of each square in pixels.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">gridGap</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">6</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Gap between squares in pixels.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">flickerChance</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">0.3</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Probability of a square flickering per second.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">color</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">"rgb(0, 0, 0)"</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Color of the squares in RGB, RGBA, or hex.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">maxOpacity</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">0.3</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Maximum opacity of the squares.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">width</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Fixed width of the canvas (optional, defaults to container width).
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">height</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Fixed height of the canvas (optional, defaults to container height).
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Additional CSS classes for the container.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

