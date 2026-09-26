import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  ChartDemo,
  ChartExampleGridDemo,
  ChartExampleAxisDemo,
  ChartExampleTooltipDemo,
  ChartExampleLegendDemo,
  ChartRtlDemo,
} from "@/components/shadcn/chart-demo"

export function ChartGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Callout */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 p-4 text-xs text-[var(--text-muted)] space-y-1">
        <span className="font-semibold text-[var(--text-main)]">Updated Architecture:</span>
        <p>
          The <code className="font-mono text-[var(--text-main)]">chart</code> component is built for Recharts v3 compatibility with semantic CSS color variables, reactive tooltips, and legends.
        </p>
      </div>

      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 flex items-center justify-center min-h-[320px]">
          <ChartDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="chart"
        dependencies="recharts"
        sourcePath="components/ui/chart.tsx"
        sourceCode={`import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<string, string>
  }
}

// ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }`}
      />

      {/* Updating to Recharts v3 */}
      <section id="v3" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Updating to Recharts v3</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-xs space-y-2 text-[var(--text-muted)]">
          <ul className="list-disc pl-4 space-y-1.5 font-sans">
            <li>Use <code className="font-mono text-xs">var(--chart-1)</code> instead of <code className="font-mono text-xs">hsl(var(--chart-1))</code> when referencing chart tokens from CSS variables.</li>
            <li>Use <code className="font-mono text-xs">ChartTooltip.defaultIndex</code> for initial tooltip state only.</li>
            <li>Keep a height, <code className="font-mono text-xs">min-h-*</code>, or <code className="font-mono text-xs">aspect-*</code> on <code className="font-mono text-xs">ChartContainer</code> so ResponsiveContainer measures correctly on first render.</li>
          </ul>
        </div>
      </section>

      {/* Your First Chart */}
      <section id="first-chart" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Building Your First Chart</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Define your chart data, configure colors, and assemble your chart container with grid and axis lines.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
} satisfies ChartConfig

export function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
        />
      </section>

      {/* Grid, Axis, Tooltip, Legend */}
      <section id="features" className="scroll-mt-20 space-y-6">
        <h2 className="type-h2 text-[var(--text-main)]">Tooltip & Legend Customization</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[280px]">
          <ChartExampleTooltipDemo />
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[280px]">
          <ChartRtlDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">ChartContainer</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Responsive container injecting CSS variable theme styles.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">config</td>
                <td className="p-3">ChartConfig</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Labels, icons, and color configuration dictionary.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">ChartTooltipContent</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Pre-styled interactive popup overlay for hover inspection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
