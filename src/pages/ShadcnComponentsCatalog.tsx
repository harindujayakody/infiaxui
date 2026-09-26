import React, { useState, useMemo } from "react"
import {
  NEW_COMPONENTS,
  ALL_COMPONENTS_COLUMNS,
  SHADCN_COMPONENTS_DETAIL,
} from "@/data/shadcn-components"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"
import { getComponentUrl, ALL_COMPONENTS_SORTED } from "@/lib/component-routing"
import {
  Search,
  Sparkles,
  LayoutGrid,
  List,
  ArrowRight,
} from "lucide-react"

interface ShadcnComponentsCatalogProps {
  onSelectComponent: (componentName: string) => void
}

export function ShadcnComponentsCatalog({ onSelectComponent }: ShadcnComponentsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "columns">("grid")

  // Filter components by search query
  const filteredComponents = useMemo(() => {
    return ALL_COMPONENTS_SORTED.filter((comp) => {
      const matchesSearch =
        comp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (SHADCN_COMPONENTS_DETAIL[comp]?.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [searchQuery])

  return (
    <div className="flex-1 max-w-4xl py-8 px-4 sm:px-8 space-y-8">
      {/* Header section */}
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-7">
        <div className="space-y-2">
          <h1 className="type-h1 text-[var(--text-main)]">
            Components
          </h1>
          <p className="type-body text-[var(--text-muted)] max-w-xl">
            Explore 57 beautifully designed, accessible, and customizable components built with Base UI and Tailwind CSS.
          </p>
        </div>

        {/* Action buttons */}
        <ShadcnPageActions
          pageTitle="Components Catalog"
          onNext={() => onSelectComponent("Accordion")}
          nextLabel="First component: Accordion"
          hideNav={false}
        />
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="size-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--border-subtle)] transition-colors"
          />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              onClick={() => setViewMode("columns")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "columns"
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              title="Columns View"
            >
              <List className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Cards View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredComponents.map((comp) => {
            const detail = SHADCN_COMPONENTS_DETAIL[comp]
            const isNew = NEW_COMPONENTS.includes(comp)

            return (
              <a
                key={comp}
                href={getComponentUrl(comp)}
                onClick={(e) => {
                  e.preventDefault()
                  onSelectComponent(comp)
                }}
                className="group flex flex-col justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[var(--text-main)] transition-colors flex items-center gap-1.5">
                      {comp}
                    </span>
                    {isNew && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        New
                      </span>
                    )}
                  </div>
                  {detail?.description && (
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {detail.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end pt-3 text-[11px] text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                  <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        /* Classic 3-Column Layout */
        <div id="all-components" className="scroll-mt-20 space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2.5">
            {ALL_COMPONENTS_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2">
                {col
                  .filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <a
                      key={item}
                      href={getComponentUrl(item)}
                      onClick={(e) => {
                        e.preventDefault()
                        onSelectComponent(item)
                      }}
                      className="group flex items-center justify-between py-1 type-link text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors w-full text-left"
                    >
                      <span className="group-hover:underline underline-offset-4">{item}</span>
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
