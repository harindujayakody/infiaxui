import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { BarChart3, LineChart, TrendingUp, Sparkles, Monitor, Smartphone, Tablet } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ChartGuide() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleSeries, setVisibleSeries] = useState<{ desktop: boolean; mobile: boolean }>({
    desktop: true,
    mobile: true,
  })

  const data = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ]

  const maxVal = 350

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview & Recharts v3 Notice */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Recharts v3 Integration</h2>
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-xs space-y-1.5 leading-relaxed">
          <div className="font-semibold text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
            <Sparkles className="size-4" />
            <span>Updated for Recharts v3</span>
          </div>
          <p className="text-[var(--text-muted)]">
            Built with composable chart primitives: <code className="font-mono text-[var(--text-main)]">&lt;ChartContainer /&gt;</code>, <code className="font-mono text-[var(--text-main)]">&lt;ChartTooltip /&gt;</code>, and <code className="font-mono text-[var(--text-main)]">&lt;ChartLegend /&gt;</code>. Reference CSS tokens directly via <code className="font-mono text-[var(--text-main)]">var(--chart-1)</code> through <code className="font-mono text-[var(--text-main)]">var(--chart-5)</code>.
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="interactive" className="scroll-mt-20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="type-h2 text-[var(--text-main)]">Live Interactive Chart</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Hover over bars/points to inspect tooltip payloads or toggle series visibility.
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <button
              onClick={() => setChartType("bar")}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors flex items-center gap-1",
                chartType === "bar" ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)]"
              )}
            >
              <BarChart3 className="size-3.5" />
              <span>Bar</span>
            </button>
            <button
              onClick={() => setChartType("line")}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors flex items-center gap-1",
                chartType === "line" ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold" : "text-[var(--text-muted)]"
              )}
            >
              <LineChart className="size-3.5" />
              <span>Line</span>
            </button>
          </div>
        </div>

        {/* Chart Frame */}
        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-main)]">
                Visitors by Platform (2026)
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Showing total visitors for the last 6 months
              </p>
            </div>

            {/* Legend Toggles */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() =>
                  setVisibleSeries((prev) => ({ ...prev, desktop: !prev.desktop }))
                }
                className={cn(
                  "flex items-center gap-1.5 transition-opacity",
                  !visibleSeries.desktop && "opacity-40 line-through"
                )}
              >
                <div className="size-2.5 rounded-full bg-indigo-500" />
                <span className="text-[var(--text-muted)]">Desktop</span>
              </button>
              <button
                onClick={() =>
                  setVisibleSeries((prev) => ({ ...prev, mobile: !prev.mobile }))
                }
                className={cn(
                  "flex items-center gap-1.5 transition-opacity",
                  !visibleSeries.mobile && "opacity-40 line-through"
                )}
              >
                <div className="size-2.5 rounded-full bg-emerald-500" />
                <span className="text-[var(--text-muted)]">Mobile</span>
              </button>
            </div>
          </div>

          {/* SVG Visualizer */}
          <div className="relative h-64 w-full">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
              <div className="border-b border-dashed border-[var(--border-subtle)] w-full" />
              <div className="border-b border-dashed border-[var(--border-subtle)] w-full" />
              <div className="border-b border-dashed border-[var(--border-subtle)] w-full" />
              <div className="border-b border-[var(--border-subtle)] w-full" />
            </div>

            {/* Bars/Points Container */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-6 pt-4">
              {data.map((item, idx) => {
                const desktopH = (item.desktop / maxVal) * 180
                const mobileH = (item.mobile / maxVal) * 180
                const isHovered = hoveredIndex === idx

                return (
                  <div
                    key={item.month}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                  >
                    {/* Tooltip Float */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-3 z-30 w-36 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-2.5 shadow-2xl text-[11px] space-y-1 pointer-events-none"
                      >
                        <div className="font-semibold text-xs text-[var(--text-main)]">
                          {item.month} 2026
                        </div>
                        {visibleSeries.desktop && (
                          <div className="flex items-center justify-between text-indigo-500">
                            <span>Desktop</span>
                            <span className="font-mono font-bold">{item.desktop}</span>
                          </div>
                        )}
                        {visibleSeries.mobile && (
                          <div className="flex items-center justify-between text-emerald-500">
                            <span>Mobile</span>
                            <span className="font-mono font-bold">{item.mobile}</span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {chartType === "bar" ? (
                      <div className="flex items-end gap-1.5 w-full justify-center max-w-[48px]">
                        {visibleSeries.desktop && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${desktopH}px` }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                              "w-3 rounded-t-md bg-indigo-500 transition-opacity",
                              isHovered ? "opacity-100" : "opacity-85"
                            )}
                          />
                        )}
                        {visibleSeries.mobile && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${mobileH}px` }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                              "w-3 rounded-t-md bg-emerald-500 transition-opacity",
                              isHovered ? "opacity-100" : "opacity-85"
                            )}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-end h-full">
                        {visibleSeries.desktop && (
                          <div
                            style={{ bottom: `${desktopH + 24}px` }}
                            className="absolute size-3 rounded-full bg-indigo-500 border-2 border-[var(--bg-card)] shadow"
                          />
                        )}
                        {visibleSeries.mobile && (
                          <div
                            style={{ bottom: `${mobileH + 24}px` }}
                            className="absolute size-3 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)] shadow"
                          />
                        )}
                      </div>
                    )}

                    {/* X-Axis Label */}
                    <span className="absolute bottom-0 text-[11px] font-medium text-[var(--text-muted)]">
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
            <TrendingUp className="size-4 text-emerald-500" />
            <span>Trending up by 5.2% this month</span>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

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
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
        />
      </section>

      {/* Theming Section */}
      <section id="theming" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">CSS Variable Theming</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Define semantic colors for up to 5 series in your global CSS stylesheet:
        </p>
        <CodeBlock
          language="css"
          code={`@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Charts, x-axis ticks, and legends flip orientation in right-to-left layout mode.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto text-center space-y-2">
          <div className="text-xs font-semibold text-[var(--text-main)]">
            مخطط حركة الزوار الشهرية
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            محاذاة البيانات والمؤشرات البيانية تلقائياً مع اتجاه النص.
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
                <td className="p-3 font-mono text-[var(--text-main)]">ChartContainer.config</td>
                <td className="p-3 font-mono">ChartConfig</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Color tokens, icons, and label definitions for chart items</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ChartTooltipContent.indicator</td>
                <td className="p-3 font-mono">"dot" | "line" | "dashed"</td>
                <td className="p-3 font-mono">"dot"</td>
                <td className="p-3">Visual indicator swatch displayed next to series values</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ChartTooltipContent.hideLabel</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Hides category header inside tooltip popup</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
