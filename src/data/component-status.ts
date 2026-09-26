export type ComponentFixStatus = "fixed" | "pending"

export interface ComponentStatusMeta {
  status: ComponentFixStatus
  fixedDate?: string
  highlights?: string[]
}

// Only components that have been explicitly and manually overhauled
// with complete official documentation, custom guides, and live demos
export const COMPONENT_FIX_STATUS: Record<string, ComponentStatusMeta> = {
  "Data Table": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "TanStack Table v9 full guide",
      "Email filter input",
      "Columns visibility toggle dropdown",
      "Sortable Email column",
      "Multi-row selection checkboxes & indeterminate state",
      "Row actions dropdown menu",
      "Pagination controls",
    ],
  },
  "Accordion": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Base UI official guide",
      "Symmetric Framer Motion expand & collapse animation",
      "Multiple & Disabled states",
      "Borders & Card container variants",
      "RTL mirroring support",
      "API reference",
    ],
  },
  "Bubble": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "7 Visual variants (default, secondary, muted, tinted, outline, ghost, destructive)",
      "Start & End alignment",
      "BubbleReactions capsule with configurable sides",
      "BubbleGroup message stacking",
      "Polymorphic interactive content via render prop",
      "Collapsible log summary & Tooltip integration",
      "Accessibility & API reference",
    ],
  },
  "Badge": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "6 Visual variants (default, secondary, destructive, outline, ghost, link)",
      "Inline start and end icon integration",
      "Animated loading spinner badges",
      "Clickable link badge support",
      "Custom palette styling & RTL support",
      "API reference",
    ],
  },
  "Avatar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "AvatarBadge bottom-right status & icon indicator",
      "AvatarGroup overlapping stacked avatars",
      "AvatarGroupCount overflow badge (+3)",
      "3 Sizes (sm, default, lg)",
      "Interactive dropdown menu trigger",
      "RTL layout mirroring & API reference",
    ],
  },
  "Breadcrumb": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic hierarchy",
      "Custom slash and icon separators",
      "DropdownMenu integration for intermediate links",
      "BreadcrumbEllipsis compact collapse",
      "Framework link component integration",
      "RTL support & API reference",
    ],
  },
  "Tooltip": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic hover & focus popup",
      "4-side positioning (top, right, bottom, left)",
      "Keyboard shortcut display via <kbd>",
      "Disabled button workaround via span wrapper",
      "Rich content (icons, links) inside TooltipContent",
      "TooltipProvider delayDuration setup",
      "RTL layout support & API reference",
    ],
  },
  "Toggle": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Two-state pressed / unpressed button",
      "Outline variant",
      "Icon + text composition",
      "3 sizes (sm, default, lg)",
      "Disabled state",
      "RTL support & API reference",
    ],
  },
  "Toggle Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Single & multiple selection modes",
      "Outline variant",
      "3 sizes (sm, default, lg)",
      "Connected (spacing=0) vs spaced (spacing=2) items",
      "Vertical orientation",
      "Group-level disabled state",
      "Custom font-weight selector example",
      "2026-05-17 spacing changelog & API reference",
    ],
  },
  "Toast": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic toast.add() call",
      "5 types: success, info, warning, error, loading",
      "Action button with undo pattern",
      "Promise toast (loading → success / error)",
      "Animated slide-in/out with Framer Motion",
      "Toaster root layout setup guide",
      "API reference",
    ],
  },
}

export function getComponentStatus(name: string): ComponentStatusMeta {
  return (
    COMPONENT_FIX_STATUS[name] || {
      status: "pending",
      highlights: ["Awaiting manual overhaul & official spec verification"],
    }
  )
}

export function isComponentFixed(name: string): boolean {
  return COMPONENT_FIX_STATUS[name]?.status === "fixed"
}

export function getComponentFixStats(allComponentNames: string[]) {
  const total = allComponentNames.length
  const fixedCount = allComponentNames.filter((name) => isComponentFixed(name)).length
  const pendingCount = total - fixedCount
  const percent = total > 0 ? Math.round((fixedCount / total) * 100) : 0

  return {
    total,
    fixedCount,
    pendingCount,
    percent,
  }
}
