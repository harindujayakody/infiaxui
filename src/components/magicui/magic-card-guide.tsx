"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { MagicCardOrbDemo } from "@/components/magicui/magic-card-demo"

export function MagicCardGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { cn } from "@/lib/utils"

export interface MagicCardBaseProps {
  children?: React.ReactNode
  className?: string
  gradientSize?: number
  gradientFrom?: string
  gradientTo?: string
}

export interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient"
  gradientColor?: string
  gradientOpacity?: number
  glowFrom?: never
  glowTo?: never
  glowAngle?: never
  glowSize?: never
  glowBlur?: never
  glowOpacity?: never
}

export interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: "orb"
  glowFrom?: string
  glowTo?: string
  glowAngle?: number
  glowSize?: number
  glowBlur?: number
  glowOpacity?: number
  gradientColor?: never
  gradientOpacity?: never
}

export type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps
type ResetReason = "enter" | "leave" | "global" | "init"

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === "orb"
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient",
  } = props

  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? "#ee4f27") : "#ee4f27"
  const glowTo = isOrbMode(props) ? (props.glowTo ?? "#6b21ef") : "#6b21ef"
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDarkTheme = useMemo(() => {
    if (typeof document === "undefined") return true
    return document.documentElement.classList.contains("dark") || true
  }, [mounted])

  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 })
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 })

  const modeRef = useRef(mode)
  const glowOpacityRef = useRef(glowOpacity)
  const gradientSizeRef = useRef(gradientSize)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    glowOpacityRef.current = glowOpacity
  }, [glowOpacity])

  useEffect(() => {
    gradientSizeRef.current = gradientSize
  }, [gradientSize])

  const reset = useCallback(
    (reason: ResetReason = "leave") => {
      const currentMode = modeRef.current

      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current)
        else orbVisible.set(0)
        return
      }

      const off = -gradientSizeRef.current
      mouseX.set(off)
      mouseY.set(off)
    },
    [mouseX, mouseY, orbVisible]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  useEffect(() => {
    reset("init")
  }, [reset])

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-transparent shadow-xl transition-colors",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
      style={{
        background: useMotionTemplate\`
          linear-gradient(var(--bg-card, #161616) 0 0) padding-box,
          radial-gradient(\${gradientSize}px circle at \${mouseX}px \${mouseY}px,
            \${gradientFrom},
            \${gradientTo},
            var(--border-subtle, #262626) 100%
          ) border-box
        \`,
      }}
    >
      <div className="bg-[var(--bg-card,#161616)] absolute inset-px z-20 rounded-[inherit]" />

      {mode === "gradient" && (
        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate\`
              radial-gradient(\${gradientSize}px circle at \${mouseX}px \${mouseY}px,
                \${gradientColor},
                transparent 100%
              )
            \`,
            opacity: gradientOpacity,
          }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          suppressHydrationWarning
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: \`blur(\${glowBlur}px)\`,
            opacity: orbVisible,
            background: \`linear-gradient(\${glowAngle}deg, \${glowFrom}, \${glowTo})\`,
            mixBlendMode: isDarkTheme ? "screen" : "multiply",
            willChange: "transform, opacity",
          }}
        />
      )}
      <div className="relative z-40">{children}</div>
    </motion.div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Magic Card"
        componentSlug="magic-card"
        dependencies="framer-motion"
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/magic-card.tsx"
      />

      {/* Usage Section */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Wrap any content or card layout with <code className="text-zinc-200 font-mono text-xs">&lt;MagicCard&gt;</code> to activate hover cursor tracking.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "usage-code",
                `import { MagicCard } from "@/components/magicui/magic-card"\n\nexport function CardDemo() {\n  return (\n    <MagicCard>\n      <div className="p-6">\n        <h4 className="font-semibold text-white">Interactive Card</h4>\n        <p className="text-xs text-zinc-400">Hover across the surface</p>\n      </div>\n    </MagicCard>\n  )\n}`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "usage-code" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`import { MagicCard } from "@/components/magicui/magic-card"

export function CardDemo() {
  return (
    <MagicCard>
      <div className="p-6">
        <h4 className="font-semibold text-white">Interactive Card</h4>
        <p className="text-xs text-zinc-400">Hover across the surface</p>
      </div>
    </MagicCard>
  )
}`}</code>
          </pre>
        </div>
      </div>

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore alternate illumination modes including spring-damped luminous orbs and custom gradient spectra.
        </p>
      </div>

      {/* Example: Orb Mode */}
      <div id="example-orb" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Orb Mode
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Render a spring-damped luminous sphere using <code className="text-zinc-200 font-mono text-xs">mode="orb"</code> that glides across the card interior.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <MagicCardOrbDemo />
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;MagicCard /&gt;</code>.
        </p>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-[var(--text-muted)]">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">children</td>
                <td className="p-3.5 text-[var(--text-muted)]">React.ReactNode</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Content rendered inside the card.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Additional CSS classes applied to root card.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">mode</td>
                <td className="p-3.5 text-[var(--text-muted)]">"gradient" | "orb"</td>
                <td className="p-3.5 text-emerald-400">"gradient"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Display effect: spotlight gradient or glowing orb.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gradientSize</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">200</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Radius of cursor spotlight in pixels.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gradientColor</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#262626"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Inner radial sheen tint.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gradientOpacity</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.8</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Maximum opacity of radial spotlight overlay.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gradientFrom</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#9E7AFF"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Start color of active border gradient.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gradientTo</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#FE8BBB"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">End color of active border gradient.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">glowFrom</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#ee4f27"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Start color of orb glow (orb mode only).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">glowTo</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#6b21ef"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">End color of orb glow (orb mode only).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">glowSize</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">420</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Diameter of orb sphere in pixels.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">glowBlur</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">60</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Blur filter radius for soft diffusion.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">glowOpacity</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.9</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Target opacity of orb on mouse hover.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits Section */}
      <div id="credits" className="scroll-mt-20 space-y-2 pt-6 border-t border-[var(--border-subtle)] text-[13px] text-[var(--text-muted)]">
        <h4 className="font-semibold text-[var(--text-main)] text-[14px]">Credits</h4>
        <p>
          Component designed and credited to{" "}
          <a
            href="https://magicui.design/docs/components/magic-card"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Yeom-JinHo"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Yeom-JinHo <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
