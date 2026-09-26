"use client"

import React, { useState } from "react"
import { Copy, Check, Terminal, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  GlareHoverDemoCTA,
  GlareHoverDemoAlert,
} from "@/components/magicui/glare-hover-demo"

export function GlareHoverGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import type { ComponentProps, CSSProperties } from "react"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export interface GlareHoverProps extends ComponentProps<"div"> {
  width?: string
  height?: string
  background?: string
  color?: Color
  opacity?: number
  angle?: number
  size?: number
  duration?: number
  playOnce?: boolean
}

type Color = \`#\${string}\`
type RGBA = \`rgba(\${number},\${number},\${number},\${number})\`

function parseHEX(color: Color, opacity: number): RGBA | Color {
  const hex = color.replace("#", "")
  const parse = (h: string) => Number.parseInt(h, 16)
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return \`rgba(\${parse(hex.slice(0, 2))},\${parse(hex.slice(2, 4))},\${parse(hex.slice(4, 6))},\${opacity})\`
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return \`rgba(\${parse(hex[0] + hex[0])},\${parse(hex[1] + hex[1])},\${parse(hex[2] + hex[2])},\${opacity})\`
  }

  return color
}

export function GlareHover({
  background = "transparent",
  children,
  color = "#ffffff",
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}: GlareHoverProps) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity])

  const cssVars = {
    "--gh-angle": \`\${angle}deg\`,
    "--gh-duration": \`\${duration}ms\`,
    "--gh-size": \`\${size}%\`,
    "--gh-rgba": rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  } as CSSProperties

  return (
    <div
      {...props}
      className={cn(
        "relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        !playOnce &&
          "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        playOnce &&
          "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
        "hover:before:[background-position:100%_100%,0_0]",
        className
      )}
      style={cssVars}
    >
      {children}
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Glare Hover"
        componentSlug="glare-hover"
        dependencies=""
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/glare-hover.tsx"
      />

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore various glare sweep styles, custom angles, CTA hero cards, and status alerts.
        </p>
      </div>

      {/* Example 1: CTA Banner */}
      <div id="example-cta" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Call To Action (CTA)
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Add an optical sheen to conversion banners and premium tier cards.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <GlareHoverDemoCTA />
        </div>
      </div>

      {/* Example 2: Alerts */}
      <div id="example-alerts" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Alerts &amp; Notifications
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Highlight critical alerts, system warnings, or important toasts with responsive hover glares.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <GlareHoverDemoAlert />
        </div>
      </div>

      {/* Example 3: Angle and Size */}
      <div id="example-angle-size" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Angle &amp; Tile Size
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Configure <code className="text-zinc-200 font-mono text-xs">angle</code> (in degrees) and <code className="text-zinc-200 font-mono text-xs">size</code> (in percentage) to tailor the sweep geometry.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "code-angle",
                `<GlareHover className="rounded-lg" angle={-30} size={280}>\n  <Card>{/* ... */}</Card>\n</GlareHover>`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "code-angle" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`<GlareHover className="rounded-lg" angle={-30} size={280}>
  <Card>{/* ... */}</Card>
</GlareHover>`}</code>
          </pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Comprehensive API properties for <code className="text-[var(--text-main)] font-mono">&lt;GlareHover /&gt;</code>.
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
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Content inside the wrapper.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Classes on the root element.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">background</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"transparent"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Root container background color.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">color</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"#ffffff"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Glare highlight (hex #rgb / #rrggbb).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">opacity</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0.5</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Alpha for parsed glare color.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">angle</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">-45</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Gradient angle in degrees (--gh-angle).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">size</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">250</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Glare tile size in percentage (--gh-size).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">duration</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">650</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Transition duration in ms (--gh-duration).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">playOnce</td>
                <td className="p-3.5 text-[var(--text-muted)]">boolean</td>
                <td className="p-3.5 text-emerald-400">false</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">If true, animation runs on hover only.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">width</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Optional width on the root style.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">height</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Optional height on the root style.</td>
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
            href="https://github.com/chishiyac"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @chishiyac <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
