import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, ChevronsUpDown, X, Search, Plus, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function ComboboxGuide() {
  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ]

  const [openBasic, setOpenBasic] = useState(false)
  const [selectedVal, setSelectedVal] = useState("next")
  const [basicQuery, setBasicQuery] = useState("")

  // Multi-select chips
  const [selectedChips, setSelectedChips] = useState<string[]>(["Next.js", "Astro"])
  const [openChips, setOpenChips] = useState(false)

  const filtered = frameworks.filter((f) =>
    f.label.toLowerCase().includes(basicQuery.toLowerCase())
  )

  const selectedLabel = frameworks.find((f) => f.value === selectedVal)?.label

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build autocomplete inputs and filterable multi-select chips using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Combobox</code> family:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Combobox (items={...})",
            "├── ComboboxInput (or ComboboxChips + ComboboxChipsInput)",
            "└── ComboboxContent",
            "    ├── ComboboxEmpty",
            "    └── ComboboxList",
            "        ├── ComboboxGroup",
            "        │   ├── ComboboxLabel",
            "        │   └── ComboboxItem",
            "        └── ComboboxSeparator",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Combobox</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Single-select searchable framework dropdown with checkmark indicators.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[300px]">
          <div className="relative w-56">
            <button
              onClick={() => setOpenBasic(!openBasic)}
              className="w-full h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center justify-between text-[var(--text-main)] shadow-sm hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <span>{selectedLabel || "Select framework..."}</span>
              <ChevronsUpDown className="size-3.5 text-[var(--text-muted)]" />
            </button>

            <AnimatePresence>
              {openBasic && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  className="absolute left-0 top-full mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-2xl z-50 text-xs"
                >
                  <div className="flex items-center px-2 py-1 border-b border-[var(--border-subtle)] mb-1">
                    <Search className="size-3 text-[var(--text-muted)] mr-1.5" />
                    <input
                      autoFocus
                      value={basicQuery}
                      onChange={(e) => setBasicQuery(e.target.value)}
                      placeholder="Search framework..."
                      className="w-full bg-transparent text-xs text-[var(--text-main)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-0.5 max-h-40 overflow-y-auto">
                    {filtered.length === 0 ? (
                      <div className="p-3 text-center text-[11px] text-[var(--text-muted)]">
                        No framework found.
                      </div>
                    ) : (
                      filtered.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setSelectedVal(item.value)
                            setOpenBasic(false)
                            setBasicQuery("")
                          }}
                          className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-main)] text-left"
                        >
                          <span>{item.label}</span>
                          {selectedVal === item.value && (
                            <Check className="size-3.5 text-indigo-500" />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`}
        />
      </section>

      {/* Multiple with Chips */}
      <section id="multiple-chips" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Multiple Selection with Chips</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Multi-select with tag pill chips and inline tag removal.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--text-main)]">Target Stacks</label>
            <div className="min-h-11 p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex flex-wrap items-center gap-1.5">
              {selectedChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-main)]"
                >
                  <span>{chip}</span>
                  <button
                    onClick={() => setSelectedChips(selectedChips.filter((c) => c !== chip))}
                    className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}

              <button
                onClick={() => setOpenChips(!openChips)}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-0.5 flex items-center gap-1"
              >
                <Plus className="size-3" />
                <span>Add tag...</span>
              </button>
            </div>

            {openChips && (
              <div className="p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-lg flex flex-wrap gap-1.5 text-xs">
                {frameworks
                  .filter((f) => !selectedChips.includes(f.label))
                  .map((f) => (
                    <button
                      key={f.value}
                      onClick={() => {
                        setSelectedChips([...selectedChips, f.label])
                        setOpenChips(false)
                      }}
                      className="px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                    >
                      + {f.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
  <ComboboxChips>
    <ComboboxValue>
      {value.map((item) => (
        <ComboboxChip key={item}>{item}</ComboboxChip>
      ))}
    </ComboboxValue>
    <ComboboxChipsInput placeholder="Add framework" />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Combobox chevron and item checkmarks mirror automatically in RTL locales.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-xs mx-auto">
          <div className="h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center justify-between">
            <span>اختر إطار العمل...</span>
            <ChevronsUpDown className="size-3.5 text-[var(--text-muted)]" />
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
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Combobox.multiple</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Enables multi-item selection with chip tags</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Combobox.autoHighlight</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Automatically highlights the top search match on query</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ComboboxChips</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Container wrapper for active tag chips and input field</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
