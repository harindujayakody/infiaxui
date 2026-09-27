"use client"

import React from "react"
import { CloudShader } from "@/components/ui/cloud-shader"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference screenshot media_1790461295062.png
export function CloudShaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[440px] sm:h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl select-none",
        className
      )}
    >
      <CloudShader
        speed={1}
        count={6}
        cloudColor="#fbf8f2"
        skyTopColor="#3876ba"
        skyBottomColor="#8cbfe8"
        className="size-full"
      />
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid
export function CloudShaderBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] select-none">
      <CloudShader
        speed={1}
        count={4}
        cloudColor="#fbf8f2"
        skyTopColor="#3876ba"
        skyBottomColor="#8cbfe8"
        className="size-full min-h-[200px]"
      />
    </div>
  )
}
