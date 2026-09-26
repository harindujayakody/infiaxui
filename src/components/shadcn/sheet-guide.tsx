import React, { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion, TargetAndTransition } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { CodeBlock } from '@/components/ui/code-block'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Sheet primitive — built from scratch
// ---------------------------------------------------------------------------

type Side = 'top' | 'right' | 'bottom' | 'left'

interface SheetContextValue {
  open: boolean
  setOpen: (v: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheet(): SheetContextValue {
  const ctx = useContext(SheetContext)
  if (!ctx) throw new Error('Sheet components must be used inside <Sheet>')
  return ctx
}

function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSheet()
  return (
    <span onClick={() => setOpen(true)} style={{ display: 'contents' }}>
      {children}
    </span>
  )
}

const sideVariants: Record<Side, { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }> = {
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit:    { x: '100%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit:    { x: '-100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit:    { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit:    { y: '100%' },
  },
}

const panelPositionClass: Record<Side, string> = {
  right:  'inset-y-0 right-0 h-full w-80 max-w-full',
  left:   'inset-y-0 left-0 h-full w-80 max-w-full',
  top:    'inset-x-0 top-0 w-full',
  bottom: 'inset-x-0 bottom-0 w-full',
}

interface SheetContentProps {
  side?: Side
  children: React.ReactNode
  showCloseButton?: boolean
}

function SheetContent({ side = 'right', children, showCloseButton = true }: SheetContentProps) {
  const { open, setOpen } = useSheet()
  const variants = sideVariants[side]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sheet-backdrop"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            key="sheet-panel"
            className={cn(
              'fixed z-50 flex flex-col',
              'bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl',
              panelPositionClass[side],
            )}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {showCloseButton && (
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Close sheet"
              >
                <X size={16} />
              </button>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1 px-6 pt-6 pb-4">{children}</div>
}

function SheetTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-[var(--text-main)] leading-tight">
      {children}
    </h3>
  )
}

function SheetDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[var(--text-muted)]">{children}</p>
  )
}

function SheetFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border-subtle)]">
      {children}
    </div>
  )
}

function SheetClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSheet()
  return (
    <span onClick={() => setOpen(false)} style={{ display: 'contents' }}>
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="type-h2 text-[var(--text-main)]">{title}</h2>
        {description && (
          <p className="text-sm text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Demo({ children, className, dir }: { children: React.ReactNode; className?: string; dir?: string }) {
  return (
    <div
      dir={dir}
      className={cn(
        'p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// API table
// ---------------------------------------------------------------------------

interface ApiRow {
  prop: string
  type: string
  default: string
  description: string
}

function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium text-[var(--text-muted)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <td className="px-4 py-3 font-mono text-[var(--text-main)]">{r.prop}</td>
              <td className="px-4 py-3 font-mono text-[var(--accent)]">{r.type}</td>
              <td className="px-4 py-3 font-mono text-[var(--text-muted)]">{r.default}</td>
              <td className="px-4 py-3 text-[var(--text-muted)]">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Composition code
// ---------------------------------------------------------------------------

const compositionCode = `<Sheet>
  <SheetTrigger>
    <Button>Open</Button>
  </SheetTrigger>

  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description text</SheetDescription>
    </SheetHeader>

    {/* Your content here */}

    <SheetFooter>
      <SheetClose>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`

// ---------------------------------------------------------------------------
// Guide
// ---------------------------------------------------------------------------

export function SheetGuide() {
  // Basic section form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Side demo — 4 separate Sheet states (not using compound Sheet to avoid nesting conflicts)
  const [sideOpen, setSideOpen] = useState<Side | null>(null)

  return (
    <div className="flex flex-col gap-16 py-8">

      {/* ------------------------------------------------------------------ */}
      {/* Basic                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="basic"
        title="Basic"
        description="Open a sheet from the right with a simple form inside."
      >
        <Demo className="flex items-center justify-center">
          <Sheet>
            <SheetTrigger>
              <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when done.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 px-6 py-2 flex-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--text-main)]">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--text-main)]">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button>Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Composition                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="composition"
        title="Composition"
        description="The Sheet is built from composable primitives."
      >
        <Demo>
          <CodeBlock code={compositionCode} language="tsx" />
        </Demo>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Side                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="side"
        title="Side"
        description="Sheets can slide in from any of the four sides."
      >
        <Demo className="flex flex-wrap items-center justify-center gap-3">
          {(['top', 'right', 'bottom', 'left'] as Side[]).map((side) => (
            <Button key={side} variant="outline" onClick={() => setSideOpen(side)}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          ))}
        </Demo>

        {/* Shared backdrop + panel rendered outside the Demo */}
        <AnimatePresence>
          {sideOpen && (
            <>
              <motion.div
                key="side-backdrop"
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSideOpen(null)}
              />
              <motion.div
                key="side-panel"
                className={cn(
                  'fixed z-50 flex flex-col',
                  'bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl',
                  panelPositionClass[sideOpen],
                )}
                initial={sideVariants[sideOpen].initial}
                animate={sideVariants[sideOpen].animate}
                exit={sideVariants[sideOpen].exit}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setSideOpen(null)}
                  className="absolute right-4 top-4 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="px-6 pt-6 pb-4">
                  <h3 className="text-base font-semibold text-[var(--text-main)]">
                    {sideOpen.charAt(0).toUpperCase() + sideOpen.slice(1)} Sheet
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    This sheet slides in from the <strong>{sideOpen}</strong>.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* No Close Button                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="no-close-button"
        title="No Close Button"
        description="Pass showCloseButton={false} to hide the default × button. Use SheetClose inside the content instead."
      >
        <Demo className="flex items-center justify-center">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline">Open (no × button)</Button>
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false}>
              <SheetHeader>
                <SheetTitle>No Close Button</SheetTitle>
                <SheetDescription>
                  The default × button is hidden. Use the button below to close.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 px-6 py-4" />
              <SheetFooter>
                <SheetClose>
                  <Button>Done</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* RTL                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="rtl"
        title="RTL"
        description="In an RTL context, open the sheet from the left so it aligns with the reading direction."
      >
        <Demo className="flex items-center justify-center" dir="rtl">
          <Sheet>
            <SheetTrigger>
              <Button>افتح الجانب</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>ورقة RTL</SheetTitle>
                <SheetDescription>
                  هذه الورقة تنزلق من الجانب الأيسر لدعم اتجاه القراءة من اليمين إلى اليسار.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 px-6 py-4" />
              <SheetFooter>
                <SheetClose>
                  <Button variant="outline">إغلاق</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* API Reference                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section id="api" title="API Reference">
        <p className="text-sm text-[var(--text-muted)] -mt-2">
          <strong className="text-[var(--text-main)]">SheetContent</strong> props
        </p>
        <ApiTable
          rows={[
            {
              prop: 'side',
              type: "'top' | 'right' | 'bottom' | 'left'",
              default: "'right'",
              description: 'The edge the sheet slides in from.',
            },
            {
              prop: 'showCloseButton',
              type: 'boolean',
              default: 'true',
              description: 'Whether to render the default × close button.',
            },
            {
              prop: 'children',
              type: 'React.ReactNode',
              default: '—',
              description: 'Content rendered inside the sheet panel.',
            },
          ]}
        />

        <p className="text-sm text-[var(--text-muted)] mt-4">
          <strong className="text-[var(--text-main)]">Other components</strong> — all accept{' '}
          <code className="font-mono text-xs bg-[var(--bg-subtle)] px-1 py-0.5 rounded">children: React.ReactNode</code>
        </p>
        <ApiTable
          rows={[
            { prop: 'Sheet',            type: 'component', default: '—', description: 'Root context provider. Manages open state.' },
            { prop: 'SheetTrigger',     type: 'component', default: '—', description: 'Wraps any element; clicking it opens the sheet.' },
            { prop: 'SheetClose',       type: 'component', default: '—', description: 'Wraps any element; clicking it closes the sheet.' },
            { prop: 'SheetHeader',      type: 'component', default: '—', description: 'Top area with padding for title + description.' },
            { prop: 'SheetTitle',       type: 'component', default: '—', description: 'Bold heading inside SheetHeader.' },
            { prop: 'SheetDescription', type: 'component', default: '—', description: 'Muted subtitle inside SheetHeader.' },
            { prop: 'SheetFooter',      type: 'component', default: '—', description: 'Bottom area with border, typically holds action buttons.' },
          ]}
        />
      </Section>
    </div>
  )
}
