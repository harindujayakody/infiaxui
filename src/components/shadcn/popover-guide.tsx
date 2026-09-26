import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  PopoverDemo,
  PopoverBasicDemo,
  PopoverAlignDemo,
  PopoverFormDemo,
  PopoverRtlDemo,
} from "@/components/shadcn/popover-demo"

export function PopoverGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <PopoverDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="popover"
        dependencies="@base-ui/react framer-motion lucide-react"
        sourcePath="components/ui/popover.tsx"
        sourceCode={`import * as React from "react"
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
  if (!context) throw new Error("usePopover must be used within a Popover")
  return context
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen)
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

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, onClick, children, asChild, ...props }, ref) => {
  const { open, setOpen, triggerRef } = usePopover()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (!e.defaultPrevented) setOpen(!open)
  }

  const setRefs = (node: HTMLButtonElement | null) => {
    triggerRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }

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
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    align?: "start" | "center" | "end"
    side?: "top" | "bottom" | "left" | "right"
  }
>(({ className, align = "center", side = "bottom", children, ...props }, ref) => {
  const { open, setOpen, triggerRef } = usePopover()
  const contentRef = React.useRef<HTMLDivElement | null>(null)

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
      if (e.key === "Escape") setOpen(false)
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
    bottom: "top-full mt-2",
    top: "bottom-full mb-2",
    left: "right-full mr-2 top-0",
    right: "left-full ml-2 top-0",
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
            "absolute z-50 w-72 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl outline-none",
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
})
PopoverContent.displayName = "PopoverContent"

export function PopoverHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1 text-left mb-3", className)} {...props} />
}

export function PopoverTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("text-sm font-semibold leading-none text-foreground", className)} {...props} />
}

export function PopoverDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground leading-relaxed mt-1", className)} {...props} />
}

export function PopoverClose({ className, children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = usePopover()
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={cn("absolute top-3 right-3 rounded-md p-1 text-muted-foreground hover:text-foreground", className)}
      {...props}
    >
      {children || <X className="size-3.5" />}
    </button>
  )
}`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
    <div className="grid gap-2">
      {/* Content here */}
    </div>
  </PopoverContent>
</Popover>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Popover</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Popover</div>
          <div className="pl-4">├── PopoverTrigger</div>
          <div className="pl-4">└── PopoverContent</div>
          <div className="pl-8">├── PopoverHeader</div>
          <div className="pl-12">├── PopoverTitle</div>
          <div className="pl-12">└── PopoverDescription</div>
        </div>
      </section>

      {/* Examples: Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A popover displaying title, description, and action content with an optional close button.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <PopoverBasicDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"

export function PopoverBasicDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverClose />
        <PopoverHeader>
          <PopoverTitle>Quick Settings</PopoverTitle>
          <PopoverDescription>
            Manage notification preferences and display modes.
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 pt-2">
          {/* Settings contents */}
        </div>
      </PopoverContent>
    </Popover>
  )
}`}
        />
      </section>

      {/* Examples: Align */}
      <section id="align" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Align</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">align</code> prop on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">PopoverContent</code> to align with the <code className="font-mono text-xs">start</code>, <code className="font-mono text-xs">center</code>, or <code className="font-mono text-xs">end</code> of the trigger.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <PopoverAlignDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align Start</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverTitle>Aligned to start</PopoverTitle>
  </PopoverContent>
</Popover>`}
        />
      </section>

      {/* Examples: With Form */}
      <section id="with-form" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Form</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can render interactive forms and inputs directly inside the popover overlay.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[260px]">
          <PopoverFormDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverFormDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Subscribe</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Newsletter</PopoverTitle>
          <PopoverDescription>
            Get updates on new components and releases.
          </PopoverDescription>
        </PopoverHeader>
        <form className="space-y-3 pt-1">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="name@company.com" required />
          <Button type="submit" size="sm" className="w-full">
            Join waitlist
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}`}
        />
      </section>

      {/* Examples: RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Popovers support right-to-left layout direction out of the box.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <PopoverRtlDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`<div dir="rtl">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">الإشعارات</Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      <PopoverTitle>مركز الإشعارات</PopoverTitle>
    </PopoverContent>
  </Popover>
</div>`}
        />
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">Popover</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">The root container managing open/closed state.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">PopoverTrigger</td>
                <td className="p-3">HTMLButtonElement</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">The element that toggles the popover. Supports <code className="text-xs font-mono">asChild</code>.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">PopoverContent.align</td>
                <td className="p-3">"start" | "center" | "end"</td>
                <td className="p-3">"center"</td>
                <td className="p-3 font-sans">Horizontal alignment relative to trigger.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">PopoverContent.side</td>
                <td className="p-3">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3">"bottom"</td>
                <td className="p-3 font-sans">Placement edge of the popover content.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
