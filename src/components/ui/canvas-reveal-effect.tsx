"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface CanvasRevealEffectProps {
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[59, 130, 246], [139, 92, 246]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: CanvasRevealEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener("resize", handleResize)

    const spacing = 12
    const cols = Math.ceil(width / spacing)
    const rows = Math.ceil(height / spacing)

    // Pre-create dot data
    const dots: {
      x: number
      y: number
      colorIdx: number
      phase: number
      speed: number
    }[] = []

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing + spacing / 2,
          y: j * spacing + spacing / 2,
          colorIdx: Math.floor(Math.random() * colors.length),
          phase: Math.random() * Math.PI * 2,
          speed: (0.5 + Math.random() * 0.8) * animationSpeed,
        })
      }
    }

    let time = 0

    const render = () => {
      time += 0.05
      ctx.clearRect(0, 0, width, height)

      for (let k = 0; k < dots.length; k++) {
        const dot = dots[k]
        const wave = Math.sin(dot.phase + time * dot.speed)
        const opacityIdx = Math.floor(
          ((wave + 1) / 2) * (opacities.length - 1)
        )
        const opacity = opacities[opacityIdx] ?? 0.5
        const color = colors[dot.colorIdx] || [255, 255, 255]

        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
        ctx.fillRect(
          dot.x - dotSize / 2,
          dot.y - dotSize / 2,
          dotSize,
          dotSize
        )
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [animationSpeed, colors, dotSize, opacities])

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-transparent",
        containerClassName
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      )}
    </div>
  )
}
