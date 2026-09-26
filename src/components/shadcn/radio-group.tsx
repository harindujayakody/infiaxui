import React, { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextType {
  value: string
  onChange: (val: string) => void
  name?: string
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  children: React.ReactNode
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  name,
  children,
  className,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onValueChange?.(val)
  }

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <div className={cn("grid gap-2.5", className)} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  id?: string
}

export function RadioGroupItem({
  value,
  id,
  className,
  ...props
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext)
  if (!context) throw new Error("RadioGroupItem must be used within RadioGroup")

  const isChecked = context.value === value

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      id={id}
      onClick={() => context.onChange(value)}
      className={cn(
        "aspect-square size-4 rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors",
        isChecked ? "border-[var(--text-main)] bg-[var(--bg-card)]" : "bg-transparent",
        className
      )}
      {...props}
    >
      {isChecked && (
        <span className="size-2 rounded-full bg-[var(--text-main)] animate-in zoom-in-75 duration-150" />
      )}
    </button>
  )
}
