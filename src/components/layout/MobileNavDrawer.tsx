import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronRight, Moon, Sun, Plus } from "lucide-react"
import { ALL_COMPONENTS_SORTED, getComponentUrl } from "@/lib/component-routing"
import { useTheme } from "@/lib/theme-context"

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentSection: string
  currentComponent: string | null
  onSelectSection: (section: string) => void
  onSelectComponent: (componentName: string) => void
  onSearchClick: () => void
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  currentSection,
  currentComponent,
  onSelectSection,
  onSelectComponent,
  onSearchClick,
}: MobileNavDrawerProps) {
  const { isDark, toggleDark } = useTheme()

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

  // Prevent background scrolling when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative w-[85%] max-w-[320px] h-full bg-[var(--bg-page)] border-r border-[var(--border-subtle)] flex flex-col z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-[var(--text-main)]">
                  shadcn/ui
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  v1.2.0
                </span>
              </div>
              <button
                onClick={onClose}
                className="size-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Search Button */}
            <div className="p-3 border-b border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  onClose()
                  onSearchClick()
                }}
                className="w-full flex items-center justify-between h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] dark:bg-slate-950/60 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search className="size-3.5" />
                  <span>Search documentation...</span>
                </div>
                <kbd className="text-[10px] font-mono bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Sections List */}
              <div className="space-y-1">
                <h4 className="px-2 mb-2 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Getting Started
                </h4>
                {sections.map((sec) => {
                  const isActive =
                    (currentSection === sec.id && currentComponent === null) ||
                    currentComponent === sec.id
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        onSelectSection(sec.id)
                        onClose()
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                        isActive
                          ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
                      }`}
                    >
                      <span>{sec.label}</span>
                      {sec.hasDot && (
                        <span className="size-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* All Components List */}
              <div className="space-y-0.5">
                <h4 className="px-2 mb-2 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Components ({ALL_COMPONENTS_SORTED.length})
                </h4>
                {ALL_COMPONENTS_SORTED.map((comp) => {
                  const isActive = currentComponent === comp
                  return (
                    <button
                      key={comp}
                      onClick={() => {
                        onSelectComponent(comp)
                        onClose()
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left text-xs transition-colors ${
                        isActive
                          ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
                      }`}
                    >
                      <span className="truncate">{comp}</span>
                      {isActive && <ChevronRight className="size-3 text-primary shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Drawer Footer with Theme & GitHub Controls */}
            <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 flex items-center justify-between">
              <a
                href="https://github.com/harindujayakody/infiaxui"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--text-main)] font-mono hover:underline"
              >
                <svg className="size-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>125k stars</span>
              </a>

              <button
                onClick={toggleDark}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-main)]"
              >
                {isDark ? (
                  <>
                    <Sun className="size-3.5 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="size-3.5" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
