"use client"

import React from "react"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"

// 1. Primary Showcase matching media_1790456162138.png
export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 sm:py-14 select-none">
      <ScrollVelocityContainer className="w-full text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
        <ScrollVelocityRow baseVelocity={12} direction={1} className="py-2 sm:py-3">
          <span className="mx-4 text-white drop-shadow-sm">ScrollVelocity</span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={12} direction={-1} className="py-2 sm:py-3">
          <span className="mx-4 text-white drop-shadow-sm">ScrollVelocity</span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* Edge Gradient Fades for Slate Dark Theme */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
    </div>
  )
}

// 2. Images Showcase matching media_1790456167885.png
const IMAGES_ROW_A = [
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
]

const IMAGES_ROW_B = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
]

export function ScrollBasedVelocityImagesDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 select-none">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-3">
          {IMAGES_ROW_A.map((src, idx) => (
            <img
              key={`row-a-${idx}`}
              src={src}
              alt="Gallery thumbnail"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-3 inline-block h-36 sm:h-40 w-52 sm:w-60 rounded-2xl object-cover border border-zinc-800 shadow-lg"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-3">
          {IMAGES_ROW_B.map((src, idx) => (
            <img
              key={`row-b-${idx}`}
              src={src}
              alt="Gallery thumbnail"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-3 inline-block h-36 sm:h-40 w-52 sm:w-60 rounded-2xl object-cover border border-zinc-800 shadow-lg"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* Edge Gradient Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-[#161616] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-[#161616] to-transparent z-10" />
    </div>
  )
}

// 3. Compact Real Component Card Preview for /blocks Grid
export function ScrollBasedVelocityBlockPreview() {
  return (
    <div className="relative size-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] p-2 select-none">
      <ScrollVelocityContainer className="w-full text-2xl sm:text-3xl font-extrabold tracking-tight text-white/90">
        <ScrollVelocityRow baseVelocity={16} direction={1} className="py-1">
          <span className="mx-2 text-white/90">ScrollVelocity</span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={16} direction={-1} className="py-1">
          <span className="mx-2 text-zinc-400">ScrollVelocity</span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* Smooth Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}
