import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Switch } from "@/components/shadcn/switch"
import { Wifi, Bell, Moon, Volume2, Globe, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------- Choice Card helper ----------
function ChoiceCard({
  id,
  title,
  description,
  checked,
  onCheckedChange,
  icon: Icon,
  disabled = false,
}: {
  id: string
  title: string
  description: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
  icon: React.ElementType
  disabled?: boolean
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors",
        disabled
          ? "border-[var(--border-subtle)] opacity-50 cursor-not-allowed"
          : checked
          ? "border-[var(--text-main)] bg-[var(--bg-subtle)]/40"
          : "border-[var(--border-subtle)] hover:border-[var(--text-muted)]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "size-8 rounded-lg flex items-center justify-center",
          checked ? "bg-[var(--text-main)] text-[var(--bg-page)]" : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
        )}>
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--text-main)]">{title}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </label>
  )
}

export function SwitchGuide() {
  const [basic, setBasic] = useState(false)
  const [desc, setDesc] = useState(true)
  const [wifi, setWifi] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [disabledOn, setDisabledOn] = useState(true)
  const [disabledOff, setDisabledOff] = useState(false)
  const [rtlVal, setRtlVal] = useState(true)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A minimal switch — click to toggle between checked and unchecked states.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-3">
          <Switch id="basic-switch" checked={basic} onCheckedChange={setBasic} />
          <label htmlFor="basic-switch" className="text-xs text-[var(--text-muted)] cursor-pointer">
            {basic ? "Enabled" : "Disabled"}
          </label>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Switch } from "@/components/ui/switch"

<Switch />`}
        />
      </section>

      {/* Description */}
      <section id="description" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Description</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair with a label and description for a complete form field.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex items-center justify-between gap-4 w-full max-w-xs rounded-xl border border-[var(--border-subtle)] p-4">
            <div className="space-y-0.5">
              <label htmlFor="desc-switch" className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                Airplane Mode
              </label>
              <p className="text-[11px] text-[var(--text-muted)]">Disable all wireless connections.</p>
            </div>
            <Switch id="desc-switch" checked={desc} onCheckedChange={setDesc} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<div className="flex items-center justify-between p-4 rounded-xl border">
  <div>
    <FieldLabel>Airplane Mode</FieldLabel>
    <FieldDescription>Disable all wireless connections.</FieldDescription>
  </div>
  <Switch />
</div>`}
        />
      </section>

      {/* Choice Card */}
      <section id="choice-card" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Choice Card</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Card-style selection where the entire card is a clickable label wrapping the switch.
        </p>
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          <ChoiceCard
            id="choice-wifi"
            title="Wi-Fi"
            description="Connect to local wireless networks."
            checked={wifi}
            onCheckedChange={setWifi}
            icon={Wifi}
          />
          <ChoiceCard
            id="choice-notifications"
            title="Notifications"
            description="Receive push alerts and badges."
            checked={notifications}
            onCheckedChange={setNotifications}
            icon={Bell}
          />
          <ChoiceCard
            id="choice-dark"
            title="Dark Mode"
            description="Use the dark color scheme."
            checked={darkMode}
            onCheckedChange={setDarkMode}
            icon={Moon}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`<FieldLabel asChild>
  <label htmlFor="wifi" className="flex items-center justify-between p-4 rounded-xl border cursor-pointer">
    <div className="flex items-center gap-3">
      <Wifi className="size-4" />
      <div>
        <span className="text-sm font-medium">Wi-Fi</span>
        <p className="text-xs text-muted-foreground">Connect to local wireless networks.</p>
      </div>
    </div>
    <Switch id="wifi" />
  </label>
</FieldLabel>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to prevent interaction.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Switch id="dis-on" checked={disabledOn} disabled />
            <label htmlFor="dis-on" className="text-xs text-[var(--text-muted)]">On (locked)</label>
          </div>
          <div className="flex items-center gap-2 opacity-50">
            <Switch id="dis-off" checked={disabledOff} disabled />
            <label htmlFor="dis-off" className="text-xs text-[var(--text-muted)]">Off (locked)</label>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Switch disabled />
<Switch disabled defaultChecked />`}
        />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> to mark the switch as having a validation error, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">data-invalid</code> to the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Field</code> for styling.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs rounded-xl border border-red-500/40 bg-red-500/5 p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[var(--text-main)]">Marketing Emails</p>
              <p className="text-[11px] text-red-400">This setting is required to continue.</p>
            </div>
            <Switch aria-checked={false} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-invalid>
  <Switch aria-invalid />
  <FieldError>This setting is required to continue.</FieldError>
</Field>`}
        />
      </section>

      {/* Size */}
      <section id="size" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Size</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop to render a smaller or larger switch.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={true} className="scale-75 origin-left" />
            <span className="text-xs text-[var(--text-muted)]">sm</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={true} />
            <span className="text-xs text-[var(--text-muted)]">default</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={true} className="scale-125 origin-left" />
            <span className="text-xs text-[var(--text-muted)]">lg</span>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Switch size="sm" />
<Switch />
<Switch size="lg" />`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Switch renders correctly in RTL layouts. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex items-center justify-between gap-4 w-full max-w-xs rounded-xl border border-[var(--border-subtle)] p-4">
            <div className="space-y-0.5">
              <label htmlFor="rtl-switch" className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                وضع الطيران
              </label>
              <p className="text-[11px] text-[var(--text-muted)]">تعطيل جميع الاتصالات اللاسلكية.</p>
            </div>
            <Switch id="rtl-switch" checked={rtlVal} onCheckedChange={setRtlVal} />
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
                <td className="p-3 font-mono text-[var(--text-main)]">checked</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled checked state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">defaultChecked</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Uncontrolled initial state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onCheckedChange</td>
                <td className="p-3 font-mono">(checked: boolean) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback when value changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Prevents user interaction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">aria-invalid</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Marks field as invalid for a11y</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono">"sm" | "default" | "lg"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Size of the switch control</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
