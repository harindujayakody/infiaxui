import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  LabelDemo,
  LabelInFieldDemo,
  LabelRtlDemo,
} from "@/components/shadcn/label-demo"

export function LabelGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[220px]">
          <LabelDemo />
        </div>
      </section>

      {/* Callout */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 p-4 text-xs text-[var(--text-muted)] space-y-1">
        <span className="font-semibold text-[var(--text-main)]">Form Integration Tip:</span>
        <p>
          For comprehensive forms, use the <code className="font-mono text-[var(--text-main)]">Field</code> component which includes built-in label, description, and error handling.
        </p>
      </div>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="label"
        dependencies="@base-ui/react"
        sourcePath="components/ui/label.tsx"
        sourceCode={`import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Label } from "@/components/ui/label"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Label htmlFor="email">Your email address</Label>`}
        />
      </section>

      {/* Label in Field */}
      <section id="field" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Label in Field</h2>
        <p className="text-sm text-[var(--text-muted)]">
          For full form fields, combine labels with input controls, help text, and error states.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <LabelInFieldDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function FieldDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Work Email</Label>
        <Input id="email" type="email" placeholder="alex@company.com" />
        <p className="text-xs text-muted-foreground">
          We will use this address for billing invoices.
        </p>
      </div>
      <Button size="sm">Save Email</Button>
    </div>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Labels seamlessly support right-to-left layout direction and alignments.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <LabelRtlDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`<div dir="rtl" className="space-y-1.5 text-right">
  <Label htmlFor="rtl-email">عنوان البريد الإلكتروني</Label>
  <Input id="rtl-email" type="email" />
</div>`}
        />
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">Label</td>
                <td className="p-3">HTMLLabelElement</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">The label component associated with input controls.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">htmlFor</td>
                <td className="p-3">string</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">The ID of the form control that this label describes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
