import React, { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  onValueChange?: (val: string) => void
  className?: string
}

export function Select({
  options,
  value: controlledVal,
  defaultValue,
  placeholder = "Select an option...",
  onValueChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalVal, setInternalVal] = useState(defaultValue || "")
  const isControlled = controlledVal !== undefined
  const currentVal = isControlled ? controlledVal : internalVal

  const selectedOption = options.find((opt) => opt.value === currentVal)

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalVal(val)
    onValueChange?.(val)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative w-full max-w-xs", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-full items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2 text-xs text-[var(--text-main)] shadow-sm focus:outline-none focus:border-[var(--text-main)] transition-colors"
      >
        <span className={!selectedOption ? "text-[var(--text-muted)]" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-[var(--text-muted)] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 shadow-lg animate-in fade-in-0 zoom-in-95 duration-150">
            {options.map((opt) => {
              const isSelected = opt.value === currentVal
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-xs rounded-md cursor-pointer transition-colors",
                    isSelected
                      ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/50 hover:text-[var(--text-main)]"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="size-3.5 text-[var(--text-main)]" />}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
