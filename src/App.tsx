import React, { useState, useEffect } from "react"
import { ThemeProvider } from "@/lib/theme-context"
import { MacTitleBar } from "@/components/layout/MacTitleBar"
import { ShadcnHeader } from "@/components/layout/ShadcnHeader"
import { ShadcnSidebar } from "@/components/layout/ShadcnSidebar"
import { ShadcnRightToc } from "@/components/layout/ShadcnRightToc"
import { ShadcnComponentsCatalog } from "@/pages/ShadcnComponentsCatalog"
import { ShadcnComponentDetail } from "@/pages/ShadcnComponentDetail"
import { ShadcnChangelog } from "@/pages/ShadcnChangelog"
import { SHADCN_COMPONENTS_DETAIL } from "@/data/shadcn-components"
import { CommandPalette } from "@/components/layout/CommandPalette"
import {
  parseCurrentRoute,
  getComponentUrl,
  slugToComponentName,
} from "@/lib/component-routing"

function AppContent() {
  const initialRoute = parseCurrentRoute()

  const [activeNavTab, setActiveNavTab] = useState<string>(
    initialRoute.view === "changelog" ? "Changelog" : "Components"
  )
  const [activeSection, setActiveSection] = useState<string>(initialRoute.sectionName)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    initialRoute.view === "component" ? (initialRoute.componentName || "Button") : null
  )
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Listen to browser Back/Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute(window.location.pathname)
      if (route.view === "component" && route.componentName) {
        setSelectedComponent(route.componentName)
        setActiveSection("Components")
        setActiveNavTab("Components")
      } else if (route.view === "catalog") {
        setSelectedComponent(null)
        setActiveSection("Components")
        setActiveNavTab("Components")
      } else if (route.view === "changelog") {
        setSelectedComponent(null)
        setActiveSection("Changelog")
        setActiveNavTab("Changelog")
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Sync document title and initial URL on mount
  useEffect(() => {
    const route = parseCurrentRoute(window.location.pathname)
    if (route.view === "component" && route.componentName) {
      const expectedUrl = getComponentUrl(route.componentName)
      if (window.location.pathname !== expectedUrl) {
        window.history.replaceState(null, "", expectedUrl)
      }
      document.title = `${route.componentName} - shadcn/ui`
    } else if (route.view === "catalog") {
      if (window.location.pathname !== "/components") {
        window.history.replaceState(null, "", "/components")
      }
      document.title = "Components - shadcn/ui"
    } else if (route.view === "changelog") {
      document.title = "Changelog - shadcn/ui"
    }
  }, [])

  // Update document title whenever component or section changes
  useEffect(() => {
    if (selectedComponent) {
      document.title = `${selectedComponent} - shadcn/ui`
    } else if (activeSection === "Changelog") {
      document.title = "Changelog - shadcn/ui"
    } else {
      document.title = "Components - shadcn/ui"
    }
  }, [selectedComponent, activeSection])

  const handleSelectComponent = (compName: string, pushHistory = true) => {
    setSelectedComponent(compName)
    setActiveSection("Components")
    setActiveNavTab("Components")

    if (pushHistory) {
      const targetUrl = getComponentUrl(compName)
      if (window.location.pathname !== targetUrl) {
        window.history.pushState(null, "", targetUrl)
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSelectSection = (section: string, pushHistory = true) => {
    setActiveSection(section)
    setSelectedComponent(null)

    if (pushHistory) {
      let targetUrl = "/components"
      if (section === "Changelog") {
        targetUrl = "/docs/changelog"
      }
      if (window.location.pathname !== targetUrl) {
        window.history.pushState(null, "", targetUrl)
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentCompData = selectedComponent
    ? SHADCN_COMPONENTS_DETAIL[selectedComponent]
    : undefined

  const windowTitle = selectedComponent
    ? `${selectedComponent} - shadcn/ui`
    : activeSection === "Changelog"
    ? "Changelog - shadcn/ui"
    : "Components - shadcn/ui"

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-150">
      {/* Mac Style Window Header + Navigation Shell */}
      <div className="sticky top-0 z-50 w-full backdrop-blur">
        <MacTitleBar
          title={windowTitle}
          subtitle="shadcn/ui"
          onSearchClick={() => setIsSearchOpen(true)}
        />
        <ShadcnHeader
          activeTab={activeNavTab}
          onTabChange={(tab) => {
            setActiveNavTab(tab)
            if (tab === "Changelog") {
              handleSelectSection("Changelog")
            } else if (tab === "Components") {
              handleSelectSection("Components")
            } else if (tab === "Docs" || tab === "Home") {
              handleSelectComponent("Button")
            }
          }}
          onSearchClick={() => setIsSearchOpen(true)}
        />
      </div>

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
              onBackToCatalog={() => handleSelectSection("Components")}
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
          handleSelectComponent(name)
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
