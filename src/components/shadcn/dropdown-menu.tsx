import React, { useState, useRef, useEffect, createContext, useContext } from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null)

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (val: boolean) => {
    if (!isControlled) setInternalOpen(val)
    onOpenChange?.(val)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function DropdownMenuTrigger({ children, className, onClick, ...props }: DropdownMenuTriggerProps) {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  return (
    <button
      type="button"
      onClick={(e) => {
        context.setOpen(!context.open)
        onClick?.(e)
      }}
      className={cn("cursor-pointer inline-flex items-center", className)}
      aria-expanded={context.open}
      {...props}
    >
      {children}
    </button>
  )
}

export interface DropdownMenuContentProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  align?: "start" | "center" | "end"
}

export function DropdownMenuContent({
  children,
  align = "start",
  className,
  ...props
}: DropdownMenuContentProps) {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

  const alignClass =
    align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"

  return (
    <AnimatePresence>
      {context.open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-xl",
            alignClass,
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  inset?: boolean
}

export function DropdownMenuItem({ children, className, inset, onClick, ...props }: DropdownMenuItemProps) {
  const context = useContext(DropdownMenuContext)

  return (
    <button
      type="button"
      onClick={(e) => {
        context?.setOpen(false)
        onClick?.(e)
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] text-[var(--text-main)]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export interface DropdownMenuCheckboxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function DropdownMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  className,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4 text-[var(--text-main)]" />}
      </span>
      {children}
    </button>
  )
}

export function DropdownMenuLabel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-semibold text-[var(--text-main)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("-mx-1 my-1 h-px bg-[var(--border-subtle)]", className)} {...props} />
  )
}
