"use client"

import React from "react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, Lock, Sparkles, Settings, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface GridItemProps {
  area?: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  className?: string
}

const GridItem = ({ area, icon, title, description, className }: GridItemProps) => {
  return (
    <div
      style={{ gridArea: area }}
      className={cn(
        "relative rounded-2.5xl border border-white/10 p-2 sm:p-3 shadow-2xl transition-all",
        className
      )}
    >
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-6 sm:p-7">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
          <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GlowingEffectDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[580px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 sm:p-8 shadow-2xl select-none",
        className
      )}
    >
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {/* Left Column Cards */}
        <div className="flex flex-col gap-4">
          <GridItem
            icon={<Box className="size-5" />}
            title="Do things the right way"
            description="Running out of copy so I'll write anything."
            className="min-h-[190px]"
          />
          <GridItem
            icon={<Settings className="size-5" />}
            title="The best AI code editor ever."
            description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
            className="min-h-[190px]"
          />
        </div>

        {/* Center Tall Card */}
        <div className="flex flex-col">
          <GridItem
            icon={<Lock className="size-5" />}
            title="You should buy Aceternity UI Pro"
            description="It's the best money you'll ever spend"
            className="h-full min-h-[396px]"
          />
        </div>

        {/* Right Column Cards */}
        <div className="flex flex-col gap-4">
          <GridItem
            icon={<Sparkles className="size-5" />}
            title="This card is also built by Cursor"
            description="I'm not even kidding. Ask my mom if you don't believe me."
            className="min-h-[190px]"
          />
          <GridItem
            icon={<Search className="size-5" />}
            title="Coming soon on Aceternity UI"
            description="I'm writing the code as I record this, no shit."
            className="min-h-[190px]"
          />
        </div>
      </div>
    </div>
  )
}

export function GlowingEffectBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-3 select-none">
      <div className="grid grid-cols-2 gap-2 w-full max-w-[240px] scale-90">
        <div className="relative rounded-xl border border-white/10 p-1 bg-[#0c0d12]">
          <GlowingEffect spread={30} proximity={40} inactiveZone={0.01} borderWidth={1.5} />
          <div className="p-2 space-y-1">
            <div className="size-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
              <Box className="size-3 text-zinc-400" />
            </div>
            <p className="text-[10px] font-bold text-white truncate">Cursor Glow</p>
          </div>
        </div>
        <div className="relative rounded-xl border border-white/10 p-1 bg-[#0c0d12]">
          <GlowingEffect spread={30} proximity={40} inactiveZone={0.01} borderWidth={1.5} />
          <div className="p-2 space-y-1">
            <div className="size-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="size-3 text-zinc-400" />
            </div>
            <p className="text-[10px] font-bold text-white truncate">Adaptive Halo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
