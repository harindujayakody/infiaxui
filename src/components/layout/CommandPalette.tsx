import React, { useEffect, useState, useRef } from "react"
import { Search, X, Box, ArrowRight, CornerDownLeft } from "lucide-react"
import { SHADCN_COMPONENTS_DETAIL } from "@/data/shadcn-components"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelectComponent: (name: string) => void
  onNavigateToDashboard?: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectComponent,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const allComponents = Object.values(SHADCN_COMPONENTS_DETAIL)

  const filteredComponents = allComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase())
  )

  // Reset query and selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation inside Command Palette
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle / Close on Ctrl+K, Cmd+K
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
        return
      }

      // Close on Escape
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        onClose()
        return
      }

      // Arrow Down
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          filteredComponents.length > 0
            ? (prev + 1) % filteredComponents.length
            : 0
        )
      }

      // Arrow Up
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          filteredComponents.length > 0
            ? (prev - 1 + filteredComponents.length) % filteredComponents.length
            : 0
        )
      }

      // Enter to select
      if (e.key === "Enter") {
        e.preventDefault()
        if (filteredComponents[selectedIndex]) {
          onSelectComponent(filteredComponents[selectedIndex].name)
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredComponents, selectedIndex, onClose, onSelectComponent])

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeItem = listRef.current.querySelector(
      `[data-item-index="${selectedIndex}"]`
    ) as HTMLElement
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search header */}
        <div className="flex items-center px-4 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
          <Search className="size-4 text-[var(--text-muted)] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shadcn/ui components..."
            className="w-full h-12 bg-transparent type-link text-[var(--text-main)] focus:outline-none placeholder:text-[var(--text-muted)]"
          />
          <div className="flex items-center gap-2 shrink-0">
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label="Close search"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 space-y-0.5 select-none"
        >
          <div className="px-3 py-1.5 type-caption text-[var(--text-muted)] uppercase tracking-wider font-semibold flex items-center justify-between">
            <span>Components ({filteredComponents.length})</span>
            <span className="text-[10px] font-mono normal-case text-[var(--text-muted)]">
              ↑↓ to navigate · ↵ to select
            </span>
          </div>

          {filteredComponents.length === 0 ? (
            <div className="p-8 text-center type-caption text-[var(--text-muted)]">
              No components found matching "{query}".
            </div>
          ) : (
            filteredComponents.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={item.id}
                  data-item-index={idx}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    onSelectComponent(item.name)
                    onClose()
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer group ${
                    isSelected
                      ? "bg-[var(--bg-subtle)] text-[var(--text-main)] ring-1 ring-[var(--border-subtle)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`size-8 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-colors ${
                        isSelected
                          ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]"
                          : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] text-[var(--text-main)]"
                      }`}
                    >
                      <Box className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <h5
                        className={`type-link truncate font-medium ${
                          isSelected
                            ? "text-[var(--text-main)]"
                            : "text-[var(--text-main)] group-hover:text-[var(--text-main)]"
                        }`}
                      >
                        {item.name}
                      </h5>
                      <p className="type-caption text-[var(--text-muted)] line-clamp-1 truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="hidden sm:inline type-caption text-[var(--text-muted)] font-mono text-xs">
                      npx shadcn add {item.id}
                    </span>
                    {isSelected ? (
                      <CornerDownLeft className="size-3.5 text-[var(--text-main)]" />
                    ) : (
                      <ArrowRight className="size-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px]">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px]">K</kbd> to toggle</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline"><kbd className="px-1 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px]">/</kbd> to quick search</span>
          </div>
          <span className="text-[10px]">shadcn/ui</span>
        </div>
      </div>
    </div>
  )
}
