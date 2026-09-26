import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function CalendarGuide() {
  const [selectedDay, setSelectedDay] = useState<number>(26)
  const [mode, setMode] = useState<"single" | "range">("single")
  const [rangeStart, setRangeStart] = useState<number>(12)
  const [rangeEnd, setRangeEnd] = useState<number>(20)

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Calendar</code> component is built on top of <a href="https://react-day-picker.js.org" target="_blank" rel="noreferrer" className="underline underline-offset-4 text-[var(--text-main)]">React DayPicker</a> with custom button styling, timezone support, and RTL-aware logical classes.
        </p>
      </section>

      {/* Interactive Calendar Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="type-h2 text-[var(--text-main)]">Interactive Calendar</h2>
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <button
              onClick={() => setMode("single")}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs transition-colors",
                mode === "single" ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)]"
              )}
            >
              Single Date
            </button>
            <button
              onClick={() => setMode("range")}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs transition-colors",
                mode === "range" ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)]"
              )}
            >
              Date Range
            </button>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-xs text-[var(--text-main)]">September 2026</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                <ChevronLeft className="size-3.5" />
              </button>
              <button className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {dayNames.map((d) => (
              <span key={d} className="text-[10px] text-[var(--text-muted)] font-medium">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            <div />
            <div />
            {daysInMonth.map((d) => {
              if (mode === "single") {
                const isSelected = selectedDay === d
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={cn(
                      "size-8 rounded-lg text-xs font-medium flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-[var(--text-main)] text-[var(--bg-page)] shadow-sm font-semibold"
                        : "text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
                    )}
                  >
                    {d}
                  </button>
                )
              } else {
                const isStart = d === rangeStart
                const isEnd = d === rangeEnd
                const inRange = d > rangeStart && d < rangeEnd
                return (
                  <button
                    key={d}
                    onClick={() => {
                      if (d < rangeStart) setRangeStart(d)
                      else setRangeEnd(d)
                    }}
                    className={cn(
                      "size-8 text-xs font-medium flex items-center justify-center transition-colors",
                      (isStart || isEnd) && "rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] font-semibold",
                      inRange && "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 rounded-none",
                      !isStart && !isEnd && !inRange && "rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
                    )}
                  >
                    {d}
                  </button>
                )
              }
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] text-center">
            {mode === "single"
              ? `Selected: September ${selectedDay}, 2026`
              : `Selected Range: Sep ${rangeStart} – Sep ${rangeEnd}, 2026`}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  )
}`}
        />
      </section>

      {/* RTL & Hijri Support */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL & Locale Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pass <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">locale={'{arSA}'}</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">dir="rtl"</code> to render locale-specific calendar numbering.
        </p>

        <CodeBlock
          language="tsx"
          code={`import { arSA } from "react-day-picker/locale"

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>`}
        />
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
                <td className="p-3 font-mono text-[var(--text-main)]">mode</td>
                <td className="p-3 font-mono">"single" | "range" | "multiple"</td>
                <td className="p-3 font-mono">"single"</td>
                <td className="p-3">Selection model mode for picking days</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">timeZone</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">IANA time zone string to prevent SSR hydration offsets</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">showWeekNumber</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Renders an index column with ISO week numbers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
