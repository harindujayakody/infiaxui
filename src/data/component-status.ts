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
  "Textarea": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic placeholder textarea",
      "Field + FieldLabel + FieldDescription composition",
      "Disabled state",
      "Invalid state with aria-invalid & live error message",
      "Button pairing with submit action",
      "RTL text direction support",
      "API reference",
    ],
  },
  "Tabs": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Default pill-style TabsList",
      "Line variant (border-bottom underline style)",
      "Vertical orientation with side navigation",
      "Individual tab disabled state",
      "Icon + text tabs",
      "RTL layout support",
      "API reference",
    ],
  },
  "Table": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Full composition guide (Table/Header/Body/Footer/Row/Head/Cell/Caption)",
      "TableFooter totals row",
      "Per-row actions with DropdownMenu",
      "Live sortable Amount column",
      "Status badges (Paid/Pending/Unpaid/Processing)",
      "RTL layout support",
      "API reference",
    ],
  },
  "Switch": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic toggle with live state label",
      "Label + description Field composition",
      "Choice Card — full card as clickable label",
      "Disabled (on & off)",
      "Invalid state with aria-invalid",
      "3 size variants (sm, default, lg)",
      "RTL layout support & API reference",
    ],
  },
  "Spinner": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic animated loading spinner",
      "Custom icon replacement (LoaderIcon, Loader2, RefreshCw)",
      "Size variants (xs, sm, default, lg, xl)",
      "Button with loading state & inline spinner",
      "Badge with inline status spinner",
      "Input group with live search spinner",
      "Empty state full section loading placeholder",
      "RTL support & API reference",
    ],
  },
  "Slider": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic single thumb range input",
      "Dual thumb range slider",
      "Multiple thumbs support",
      "Vertical orientation slider",
      "Controlled slider with step adjustments",
      "Disabled state",
      "RTL support & API reference",
    ],
  },
  "Skeleton": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Basic animated pulse placeholders",
      "Avatar and user profile skeleton",
      "Card image + content skeleton with reveal demo",
      "Paragraph and multi-line text skeleton",
      "Form fields & submit button skeleton",
      "Table rows & columns skeleton loader",
      "RTL layout support",
    ],
  },
  "Sidebar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Complete composable hierarchy (Provider → Header/Content/Footer/Rail)",
      "Collapsible modes (icon, offcanvas, none)",
      "Visual variants (sidebar, floating, inset)",
      "useSidebar hook integration",
      "SidebarGroup, Menu, Badges, and Skeletons",
      "CSS variable theming support",
      "RTL support with migration changelog",
    ],
  },
  "Sheet": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "4-side slide-in positioning (top, right, bottom, left)",
      "Header, Title, Description, Content, Footer composition",
      "Close button visibility toggle (showCloseButton={false})",
      "Smooth Framer Motion backdrop & slide animations",
      "RTL layout support & API reference",
    ],
  },
  "Separator": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Horizontal & vertical divider lines",
      "Menu item vertical divider layout",
      "List item horizontal divider separators",
      "Decorative accessibility attribute support",
      "RTL layout support & API reference",
    ],
  },
  "Select": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Dropdown selection trigger & popup menu",
      "Grouped items with SelectGroup, SelectLabel, SelectSeparator",
      "Scrollable dropdown for long lists (timezones)",
      "Disabled select trigger & individual disabled items",
      "Validation error state with data-invalid & aria-invalid",
      "RTL layout support & API reference",
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
