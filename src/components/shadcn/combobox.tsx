import * as React from "react"
import { Check, ChevronsUpDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types & Context
// ---------------------------------------------------------------------------

export interface ComboboxContextType<T = any> {
  open: boolean
  setOpen: (open: boolean) => void
  query: string
  setQuery: (query: string) => void
  selectedValue: any
  setSelectedValue: (val: any) => void
  multiple: boolean
  items: T[]
  itemToStringValue?: (item: T) => string
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  autoHighlight?: boolean
  disabled?: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
}

const ComboboxContext = React.createContext<ComboboxContextType | null>(null)

export function useCombobox<T = any>() {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error("useCombobox must be used within a Combobox provider")
  }
  return context as ComboboxContextType<T>
}

// ---------------------------------------------------------------------------
// Combobox Root
// ---------------------------------------------------------------------------

export interface ComboboxProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  items?: T[]
  value?: any
  defaultValue?: any
  onValueChange?: (value: any) => void
  multiple?: boolean
  autoHighlight?: boolean
  disabled?: boolean
  itemToStringValue?: (item: T) => string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Combobox<T = any>({
  items = [],
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  autoHighlight = false,
  disabled = false,
  itemToStringValue,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: ComboboxProps<T>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlledOpen = controlledOpen !== undefined
  const open = isControlledOpen ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) return
      if (!isControlledOpen) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [disabled, isControlledOpen, onOpenChange]
  )

  const [uncontrolledValue, setUncontrolledValue] = React.useState<any>(
    defaultValue !== undefined ? defaultValue : multiple ? [] : undefined
  )
  const isControlledValue = controlledValue !== undefined
  const selectedValue = isControlledValue ? controlledValue : uncontrolledValue

  const setSelectedValue = React.useCallback(
    (nextVal: any) => {
      if (disabled) return
      if (!isControlledValue) setUncontrolledValue(nextVal)
      onValueChange?.(nextVal)
    },
    [disabled, isControlledValue, onValueChange]
  )

  const [query, setQuery] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  return (
    <ComboboxContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
        selectedValue,
        setSelectedValue,
        multiple,
        items,
        itemToStringValue,
        highlightedIndex,
        setHighlightedIndex,
        autoHighlight,
        disabled,
        inputRef,
      }}
    >
      <div
        ref={containerRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ComboboxContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Combobox Input
// ---------------------------------------------------------------------------

export interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showClear?: boolean
  onClear?: () => void
}

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ className, placeholder = "Select option...", showClear = false, onClear, disabled: inputDisabled, ...props }, ref) => {
    const {
      open,
      setOpen,
      query,
      setQuery,
      selectedValue,
      setSelectedValue,
      multiple,
      items,
      itemToStringValue,
      disabled: contextDisabled,
      inputRef,
    } = useCombobox()

    const isDisabled = inputDisabled || contextDisabled

    // Display label
    const displayValue = React.useMemo(() => {
      if (open) return query
      if (multiple) return query
      if (!selectedValue) return ""
      if (typeof selectedValue === "string") return selectedValue
      if (itemToStringValue && typeof selectedValue === "object") {
        return itemToStringValue(selectedValue)
      }
      return selectedValue?.label || selectedValue?.name || String(selectedValue)
    }, [open, query, multiple, selectedValue, itemToStringValue])

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setQuery("")
      setSelectedValue(multiple ? [] : undefined)
      onClear?.()
    }

    return (
      <div
        onClick={() => {
          if (!isDisabled) {
            setOpen(true)
            inputRef.current?.focus()
          }
        }}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-3 py-1 text-xs text-[var(--text-main)] shadow-sm transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary cursor-pointer",
          isDisabled && "cursor-not-allowed opacity-50 bg-[var(--bg-subtle)]/50",
          props["aria-invalid"] && "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500",
          className
        )}
      >
        <input
          ref={(node) => {
            (inputRef as any).current = node
            if (typeof ref === "function") ref(node)
            else if (ref) (ref as any).current = node
          }}
          disabled={isDisabled}
          placeholder={placeholder}
          value={open ? query : displayValue}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!open) setOpen(true)
          }}
          onFocus={() => {
            if (!isDisabled) setOpen(true)
          }}
          className="w-full bg-transparent outline-none placeholder:text-[var(--text-muted)] cursor-inherit"
          {...props}
        />
        <div className="flex items-center gap-1.5 ml-2 text-[var(--text-muted)] shrink-0">
          {showClear && ((multiple && selectedValue?.length > 0) || (!multiple && selectedValue) || query) && (
            <button
              type="button"
              onClick={handleClear}
              className="hover:text-[var(--text-main)] p-0.5 rounded transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
          <ChevronsUpDown className="size-3.5 opacity-60" />
        </div>
      </div>
    )
  }
)
ComboboxInput.displayName = "ComboboxInput"

// ---------------------------------------------------------------------------
// Combobox Content (Popover Dropdown)
// ---------------------------------------------------------------------------

export interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
}

export function ComboboxContent({
  className,
  align = "start",
  children,
  ...props
}: ComboboxContentProps) {
  const { open } = useCombobox()

  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-1.5 max-h-60 w-full min-w-[180px] overflow-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-xl animate-in fade-in-0 zoom-in-95 duration-100",
        align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Combobox List & Empty
// ---------------------------------------------------------------------------

export interface ComboboxListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode | ((item: any) => React.ReactNode)
}

export function ComboboxList({ className, children, ...props }: ComboboxListProps) {
  const { items, query, itemToStringValue } = useCombobox()

  const filteredItems = React.useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter((item) => {
      const str = itemToStringValue ? itemToStringValue(item) : typeof item === "string" ? item : item?.label || ""
      return str.toLowerCase().includes(q)
    })
  }, [items, query, itemToStringValue])

  return (
    <div className={cn("space-y-0.5", className)} {...props}>
      {typeof children === "function" ? filteredItems.map(children) : children}
    </div>
  )
}

export function ComboboxEmpty({ className, children = "No results found.", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { items, query, itemToStringValue } = useCombobox()

  const hasMatches = React.useMemo(() => {
    if (!query) return items.length > 0
    const q = query.toLowerCase()
    return items.some((item) => {
      const str = itemToStringValue ? itemToStringValue(item) : typeof item === "string" ? item : item?.label || ""
      return str.toLowerCase().includes(q)
    })
  }, [items, query, itemToStringValue])

  if (hasMatches) return null

  return (
    <div
      className={cn("py-6 text-center text-xs text-[var(--text-muted)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Combobox Item
// ---------------------------------------------------------------------------

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any
  disabled?: boolean
}

export function ComboboxItem({
  className,
  value,
  disabled = false,
  children,
  ...props
}: ComboboxItemProps) {
  const { selectedValue, setSelectedValue, multiple, setOpen, setQuery } = useCombobox()

  const isSelected = React.useMemo(() => {
    if (multiple) {
      if (!Array.isArray(selectedValue)) return false
      return selectedValue.some((item) => {
        if (typeof item === "object" && typeof value === "object") {
          return (item.value || item.id) === (value.value || value.id)
        }
        return item === value
      })
    }
    if (typeof selectedValue === "object" && typeof value === "object") {
      return (selectedValue.value || selectedValue.id) === (value.value || value.id)
    }
    return selectedValue === value
  }, [selectedValue, value, multiple])

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return

    if (multiple) {
      const current = Array.isArray(selectedValue) ? selectedValue : []
      if (isSelected) {
        setSelectedValue(current.filter((item) => {
          if (typeof item === "object" && typeof value === "object") {
            return (item.value || item.id) !== (value.value || value.id)
          }
          return item !== value
        }))
      } else {
        setSelectedValue([...current, value])
      }
      setQuery("")
    } else {
      setSelectedValue(value)
      setQuery("")
      setOpen(false)
    }
  }

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-main)] outline-none transition-colors hover:bg-[var(--bg-subtle)]",
        isSelected && "bg-[var(--bg-subtle)] font-medium",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 truncate">
        {children || (typeof value === "string" ? value : value?.label || String(value))}
      </div>
      {isSelected && (
        <Check className="size-3.5 text-primary shrink-0 ml-2" />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Combobox Groups, Labels & Separators
// ---------------------------------------------------------------------------

export function ComboboxGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("py-1", className)} {...props}>
      {children}
    </div>
  )
}

export function ComboboxLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] tracking-wider uppercase", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ComboboxCollection({ children }: { children: React.ReactNode }) {
  return <div className="space-y-0.5">{children}</div>
}

export function ComboboxSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("my-1 h-[1px] bg-[var(--border-subtle)]", className)} {...props} />
  )
}

// ---------------------------------------------------------------------------
// Combobox Chips (Multi-Select Tags)
// ---------------------------------------------------------------------------

export function ComboboxChips({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setOpen, disabled, inputRef } = useCombobox()

  return (
    <div
      onClick={() => {
        if (!disabled) {
          setOpen(true)
          inputRef.current?.focus()
        }
      }}
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] p-1.5 text-xs text-[var(--text-main)] shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary cursor-text",
        disabled && "cursor-not-allowed opacity-50 bg-[var(--bg-subtle)]/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ComboboxValue({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} {...props}>
      {children}
    </div>
  )
}

export interface ComboboxChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void
}

export function ComboboxChip({ className, onRemove, children, ...props }: ComboboxChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--text-main)] animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-0.5"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}

export const ComboboxChipsInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, placeholder = "Add item...", ...props }, ref) => {
    const { query, setQuery, setOpen, disabled, inputRef } = useCombobox()

    return (
      <input
        ref={(node) => {
          (inputRef as any).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as any).current = node
        }}
        disabled={disabled}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-[100px] bg-transparent outline-none text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)]",
          className
        )}
        {...props}
      />
    )
  }
)
ComboboxChipsInput.displayName = "ComboboxChipsInput"
