import React from "react"
import {
  ComboboxBasicDemo,
  ComboboxMultipleDemo,
  ComboboxClearDemo,
  ComboboxGroupsDemo,
  ComboboxCustomDemo,
  ComboboxInvalidDemo,
  ComboboxDisabledDemo,
  ComboboxAutoHighlightDemo,
  ComboboxPopupDemo,
  ComboboxInputGroupDemo,
  ComboboxRtlDemo,
} from "@/components/shadcn/combobox-demo"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { CodeBlock } from "@/components/ui/code-block"

export function ComboboxGuide() {
  const comboboxPrimitiveCode = `import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ComboboxContextType<T = any> {
  open: boolean
  setOpen: (open: boolean) => void
  query: string
  setQuery: (query: string) => void
  selectedValue: any
  setSelectedValue: (val: any) => void
  multiple: boolean
  items: T[]
  itemToStringValue?: (item: T) => string
  disabled?: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
}

const ComboboxContext = React.createContext<ComboboxContextType | null>(null)

export function useCombobox<T = any>() {
  const context = React.useContext(ComboboxContext)
  if (!context) throw new Error("useCombobox must be used within a Combobox provider")
  return context as ComboboxContextType<T>
}

export interface ComboboxProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  items?: T[]
  value?: any
  defaultValue?: any
  onValueChange?: (value: any) => void
  multiple?: boolean
  autoHighlight?: boolean
  disabled?: boolean
  itemToStringValue?: (item: T) => string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Combobox<T = any>({
  items = [],
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  autoHighlight = false,
  disabled = false,
  itemToStringValue,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: ComboboxProps<T>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlledOpen = controlledOpen !== undefined
  const open = isControlledOpen ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) return
      if (!isControlledOpen) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [disabled, isControlledOpen, onOpenChange]
  )

  const [uncontrolledValue, setUncontrolledValue] = React.useState<any>(
    defaultValue !== undefined ? defaultValue : multiple ? [] : undefined
  )
  const isControlledValue = controlledValue !== undefined
  const selectedValue = isControlledValue ? controlledValue : uncontrolledValue

  const setSelectedValue = React.useCallback(
    (nextVal: any) => {
      if (disabled) return
      if (!isControlledValue) setUncontrolledValue(nextVal)
      onValueChange?.(nextVal)
    },
    [disabled, isControlledValue, onValueChange]
  )

  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
        selectedValue,
        setSelectedValue,
        multiple,
        items,
        itemToStringValue,
        disabled,
        inputRef,
      }}
    >
      <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ComboboxContext.Provider>
  )
}`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Global Installation UI */}
      <section id="installation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>
        <InstallationSection
          componentName="combobox"
          dependencies="@base-ui/react"
          sourceCode={comboboxPrimitiveCode}
          sourcePath="components/ui/combobox.tsx"
        />
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)]">
          Import the combobox components to build autocomplete search dropdowns.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"`}
        />
        <CodeBlock
          language="tsx"
          code={`const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
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

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-6">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">Simple</h3>
          <p className="text-xs text-[var(--text-muted)]">
            A single-line input and a flat list.
          </p>
          <CodeBlock
            language="txt"
            showLineNumbers={false}
            code={`Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem`}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">With chips</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Multi-select with <code className="text-primary font-mono">multiple</code>, chips, and a chips input.
          </p>
          <CodeBlock
            language="txt"
            showLineNumbers={false}
            code={`Combobox
├── ComboboxChips
│   ├── ComboboxValue
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem`}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">With groups and collection</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Nested items per group using <code className="text-primary font-mono">ComboboxCollection</code> inside each <code className="text-primary font-mono">ComboboxGroup</code>.
          </p>
          <CodeBlock
            language="txt"
            showLineNumbers={false}
            code={`Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   └── ComboboxCollection
        │       ├── ComboboxItem
        │       └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            └── ComboboxCollection
                ├── ComboboxItem
                └── ComboboxItem`}
          />
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="type-body text-[var(--text-muted)]">
          A simple combobox with a list of frameworks.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxBasicDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks}>
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
</Combobox>`}
        />
      </section>

      {/* Multiple Selection */}
      <section id="multiple" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Multiple</h2>
        <p className="type-body text-[var(--text-muted)]">
          A combobox with multiple selection using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">multiple</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ComboboxChips</code>.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxMultipleDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import * as React from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
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
    </Combobox>
  )
}`}
        />
      </section>

      {/* Clear Button */}
      <section id="clear-button" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Clear Button</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">showClear</code> prop to show a clear button.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxClearDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select framework" showClear />
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

      {/* Groups */}
      <section id="groups" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Groups</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ComboboxGroup</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ComboboxSeparator</code> to group items.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxGroupsDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<ComboboxContent>
  <ComboboxGroup>
    <ComboboxLabel>Frontend Frameworks</ComboboxLabel>
    <ComboboxItem value="next">Next.js</ComboboxItem>
    <ComboboxItem value="nuxt">Nuxt.js</ComboboxItem>
  </ComboboxGroup>
  <ComboboxSeparator />
  <ComboboxGroup>
    <ComboboxLabel>Backend Runtimes</ComboboxLabel>
    <ComboboxItem value="node">Node.js</ComboboxItem>
    <ComboboxItem value="bun">Bun</ComboboxItem>
  </ComboboxGroup>
</ComboboxContent>`}
        />
      </section>

      {/* Custom Items */}
      <section id="custom-items" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Custom Items</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can render a custom component inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ComboboxItem</code>. Use <code className="text-primary font-mono">itemToStringValue</code> when items are objects.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxCustomDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox
  items={users}
  itemToStringValue={(user) => user.name}
>
  <ComboboxInput placeholder="Assign to team member..." />
  <ComboboxContent>
    <ComboboxList>
      {(user) => (
        <ComboboxItem key={user.handle} value={user}>
          <img src={user.avatar} className="size-6 rounded-full" />
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.role}</span>
          </div>
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> prop to make the combobox invalid.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxInvalidDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks}>
  <ComboboxInput aria-invalid={true} placeholder="Select required framework" />
</Combobox>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to disable the combobox.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxDisabledDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks} disabled>
  <ComboboxInput placeholder="Disabled combobox" disabled />
</Combobox>`}
        />
      </section>

      {/* Auto Highlight */}
      <section id="auto-highlight" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Auto Highlight</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">autoHighlight</code> prop to automatically highlight the first item on filter.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxAutoHighlightDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Combobox items={frameworks} autoHighlight>
  <ComboboxInput placeholder="Filter with auto-highlight..." />
</Combobox>`}
        />
      </section>

      {/* Popup */}
      <section id="popup" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Popup</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can trigger the combobox from a button or any other component. Move the <code className="text-primary font-mono">ComboboxInput</code> inside the <code className="text-primary font-mono">ComboboxContent</code>.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxPopupDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Button variant="outline">
  <span>Select framework...</span>
</Button>`}
        />
      </section>

      {/* Input Group */}
      <section id="input-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Input Group</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can add an addon icon or prefix to the combobox input.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxInputGroupDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<div className="relative">
  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5" />
  <ComboboxInput placeholder="Select deployment region..." className="pl-8" />
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, see the RTL configuration guide.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <ComboboxRtlDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<div dir="rtl">
  <Combobox items={["نكست جي اس", "نوفل", "رياكت"]}>
    <ComboboxInput placeholder="ابحث عن إطار عمل..." />
  </Combobox>
</div>`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="type-body text-[var(--text-muted)]">
          See the <a href="https://base-ui.com/react/components/combobox#api-reference" target="_blank" rel="noopener noreferrer" className="text-primary underline">Base UI Combobox</a> documentation for complete prop details.
        </p>

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
                <td className="p-3 font-mono text-[var(--text-main)]">items</td>
                <td className="p-3 font-mono text-indigo-400">Array&lt;T&gt;</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">The array of selectable items or objects.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">multiple</td>
                <td className="p-3 font-mono text-indigo-400">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Whether multiple items can be selected at once.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">autoHighlight</td>
                <td className="p-3 font-mono text-indigo-400">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Automatically highlight the first matching item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">itemToStringValue</td>
                <td className="p-3 font-mono text-indigo-400">(item: T) =&gt; string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Extracts search string when items are objects.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">showClear</td>
                <td className="p-3 font-mono text-indigo-400">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Shows an inline clear button on the input field.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
