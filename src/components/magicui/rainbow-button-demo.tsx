"use client"

import React, { useState } from "react"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { ArrowRight, Sparkles } from "lucide-react"

// 1. Primary Showcase matching media_1790455798326.png
export function RainbowButtonDemo() {
  return (
    <div className="relative flex min-h-[300px] w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-8 shadow-2xl">
      <RainbowButton>
        <span>Get Unlimited Access</span>
      </RainbowButton>
    </div>
  )
}

// 2. Outline Variant Demo matching media_1790455804880.png
export function RainbowButtonOutlineDemo() {
  return (
    <div className="relative flex min-h-[300px] w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-8 shadow-2xl">
      <RainbowButton variant="outline">
        <span>Get Unlimited Access</span>
      </RainbowButton>
    </div>
  )
}

// 3. Size and icon showcase
export function RainbowButtonSizesDemo() {
  return (
    <div className="relative flex flex-wrap min-h-[260px] w-full max-w-xl items-center justify-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-8 shadow-2xl">
      <RainbowButton size="sm">
        <span>Small</span>
      </RainbowButton>
      <RainbowButton size="default">
        <Sparkles className="size-4" />
        <span>Default</span>
      </RainbowButton>
      <RainbowButton size="lg">
        <span>Large Access</span>
        <ArrowRight className="size-4" />
      </RainbowButton>
    </div>
  )
}

// 4. Blocks Page Preview (Real interactive RainbowButton, NO inner frame, NO dividing borders)
export function RainbowButtonBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center gap-3 p-4 select-none">
      <RainbowButton size="default" className="scale-95 sm:scale-100 shadow-xl pointer-events-none">
        <span>Get Unlimited Access</span>
      </RainbowButton>
      <RainbowButton variant="outline" size="sm" className="scale-90 pointer-events-none">
        <Sparkles className="size-3.5" />
        <span>Outline Rainbow</span>
      </RainbowButton>
    </div>
  )
}
