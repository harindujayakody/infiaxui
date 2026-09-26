import React from "react"
import { Search } from "lucide-react"

interface MacTitleBarProps {
  title?: string
  subtitle?: string
  onSearchClick?: () => void
}

export function MacTitleBar({
  title = "Components - shadcn/ui",
  subtitle,
  onSearchClick,
}: MacTitleBarProps) {
  return (
    <div className="h-9 w-full bg-[var(--bg-page)] border-b border-[var(--border-subtle)] flex items-center justify-between px-3.5 select-none text-xs relative z-40 transition-colors">
      {/* Left: Static macOS Window Controls */}
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block shadow-[0_0_1px_rgba(0,0,0,0.4)]" />
        <span className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block shadow-[0_0_1px_rgba(0,0,0,0.4)]" />
        <span className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block shadow-[0_0_1px_rgba(0,0,0,0.4)]" />
      </div>

      {/* Center: Window Title (Dynamic) */}
      <div className="absolute inset-x-0 mx-auto w-fit text-center pointer-events-none flex items-center gap-2">
        <span className="type-caption font-medium text-[var(--text-muted)] tracking-tight">
          {title}
        </span>
        {subtitle && (
          <span className="hidden md:inline-block type-caption text-[var(--text-muted)]/60">
            — {subtitle}
          </span>
        )}
      </div>

      {/* Right: Subtle window indicator & quick action */}
      <div className="flex items-center gap-2.5">
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-[11px]"
            title="Search (⌘K)"
          >
            <Search className="size-3" />
            <span className="hidden sm:inline font-mono">⌘K</span>
          </button>
        )}
      </div>
    </div>
  )
}
