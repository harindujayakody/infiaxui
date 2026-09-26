"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal as TerminalIcon, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TerminalDemo, TerminalCustomDelayDemo } from "./terminal-demo"

export function TerminalGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/terminal`

  const terminalComponentCode = `"use client"

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react"
import {
  motion,
  useInView,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>

type TerminalTypingMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)
  useEffect(() => {
    if (!sequence || itemIndex === null) return
    if (!sequence.sequenceStarted) return
    if (hasStarted) return
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true)
    }
  }, [sequence, hasStarted, itemIndex])

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight font-mono", className)}
      onAnimationComplete={() => {
        if (!sequence) return
        if (itemIndex === null) return
        sequence.completeItem(itemIndex)
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: MotionElementType
  startOnView?: boolean
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received: " + typeof children)
  }

  const MotionComponent = motionElements[
    Component
  ] as unknown as TerminalTypingMotionComponent

  const [displayedText, setDisplayedText] = useState<string>("")
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const hasSequence = sequence !== null
  const sequenceStarted = sequence?.sequenceStarted ?? false
  const sequenceActiveIndex = sequence?.activeIndex ?? null
  const sequenceCompleteItemRef = useRef<
    SequenceContextValue["completeItem"] | null
  >(null)
  const sequenceItemIndexRef = useRef<number | null>(null)

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null
    sequenceItemIndexRef.current = itemIndex
  }, [sequence?.completeItem, itemIndex])

  useEffect(() => {
    let startTimeout: ReturnType<typeof setTimeout> | null = null

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true)
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay)
    }

    return () => {
      if (startTimeout !== null) {
        clearTimeout(startTimeout)
      }
    }
  }, [
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
  ])

  useEffect(() => {
    let typingEffect: ReturnType<typeof setInterval> | null = null

    if (started) {
      let i = 0
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1))
          i++
        } else {
          if (typingEffect !== null) {
            clearInterval(typingEffect)
          }
          const completeItem = sequenceCompleteItemRef.current
          const currentItemIndex = sequenceItemIndexRef.current
          if (completeItem && currentItemIndex !== null) {
            completeItem(currentItemIndex)
          }
        }
      }, duration)
    }

    return () => {
      if (typingEffect !== null) {
        clearInterval(typingEffect)
      }
    }
  }, [children, duration, started])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight font-mono", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  )
}

interface TerminalProps {
  children: React.ReactNode
  className?: string
  sequence?: boolean
  startOnView?: boolean
}

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const sequenceHasStarted = sequence ? !startOnView || isInView : false

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, activeIndex, sequenceHasStarted])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    const array = Children.toArray(children)
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "border-[var(--border-subtle)] bg-[#0A0A0A] z-0 h-full max-h-[500px] w-full max-w-lg rounded-xl border overflow-hidden shadow-2xl",
        className
      )}
    >
      <div className="border-[var(--border-subtle)] flex flex-col gap-y-2 border-b p-4 bg-zinc-950/60">
        <div className="flex flex-row gap-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-left">
        <code className="grid gap-y-1 overflow-auto">{wrappedChildren}</code>
      </pre>
    </div>
  )

  if (!sequence) return content

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  )
}`

  const usageSnippet = `import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal"

export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>> pnpm dlx shadcn@latest init</TypingAnimation>
      <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>
      <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
      <TypingAnimation>Success! Project initialization completed.</TypingAnimation>
    </Terminal>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Terminal</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          An implementation of the MacOS terminal. Useful for showcasing a command line interface with character-by-character typing animations and sequenced step-by-step terminal outputs.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Default Showcase */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Auto-Sequenced Terminal
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Each child starts automatically after the previous one finishes.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <TerminalDemo />
          </div>
        </div>

        {/* Example 2: Custom Delays */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Custom Delays
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Disable auto-sequencing with <code className="text-pink-400">sequence=&#123;false&#125;</code> and specify explicit <code className="text-pink-400">delay</code> values in milliseconds.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <TerminalCustomDelayDemo />
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
                  <TerminalIcon className="size-3.5 text-zinc-400" />
                  {cliCode}
                </span>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  1
                </span>
                <span>Copy and paste the component code into your project:</span>
              </div>
              <div className="relative max-h-96 overflow-y-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex justify-end pb-2">
                  <button
                    onClick={() => copyToClipboard(terminalComponentCode, "component-code")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "component-code" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
                <pre>{terminalComponentCode}</pre>
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
          <div className="flex justify-end pb-2">
            <button
              onClick={() => copyToClipboard(usageSnippet, "usage")}
              className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedKey === "usage" ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
          <pre>{usageSnippet}</pre>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          The terminal sequences its children automatically. Each <code className="text-sky-400">TypingAnimation</code> or <code className="text-sky-400">AnimatedSpan</code> starts when the previous finishes. Manual <code className="text-sky-400">delay</code> props are optional and typically unnecessary.
        </p>
      </div>

      {/* Props Reference Table */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props Reference
        </h3>

        {/* Terminal Props */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            Terminal
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">children</td>
                  <td className="p-3 text-zinc-400">ReactNode</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Terminal content: a list of TypingAnimation / AnimatedSpan.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">sequence</td>
                  <td className="p-3 text-zinc-400">boolean</td>
                  <td className="p-3 text-zinc-500">true</td>
                  <td className="p-3 font-sans text-zinc-300">Enable auto sequencing so each line starts after the previous.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">startOnView</td>
                  <td className="p-3 text-zinc-400">boolean</td>
                  <td className="p-3 text-zinc-500">true</td>
                  <td className="p-3 font-sans text-zinc-300">Start sequencing when the terminal enters the viewport.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AnimatedSpan Props */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            AnimatedSpan
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">children</td>
                  <td className="p-3 text-zinc-400">ReactNode</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Content to be faded into view.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">delay</td>
                  <td className="p-3 text-zinc-400">number</td>
                  <td className="p-3 text-zinc-500">0</td>
                  <td className="p-3 font-sans text-zinc-300">Delay in ms before animation starts (used when sequence is false).</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">startOnView</td>
                  <td className="p-3 text-zinc-400">boolean</td>
                  <td className="p-3 text-zinc-500">false</td>
                  <td className="p-3 font-sans text-zinc-300">If true, waits for viewport visibility before animating when unsequenced.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TypingAnimation Props */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            TypingAnimation
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">children</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Text to be typed out.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">duration</td>
                  <td className="p-3 text-zinc-400">number</td>
                  <td className="p-3 text-zinc-500">60</td>
                  <td className="p-3 font-sans text-zinc-300">Milliseconds per character.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">delay</td>
                  <td className="p-3 text-zinc-400">number</td>
                  <td className="p-3 text-zinc-500">0</td>
                  <td className="p-3 font-sans text-zinc-300">Delay in ms before typing starts (used when sequence is false).</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">as</td>
                  <td className="p-3 text-zinc-400">MotionElementType</td>
                  <td className="p-3 text-zinc-500">"span"</td>
                  <td className="p-3 font-sans text-zinc-300">The HTML tag / component type to render.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center justify-between">
        <span>Authored by @dillionverma for Magic UI.</span>
        <a
          href="https://magicui.design/docs/components/terminal"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
        >
          <span>Magic UI Docs</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}
