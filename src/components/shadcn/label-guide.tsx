import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Input } from "@/components/shadcn/input"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Switch } from "@/components/shadcn/switch"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode
  htmlFor?: string
  className?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-xs font-medium leading-none text-[var(--text-main)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer",
        className
      )}
    >
      {children}
    </label>
  )
}

export function LabelGuide() {
  const [terms, setTerms] = useState(false)
  const [airplane, setAirplane] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Callout */}
      <div className="flex items-start gap-3 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 text-xs">
        <Info className="size-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-[var(--text-muted)] leading-relaxed">
          For form layouts requiring descriptions and validation errors, see the{" "}
          <strong className="text-[var(--text-main)]">Field</strong> component which bundles{" "}
          <code className="font-mono text-[var(--text-main)]">FieldLabel</code>,{" "}
          <code className="font-mono text-[var(--text-main)]">FieldDescription</code>, and{" "}
          <code className="font-mono text-[var(--text-main)]">FieldError</code>.
        </div>
      </div>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          An accessible label associated directly with a form control.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="email-input">Your email address</Label>
            <Input id="email-input" type="email" placeholder="name@example.com" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Your email address</Label>
  <Input type="email" id="email" placeholder="name@example.com" />
</div>`}
        />
      </section>

      {/* Control Pairings */}
      <section id="pairings" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Control Pairings</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Label paired with checkboxes, switches, and radio buttons.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={terms} onCheckedChange={(v) => setTerms(!!v)} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={airplane} onCheckedChange={setAirplane} />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Checkbox with Label */}
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

{/* Switch with Label */}
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Labels align naturally in RTL layouts.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="rtl-email">عنوان البريد الإلكتروني</Label>
            <Input id="rtl-email" placeholder="name@example.com" />
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
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">htmlFor</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">The id of the input element this label is associated with</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Custom styling classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
