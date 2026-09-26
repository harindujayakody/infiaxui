import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null)

export function useContextMenu() {
  const context = React.useContext(ContextMenuContext)
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenu")
  }
  return context
}

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!open) return
    const handleClick = () => setOpen(false)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("click", handleClick)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
      <div className="relative inline-block w-full">{children}</div>
    </ContextMenuContext.Provider>
  )
}

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className, disabled, onContextMenu, children, ...props }, ref) => {
    const { setOpen, setPosition } = useContextMenu()

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      const rect = e.currentTarget.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setOpen(true)
      onContextMenu?.(e)
    }

    return (
      <div
        ref={ref}
        onContextMenu={handleContextMenu}
        className={cn("cursor-context-menu select-none", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

export interface ContextMenuContentProps extends HTMLMotionProps<"div"> {
  side?: "inline-start" | "inline-end"
}

export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, side, children, ...props }, ref) => {
    const { open, position } = useContextMenu()

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            role="menu"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: position.y,
              left: side === "inline-end" ? undefined : position.x,
              right: side === "inline-end" ? 0 : undefined,
            }}
            className={cn(
              "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-2xl outline-none",
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
ContextMenuContent.displayName = "ContextMenuContent"

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  inset?: boolean
  variant?: "default" | "destructive"
}

export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, disabled, inset, variant = "default", children, onClick, ...props }, ref) => {
    const { setOpen } = useContextMenu()

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
ContextMenuItem.displayName = "ContextMenuItem"

export interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(({ className, checked = false, onCheckedChange, disabled, children, onClick, ...props }, ref) => {
  const { setOpen } = useContextMenu()

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
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

interface ContextMenuRadioGroupContextValue {
  value: string
  onValueChange?: (value: string) => void
}

const ContextMenuRadioGroupContext = React.createContext<ContextMenuRadioGroupContextValue | null>(null)

export function ContextMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <ContextMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group">{children}</div>
    </ContextMenuRadioGroupContext.Provider>
  )
}

export interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, value, disabled, children, onClick, ...props }, ref) => {
    const group = React.useContext(ContextMenuRadioGroupContext)
    const { setOpen } = useContextMenu()
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
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

interface ContextMenuSubContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const ContextMenuSubContext = React.createContext<ContextMenuSubContextValue | null>(null)

export function ContextMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <ContextMenuSubContext.Provider value={{ open, setOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </ContextMenuSubContext.Provider>
  )
}

export const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const sub = React.useContext(ContextMenuSubContext)

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
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

export const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, children, ...props }, ref) => {
  const sub = React.useContext(ContextMenuSubContext)

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
ContextMenuSubContent.displayName = "ContextMenuSubContent"

export function ContextMenuLabel({
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

export function ContextMenuSeparator({
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

export function ContextMenuShortcut({
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

export function ContextMenuGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-0.5", className)} {...props} />
}
