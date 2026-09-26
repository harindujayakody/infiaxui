import React, { useState } from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "value" | "onChange"
  > {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

export function Slider({
  className,
  value: controlledValue,
  defaultValue = [50],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const val = currentValue[0] ?? 50
  const percentage = Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = [Number(e.target.value)]
    if (!isControlled) {
      setInternalValue(newVal)
    }
    onValueChange?.(newVal)
  }

  return (
    <div
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        className
      )}
      {...props}
    >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={handleChange}
        className="absolute inset-0 z-20 w-full opacity-0 cursor-pointer h-6"
      />
      {/* Track */}
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
        {/* Range fill */}
        <div
          className="absolute h-full bg-[var(--text-main)] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Thumb */}
      <div
        className="absolute size-4 rounded-full border border-[var(--border-active)] bg-[var(--bg-card)] shadow transition-all pointer-events-none -translate-x-1/2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ left: `${percentage}%` }}
      />
    </div>
  )
}
