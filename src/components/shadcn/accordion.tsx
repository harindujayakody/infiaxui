import React, { useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
  multiple?: boolean
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  multiple?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  children: React.ReactNode
}

export function Accordion({
  type = "single",
  multiple = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = true,
  children,
  className,
  ...props
}: AccordionProps) {
  const isMultiple = multiple || type === "multiple"

  const [internalOpenItems, setInternalOpenItems] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return []
  })

  const isControlled = controlledValue !== undefined
  const openItems = isControlled
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalOpenItems

  const toggleItem = (itemValue: string) => {
    let next: string[]
    if (isMultiple) {
      if (openItems.includes(itemValue)) {
        next = openItems.filter((v) => v !== itemValue)
      } else {
        next = [...openItems, itemValue]
      }
    } else {
      if (openItems.includes(itemValue)) {
        next = collapsible ? [] : openItems
      } else {
        next = [itemValue]
      }
    }

    if (!isControlled) {
      setInternalOpenItems(next)
    }
    onValueChange?.(isMultiple ? next : next[0] || "")
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, multiple: isMultiple }}>
      <div className={cn("w-full divide-y divide-[var(--border-subtle)]", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextType {
  value: string
  disabled?: boolean
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null)

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

export function AccordionItem({
  value,
  disabled = false,
  children,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div
        className={cn(
          "border-b border-[var(--border-subtle)] py-1",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        data-disabled={disabled ? "" : undefined}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AccordionTrigger({
  children,
  className,
  disabled: controlledDisabled,
  onClick,
  ...props
}: AccordionTriggerProps) {
  const context = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!context || !itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem and Accordion")
  }

  const isDisabled = controlledDisabled || itemContext.disabled
  const isOpen = context.openItems.includes(itemContext.value)

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) return
        context.toggleItem(itemContext.value)
        onClick?.(e)
      }}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--text-main)] transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer disabled:cursor-not-allowed disabled:hover:no-underline",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-[var(--text-muted)] transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen && "rotate-180 text-[var(--text-main)]"
        )}
      />
    </button>
  )
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const context = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!context || !itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem and Accordion")
  }

  const isOpen = context.openItems.includes(itemContext.value)

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "pb-4 pt-0 text-xs text-[var(--text-muted)] leading-relaxed",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
