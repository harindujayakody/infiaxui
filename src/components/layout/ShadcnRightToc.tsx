import React, { useEffect, useState, useRef } from "react"

interface ShadcnRightTocProps {
  view: "catalog" | "detail" | "changelog"
  componentName?: string
  apiReference?: string[]
}

export function ShadcnRightToc({ view, componentName, apiReference }: ShadcnRightTocProps) {
  const [activeId, setActiveId] = useState<string>("installation")
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Dynamic items based on current view & component (matches exact official screenshots)
  const getTocItems = () => {
    if (view === "changelog") {
      return [
        { id: "september-2026-cn", label: "September 2026 - cn" },
        { id: "what-changed", label: "What changed" },
        { id: "lib-utils", label: "lib/utils.ts" },
        { id: "existing-projects", label: "Existing projects" },
        { id: "august-2026-registries", label: "August 2026 - Private GitHub Registries" },
        { id: "zero-configuration", label: "Zero configuration" },
        { id: "ci-support", label: "CI support" },
        { id: "works-with-every-command", label: "Works with every command" },
        { id: "how-it-works", label: "How it works" },
        { id: "august-2026-human-in-the-loop", label: "August 2026 - Human in the Loop" },
        { id: "august-2026-questionnaire", label: "August 2026 - Questionnaire" },
        { id: "questionnaire-features", label: "Features" },
        { id: "questionnaire-installation", label: "Installation" },
        { id: "july-2026-dynamic-search", label: "July 2026 - Dynamic Search" },
        { id: "more-updates", label: "More Updates" },
      ]
    }

    if (view === "catalog") {
      return [
        { id: "new-components", label: "New Components" },
        { id: "all-components", label: "All Components" },
      ]
    }

    if (componentName === "Breadcrumb") {
      return [
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "composition", label: "Composition" },
        { id: "basic", label: "Basic" },
        { id: "custom-separator", label: "Custom separator" },
        { id: "dropdown", label: "Dropdown" },
        { id: "collapsed", label: "Collapsed" },
        { id: "link-component", label: "Link component" },
        { id: "rtl", label: "RTL" },
      ]
    }

    // Default component sections matching user Avatar / Alert screenshot
    return [
      { id: "installation", label: "Installation" },
      { id: "usage", label: "Usage" },
      { id: "composition", label: "Composition" },
      { id: "basic", label: "Basic" },
      { id: "destructive", label: "Destructive" },
      { id: "action", label: "Action" },
      { id: "custom-colors", label: "Custom Colors" },
      { id: "rtl", label: "RTL" },
    ]
  }

  const items = getTocItems()

  // Reset active ID on component / view change
  useEffect(() => {
    const defaultId =
      view === "changelog"
        ? "september-2026-cn"
        : view === "catalog"
        ? "new-components"
        : "installation"
    setActiveId(defaultId)
  }, [componentName, view])

  // Precision ScrollSpy to track active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return

      const allIds = [
        ...items.map((i) => i.id),
        ...(apiReference && apiReference.length > 0 ? ["api-reference"] : []),
        ...(apiReference || []).map((api) => `api-${api.toLowerCase().replace(/\s+/g, "-")}`),
      ]

      // Check if user scrolled near bottom of page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60
      if (isAtBottom && allIds.length > 0) {
        setActiveId(allIds[allIds.length - 1])
        return
      }

      // Check sections from top to bottom
      const scrollPosition = window.scrollY + 100
      let currentActive = allIds[0]

      for (const id of allIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (top <= scrollPosition) {
            currentActive = id
          }
        }
      }

      if (currentActive) {
        setActiveId(currentActive)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [items, apiReference])

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setActiveId(id)
    isScrollingRef.current = true
    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)

    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 105
      const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      })
      window.history.pushState(null, "", `#${id}`)
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }

  return (
    <div className="hidden xl:block w-64 shrink-0 pl-6 py-8 sticky top-[92px] h-[calc(100vh-92px)] overflow-y-auto">
      <div className="space-y-3 mb-8">
        <h5 className="type-caption text-[var(--text-main)] font-semibold tracking-tight">
          On This Page
        </h5>

        <ul className="space-y-1.5 type-small-body">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollTo(e, item.id)}
                  className={`block py-0.5 transition-colors ${
                    isActive
                      ? "text-[var(--text-main)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}

          {/* API Reference section matching official screenshot */}
          {view === "detail" && apiReference && apiReference.length > 0 && (
            <li className="pt-2">
              <a
                href="#api-reference"
                onClick={(e) => scrollTo(e, "api-reference")}
                className={`type-caption block mb-1.5 transition-colors ${
                  activeId === "api-reference"
                    ? "text-[var(--text-main)] font-semibold"
                    : "text-[var(--text-main)] font-medium hover:text-[var(--text-main)]"
                }`}
              >
                API Reference
              </a>
              <ul className="pl-3.5 space-y-1.5 pt-0.5 type-link-12-400">
                {apiReference.map((api) => {
                  const apiId = `api-${api.toLowerCase().replace(/\s+/g, "-")}`
                  const isApiActive = activeId === apiId
                  return (
                    <li key={api}>
                      <a
                        href={`#${apiId}`}
                        onClick={(e) => scrollTo(e, apiId)}
                        className={`block transition-colors ${
                          isApiActive
                            ? "text-[var(--text-main)] font-medium"
                            : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        }`}
                      >
                        {api}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          )}
        </ul>
      </div>

      {/* Vercel Deploy Card matching user screenshot */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 space-y-3">
        <h4 className="type-caption text-[var(--text-main)] font-medium leading-snug">
          Deploy your shadcn/ui app on Vercel
        </h4>
        <p className="type-link-12-400 text-[var(--text-muted)] leading-relaxed">
          Trusted by OpenAI, Sonos, Adobe, and more. Vercel provides tools and infrastructure to deploy apps and features at scale.
        </p>
        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full py-1.5 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:opacity-80 type-link-12 font-medium text-[var(--text-main)] transition-all"
        >
          Deploy Now
        </a>
      </div>
    </div>
  )
}
