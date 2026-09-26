import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

export function Checkbox({ checked = false, onCheckedChange, disabled = false, className, id }: CheckboxProps) {
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
      role="checkbox"
      id={id}
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer size-4 shrink-0 rounded border border-[var(--border-subtle)] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-subtle)] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors",
        isChecked ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]" : "bg-[var(--bg-card)]",
        className
      )}
    >
      {isChecked && <Check className="size-3 stroke-[3]" />}
    </button>
  )
}
