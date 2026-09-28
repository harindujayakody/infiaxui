"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CometCardDemo } from "./comet-card-demo"

export function CometCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add comet-card-demo`

  const componentSourceCode = `"use client"

import React, { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion"
import { cn } from "@/lib/utils"

export interface CometCardProps {
  rotateDepth?: number
  translateDepth?: number
  className?: string
  children: React.ReactNode
}

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}: CometCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [\`-\${rotateDepth}deg\`, \`\${rotateDepth}deg\`]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [\`\${rotateDepth}deg\`, \`-\${rotateDepth}deg\`]
  )

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [\`-\${translateDepth}px\`, \`\${translateDepth}px\`]
  )
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [\`\${translateDepth}px\`, \`-\${translateDepth}px\`]
  )

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])

  const glareBackground = useMotionTemplate\`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)\`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      className={cn("perspective-distant transform-3d", className)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
        className="relative rounded-2xl"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.6,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  )
}`

  const usageSnippet = `import { CometCard } from "@/components/ui/comet-card"

export function CometCardDemo() {
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
              alt="Invite background"
              src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
          <div className="text-xs">Comet Invitation</div>
          <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
        </div>
      </button>
    </CometCard>
  )
}`

  return (
    <div className="space-y-10 text-[var(--text-main)]">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Comet Card</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A perspective, 3D, Tilt card as seen on Perplexity Comet's website.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Preview
        </h3>
        <div className="relative flex min-h-[460px] w-full items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-4 sm:p-8">
          <CometCardDemo />
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="pt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="size-4 shrink-0 text-amber-400" />
                  <span className="text-zinc-300">{cliCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
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

          <TabsContent value="manual" className="pt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                1. Install required dependencies:
              </p>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex items-center justify-between">
                  <span>npm install framer-motion</span>
                  <button
                    onClick={() =>
                      copyToClipboard("npm install framer-motion", "dep")
                    }
                    className="rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    aria-label="Copy install command"
                  >
                    {copiedKey === "dep" ? (
                      <Check className="size-3.5 text-green-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                2. Copy the component code into{" "}
                <code className="text-amber-400 bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded font-mono">
                  @/components/ui/comet-card.tsx
                </code>
                :
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
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">rotateDepth</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">17.5</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Controls the depth of 3D rotation effect on mouse movement. Higher values create more dramatic rotation.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">translateDepth</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">20</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Controls the depth of translation (movement) effect on mouse movement. Higher values create more dramatic movement.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Additional CSS classes to apply to the card container.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">children</td>
                <td className="p-3 text-zinc-400 font-normal">React.ReactNode</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Content to be rendered inside the card.
                </td>
                <td className="p-3 text-emerald-400 font-semibold">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

