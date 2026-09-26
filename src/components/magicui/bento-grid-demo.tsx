"use client"

import React, { useRef } from "react"
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid"
import {
  FileText,
  Bell,
  Share2,
  Calendar as CalendarIcon,
  Search,
  Globe as GlobeIcon,
  User,
  Bot,
  Layers,
  Database,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

// Background for "Save your files" card: Floating stacked files
function FilesCardBackground() {
  return (
    <div className="absolute -top-4 right-2 sm:right-6 flex gap-3 opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:opacity-90">
      <div className="w-28 rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 pb-2 text-[10px] text-zinc-400 font-mono">
          <FileText className="size-3 text-amber-400" />
          <span className="truncate">seed_phrase</span>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-16 rounded bg-zinc-700/60" />
          <div className="h-1.5 w-20 rounded bg-zinc-700/40" />
          <div className="h-1.5 w-12 rounded bg-zinc-700/30" />
        </div>
      </div>

      <div className="w-32 rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 pb-2 text-[10px] text-zinc-400 font-mono">
          <FileText className="size-3 text-orange-400" />
          <span className="truncate">bitcoin.pdf</span>
        </div>
        <p className="text-[9px] text-zinc-500 leading-tight line-clamp-3">
          Bitcoin is a peer-to-peer cryptocurrency invented in 2008 by Satoshi Nakamoto.
        </p>
      </div>
    </div>
  )
}

// Background for "Notifications" card: Stacked notification pills
function NotificationsCardBackground() {
  const notifications = [
    {
      title: "User signed up",
      time: "10m ago",
      desc: "Magic UI",
      iconColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      title: "Payment received",
      time: "15m ago",
      desc: "Magic UI",
      iconColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "New event",
      time: "2m ago",
      desc: "Magic UI",
      iconColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    },
  ]

  return (
    <div className="absolute top-4 right-4 sm:right-8 flex flex-col gap-2.5 w-64 sm:w-72 opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
      {notifications.map((n, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/80 p-2.5 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-0.5"
        >
          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${n.iconColor}`}>
            <Bell className="size-4" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-200 truncate">{n.title}</span>
              <span className="text-[10px] text-zinc-500 font-mono">{n.time}</span>
            </div>
            <span className="text-[11px] text-zinc-400">{n.desc}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Background for "Integrations" card: Interactive AnimatedBeam Hub
function IntegrationsCardBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const out1Ref = useRef<HTMLDivElement>(null)
  const out2Ref = useRef<HTMLDivElement>(null)
  const out3Ref = useRef<HTMLDivElement>(null)
  const out4Ref = useRef<HTMLDivElement>(null)
  const out5Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 h-full w-full max-w-sm sm:max-w-md flex items-center justify-between px-6 pointer-events-none opacity-80 transition-all duration-300 group-hover:opacity-100"
    >
      {/* Left User Node */}
      <div
        ref={userRef}
        className="z-10 flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-md text-zinc-300"
      >
        <User className="size-5" />
      </div>

      {/* Center AI Node */}
      <div
        ref={aiRef}
        className="z-10 flex size-12 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 shadow-xl text-zinc-100"
      >
        <Bot className="size-6 text-emerald-400" />
      </div>

      {/* Right Target Service Nodes */}
      <div className="flex flex-col justify-between h-44 z-10 gap-1.5">
        <div ref={out1Ref} className="size-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-amber-400 text-xs shadow">
          <Database className="size-4" />
        </div>
        <div ref={out2Ref} className="size-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-sky-400 text-xs shadow">
          <FileText className="size-4" />
        </div>
        <div ref={out3Ref} className="size-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-emerald-400 text-xs shadow">
          <Share2 className="size-4" />
        </div>
        <div ref={out4Ref} className="size-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-indigo-400 text-xs shadow">
          <Layers className="size-4" />
        </div>
        <div ref={out5Ref} className="size-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-purple-400 text-xs shadow">
          <Sparkles className="size-4" />
        </div>
      </div>

      {/* Real AnimatedBeams connecting nodes */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={aiRef}
        duration={3}
        gradientStartColor="#9333ea"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out1Ref}
        curvature={-30}
        duration={3}
        gradientStartColor="#10b981"
        gradientStopColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out2Ref}
        curvature={-15}
        duration={3}
        gradientStartColor="#10b981"
        gradientStopColor="#0ea5e9"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out3Ref}
        duration={3}
        gradientStartColor="#10b981"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out4Ref}
        curvature={15}
        duration={3}
        gradientStartColor="#10b981"
        gradientStopColor="#6366f1"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out5Ref}
        curvature={30}
        duration={3}
        gradientStartColor="#10b981"
        gradientStopColor="#a855f7"
      />
    </div>
  )
}

// Background for "Calendar" card: Interactive mini calendar grid
function CalendarCardBackground() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const dates = [
    { num: 30, muted: true },
    { num: 31, muted: true },
    { num: 1, muted: false },
    { num: 2, muted: false },
    { num: 3, muted: false },
    { num: 4, muted: false },
    { num: 5, muted: false },
    { num: 6, muted: false },
    { num: 7, muted: false },
    { num: 8, muted: false },
    { num: 9, muted: false },
    { num: 10, muted: false },
    { num: 11, muted: false },
    { num: 12, muted: false },
  ]

  return (
    <div className="absolute top-4 right-4 sm:right-6 w-48 rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-md opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
      <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-zinc-300">
        <span>September 2026</span>
        <span className="size-1.5 rounded-full bg-emerald-400" />
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-mono text-zinc-500 pb-1">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono">
        {dates.map((item, idx) => (
          <span
            key={idx}
            className={`py-0.5 rounded ${
              item.num === 8
                ? "bg-white text-black font-bold"
                : item.muted
                ? "text-zinc-600"
                : "text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {item.num}
          </span>
        ))}
      </div>
    </div>
  )
}

// 1. Primary Bento Demo matching media_1790455431254.png
export function BentoDemo() {
  const features = [
    {
      Icon: FileText,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: <FilesCardBackground />,
    },
    {
      Icon: Bell,
      name: "Notifications",
      description: "Get notified when something happens.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: <NotificationsCardBackground />,
    },
    {
      Icon: Share2,
      name: "Integrations",
      description: "Supports 100+ integrations and counting.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: <IntegrationsCardBackground />,
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: <CalendarCardBackground />,
    },
  ]

  return (
    <BentoGrid className="max-w-4xl">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

// 2. Vertical Bento Demo matching media_1790455451451.png
export function BentoVerticalDemo() {
  const verticalFeatures = [
    {
      Icon: Search,
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 md:col-span-1 auto-rows-auto",
      background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />,
    },
    {
      Icon: FileText,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 md:col-span-1 md:row-span-2",
      background: <FilesCardBackground />,
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 md:col-span-1",
      background: <CalendarCardBackground />,
    },
    {
      Icon: GlobeIcon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 md:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent" />,
    },
    {
      Icon: Bell,
      name: "Notifications",
      description: "Get notified when someone shares a file or mentions you in a comment.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 md:col-span-1",
      background: <NotificationsCardBackground />,
    },
  ]

  return (
    <BentoGrid className="max-w-4xl auto-rows-[16rem]">
      {verticalFeatures.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

// 3. Blocks Page Preview (Real interactive Bento layout, NO inner frame, NO dividing borders)
export function BentoGridBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] p-3 select-none flex items-center justify-center">
      <div className="grid grid-cols-3 gap-2 w-full h-full max-h-[175px]">
        {/* Card 1: Large feature with beam preview */}
        <div className="col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-zinc-200 font-semibold">
              <Share2 className="size-3 text-emerald-400" />
              <span>Integrations</span>
            </span>
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[10px] text-zinc-400 leading-tight">
            100+ connected apps and automated workflows
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[9px] text-zinc-500 font-mono">
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">OpenAI</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">Google</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">Notion</span>
          </div>
        </div>

        {/* Card 2: Right Calendar & Activity Card */}
        <div className="col-span-1 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <CalendarIcon className="size-3.5 text-sky-400" />
            <span className="text-[8px] font-mono text-zinc-500">Sept 2026</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-zinc-200 block">Calendar</span>
            <div className="flex gap-1">
              <span className="size-3 rounded bg-zinc-800 text-[8px] flex items-center justify-center font-mono text-zinc-400">1</span>
              <span className="size-3 rounded bg-white text-[8px] flex items-center justify-center font-mono text-black font-bold">2</span>
              <span className="size-3 rounded bg-zinc-800 text-[8px] flex items-center justify-center font-mono text-zinc-400">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
