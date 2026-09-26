import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Home, LayoutDashboard, Settings, Bell, Users, FileText,
  ChevronDown, Plus, Search, LogOut, User2, PanelLeft, ExternalLink
} from "lucide-react"

export function SidebarGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Sidebar</code> layout:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "SidebarProvider",
            "  ├── Sidebar",
            "  │   ├── SidebarHeader",
            "  │   ├── SidebarContent",
            "  │   │   └── SidebarGroup",
            "  │   │       ├── SidebarGroupLabel",
            "  │   │       ├── SidebarGroupAction",
            "  │   │       └── SidebarMenu",
            "  │   │           └── SidebarMenuItem",
            "  │   │               ├── SidebarMenuButton",
            "  │   │               ├── SidebarMenuAction",
            "  │   │               └── SidebarMenuBadge",
            "  │   ├── SidebarFooter",
            "  │   └── SidebarRail",
            "  ├── SidebarInset",
            "  └── SidebarTrigger",
          ].map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Structure</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr><th className="p-3 font-semibold">Component</th><th className="p-3 font-semibold">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              {[
                ["SidebarProvider", "Handles collapsible state and provides sidebar context"],
                ["Sidebar", "The main collapsible sidebar panel"],
                ["SidebarHeader", "Sticky at top — use for branding or workspace switcher"],
                ["SidebarFooter", "Sticky at bottom — use for user menu, settings"],
                ["SidebarContent", "Scrollable region between header and footer"],
                ["SidebarGroup", "Groups related navigation items with optional label and action"],
                ["SidebarMenu / SidebarMenuItem", "Menu structure for links, badges, and actions"],
                ["SidebarRail", "Resize handle for adjusting sidebar width"],
                ["SidebarInset", "Wraps main content when using the inset variant"],
                ["SidebarTrigger", "Control that toggles the sidebar open / collapsed"],
              ].map(([comp, desc]) => (
                <tr key={comp}><td className="p-3 font-mono text-[var(--text-main)]">{comp}</td><td className="p-3">{desc}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Set up the layout with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SidebarProvider</code> wrapping your layout and the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AppSidebar</code> + <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SidebarTrigger</code> inside.
        </p>
        <CodeBlock
          language="tsx"
          fileName="app/layout.tsx"
          code={`import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}`}
        />
        <CodeBlock
          language="tsx"
          fileName="components/app-sidebar.tsx"
          code={`import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}`}
        />
      </section>

      {/* SidebarProvider */}
      <section id="sidebar-provider" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">SidebarProvider</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Always wrap your application in a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SidebarProvider</code>. Use it to control open state and configure sidebar width.
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr><th className="p-3 font-semibold">Prop</th><th className="p-3 font-semibold">Type</th><th className="p-3 font-semibold">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr><td className="p-3 font-mono text-[var(--text-main)]">defaultOpen</td><td className="p-3 font-mono">boolean</td><td className="p-3">Default open state</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">open</td><td className="p-3 font-mono">boolean</td><td className="p-3">Controlled open state</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">onOpenChange</td><td className="p-3 font-mono">(open: boolean) =&gt; void</td><td className="p-3">Setter for controlled state</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Custom width */}
<SidebarProvider
  style={{ "--sidebar-width": "20rem", "--sidebar-width-mobile": "20rem" } as React.CSSProperties}
>
  <Sidebar />
</SidebarProvider>

{/* Keyboard shortcut: cmd+b (Mac) / ctrl+b (Windows) */}`}
        />
      </section>

      {/* Sidebar Props */}
      <section id="sidebar-props" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sidebar Props</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr><th className="p-3 font-semibold">Prop</th><th className="p-3 font-semibold">Values</th><th className="p-3 font-semibold">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr><td className="p-3 font-mono text-[var(--text-main)]">side</td><td className="p-3 font-mono">"left" | "right"</td><td className="p-3">Which edge the sidebar is attached to</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">variant</td><td className="p-3 font-mono">"sidebar" | "floating" | "inset"</td><td className="p-3">Visual style of the sidebar</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">collapsible</td><td className="p-3 font-mono">"offcanvas" | "icon" | "none"</td><td className="p-3">How the sidebar collapses</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Collapses to icons */}
<Sidebar collapsible="icon">...</Sidebar>

{/* Slides off canvas */}
<Sidebar collapsible="offcanvas" side="right">...</Sidebar>

{/* Inset variant — wrap main content in SidebarInset */}
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>`}
        />
      </section>

      {/* useSidebar */}
      <section id="use-sidebar" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">useSidebar</h2>
        <p className="text-sm text-[var(--text-muted)]">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">useSidebar</code> hook exposes full sidebar control.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const {
    state,         // "expanded" | "collapsed"
    open,          // boolean
    setOpen,       // (open: boolean) => void
    openMobile,    // boolean
    setOpenMobile, // (open: boolean) => void
    isMobile,      // boolean
    toggleSidebar, // () => void
  } = useSidebar()
}`}
        />
      </section>

      {/* SidebarGroup */}
      <section id="sidebar-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">SidebarGroup</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Group navigation items with an optional label and action. Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Collapsible</code> to make a group collapsible.
        </p>
        <CodeBlock
          language="tsx"
          code={`<SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction>
    <Plus />
    <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton render={<a href="#" />} isActive>
          <Home />
          <span>Home</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>`}
        />
      </section>

      {/* SidebarMenuBadge */}
      <section id="sidebar-menu-badge" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">SidebarMenuBadge</h2>
        <CodeBlock
          language="tsx"
          code={`<SidebarMenuItem>
  <SidebarMenuButton>
    <Bell /> Notifications
  </SidebarMenuButton>
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>`}
        />
      </section>

      {/* SidebarMenuSkeleton */}
      <section id="sidebar-menu-skeleton" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">SidebarMenuSkeleton</h2>
        <p className="text-sm text-[var(--text-muted)]">Show skeleton placeholders while menu items are loading.</p>
        <CodeBlock
          language="tsx"
          code={`<SidebarMenu>
  {Array.from({ length: 5 }).map((_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton />
    </SidebarMenuItem>
  ))}
</SidebarMenu>`}
        />
      </section>

      {/* Theming */}
      <section id="theming" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Theming</h2>
        <p className="text-sm text-[var(--text-muted)]">Override these CSS variables to theme the sidebar.</p>
        <CodeBlock
          language="css"
          code={`@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 0 0% 98%;
    --sidebar-primary-foreground: 240 5.9% 10%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}`}
        />
      </section>

      {/* Controlled */}
      <section id="controlled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Controlled Sidebar</h2>
        <CodeBlock
          language="tsx"
          code={`export function AppSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  )
}`}
        />
      </section>

      {/* RTL Changelog */}
      <section id="changelog" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Changelog</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">RTL Support</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Added <code className="text-[var(--text-main)] font-mono">dir</code> prop to <code className="text-[var(--text-main)] font-mono">Sidebar</code>, <code className="text-[var(--text-main)] font-mono">data-side</code> attribute, CSS data-attribute selectors for positioning, updated <code className="text-[var(--text-main)] font-mono">SidebarRail</code> with physical positioning, and added <code className="text-[var(--text-main)] font-mono">rtl:rotate-180</code> to <code className="text-[var(--text-main)] font-mono">SidebarTrigger</code> icon.
          </p>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Use dir prop to enable RTL */}
<Sidebar dir="rtl" side="right">
  {/* ... */}
</Sidebar>`}
        />
      </section>

    </div>
  )
}
