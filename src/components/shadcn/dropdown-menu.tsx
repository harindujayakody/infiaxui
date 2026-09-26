import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu")
  }
  return context
}

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  render?: React.ReactElement
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, onClick, asChild, render, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdownMenu()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(!open)
      }
    }

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref, triggerRef]
    )

    if (render && React.isValidElement(render)) {
      return React.cloneElement(render as React.ReactElement<any>, {
        ref: setRefs,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (render as any).props.onClick?.(e)
          handleClick(e)
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
        children: (render.props as any)?.children || children,
      })
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRefs,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (children as any).props.onClick?.(e)
          handleClick(e)
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
      })
    }

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

export interface DropdownMenuContentProps extends HTMLMotionProps<"div"> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "start", sideOffset = 4, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdownMenu()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setOpen(false)
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [open, setOpen, triggerRef])

    const alignClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={(node) => {
              contentRef.current = node
              if (typeof ref === "function") ref(node)
              else if (ref) ref.current = node
            }}
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute z-50 mt-1.5 min-w-[12rem] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-2xl outline-none",
              alignClasses[align],
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
)
DropdownMenuContent.displayName = "DropdownMenuContent"

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  inset?: boolean
  variant?: "default" | "destructive"
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, disabled, inset, variant = "default", children, onClick, ...props }, ref) => {
    const { setOpen } = useDropdownMenu()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-[var(--text-main)]",
          inset && "pl-8",
          variant === "destructive" && "text-rose-500 hover:text-rose-400 hover:bg-rose-500/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ className, checked = false, onCheckedChange, disabled, children, onClick, ...props }, ref) => {
  const { setOpen } = useDropdownMenu()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    onCheckedChange?.(!checked)
    if (!e.defaultPrevented) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <Check className="size-3.5 stroke-[2.5]" />}
      </span>
      {children}
    </div>
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

interface DropdownMenuRadioGroupContextValue {
  value: string
  onValueChange?: (value: string) => void
}

const DropdownMenuRadioGroupContext = React.createContext<DropdownMenuRadioGroupContextValue | null>(null)

export function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group">{children}</div>
    </DropdownMenuRadioGroupContext.Provider>
  )
}

export interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ className, value, disabled, children, onClick, ...props }, ref) => {
    const group = React.useContext(DropdownMenuRadioGroupContext)
    const { setOpen } = useDropdownMenu()
    const checked = group?.value === value

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      group?.onValueChange?.(value)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={handleClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-[var(--text-main)]",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center">
          {checked && <Circle className="size-2 fill-current" />}
        </span>
        {children}
      </div>
    )
  }
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

interface DropdownMenuSubContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuSubContext = React.createContext<DropdownMenuSubContextValue | null>(null)

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuSubContext.Provider value={{ open, setOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </DropdownMenuSubContext.Provider>
  )
}

export const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const sub = React.useContext(DropdownMenuSubContext)

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={sub?.open}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-xs outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] data-[state=open]:bg-[var(--bg-subtle)] text-[var(--text-main)]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-3.5 text-[var(--text-muted)]" />
    </div>
  )
})
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

export const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, children, ...props }, ref) => {
  const sub = React.useContext(DropdownMenuSubContext)

  return (
    <AnimatePresence>
      {sub?.open && (
        <motion.div
          ref={ref}
          role="menu"
          initial={{ opacity: 0, x: -6, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -6, scale: 0.96 }}
          transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute left-full top-0 ml-1 z-50 min-w-[10rem] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-2xl",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-[11px] font-semibold text-[var(--text-muted)]",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--border-subtle)]", className)}
      {...props}
    />
  )
}

export function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-[10px] tracking-widest text-[var(--text-muted)] font-mono pl-3",
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-0.5", className)} {...props} />
}
