import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

function NativeSelect({
  children,
  className,
  disabled = false,
  invalid = false,
  value,
  onChange,
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  invalid?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          "h-9 w-full appearance-none rounded-lg border px-3 py-1.5 pr-8 text-xs transition-colors",
          "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-main)]",
          "focus:outline-none focus:ring-1 focus:ring-[var(--text-main)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "border-red-500/80 focus:ring-red-500/80",
          className
        )}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[var(--text-muted)]">
        <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export function NativeSelectGuide() {
  const [fruit, setFruit] = useState("")
  const [grouped, setGrouped] = useState("")
  const [invalidVal, setInvalidVal] = useState("")
  const [rtlVal, setRtlVal] = useState("apple")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Comparison Callout */}
      <div className="flex items-start gap-3 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 text-xs">
        <Info className="size-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-[var(--text-muted)] leading-relaxed">
          For a styled custom popup select component with animations, see the{" "}
          <a href="/components/select" className="underline text-[var(--text-main)] font-medium hover:opacity-80">
            Select
          </a>{" "}
          component. Use <strong className="text-[var(--text-main)]">NativeSelect</strong> for raw native browser dropdown behavior, best performance, and native mobile pickers.
        </div>
      </div>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
            <div className="text-[var(--text-main)] font-semibold mb-2">Simple</div>
            <div>NativeSelect</div>
            <div className="pl-4">├── NativeSelectOption</div>
            <div className="pl-4">├── NativeSelectOption</div>
            <div className="pl-4">└── NativeSelectOption</div>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
            <div className="text-[var(--text-main)] font-semibold mb-2">With Groups</div>
            <div>NativeSelect</div>
            <div className="pl-4">├── NativeSelectOptGroup</div>
            <div className="pl-8">├── NativeSelectOption</div>
            <div className="pl-8">└── NativeSelectOption</div>
            <div className="pl-4">└── NativeSelectOptGroup</div>
          </div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A styled wrapper over the standard HTML <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;select&gt;</code> element.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-56 space-y-2">
            <NativeSelect value={fruit} onChange={(e) => setFruit(e.target.value)}>
              <option value="">Select a fruit</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="blueberry">Blueberry</option>
              <option value="pineapple">Pineapple</option>
            </NativeSelect>
            <p className="text-[11px] text-[var(--text-muted)]">Selected: {fruit || "(none)"}</p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>`}
        />
      </section>

      {/* Groups */}
      <section id="groups" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Groups</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Group related options using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;optgroup&gt;</code> categories.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-56">
            <NativeSelect value={grouped} onChange={(e) => setGrouped(e.target.value)}>
              <option value="">Select an item</option>
              <optgroup label="Fruits">
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="blueberry">Blueberry</option>
              </optgroup>
              <optgroup label="Vegetables">
                <option value="carrot">Carrot</option>
                <option value="broccoli">Broccoli</option>
                <option value="spinach">Spinach</option>
              </optgroup>
            </NativeSelect>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<NativeSelect>
  <NativeSelectOptGroup label="Fruits">
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Vegetables">
    <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
    <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to prevent user interaction.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4">
          <div className="w-48">
            <NativeSelect disabled value="disabled">
              <option value="disabled">Disabled Select</option>
            </NativeSelect>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<NativeSelect disabled>
  <NativeSelectOption value="locked">Locked option</NativeSelectOption>
</NativeSelect>`}
        />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> and validation error messages.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-56 space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]">Fruit</label>
            <NativeSelect
              invalid={!invalidVal}
              value={invalidVal}
              onChange={(e) => setInvalidVal(e.target.value)}
            >
              <option value="">Select a fruit</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
            </NativeSelect>
            {!invalidVal && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                Please select a fruit to continue.
              </p>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <NativeSelect aria-invalid>
    <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  </NativeSelect>
  <FieldError>Please select a fruit.</FieldError>
</Field>`}
        />
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Native Select vs Select</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Feature</th>
                <th className="p-3 font-semibold">Native Select</th>
                <th className="p-3 font-semibold">Custom Select</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-medium text-[var(--text-main)]">Platform picker</td>
                <td className="p-3">Native OS dialog (wheel on iOS)</td>
                <td className="p-3">Custom HTML floating portal</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[var(--text-main)]">Performance</td>
                <td className="p-3">Zero runtime JS overhead</td>
                <td className="p-3">Full React lifecycle</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[var(--text-main)]">Animations</td>
                <td className="p-3">OS default</td>
                <td className="p-3">Full Framer Motion support</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-[var(--text-main)]">Custom item markup</td>
                <td className="p-3">Plain text only</td>
                <td className="p-3">Icons, badges, descriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Native Select handles RTL text alignment natively.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-56">
            <NativeSelect value={rtlVal} onChange={(e) => setRtlVal(e.target.value)}>
              <option value="apple">تفاح</option>
              <option value="banana">موز</option>
              <option value="orange">برتقال</option>
            </NativeSelect>
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
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NativeSelect</td>
                <td className="p-3 font-mono">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">Disables interaction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NativeSelectOption</td>
                <td className="p-3 font-mono">value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Option identifier value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">NativeSelectOptGroup</td>
                <td className="p-3 font-mono">label</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Group header label text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
