"use client"

import React, { useRef } from "react"
import { ResizableNavbar } from "@/components/ui/resizable-navbar"
import { cn } from "@/lib/utils"

export function ResizableNavbarDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl select-none",
        className
      )}
    >
      {/* Scrollable Container simulating a page with sticky navbar */}
      <div
        ref={containerRef}
        className="relative h-[560px] w-full overflow-y-auto overflow-x-hidden no-visible-scrollbar"
      >
        {/* Sticky Resizable Navbar */}
        <ResizableNavbar
          scrollContainerRef={containerRef}
          navItems={[
            { name: "Features", link: "#features" },
            { name: "Pricing", link: "#pricing" },
            { name: "Contact", link: "#contact" },
          ]}
        />

        {/* Page Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-xl mx-auto pt-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Check the navbar at the top of the container
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              For demo purpose we have kept the position as Sticky. Keep in mind that this component is fixed and will not move when scrolling.
            </p>
          </div>

          {/* Cards Grid matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="h-44 sm:h-52 rounded-2xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center p-6 text-white font-bold text-lg sm:text-xl shadow-lg">
              The
            </div>
            <div className="h-44 sm:h-52 rounded-2xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center p-6 text-white font-bold text-lg sm:text-xl shadow-lg sm:col-span-1">
              First
            </div>
            <div className="h-44 sm:h-52 rounded-2xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center p-6 text-white font-bold text-lg sm:text-xl shadow-lg">
              Rule
            </div>
            <div className="h-44 sm:h-52 rounded-2xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center p-6 text-white font-bold text-lg sm:text-xl shadow-lg sm:col-span-2">
              Of
            </div>
            <div className="h-44 sm:h-52 rounded-2xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center p-6 text-white font-bold text-lg sm:text-xl shadow-lg">
              F
            </div>
          </div>

          <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-600">
            Scroll down to test navbar width compression & blur effects
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResizableNavbarBlockPreview() {
  return (
    <div className="relative size-full flex flex-col items-center justify-start overflow-hidden bg-[#0A0A0A] p-3 select-none">
      {/* Mini Resized Navbar Pill */}
      <div className="w-[85%] max-w-[220px] rounded-full border border-white/10 bg-[#12141c]/90 px-3 py-1.5 flex items-center justify-between shadow-lg mb-3">
        <div className="flex items-center gap-1.5">
          <div className="size-3.5 rounded bg-white text-black font-bold text-[8px] flex items-center justify-center">
            A
          </div>
          <span className="text-[10px] font-bold text-white">Startup</span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] text-zinc-400">
          <span>Features</span>
          <span>Pricing</span>
        </div>
        <div className="rounded-full bg-white px-2 py-0.5 text-[7px] font-bold text-black">
          Book
        </div>
      </div>

      {/* Mini Dummy Cards */}
      <div className="grid grid-cols-2 gap-1.5 w-full max-w-[220px] scale-90">
        <div className="h-12 rounded-lg bg-[#18181b] border border-white/5 flex items-center justify-center text-[9px] text-zinc-300 font-semibold">
          The
        </div>
        <div className="h-12 rounded-lg bg-[#18181b] border border-white/5 flex items-center justify-center text-[9px] text-zinc-300 font-semibold">
          First
        </div>
        <div className="h-12 rounded-lg bg-[#18181b] border border-white/5 flex items-center justify-center text-[9px] text-zinc-300 font-semibold col-span-2">
          Rule
        </div>
      </div>
    </div>
  )
}
