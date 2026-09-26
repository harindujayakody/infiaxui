import * as React from "react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarLabel,
} from "@/components/shadcn/menubar"
import {
  FileText,
  FolderOpen,
  Save,
  Share2,
  Trash2,
  Settings,
  Scissors,
  Copy,
  ClipboardPaste,
} from "lucide-react"

export function MenubarDemo() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [urls, setUrls] = React.useState(false)
  const [profile, setProfile] = React.useState("benoit")

  return (
    <Menubar>
      {/* File Menu */}
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent align="start">
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Edit Menu */}
      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent align="start">
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* View Menu */}
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent align="start">
          <MenubarCheckboxItem
            checked={bookmarks}
            onCheckedChange={setBookmarks}
          >
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={urls}
            onCheckedChange={setUrls}
          >
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Profiles Menu */}
      <MenubarMenu value="profiles">
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent align="start">
          <MenubarRadioGroup value={profile} onValueChange={setProfile}>
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarCheckboxDemo() {
  const [showStatus, setShowStatus] = React.useState(true)
  const [showActivity, setShowActivity] = React.useState(false)
  const [showMinimap, setShowMinimap] = React.useState(true)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Appearance</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
            Status Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
            Activity Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
            Editor Minimap
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarRadioDemo() {
  const [theme, setTheme] = React.useState("dark")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Color Theme: {theme}</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Select Theme</MenubarLabel>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Light High Contrast</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark Modern</MenubarRadioItem>
            <MenubarRadioItem value="system">System Default</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarSubmenuDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Export Project</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Quick Export as PNG</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Export As...</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF Document (.pdf)</MenubarItem>
              <MenubarItem>Vector Graphics (.svg)</MenubarItem>
              <MenubarItem>JSON Schema (.json)</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Publish to Web</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarIconsDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="gap-2">
            <FileText className="size-3.5 text-[var(--text-muted)]" />
            <span>New File</span>
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem className="gap-2">
            <FolderOpen className="size-3.5 text-[var(--text-muted)]" />
            <span>Open Folder</span>
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem className="gap-2">
            <Save className="size-3.5 text-[var(--text-muted)]" />
            <span>Save</span>
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="gap-2 text-rose-500 hover:text-rose-400">
            <Trash2 className="size-3.5" />
            <span>Delete File</span>
            <MenubarShortcut>⌫</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="font-arabic">ملف</MenubarTrigger>
          <MenubarContent align="start" className="font-arabic text-right">
            <MenubarItem className="justify-between">
              <span>علامة تبويب جديدة</span>
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem className="justify-between">
              <span>نافذة جديدة</span>
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>طباعة...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-arabic">تعديل</MenubarTrigger>
          <MenubarContent align="start" className="font-arabic text-right">
            <MenubarItem className="justify-between">
              <span>تراجع</span>
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem className="justify-between">
              <span>إعادة</span>
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
