export type ComponentFixStatus = "fixed" | "pending" | "in-progress"

export interface ComponentStatusMeta {
  status: ComponentFixStatus
  fixedDate?: string
  highlights?: string[]
}

export const COMPONENT_FIX_STATUS: Record<string, ComponentStatusMeta> = {
  "Accordion": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Base UI spec", "Symmetric Framer Motion animations", "Multiple & Disabled", "Borders & Card", "RTL support"],
  },
  "Data Table": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["TanStack Table v9", "Email search filter", "Column visibility dropdown", "Sortable Email", "Row selection & checkboxes", "Actions dropdown"],
  },
  "Bubble": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["7 Visual variants", "Start & End alignment", "BubbleReactions", "BubbleGroup", "Collapsible logs & Tooltip"],
  },
  "Badge": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["6 Variants", "Inline icons & Spinners", "Link badge", "Custom colors & RTL"],
  },
  "Avatar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["AvatarBadge online indicator", "AvatarGroup stacked list", "AvatarGroupCount", "3 Sizes", "Dropdown trigger", "RTL"],
  },
  "Breadcrumb": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Basic hierarchy", "Custom separators", "Dropdown menu items", "Collapsed ellipsis", "Link component", "RTL support"],
  },
  "Button": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["6 Variants", "4 Sizes", "Loading states & spinners", "Icon buttons", "Link mode"],
  },
  "Card": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"],
  },
  "Alert": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Default & Destructive variants", "Icon integration", "AlertTitle & AlertDescription"],
  },
  "Dialog": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Modal backdrop", "DialogTrigger", "DialogContent", "DialogHeader", "DialogFooter", "Accessible focus"],
  },
  "Tabs": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["TabsList", "TabsTrigger", "TabsContent", "Active state indicator"],
  },
  "Table": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell"],
  },
  "Input": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Interactive typing", "Helper labels", "Disabled states", "Focus ring"],
  },
  "Switch": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Toggle animation", "Controlled/uncontrolled", "Disabled state", "Form integration"],
  },
  "Checkbox": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Checked & unchecked", "Indeterminate state", "Disabled state", "Custom checkmark"],
  },
  "Slider": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Range slider", "Min/Max values", "Step intervals", "Continuous value update"],
  },
  "Progress": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Smooth progress bar fill", "Percentage display", "Indeterminate animation"],
  },
  "Radio Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["RadioGroup", "RadioGroupItem", "Single selection state", "Accessible keyboard navigation"],
  },
  "Select": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Custom dropdown menu", "Options list", "Placeholder", "Selected item highlight"],
  },
  "Textarea": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Multiline text input", "Character count", "Auto-resize compatibility", "Disabled states"],
  },
  "Tooltip": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Hover popup", "Fast tooltip delay", "Arrow positioning", "Accessible labeling"],
  },
  "Skeleton": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Pulse shimmer animation", "Avatar skeletons", "Card skeleton loaders"],
  },
  "Separator": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Horizontal & vertical orientations", "Decorative divider", "Subtle border styling"],
  },
  "Input OTP": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["6-slot pin input", "Auto-focus advance", "Paste support", "Group separators"],
  },
  "Collapsible": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["CollapsibleTrigger", "CollapsibleContent", "Symmetric spring animation"],
  },
  "Calendar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Interactive month grid", "Date selection", "Next/Prev month buttons"],
  },
  "Dropdown Menu": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Outside click dismissal", "Checkbox items", "Radio items", "Labels & separators"],
  },
  "Context Menu": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Right-click trigger", "Menu options", "Nested items", "Shortcuts"],
  },
  "Date Picker": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Popover trigger", "Integrated calendar", "Formatted date preview"],
  },
  "Toast": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Notification popup", "Action buttons", "Auto-dismiss timer"],
  },
  "Toggle Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Single & multiple selection", "Icon toggle buttons", "Active button styling"],
  },
  "Command": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Command palette dialog", "Quick search filtering", "Keyboard shortcuts"],
  },
  "Carousel": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Slide carousel", "Prev/Next navigation", "Card slide transitions"],
  },
  "Chart": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: ["Data visualization", "Bar & line representations", "Hover tooltips"],
  },
}

export function getComponentStatus(name: string): ComponentStatusMeta {
  return (
    COMPONENT_FIX_STATUS[name] || {
      status: "pending",
      highlights: ["Baseline implementation available", "Comprehensive guide pending"],
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
