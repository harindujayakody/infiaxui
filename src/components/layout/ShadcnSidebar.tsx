import React from "react"

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
  const sections = [
    { id: "Introduction", label: "Introduction" },
    { id: "Components", label: "Components" },
    { id: "Installation", label: "Installation" },
    { id: "Theming", label: "Theming" },
    { id: "CLI", label: "CLI" },
    { id: "Typeset", label: "Typeset" },
    { id: "Skills", label: "Skills" },
    { id: "Registry", label: "Registry" },
    { id: "Changelog", label: "Changelog", hasDot: true },
  ]

  const componentsList = [
    "Accordion",
    "Alert",
    "Alert Dialog",
    "Aspect Ratio",
    "Attachment",
    "Avatar",
    "Badge",
    "Breadcrumb",
    "Bubble",
    "Button",
    "Button Group",
    "Calendar",
    "Card",
    "Carousel",
    "Chart",
    "Checkbox",
    "Collapsible",
    "Combobox",
    "Command",
    "Context Menu",
    "Data Table",
    "Date Picker",
    "Dialog",
    "Direction",
    "Drawer",
    "Dropdown Menu",
    "Empty",
    "Field",
    "Hover Card",
    "Input",
    "Input Group",
    "Input OTP",
    "Item",
    "Questionnaire",
  ]

  return (
    <aside className="w-56 shrink-0 hidden md:block py-6 pr-4 sticky top-[92px] h-[calc(100vh-92px)] overflow-y-auto">
      {/* Sections Group */}
      <div className="space-y-1 mb-6">
        <h4 className="px-3 mb-2 type-caption text-[var(--text-muted)] uppercase tracking-wider">
          Sections
        </h4>
        {sections.map((sec) => {
          const isActive = currentSection === sec.id && currentComponent === null
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-left transition-colors type-small-body ${
                isActive
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <span>{sec.label}</span>
              {sec.hasDot && (
                <span className="size-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          )
        })}
      </div>

      {/* Components Group */}
      <div className="space-y-0.5">
        <h4 className="px-3 mb-2 type-caption text-[var(--text-muted)] uppercase tracking-wider">
          Components
        </h4>
        {componentsList.map((comp) => {
          const isActive = currentComponent === comp
          return (
            <button
              key={comp}
              onClick={() => onSelectComponent(comp)}
              className={`block w-full px-3 py-1.5 rounded-lg text-left transition-colors truncate type-small-body ${
                isActive
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
              }`}
            >
              {comp}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
