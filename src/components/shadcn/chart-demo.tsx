import * as React from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/shadcn/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartDemo() {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null)
  const maxVal = 320

  return (
    <div className="w-full max-w-lg space-y-3">
      <ChartContainer config={chartConfig} className="min-h-[260px] w-full flex-col justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        {/* Chart Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[var(--border-subtle)]/50">
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-main)]">User Traffic Analysis</h4>
            <p className="text-[11px] text-[var(--text-muted)]">Desktop vs. Mobile Monthly Growth</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-[#2563eb]" />
              <span className="text-[var(--text-muted)]">Desktop</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-[#60a5fa]" />
              <span className="text-[var(--text-muted)]">Mobile</span>
            </span>
          </div>
        </div>

        {/* Visual Chart Bars with Grid Lines */}
        <div className="relative h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full border-b border-dashed border-[var(--text-muted)]" />
            <div className="w-full border-b border-dashed border-[var(--text-muted)]" />
            <div className="w-full border-b border-dashed border-[var(--text-muted)]" />
          </div>

          {chartData.map((d, i) => {
            const isHovered = hoveredIdx === i
            const desktopHeight = (d.desktop / maxVal) * 100
            const mobileHeight = (d.mobile / maxVal) * 100

            return (
              <div
                key={d.month}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                {/* Tooltip Overlay */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] p-2 shadow-2xl text-[10px] space-y-0.5 animate-in fade-in zoom-in-95">
                    <div className="font-bold text-[var(--text-main)]">{d.month}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">Desktop: <strong>{d.desktop}</strong></span>
                      <span className="text-blue-300">Mobile: <strong>{d.mobile}</strong></span>
                    </div>
                  </div>
                )}

                {/* Bars */}
                <div className="w-full flex items-end justify-center gap-1 h-full z-10">
                  <div
                    style={{ height: `${desktopHeight}%` }}
                    className="w-full max-w-[14px] bg-[#2563eb] rounded-t transition-all hover:brightness-110"
                  />
                  <div
                    style={{ height: `${mobileHeight}%` }}
                    className="w-full max-w-[14px] bg-[#60a5fa] rounded-t transition-all hover:brightness-110"
                  />
                </div>

                {/* X Axis Label */}
                <span className="mt-2 text-[10px] text-[var(--text-muted)] font-mono">
                  {d.month.slice(0, 3)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Legend Footer */}
        <ChartLegendContent />
      </ChartContainer>
    </div>
  )
}

export function ChartExampleGridDemo() {
  return <ChartDemo />
}

export function ChartExampleAxisDemo() {
  return <ChartDemo />
}

export function ChartExampleTooltipDemo() {
  return <ChartDemo />
}

export function ChartExampleLegendDemo() {
  return <ChartDemo />
}

export function ChartRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center p-4">
      <ChartDemo />
    </div>
  )
}
