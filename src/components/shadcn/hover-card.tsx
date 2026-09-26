import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverCardContextType {
  open: boolean
  setOpen: (open: boolean) => void
  side: "top" | "bottom" | "left" | "right"
  align: "start" | "center" | "end"
  delay: number
  closeDelay: number
  direction?: "ltr" | "rtl"
}

const HoverCardContext = React.createContext<HoverCardContextType>({
  open: false,
  setOpen: () => {},
  side: "bottom",
  align: "center",
  delay: 200,
  closeDelay: 300,
  direction: "ltr",
})

export interface HoverCardProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delay?: number
  closeDelay?: number
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  direction?: "ltr" | "rtl"
}

export function HoverCard({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delay = 200,
  closeDelay = 300,
  side = "bottom",
  align = "center",
  direction = "ltr",
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <HoverCardContext.Provider
      value={{ open, setOpen, side, align, delay, closeDelay, direction }}
    >
      <div className="relative inline-block" dir={direction}>
        {children}
      </div>
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
  delay?: number
  closeDelay?: number
}

export function HoverCardTrigger({
  className,
  children,
  delay: triggerDelay,
  closeDelay: triggerCloseDelay,
  ...props
}: HoverCardTriggerProps) {
  const { setOpen, delay: ctxDelay, closeDelay: ctxCloseDelay } =
    React.useContext(HoverCardContext)
  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const effectiveDelay = triggerDelay ?? ctxDelay
  const effectiveCloseDelay = triggerCloseDelay ?? ctxCloseDelay

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    openTimerRef.current = setTimeout(() => {
      setOpen(true)
    }, effectiveDelay)
  }

  const handleMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, effectiveCloseDelay)
  }

  React.useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block cursor-pointer", className)}
      {...props}
    >
      {children}
    </span>
  )
}

export interface HoverCardContentProps {
  className?: string
  children?: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

export function HoverCardContent({
  className,
  children,
  side: propSide,
  align: propAlign,
}: HoverCardContentProps) {
  const {
    open,
    setOpen,
    side: ctxSide,
    align: ctxAlign,
    closeDelay,
    direction,
  } = React.useContext(HoverCardContext)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const side = propSide ?? ctxSide
  const align = propAlign ?? ctxAlign

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, closeDelay)
  }

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Alignment classes
  const getPositionClasses = () => {
    switch (side) {
      case "top":
        return align === "start"
          ? "bottom-full left-0 mb-2"
          : align === "end"
          ? "bottom-full right-0 mb-2"
          : "bottom-full left-1/2 -translate-x-1/2 mb-2"
      case "left":
        return align === "start"
          ? "right-full top-0 mr-2"
          : align === "end"
          ? "right-full bottom-0 mr-2"
          : "right-full top-1/2 -translate-y-1/2 mr-2"
      case "right":
        return align === "start"
          ? "left-full top-0 ml-2"
          : align === "end"
          ? "left-full bottom-0 ml-2"
          : "left-full top-1/2 -translate-y-1/2 ml-2"
      case "bottom":
      default:
        return align === "start"
          ? "top-full left-0 mt-2"
          : align === "end"
          ? "top-full right-0 mt-2"
          : "top-full left-1/2 -translate-x-1/2 mt-2"
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 4 : side === "bottom" ? -4 : 0, x: side === "left" ? 4 : side === "right" ? -4 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute z-50 w-72 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-[var(--text-main)] shadow-xl outline-none",
            getPositionClasses(),
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
