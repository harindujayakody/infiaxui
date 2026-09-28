"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowingEffectDemo } from "./glowing-effect-demo"

export function GlowingEffectGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add glowing-effect-demo`

  const componentSourceCode = `"use client"

import React, { memo, useCallback, useEffect, useRef } from "react"
import { animate } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlowingEffectProps {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  variant?: "default" | "white"
  glow?: boolean
  className?: string
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}

export const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = true,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const lastPosition = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>(0)

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current
          if (!element) return

          const { left, top, width, height } = element.getBoundingClientRect()
          const mouseX = e ? e.x : lastPosition.current.x
          const mouseY = e ? e.y : lastPosition.current.y

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY }
          }

          const center = [left + width * 0.5, top + height * 0.5]
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          )
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0")
            return
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity

          element.style.setProperty("--active", isActive ? "1" : "0")

          if (!isActive) return

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
          const newAngle = currentAngle + angleDiff

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value))
            },
          })
        })
      },
      [inactiveZone, proximity, movementDuration]
    )

    useEffect(() => {
      if (disabled) return

      const onPointerMove = (e: PointerEvent) => {
        handleMove(e)
      }

      window.addEventListener("pointermove", onPointerMove, { passive: true })
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        window.removeEventListener("pointermove", onPointerMove)
      }
    }, [disabled, handleMove])

    const gradientColors =
      variant === "white"
        ? \`repeating-conic-gradient(
            from 0deg,
            #ffffff 0deg,
            rgba(255, 255, 255, 0.4) 60deg,
            rgba(255, 255, 255, 0.1) 120deg,
            rgba(255, 255, 255, 0.4) 180deg,
            #ffffff 240deg
          )\`
        : \`radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
           radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
           radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
           radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
           repeating-conic-gradient(
             from 0deg,
             #dd7bbb 0deg,
             #ffbe0b 60deg,
             #06d6a0 120deg,
             #118ab2 180deg,
             #8338ec 240deg,
             #dd7bbb 360deg
           )\`

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-300",
            glow && "opacity-100",
            disabled && "!hidden"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": \`\${blur}px\`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": \`\${borderWidth}px\`,
              "--repeating-conic-gradient": gradientColors,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--repeating-conic-gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
            )}
          />
        </div>
      </>
    )
  }
)

GlowingEffect.displayName = "GlowingEffect"`

  const usageCode = `import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function Example() {
  return (
    <div className="relative rounded-2xl border border-white/10 p-6 bg-[#0c0d12]">
      <GlowingEffect
        spread={40}
        glow={true}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white">Do things the right way</h3>
        <p className="text-sm text-zinc-400 mt-2">
          A border glowing effect that adapts to any container or card, as seen on Cursor's website.
        </p>
      </div>
    </div>
  )
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Glowing Effect</h1>
        <p className="text-base text-zinc-400">
          A border glowing effect that adapts to any container or card, as seen on Cursor's website.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <GlowingEffectDemo />
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#18181b] border border-white/10">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-mono text-sm text-zinc-200">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-400" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/glowing-effect.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                >
                  {copiedKey === "manual-comp" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto">
          <button
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Props Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121214]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">spread</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">20</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Angular spread of the glowing border spotlight.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">proximity</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Distance threshold in px from container edge to activate glow.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">inactiveZone</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0.7</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Deadzone radius ratio from center where glow deactivates.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">borderWidth</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">1</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Thickness of the glowing border line in px.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">variant</td>
                <td className="px-4 py-3 text-purple-400">"default" | "white"</td>
                <td className="px-4 py-3 text-zinc-500">"default"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Color spectrum theme: iridescent rainbow or monochrome white.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

