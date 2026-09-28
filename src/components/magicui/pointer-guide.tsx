"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PointerDemo } from "./pointer-demo"

export function PointerGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add pointer`

  const componentSourceCode = `"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type HTMLMotionProps,
} from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * A custom pointer component that displays an animated cursor.
 * Add this as a child to any component to enable a custom pointer when hovering.
 * You can pass custom children to render as the pointer.
 *
 * @component
 * @param {HTMLMotionProps<"div">} props - The component props
 */
export function Pointer({
  className,
  style,
  children,
  ...props
}: HTMLMotionProps<"div">): React.ReactNode {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parentElement =
      typeof window !== "undefined"
        ? (containerRef.current?.parentElement ?? null)
        : null

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsActive(true)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    if (parentElement) {
      parentElement.style.cursor = "none"
      parentElement.addEventListener("mousemove", handleMouseMove)
      parentElement.addEventListener("mouseenter", handleMouseEnter)
      parentElement.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (parentElement) {
        parentElement.style.cursor = ""
        parentElement.removeEventListener("mousemove", handleMouseMove)
        parentElement.removeEventListener("mouseenter", handleMouseEnter)
        parentElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [x, y])

  return (
    <>
      <div ref={containerRef} />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-50"
            style={{
              top: y,
              left: x,
              translateX: "-50%",
              translateY: "-50%",
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            {...props}
          >
            {children || (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1"
                viewBox="0 0 16 16"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "rotate-[-70deg] stroke-white text-black",
                  className
                )}
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}`

  const usageSnippet = `import { Pointer } from "@/components/magicui/pointer"

export function PointerDemo() {
  return (
    <div className="relative rounded-xl border border-white/10 p-10 bg-[#141414] text-center">
      <h3 className="text-xl font-semibold text-white">Hover over this card</h3>
      <p className="text-sm text-neutral-400 mt-1">Enjoy the custom animated pointer</p>
      
      {/* 1. Emoji custom pointer */}
      <Pointer>
        <div className="text-2xl">👆</div>
      </Pointer>
      
      {/* 2. Or colored arrow pointer */}
      {/* <Pointer className="fill-blue-500" /> */}
    </div>
  )
}`

  return (
    <div className="space-y-10">
      {/* Preview Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Pointer
          </h2>
          <p className="text-neutral-400 mt-1">
            A component that displays a pointer when hovering over an element.
          </p>
        </div>
        <PointerDemo />
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
                  src/components/magicui/pointer.tsx
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
                <td className="px-4 py-3 font-semibold text-white">children</td>
                <td className="px-4 py-3 text-emerald-400">React.ReactNode</td>
                <td className="px-4 py-3 text-neutral-500">undefined</td>
                <td className="px-4 py-3 font-sans text-neutral-400">
                  Custom elements (SVG, icon, or emoji) to render as the pointer instead of the default cursor arrow.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">className</td>
                <td className="px-4 py-3 text-emerald-400">string</td>
                <td className="px-4 py-3 text-neutral-500">undefined</td>
                <td className="px-4 py-3 font-sans text-neutral-400">
                  Tailwind CSS class applied to the default SVG arrow (e.g. `fill-blue-500` or `text-black`).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">style</td>
                <td className="px-4 py-3 text-emerald-400">React.CSSProperties</td>
                <td className="px-4 py-3 text-neutral-500">undefined</td>
                <td className="px-4 py-3 font-sans text-neutral-400">
                  Inline styles applied to the fixed motion pointer container.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-white">...props</td>
                <td className="px-4 py-3 text-emerald-400">HTMLMotionProps&lt;&quot;div&quot;&gt;</td>
                <td className="px-4 py-3 text-neutral-500">-</td>
                <td className="px-4 py-3 font-sans text-neutral-400">
                  Standard Framer Motion `motion.div` attributes (e.g. animation overrides, event handlers).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

