"use client"

import React from "react"
import { CometCard } from "@/components/ui/comet-card"

// 1. Primary Showcase matching screenshot media_1790460860157.png
export function CometCardDemo() {
  return (
    <div className="flex w-full items-center justify-center py-6 sm:py-10">
      <CometCard>
        <button
          type="button"
          className="my-4 flex w-[280px] sm:w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2.5 sm:p-4 saturate-0 transition-shadow duration-300 hover:shadow-2xl"
          aria-label="View invite F7RA"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          <div className="mx-1 sm:mx-2 flex-1">
            <div className="relative mt-1 sm:mt-2 aspect-[3/4] w-full overflow-hidden rounded-[16px]">
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75 brightness-95"
                alt="Invite background"
                src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                  opacity: 1,
                }}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-shrink-0 items-center justify-between px-2 sm:px-4 py-3 font-mono text-white">
            <div className="text-xs font-medium tracking-wide">Comet Invitation</div>
            <div className="text-xs text-gray-300 opacity-50 font-mono">#F7RA</div>
          </div>
        </button>
      </CometCard>
    </div>
  )
}

// 2. Blocks Page Preview (Interactive preview for /blocks)
export function CometCardBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-3 select-none">
      <CometCard rotateDepth={12} translateDepth={12}>
        <div
          className="flex w-52 cursor-pointer flex-col items-stretch rounded-[14px] bg-[#1F2121] p-2 saturate-0 shadow-xl border border-neutral-800/50"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px]">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[12px] bg-black object-cover contrast-75 brightness-95"
              alt="Invite background"
              src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=600&auto=format&fit=crop"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between px-2 py-1.5 font-mono text-[11px] text-white">
            <span className="font-medium">Comet Invite</span>
            <span className="text-gray-400 opacity-60">#F7RA</span>
          </div>
        </div>
      </CometCard>
    </div>
  )
}
