import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<string, string>
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(config)
          .map(([key, itemConfig]) => {
            const color = itemConfig.color
            return color ? `[data-chart=${id}] { --color-${key}: ${color}; }` : ""
          })
          .join("\n"),
      }}
    />
  )
}

export interface ChartTooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  active?: boolean
  payload?: any[]
  label?: string
  content?: React.ReactElement
}

export const ChartTooltip = ({ content, ...props }: ChartTooltipProps) => {
  if (content && React.isValidElement(content)) {
    return React.cloneElement(content as React.ReactElement<any>, props)
  }
  return null
}

export interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "dot" | "line" | "dashed"
  nameKey?: string
  labelKey?: string
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelKey,
      nameKey,
    },
    ref
  ) => {
    const { config } = useChart()

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1.5 text-xs text-[var(--text-main)] shadow-xl",
          className
        )}
      >
        {!hideLabel && label && (
          <div className="font-semibold text-xs text-[var(--text-main)]">{label}</div>
        )}
        <div className="grid gap-1">
          {payload.map((item: any, index: number) => {
            const key = item.dataKey || item.name || "value"
            const itemConfig = config[key]
            const color = item.color || item.fill || (itemConfig ? itemConfig.color : "var(--color-primary)")
            const formattedLabel = itemConfig?.label || item.name || key

            return (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {!hideIndicator && (
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span className="text-[var(--text-muted)] text-[11px]">{formattedLabel}</span>
                </div>
                <span className="font-mono font-bold text-[var(--text-main)] text-[11px]">
                  {item.value?.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export interface ChartLegendProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content?: React.ReactElement
}

export const ChartLegend = ({ content, ...props }: ChartLegendProps) => {
  if (content && React.isValidElement(content)) {
    return React.cloneElement(content as React.ReactElement<any>, props)
  }
  return null
}

export function ChartLegendContent({
  className,
  payload,
}: {
  className?: string
  payload?: any[]
}) {
  const { config } = useChart()

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 pt-3 text-xs", className)}>
      {Object.entries(config).map(([key, item]) => (
        <div key={key} className="flex items-center gap-1.5">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-[var(--text-muted)] text-[11px]">{item.label || key}</span>
        </div>
      ))}
    </div>
  )
}
