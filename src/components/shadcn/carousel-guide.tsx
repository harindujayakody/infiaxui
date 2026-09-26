import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronLeft, ChevronRight, Play, Pause, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function CarouselGuide() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const totalSlides = 5

  const slides = [
    { title: "Quantum Compute Engine", desc: "Scale cluster workloads across high-throughput distributed nodes.", color: "from-indigo-600 to-blue-500" },
    { title: "Realtime Edge Networking", desc: "Ultra-low latency edge delivery with global multi-region routing.", color: "from-purple-600 to-indigo-500" },
    { title: "Vector Database Indexing", desc: "High-dimensional embeddings indexed in sub-millisecond lookups.", color: "from-emerald-600 to-teal-500" },
    { title: "Autonomous Agent Fleet", desc: "Self-healing pipeline workers executing concurrent workflows.", color: "from-amber-600 to-orange-500" },
    { title: "Unified Identity & Auth", desc: "Fine-grained cryptographic session keys and zero-trust perimeter.", color: "from-rose-600 to-pink-500" },
  ]

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build fluid swipeable carousels using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Carousel</code> primitives:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Carousel (opts={{ align: 'start', loop: true }})",
            "├── CarouselContent",
            "│   ├── CarouselItem (className='basis-1/3')",
            "│   └── CarouselItem",
            "├── CarouselPrevious",
            "└── CarouselNext",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Carousel Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Smooth sliding carousel with next/prev navigation and slide status indicator.
        </p>

        <div className="p-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-xl mx-auto space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-8 h-full flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-mono">
                      Slide {currentIndex + 1} of {totalSlides}
                    </span>
                    <div className="size-3 rounded-full bg-gradient-to-r ${slides[currentIndex].color}" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-main)]">
                    {slides[currentIndex].title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm">
                    {slides[currentIndex].desc}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[var(--bg-subtle)] h-1 rounded-full overflow-hidden mt-6">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    currentIndex === i ? "w-6 bg-[var(--text-main)]" : "w-1.5 bg-[var(--border-subtle)]"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="size-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)] transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={nextSlide}
                className="size-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)] transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
        />
      </section>

      {/* Sizing & Spacing */}
      <section id="sizes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sizes & Spacing</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control responsive item width with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">basis-*</code> utilities and negative margin spacing.
        </p>

        <CodeBlock
          language="tsx"
          code={`// 3 Items on desktop, 2 on tablet, 1 on mobile
<Carousel>
  <CarouselContent className="-ml-4">
    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
      <Card />
    </CarouselItem>
    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
      <Card />
    </CarouselItem>
    <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
      <Card />
    </CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pass <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">{'opts={{ direction: "rtl" }}'}</code> and rotate navigation buttons in RTL layouts.
        </p>

        <CodeBlock
          language="tsx"
          code={`<Carousel dir="rtl" opts={{ direction: "rtl" }}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="rtl:rotate-180" />
  <CarouselNext className="rtl:rotate-180" />
</Carousel>`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">opts</td>
                <td className="p-3 font-mono">EmblaOptionsType</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Configuration options passed directly to the Embla engine</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3 font-mono">"horizontal"</td>
                <td className="p-3">Scroll snap axis orientation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">plugins</td>
                <td className="p-3 font-mono">EmblaPluginType[]</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Embla plugins such as Autoplay or AutoScroll</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
