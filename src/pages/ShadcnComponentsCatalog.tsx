import React from "react"
import { NEW_COMPONENTS, ALL_COMPONENTS_COLUMNS } from "@/data/shadcn-components"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"

interface ShadcnComponentsCatalogProps {
  onSelectComponent: (componentName: string) => void
}

export function ShadcnComponentsCatalog({ onSelectComponent }: ShadcnComponentsCatalogProps) {

  return (
    <div className="flex-1 max-w-4xl py-8 px-4 sm:px-8 space-y-10">
      {/* Header section matching Screenshot 1 */}
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-7">
        <div className="space-y-2">
          <h1 className="type-h1 text-[var(--text-main)]">
            Components
          </h1>
          <p className="type-body text-[var(--text-muted)] max-w-xl">
            Here you can find all the components available in the library. We are working on adding more components.
          </p>
        </div>

        {/* Action buttons matching exact user screenshot: media_1790404348168.png */}
        <ShadcnPageActions
          pageTitle="Components Catalog"
          onNext={() => onSelectComponent("Accordion")}
          nextLabel="First component: Accordion"
          hideNav={false}
        />
      </div>

      {/* New Components Section matching Screenshot 1 */}
      <div id="new-components" className="scroll-mt-20 space-y-3.5">
        <h2 className="type-h2 text-[var(--text-main)]">New Components</h2>
        <div className="space-y-2">
          {NEW_COMPONENTS.map((comp) => (
            <button
              key={comp}
              onClick={() => onSelectComponent(comp)}
              className="type-link text-[var(--text-main)] hover:underline underline-offset-4 transition-colors block text-left"
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* All Components Section matching Screenshot 1 (3-column layout) */}
      <div id="all-components" className="scroll-mt-20 space-y-4 pt-2">
        <h2 className="type-h2 text-[var(--text-main)]">All Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3">
          {ALL_COMPONENTS_COLUMNS.map((col, colIdx) => (
            <div key={colIdx} className="space-y-3">
              {col.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectComponent(item)}
                  className="type-link text-[var(--text-muted)] hover:text-[var(--text-main)] hover:underline underline-offset-4 transition-colors block w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
