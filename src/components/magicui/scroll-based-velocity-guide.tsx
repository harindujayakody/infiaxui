"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ScrollBasedVelocityDemo,
  ScrollBasedVelocityImagesDemo,
} from "./scroll-based-velocity-demo"

export function ScrollBasedVelocityGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/scroll-based-velocity`

  const componentSourceCode = `"use client"

import React, { useContext, useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion"

import { cn } from "@/lib/utils"

export interface ScrollVelocityRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  scrollReactivity?: boolean
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(
  null
)

export function ScrollVelocityContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext)
  if (sharedVelocityFactor) {
    return (
      <ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} />
    )
  }
  return <ScrollVelocityRowLocal {...props} />
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
  velocityFactor: MotionValue<number>
}

function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  scrollReactivity = true,
  ...props
}: ScrollVelocityRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const [numCopies, setNumCopies] = useState(1)

  const baseX = useMotionValue(0)
  const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)
  const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1)
  const unitWidth = useMotionValue(0)

  const isInViewRef = useRef(true)
  const isPageVisibleRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const block = blockRef.current
    let ro: ResizeObserver | null = null
    let io: IntersectionObserver | null = null
    let mq: MediaQueryList | null = null
    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible"
    }
    const handlePRM = () => {
      if (mq) {
        prefersReducedMotionRef.current = mq.matches
      }
    }

    if (container && block) {
      const updateSizes = () => {
        const cw = container.offsetWidth || 0
        const bw = block.scrollWidth || 0
        unitWidth.set(bw)
        const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1
        setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies))
      }

      updateSizes()

      ro = new ResizeObserver(updateSizes)
      ro.observe(container)
      ro.observe(block)

      io = new IntersectionObserver(([entry]) => {
        isInViewRef.current = entry.isIntersecting
      })
      io.observe(container)

      document.addEventListener("visibilitychange", handleVisibility, {
        passive: true,
      })
      handleVisibility()

      mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", handlePRM)
      handlePRM()
    }

    return () => {
      if (ro) {
        ro.disconnect()
      }
      if (io) {
        io.disconnect()
      }
      document.removeEventListener("visibilitychange", handleVisibility)
      if (mq) {
        mq.removeEventListener("change", handlePRM)
      }
    }
  }, [children, unitWidth])

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1
    const offset = Number(v) || 0
    return \`\${-wrap(0, width, offset)}px\`
  })

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return
    const dt = delta / 1000
    const vf = scrollReactivity ? velocityFactor.get() : 0
    const absVf = Math.min(5, Math.abs(vf))
    const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf

    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection
    }

    const bw = unitWidth.get() || 0
    if (bw <= 0) return
    const pixelsPerSecond = (bw * baseVelocity) / 100
    const moveBy =
      currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <motion.div
        className="inline-flex transform-gpu items-center will-change-transform select-none"
        style={{ x }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0}
            className="inline-flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
  const { scrollY } = useScroll()
  const localVelocity = useVelocity(scrollY)
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })
  return (
    <ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />
  )
}`

  const usageSnippet = `import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <ScrollVelocityContainer className="text-4xl font-bold tracking-tight md:text-7xl">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Velocity Scroll
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Velocity Scroll
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-[#262626] p-1 rounded-xl">
            <TabsTrigger
              value="cli"
              className="text-xs font-medium text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white rounded-lg px-4 py-1.5 transition-all"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="text-xs font-medium text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white rounded-lg px-4 py-1.5 transition-all"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab Content */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-zinc-400" />
                  <code>{cliCode}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
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

          {/* Manual Tab Content */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-3">
              <p className="text-[13px] text-zinc-400">
                1. Install the required animation dependencies:
              </p>
              <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs text-zinc-200">
                <div className="flex items-center justify-between">
                  <code>npm install framer-motion</code>
                  <button
                    onClick={() => copyToClipboard("npm install framer-motion", "dep")}
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    aria-label="Copy install command"
                  >
                    {copiedKey === "dep" ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[13px] text-zinc-400">
                2. Copy and paste the following code into your project at{" "}
                <code className="text-zinc-200 font-mono text-xs">
                  components/magicui/scroll-based-velocity.tsx
                </code>
              </p>
              <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs overflow-x-auto max-h-[350px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "source")}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors z-10"
                  aria-label="Copy component code"
                >
                  {copiedKey === "source" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre className="text-zinc-300">
                  <code>{componentSourceCode}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Examples Header */}
      <section className="space-y-6 pt-6 border-t border-[#262626]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Examples</h2>
          <p className="text-[13px] text-zinc-400 mt-1">
            Dynamic scroll acceleration on multi-directional typography and media galleries.
          </p>
        </div>

        {/* Example 1: Text Velocity Scroll */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Typography Scroll Velocity</h3>
          <p className="text-[13px] text-zinc-400">
            Scroll the page up or down to watch the text accelerate proportionally in alternating directions.
          </p>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-hidden">
            <ScrollBasedVelocityDemo />
          </div>
        </div>

        {/* Example 2: Images Velocity Scroll */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Gallery Images Scroll Velocity</h3>
          <p className="text-[13px] text-zinc-400">
            Horizontally streaming visual cards that speed up as users browse faster.
          </p>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-hidden">
            <ScrollBasedVelocityImagesDemo />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="space-y-4 pt-6 border-t border-[#262626]">
        <h2 className="text-xl font-bold tracking-tight text-white">Usage</h2>
        <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors z-10"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre className="text-zinc-300">
            <code>{usageSnippet}</code>
          </pre>
        </div>
      </section>

      {/* Props Reference Table */}
      <section className="space-y-6 pt-6 border-t border-[#262626]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Props</h2>
          <p className="text-[13px] text-zinc-400 mt-1">
            API reference properties for <code className="text-zinc-200 font-mono text-xs">&lt;ScrollVelocityContainer /&gt;</code> and <code className="text-zinc-200 font-mono text-xs">&lt;ScrollVelocityRow /&gt;</code>.
          </p>
        </div>

        {/* ScrollVelocityContainer Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-200 font-mono">ScrollVelocityContainer</h3>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-[#262626] bg-[#181818] text-zinc-400">
                <tr>
                  <th className="p-3.5 font-semibold">Prop</th>
                  <th className="p-3.5 font-semibold">Type</th>
                  <th className="p-3.5 font-semibold">Default</th>
                  <th className="p-3.5 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-zinc-300">
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">className</td>
                  <td className="p-3.5 text-zinc-400">string</td>
                  <td className="p-3.5 text-zinc-400">—</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    The class name to be applied to the container.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">children</td>
                  <td className="p-3.5 text-zinc-400">React.ReactNode</td>
                  <td className="p-3.5 text-zinc-400">—</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    One or more ScrollVelocityRow components.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ScrollVelocityRow Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-zinc-200 font-mono">ScrollVelocityRow</h3>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-[#262626] bg-[#181818] text-zinc-400">
                <tr>
                  <th className="p-3.5 font-semibold">Prop</th>
                  <th className="p-3.5 font-semibold">Type</th>
                  <th className="p-3.5 font-semibold">Default</th>
                  <th className="p-3.5 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-zinc-300">
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">className</td>
                  <td className="p-3.5 text-zinc-400">string</td>
                  <td className="p-3.5 text-zinc-400">—</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    The class name to be applied to the row wrapper.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">children</td>
                  <td className="p-3.5 text-zinc-400">React.ReactNode</td>
                  <td className="p-3.5 text-zinc-400">—</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    Content to be cloned and scrolled continuously.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">baseVelocity</td>
                  <td className="p-3.5 text-zinc-400">number</td>
                  <td className="p-3.5 text-zinc-300">5</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    Base scroll velocity percentage of content width.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">direction</td>
                  <td className="p-3.5 text-zinc-400">1 | -1</td>
                  <td className="p-3.5 text-zinc-300">1</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    Scroll direction (1 = right-to-left, -1 = reverse).
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-zinc-200 font-semibold">scrollReactivity</td>
                  <td className="p-3.5 text-zinc-400">boolean</td>
                  <td className="p-3.5 text-zinc-300">true</td>
                  <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                    Toggles whether velocity dynamically reacts to page scroll.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Performance & Credits */}
      <section className="space-y-4 pt-6 border-t border-[#262626] text-[13px] text-zinc-400">
        <div>
          <h4 className="font-semibold text-white text-[14px]">Performance</h4>
          <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
            <li>Pauses animation loops automatically when offscreen or when tab is hidden.</li>
            <li>Respects <code className="text-zinc-200 font-mono text-xs">prefers-reduced-motion</code> accessibility preferences.</li>
          </ul>
        </div>
        <div className="pt-2">
          <h4 className="font-semibold text-white text-[14px]">Credits</h4>
          <p className="mt-1">
            Component designed and credited to{" "}
            <a
              href="https://magicui.design/docs/components/scroll-based-velocity"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors inline-flex items-center gap-1"
            >
              @whyismynamerudy <ExternalLink className="size-3" />
            </a>{" "}
            and Magic UI.
          </p>
        </div>
      </section>
    </div>
  )
}
