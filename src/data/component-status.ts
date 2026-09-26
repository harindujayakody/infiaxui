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
  "Scroll Area": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Augments native scrolling with styled cross-browser scrollbars",
      "Vertical scroll list of release tags",
      "Horizontal image cards scroll track",
      "ScrollBar component orientation control",
      "RTL layout support & API reference",
    ],
  },
  "Resizable": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Accessible resizable panel groups with keyboard support",
      "Interactive horizontal & vertical drag resizing",
      "ResizableHandle withHandle drag grip icon",
      "react-resizable-panels v4 migration changelog",
      "RTL layout support & API reference",
    ],
  },
  "Radio Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Checkable radio buttons with singular active state",
      "Supporting description text layout",
      "Choice Card clickable box selection style",
      "Semantic Fieldset & FieldLegend grouping",
      "Disabled state & invalid validation styling",
      "RTL layout support & API reference",
    ],
  },
  "Questionnaire": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Multi-step questionnaire flow with answer persistence",
      "Single-choice & multiple-choice questions",
      "Freeform custom answer input integration",
      "Skippable optional steps & keyboard shortcuts",
      "Animated step transitions & progress indicator",
      "Semantic fieldset accessibility & API reference",
    ],
  },
  "Progress": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Animated completion task indicator",
      "ProgressLabel and ProgressValue readout integration",
      "Controlled progress & live ticker simulation",
      "RTL layout support & API reference",
    ],
  },
  "Popover": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Floating popover portal anchored to trigger button",
      "PopoverHeader, Title, and Description composition",
      "Alignment options (start, center, end)",
      "Embedded interactive form inputs",
      "RTL layout support & API reference",
    ],
  },
  "Navigation Menu": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Hierarchical top-level website navigation menu",
      "Rich animated flyout panels on hover / click",
      "Next.js Link / framework anchor integration",
      "RTL layout support & API reference",
    ],
  },
  "Pagination": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Page navigation with previous/next buttons and ellipsis",
      "Interactive page switching demo",
      "Simple numeric pagination and compact icon-only mode",
      "Next.js Link component integration guide",
      "RTL support with customizable text prop on buttons",
      "API reference",
    ],
  },
  "Native Select": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Native HTML select with styled design system integration",
      "NativeSelectOptGroup for categorized options",
      "Disabled and invalid error validation states",
      "Native Select vs Custom Select comparison guide",
      "RTL layout support & API reference",
    ],
  },
  "Message Scroller": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Streaming chat scroll container with turn anchoring",
      "Follows live streaming output without jarring jumps",
      "Jump to latest floating button with unread awareness",
      "Preserves scroll position when prepending history",
      "content-visibility: auto performance optimizations",
      "Live region accessibility & API reference",
    ],
  },
  "Message": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Single message row layout with avatar, header, and footer",
      "Start (received) and end (sent) conversation alignments",
      "MessageGroup for stacking consecutive messages",
      "MessageFooter actions (copy, feedback, retry)",
      "File attachment preview card support",
      "Live status indicator accessibility & API reference",
    ],
  },
  "Menubar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Desktop application style horizontal menu bar",
      "Submenus, checkbox items, and radio groups",
      "Keyboard shortcut combination badges",
      "RTL layout support & API reference",
    ],
  },
  "Marker": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Inline status notes, bordered rows, and labeled separators",
      "role='status' with Spinner for live AI progress updates",
      "Polymorphic render prop for link and button markers",
      "Accessibility guidelines for labeled dividers",
      "API reference",
    ],
  },
  "Label": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Accessible label associated with form controls",
      "Checkbox and Switch label control pairings",
      "FieldLabel integration with description & validation errors",
      "RTL layout support & API reference",
    ],
  },
  "Kbd": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Keyboard key display tags and KbdGroup shortcut combinations",
      "Button and search field input addon pairings",
      "Tooltip keyboard shortcut badges",
      "RTL layout support & API reference",
    ],
  },
  "Item": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Versatile row layout with media (icon, avatar, image)",
      "Title, description, actions, and header/footer slots",
      "ItemGroup container with dividers",
      "Item vs Field usage guide",
      "Polymorphic link render support & API reference",
    ],
  },
  "Input OTP": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "One-time password input with individual character slots",
      "6-digit OTP and 4-digit security PIN configurations",
      "Auto-focus progression and clipboard paste support",
      "Invalid error validation styling & API reference",
    ],
  },
  "Input Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Input wrappers with leading and trailing addons",
      "Currency prefix and copy-to-clipboard button addons",
      "Textarea with bottom submit and helper action bar",
      "Focus management with logical alignment props",
      "RTL layout support & API reference",
    ],
  },
  "Input": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Standard text input with built-in styling and accessibility",
      "Field wrapper with label, recommended badge, and description",
      "Disabled and invalid validation error states",
      "File upload (type='file') styling",
      "Inline search with submit button",
      "RTL layout support & API reference",
    ],
  },
  "Hover Card": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Popup card preview on hover & keyboard focus",
      "4-side positioning (top, bottom, left, right)",
      "Configurable delay & closeDelay timing",
      "Rich media user card layout",
      "RTL support & API reference",
    ],
  },
  "Field": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "FieldSet, FieldLegend, FieldGroup, Field, FieldLabel, FieldDescription, FieldError composition",
      "3 Layout orientations: vertical, horizontal, responsive",
      "data-invalid & aria-invalid error state styling",
      "Required & optional field markers",
      "RTL support & API reference",
    ],
  },
  "Empty": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Empty state container with EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, and EmptyContent",
      "3 Frame variants: default, outlined dashed, gradient background",
      "Avatar group & icon media integrations",
      "Action CTAs and secondary links",
      "RTL support & API reference",
    ],
  },
  "Dropdown Menu": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Account menu with groups, shortcuts, and destructive action item",
      "DropdownMenuCheckboxItem multi-select options",
      "DropdownMenuRadioGroup single-select theme switcher",
      "DropdownMenuSub nested cascading submenus",
      "RTL support & API reference",
    ],
  },
  "Drawer": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Fluid swipeable bottom and edge drawer sheets",
      "4 directions: bottom, top, left, right",
      "Pill handle, swipe gestures, and backdrop dismiss",
      "Custom step controls & submit flow",
      "RTL mirroring & API reference",
    ],
  },
  "Direction": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "DirectionProvider for global and subtree text flow (ltr & rtl)",
      "Interactive bidirectional layout toggle with live mirroring",
      "useDirection hook for ambient context consumption",
      "API reference",
    ],
  },
  "Dialog": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Accessible modal window with Framer Motion spring backdrop",
      "Form editing, Confirmation, and Share link dialog demos",
      "showCloseButton toggle & custom close trigger buttons",
      "Sticky action footers & scrollable content areas",
      "RTL layout support & API reference",
    ],
  },
  "Date Picker": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Composition of Popover and Calendar primitives",
      "Single date picker and multi-day Date Range picker",
      "Integrated time selection input combination",
      "RTL calendar mirroring & API reference",
    ],
  },
  "Context Menu": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Interactive right-click canvas with coordinate-aware placement",
      "Cascading submenus, shortcuts (⌘[, ⌘], ⌘R), and checkboxes",
      "Logical placement with side='inline-end' in RTL mode",
      "API reference",
    ],
  },
  "Command": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Command menu with instant text filtering & categorized groups",
      "Global shortcut dialog overlay (⌘K / ESC dismiss)",
      "Keyboard action shortcuts (⌘C, ⌘E, ⌘P, ⌘B)",
      "RTL mirroring & API reference",
    ],
  },
  "Combobox": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Single-select autocomplete dropdown with search filter",
      "Multi-select with interactive tag chips and deletion",
      "Grouped options and custom item renderers",
      "RTL support & API reference",
    ],
  },
  "Collapsible": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Symmetric height expand/collapse animations with Framer Motion",
      "Controlled and uncontrolled states",
      "Nested recursive file/folder tree view",
      "RTL layout support & API reference",
    ],
  },
  "Checkbox": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Accessible checkbox with horizontal Field & Label layout",
      "Group list with 'Select All' indeterminate state",
      "Disabled and aria-invalid validation error states",
      "RTL layout support & API reference",
    ],
  },
  "Chart": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Recharts v3 composable chart architecture",
      "Interactive Bar & Line visualizer with live hover tooltips",
      "Multi-series toggle (Desktop vs Mobile) and animation",
      "CSS variable theming (--chart-1 to --chart-5)",
      "RTL layout support & API reference",
    ],
  },
  "Carousel": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Motion & swipe slide carousel built with Embla patterns",
      "Progress bar and slide index counter",
      "Responsive basis sizing and spacing (-ml-4 / pl-4)",
      "RTL orientation and navigation button rotation",
      "API reference",
    ],
  },
  "Card": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter",
      "Size presets (size='default' | 'sm')",
      "CSS variable --card-spacing control & edge-to-edge content",
      "RTL layout support & API reference",
    ],
  },
  "Calendar": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "React DayPicker v9 integration with single & range date selection",
      "Timezone support to prevent SSR hydration offsets",
      "RTL-aware logical classes & Arabic/Hijri locale support",
      "API reference",
    ],
  },
  "Button Group": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Segmented action button toolbars (ButtonGroup, Separator, Text)",
      "Horizontal and vertical orientations",
      "Split button with dropdown menu action trigger",
      "RTL layout mirroring & API reference",
    ],
  },
  "Alert": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Semantic status callouts (default, destructive, warning, success)",
      "AlertTitle, AlertDescription, and AlertAction layout slots",
      "Custom palette tones & icon tinting",
      "RTL layout support & API reference",
    ],
  },
  "Alert Dialog": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Modal confirmation interrupt dialog with spring backdrop",
      "AlertDialogMedia icon badge & size='sm' support",
      "Destructive confirmation actions & cancel buttons",
      "RTL layout support & API reference",
    ],
  },
  "Aspect Ratio": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Content aspect ratio constraint (16/9, 1/1, 9/16, 4/3, 21/9)",
      "Prevents cumulative layout shift (CLS) during asset loading",
      "Responsive container scaling and RTL support",
      "API reference",
    ],
  },
  "Attachment": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "File and image attachment cards with media and actions",
      "Upload lifecycle states (idle, uploading, processing, error, done)",
      "AttachmentGroup horizontally snapping carousel row",
      "RTL layout support & API reference",
    ],
  },
  "Button": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "6 Visual variants (default, outline, secondary, ghost, destructive, link)",
      "8 Sizing options and rounded-full pill button support",
      "Inline icon slots and animated loading spinner state",
      "buttonVariants helper for semantic link styling",
      "RTL layout support & API reference",
    ],
  },
  "Sonner": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Opinionated toast notifications by Emil Kowalski",
      "Interactive toast playground with description and action callbacks",
      "Semantic status types (success, info, warning, error) & Promise toasts",
      "4-corner viewport positioning (top/bottom-left/right)",
      "RTL layout mirroring & API reference",
    ],
  },
  "Installation": {
    status: "fixed",
    fixedDate: "2026-09-26",
    highlights: [
      "Comprehensive multi-framework installation guide",
      "Next.js, Vite, TanStack Start, Laravel, React Router, and Astro commands",
      "Package manager selector (npm, pnpm, yarn, bun)",
      "Project structure & components.json configuration reference",
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
