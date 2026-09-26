"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LensDemo } from "./lens-demo"

export function LensGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/lens-demo`

  const componentSourceCode = `"use client"

import React, { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface LensProps {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  position?: {
    x: number
    y: number
  }
  isStatic?: boolean
  isFocusing?: () => void
  hovering?: boolean
  setHovering?: (hovering: boolean) => void
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [localIsHovering, setLocalIsHovering] = useState(false)

  const isHovering = hovering !== undefined ? hovering : localIsHovering
  const setIsHovering = setHovering || setLocalIsHovering

  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg z-20"
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: \`radial-gradient(circle \${lensSize / 2}px at \${
                position.x
              }px \${position.y}px, black 100%, transparent 100%)\`,
              WebkitMaskImage: \`radial-gradient(circle \${lensSize / 2}px at \${
                position.x
              }px \${position.y}px, black 100%, transparent 100%)\`,
              transformOrigin: \`\${position.x}px \${position.y}px\`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: \`scale(\${zoomFactor})\`,
                transformOrigin: \`\${position.x}px \${position.y}px\`,
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: \`radial-gradient(circle \${lensSize / 2}px at \${
                    mousePosition.x
                  }px \${mousePosition.y}px, black 100%, transparent 100%)\`,
                  WebkitMaskImage: \`radial-gradient(circle \${
                    lensSize / 2
                  }px at \${mousePosition.x}px \${
                    mousePosition.y
                  }px, black 100%, transparent 100%)\`,
                  transformOrigin: \`\${mousePosition.x}px \${mousePosition.y}px\`,
                  zIndex: 50,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: \`scale(\${zoomFactor})\`,
                    transformOrigin: \`\${mousePosition.x}px \${mousePosition.y}px\`,
                  }}
                >
                  {children}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}`

  const usageSnippet = `import { useState } from "react"
import { Lens } from "@/components/ui/lens"
import { motion } from "framer-motion"

export function LensDemo() {
  const [hovering, setHovering] = useState(false)

  return (
    <div className="w-full relative rounded-3xl overflow-hidden max-w-md mx-auto bg-gradient-to-r from-[#1D2235] to-[#121318] p-8">
      <Lens hovering={hovering} setHovering={setHovering} zoomFactor={1.5} lensSize={170}>
        <img
          src="https://images.unsplash.com/photo-1713869820987-519844949a8a?q=80&w=3500&auto=format&fit=crop"
          alt="Apple Vision Pro"
          className="rounded-2xl w-full"
        />
      </Lens>
      <motion.div
        animate={{ filter: hovering ? "blur(2px)" : "blur(0px)" }}
        className="py-4"
      >
        <h2 className="text-white text-2xl font-bold">Apple Vision Pro</h2>
        <p className="text-neutral-300 mt-2 text-sm">
          Hover over the image above to zoom into details with the interactive lens.
        </p>
      </motion.div>
    </div>
  )
}`

  return (
    <div className="space-y-10 text-[var(--text-main)]">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lens</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A lens component to zoom into images, videos, or practically anything.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Preview
        </h3>
        <div className="relative flex min-h-[500px] w-full items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-4 sm:p-8">
          <LensDemo />
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
                1. Install required animation dependencies:
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
                  @/components/ui/lens.tsx
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
                <td className="p-3 text-amber-400 font-bold">zoomFactor</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">1.5</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Zoom scale factor applied to the content inside the lens.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">lensSize</td>
                <td className="p-3 text-zinc-400 font-normal">number</td>
                <td className="p-3 text-zinc-500 font-normal">170</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Diameter of the circular magnifying lens in pixels.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">isStatic</td>
                <td className="p-3 text-zinc-400 font-normal">boolean</td>
                <td className="p-3 text-zinc-500 font-normal">false</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Whether the lens stays fixed at a stationary position instead of tracking the mouse.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">position</td>
                <td className="p-3 text-zinc-400 font-normal">&#123; x: number; y: number &#125;</td>
                <td className="p-3 text-zinc-500 font-normal">&#123; x: 200, y: 150 &#125;</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Coordinates of the lens center when isStatic is true.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">hovering</td>
                <td className="p-3 text-zinc-400 font-normal">boolean</td>
                <td className="p-3 text-zinc-500 font-normal">undefined</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Controlled hover state passed to synchronize external sibling elements.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">setHovering</td>
                <td className="p-3 text-zinc-400 font-normal">(hovering: boolean) =&gt; void</td>
                <td className="p-3 text-zinc-500 font-normal">undefined</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Callback function called when hover state changes.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">children</td>
                <td className="p-3 text-zinc-400 font-normal">React.ReactNode</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The content or media to be zoomed into.
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
