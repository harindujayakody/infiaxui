import React, { useState, useRef, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronDown, Check, AlertCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ---------- Self-contained Select primitive ----------
interface SelectItem { label: string; value: string; disabled?: boolean }

interface SelectProps {
  items?: SelectItem[]
  placeholder?: string
  value?: string
  onValueChange?: (v: string) => void
  disabled?: boolean
  invalid?: boolean
  className?: string
  children?: React.ReactNode
}

function Select({ items = [], placeholder = "Select...", value: cv, onValueChange, disabled = false, invalid = false, className }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [iv, setIv] = useState("")
  const value = cv !== undefined ? cv : iv
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const selected = items.find(i => i.value === value)

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm text-left transition-colors",
          "bg-[var(--bg-card)] border-[var(--border-subtle)]",
          "focus:outline-none focus:ring-1 focus:ring-[var(--text-main)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          invalid && "border-red-500/60",
          open && "border-[var(--text-main)]"
        )}
      >
        <span className={selected ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className={cn("size-4 text-[var(--text-muted)] transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl overflow-hidden text-sm"
          >
            {items.map(item => (
              <button
                key={item.value}
                type="button"
                disabled={item.disabled}
                onClick={() => { const v = item.value; onValueChange ? onValueChange(v) : setIv(v); setOpen(false) }}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 text-left transition-colors",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  item.disabled ? "" : "hover:bg-[var(--bg-subtle)]",
                  value === item.value ? "text-[var(--text-main)] font-medium" : "text-[var(--text-muted)]"
                )}
              >
                {item.label}
                {value === item.value && <Check className="size-3.5 text-[var(--text-main)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Data ----------
const THEMES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

const TIMEZONES = [
  { label: "Pacific Time (PT)", value: "PT" },
  { label: "Mountain Time (MT)", value: "MT" },
  { label: "Central Time (CT)", value: "CT" },
  { label: "Eastern Time (ET)", value: "ET" },
  { label: "UTC", value: "UTC" },
  { label: "Central European Time (CET)", value: "CET" },
  { label: "Eastern European Time (EET)", value: "EET" },
  { label: "Asia/Kolkata (IST)", value: "IST" },
  { label: "Asia/Tokyo (JST)", value: "JST" },
  { label: "Australia/Sydney (AEST)", value: "AEST" },
]

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export function SelectGuide() {
  const [theme, setTheme] = useState("")
  const [timezone, setTimezone] = useState("")
  const [controlled, setControlled] = useState("dark")
  const [invalidVal, setInvalidVal] = useState("")
  const [rtlVal, setRtlVal] = useState("")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Select</div>
          <div className="pl-4">├── SelectTrigger</div>
          <div className="pl-8">└── SelectValue</div>
          <div className="pl-4">└── SelectContent</div>
          <div className="pl-8">├── SelectGroup</div>
          <div className="pl-12">├── SelectLabel</div>
          <div className="pl-12">└── SelectItem × N</div>
          <div className="pl-8">├── SelectSeparator</div>
          <div className="pl-8">└── SelectGroup</div>
          <div className="pl-12">└── SelectItem × N</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">A basic select for choosing a theme.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Select items={THEMES} placeholder="Theme" value={theme} onValueChange={setTheme} className="w-48" />
        </div>
        <CodeBlock language="tsx" code={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

<Select items={items}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>`} />
      </section>

      {/* Groups */}
      <section id="groups" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Groups</h2>
        <p className="text-sm text-[var(--text-muted)]">Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SelectGroup</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SelectLabel</code>, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">SelectSeparator</code> to organize items.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Select
            items={[
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Blueberry", value: "blueberry" },
              { label: "Grapes", value: "grapes" },
              { label: "Pineapple", value: "pineapple" },
            ]}
            placeholder="Select a fruit"
            className="w-52"
          />
        </div>
        <CodeBlock language="tsx" code={`<Select items={items}>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`} />
      </section>

      {/* Scrollable */}
      <section id="scrollable" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Scrollable</h2>
        <p className="text-sm text-[var(--text-muted)]">A select with many items that scrolls inside the popup.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Select items={TIMEZONES} placeholder="Select timezone" value={timezone} onValueChange={setTimezone} className="w-64" />
        </div>
        <CodeBlock language="tsx" code={`{/* SelectContent maxHeight controls scroll */}
<SelectContent className="max-h-60 overflow-y-auto">
  {timezones.map((tz) => (
    <SelectItem key={tz.value} value={tz.value}>
      {tz.label}
    </SelectItem>
  ))}
</SelectContent>`} />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">Pass <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> to the trigger, or to individual items.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4">
          <Select items={THEMES} placeholder="Disabled select" disabled className="w-44" />
          <Select
            items={[
              { label: "Light", value: "light" },
              { label: "Dark (locked)", value: "dark", disabled: true },
              { label: "System", value: "system" },
            ]}
            placeholder="Some disabled items"
            className="w-48"
          />
        </div>
        <CodeBlock language="tsx" code={`{/* Disable the entire select */}
<SelectTrigger disabled>...</SelectTrigger>

{/* Disable specific items */}
<SelectItem value="dark" disabled>Dark (locked)</SelectItem>`} />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="text-sm text-[var(--text-muted)]">Add <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">data-invalid</code> to the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Field</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> to the trigger for an error state.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-52 space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]">Fruit</label>
            <Select items={FRUITS} placeholder="Select a fruit" value={invalidVal} onValueChange={setInvalidVal} invalid={!invalidVal} className="w-full" />
            {!invalidVal && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />Please select a fruit.
              </p>
            )}
          </div>
        </div>
        <CodeBlock language="tsx" code={`<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
  <FieldError>Please select a fruit.</FieldError>
</Field>`} />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">Select supports RTL layouts. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.</p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Select
            items={[{ label: "فاتح", value: "light" }, { label: "داكن", value: "dark" }, { label: "تلقائي", value: "system" }]}
            placeholder="المظهر"
            value={rtlVal}
            onValueChange={setRtlVal}
            className="w-44"
          />
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr><th className="p-3 font-semibold">Prop</th><th className="p-3 font-semibold">Type</th><th className="p-3 font-semibold">Default</th><th className="p-3 font-semibold">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              {[
                ["items","SelectItem[]","-","Array of {label, value, disabled?} options"],
                ["value","string","-","Controlled selected value"],
                ["onValueChange","(v: string) => void","-","Callback on selection change"],
                ["placeholder","string","-","Placeholder when no value selected"],
                ["disabled","boolean","false","Disables the entire select"],
                ["alignItemWithTrigger","boolean","true","Align selected item with trigger position"],
              ].map(([p,t,d,desc]) => (
                <tr key={p}><td className="p-3 font-mono text-[var(--text-main)]">{p}</td><td className="p-3 font-mono">{t}</td><td className="p-3 font-mono">{d}</td><td className="p-3">{desc}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
