import React from "react"
import {
  SeparatorVerticalDemo,
  SeparatorMenuDemo,
  SeparatorListDemo,
  SeparatorRtlDemo,
} from "@/components/shadcn/separator-demo"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { CodeBlock } from "@/components/ui/code-block"

export function SeparatorGuide() {
  const separatorPrimitiveCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-[var(--border-subtle)]",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Global Installation UI */}
      <section id="installation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>
        <InstallationSection
          componentName="separator"
          dependencies="@base-ui/react"
          sourceCode={separatorPrimitiveCode}
          sourcePath="components/ui/separator.tsx"
        />
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)]">
          Import the separator component into your layout files or components.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Separator } from "@/components/ui/separator"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Separator />`}
        />
      </section>

      {/* Vertical */}
      <section id="vertical" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Vertical</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation=&quot;vertical&quot;</code> for a vertical separator between inline elements.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <SeparatorVerticalDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Separator } from "@/components/ui/separator"

export function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm font-medium text-muted-foreground">
      <a href="#blog">Blog</a>
      <Separator orientation="vertical" />
      <a href="#docs">Docs</a>
      <Separator orientation="vertical" />
      <a href="#source">Source</a>
    </div>
  )
}`}
        />
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Menu</h2>
        <p className="type-body text-[var(--text-muted)]">
          Vertical separators between menu items with descriptions.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <SeparatorMenuDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import React from "react"
import { Separator } from "@/components/ui/separator"
import { User, CreditCard, Shield } from "lucide-react"

export function SeparatorMenu() {
  const menuItems = [
    { icon: User, title: "Personal Profile", desc: "Manage your display name and email" },
    { icon: CreditCard, title: "Billing & Plans", desc: "Manage subscription tiers and invoices" },
    { icon: Shield, title: "Security", desc: "Two-factor authentication and sessions" },
  ]

  return (
    <div className="w-full max-w-sm rounded-xl border border-border p-4 bg-card">
      {menuItems.map((item, index) => {
        const Icon = item.icon
        return (
          <React.Fragment key={item.title}>
            <div className="flex items-start gap-3 py-3">
              <Icon className="size-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">{item.title}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            {index < menuItems.length - 1 && <Separator />}
          </React.Fragment>
        )
      })}
    </div>
  )
}`}
        />
      </section>

      {/* List */}
      <section id="list" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">List</h2>
        <p className="type-body text-[var(--text-muted)]">
          Horizontal separators between list items.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <SeparatorListDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import React from "react"
import { Separator } from "@/components/ui/separator"

export function SeparatorList() {
  const items = [
    { title: "Release candidate deployed", time: "10m ago" },
    { title: "Updated color tokens to Base Nova", time: "2h ago" },
    { title: "Resolved touch gesture regression", time: "1d ago" },
  ]

  return (
    <div className="w-full max-w-md rounded-xl border border-border p-4 bg-card">
      {items.map((item, index) => (
        <React.Fragment key={item.title}>
          <div className="flex items-center justify-between py-3">
            <span className="text-xs font-medium text-foreground">{item.title}</span>
            <span className="text-[11px] text-muted-foreground font-mono">{item.time}</span>
          </div>
          {index < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, see the RTL configuration guide.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <SeparatorRtlDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<div dir="rtl" className="space-y-4">
  <div className="flex h-5 items-center space-x-4 rtl:space-x-reverse text-xs font-medium">
    <span>الرئيسية</span>
    <Separator orientation="vertical" />
    <span>التوثيق</span>
    <Separator orientation="vertical" />
    <span>المصدر</span>
  </div>
  <Separator />
</div>`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="type-body text-[var(--text-muted)]">
          See the <a href="https://base-ui.com/react/components/separator#api-reference" target="_blank" rel="noopener noreferrer" className="text-primary underline">Base UI Separator</a> documentation for full specifications.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">orientation</td>
                <td className="p-3 font-mono text-indigo-400">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="p-3 font-mono">&quot;horizontal&quot;</td>
                <td className="p-3">The orientation of the separator line.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">decorative</td>
                <td className="p-3 font-mono text-indigo-400">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">When true, removes semantic separator role from accessibility tree.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Custom classes merged with component styles.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
