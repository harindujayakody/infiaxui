import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Home, Settings, Shield, Bell, ChevronRight, User, ExternalLink, HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"

export function ItemGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Item</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "ItemGroup",
            "└── Item",
            "    ├── ItemHeader",
            "    ├── ItemMedia",
            "    ├── ItemContent",
            "    │   ├── ItemTitle",
            "    │   └── ItemDescription",
            "    ├── ItemActions",
            "    └── ItemFooter",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic & Variants */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic & Variants</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Content row with leading icon, title, description, and action button.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 max-w-lg mx-auto">
          {/* Default */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <HardDrive className="size-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--text-main)]">Cloud Storage</div>
                <div className="text-[11px] text-[var(--text-muted)]">45.2 GB of 100 GB used</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Manage
            </Button>
          </div>

          {/* Outline / Link style */}
          <a
            href="#settings"
            className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--text-muted)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Shield className="size-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--text-main)]">Two-Factor Authentication</div>
                <div className="text-[11px] text-[var(--text-muted)]">Enabled via Authenticator App</div>
              </div>
            </div>
            <ChevronRight className="size-4 text-[var(--text-muted)]" />
          </a>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

<Item>
  <ItemMedia variant="icon">
    <HardDrive className="size-4" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Cloud Storage</ItemTitle>
    <ItemDescription>45.2 GB of 100 GB used</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Manage</Button>
  </ItemActions>
</Item>`}
        />
      </section>

      {/* Item Group */}
      <section id="group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Item Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Group a list of items inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ItemGroup</code> with dividers.
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden divide-y divide-[var(--border-subtle)] max-w-lg mx-auto">
          {[
            { icon: Bell, title: "Push Notifications", desc: "Receive alerts on desktop and mobile" },
            { icon: User, title: "Profile Visibility", desc: "Control who can view your public profile" },
            { icon: Settings, title: "Preferences", desc: "Language, timezone, and theme settings" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-center justify-between p-4 hover:bg-[var(--bg-subtle)]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-[var(--text-muted)]" />
                  <div>
                    <div className="text-xs font-medium text-[var(--text-main)]">{item.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-[var(--text-muted)]" />
              </div>
            )
          })}
        </div>
        <CodeBlock
          language="tsx"
          code={`<ItemGroup>
  <Item render={<a href="/notifications" />}>
    <ItemMedia variant="icon"><Bell /></ItemMedia>
    <ItemContent>
      <ItemTitle>Push Notifications</ItemTitle>
      <ItemDescription>Receive alerts on desktop</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
  <Item render={<a href="/profile" />}>
    <ItemMedia variant="icon"><User /></ItemMedia>
    <ItemContent>
      <ItemTitle>Profile Visibility</ItemTitle>
      <ItemDescription>Control public visibility</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Item layouts flip media and action slots in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <HardDrive className="size-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--text-main)]">مساحة التخزين السحابية</div>
                <div className="text-[11px] text-[var(--text-muted)]">تم استخدام 45.2 جيجابايت من 100 جيجابايت</div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              إدارة
            </Button>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
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
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">"default" | "outline" | "muted"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Visual card border style</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono">"default" | "sm" | "xs"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Padding and typography scale</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">render</td>
                <td className="p-3 font-mono">ReactElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Polymorphic render tag (e.g. &lt;a&gt;)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
