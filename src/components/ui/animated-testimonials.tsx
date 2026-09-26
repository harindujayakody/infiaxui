"use client"

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

  // Stable random rotation angles for each card so cards don't jitter during re-renders
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
}
