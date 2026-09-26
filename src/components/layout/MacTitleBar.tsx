import React, { useState } from "react"
import { Maximize2, Minimize2, Search } from "lucide-react"

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
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  return (
    <div className="h-9 w-full bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center justify-between px-3.5 select-none text-xs relative z-40 transition-colors">
      {/* Left: macOS Traffic Light Buttons */}
      <div className="flex items-center gap-2 group">
        {/* Close (Red) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center transition-all hover:brightness-95 active:brightness-90 shadow-[0_0_1px_rgba(0,0,0,0.4)]"
          title="Scroll to top"
        >
          <svg
            className="size-2 text-[#4A0002] opacity-0 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M1.75 1.75l4.5 4.5M6.25 1.75l-4.5 4.5" />
          </svg>
        </button>

        {/* Minimize (Yellow) */}
        <button
          className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center transition-all hover:brightness-95 active:brightness-90 shadow-[0_0_1px_rgba(0,0,0,0.4)]"
          title="Minimize"
        >
          <svg
            className="size-2 text-[#402A00] opacity-0 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path d="M1.5 4h5" />
          </svg>
        </button>

        {/* Fullscreen (Green) */}
        <button
          onClick={handleToggleFullscreen}
          className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center transition-all hover:brightness-95 active:brightness-90 shadow-[0_0_1px_rgba(0,0,0,0.4)]"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <svg
            className="size-2 text-[#003800] opacity-0 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 8 8"
            fill="currentColor"
          >
            {/* Native macOS opposing triangles for fullscreen */}
            <path d="M6.8 1.2H4.2l2.6 2.6V1.2zM1.2 6.8h2.6L1.2 4.2v2.6z" />
          </svg>
        </button>
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
