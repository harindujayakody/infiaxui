"use client"

import React from "react"
import { ImageGenerationLoader } from "@/components/ui/image-generation-loader"
import { cn } from "@/lib/utils"

export function ImageGenerationLoaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      <ImageGenerationLoader
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
        alt="Cybernetic Abstract Sphere"
        duration={3600}
        autoStart={true}
      />
    </div>
  )
}

export function ImageGenerationLoaderBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="w-full max-w-[260px] scale-90">
        <ImageGenerationLoader
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
          alt="Preview loader"
          duration={3000}
          autoStart={true}
        />
      </div>
    </div>
  )
}
