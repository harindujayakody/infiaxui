"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundRippleEffectDemo } from "./background-ripple-effect-demo"

export function BackgroundRippleEffectGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add background-ripple-effect-demo`

  const componentSourceCode = `"use client"

import React, { useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface BackgroundRippleEffectProps {
  rows?: number
  cols?: number
  cellSize?: number
  className?: string
}

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  className,
}: BackgroundRippleEffectProps) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number
    col: number
  } | null>(null)
  const [rippleKey, setRippleKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden pointer-events-auto",
        "[--cell-border-color:rgba(255,255,255,0.08)] [--cell-fill-color:rgba(255,255,255,0.02)] [--cell-shadow-color:rgba(255,255,255,0.05)]",
        "dark:[--cell-border-color:rgba(255,255,255,0.07)] dark:[--cell-fill-color:rgba(255,255,255,0.02)] dark:[--cell-shadow-color:rgba(255,255,255,0.04)]",
        className
      )}
    >
      <style>{\`
        @keyframes cell-ripple {
          0% {
            opacity: 0.35;
            background-color: var(--cell-fill-color);
          }
          50% {
            opacity: 0.95;
            background-color: rgba(59, 130, 246, 0.25);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4) inset;
          }
          100% {
            opacity: 0.35;
            background-color: var(--cell-fill-color);
          }
        }
        .animate-cell-ripple {
          animation: cell-ripple var(--duration, 200ms) ease-out var(--delay, 0ms) 1 forwards;
        }
      \`}</style>

      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        <DivGrid
          key={\`base-\${rippleKey}\`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col })
            setRippleKey((k) => k + 1)
          }}
          interactive
        />
      </div>
    </div>
  )
}

type DivGridProps = {
  className?: string
  rows: number
  cols: number
  cellSize: number
  borderColor: string
  fillColor: string
  clickedCell: { row: number; col: number } | null
  onCellClick?: (row: number, col: number) => void
  interactive?: boolean
}

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string
  ["--duration"]?: string
}

const DivGrid = ({
  className,
  rows = 8,
  cols = 27,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  )

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: \`repeat(\${cols}, \${cellSize}px)\`,
    gridTemplateRows: \`repeat(\${rows}, \${cellSize}px)\`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  }

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols)
        const colIdx = idx % cols
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0
        const delay = clickedCell ? Math.max(0, distance * 55) : 0
        const duration = 200 + distance * 80

        const style: CellStyle = clickedCell
          ? {
              "--delay": \`\${delay}ms\`,
              "--duration": \`\${duration}ms\`,
            }
          : {}

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform cursor-pointer hover:opacity-100 hover:bg-white/10 dark:hover:bg-white/10",
              clickedCell && "animate-cell-ripple",
              !interactive && "pointer-events-none cursor-default"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        )
      })}
    </div>
  )
}`

  const usageSnippet = `import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"

export function HeroSection() {
  return (
    <div className="relative min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white">Interactive Ripple</h1>
        <p className="text-neutral-400 mt-2">Click any grid cell to trigger waves</p>
      </div>
    </div>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Background Ripple Effect</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          A grid of interactive cells that ripple across the screen when clicked. Perfect for hero sections and call-to-action backdrops.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Full Showcase */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Interactive Clickable Ripple Grid
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Click on any grid box to see the ripple shockwave propagate outward.
          </p>
          <div className="flex justify-center p-2 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <BackgroundRippleEffectDemo />
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
                  className="rounded p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
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

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                Copy and paste the following code into your project at{" "}
                <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-zinc-300">
                  components/ui/background-ripple-effect.tsx
                </code>
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
                <th className="p-3 font-semibold">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">rows</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">8</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Number of rows in the grid.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">cols</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">27</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Number of columns in the grid.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">cellSize</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">56</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Size of each square cell in pixels.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Optional additional styling classes for the container.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

