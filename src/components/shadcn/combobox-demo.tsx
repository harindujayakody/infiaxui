import * as React from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxChipsInput,
} from "@/components/shadcn/combobox"
import { Button } from "@/components/shadcn/button"
import {
  Search,
  Globe,
  Check,
  ChevronsUpDown,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  Cpu,
  User,
} from "lucide-react"

export const FRAMEWORKS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "Gatsby",
  "Angular",
  "Vue.js",
]

export const GROUPED_TECH = [
  {
    group: "Frontend Frameworks",
    items: [
      { label: "Next.js", value: "next", badge: "React" },
      { label: "Nuxt.js", value: "nuxt", badge: "Vue" },
      { label: "SvelteKit", value: "svelte", badge: "Svelte" },
      { label: "Astro", value: "astro", badge: "Multi" },
    ],
  },
  {
    group: "Backend & Runtimes",
    items: [
      { label: "Node.js", value: "node", badge: "V8" },
      { label: "Bun", value: "bun", badge: "Fast" },
      { label: "Deno", value: "deno", badge: "Secure" },
    ],
  },
]

export const USER_ITEMS = [
  { name: "Alex Rivera", handle: "@alex", role: "Frontend Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
  { name: "Sarah Connor", handle: "@sarah", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80" },
  { name: "Marcus Brody", handle: "@marcus", role: "Fullstack Architect", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" },
  { name: "Elena Rostova", handle: "@elena", role: "UI Designer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80" },
]

/**
 * Primary hero interactive demo for Combobox
 */
export function ComboboxDemo() {
  const [selected, setSelected] = React.useState("Next.js")

  return (
    <div className="w-full max-w-sm mx-auto p-6 flex flex-col items-center justify-center space-y-4 select-none">
      <div className="w-full space-y-2">
        <label className="text-xs font-semibold text-[var(--text-main)]">
          Select Framework
        </label>
        <Combobox
          items={FRAMEWORKS}
          value={selected}
          onValueChange={setSelected}
        >
          <ComboboxInput placeholder="Select a framework..." showClear />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  <Code2 className="size-3.5 text-[var(--text-muted)]" />
                  <span>{item}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <div className="w-full p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-xs flex items-center justify-between">
        <span className="text-[var(--text-muted)]">Active Selection:</span>
        <span className="font-mono font-semibold text-primary">
          {selected || "None"}
        </span>
      </div>
    </div>
  )
}

/**
 * Basic Combobox
 */
export function ComboboxBasicDemo() {
  const [selected, setSelected] = React.useState("")

  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <Combobox items={FRAMEWORKS} value={selected} onValueChange={setSelected}>
        <ComboboxInput placeholder="Select framework..." />
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
    </div>
  )
}

/**
 * Multiple Combobox with Chips
 */
export function ComboboxMultipleDemo() {
  const [value, setValue] = React.useState<string[]>(["Next.js", "Astro"])

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-2">
      <label className="text-xs font-medium text-[var(--text-main)]">Target Stacks</label>
      <Combobox
        items={FRAMEWORKS}
        multiple
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips>
          <ComboboxValue>
            {value.map((item) => (
              <ComboboxChip
                key={item}
                onRemove={() => setValue(value.filter((v) => v !== item))}
              >
                {item}
              </ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add framework..." />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No framework matches query.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/**
 * Clear Button Demo
 */
export function ComboboxClearDemo() {
  const [selected, setSelected] = React.useState("Next.js")

  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <Combobox items={FRAMEWORKS} value={selected} onValueChange={setSelected}>
        <ComboboxInput placeholder="Select framework..." showClear />
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
    </div>
  )
}

/**
 * Groups and Separators Demo
 */
export function ComboboxGroupsDemo() {
  const [selected, setSelected] = React.useState("next")
  const allItems = React.useMemo(() => GROUPED_TECH.flatMap((g) => g.items), [])

  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <Combobox
        items={allItems}
        value={selected}
        onValueChange={setSelected}
        itemToStringValue={(i) => i.label}
      >
        <ComboboxInput placeholder="Search stack..." />
        <ComboboxContent>
          <ComboboxEmpty>No technology found.</ComboboxEmpty>
          {GROUPED_TECH.map((g, idx) => (
            <React.Fragment key={g.group}>
              <ComboboxGroup>
                <ComboboxLabel>{g.group}</ComboboxLabel>
                {g.items.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                      {item.badge}
                    </span>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              {idx < GROUPED_TECH.length - 1 && <ComboboxSeparator />}
            </React.Fragment>
          ))}
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/**
 * Custom Items with Avatars
 */
export function ComboboxCustomDemo() {
  const [selectedUser, setSelectedUser] = React.useState<any>(USER_ITEMS[0])

  return (
    <div className="w-full max-w-sm mx-auto p-6">
      <Combobox
        items={USER_ITEMS}
        value={selectedUser}
        onValueChange={setSelectedUser}
        itemToStringValue={(u) => u.name}
      >
        <ComboboxInput placeholder="Assign to team member..." />
        <ComboboxContent>
          <ComboboxEmpty>No member found.</ComboboxEmpty>
          <ComboboxList>
            {(user) => (
              <ComboboxItem key={user.handle} value={user}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-6 rounded-full object-cover border border-[var(--border-subtle)]"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-[var(--text-main)] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {user.role}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/**
 * Invalid State Demo
 */
export function ComboboxInvalidDemo() {
  return (
    <div className="w-full max-w-xs mx-auto p-6 space-y-1.5">
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput aria-invalid={true} placeholder="Select required framework" />
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
      <p className="text-[11px] text-rose-500 font-medium">Please select a valid runtime framework.</p>
    </div>
  )
}

/**
 * Disabled State Demo
 */
export function ComboboxDisabledDemo() {
  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <Combobox items={FRAMEWORKS} disabled>
        <ComboboxInput placeholder="Disabled combobox" disabled />
      </Combobox>
    </div>
  )
}

/**
 * Auto Highlight Demo
 */
export function ComboboxAutoHighlightDemo() {
  const [selected, setSelected] = React.useState("")

  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <Combobox
        items={FRAMEWORKS}
        value={selected}
        onValueChange={setSelected}
        autoHighlight
      >
        <ComboboxInput placeholder="Filter with auto-highlight..." />
        <ComboboxContent>
          <ComboboxEmpty>No items match filter.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/**
 * Popup Triggered by Button Demo
 */
export function ComboboxPopupDemo() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState("Next.js")

  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className="w-48 justify-between text-xs"
        >
          <span className="truncate">{selected || "Select framework..."}</span>
          <ChevronsUpDown className="size-3.5 opacity-50 ml-2" />
        </Button>

        {open && (
          <div className="absolute top-full mt-2 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95">
            <Combobox
              items={FRAMEWORKS}
              value={selected}
              onValueChange={(val) => {
                setSelected(val)
                setOpen(false)
              }}
              open={true}
            >
              <ComboboxInput placeholder="Search framework..." autoFocus />
              <ComboboxContent className="static mt-1 max-h-48 border-0 shadow-none p-0">
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
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Input Group with Addon Demo
 */
export function ComboboxInputGroupDemo() {
  return (
    <div className="w-full max-w-xs mx-auto p-6">
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[var(--text-muted)] pointer-events-none" />
        <Combobox items={["North America", "Europe", "Asia-Pacific", "Latin America"]}>
          <ComboboxInput placeholder="Select deployment region..." className="pl-8" />
          <ComboboxContent>
            <ComboboxEmpty>No regions found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  <Globe className="size-3.5 text-[var(--text-muted)]" />
                  <span>{item}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}

/**
 * RTL Combobox Demo
 */
export function ComboboxRtlDemo() {
  const rtlItems = ["نكست جي اس", "نوفل", "رياكت", "سفيلت كيت", "أسترو"]
  const [selected, setSelected] = React.useState("نكست جي اس")

  return (
    <div dir="rtl" className="w-full max-w-xs mx-auto p-6 space-y-2 select-none">
      <label className="text-xs font-semibold text-[var(--text-main)]">
        اختر إطار العمل
      </label>
      <Combobox items={rtlItems} value={selected} onValueChange={setSelected}>
        <ComboboxInput placeholder="ابحث عن إطار عمل..." showClear />
        <ComboboxContent>
          <ComboboxEmpty>لم يتم العثور على نتائج.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
