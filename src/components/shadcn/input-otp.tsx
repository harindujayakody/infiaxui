import * as React from "react"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

export const REGEXP_ONLY_DIGITS = "^[0-9]+$"
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$"
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$"

interface OTPContextValue {
  value: string
  onChange: (val: string) => void
  maxLength: number
  pattern?: string
  disabled?: boolean
  activeIndex: number
  setActiveIndex: (idx: number) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

const OTPContext = React.createContext<OTPContextValue | null>(null)

export function useOTP() {
  const context = React.useContext(OTPContext)
  if (!context) {
    throw new Error("InputOTP components must be used within an InputOTP")
  }
  return context
}

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  maxLength?: number
  value?: string
  defaultValue?: string
  onChange?: (val: string) => void
  pattern?: string
  disabled?: boolean
  containerClassName?: string
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      maxLength = 6,
      value: controlledValue,
      defaultValue = "",
      onChange,
      pattern = REGEXP_ONLY_DIGITS,
      disabled = false,
      containerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue
    const [activeIndex, setActiveIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const handleValueChange = (newVal: string) => {
      const sanitized = newVal.slice(0, maxLength)
      if (!isControlled) {
        setUncontrolledValue(sanitized)
      }
      onChange?.(sanitized)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(maxLength - 1, prev + 1))
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetVal = e.target.value
      if (pattern && targetVal) {
        const regex = new RegExp(pattern)
        if (!regex.test(targetVal)) return
      }
      handleValueChange(targetVal)
    }

    const defaultRender = !children

    return (
      <OTPContext.Provider
        value={{
          value,
          onChange: handleValueChange,
          maxLength,
          pattern,
          disabled,
          activeIndex: Math.min(value.length, maxLength - 1),
          setActiveIndex,
          inputRef,
        }}
      >
        <div
          className={cn("relative inline-flex items-center select-none gap-2", containerClassName)}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Hidden real input capturing keystrokes and copy-paste */}
          <input
            ref={(node) => {
              inputRef.current = node
              if (typeof ref === "function") ref(node)
              else if (ref) ref.current = node
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={pattern}
            maxLength={maxLength}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 size-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          {defaultRender ? (
            <div className={cn("flex items-center gap-2", className)} {...props}>
              <InputOTPGroup>
                {Array.from({ length: 3 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {Array.from({ length: maxLength - 3 }).map((_, i) => (
                  <InputOTPSlot key={i + 3} index={i + 3} />
                ))}
              </InputOTPGroup>
            </div>
          ) : (
            <div className={cn("flex items-center gap-2", className)} {...props}>
              {children}
            </div>
          )}
        </div>
      </OTPContext.Provider>
    )
  }
)
InputOTP.displayName = "InputOTP"

export const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center -space-x-px", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, activeIndex, disabled } = useOTP()
    const char = value[index]
    const isActive = activeIndex === index

    return (
      <div
        ref={ref}
        data-active={isActive}
        className={cn(
          "relative flex size-10 items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-card)] font-mono text-sm font-semibold text-[var(--text-main)] shadow-sm transition-all first:rounded-l-lg last:rounded-r-lg hover:border-[var(--text-muted)]",
          isActive && "z-10 ring-2 ring-[var(--focus-ring)] border-[var(--text-main)]",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {char ? (
          <span>{char}</span>
        ) : (
          isActive && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-px animate-caret-blink bg-[var(--text-main)] duration-1000" />
            </div>
          )
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

export const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center justify-center text-[var(--text-muted)] px-1", className)}
    {...props}
  >
    <Dot className="size-6 stroke-[3]" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"
