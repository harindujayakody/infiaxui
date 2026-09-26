"use client"

import React, { useRef } from "react"
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid"
import {
  FileText,
  Bell,
  Share2,
  Calendar as CalendarIcon,
  User,
} from "lucide-react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

// Brand SVGs matching media_1790459980619.png
function OpenAIIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.597 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.145-2.0728l2.548-1.4715 2.548 1.4715v2.943l-2.548 1.4715-2.548-1.4715z"/>
    </svg>
  )
}

function GoogleDriveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#FFC107" d="M19.35 10.04L14.75 2.07H9.25l4.6 7.97h5.5z"/>
      <path fill="#4CAF50" d="M4.65 18.23l-2.3-3.98a4.43 4.43 0 0 1 0-4.47l4.6-7.97 4.6 7.97-4.6 7.97a4.44 4.44 0 0 1-2.3.48z"/>
      <path fill="#2196F3" d="M21.65 14.25a4.43 4.43 0 0 1-2.3 3.98l-4.6 7.97H9.25l4.6-7.97h7.8z"/>
    </svg>
  )
}

function GoogleDocsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#4285F4" {...props}>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  )
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#25D366" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zm5.8 14.07c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.12.11-3.23-.76-2.69-1.11-4.4-3.86-4.54-4.04-.13-.19-1.09-1.45-1.09-2.77 0-1.32.69-1.97.94-2.24.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.54.78 1.91.85 2.05.07.14.12.31.02.49-.09.19-.14.3-.28.46-.14.16-.29.35-.41.48-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.91 1.05.94 1.94 1.23 2.22 1.36.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.14.45.21.52.32.07.12.07.68-.17 1.36z"/>
    </svg>
  )
}

function MessengerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#0084FF" {...props}>
      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.45 5.508 3.723 7.185V22l3.418-1.875c.915.254 1.884.39 2.859.39 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.031 12.445l-2.64-2.812-5.156 2.812 5.672-6.023 2.703 2.812 5.094-2.812-5.673 6.023z"/>
    </svg>
  )
}

function NotionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.97c-.466-.373-.84-.56-1.54-.513L3.899 2.436c-.42.046-.513.326-.373.653zm.747 3.313v13.535c0 .7.373 1.027 1.166.98l13.914-.84c.793-.047 1.026-.513 1.026-1.166V6.588c0-.653-.28-.98-.933-.933l-14.24.84c-.653.046-.933.373-.933 1.026zm12.367 2.053l.047 9.146c0 .42-.187.607-.56.607-.28 0-.467-.093-.7-.327l-4.573-5.74v5.46c.187.327.047.607-.466.653l-1.447.093c-.42 0-.56-.233-.56-.606V9.897c0-.42.186-.607.56-.607.327 0 .56.094.793.374l4.573 5.693V9.944c-.187-.327-.047-.56.467-.607l1.446-.093c.42 0 .56.233.56.606z"/>
    </svg>
  )
}

// 1. Background for "Save your files" card: Floating stacked files matching media_1790459980619.png
function FilesCardBackground() {
  return (
    <div className="absolute top-4 -right-2 sm:right-4 flex gap-3 pointer-events-none opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
      {/* File 1: bitcoin.pdf */}
      <div className="w-36 rounded-xl border border-white/10 bg-[#161616]/95 p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 pb-2 text-[11px] text-zinc-300 font-medium">
          <span className="text-orange-400 font-bold text-xs">📄</span>
          <span className="truncate">bitcoin.pdf</span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-4">
          Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using...
        </p>
      </div>

      {/* File 2: finances.xlsx */}
      <div className="w-36 rounded-xl border border-white/10 bg-[#161616]/95 p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 pb-2 text-[11px] text-zinc-300 font-medium">
          <span className="text-emerald-400 font-bold text-xs">📊</span>
          <span className="truncate">finances.xlsx</span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-4">
          A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data...
        </p>
      </div>
    </div>
  )
}

// 2. Background for "Notifications" card: Stacked notifications matching media_1790459980619.png
function NotificationsCardBackground() {
  const notifications = [
    {
      title: "Payment received",
      time: "15m ago",
      desc: "Magic UI",
      icon: "💸",
      iconBg: "bg-[#00C9A7]",
    },
    {
      title: "New event",
      time: "2m ago",
      desc: "Magic UI",
      icon: "🗞️",
      iconBg: "bg-[#1E86FF]",
    },
    {
      title: "New message",
      time: "5m ago",
      desc: "Magic UI",
      icon: "💬",
      iconBg: "bg-[#FF3D71]",
    },
  ]

  return (
    <div className="absolute top-4 right-4 sm:right-6 flex flex-col gap-2.5 w-64 sm:w-72 pointer-events-none opacity-85 transition-all duration-300 group-hover:scale-102 group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,white_65%,transparent)]">
      {notifications.map((n, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161616]/95 p-3 shadow-xl backdrop-blur-md"
        >
          <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-base ${n.iconBg}`}>
            <span>{n.icon}</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white truncate">{n.title}</span>
              <span className="text-[10px] text-zinc-500 font-mono ml-1">{n.time}</span>
            </div>
            <span className="text-[11px] text-zinc-400">{n.desc}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// 3. Background for "Integrations" card: Interactive AnimatedBeam Hub matching media_1790459980619.png
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
      className="absolute top-2 right-2 sm:right-6 h-[200px] w-[300px] sm:w-[360px] flex items-center justify-between px-3 pointer-events-none opacity-85 transition-all duration-300 group-hover:opacity-100 [mask-image:linear-gradient(to_bottom,white_75%,transparent)]"
    >
      {/* Left User Node */}
      <div
        ref={userRef}
        className="z-10 flex size-11 items-center justify-center rounded-full border border-white/10 bg-zinc-800 shadow-md text-zinc-200"
      >
        <User className="size-5" />
      </div>

      {/* Center OpenAI / AI Hub Node */}
      <div
        ref={aiRef}
        className="z-10 flex size-14 items-center justify-center rounded-full border border-white/20 bg-zinc-800 shadow-2xl text-white"
      >
        <OpenAIIcon className="size-7 text-white" />
      </div>

      {/* Right Target Service Nodes matching media_1790459980619.png */}
      <div className="flex flex-col justify-between h-[180px] z-10 gap-1.5">
        <div ref={out1Ref} className="size-9 rounded-full border border-white/10 bg-white flex items-center justify-center shadow-lg p-1.5">
          <GoogleDriveIcon className="size-full" />
        </div>
        <div ref={out2Ref} className="size-9 rounded-full border border-white/10 bg-zinc-200 flex items-center justify-center shadow-lg p-1.5">
          <GoogleDocsIcon className="size-full" />
        </div>
        <div ref={out3Ref} className="size-9 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center shadow-lg p-1.5">
          <WhatsAppIcon className="size-full" />
        </div>
        <div ref={out4Ref} className="size-9 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center shadow-lg p-1.5">
          <MessengerIcon className="size-full" />
        </div>
        <div ref={out5Ref} className="size-9 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center text-white shadow-lg p-1.5">
          <NotionIcon className="size-full text-white" />
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={aiRef}
        duration={3}
        gradientStartColor="#71717a"
        gradientStopColor="#ffffff"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out1Ref}
        curvature={-30}
        duration={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#4285F4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out2Ref}
        curvature={-15}
        duration={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#4285F4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out3Ref}
        duration={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#25D366"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out4Ref}
        curvature={15}
        duration={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#0084FF"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={out5Ref}
        curvature={30}
        duration={3}
        gradientStartColor="#ffffff"
        gradientStopColor="#ffffff"
      />
    </div>
  )
}

// 4. Background for "Calendar" card: Pinned to top matching media_1790459980619.png
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
    <div className="absolute top-4 right-4 sm:right-6 w-44 rounded-xl border border-white/10 bg-[#161616]/95 p-3 shadow-xl backdrop-blur-md opacity-85 transition-all duration-300 group-hover:scale-102 group-hover:opacity-100 pointer-events-none [mask-image:linear-gradient(to_bottom,white_75%,transparent)]">
      <div className="flex items-center justify-between pb-2 text-[11px] font-semibold text-zinc-200">
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
                : "text-zinc-300"
            }`}
          >
            {item.num}
          </span>
        ))}
      </div>
    </div>
  )
}

// 1. Primary Bento Demo matching media_1790459980619.png
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

// 2. Vertical Bento Demo
export function BentoDemoVertical() {
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
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: <CalendarCardBackground />,
    },
    {
      Icon: Bell,
      name: "Notifications",
      description: "Get notified when something happens.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: <NotificationsCardBackground />,
    },
  ]

  return (
    <BentoGrid className="max-w-4xl grid-cols-1 md:grid-cols-3">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

// 3. Compact Card Preview for /blocks Grid
export function BentoGridBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center p-3 select-none">
      <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
        <div className="rounded-xl border border-white/10 bg-[#161616] p-2.5 flex flex-col justify-between h-24">
          <div className="size-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <FileText className="size-3" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Save files</div>
            <div className="text-[9px] text-zinc-400">Autosaved</div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#161616] p-2.5 flex flex-col justify-between h-24">
          <div className="size-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <Bell className="size-3" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Alerts</div>
            <div className="text-[9px] text-zinc-400">Live events</div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#161616] p-2.5 flex flex-col justify-between h-24">
          <div className="size-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <Share2 className="size-3" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Integrations</div>
            <div className="text-[9px] text-zinc-400">100+ tools</div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#161616] p-2.5 flex flex-col justify-between h-24">
          <div className="size-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <CalendarIcon className="size-3" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Calendar</div>
            <div className="text-[9px] text-zinc-400">Filter dates</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BentoVerticalDemo = BentoDemoVertical
