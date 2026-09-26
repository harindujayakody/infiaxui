import * as React from "react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/shadcn/context-menu"
import {
  FileText,
  FolderPlus,
  Share2,
  Trash2,
  Copy,
  Scissors,
  ClipboardPaste,
  Eye,
  Settings,
} from "lucide-react"

export function ContextMenuDemo() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [fullUrls, setFullUrls] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[180px] w-full max-w-lg items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)]/60 text-xs text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-center p-6">
        <div className="space-y-1">
          <div className="font-semibold text-[var(--text-main)] text-sm">Right click anywhere inside this box</div>
          <p className="text-[11px] text-[var(--text-muted)]">Opens an interactive context menu with shortcuts and submenus.</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={fullUrls} onCheckedChange={setFullUrls}>
          Show Full URLs
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuBasicDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click here (Basic)
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuSubmenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Submenu
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share To</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Slack</ContextMenuItem>
            <ContextMenuItem>Messages</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuShortcutsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Shortcuts
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuGroupsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Groups
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuLabel>Clipboard</ContextMenuLabel>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuItem>Archive</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuIconsDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Icons
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem className="gap-2">
          <FileText className="size-4 text-[var(--text-muted)]" />
          <span>New Document</span>
        </ContextMenuItem>
        <ContextMenuItem className="gap-2">
          <FolderPlus className="size-4 text-[var(--text-muted)]" />
          <span>New Folder</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="gap-2 text-rose-500 hover:text-rose-400">
          <Trash2 className="size-4" />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuCheckboxesDemo() {
  const [showGrid, setShowGrid] = React.useState(true)
  const [showRulers, setShowRulers] = React.useState(false)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Toggles
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show Grid
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
          Show Rulers
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuRadioDemo() {
  const [zoom, setZoom] = React.useState("100")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Radio Selection
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Zoom Level</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
          <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100% (Default)</ContextMenuRadioItem>
          <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuDestructiveDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click for Destructive
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete Permanently
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuSidesDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        Right click (Inline End alignment)
      </ContextMenuTrigger>
      <ContextMenuContent side="inline-end" className="w-48">
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-arabic text-center p-4">
          انقر بزر الفأرة الأيمن هنا (RTL)
        </ContextMenuTrigger>
        <ContextMenuContent side="inline-end" className="w-48 font-arabic text-right">
          <ContextMenuItem className="justify-between">
            <span>تراجع</span>
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem className="justify-between">
            <span>إعادة</span>
            <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <span>حذف العنصر</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
