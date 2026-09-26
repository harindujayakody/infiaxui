"use client"

import React from "react"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { Tooltip } from "@/components/ui/tooltip"
import {
  Home,
  Pencil,
  Mail,
  Folder,
  Settings,
  Sparkles,
  Search,
  MessageSquare,
  Code2,
  Terminal,
} from "lucide-react"

// Social and navigation items in pure Slate Theme
const DATA = {
  navbar: [
    { label: "Home", icon: Home, href: "#" },
    { label: "Blog", icon: Pencil, href: "#" },
  ],
  social: [
    {
      label: "GitHub",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      href: "#",
    },
    {
      label: "LinkedIn",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "#",
    },
    {
      label: "X",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
      href: "#",
    },
    { label: "Send Email", icon: Mail, href: "#" },
  ],
}

// 1. Default macOS Dock Demo (Main Showcase with Slate Theme)
export function DockDemo() {
  return (
    <div className="relative flex flex-col w-full items-center justify-center p-8 sm:p-12 overflow-hidden select-none">
      {/* Background Watermark Title */}
      <span className="pointer-events-none select-none bg-gradient-to-b from-white via-zinc-400/40 to-transparent bg-clip-text text-center text-7xl sm:text-8xl font-bold tracking-tight text-transparent pb-3">
        Dock
      </span>

      <Dock className="bg-[#161616]/90 border border-[#262626] shadow-2xl backdrop-blur-md">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip
              content={item.label}
              side="top"
              className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
            >
              <button
                type="button"
                aria-label={item.label}
                className="size-10 sm:size-11 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none"
              >
                <item.icon className="size-4 sm:size-5" />
              </button>
            </Tooltip>
          </DockIcon>
        ))}

        {/* Vertical Divider in Slate Theme */}
        <div className="h-6 w-[1px] bg-[#262626] mx-1 self-center" />

        {DATA.social.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip
              content={item.label}
              side="top"
              className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
            >
              <button
                type="button"
                aria-label={item.label}
                className="size-10 sm:size-11 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none"
              >
                <item.icon className="size-4 sm:size-5" />
              </button>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

// 2. Custom Direction Demo (Slate Theme)
export function DockDemoDirection() {
  return (
    <div className="flex flex-col gap-6 w-full items-center justify-center p-6 select-none">
      <div className="space-y-2 text-center">
        <span className="text-xs font-mono text-zinc-400">Direction: Top</span>
        <Dock direction="top" className="bg-[#161616]/90 border border-[#262626] shadow-xl">
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <Search className="size-5" />
          </DockIcon>
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <MessageSquare className="size-5" />
          </DockIcon>
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <Code2 className="size-5" />
          </DockIcon>
        </Dock>
      </div>

      <div className="space-y-2 text-center">
        <span className="text-xs font-mono text-zinc-400">Direction: Bottom</span>
        <Dock direction="bottom" className="bg-[#161616]/90 border border-[#262626] shadow-xl">
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <Search className="size-5" />
          </DockIcon>
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <MessageSquare className="size-5" />
          </DockIcon>
          <DockIcon className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors">
            <Code2 className="size-5" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}

// 3. Custom Magnification Demo (Slate Theme)
export function DockDemoMagnification() {
  return (
    <div className="flex w-full items-center justify-center p-8 select-none">
      <Dock
        iconSize={38}
        iconMagnification={66}
        iconDistance={160}
        className="bg-[#161616]/90 border border-[#262626] shadow-2xl"
      >
        {[
          { label: "Home", icon: Home },
          { label: "AI Sparkles", icon: Sparkles },
          { label: "Terminal", icon: Terminal },
          { label: "Settings", icon: Settings },
        ].map((item) => (
          <DockIcon key={item.label}>
            <Tooltip
              content={item.label}
              side="top"
              className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
            >
              <button
                type="button"
                aria-label={item.label}
                className="size-full rounded-full flex items-center justify-center bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors shadow-sm focus:outline-none"
              >
                <item.icon className="size-5" />
              </button>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

// 4. Compact Real Component Card Preview for /blocks Grid (Pure Slate Theme)
export function DockCardPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 select-none">
      <Dock
        iconSize={32}
        iconMagnification={52}
        iconDistance={120}
        className="bg-[#161616]/90 border border-[#262626] shadow-xl scale-95"
      >
        <DockIcon className="bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Home className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Terminal className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Folder className="size-4" />
        </DockIcon>
        <div className="h-5 w-[1px] bg-[#262626] mx-0.5 self-center" />
        <DockIcon className="bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Mail className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Settings className="size-4" />
        </DockIcon>
      </Dock>
    </div>
  )
}
