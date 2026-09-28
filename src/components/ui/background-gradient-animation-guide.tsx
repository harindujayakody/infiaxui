"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundGradientAnimationDemo } from "./background-gradient-animation-demo"

export function BackgroundGradientAnimationGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add background-gradient-animation-demo`

  const componentSourceCode = `"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const interactiveRef = useRef<HTMLDivElement>(null)

  const curX = useRef(0)
  const curY = useRef(0)
  const tgX = useRef(0)
  const tgY = useRef(0)

  useEffect(() => {
    let animationFrameId: number
    const move = () => {
      if (interactiveRef.current) {
        curX.current += (tgX.current - curX.current) / 20
        curY.current += (tgY.current - curY.current) / 20
        interactiveRef.current.style.transform = \`translate(\${Math.round(
          curX.current
        )}px, \${Math.round(curY.current)}px)\`
      }
      animationFrameId = requestAnimationFrame(move)
    }

    animationFrameId = requestAnimationFrame(move)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      tgX.current = event.clientX - rect.left
      tgY.current = event.clientY - rect.top
    }
  }

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={
        {
          "--gradient-background-start": gradientBackgroundStart,
          "--gradient-background-end": gradientBackgroundEnd,
          "--first-color": firstColor,
          "--second-color": secondColor,
          "--third-color": thirdColor,
          "--fourth-color": fourthColor,
          "--fifth-color": fifthColor,
          "--pointer-color": pointerColor,
          "--size": size,
          "--blending-value": blendingValue,
        } as React.CSSProperties
      }
      className={cn(
        "relative h-full w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10 size-full", className)}>
        {children}
      </div>
      <div
        className={cn(
          "gradients-container absolute inset-0 size-full blur-lg pointer-events-none select-none",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-100"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-400px)]",
            "animate-second",
            "opacity-100"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%+400px)]",
            "animate-third",
            "opacity-100"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-200px)]",
            "animate-fourth",
            "opacity-70"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
            "animate-fifth",
            "opacity-100"
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
              "opacity-70"
            )}
          />
        )}
      </div>
    </div>
  )
}`

  const tailwindSnippet = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
    },
  },
}`

  const usageSnippet = `import React from "react"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation containerClassName="h-[500px] w-full rounded-2xl">
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-5xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/95 via-white/80 to-white/30">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  )
}`

  return (
    <div className="space-y-10">
      {/* Preview Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Background Gradient Animation
          </h2>
          <p className="text-neutral-400 mt-1">
            A smooth and elegant background gradient animation that changes the gradient position over time.
          </p>
        </div>
        <BackgroundGradientAnimationDemo />
      </section>

      {/* Installation Tabs */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Installation</h3>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#18181B] border border-white/10 p-1">
            <TabsTrigger
              value="cli"
              className="data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-neutral-400"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-neutral-400"
            >
              Manual
            </TabsTrigger>
            <TabsTrigger
              value="tailwind"
              className="data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-neutral-400"
            >
              Tailwind Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-xl border border-white/10 bg-[#121212] p-4 font-mono text-sm text-neutral-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-neutral-400" />
                  <span>{cliCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Copy CLI command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-neutral-400">
                1. Copy and paste the following code into{" "}
                <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white">
                  src/components/ui/background-gradient-animation.tsx
                </code>
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#121212] p-4 font-mono text-xs text-neutral-300 max-h-[420px] overflow-y-auto">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "source")}
                  className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Copy component code"
                >
                  {copiedKey === "source" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre className="pr-10">{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tailwind" className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-neutral-400">
                Add the keyframe animations to your{" "}
                <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white">
                  tailwind.config.js
                </code>
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#121212] p-4 font-mono text-xs text-neutral-300 max-h-[420px] overflow-y-auto">
                <button
                  onClick={() => copyToClipboard(tailwindSnippet, "tailwind")}
                  className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Copy tailwind config code"
                >
                  {copiedKey === "tailwind" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre className="pr-10">{tailwindSnippet}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Usage</h3>
        <div className="relative rounded-xl border border-white/10 bg-[#121212] p-4 font-mono text-xs text-neutral-300">
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre className="pr-10">{usageSnippet}</pre>
        </div>
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Props</h3>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121212]">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs uppercase text-neutral-400 font-mono">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 font-semibold text-white">gradientBackgroundStart</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;rgb(108, 0, 162)&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Starting RGB background gradient color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">gradientBackgroundEnd</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;rgb(0, 17, 82)&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Ending RGB background gradient color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">firstColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;18, 113, 255&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Primary animated gradient blob color (RGB channel values).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">secondColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;221, 74, 255&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Secondary gradient blob color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">thirdColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;100, 220, 255&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Tertiary gradient blob color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">fourthColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;200, 50, 50&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Quaternary gradient blob color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">fifthColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;180, 180, 50&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Quinary gradient blob color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">pointerColor</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;140, 100, 255&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Interactive pointer-following gradient color.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">size</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;80%&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Diameter/size of gradient blobs relative to container.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">blendingValue</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-400">&quot;hard-light&quot;</td>
                <td className="px-4 py-3 font-sans text-neutral-400">CSS mix-blend-mode applied to blobs.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">interactive</td>
                <td className="px-4 py-3 text-emerald-400">boolean</td>
                <td className="px-4 py-3 text-neutral-400">true</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Whether a gradient blob follows mouse movement.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">containerClassName</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-500">undefined</td>
                <td className="px-4 py-3 font-sans text-neutral-400">Tailwind class names applied to outer container.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

