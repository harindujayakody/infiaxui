import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, Minus, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function CheckboxGuide() {
  const [terms, setTerms] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  // Group items
  const [items, setItems] = useState([
    { id: "recents", label: "Recents", checked: true },
    { id: "home", label: "Home", checked: true },
    { id: "applications", label: "Applications", checked: false },
    { id: "desktop", label: "Desktop", checked: false },
  ])

  const allChecked = items.every((i) => i.checked)
  const someChecked = items.some((i) => i.checked) && !allChecked

  const toggleAll = () => {
    const nextState = !allChecked
    setItems(items.map((i) => ({ ...i, checked: nextState })))
  }

  const toggleItem = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Checkbox</code> primitive with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Field</code> layout primitives for accessible form labels:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Field (orientation='horizontal')",
            "├── Checkbox (checked={...} onCheckedChange={...})",
            "└── FieldContent",
            "    ├── FieldLabel",
            "    ├── FieldDescription",
            "    └── FieldError",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Checkbox</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Accessible checkbox with label and terms agreement toggle.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <button
              type="button"
              role="checkbox"
              aria-checked={terms}
              onClick={() => setTerms(!terms)}
              className={cn(
                "size-4 rounded border transition-colors flex items-center justify-center shrink-0 mt-0.5",
                terms
                  ? "bg-[var(--text-main)] border-[var(--text-main)] text-[var(--bg-page)]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-page)]"
              )}
            >
              {terms && <Check className="size-3 stroke-[3]" />}
            </button>
            <div className="space-y-1">
              <span className="text-xs font-medium text-[var(--text-main)] block">
                Accept terms and conditions
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </label>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true)

  return (
    <Field orientation="horizontal">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <FieldContent>
        <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          You agree to our Terms of Service and Privacy Policy.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}`}
        />
      </section>

      {/* Checkbox Group with Indeterminate State */}
      <section id="group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Group with "Select All" Indeterminate State</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Manage a collection of checkboxes with an auto-calculating parent select-all toggle.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto space-y-3">
          {/* Parent Toggle */}
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={toggleAll}
              className={cn(
                "size-4 rounded border transition-colors flex items-center justify-center shrink-0",
                allChecked || someChecked
                  ? "bg-[var(--text-main)] border-[var(--text-main)] text-[var(--bg-page)]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-page)]"
              )}
            >
              {allChecked && <Check className="size-3 stroke-[3]" />}
              {someChecked && <Minus className="size-3 stroke-[3]" />}
            </button>
            <span className="text-xs font-semibold text-[var(--text-main)]">
              Select All Directories
            </span>
          </div>

          {/* Child Items */}
          <div className="pl-6 space-y-2.5">
            {items.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "size-4 rounded border transition-colors flex items-center justify-center shrink-0",
                    item.checked
                      ? "bg-[var(--text-main)] border-[var(--text-main)] text-[var(--bg-page)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-page)]"
                  )}
                >
                  {item.checked && <Check className="size-3 stroke-[3]" />}
                </button>
                <span className="text-xs text-[var(--text-main)]">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Checkbox
  checked={allChecked ? true : someChecked ? "indeterminate" : false}
  onCheckedChange={toggleAll}
/>`}
        />
      </section>

      {/* Invalid & Disabled States */}
      <section id="states" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid & Disabled States</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control disabled styles with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> and validation with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code>.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto space-y-4">
          <div className="flex items-center gap-3 opacity-50 cursor-not-allowed">
            <div className="size-4 rounded border border-[var(--border-subtle)] bg-[var(--bg-subtle)]" />
            <span className="text-xs text-[var(--text-muted)]">
              Enterprise Single Sign-On (Requires Enterprise Plan)
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border border-red-500/30 bg-red-500/5">
            <div className="size-4 rounded border border-red-500 bg-transparent flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="size-3 text-red-500" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-red-500">
                You must accept the terms to proceed.
              </span>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Field data-invalid={true}>
  <Checkbox id="terms-error" aria-invalid={true} />
  <FieldLabel htmlFor="terms-error">Accept terms</FieldLabel>
  <FieldError>You must accept the terms to proceed.</FieldError>
</Field>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Checkboxes and text flow properly from right to left in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto">
          <label className="flex items-center gap-3">
            <div className="size-4 rounded bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center">
              <Check className="size-3 stroke-[3]" />
            </div>
            <span className="text-xs font-medium text-[var(--text-main)]">
              أوافق على الشروط والأحكام وسياسة الخصوصية
            </span>
          </label>
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
                <td className="p-3 font-mono">boolean | "indeterminate"</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Controlled check state or indeterminate state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onCheckedChange</td>
                <td className="p-3 font-mono">(checked: boolean) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback triggered when check state transitions</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Prevents user clicks and dims styling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
