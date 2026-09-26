import React from "react"
import { ALL_COMPONENTS_SORTED, getComponentUrl } from "@/lib/component-routing"
import { isComponentFixed, getComponentFixStats } from "@/data/component-status"
import { Check } from "lucide-react"

interface ShadcnSidebarProps {
  currentSection: string
  currentComponent: string | null
  onSelectSection: (section: string) => void
  onSelectComponent: (componentName: string) => void
}

export function ShadcnSidebar({
  currentSection,
  currentComponent,
  onSelectSection,
  onSelectComponent,
}: ShadcnSidebarProps) {
  const stats = getComponentFixStats(ALL_COMPONENTS_SORTED)

  const sections = [
    { id: "Introduction", label: "Introduction", href: "/components" },
    { id: "Components", label: "Components", href: "/components" },
    { id: "Installation", label: "Installation", href: "/components" },
    { id: "Theming", label: "Theming", href: "/components" },
    { id: "CLI", label: "CLI", href: "/components" },
    { id: "Typeset", label: "Typeset", href: "/components" },
    { id: "Skills", label: "Skills", href: "/components" },
    { id: "Registry", label: "Registry", href: "/components" },
    { id: "Changelog", label: "Changelog", href: "/docs/changelog", hasDot: true },
  ]

  return (
    <aside className="w-56 shrink-0 hidden md:block py-6 pr-4 sticky top-[92px] h-[calc(100vh-92px)] overflow-y-auto">
      {/* Sections Group */}
      <div className="space-y-1 mb-6">
        <h4 className="px-3 mb-2 type-caption text-[var(--text-muted)] uppercase tracking-wider font-semibold">
          Sections
        </h4>
        {sections.map((sec) => {
          const isActive = currentSection === sec.id && currentComponent === null
          return (
            <a
              key={sec.id}
              href={sec.href}
              onClick={(e) => {
                e.preventDefault()
                onSelectSection(sec.id)
              }}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-left transition-colors type-small-body ${
                isActive
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <span>{sec.label}</span>
              {sec.hasDot && (
                <span className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              )}
            </a>
          )
        })}
      </div>

      {/* Components Group with Fix Stats Header */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between px-3 mb-2">
          <h4 className="type-caption text-[var(--text-muted)] uppercase tracking-wider font-semibold">
            Components
          </h4>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold" title={`${stats.fixedCount} of ${stats.total} components fixed`}>
            {stats.fixedCount}/{stats.total}
          </span>
        </div>

        {ALL_COMPONENTS_SORTED.map((comp) => {
          const isActive = currentComponent === comp
          const isFixed = isComponentFixed(comp)

          return (
            <a
              key={comp}
              href={getComponentUrl(comp)}
              onClick={(e) => {
                e.preventDefault()
                onSelectComponent(comp)
              }}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-left transition-colors truncate type-small-body ${
                isActive
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <span className="truncate">{comp}</span>
              {isFixed && (
                <Check className="size-3 text-emerald-400 shrink-0 ml-1 opacity-70" />
              )}
            </a>
          )
        })}
      </div>
    </aside>
  )
}
