import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"

export interface InputOTPProps {
  maxLength?: number
  value?: string
  onChange?: (val: string) => void
  className?: string
}

export function InputOTP({
  maxLength = 6,
  value: controlledVal,
  onChange,
  className,
}: InputOTPProps) {
  const [internalVal, setInternalVal] = useState("123456")
  const isControlled = controlledVal !== undefined
  const val = isControlled ? controlledVal : internalVal

  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, char: string) => {
    const chars = val.padEnd(maxLength, " ").split("")
    chars[index] = char.slice(-1) || " "
    const nextVal = chars.join("").trimEnd()
    if (!isControlled) setInternalVal(nextVal)
    onChange?.(nextVal)

    if (char && index < maxLength - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !val[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: maxLength }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el
          }}
          type="text"
          maxLength={1}
          value={val[idx] || ""}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="size-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center font-mono text-sm font-bold text-[var(--text-main)] shadow-sm focus:border-[var(--text-main)] focus:outline-none transition-colors"
        />
      ))}
    </div>
  )
}
