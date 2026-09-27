"use client"

import React from "react"
import { ChromaticImage } from "@/components/ui/chromatic-image"
import { cn } from "@/lib/utils"

export function ChromaticImageDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[460px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      <div className="w-full max-w-sm">
        <ChromaticImage
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1284&auto=format&fit=crop"
          alt="Starry sky sunset landscape"
          className="aspect-[4/5] w-full rounded-2xl border border-white/10 shadow-2xl"
          zoom={0.25}
          displacement={0.08}
          chromaticShift={0.02}
          tilt={0.35}
        />
      </div>
    </div>
  )
}

export function ChromaticImageBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="w-28 sm:w-32">
        <ChromaticImage
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
          alt="Chromatic preview"
          className="aspect-[4/5] w-full rounded-xl border border-white/10 shadow-lg"
          zoom={0.2}
          displacement={0.06}
          chromaticShift={0.015}
          tilt={0.25}
        />
      </div>
    </div>
  )
}
