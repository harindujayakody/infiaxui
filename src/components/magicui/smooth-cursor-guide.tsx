"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Zap, MousePointer, ShieldCheck, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SmoothCursorDemo,
  SmoothCursorInteractiveDemo,
} from "./smooth-cursor-demo"

export function SmoothCursorGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add smooth-cursor`

  const componentSourceCode = `"use client"

import { useEffect, useRef, useState, type FC } from "react"
import { motion, useSpring } from "framer-motion"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
  containerRef?: React.RefObject<HTMLElement | null>
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch"
}

export const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      className="scale-75 origin-top-left pointer-events-none"
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
  containerRef,
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)

      if (!nextIsEnabled) {
        setIsVisible(false)
      }
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null
    const container = containerRef?.current

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothPointerMove = (clientPos: Position) => {
      let posX = clientPos.x
      let posY = clientPos.y

      if (container) {
        const rect = container.getBoundingClientRect()
        if (
          clientPos.x < rect.left ||
          clientPos.x > rect.right ||
          clientPos.y < rect.top ||
          clientPos.y > rect.bottom
        ) {
          setIsVisible(false)
          return
        }

        posX = clientPos.x - rect.left
        posY = clientPos.y - rect.top
      }

      setIsVisible(true)
      updateVelocity(clientPos)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(posX)
      cursorY.set(posY)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.95)

        if (timeout !== null) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          scale.set(1)
        }, 150)
      }
    }

    let rafId = 0
    let lastPoint: Position = { x: 0, y: 0 }

    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      lastPoint = { x: e.clientX, y: e.clientY }

      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(lastPoint)
        rafId = 0
      })
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
    }

    if (container) {
      container.style.cursor = "none"
      container.addEventListener("pointermove", throttledPointerMove, {
        passive: true,
      })
      container.addEventListener("pointerleave", handlePointerLeave)
    } else {
      document.body.style.cursor = "none"
      window.addEventListener("pointermove", throttledPointerMove, {
        passive: true,
      })
      window.addEventListener("pointerleave", handlePointerLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("pointermove", throttledPointerMove)
        container.removeEventListener("pointerleave", handlePointerLeave)
        container.style.cursor = ""
      } else {
        window.removeEventListener("pointermove", throttledPointerMove)
        window.removeEventListener("pointerleave", handlePointerLeave)
        document.body.style.cursor = "auto"
      }
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isEnabled, containerRef])

  if (!isEnabled) {
    return null
  }

  const isScoped = !!containerRef?.current

  return (
    <motion.div
      style={{
        position: isScoped ? "absolute" : "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: isScoped ? 40 : 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      {cursor}
    </motion.div>
  )
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Smooth Cursor
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          A customizable, physics-based smooth cursor animation component for React applications with dynamic rotational inertia.
        </p>
      </div>

      {/* Main Interactive Demo matching user reference */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white tracking-tight">Preview</h2>
          <span className="text-xs text-zinc-500 font-mono">Move mouse inside box</span>
        </div>
        <SmoothCursorDemo />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="size-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Smooth Physics</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dampened spring mass calculations provide natural inertia and satisfying cursor following.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="size-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Dynamic Rotation</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Rotates fluidly into the direction of motion based on velocity angles and angular velocity deltas.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">RAF Optimized</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pointermove listeners are throttled with requestAnimationFrame for 60-120 FPS performance.
            </p>
          </div>
        </div>
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-white/10 p-0.5">
            <TabsTrigger
              value="cli"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-3">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-500" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="text-zinc-400 hover:text-white transition-colors ml-2"
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
                1. Install the required animation dependencies:
              </p>
              <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-300">
                <span>npm install framer-motion</span>
                <button
                  onClick={() =>
                    copyToClipboard("npm install framer-motion", "dep")
                  }
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedKey === "dep" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                2. Copy and paste the component code into{" "}
                <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">
                  @/components/ui/smooth-cursor.tsx
                </code>
                :
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px]">
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

      {/* Interactive Variations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Interactive Playground</h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Switch between cursor styles and hover over interactive cards to test rotational physics and responsive scaling.
        </p>
        <SmoothCursorInteractiveDemo />
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <button
            onClick={() =>
              copyToClipboard(
                `import { SmoothCursor } from "@/components/ui/smooth-cursor"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-none">
      <SmoothCursor />
      {children}
    </div>
  )`,
                "usage"
              )
            }
            className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre>{`import { SmoothCursor } from "@/components/ui/smooth-cursor"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-none">
      <SmoothCursor />
      {children}
    </div>
  )`}</pre>
        </div>
      </div>

      {/* Hiding Default Cursor */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Hiding Default Browser Cursor</h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          To prevent the default OS cursor from showing simultaneously, add this global CSS rule:
        </p>
        <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <pre>{`/* app/globals.css */
* {
  cursor: none !important;
}

/* Optional: Preserve native I-beam cursor for inputs */
input,
textarea,
select {
  cursor: text !important;
}`}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Props</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#161616]">
          <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/5 font-mono text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">cursor</td>
                <td className="px-4 py-3 text-zinc-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">&lt;DefaultCursorSVG /&gt;</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Custom cursor component to replace the default pointer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">springConfig</td>
                <td className="px-4 py-3 text-zinc-400">SpringConfig</td>
                <td className="px-4 py-3 text-zinc-500">damping: 45, stiffness: 400</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Configuration object for spring physics and damping behavior</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-semibold">containerRef</td>
                <td className="px-4 py-3 text-zinc-400">RefObject&lt;HTMLElement&gt;</td>
                <td className="px-4 py-3 text-zinc-500">undefined (global)</td>
                <td className="px-4 py-3 font-sans text-zinc-300">Optional element container to restrict cursor movement bounds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SpringConfig Reference */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">SpringConfig Reference</h2>
        <div className="rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs sm:text-sm text-zinc-300">
          <pre>{`interface SpringConfig {
  damping: number    // Controls how quickly spring oscillation settles (default: 45)
  stiffness: number  // Controls the stiffness/snappiness of movement (default: 400)
  mass: number       // Controls virtual mass of the cursor (default: 1)
  restDelta: number  // Threshold at which animation is considered settled (default: 0.001)
}`}</pre>
        </div>
      </div>

      {/* Browser Support & Accessibility */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Browser Support & Accessibility</h2>
        <div className="p-4 rounded-xl border border-white/10 bg-[#161616] text-xs sm:text-sm text-zinc-400 space-y-2">
          <p>
            • Compatible with all modern browsers supporting <code className="text-zinc-200">requestAnimationFrame</code>, CSS transforms, and pointer events.
          </p>
          <p>
            • Automatically detects hover-capable fine pointers (<code className="text-zinc-200">(any-hover: hover) and (any-pointer: fine)</code>) and gracefully disables itself on touch-first mobile devices.
          </p>
          <p>
            • Ensure keyboard navigation remain accessible with standard outline focus rings when using global cursor hiding.
          </p>
        </div>
      </div>

      {/* Credits */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-4 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Credit to</span>
          <a
            href="https://twitter.com/Code_Parth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-medium"
          >
            @Code_Parth <ExternalLink className="size-3" />
          </a>
          <span>for original concept, adapted for Magic UI.</span>
        </div>
      </div>
    </div>
  )
}

