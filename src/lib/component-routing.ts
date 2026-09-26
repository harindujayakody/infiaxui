import { ALL_COMPONENTS_COLUMNS, NEW_COMPONENTS } from "../data/shadcn-components"

// Deduplicated and alphabetically sorted list of all components
export const ALL_COMPONENTS_SORTED: string[] = Array.from(
  new Set([...ALL_COMPONENTS_COLUMNS.flat(), ...NEW_COMPONENTS])
).sort((a, b) => a.localeCompare(b))

// Convert component name to URL slug: "Button Group" -> "button-group", "Alert Dialog" -> "alert-dialog"
export function componentNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// Map of slug -> Component Name
const SLUG_TO_NAME_MAP = new Map<string, string>()
ALL_COMPONENTS_SORTED.forEach((name) => {
  const slug = componentNameToSlug(name)
  SLUG_TO_NAME_MAP.set(slug, name)
  // Also register collapsed non-hyphenated variant: "alertdialog" -> "Alert Dialog"
  SLUG_TO_NAME_MAP.set(slug.replace(/-/g, ""), name)
})

// Convert slug back to component name: "button" -> "Button", "button-group" -> "Button Group"
export function slugToComponentName(slug: string): string | undefined {
  if (!slug) return undefined
  const normalized = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "")
  if (SLUG_TO_NAME_MAP.has(normalized)) {
    return SLUG_TO_NAME_MAP.get(normalized)
  }
  const noHyphen = normalized.replace(/-/g, "")
  if (SLUG_TO_NAME_MAP.has(noHyphen)) {
    return SLUG_TO_NAME_MAP.get(noHyphen)
  }
  return undefined
}

// Get clean URL path for component
export function getComponentUrl(name: string): string {
  return `/components/${componentNameToSlug(name)}`
}

// Get previous and next components in alphabetical sequence
export function getPrevNextComponents(name: string): {
  prev: { name: string; slug: string; url: string }
  next: { name: string; slug: string; url: string }
} {
  const currentIndex = ALL_COMPONENTS_SORTED.indexOf(name)
  const prevIdx =
    currentIndex > 0
      ? currentIndex - 1
      : ALL_COMPONENTS_SORTED.length - 1
  const nextIdx =
    currentIndex >= 0 && currentIndex < ALL_COMPONENTS_SORTED.length - 1
      ? currentIndex + 1
      : 0

  const prevName = ALL_COMPONENTS_SORTED[prevIdx]
  const nextName = ALL_COMPONENTS_SORTED[nextIdx]

  return {
    prev: {
      name: prevName,
      slug: componentNameToSlug(prevName),
      url: getComponentUrl(prevName),
    },
    next: {
      name: nextName,
      slug: componentNameToSlug(nextName),
      url: getComponentUrl(nextName),
    },
  }
}

export interface ParsedRoute {
  view: "component" | "catalog" | "changelog" | "section"
  componentName?: string
  sectionName: string
}

export function parseCurrentRoute(pathname = window.location.pathname): ParsedRoute {
  const cleanPath = pathname.replace(/\/+$/, "").toLowerCase()

  // 1. /docs/changelog or /changelog
  if (cleanPath === "/docs/changelog" || cleanPath === "/changelog") {
    return { view: "changelog", sectionName: "Changelog" }
  }

  // 2. /components or /docs/components (exact match)
  if (cleanPath === "/components" || cleanPath === "/docs/components") {
    return { view: "catalog", sectionName: "Components" }
  }

  // 3. /components/:slug or /docs/components/:slug
  const compMatch = cleanPath.match(/^(?:\/docs)?\/components\/([a-z0-9-]+)$/)
  if (compMatch) {
    const slug = compMatch[1]
    const compName = slugToComponentName(slug)
    if (compName) {
      return { view: "component", componentName: compName, sectionName: "Components" }
    }
  }

  // 4. Default / or unrecognized -> default to Button component
  return { view: "component", componentName: "Button", sectionName: "Components" }
}

