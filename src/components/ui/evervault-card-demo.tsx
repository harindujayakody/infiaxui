"use client"

import React from "react"
import { EvervaultCard, Icon } from "@/components/ui/evervault-card"
import { cn } from "@/lib/utils"

export function EvervaultCardDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] rounded-3xl bg-[#121214]">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

        <EvervaultCard text="hover" />

        <h2 className="text-white mt-4 text-sm font-light">
          Hover over this card to reveal an encrypted matrix overlay and radial gradient mask.
        </h2>
        <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5">
          Watch me hover
        </p>
      </div>
    </div>
  )
}

export function EvervaultCardBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="w-full max-w-[220px] scale-90 border border-white/10 rounded-2xl p-2 bg-[#121214]">
        <EvervaultCard text="vault" className="h-36" />
      </div>
    </div>
  )
}
