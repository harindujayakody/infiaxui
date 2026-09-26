import React, { useState } from "react"
import { ThemeProvider } from "@/lib/theme-context"
import { ShadcnHeader } from "@/components/layout/ShadcnHeader"
import { ShadcnSidebar } from "@/components/layout/ShadcnSidebar"
import { ShadcnRightToc } from "@/components/layout/ShadcnRightToc"
import { ShadcnComponentsCatalog } from "@/pages/ShadcnComponentsCatalog"
import { ShadcnComponentDetail } from "@/pages/ShadcnComponentDetail"
import { ShadcnChangelog } from "@/pages/ShadcnChangelog"
import { SHADCN_COMPONENTS_DETAIL } from "@/data/shadcn-components"
import { CommandPalette } from "@/components/layout/CommandPalette"

function AppContent() {
  const [activeNavTab, setActiveNavTab] = useState<string>("Components")
  const [activeSection, setActiveSection] = useState<string>("Components")
  // By default, start with "Breadcrumb" to match the user's latest screenshot!
  const [selectedComponent, setSelectedComponent] = useState<string | null>("Breadcrumb")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSelectComponent = (compName: string) => {
    setSelectedComponent(compName)
    setActiveSection("Components")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSelectSection = (section: string) => {
    setActiveSection(section)
    setSelectedComponent(null) // show section page (e.g. Changelog or Catalog)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentCompData = selectedComponent
    ? SHADCN_COMPONENTS_DETAIL[selectedComponent]
    : undefined

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-150">
      {/* Exact Shadcn Top Navigation Bar with working Dark/Light toggle */}
      <ShadcnHeader
        activeTab={activeNavTab}
        onTabChange={(tab) => {
          setActiveNavTab(tab)
          if (tab === "Changelog") {
            setActiveSection("Changelog")
            setSelectedComponent(null)
            window.scrollTo({ top: 0, behavior: "smooth" })
          } else if (tab === "Components") {
            setActiveSection("Components")
            setSelectedComponent(null)
          }
        }}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main 3-Column Document Shell */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto flex px-4 sm:px-6">
        {/* Left Sidebar: Sections & All Components */}
        <ShadcnSidebar
          currentSection={activeSection}
          currentComponent={selectedComponent}
          onSelectSection={handleSelectSection}
          onSelectComponent={handleSelectComponent}
        />

        {/* Center Main Stage */}
        <main className="flex-1 min-w-0">
          {selectedComponent ? (
            <ShadcnComponentDetail
              componentName={selectedComponent}
              onSelectComponent={handleSelectComponent}
              onBackToCatalog={() => setSelectedComponent(null)}
            />
          ) : activeSection === "Changelog" ? (
            <ShadcnChangelog />
          ) : (
            <ShadcnComponentsCatalog
              onSelectComponent={handleSelectComponent}
            />
          )}
        </main>

        {/* Right Table of Contents & Vercel Deploy Card */}
        <ShadcnRightToc
          view={
            selectedComponent
              ? "detail"
              : activeSection === "Changelog"
              ? "changelog"
              : "catalog"
          }
          componentName={selectedComponent || undefined}
          apiReference={currentCompData?.apiReference}
        />
      </div>

      {/* Search Modal */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectComponent={(name) => {
          setSelectedComponent(name)
          setActiveSection("Components")
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
