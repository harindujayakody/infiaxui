"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipCardDemo } from "./tooltip-card-demo"

export function TooltipCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/tooltip-card-demo`

  const componentSourceCode = `"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TooltipProps {
  content: string | React.ReactNode
  children: React.ReactNode
  containerClassName?: string
}

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [height, setHeight] = useState(0)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isVisible, content])

  const calculatePosition = (mouseX: number, mouseY: number) => {
    if (!contentRef.current || !containerRef.current)
      return { x: mouseX + 12, y: mouseY + 12 }

    const tooltip = contentRef.current
    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Get tooltip dimensions
    const tooltipWidth = 240 // min-w-[15rem] = 240px
    const tooltipHeight = tooltip.scrollHeight

    // Calculate absolute position relative to viewport
    const absoluteX = containerRect.left + mouseX
    const absoluteY = containerRect.top + mouseY

    let finalX = mouseX + 12
    let finalY = mouseY + 12

    // Check if tooltip goes beyond right edge
    if (absoluteX + 12 + tooltipWidth > viewportWidth) {
      finalX = mouseX - tooltipWidth - 12
    }

    // Check if tooltip goes beyond left edge
    if (absoluteX + finalX < 0) {
      finalX = -containerRect.left + 12
    }

    // Check if tooltip goes beyond bottom edge
    if (absoluteY + 12 + tooltipHeight > viewportHeight) {
      finalY = mouseY - tooltipHeight - 12
    }

    // Check if tooltip goes beyond top edge
    if (absoluteY + finalY < 0) {
      finalY = -containerRect.top + 12
    }

    return { x: finalX, y: finalY }
  }

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    setMouse({ x: mouseX, y: mouseY })
    const newPosition = calculatePosition(mouseX, mouseY)
    setPosition(newPosition)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    updateMousePosition(mouseX, mouseY)
  }

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 })
    setPosition({ x: 0, y: 0 })
    setIsVisible(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    updateMousePosition(mouseX, mouseY)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = touch.clientX - rect.left
    const mouseY = touch.clientY - rect.top
    updateMousePosition(mouseX, mouseY)
    setIsVisible(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false)
      setMouse({ x: 0, y: 0 })
      setPosition({ x: 0, y: 0 })
    }, 2000)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault()
      if (isVisible) {
        setIsVisible(false)
        setMouse({ x: 0, y: 0 })
        setPosition({ x: 0, y: 0 })
      } else {
        const rect = e.currentTarget.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        updateMousePosition(mouseX, mouseY)
        setIsVisible(true)
      }
    }
  }

  useEffect(() => {
    if (isVisible && contentRef.current) {
      const newPosition = calculatePosition(mouse.x, mouse.y)
      setPosition(newPosition)
    }
  }, [isVisible, height, mouse.x, mouse.y])

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={String(isVisible)}
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="pointer-events-none absolute z-50 min-w-[15rem] overflow-hidden rounded-md border border-neutral-200/80 bg-white shadow-lg ring-1 ring-black/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/50 dark:ring-white/10"
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            <div
              ref={contentRef}
              className="p-3 text-sm text-neutral-600 md:p-4 dark:text-neutral-300"
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const TooltipCard = Tooltip`

  const usageSnippet = `import { Tooltip, TooltipCard } from "@/components/ui/tooltip-card"

export function Example() {
  return (
    <p className="text-sm text-neutral-400">
      Hover over this{" "}
      <Tooltip
        content={
          <div className="space-y-1">
            <h4 className="font-semibold text-white">Interactive Card</h4>
            <p className="text-xs text-neutral-400">
              This card smoothly tracks your cursor and flips position at screen edges.
            </p>
          </div>
        }
      >
        <span className="cursor-pointer font-bold text-white underline">highlighted keyword</span>
      </Tooltip>{" "}
      to see the tooltip card in action.
    </p>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Tooltip Card</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          A tooltip card container that follows mouse pointer when hovered over. Powered by Framer Motion spring physics with intelligent viewport edge-detection.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Full Narrative Showcase */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Hover Trigger Narrative
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Move your cursor over <strong>AWS</strong>, <strong>Tyler Durden</strong>, or <strong>testimonial</strong> to see cards track the pointer.
          </p>
          <div className="flex justify-center p-6 sm:p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <TooltipCardDemo />
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
                  components/ui/tooltip-card.tsx
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
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">content</td>
                <td className="p-3 text-zinc-400 font-normal">string | React.ReactNode</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The content to display inside the tooltip card (text, rich markup, or images).
                </td>
                <td className="p-3 text-emerald-400 font-medium">Yes</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">children</td>
                <td className="p-3 text-zinc-400 font-normal">React.ReactNode</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  The element that triggers the tooltip on hover or mobile tap.
                </td>
                <td className="p-3 text-emerald-400 font-medium">Yes</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">containerClassName</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Additional CSS classes to apply to the inline trigger container.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
