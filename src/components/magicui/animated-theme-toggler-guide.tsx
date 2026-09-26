"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles, Layers, Sliders, Shapes } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ThemeTogglerDemo,
  ThemeTogglerStarDemo,
  ThemeTogglerDiamondDemo,
  ThemeTogglerHexagonDemo,
} from "./animated-theme-toggler-demo"

export function AnimatedThemeTogglerGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/animated-theme-toggler`

  const componentSourceCode = `"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star"

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  fromCenter?: boolean
  theme?: "light" | "dark"
  onThemeChange?: (theme: "light" | "dark") => void
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ")
  return \`polygon(\${pairs})\`
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => \`\${(x / viewportWidth) * 100}%\`
  const toY = (y: number) => \`\${(y / viewportHeight) * 100}%\`
  const point = (x: number, y: number) => \`\${toX(x)} \${toY(y)}\`
  const toRadius = (r: number) =>
    \`\${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%\`

  switch (variant) {
    case "circle":
      return [
        \`circle(0% at \${point(cx, cy)})\`,
        \`circle(\${toRadius(maxRadius)} at \${point(cx, cy)})\`,
      ]
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), \`polygon(\${end})\`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 3), \`polygon(\${verts})\`]
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), \`polygon(\${end})\`]
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2
      const verts: string[] = []
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)))
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        \`polygon(\${verts.join(", ")})\`,
      ]
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), \`polygon(\${end})\`]
    }
    case "star": {
      const R = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const starPolygon = (radius: number) => {
        const verts: string[] = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA)
            )
          )
          const innerA = outerA + Math.PI / 5
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          )
        }
        return \`polygon(\${verts.join(", ")})\`
      }
      const startR = Math.max(2, R * 0.025)
      return [starPolygon(startR), starPolygon(R)]
    }
    default:
      return [
        \`circle(0% at \${point(cx, cy)})\`,
        \`circle(\${toRadius(maxRadius)} at \${point(cx, cy)})\`,
      ]
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  variant,
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}: AnimatedThemeTogglerProps) => {
  const shape = variant ?? "circle"
  const isControlled = theme !== undefined
  const [internalIsDark, setInternalIsDark] = useState(false)
  const isDark = isControlled ? theme === "dark" : internalIsDark
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)
  const activeAnimRef = useRef<Animation | null>(null)

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel()
    activeAnimRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      cancelAnim()
      const root = document.documentElement
      if (root.dataset.magicuiThemeVt !== "active") return
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
    }
  }, [cancelAnim])

  useEffect(() => {
    if (isControlled) return
    const updateTheme = () => {
      setInternalIsDark(document.documentElement.classList.contains("dark"))
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [isControlled])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (
      !button ||
      isTransitioningRef.current ||
      document.documentElement.dataset.magicuiThemeVt === "active"
    )
      return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x: number
    let y: number
    if (fromCenter) {
      x = viewportWidth / 2
      y = viewportHeight / 2
    } else {
      const { top, left, width, height } = button.getBoundingClientRect()
      x = left + width / 2
      y = top + height / 2
    }

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const newTheme = !isDark
      document.documentElement.classList.toggle("dark")
      if (isControlled) {
        onThemeChange?.(newTheme ? "dark" : "light")
      } else {
        setInternalIsDark(newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      }
    }

    const doc = document as any
    if (typeof doc.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const clipPath = getThemeTransitionClipPaths(
      shape,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    )

    const root = document.documentElement
    root.dataset.magicuiThemeVt = "active"
    root.style.setProperty("--magicui-theme-toggle-vt-duration", \`\${duration}ms\`)
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0])
    const cleanup = () => {
      isTransitioningRef.current = false
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
      cancelAnim()
    }

    isTransitioningRef.current = true
    const transition = doc.startViewTransition(() => {
      flushSync(applyTheme)
    })
    if (typeof transition?.finished?.finally === "function") {
      transition.finished.finally(cleanup).catch(() => {})
    } else {
      cleanup()
    }

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready
        .then(() => {
          const anim = document.documentElement.animate(
            { clipPath },
            {
              duration,
              easing: shape === "star" ? "linear" : "ease-in-out",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          )
          activeAnimRef.current = anim
        })
        .catch(() => {})
    }
  }, [shape, fromCenter, duration, isDark, isControlled, onThemeChange, cancelAnim])

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-transform active:scale-95",
        className
      )}
      {...props}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}`

  const globalCssCode = `::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Scoped to AnimatedThemeToggler — sets data-attribute only during toggle */
html[data-magicui-theme-vt="active"]::view-transition-group(root) {
  animation-duration: var(--magicui-theme-toggle-vt-duration);
}`

  return (
    <div className="space-y-12 pb-16 text-zinc-200">
      {/* Overview Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Theme Toggler
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
          Animated theme toggle using the View Transitions API with configurable clip-path shapes and origin.
        </p>
      </div>

      {/* Main Preview Showcase */}
      <div className="space-y-4">
        <ThemeTogglerDemo />
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
                  @/components/ui/animated-theme-toggler.tsx
                </code>
                :
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[400px]">
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

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                2. Add the required View Transitions CSS into your global stylesheet (e.g.{" "}
                <code className="text-zinc-200 bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono">
                  index.css
                </code>
                ):
              </p>
              <div className="relative rounded-xl border border-white/10 bg-[#161616] p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <button
                  onClick={() => copyToClipboard(globalCssCode, "css")}
                  className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-white transition-colors"
                  title="Copy CSS"
                >
                  {copiedKey === "css" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre>{globalCssCode}</pre>
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
                `import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <span>My App</span>
      <AnimatedThemeToggler variant="circle" />
    </nav>
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
          <pre>{`import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <span>My App</span>
      <AnimatedThemeToggler variant="circle" />
    </nav>
  )
}`}</pre>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">Examples</h2>

        {/* Star */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Shapes className="size-4 text-zinc-400" />
            Star Shape Reveal
          </h3>
          <p className="text-sm text-zinc-400">
            Expand the view transition in a 5-point star geometry across the entire viewport.
          </p>
          <ThemeTogglerStarDemo />
        </div>

        {/* Diamond */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Shapes className="size-4 text-zinc-400" />
            Diamond Shape Reveal
          </h3>
          <p className="text-sm text-zinc-400">
            Rotate a 4-point diamond mask from the button position outward.
          </p>
          <ThemeTogglerDiamondDemo />
        </div>

        {/* Hexagon */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <Shapes className="size-4 text-zinc-400" />
            Hexagon Shape Reveal
          </h3>
          <p className="text-sm text-zinc-400">
            A geometric 6-sided polygon reveal animation.
          </p>
          <ThemeTogglerHexagonDemo />
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
                <td className="py-3 px-4 text-emerald-400">variant</td>
                <td className="py-3 px-4 text-zinc-400">
                  "circle" | "square" | "triangle" | "diamond" | "hexagon" | "rectangle" | "star"
                </td>
                <td className="py-3 px-4 text-zinc-500">"circle"</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Shape used for the view-transition clip-path reveal.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">duration</td>
                <td className="py-3 px-4 text-zinc-400">number</td>
                <td className="py-3 px-4 text-zinc-500">400</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Duration of the theme transition animation in milliseconds.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">fromCenter</td>
                <td className="py-3 px-4 text-zinc-400">boolean</td>
                <td className="py-3 px-4 text-zinc-500">false</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  If true, expands from viewport center instead of button center.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">theme</td>
                <td className="py-3 px-4 text-zinc-400">"light" | "dark"</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Controlled theme value when parent owns persistence (e.g. next-themes).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-emerald-400">onThemeChange</td>
                <td className="py-3 px-4 text-zinc-400">(theme: "light" | "dark") =&gt; void</td>
                <td className="py-3 px-4 text-zinc-500">—</td>
                <td className="py-3 px-4 font-sans text-zinc-400">
                  Callback invoked on theme toggle. Pair with `theme` prop.
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
          <a
            href="https://nazam-kalsi-portfolio.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline font-medium"
          >
            Nazam Kalsi
          </a>
          ,{" "}
          <a
            href="https://github.com/chishiyac"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline font-medium"
          >
            chishiyac
          </a>
          , and{" "}
          <a
            href="https://github.com/dikshantgulekar20-oss"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:underline font-medium"
          >
            dikshantgulekar20-oss
          </a>
          .
        </p>
      </div>
    </div>
  )
}
