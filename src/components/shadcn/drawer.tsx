import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type DrawerDirection = "top" | "bottom" | "left" | "right" | "up" | "down"

interface DrawerContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  direction: "up" | "down" | "left" | "right"
  showSwipeHandle?: boolean
  modal?: boolean
  snapPoints?: (number | string)[]
  activeSnapPoint?: number | string
  setActiveSnapPoint?: (val: number | string) => void
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

export function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer")
  }
  return context
}

export interface DrawerProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: DrawerDirection
  swipeDirection?: "up" | "down" | "left" | "right"
  showSwipeHandle?: boolean
  modal?: boolean
  snapPoints?: (number | string)[]
  snapPoint?: number | string
  onSnapPointChange?: (val: number | string) => void
  disablePointerDismissal?: boolean
}

export function Drawer({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  direction = "down",
  swipeDirection,
  showSwipeHandle = true,
  modal = true,
  snapPoints,
  snapPoint,
  onSnapPointChange,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const resolvedDirection: "up" | "down" | "left" | "right" =
    swipeDirection || (direction === "top" ? "up" : direction === "bottom" ? "down" : (direction as any))

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
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        direction: resolvedDirection,
        showSwipeHandle,
        modal,
        snapPoints,
        activeSnapPoint: snapPoint,
        setActiveSnapPoint: onSnapPointChange,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  render?: React.ReactElement
}

export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ className, children, onClick, asChild, render, ...props }, ref) => {
    const { open, setOpen } = useDrawer()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(!open)
      }
    }

    if (render && React.isValidElement(render)) {
      return React.cloneElement(render as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (render as any).props.onClick?.(e)
          handleClick(e)
        },
        "aria-expanded": open,
        children: (render.props as any)?.children || children,
      })
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (children as any).props.onClick?.(e)
          handleClick(e)
        },
        "aria-expanded": open,
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
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
DrawerTrigger.displayName = "DrawerTrigger"

export function DrawerPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function DrawerOverlay({ className, ...props }: HTMLMotionProps<"div">) {
  const { open, setOpen } = useDrawer()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]",
            className
          )}
          {...props}
        />
      )}
    </AnimatePresence>
  )
}

export function DrawerSwipeHandle({ className }: { className?: string }) {
  return (
    <div className="mx-auto my-3 h-1.5 w-12 rounded-full bg-[var(--border-subtle)] hover:bg-[var(--text-muted)] transition-colors cursor-grab active:cursor-grabbing" />
  )
}

export interface DrawerContentProps extends HTMLMotionProps<"div"> {
  initialFocus?: boolean
  children?: React.ReactNode
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, initialFocus, ...props }, ref) => {
    const { open, setOpen, direction, showSwipeHandle, modal } = useDrawer()

    React.useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false)
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, setOpen])

    const directionVariants = {
      down: {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        classes: "fixed inset-x-0 bottom-0 z-50 mt-24 max-h-[85vh] rounded-t-[20px] border-t border-[var(--border-subtle)] bg-[var(--bg-card)]",
      },
      up: {
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
        classes: "fixed inset-x-0 top-0 z-50 mb-24 max-h-[85vh] rounded-b-[20px] border-b border-[var(--border-subtle)] bg-[var(--bg-card)]",
      },
      right: {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        classes: "fixed inset-y-0 right-0 z-50 w-full sm:max-w-md border-l border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl",
      },
      left: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
        classes: "fixed inset-y-0 left-0 z-50 w-full sm:max-w-md border-r border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl",
      },
    }

    const currentVariant = directionVariants[direction] || directionVariants.down

    return (
      <>
        {modal && <DrawerOverlay />}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={ref}
              data-swipe-direction={direction}
              data-swipe-axis={direction === "left" || direction === "right" ? "x" : "y"}
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "flex flex-col text-[var(--text-main)] shadow-2xl outline-none overflow-hidden",
                currentVariant.classes,
                className
              )}
              {...props}
            >
              {showSwipeHandle && (direction === "down" || direction === "up") && (
                <DrawerSwipeHandle />
              )}
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5 p-6 text-center sm:text-left", className)} {...props} />
}

export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto flex flex-col gap-2 p-6", className)} {...props} />
}

export function DrawerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold leading-none tracking-tight text-[var(--text-main)]", className)}
      {...props}
    />
  )
}

export function DrawerDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-[var(--text-muted)] leading-relaxed", className)}
      {...props}
    />
  )
}

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  render?: React.ReactElement
}

export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, children, onClick, asChild, render, ...props }, ref) => {
    const { setOpen } = useDrawer()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setOpen(false)
      }
    }

    if (render && React.isValidElement(render)) {
      return React.cloneElement(render as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (render as any).props.onClick?.(e)
          handleClick(e)
        },
        children: (render.props as any)?.children || children,
      })
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (children as any).props.onClick?.(e)
          handleClick(e)
        },
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none",
          className
        )}
        {...props}
      >
        {children || <X className="size-4" />}
      </button>
    )
  }
)
DrawerClose.displayName = "DrawerClose"
