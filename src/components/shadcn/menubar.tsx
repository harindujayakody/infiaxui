import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenubarContextValue {
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
  hasActiveMenu: boolean
  menubarRef: React.RefObject<HTMLDivElement | null>
}

const MenubarContext = React.createContext<MenubarContextValue | null>(null)

export function useMenubar() {
  const context = React.useContext(MenubarContext)
  if (!context) {
    throw new Error("useMenubar must be used within a Menubar")
  }
  return context
}

interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, value: controlledValue, defaultValue = null, onValueChange, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue)
    const isControlled = controlledValue !== undefined
    const activeMenu = isControlled ? controlledValue : uncontrolledValue
    const menubarRef = React.useRef<HTMLDivElement | null>(null)

    const setActiveMenu = React.useCallback(
      (nextValue: string | null) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue)
        }
        onValueChange?.(nextValue)
      },
      [isControlled, onValueChange]
    )

    React.useEffect(() => {
      if (!activeMenu) return

      const handleClickOutside = (e: MouseEvent) => {
        if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
          setActiveMenu(null)
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveMenu(null)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [activeMenu, setActiveMenu])

    return (
      <MenubarContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          hasActiveMenu: Boolean(activeMenu),
          menubarRef,
        }}
      >
        <div
          ref={(node) => {
            menubarRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          className={cn(
            "inline-flex h-9 items-center space-x-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 shadow-sm select-none",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    )
  }
)
Menubar.displayName = "Menubar"

// MenubarMenu
interface MenubarMenuContextValue {
  menuId: string
  isOpen: boolean
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const MenubarMenuContext = React.createContext<MenubarMenuContextValue | null>(null)

export function MenubarMenu({
  value,
  children,
}: {
  value?: string
  children: React.ReactNode
}) {
  const generatedId = React.useId()
  const menuId = value || generatedId
  const { activeMenu } = useMenubar()
  const isOpen = activeMenu === menuId
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <MenubarMenuContext.Provider value={{ menuId, isOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </MenubarMenuContext.Provider>
  )
}

// MenubarTrigger
export const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, onMouseEnter, ...props }, ref) => {
  const { activeMenu, setActiveMenu, hasActiveMenu } = useMenubar()
  const menuContext = React.useContext(MenubarMenuContext)

  if (!menuContext) {
    throw new Error("MenubarTrigger must be used within a MenubarMenu")
  }

  const { menuId, isOpen, triggerRef } = menuContext

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (!e.defaultPrevented) {
      setActiveMenu(isOpen ? null : menuId)
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e)
    if (hasActiveMenu && activeMenu !== menuId) {
      setActiveMenu(menuId)
    }
  }

  return (
    <button
      ref={(node) => {
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-md px-3 py-1 text-xs font-medium outline-none transition-colors hover:bg-[var(--bg-subtle)] focus:bg-[var(--bg-subtle)] data-[state=open]:bg-[var(--bg-subtle)] text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

// MenubarContent
export interface MenubarContentProps extends HTMLMotionProps<"div"> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", children, ...props }, ref) => {
    const menuContext = React.useContext(MenubarMenuContext)

    if (!menuContext) {
      throw new Error("MenubarContent must be used within a MenubarMenu")
    }

    const { isOpen } = menuContext

    const alignClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            role="menu"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute top-full mt-1.5 z-50 min-w-[12rem] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 text-[var(--text-main)] shadow-2xl",
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
MenubarContent.displayName = "MenubarContent"

// MenubarItem
export const MenubarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
    inset?: boolean
  }
>(({ className, disabled, inset, children, onClick, ...props }, ref) => {
  const { setActiveMenu } = useMenubar()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    if (!e.defaultPrevented) {
      setActiveMenu(null)
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
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
MenubarItem.displayName = "MenubarItem"

// MenubarCheckboxItem
export const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
  }
>(({ className, checked = false, onCheckedChange, disabled, children, onClick, ...props }, ref) => {
  const { setActiveMenu } = useMenubar()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    onCheckedChange?.(!checked)
    if (!e.defaultPrevented) {
      setActiveMenu(null)
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

// MenubarRadioGroup context
interface MenubarRadioGroupContextValue {
  value: string
  onValueChange?: (value: string) => void
}

const MenubarRadioGroupContext = React.createContext<MenubarRadioGroupContextValue | null>(null)

export function MenubarRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <MenubarRadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group">{children}</div>
    </MenubarRadioGroupContext.Provider>
  )
}

// MenubarRadioItem
export const MenubarRadioItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    disabled?: boolean
  }
>(({ className, value, disabled, children, onClick, ...props }, ref) => {
  const group = React.useContext(MenubarRadioGroupContext)
  const { setActiveMenu } = useMenubar()
  const checked = group?.value === value

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onClick?.(e)
    group?.onValueChange?.(value)
    if (!e.defaultPrevented) {
      setActiveMenu(null)
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
})
MenubarRadioItem.displayName = "MenubarRadioItem"

// MenubarSub context
interface MenubarSubContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenubarSubContext = React.createContext<MenubarSubContextValue | null>(null)

export function MenubarSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <MenubarSubContext.Provider value={{ open, setOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </MenubarSubContext.Provider>
  )
}

// MenubarSubTrigger
export const MenubarSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const sub = React.useContext(MenubarSubContext)

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
MenubarSubTrigger.displayName = "MenubarSubTrigger"

// MenubarSubContent
export const MenubarSubContent = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const sub = React.useContext(MenubarSubContext)

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
  }
)
MenubarSubContent.displayName = "MenubarSubContent"

// MenubarSeparator
export const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("-mx-1 my-1 h-px bg-[var(--border-subtle)]", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

// MenubarLabel
export const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-[11px] font-semibold text-[var(--text-muted)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = "MenubarLabel"

// MenubarShortcut
export function MenubarShortcut({
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

// MenubarGroup
export function MenubarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-0.5", className)} {...props} />
}
