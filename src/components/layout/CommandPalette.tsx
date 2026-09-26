import React, { useEffect, useState } from "react"
import { Search, X, Box, ArrowRight } from "lucide-react"
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

  const allComponents = Object.values(SHADCN_COMPONENTS_DETAIL)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) {
          onClose()
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredComponents = allComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl overflow-hidden">
        {/* Search header */}
        <div className="flex items-center px-4 border-b border-[var(--border-subtle)]">
          <Search className="size-4 text-[var(--text-muted)] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shadcn/ui components..."
            autoFocus
            className="w-full h-12 bg-transparent type-link text-[var(--text-main)] focus:outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
          <div className="px-3 py-1.5 type-caption text-[var(--text-muted)] uppercase tracking-wider font-semibold">
            Components ({filteredComponents.length})
          </div>
          {filteredComponents.length === 0 ? (
            <div className="p-6 text-center type-caption text-[var(--text-muted)]">
              No components found for "{query}".
            </div>
          ) : (
            filteredComponents.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectComponent(item.name)
                  onClose()
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-[var(--bg-subtle)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-main)] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    <Box className="size-4 text-[var(--text-main)]" />
                  </div>
                  <div>
                    <h5 className="type-link text-[var(--text-main)] group-hover:text-[var(--text-main)] font-medium transition-colors">
                      {item.name}
                    </h5>
                    <p className="type-caption text-[var(--text-muted)] line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="type-caption text-[var(--text-muted)] font-mono text-xs">
                    npx shadcn add {item.id}
                  </span>
                  <ArrowRight className="size-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-main)] group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
