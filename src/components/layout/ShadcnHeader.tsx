import React from "react"
import { Search, Moon, Sun, Plus, Menu } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

interface ShadcnHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onSearchClick: () => void
  onOpenMobileMenu?: () => void
}

export function ShadcnHeader({
  activeTab,
  onTabChange,
  onSearchClick,
  onOpenMobileMenu,
}: ShadcnHeaderProps) {
  const { isDark, toggleDark } = useTheme()

  const navItems = [
    "Home",
    "Docs",
    "Components",
    "Blocks",
    "Charts",
    "Directory",
    "Typeset",
    "Create",
  ]

  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-page)] transition-colors">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 max-w-[1500px] mx-auto">
        {/* Mobile Left: = Menu Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="flex items-center gap-2 h-9 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold text-xs transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            {/* Custom two horizontal lines menu icon matching screenshot */}
            <div className="flex flex-col justify-center gap-1 w-3.5 h-3" aria-hidden="true">
              <span className="h-[2px] w-full bg-[var(--text-main)] rounded-full" />
              <span className="h-[2px] w-full bg-[var(--text-main)] rounded-full" />
            </div>
            <span>Menu</span>
          </button>
        </div>

        {/* Desktop Left: Navigation items */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = activeTab === item
            return (
              <button
                key={item}
                onClick={() => onTabChange(item)}
                className={`type-link transition-colors py-1 cursor-pointer ${
                  isActive
                    ? "text-[var(--text-main)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {item}
              </button>
            )
          })}
        </nav>

        {/* Right side controls (Both Mobile & Desktop) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Search documentation... input */}
          <button
            onClick={onSearchClick}
            className="hidden md:flex items-center gap-3 h-8 w-44 sm:w-60 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 type-small-body text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors justify-between cursor-pointer"
          >
            <span className="truncate">Search documentation...</span>
            <kbd className="hidden sm:inline-flex items-center type-caption text-[var(--text-muted)] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Version badge */}
          <button
            onClick={() => onTabChange("Changelog")}
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] type-link-12 font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            title="View latest v1.2.0 Changelog"
          >
            <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>v1.2.0</span>
          </button>

          {/* GitHub link with 125k star counter (Mobile & Desktop) */}
          <a
            href="https://github.com/harindujayakody/infiaxui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] type-link-12 font-mono text-[var(--text-main)] transition-colors"
            title="GitHub Repository"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="text-xs font-mono">125k</span>
          </a>

          {/* Theme switch button with half-filled moon/sun */}
          <button
            onClick={toggleDark}
            className="flex items-center justify-center size-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <svg className="size-4 fill-current text-[var(--text-main)]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
              </svg>
            ) : (
              <svg className="size-4 fill-current text-[var(--text-main)]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
              </svg>
            )}
          </button>

          {/* + New Button */}
          <button className="flex items-center gap-1 h-8 px-2.5 sm:px-3 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] hover:opacity-90 type-link-12 font-semibold transition-opacity cursor-pointer">
            <Plus className="size-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>
    </header>
  )
}
