"use client"

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
      <style>{`
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
      `}</style>

      <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
        <DivGrid
          key={`base-${rippleKey}`}
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
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
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
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
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
}
