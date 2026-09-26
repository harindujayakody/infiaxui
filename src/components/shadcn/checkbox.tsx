import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | { target: { checked: boolean } }) => void
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onCheckedChange,
  onChange,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(checked)
  const isChecked = onCheckedChange || onChange ? checked : internalChecked

  const toggle = () => {
    if (disabled) return
    const nextVal = !isChecked
    if (onCheckedChange) {
      onCheckedChange(nextVal)
    } else if (onChange) {
      onChange({ target: { checked: nextVal } })
    } else {
      setInternalChecked(nextVal)
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={indeterminate ? "mixed" : isChecked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer size-4 shrink-0 rounded border border-[var(--border-subtle)] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-subtle)] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer",
        isChecked || indeterminate
          ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]"
          : "bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]",
        className
      )}
    >
      {indeterminate ? (
        <Minus className="size-3 stroke-[3]" />
      ) : isChecked ? (
        <Check className="size-3 stroke-[3]" />
      ) : null}
    </button>
  )
}
