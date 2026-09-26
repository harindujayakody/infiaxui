import React, { useState, useMemo } from "react"
import {
  NEW_COMPONENTS,
  ALL_COMPONENTS_COLUMNS,
  SHADCN_COMPONENTS_DETAIL,
} from "@/data/shadcn-components"
import {
  getComponentFixStats,
  isComponentFixed,
  getComponentStatus,
} from "@/data/component-status"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"
import { getComponentUrl, ALL_COMPONENTS_SORTED } from "@/lib/component-routing"
import {
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  LayoutGrid,
  ListCheck,
  ArrowRight,
  Filter,
} from "lucide-react"

interface ShadcnComponentsCatalogProps {
  onSelectComponent: (componentName: string) => void
}

export function ShadcnComponentsCatalog({ onSelectComponent }: ShadcnComponentsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"all" | "fixed" | "pending" | "new">("all")
  const [viewMode, setViewMode] = useState<"columns" | "checklist">("checklist")

  // Calculate live stats
  const stats = useMemo(() => {
    return getComponentFixStats(ALL_COMPONENTS_SORTED)
  }, [])

  // Filter components
  const filteredComponents = useMemo(() => {
    return ALL_COMPONENTS_SORTED.filter((comp) => {
      const matchesSearch = comp.toLowerCase().includes(searchQuery.toLowerCase())
      const isFixed = isComponentFixed(comp)
      const isNew = NEW_COMPONENTS.includes(comp)

      if (!matchesSearch) return false

      if (filterMode === "fixed") return isFixed
      if (filterMode === "pending") return !isFixed
      if (filterMode === "new") return isNew

      return true
    })
  }, [searchQuery, filterMode])

  const fixedComponentsList = useMemo(() => {
    return ALL_COMPONENTS_SORTED.filter((comp) => isComponentFixed(comp))
  }, [])

  const pendingComponentsList = useMemo(() => {
    return ALL_COMPONENTS_SORTED.filter((comp) => !isComponentFixed(comp))
  }, [])

  return (
    <div className="flex-1 max-w-4xl py-8 px-4 sm:px-8 space-y-8">
      {/* Header section */}
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-7">
        <div className="space-y-2">
          <h1 className="type-h1 text-[var(--text-main)]">
            Components
          </h1>
          <p className="type-body text-[var(--text-muted)] max-w-xl">
            Complete library of 57 Shadcn components. Track real-time fix and modernization progress below.
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

      {/* Progress & Fix Stats Dashboard */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="type-heading font-semibold text-[var(--text-main)]">
                Modernization & Fix Progress
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {stats.percent}% Complete
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {stats.fixedCount} of {stats.total} components fully updated with official guides, interactive live previews, and API specs.
            </p>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode("fixed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                filterMode === "fixed"
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : "border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              <span>{stats.fixedCount} Fixed</span>
            </button>

            <button
              onClick={() => setFilterMode("pending")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                filterMode === "pending"
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                  : "border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Clock className="size-3.5 text-amber-400" />
              <span>{stats.pendingCount} Pending</span>
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 transition-all duration-500"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>0%</span>
            <span>{stats.fixedCount} / {stats.total} Components Updated</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="size-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 57 components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)] transition-colors"
          />
        </div>

        {/* Filter Pills & View Mode */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-0.5 text-xs">
            {(["all", "fixed", "pending", "new"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                  filterMode === mode
                    ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {mode === "all" ? `All (${stats.total})` : mode === "fixed" ? `Fixed (${stats.fixedCount})` : mode === "pending" ? `Pending (${stats.pendingCount})` : `New (${NEW_COMPONENTS.length})`}
              </button>
            ))}
          </div>

          <div className="flex items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-0.5">
            <button
              onClick={() => setViewMode("checklist")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "checklist"
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
              title="Checklist View"
            >
              <ListCheck className="size-3.5" />
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
              <LayoutGrid className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Checklist View */}
      {viewMode === "checklist" ? (
        <div className="space-y-6">
          {/* I Already Fixed Section */}
          {filterMode !== "pending" && (
            <div id="already-fixed" className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <h2 className="type-h2 text-[var(--text-main)] text-base font-semibold">
                    I Already Fixed ({fixedComponentsList.length})
                  </h2>
                </div>
                <span className="text-xs text-emerald-400/90 font-mono">Manually verified &amp; overhauled</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fixedComponentsList
                  .filter((comp) => comp.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((comp) => {
                    const status = getComponentStatus(comp)
                    return (
                      <a
                        key={comp}
                        href={getComponentUrl(comp)}
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectComponent(comp)
                        }}
                        className="group flex flex-col justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:border-emerald-500/30 transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-[var(--text-main)] group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
                            {comp}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Fixed
                          </span>
                        </div>
                        {status.highlights && (
                          <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                            {status.highlights.slice(0, 2).join(" • ")}
                          </p>
                        )}
                      </a>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Still Need A Fix Section */}
          {filterMode !== "fixed" && (
            <div id="needs-fix" className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-amber-400" />
                  <h2 className="type-h2 text-[var(--text-main)] text-base font-semibold">
                    Still Need A Fix ({pendingComponentsList.length})
                  </h2>
                </div>
                <span className="text-xs text-amber-400/90 font-mono">Awaiting manual fix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-2.5">
                {pendingComponentsList
                  .filter((comp) => comp.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((comp) => (
                    <a
                      key={comp}
                      href={getComponentUrl(comp)}
                      onClick={(e) => {
                        e.preventDefault()
                        onSelectComponent(comp)
                      }}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                        {comp}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pending
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Classic 3-Column Layout with Status Icons */
        <div id="all-components" className="scroll-mt-20 space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3">
            {ALL_COMPONENTS_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2">
                {col
                  .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item) => {
                    const isFixed = isComponentFixed(item)
                    return (
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
                        {isFixed ? (
                          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="size-1.5 rounded-full bg-amber-500/40 shrink-0" />
                        )}
                      </a>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
