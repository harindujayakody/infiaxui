import React, { useState, useRef, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Settings, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

function PopoverCustom({
  trigger,
  children,
  align = "center",
}: {
  trigger: (open: boolean, toggle: () => void) => React.ReactNode
  children: (close: () => void) => React.ReactNode
  align?: "start" | "center" | "end"
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  return (
    <div ref={ref} className="relative inline-block">
      {trigger(open, () => setOpen(!open))}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute z-50 mt-2 w-72 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl p-4 text-xs text-[var(--text-main)]",
              alignClasses[align]
            )}
          >
            {children(() => setOpen(false))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PopoverGuide() {
  const [width, setWidth] = useState("100%")
  const [maxHeight, setMaxHeight] = useState("300px")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Popover</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Popover</div>
          <div className="pl-4">├── PopoverTrigger</div>
          <div className="pl-4">└── PopoverContent</div>
          <div className="pl-8">├── PopoverHeader</div>
          <div className="pl-12">├── PopoverTitle</div>
          <div className="pl-12">└── PopoverDescription</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A popover displaying title, description, and action content.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <PopoverCustom
            trigger={(open, toggle) => (
              <Button variant="outline" onClick={toggle}>
                <SlidersHorizontal className="size-3.5 mr-1.5" />
                Dimensions
              </Button>
            )}
          >
            {(close) => (
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-xs text-[var(--text-main)]">Dimensions</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Set the dimensions for the layer.</p>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] text-[var(--text-muted)]">Width</label>
                    <Input
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="col-span-2 h-7 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-[11px] text-[var(--text-muted)]">Max H</label>
                    <Input
                      value={maxHeight}
                      onChange={(e) => setMaxHeight(e.target.value)}
                      className="col-span-2 h-7 text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <Button size="sm" className="h-7 text-xs" onClick={close}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </PopoverCustom>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
        />
      </section>

      {/* Align */}
      <section id="align" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Align</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">align</code> prop to align the popover to <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">start</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">center</code>, or <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">end</code>.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4 flex-wrap">
          {(["start", "center", "end"] as const).map((a) => (
            <PopoverCustom
              key={a}
              align={a}
              trigger={(open, toggle) => (
                <Button variant="outline" size="sm" onClick={toggle}>
                  Align {a}
                </Button>
              )}
            >
              {(close) => (
                <div className="space-y-2">
                  <p className="font-semibold">Aligned to {a}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Popover anchored with horizontal alignment "{a}".
                  </p>
                  <Button size="sm" variant="outline" className="w-full h-7 mt-2" onClick={close}>
                    Close
                  </Button>
                </div>
              )}
            </PopoverCustom>
          ))}
        </div>
        <CodeBlock
          language="tsx"
          code={`<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Popover supports RTL layouts with correct start / end alignment flipping.
        </p>
        <div dir="rtl" className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <PopoverCustom
            trigger={(open, toggle) => (
              <Button variant="outline" onClick={toggle}>
                الإعدادات
              </Button>
            )}
          >
            {(close) => (
              <div className="space-y-2 text-right">
                <h4 className="font-semibold text-xs">خيارات المستخدم</h4>
                <p className="text-[11px] text-[var(--text-muted)]">تعديل الإعدادات والتفضيلات الشخصية.</p>
                <Button size="sm" className="w-full h-7" onClick={close}>
                  حفظ
                </Button>
              </div>
            )}
          </PopoverCustom>
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
                <td className="p-3 font-mono text-[var(--text-main)]">align</td>
                <td className="p-3 font-mono">"start" | "center" | "end"</td>
                <td className="p-3 font-mono">"center"</td>
                <td className="p-3">Horizontal anchor alignment</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">side</td>
                <td className="p-3 font-mono">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3 font-mono">"bottom"</td>
                <td className="p-3">Preferred placement edge</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">sideOffset</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4</td>
                <td className="p-3">Distance in pixels from trigger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
