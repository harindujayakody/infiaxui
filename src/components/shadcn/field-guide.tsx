import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function FieldGuide() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [orientation, setOrientation] = useState<"vertical" | "horizontal" | "responsive">("vertical")
  const [hasError, setHasError] = useState(false)

  const isEmailInvalid = hasError || (email.length > 0 && !email.includes("@"))

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct structured, accessible form controls using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Field</code> family components:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "FieldSet",
            "├── FieldLegend",
            "└── FieldGroup",
            "    ├── Field",
            "    │   ├── FieldLabel",
            "    │   ├── Input | Textarea | Select",
            "    │   ├── FieldDescription",
            "    │   └── FieldError",
            "    └── FieldSeparator",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Field</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard vertical field pairing label, input control, and helper description.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--text-main)] block">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[var(--text-main)]"
            />
            <p className="text-[11px] text-[var(--text-muted)]">
              We will use this email for security notices and team invites.
            </p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function EmailField() {
  return (
    <Field>
      <FieldLabel>
        Work Email <span className="text-destructive">*</span>
      </FieldLabel>
      <Input type="email" placeholder="alex@company.com" />
      <FieldDescription>
        We will use this email for security notices and team invites.
      </FieldDescription>
    </Field>
  )
}`}
        />
      </section>

      {/* Layout Orientations */}
      <section id="orientations" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Orientations & Layouts</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Switch between <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">vertical</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">horizontal</code>, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">responsive</code> field layouts.
        </p>

        <div className="flex items-center gap-2">
          {(["vertical", "horizontal", "responsive"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setOrientation(mode)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium border capitalize transition-colors",
                orientation === mode
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div
            className={cn(
              "gap-4",
              orientation === "vertical" && "flex flex-col max-w-sm",
              orientation === "horizontal" && "grid grid-cols-3 items-center max-w-lg",
              orientation === "responsive" && "grid grid-cols-1 sm:grid-cols-3 sm:items-center max-w-lg"
            )}
          >
            <label className="text-xs font-medium text-[var(--text-main)]">
              API Token Name
            </label>
            <div className={cn(orientation !== "vertical" && "col-span-2", "space-y-1.5")}>
              <input
                type="text"
                placeholder="production-webhook-key"
                className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[var(--text-main)]"
              />
              <p className="text-[11px] text-[var(--text-muted)]">
                Unique identifier for logging requests.
              </p>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field orientation="${orientation}">
  <FieldLabel>API Token Name</FieldLabel>
  <Input placeholder="production-webhook-key" />
  <FieldDescription>Unique identifier for logging requests.</FieldDescription>
</Field>`}
        />
      </section>

      {/* Validation & Error States */}
      <section id="validation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Validation & Error State</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">data-invalid</code> or <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> to trigger validation feedback.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">Toggle Test Error:</span>
            <button
              onClick={() => setHasError(!hasError)}
              className="text-xs px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              {hasError ? "Clear Error" : "Trigger Error"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--text-main)] flex items-center justify-between">
              <span>Account Password</span>
              <span className="text-[10px] text-red-500 font-normal">Minimum 8 characters</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={cn(
                "w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border transition-colors focus:outline-none focus:ring-1",
                isEmailInvalid || (password.length > 0 && password.length < 8)
                  ? "border-red-500/60 focus:ring-red-500 text-red-500"
                  : "border-[var(--border-subtle)] focus:ring-indigo-500 text-[var(--text-main)]"
              )}
            />
            {(isEmailInvalid || (password.length > 0 && password.length < 8)) ? (
              <p className="text-[11px] text-red-500 flex items-center gap-1.5">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>Password must be at least 8 characters long.</span>
              </p>
            ) : (
              <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>Strong passwords contain letters, numbers, and symbols.</span>
              </p>
            )}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Field data-invalid={isInvalid}>
  <FieldLabel>Account Password</FieldLabel>
  <Input
    type="password"
    aria-invalid={isInvalid}
    placeholder="••••••••"
  />
  {isInvalid ? (
    <FieldError>Password must be at least 8 characters long.</FieldError>
  ) : (
    <FieldDescription>Strong passwords contain letters and symbols.</FieldDescription>
  )}
</Field>`}
        />
      </section>

      {/* FieldSet Grouping */}
      <section id="fieldset" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">FieldSet & FieldGroup</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Group related form fields under a semantic <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;fieldset&gt;</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;legend&gt;</code>.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-lg mx-auto">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--text-main)] mb-1">
              Billing Address
            </legend>
            <p className="text-xs text-[var(--text-muted)] -mt-3 mb-4">
              Enter the cardholder billing address.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text-main)]">Street</label>
                <input
                  type="text"
                  placeholder="123 Market St, Suite 400"
                  className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-main)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[var(--text-main)]">City</label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-main)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[var(--text-main)]">Postal Code</label>
                  <input
                    type="text"
                    placeholder="94105"
                    className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-main)]"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <CodeBlock
          language="tsx"
          code={`<FieldSet>
  <FieldLegend>Billing Address</FieldLegend>
  <FieldDescription>Enter the cardholder billing address.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel>Street</FieldLabel>
      <Input placeholder="123 Market St, Suite 400" />
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel>City</FieldLabel>
        <Input placeholder="San Francisco" />
      </Field>
      <Field>
        <FieldLabel>Postal Code</FieldLabel>
        <Input placeholder="94105" />
      </Field>
    </div>
  </FieldGroup>
</FieldSet>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Fields and labels automatically flip alignment in right-to-left locales.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto space-y-2">
          <label className="text-xs font-medium text-[var(--text-main)] block">
            اسم المستخدم <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="علي محمد"
            className="w-full h-9 rounded-lg px-3 text-xs bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[var(--text-main)]"
          />
          <p className="text-[11px] text-[var(--text-muted)]">
            سيتم عرض هذا الاسم في ملفك الشخصي العام.
          </p>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Field.orientation</td>
                <td className="p-3 font-mono">"vertical" | "horizontal" | "responsive"</td>
                <td className="p-3 font-mono">"vertical"</td>
                <td className="p-3">Arrangement of label and input controls</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Field.data-invalid</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Styles error indicators and connects aria-errormessage</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">FieldSet</td>
                <td className="p-3 font-mono">HTMLFieldSetElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Semantic container for grouping related fields</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">FieldError</td>
                <td className="p-3 font-mono">HTMLParagraphElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Destructive message element with ARIA live region support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
