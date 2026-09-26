import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DatePickerGuide() {
  const [selectedDay, setSelectedDay] = useState<number | null>(26)
  const [openBasic, setOpenBasic] = useState(false)
  const [rangeStart, setRangeStart] = useState<number | null>(12)
  const [rangeEnd, setRangeEnd] = useState<number | null>(20)
  const [openRange, setOpenRange] = useState(false)
  const [time, setTime] = useState("14:30")
  const [naturalQuery, setNaturalQuery] = useState("next friday at 3pm")

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A date picker is composed using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Popover</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Calendar</code> primitives:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Popover",
            "├── PopoverTrigger (Button with Calendar icon)",
            "└── PopoverContent",
            "    └── Calendar (Single / Range / Multi-month)",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Date Picker</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Single date selection with interactive calendar popover.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[360px]">
          <div className="relative">
            <button
              onClick={() => setOpenBasic(!openBasic)}
              className="w-64 h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center justify-between text-[var(--text-main)] shadow-sm hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <span className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-[var(--text-muted)]" />
                {selectedDay ? `September ${selectedDay}, 2026` : "Pick a date"}
              </span>
            </button>

            <AnimatePresence>
              {openBasic && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl z-50 text-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-xs">September 2026</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                        <ChevronLeft className="size-3.5" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                        <ChevronRight className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {dayNames.map((d) => (
                      <span key={d} className="text-[10px] text-[var(--text-muted)] font-medium">
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty initial cells for Sep 1st Tuesday */}
                    <div />
                    <div />
                    {daysInMonth.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDay(d)
                          setOpenBasic(false)
                        }}
                        className={cn(
                          "size-8 rounded-lg text-xs font-medium flex items-center justify-center transition-colors",
                          selectedDay === d
                            ? "bg-[var(--text-main)] text-[var(--bg-page)]"
                            : "hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 26))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}`}
        />
      </section>

      {/* Date Range Picker */}
      <section id="range-picker" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Date Range Picker</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Select a multi-day span with visual range highlight between start and end bounds.
        </p>

        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[360px]">
          <div className="relative">
            <button
              onClick={() => setOpenRange(!openRange)}
              className="w-72 h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center justify-between text-[var(--text-main)]"
            >
              <span className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-[var(--text-muted)]" />
                {rangeStart && rangeEnd
                  ? `Sep ${rangeStart}, 2026 - Sep ${rangeEnd}, 2026`
                  : "Pick a date range"}
              </span>
            </button>

            <AnimatePresence>
              {openRange && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl z-50 text-xs"
                >
                  <div className="text-xs font-semibold mb-3">September 2026</div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    <div />
                    <div />
                    {daysInMonth.map((d) => {
                      const isStart = d === rangeStart
                      const isEnd = d === rangeEnd
                      const inRange = rangeStart && rangeEnd && d > rangeStart && d < rangeEnd
                      return (
                        <button
                          key={d}
                          onClick={() => {
                            if (!rangeStart || (rangeStart && rangeEnd)) {
                              setRangeStart(d)
                              setRangeEnd(null)
                            } else if (d < rangeStart) {
                              setRangeStart(d)
                            } else {
                              setRangeEnd(d)
                              setOpenRange(false)
                            }
                          }}
                          className={cn(
                            "size-8 text-xs font-medium flex items-center justify-center transition-colors",
                            (isStart || isEnd) && "rounded-lg bg-[var(--text-main)] text-[var(--bg-page)]",
                            inRange && "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 rounded-none",
                            !isStart && !isEnd && !inRange && "rounded-lg hover:bg-[var(--bg-subtle)]"
                          )}
                        >
                          {d}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>`}
        />
      </section>

      {/* Date & Time Picker */}
      <section id="time-picker" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Time Selection</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair calendar date picker with an integrated time input field.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]">Event Timestamp</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center gap-2 text-[var(--text-main)]">
                <CalendarIcon className="size-4 text-[var(--text-muted)]" />
                <span>Sep 26, 2026</span>
              </div>
              <div className="w-28 h-9 px-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs flex items-center gap-1.5 text-[var(--text-main)]">
                <Clock className="size-3.5 text-[var(--text-muted)]" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-transparent text-xs focus:outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<div className="flex items-center gap-2">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="w-[200px] justify-start text-left">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {format(date, "PPP")}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </PopoverContent>
  </Popover>
  <Input type="time" defaultValue="14:30" className="w-32" />
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Calendar navigation arrows and weekday headers mirror properly in RTL mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto text-center space-y-2">
          <span className="text-xs font-semibold text-[var(--text-main)]">
            ٢٦ سبتمبر ٢٠٢٦
          </span>
          <p className="text-xs text-[var(--text-muted)]">
            تدعم المكونات عرض التاريخ والأرقام الشرقية في بيئة RTL.
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
                <td className="p-3 font-mono text-[var(--text-main)]">Calendar.mode</td>
                <td className="p-3 font-mono">"single" | "range" | "multiple"</td>
                <td className="p-3 font-mono">"single"</td>
                <td className="p-3">Selection model mode for picking days</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Calendar.selected</td>
                <td className="p-3 font-mono">Date | DateRange | Date[]</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Current active selection value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Popover.align</td>
                <td className="p-3 font-mono">"start" | "center" | "end"</td>
                <td className="p-3 font-mono">"start"</td>
                <td className="p-3">Dropdown alignment relative to trigger button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
