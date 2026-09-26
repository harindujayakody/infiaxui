import React, { createContext, useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CollapsibleContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const CollapsibleContext = createContext<CollapsibleContextType | null>(null)

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const setOpen = (val: boolean) => {
    if (!isControlled) setInternalOpen(val)
    onOpenChange?.(val)
  }

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, setOpen }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleTrigger must be used within Collapsible")

  return (
    <button
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function CollapsibleContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleContent must be used within Collapsible")

  return (
    <AnimatePresence initial={false}>
      {context.open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("pt-2", className)} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
