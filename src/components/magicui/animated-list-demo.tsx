"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const notifications: Item[] = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]

// Loop items so the animation continues smoothly
const loopedNotifications = Array.from({ length: 10 }, () => notifications).flat()

export const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        // Slate theme styles matching media_1790456039338.png
        "bg-[#161616]/90 border border-white/10 shadow-lg backdrop-blur-md"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl shrink-0 shadow-sm"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg leading-none">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden text-left">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm sm:text-base font-semibold text-white tracking-tight">
            <span>{name}</span>
            <span className="mx-1 text-zinc-500 font-normal">·</span>
            <span className="text-xs text-zinc-500 font-normal font-mono">{time}</span>
          </figcaption>
          <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

// 1. Primary Showcase matching media_1790456039338.png
export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full max-w-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none mx-auto",
        className
      )}
    >
      <AnimatedList delay={1500}>
        {loopedNotifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid matching media_1790456039338.png
export function AnimatedListBlockPreview() {
  return (
    <div className="relative size-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-3 select-none">
      <div className="w-full max-w-[280px] sm:max-w-[300px] space-y-2.5">
        <figure className="relative mx-auto w-full overflow-hidden rounded-xl p-2.5 bg-[#161616]/90 border border-white/10 shadow-md">
          <div className="flex flex-row items-center gap-2.5">
            <div
              className="flex size-8 items-center justify-center rounded-xl shrink-0"
              style={{ backgroundColor: "#FFB800" }}
            >
              <span className="text-sm">👤</span>
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <figcaption className="flex flex-row items-center whitespace-pre text-xs font-semibold text-white">
                <span>User signed up</span>
                <span className="mx-1 text-zinc-500 font-normal">·</span>
                <span className="text-[10px] text-zinc-500 font-normal font-mono">10m ago</span>
              </figcaption>
              <p className="text-[11px] font-normal text-zinc-400">Magic UI</p>
            </div>
          </div>
        </figure>

        <figure className="relative mx-auto w-full overflow-hidden rounded-xl p-2.5 bg-[#161616]/90 border border-white/10 shadow-md">
          <div className="flex flex-row items-center gap-2.5">
            <div
              className="flex size-8 items-center justify-center rounded-xl shrink-0"
              style={{ backgroundColor: "#00C9A7" }}
            >
              <span className="text-sm">💸</span>
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <figcaption className="flex flex-row items-center whitespace-pre text-xs font-semibold text-white">
                <span>Payment received</span>
                <span className="mx-1 text-zinc-500 font-normal">·</span>
                <span className="text-[10px] text-zinc-500 font-normal font-mono">15m ago</span>
              </figcaption>
              <p className="text-[11px] font-normal text-zinc-400">Magic UI</p>
            </div>
          </div>
        </figure>
      </div>

      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}
