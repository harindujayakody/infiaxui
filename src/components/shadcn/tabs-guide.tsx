import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { cn } from "@/lib/utils"
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Settings,
  Globe,
  FileText,
  Image as ImageIcon,
} from "lucide-react"

// ---------- Self-contained Tabs primitive ----------
interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
  className?: string
}

interface TabsContextType {
  active: string
  setActive: (v: string) => void
  orientation: "horizontal" | "vertical"
  variant: "default" | "line"
}

const TabsCtx = React.createContext<TabsContextType>({
  active: "",
  setActive: () => {},
  orientation: "horizontal",
  variant: "default",
})

function Tabs({ defaultValue, children, orientation = "horizontal", className }: TabsProps) {
  const [active, setActive] = useState(defaultValue)
  return (
    <TabsCtx.Provider value={{ active, setActive, orientation, variant: "default" }}>
      <div className={cn(orientation === "vertical" ? "flex gap-4" : "space-y-3", className)}>
        {children}
      </div>
    </TabsCtx.Provider>
  )
}

function TabsVariant({
  defaultValue,
  children,
  variant = "default",
  className,
}: {
  defaultValue: string
  children: React.ReactNode
  variant?: "default" | "line"
  className?: string
}) {
  const [active, setActive] = useState(defaultValue)
  return (
    <TabsCtx.Provider value={{ active, setActive, orientation: "horizontal", variant }}>
      <div className={cn("space-y-3", className)}>{children}</div>
    </TabsCtx.Provider>
  )
}

function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  const { orientation, variant } = React.useContext(TabsCtx)
  if (variant === "line") {
    return (
      <div className={cn("flex border-b border-[var(--border-subtle)] gap-1", className)}>
        {children}
      </div>
    )
  }
  return (
    <div
      className={cn(
        "inline-flex rounded-lg bg-[var(--bg-subtle)] p-1 gap-1",
        orientation === "vertical" ? "flex-col h-fit" : "",
        className
      )}
    >
      {children}
    </div>
  )
}

function TabsTrigger({
  value,
  children,
  disabled = false,
  className,
}: {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}) {
  const { active, setActive, variant } = React.useContext(TabsCtx)
  const isActive = active === value

  if (variant === "line") {
    return (
      <button
        onClick={() => !disabled && setActive(value)}
        disabled={disabled}
        className={cn(
          "px-4 py-2 text-xs font-medium transition-colors relative -mb-px",
          "disabled:pointer-events-none disabled:opacity-40",
          isActive
            ? "text-[var(--text-main)] border-b-2 border-[var(--text-main)]"
            : "text-[var(--text-muted)] hover:text-[var(--text-main)]",
          className
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      onClick={() => !disabled && setActive(value)}
      disabled={disabled}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-40",
        isActive
          ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm"
          : "text-[var(--text-muted)] hover:text-[var(--text-main)]",
        className
      )}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { active } = React.useContext(TabsCtx)
  if (active !== value) return null
  return <div className="animate-in fade-in-0 duration-150">{children}</div>
}

// ---------- Shared card shell ----------
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]", className)}>
      {children}
    </div>
  )
}

export function TabsGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Tabs</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)]">
          <div>Tabs</div>
          <div className="pl-4">├── TabsList</div>
          <div className="pl-8">├── TabsTrigger</div>
          <div className="pl-8">└── TabsTrigger</div>
          <div className="pl-4">├── TabsContent</div>
          <div className="pl-4">└── TabsContent</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A default tabs layout with account and password panels.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Tabs defaultValue="account" className="w-full max-w-sm">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <div className="p-4 border-b border-[var(--border-subtle)] space-y-0.5">
                  <h3 className="text-sm font-semibold">Account</h3>
                  <p className="text-xs text-[var(--text-muted)]">Make changes to your account here.</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-[var(--text-muted)]">Name</label>
                    <Input defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[var(--text-muted)]">Username</label>
                    <Input defaultValue="@peduarte" />
                  </div>
                </div>
                <div className="p-4 border-t border-[var(--border-subtle)] flex justify-end">
                  <Button size="sm">Save changes</Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <div className="p-4 border-b border-[var(--border-subtle)] space-y-0.5">
                  <h3 className="text-sm font-semibold">Password</h3>
                  <p className="text-xs text-[var(--text-muted)]">Change your password here.</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-[var(--text-muted)]">Current password</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[var(--text-muted)]">New password</label>
                    <Input type="password" />
                  </div>
                </div>
                <div className="p-4 border-t border-[var(--border-subtle)] flex justify-end">
                  <Button size="sm">Save password</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`}
        />
      </section>

      {/* Line */}
      <section id="line" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Line</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant="line"</code> on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TabsList</code> for a border-bottom underline style.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <TabsVariant defaultValue="overview" variant="line">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="text-xs text-[var(--text-muted)] p-2">Overview panel content</div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="text-xs text-[var(--text-muted)] p-2">Analytics panel content</div>
            </TabsContent>
            <TabsContent value="reports">
              <div className="text-xs text-[var(--text-muted)] p-2">Reports panel content</div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="text-xs text-[var(--text-muted)] p-2">Settings panel content</div>
            </TabsContent>
          </TabsVariant>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tabs defaultValue="overview">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>`}
        />
      </section>

      {/* Vertical */}
      <section id="vertical" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Vertical</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for side-by-side navigation.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Tabs defaultValue="account" orientation="vertical">
            <TabsList className="flex-col w-36 shrink-0">
              <TabsTrigger value="account" className="w-full justify-start">Account</TabsTrigger>
              <TabsTrigger value="privacy" className="w-full justify-start">Privacy</TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="account">
                <div className="text-xs text-[var(--text-muted)] space-y-1">
                  <p className="font-semibold text-[var(--text-main)]">Account Settings</p>
                  <p>Manage your account details and preferences.</p>
                </div>
              </TabsContent>
              <TabsContent value="privacy">
                <div className="text-xs text-[var(--text-muted)] space-y-1">
                  <p className="font-semibold text-[var(--text-main)]">Privacy Settings</p>
                  <p>Control who can see your data and activity.</p>
                </div>
              </TabsContent>
              <TabsContent value="notifications">
                <div className="text-xs text-[var(--text-muted)] space-y-1">
                  <p className="font-semibold text-[var(--text-main)]">Notification Preferences</p>
                  <p>Choose what updates you want to receive.</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Tabs defaultValue="account" orientation="vertical">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="privacy">Privacy</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="privacy">Privacy content</TabsContent>
</Tabs>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> to individual <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TabsTrigger</code> to prevent switching to that tab.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Tabs defaultValue="active" className="w-full max-w-sm">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
              <TabsTrigger value="also-active">Also Active</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="text-xs text-[var(--text-muted)] py-3">This tab is active and accessible.</div>
            </TabsContent>
            <TabsContent value="also-active">
              <div className="text-xs text-[var(--text-muted)] py-3">This tab is also accessible.</div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeBlock
          language="tsx"
          code={`<TabsTrigger value="disabled" disabled>
  Disabled
</TabsTrigger>`}
        />
      </section>

      {/* Icons */}
      <section id="icons" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Icons</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add icons alongside text inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TabsTrigger</code>.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <TabsVariant defaultValue="profile" variant="line">
            <TabsList>
              <TabsTrigger value="profile">
                <span className="flex items-center gap-1.5"><User className="size-3.5" />Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security">
                <span className="flex items-center gap-1.5"><Lock className="size-3.5" />Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <span className="flex items-center gap-1.5"><Bell className="size-3.5" />Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="billing">
                <span className="flex items-center gap-1.5"><CreditCard className="size-3.5" />Billing</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <p className="text-xs text-[var(--text-muted)] py-2">Manage your public profile and personal information.</p>
            </TabsContent>
            <TabsContent value="security">
              <p className="text-xs text-[var(--text-muted)] py-2">Update password and two-factor authentication settings.</p>
            </TabsContent>
            <TabsContent value="notifications">
              <p className="text-xs text-[var(--text-muted)] py-2">Choose what emails and push notifications you receive.</p>
            </TabsContent>
            <TabsContent value="billing">
              <p className="text-xs text-[var(--text-muted)] py-2">Manage your subscription plan and payment methods.</p>
            </TabsContent>
          </TabsVariant>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { User, Lock } from "lucide-react"

<TabsTrigger value="profile">
  <User className="size-3.5" />
  Profile
</TabsTrigger>
<TabsTrigger value="security">
  <Lock className="size-3.5" />
  Security
</TabsTrigger>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Tabs work seamlessly in RTL layouts. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <TabsVariant defaultValue="account" variant="line">
            <TabsList>
              <TabsTrigger value="account">الحساب</TabsTrigger>
              <TabsTrigger value="password">كلمة المرور</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-xs text-[var(--text-muted)] py-2">إدارة تفاصيل حسابك.</p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-xs text-[var(--text-muted)] py-2">تغيير كلمة المرور الخاصة بك.</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-xs text-[var(--text-muted)] py-2">تخصيص تفضيلاتك.</p>
            </TabsContent>
          </TabsVariant>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Tabs</td>
                <td className="p-3 font-mono">defaultValue</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Initially active tab value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Tabs</td>
                <td className="p-3 font-mono">orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3">Layout direction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">TabsList</td>
                <td className="p-3 font-mono">variant</td>
                <td className="p-3 font-mono">"default" | "line"</td>
                <td className="p-3">Visual style of the tab list</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">TabsTrigger</td>
                <td className="p-3 font-mono">value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Unique identifier for the tab panel</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">TabsTrigger</td>
                <td className="p-3 font-mono">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">Prevents activation of this tab</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">TabsContent</td>
                <td className="p-3 font-mono">value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Matches corresponding TabsTrigger value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
