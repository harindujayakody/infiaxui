"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  MarqueeVerticalDemo,
  Marquee3DDemo,
} from "@/components/magicui/marquee-demo"

export function MarqueeGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap,1rem)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap,1rem)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Marquee"
        componentSlug="marquee"
        dependencies=""
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/marquee.tsx"
      />

      {/* Usage Section */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Place logos, testimonials, or media cards inside <code className="text-zinc-200 font-mono text-xs">&lt;Marquee&gt;</code> to create seamless looping carousels.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "usage-marquee",
                `import { Marquee } from "@/components/magicui/marquee"\n\nexport function LogoCloud() {\n  return (\n    <Marquee pauseOnHover className="[--duration:20s]">\n      <span>Next.js</span>\n      <span>React</span>\n      <span>TypeScript</span>\n      <span>Tailwind CSS</span>\n    </Marquee>\n  )\n}`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "usage-marquee" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`import { Marquee } from "@/components/magicui/marquee"

export function LogoCloud() {
  return (
    <Marquee pauseOnHover className="[--duration:20s]">
      <span>Next.js</span>
      <span>React</span>
      <span>TypeScript</span>
      <span>Tailwind CSS</span>
    </Marquee>
  )
}`}</code>
          </pre>
        </div>
      </div>

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore vertical column marquees and 3D isometric perspective flows.
        </p>
      </div>

      {/* Example 1: Vertical Marquee */}
      <div id="example-vertical" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Vertical
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Render two vertical columns moving in opposite directions using <code className="text-zinc-200 font-mono text-xs">vertical</code> and <code className="text-zinc-200 font-mono text-xs">reverse</code>.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <MarqueeVerticalDemo />
        </div>
      </div>

      {/* Example 2: 3D Marquee */}
      <div id="example-3d" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          3D Perspective
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Tilt multi-column marquees in 3D space with CSS transforms for high-impact social proof walls.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <Marquee3DDemo />
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;Marquee /&gt;</code>.
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
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Content elements to display in the marquee loop.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Custom CSS classes applied to the root container.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">reverse</td>
                <td className="p-3.5 text-[var(--text-muted)]">boolean</td>
                <td className="p-3.5 text-emerald-400">false</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Reverse the scroll direction (right-to-left or bottom-to-top).
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">pauseOnHover</td>
                <td className="p-3.5 text-[var(--text-muted)]">boolean</td>
                <td className="p-3.5 text-emerald-400">false</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Pause the animation when cursor hovers over the marquee.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">vertical</td>
                <td className="p-3.5 text-[var(--text-muted)]">boolean</td>
                <td className="p-3.5 text-emerald-400">false</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Display and animate the marquee vertically.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">repeat</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">4</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">
                  Number of times to duplicate children to ensure continuous seamless loop.
                </td>
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
            href="https://magicui.design/docs/components/marquee"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
