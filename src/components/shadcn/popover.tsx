import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

export function usePopover() {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a Popover")
  }
  return context
}

interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block text-left">{children}</div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, onClick, children, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopover()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(!open)
      }
    }

    // Combine refs
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref, triggerRef]
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: setRefs,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (children as any).props.onClick?.(e)
          handleClick(e)
        },
        "aria-expanded": open,
        "aria-haspopup": "dialog",
      })
    }

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
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
PopoverTrigger.displayName = "PopoverTrigger"

export interface PopoverContentProps extends HTMLMotionProps<"div"> {
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", side = "bottom", sideOffset = 8, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopover()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    // Close on click outside or escape key
    React.useEffect(() => {
      if (!open) return

      const handleMouseDown = (e: MouseEvent) => {
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

      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [open, setOpen, triggerRef])

    const alignClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }

    const sideClasses = {
      bottom: `top-full mt-2`,
      top: `bottom-full mb-2`,
      left: `right-full mr-2 top-0`,
      right: `left-full ml-2 top-0`,
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
            initial={{ opacity: 0, scale: 0.96, y: side === "bottom" ? 4 : side === "top" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: side === "bottom" ? 4 : side === "top" ? -4 : 0 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute z-50 w-72 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-[var(--text-main)] shadow-xl outline-none",
              sideClasses[side],
              side === "bottom" || side === "top" ? alignClasses[align] : "",
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
PopoverContent.displayName = "PopoverContent"

export function PopoverHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1 text-left mb-3", className)} {...props} />
}

export function PopoverTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("text-sm font-semibold leading-none tracking-tight text-[var(--text-main)]", className)}
      {...props}
    />
  )
}

export function PopoverDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-[var(--text-muted)] leading-relaxed mt-1", className)}
      {...props}
    />
  )
}

export function PopoverClose({
  className,
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = usePopover()

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={cn(
        "absolute top-3 right-3 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors",
        className
      )}
      {...props}
    >
      {children || <X className="size-3.5" />}
    </button>
  )
}
