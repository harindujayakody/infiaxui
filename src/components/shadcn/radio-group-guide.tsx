import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { AlertCircle, Shield, Zap, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

function RadioGroupItem({
  value,
  id,
  checked,
  onChange,
  disabled = false,
  invalid = false,
}: {
  value: string
  id: string
  checked: boolean
  onChange: (v: string) => void
  disabled?: boolean
  invalid?: boolean
}) {
  return (
    <button
      type="button"
      role="radio"
      id={id}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      className={cn(
        "aspect-square size-4 rounded-full border flex items-center justify-center transition-all",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-main)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-red-500/80" : "border-[var(--text-main)]",
        checked ? "bg-[var(--text-main)] text-[var(--bg-page)]" : "bg-transparent"
      )}
    >
      {checked && <div className="size-1.5 rounded-full bg-[var(--bg-page)]" />}
    </button>
  )
}

export function RadioGroupGuide() {
  const [basic, setBasic] = useState("default")
  const [desc, setDesc] = useState("card")
  const [choice, setChoice] = useState("pro")
  const [plan, setPlan] = useState("startup")
  const [invalidVal, setInvalidVal] = useState("")
  const [rtlVal, setRtlVal] = useState("opt-1")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">RadioGroup</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>RadioGroup</div>
          <div className="pl-4">├── RadioGroupItem</div>
          <div className="pl-4">└── RadioGroupItem</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A simple set of radio buttons with labels.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="space-y-3">
            {[
              { id: "r1", value: "default", label: "Default" },
              { id: "r2", value: "comfortable", label: "Comfortable" },
              { id: "r3", value: "compact", label: "Compact" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <RadioGroupItem
                  id={item.id}
                  value={item.value}
                  checked={basic === item.value}
                  onChange={setBasic}
                />
                <label htmlFor={item.id} className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="default">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`}
        />
      </section>

      {/* Description */}
      <section id="description" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Description</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Radio items with supporting description text.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="space-y-4 max-w-sm">
            {[
              { id: "d1", value: "card", title: "Credit Card", desc: "Pay with Mastercard, Visa, or Amex." },
              { id: "d2", value: "paypal", title: "PayPal", desc: "Fast and secure checkout with PayPal." },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="pt-0.5">
                  <RadioGroupItem
                    id={item.id}
                    value={item.value}
                    checked={desc === item.value}
                    onChange={setDesc}
                  />
                </div>
                <div>
                  <label htmlFor={item.id} className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                    {item.title}
                  </label>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field>
  <RadioGroupItem value="card" id="d1" />
  <div>
    <FieldLabel htmlFor="d1">Credit Card</FieldLabel>
    <FieldDescription>Pay with Mastercard, Visa, or Amex.</FieldDescription>
  </div>
</Field>`}
        />
      </section>

      {/* Choice Card */}
      <section id="choice-card" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Choice Card</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Clickable card selection style wrapping the entire field.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
          {[
            { id: "c1", value: "free", icon: Shield, title: "Starter", desc: "Free forever for individuals", price: "$0" },
            { id: "c2", value: "pro", icon: Zap, title: "Professional", desc: "Advanced features for power users", price: "$19/mo" },
            { id: "c3", value: "enterprise", icon: Sparkles, title: "Enterprise", desc: "Dedicated support and SLA", price: "$99/mo" },
          ].map((item) => {
            const Icon = item.icon
            const isChecked = choice === item.value
            return (
              <div
                key={item.id}
                onClick={() => setChoice(item.value)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                  isChecked
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)]/40"
                    : "border-[var(--border-subtle)] hover:border-[var(--text-muted)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id={item.id}
                    value={item.value}
                    checked={isChecked}
                    onChange={setChoice}
                  />
                  <div className="size-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)]">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--text-main)]">{item.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{item.desc}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[var(--text-main)]">{item.price}</span>
              </div>
            )
          })}
        </div>
        <CodeBlock
          language="tsx"
          code={`<FieldLabel asChild>
  <label className="flex items-center justify-between p-4 rounded-xl border cursor-pointer">
    <div className="flex items-center gap-3">
      <RadioGroupItem value="pro" />
      <div>
        <p className="font-semibold">Professional</p>
        <p className="text-muted-foreground text-xs">Advanced features</p>
      </div>
    </div>
    <span className="font-bold">$19/mo</span>
  </label>
</FieldLabel>`}
        />
      </section>

      {/* Fieldset */}
      <section id="fieldset" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Fieldset</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Group related radio options under a semantic <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;fieldset&gt;</code> with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;legend&gt;</code>.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold text-[var(--text-main)] mb-2">
              Select deployment target
            </legend>
            {[
              { id: "f1", value: "startup", label: "Vercel Serverless" },
              { id: "f2", value: "aws", label: "AWS Lambda & CloudFront" },
              { id: "f3", value: "docker", label: "Self-hosted Docker Container" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <RadioGroupItem
                  id={item.id}
                  value={item.value}
                  checked={plan === item.value}
                  onChange={setPlan}
                />
                <label htmlFor={item.id} className="text-xs text-[var(--text-muted)] cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <CodeBlock
          language="tsx"
          code={`<FieldSet>
  <FieldLegend>Select deployment target</FieldLegend>
  <RadioGroup defaultValue="startup">
    <div className="flex items-center gap-3">
      <RadioGroupItem value="startup" id="f1" />
      <Label htmlFor="f1">Vercel Serverless</Label>
    </div>
  </RadioGroup>
</FieldSet>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to prevent selection.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-6">
          <div className="flex items-center gap-3 opacity-60">
            <RadioGroupItem id="dis-1" value="dis1" checked={true} onChange={() => {}} disabled />
            <label htmlFor="dis-1" className="text-xs text-[var(--text-muted)]">Checked (Disabled)</label>
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <RadioGroupItem id="dis-2" value="dis2" checked={false} onChange={() => {}} disabled />
            <label htmlFor="dis-2" className="text-xs text-[var(--text-muted)]">Unchecked (Disabled)</label>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup disabled defaultValue="option-one">
  <RadioGroupItem value="option-one" />
  <RadioGroupItem value="option-two" />
</RadioGroup>`}
        />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> on the item and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">data-invalid</code> on the field container.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem
                id="inv-1"
                value="opt-a"
                checked={invalidVal === "opt-a"}
                onChange={setInvalidVal}
                invalid={!invalidVal}
              />
              <label htmlFor="inv-1" className="text-xs text-[var(--text-main)] cursor-pointer">Option A</label>
            </div>
            {!invalidVal && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="size-3 shrink-0" />
                Please select an option to continue.
              </p>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-invalid>
  <RadioGroup aria-invalid>
    <RadioGroupItem value="option-one" aria-invalid />
  </RadioGroup>
  <FieldError>Please select an option to continue.</FieldError>
</Field>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Radio Group renders correctly in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="space-y-3">
            {[
              { id: "rtl-1", value: "opt-1", label: "الخيار الأول" },
              { id: "rtl-2", value: "opt-2", label: "الخيار الثاني" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <RadioGroupItem
                  id={item.id}
                  value={item.value}
                  checked={rtlVal === item.value}
                  onChange={setRtlVal}
                />
                <label htmlFor={item.id} className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
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
                <td className="p-3 font-mono text-[var(--text-main)]">defaultValue</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Initial selected value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled selected value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onValueChange</td>
                <td className="p-3 font-mono">(value: string) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback when selection changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Disables all items in the group</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
