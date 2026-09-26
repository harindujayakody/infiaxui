import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  ArrowRight,
  Globe,
  Sliders,
  Move,
} from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card"
import {
  HoverCardDemo,
  HoverCardSidesDemo,
  HoverCardDelaysDemo,
  HoverCardRtlDemo,
} from "./hover-card-demo"
import { InstallationSection } from "./installation-section"
import { cn } from "@/lib/utils"

export function HoverCardGuide() {
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")

  const manualComponentCode = `import * as React from "react"
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
}`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Interactive Preview Section */}
      <section id="interactive-demo" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Preview</h2>
        <div className="p-8 sm:p-16 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[320px] shadow-sm">
          <HoverCardDemo />
        </div>
      </section>

      {/* Installation */}
      <InstallationSection
        componentName="Hover Card"
        componentSlug="hover-card"
        dependencies="@base-ui/react framer-motion"
        sourceCode={manualComponentCode}
        sourcePath="components/ui/hover-card.tsx"
      />

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>

        <CodeBlock
          code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"`}
          language="tsx"
          fileName="Import"
        />

        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>`}
          language="tsx"
          fileName="Usage Example"
        />
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">HoverCard</code>:
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-1">
          <div>HoverCard</div>
          <div className="pl-4">├── HoverCardTrigger</div>
          <div className="pl-4">└── HoverCardContent</div>
        </div>
      </section>

      {/* Trigger Delays */}
      <section id="trigger-delays" className="scroll-mt-20 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="size-5 text-indigo-500" />
          <h2 className="type-h2 text-[var(--text-main)]">Trigger Delays</h2>
        </div>
        <p className="type-body text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">delay</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">closeDelay</code> on the trigger to control when the card opens and closes.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <HoverCardDelaysDemo />
        </div>

        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>`}
          language="tsx"
          fileName="Delays Example"
        />
      </section>

      {/* Positioning / Sides */}
      <section id="sides" className="scroll-mt-20 space-y-4">
        <div className="flex items-center gap-2">
          <Move className="size-5 text-indigo-500" />
          <h2 className="type-h2 text-[var(--text-main)]">Sides & Placement</h2>
        </div>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">side</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">align</code> props on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">HoverCardContent</code> to control placement.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <HoverCardSidesDemo />
        </div>

        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>`}
          language="tsx"
          fileName="Sides Example"
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-indigo-500" />
          <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        </div>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, the hover card content and alignment automatically flip in right-to-left layout contexts.
        </p>

        <div className="p-8 sm:p-16 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[320px] shadow-sm">
          <HoverCardRtlDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="type-body text-[var(--text-muted)]">
          See the official Base UI documentation for complete API specifications and prop types:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://base-ui.com/react/components/hover-card"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors"
          >
            <span>Base UI Hover Card Docs</span>
            <ExternalLink className="size-3 text-[var(--text-muted)]" />
          </a>
          <a
            href="https://base-ui.com/react/components/hover-card#api-reference"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors"
          >
            <span>API Reference</span>
            <ExternalLink className="size-3 text-[var(--text-muted)]" />
          </a>
        </div>
      </section>
    </div>
  )
}
