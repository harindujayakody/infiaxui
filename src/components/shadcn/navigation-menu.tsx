import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const navigationMenuTriggerStyle = (className?: string) =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-lg bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] focus:bg-[var(--bg-subtle)] focus:text-[var(--text-main)] focus:outline-none disabled:pointer-events-none disabled:opacity-50",
    className
  )

interface NavigationMenuContextType {
  activeValue: string | null
  setActiveValue: (value: string | null) => void
  direction?: "ltr" | "rtl"
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType>({
  activeValue: null,
  setActiveValue: () => {},
  direction: "ltr",
})

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  direction?: "ltr" | "rtl"
}

export function NavigationMenu({
  className,
  children,
  direction = "ltr",
  ...props
}: NavigationMenuProps) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null)
  const menuRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveValue(null)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <NavigationMenuContext.Provider value={{ activeValue, setActiveValue, direction }}>
      <nav
        ref={menuRef}
        dir={direction}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
}

export function NavigationMenuList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value?: string
}

export function NavigationMenuItem({
  className,
  value,
  children,
  ...props
}: NavigationMenuItemProps) {
  return (
    <li className={cn("relative", className)} {...props}>
      {children}
    </li>
  )
}

interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function NavigationMenuTrigger({
  className,
  children,
  value,
  ...props
}: NavigationMenuTriggerProps) {
  const { activeValue, setActiveValue } = React.useContext(NavigationMenuContext)
  const isOpen = activeValue === value

  return (
    <button
      type="button"
      onClick={() => setActiveValue(isOpen ? null : value)}
      onMouseEnter={() => setActiveValue(value)}
      className={cn(
        navigationMenuTriggerStyle(),
        isOpen && "bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm",
        "gap-1",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "size-3 text-[var(--text-muted)] transition-transform duration-200",
          isOpen && "rotate-180 text-[var(--text-main)]"
        )}
        aria-hidden="true"
      />
    </button>
  )
}

interface NavigationMenuContentProps {
  className?: string
  children?: React.ReactNode
  value: string
}

export function NavigationMenuContent({
  className,
  children,
  value,
}: NavigationMenuContentProps) {
  const { activeValue, direction } = React.useContext(NavigationMenuContext)
  const isOpen = activeValue === value

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-full mt-2 w-auto min-w-[320px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-xl z-50",
            direction === "rtl" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  render?: React.ReactNode
}

export function NavigationMenuLink({
  className,
  render,
  children,
  ...props
}: NavigationMenuLinkProps) {
  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<{ className?: string; children?: React.ReactNode }>, {
      className: cn(navigationMenuTriggerStyle(), className),
      children,
    })
  }

  return (
    <a
      className={cn(
        "block select-none rounded-lg p-3 text-xs leading-none no-underline outline-none transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] focus:bg-[var(--bg-subtle)] focus:text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function NavigationMenuIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-[var(--border-subtle)] shadow-md" />
    </div>
  )
}
