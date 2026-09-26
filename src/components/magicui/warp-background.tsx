"use client"

import React, { useCallback, useMemo, type HTMLAttributes } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

interface BeamProps {
  width: string | number
  x: string | number
  delay: number
  duration: number
}

const Beam = ({ width, x, delay, duration }: BeamProps) => {
  const hue = useMemo(() => Math.floor(Math.random() * 360), [])
  const ar = useMemo(() => Math.floor(Math.random() * 10) + 1, [])

  return (
    <motion.div
      style={
        {
          left: typeof x === "number" ? `${x}%` : x,
          width: typeof width === "number" ? `${width}%` : width,
          aspectRatio: `1 / ${ar}`,
          background: `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
        } as React.CSSProperties
      }
      className="absolute top-0 pointer-events-none"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border-subtle, rgba(255, 255, 255, 0.12))",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ x, delay })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams = useMemo(() => generateBeams(), [generateBeams])

  const sideStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${gridColor} 0 1px, transparent 1px ${beamSize}%), linear-gradient(90deg, ${gridColor} 0 1px, transparent 1px ${beamSize}%)`,
    backgroundSize: `${beamSize}% ${beamSize}%`,
    backgroundPosition: "50% -0.5px, 50% 50%",
    transformStyle: "preserve-3d",
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-16",
        className
      )}
      {...props}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          containerType: "size",
          clipPath: "inset(0)",
        }}
        className="pointer-events-none absolute inset-0 size-full overflow-hidden"
      >
        {/* top side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotateX(-90deg)",
            transformOrigin: "50% 0%",
            height: "100cqmax",
            width: "100cqi",
          }}
          className="absolute top-0 left-0 z-20"
        >
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* bottom side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotateX(-90deg)",
            transformOrigin: "50% 0%",
            height: "100cqmax",
            width: "100cqi",
          }}
          className="absolute top-full left-0 z-20"
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* left side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotate(90deg) rotateX(-90deg)",
            transformOrigin: "0% 0%",
            height: "100cqmax",
            width: "100cqh",
          }}
          className="absolute top-0 left-0 z-20"
        >
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* right side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotate(-90deg) rotateX(-90deg)",
            transformOrigin: "100% 0%",
            height: "100cqmax",
            width: "100cqh",
          }}
          className="absolute top-0 right-0 z-20"
        >
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>

      <div className="relative z-30">{children}</div>
    </div>
  )
}
