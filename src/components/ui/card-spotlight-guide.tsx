"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardSpotlightDemo } from "./card-spotlight-demo"

export function CardSpotlightGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add card-spotlight-demo`

  const componentSourceCode = `"use client"

import { useMotionValue, motion, useMotionTemplate } from "framer-motion"
import React, { MouseEvent as ReactMouseEvent, useState } from "react"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { cn } from "@/lib/utils"

export interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number
  color?: string
  children: React.ReactNode
}

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: CardSpotlightProps) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      className={cn(
        "group/spotlight p-8 sm:p-10 rounded-2xl relative border border-neutral-800 bg-black dark:border-neutral-800 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate\`
            radial-gradient(
              \${radius}px circle at \${mouseX}px \${mouseY}px,
              white,
              transparent 80%
            )
          \`,
          WebkitMaskImage: useMotionTemplate\`
            radial-gradient(
              \${radius}px circle at \${mouseX}px \${mouseY}px,
              white,
              transparent 80%
            )
          \`,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}`

  const usageSnippet = `import { CardSpotlight } from "@/components/ui/card-spotlight"

export function Example() {
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Authentication steps
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        Follow these steps to secure your account:
      </div>
    </CardSpotlight>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Card Spotlight</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          A card component with a spotlight effect revealing a radial gradient background and digital particle shimmer underneath the cursor.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Full Showcase */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Spotlight Reveal Card
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Hover over the card to reveal the interactive spotlight and matrix of glowing particles.
          </p>
          <div className="flex justify-center p-4 sm:p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <CardSpotlightDemo />
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-3.5 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-zinc-400" />
                  {cliCode}
                </span>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  aria-label="Copy CLI command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                Copy and paste the following code into your project at{" "}
                <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono text-zinc-300">
                  components/ui/card-spotlight.tsx
                </code>
              </p>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200 max-h-[420px] overflow-y-auto">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual")}
                  className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
                  aria-label="Copy source code"
                >
                  {copiedKey === "manual" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
                <pre className="text-zinc-300 leading-relaxed font-mono">
                  {componentSourceCode}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Usage
        </h3>
        <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-3.5 text-green-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-zinc-300 leading-relaxed font-mono">
            {usageSnippet}
          </pre>
        </div>
      </div>

      {/* Props Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props
        </h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] border-b border-[var(--border-subtle)] font-mono">
              <tr>
                <th className="p-3 font-semibold">Prop Name</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">children</td>
                <td className="p-3 text-zinc-400 font-normal">React.ReactNode</td>
                <td className="p-3 text-emerald-400 font-normal">Required</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The content to be rendered inside the card.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">radius</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">350</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The radius of the spotlight effect in pixels.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">color</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">&quot;#262626&quot;</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The background color of the spotlight effect.
                </td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Additional CSS classes to be applied to the container.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

