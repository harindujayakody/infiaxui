"use client"

import React, { useState } from "react"
import { AnimatedTestimonials, type Testimonial } from "@/components/ui/animated-testimonials"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

// 1. Primary Showcase matching screenshot media_1790460726622.png
export function AnimatedTestimonialsDemo() {
  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-4 sm:p-6 shadow-2xl overflow-hidden">
      <AnimatedTestimonials testimonials={sampleTestimonials} />
    </div>
  )
}

// 2. Blocks Page Preview (Compact interactive preview for /blocks)
export function AnimatedTestimonialsBlockPreview() {
  const [active, setActive] = useState(0)
  const [rotations] = useState<number[]>([-6, 5, -3])

  const previewItems = sampleTestimonials.slice(0, 3)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev + 1) % previewItems.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev - 1 + previewItems.length) % previewItems.length)
  }

  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="grid grid-cols-12 gap-3 sm:gap-4 w-full max-w-sm items-center">
        {/* Thumbnail Card Stack */}
        <div className="col-span-5 relative h-28 sm:h-32 w-full">
          <AnimatePresence>
            {previewItems.map((item, index) => {
              const rot = rotations[index] ?? 0
              const isCurrent = index === active
              return (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.9, rotate: rot }}
                  animate={{
                    opacity: isCurrent ? 1 : 0.6,
                    scale: isCurrent ? 1 : 0.92,
                    rotate: isCurrent ? 0 : rot,
                    zIndex: isCurrent ? 30 : previewItems.length - index,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="size-full rounded-2xl object-cover shadow-lg border border-neutral-700/60"
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Content & Mini Nav */}
        <div className="col-span-7 flex flex-col justify-between py-1">
          <motion.div
            key={active}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-bold text-white truncate">
              {previewItems[active].name}
            </p>
            <p className="text-[10px] text-neutral-400 truncate">
              {previewItems[active].designation}
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-neutral-300 line-clamp-3">
              &ldquo;{previewItems[active].quote}&rdquo;
            </p>
          </motion.div>

          <div className="flex gap-2 pt-2.5">
            <button
              onClick={handlePrev}
              aria-label="Previous preview"
              className="flex size-6 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <ArrowLeft className="size-3" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next preview"
              className="flex size-6 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
