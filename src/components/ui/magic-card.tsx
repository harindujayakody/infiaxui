import React, { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
}

export function MagicCard({
  children,
  className,
  gradientSize = 280,
  gradientColor = "#4F39F6",
  gradientOpacity = 0.18,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos(null)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--text-muted)] hover:shadow-xl",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered && mousePos ? 1 : 0,
          background: mousePos
            ? `radial-gradient(${gradientSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor}2a, transparent 75%)`
            : undefined,
        }}
      />

      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered && mousePos ? 1 : 0,
          background: mousePos
            ? `radial-gradient(${gradientSize * 0.75}px circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor}80, transparent 70%)`
            : undefined,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
