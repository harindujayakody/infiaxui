"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedTestimonialsDemo } from "./animated-testimonials-demo"

export function AnimatedTestimonialsGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add animated-testimonials-demo`

  const componentSourceCode = `"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

export interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: AnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0)

  const [rotations] = useState<number[]>(() =>
    testimonials.map(() => Math.floor(Math.random() * 21) - 10)
  )

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, testimonials.length])

  return (
    <div
      className={cn(
        "mx-auto max-w-sm px-4 py-8 sm:py-12 md:max-w-4xl md:px-8 lg:px-12 font-sans antialiased",
        className
      )}
    >
      <div className="relative grid grid-cols-1 gap-10 sm:gap-14 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
        {/* Left Column: Image Stack */}
        <div className="flex justify-center items-center">
          <div className="relative h-72 sm:h-80 md:h-84 lg:h-96 w-full max-w-[340px] sm:max-w-[380px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => {
                const rot = rotations[index] ?? 0
                return (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rot,
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : rot,
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -50, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: rot,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center shadow-xl border border-neutral-200/40 dark:border-neutral-800/80"
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Content & Controls */}
        <div className="flex flex-col justify-between py-2 sm:py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex gap-4 pt-8 sm:pt-10 md:pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-900 dark:text-neutral-200 transition-transform duration-300 group-hover/button:-translate-x-0.5 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-900 dark:text-neutral-200 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}`

  const usageSnippet = `import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Animated Testimonials</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          Minimal testimonials sections with image stack perspective animations and word-by-word blur reveals.
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
            Interactive Testimonial Carousel
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Click next/prev buttons to cycle through quotes with animated stacked photos and staggered text blur.
          </p>
          <div className="flex justify-center p-2 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <AnimatedTestimonialsDemo />
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
                  components/ui/animated-testimonials.tsx
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
                <td className="p-3 text-amber-400 font-bold">testimonials</td>
                <td className="p-3 text-zinc-400 font-normal">
                  Array&lt;&#123; quote: string; name: string; designation: string; src: string &#125;&gt;
                </td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Array of testimonial objects containing the quote, author name, designation, and image source URL.
                </td>
                <td className="p-3 text-emerald-400 font-medium">Yes</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">autoplay</td>
                <td className="p-3 text-zinc-400 font-normal">boolean</td>
                <td className="p-3 text-zinc-500 font-normal">false</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Whether to automatically cycle through testimonials every 5 seconds.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">-</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Optional additional styling classes for the container.
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

