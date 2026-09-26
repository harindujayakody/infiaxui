"use client"

import React from "react"
import { Dock, DockIcon } from "@/components/magicui/dock"
import {
  Home,
  Terminal,
  Globe,
  Mail,
  Folder,
  Settings,
  Sparkles,
  Search,
  MessageSquare,
  Code2,
} from "lucide-react"

// 1. Default macOS Dock Demo (Main Showcase)
export function DockDemo() {
  return (
    <div className="relative flex w-full items-center justify-center p-8 overflow-hidden">
      <Dock className="bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] shadow-2xl">
        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-blue-500/20 text-[var(--text-main)] hover:text-blue-400">
          <Home className="size-5" />
        </DockIcon>
        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-emerald-500/20 text-[var(--text-main)] hover:text-emerald-400">
          <Terminal className="size-5" />
        </DockIcon>
        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-cyan-500/20 text-[var(--text-main)] hover:text-cyan-400">
          <Globe className="size-5" />
        </DockIcon>
        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-purple-500/20 text-[var(--text-main)] hover:text-purple-400">
          <Mail className="size-5" />
        </DockIcon>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-[var(--border-subtle)] mx-1" />

        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-amber-500/20 text-[var(--text-main)] hover:text-amber-400">
          <Folder className="size-5" />
        </DockIcon>
        <DockIcon className="bg-[var(--bg-subtle)] hover:bg-rose-500/20 text-[var(--text-main)] hover:text-rose-400">
          <Settings className="size-5" />
        </DockIcon>
      </Dock>
    </div>
  )
}

// 2. Custom Direction Demo
export function DockDemoDirection() {
  return (
    <div className="flex flex-col gap-6 w-full items-center justify-center p-6">
      <div className="space-y-2 text-center">
        <span className="text-xs font-mono text-[var(--text-muted)]">Direction: Top</span>
        <Dock direction="top" className="bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <Search className="size-5" />
          </DockIcon>
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <MessageSquare className="size-5" />
          </DockIcon>
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <Code2 className="size-5" />
          </DockIcon>
        </Dock>
      </div>

      <div className="space-y-2 text-center">
        <span className="text-xs font-mono text-[var(--text-muted)]">Direction: Bottom</span>
        <Dock direction="bottom" className="bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <Search className="size-5" />
          </DockIcon>
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <MessageSquare className="size-5" />
          </DockIcon>
          <DockIcon className="bg-[var(--bg-subtle)] text-[var(--text-main)]">
            <Code2 className="size-5" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}

// 3. Custom Magnification Demo
export function DockDemoMagnification() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <Dock
        iconSize={36}
        iconMagnification={68}
        iconDistance={180}
        className="bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl"
      >
        <DockIcon className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Home className="size-5" />
        </DockIcon>
        <DockIcon className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="size-5" />
        </DockIcon>
        <DockIcon className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Terminal className="size-5" />
        </DockIcon>
        <DockIcon className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Settings className="size-5" />
        </DockIcon>
      </Dock>
    </div>
  )
}

// 4. Compact Real Component Card Preview for /blocks Grid
export function DockCardPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#090A0F] px-4 select-none">
      <Dock
        iconSize={32}
        iconMagnification={52}
        iconDistance={120}
        className="bg-zinc-900/90 border border-white/10 shadow-2xl scale-95"
      >
        <DockIcon className="bg-zinc-800 text-zinc-300 hover:text-blue-400 hover:bg-zinc-700">
          <Home className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-700">
          <Terminal className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-800 text-zinc-300 hover:text-cyan-400 hover:bg-zinc-700">
          <Globe className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-800 text-zinc-300 hover:text-purple-400 hover:bg-zinc-700">
          <Mail className="size-4" />
        </DockIcon>
        <DockIcon className="bg-zinc-800 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700">
          <Settings className="size-4" />
        </DockIcon>
      </Dock>
    </div>
  )
}
