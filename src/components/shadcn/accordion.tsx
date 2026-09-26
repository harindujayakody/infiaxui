import React, { useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  collapsible?: boolean
  children: React.ReactNode
}

export function Accordion({
  type = "single",
  defaultValue,
  collapsible = true,
  children,
  className,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        if (prev.includes(value)) {
          return collapsible ? [] : prev
        }
        return [value]
      } else {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value)
        }
        return [...prev, value]
      }
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("w-full divide-y divide-[var(--border-subtle)]", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = createContext<{ value: string } | null>(null)

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export function AccordionItem({ value, children, className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b border-[var(--border-subtle)] py-1", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  const context = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!context || !itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem and Accordion")
  }

  const isOpen = context.openItems.includes(itemContext.value)

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(itemContext.value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--text-main)] transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer",
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
