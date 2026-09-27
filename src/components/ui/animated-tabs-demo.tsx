"use client"

import React from "react"
import { AnimatedTabs, Tab } from "@/components/ui/animated-tabs"
import { cn } from "@/lib/utils"

export function AnimatedTabsDemo({ className }: { className?: string }) {
  const tabs: Tab[] = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-white bg-gradient-to-br from-purple-900 to-indigo-950 border border-white/10 shadow-2xl">
          <p className="text-xl sm:text-2xl font-bold">Product Tab</p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md">
            Everything you need to launch world-class digital experiences in record time. Built with React and Tailwind CSS.
          </p>
          <div className="mt-6 w-full h-44 sm:h-52 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              alt="Analytics Dashboard"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-white bg-gradient-to-br from-blue-900 to-cyan-950 border border-white/10 shadow-2xl">
          <p className="text-xl sm:text-2xl font-bold">Services Tab</p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md">
            High-performance cloud infrastructure, edge rendering, and real-time synchronization out of the box.
          </p>
          <div className="mt-6 w-full h-44 sm:h-52 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
              alt="Services Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-white bg-gradient-to-br from-emerald-900 to-teal-950 border border-white/10 shadow-2xl">
          <p className="text-xl sm:text-2xl font-bold">Playground Tab</p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md">
            Test and tweak UI components interactively in a sandboxed runtime environment.
          </p>
          <div className="mt-6 w-full h-44 sm:h-52 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
              alt="Code Matrix"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 sm:p-10 text-white bg-gradient-to-br from-amber-900 to-rose-950 border border-white/10 shadow-2xl">
          <p className="text-xl sm:text-2xl font-bold">Content Tab</p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md">
            Curated articles, design systems guides, and enterprise architectural blueprints.
          </p>
          <div className="mt-6 w-full h-44 sm:h-52 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop"
              alt="Content Workspace"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div
      className={cn(
        "relative flex min-h-[560px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      <div className="w-full max-w-3xl">
        <AnimatedTabs tabs={tabs} />
      </div>
    </div>
  )
}

export function AnimatedTabsBlockPreview() {
  const previewTabs: Tab[] = [
    {
      title: "Tab 1",
      value: "t1",
      content: (
        <div className="w-full h-full rounded-xl p-4 text-white bg-gradient-to-br from-purple-900/80 to-indigo-950 border border-white/10 flex flex-col justify-center items-center">
          <p className="text-sm font-bold">Interactive Tab 1</p>
          <p className="text-[10px] text-zinc-300 mt-1">Stacked layered card animation</p>
        </div>
      ),
    },
    {
      title: "Tab 2",
      value: "t2",
      content: (
        <div className="w-full h-full rounded-xl p-4 text-white bg-gradient-to-br from-blue-900/80 to-cyan-950 border border-white/10 flex flex-col justify-center items-center">
          <p className="text-sm font-bold">Interactive Tab 2</p>
          <p className="text-[10px] text-zinc-300 mt-1">Framer motion layout transition</p>
        </div>
      ),
    },
  ]

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="w-full max-w-[240px] scale-90">
        <AnimatedTabs tabs={previewTabs} contentClassName="min-h-[160px]" />
      </div>
    </div>
  )
}
