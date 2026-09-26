import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

export function Switch({ checked = false, onCheckedChange, disabled = false, className, id }: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(checked)
  const isChecked = onCheckedChange ? checked : internalChecked

  const toggle = () => {
    if (disabled) return
    if (onCheckedChange) {
      onCheckedChange(!checked)
    } else {
      setInternalChecked(!internalChecked)
    }
  }

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-subtle)] disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-[var(--text-main)]" : "bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-4 bg-[var(--bg-page)]" : "translate-x-0 bg-[var(--text-muted)]"
        )}
      />
    </button>
  )
}
