import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-[var(--bg-subtle)]", className)} />
}

function ContentLoader({ show, children, skeleton }: { show: boolean; children: React.ReactNode; skeleton: React.ReactNode }) {
  return show ? <>{children}</> : <>{skeleton}</>
}

export function SkeletonGuide() {
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const [cardLoaded, setCardLoaded] = useState(false)
  const [textLoaded, setTextLoaded] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Skeleton</code> component accepts any <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">className</code> to control size and shape.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-48 rounded-full" />
          <Skeleton className="h-4 w-36 rounded-full" />
          <Skeleton className="h-4 w-56 rounded-full" />
        </div>
        <CodeBlock language="tsx" code={`import { Skeleton } from "@/components/ui/skeleton"\n\n<Skeleton className="h-[20px] w-[100px] rounded-full" />`} />
      </section>

      <section id="avatar" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar</h2>
        <p className="text-sm text-[var(--text-muted)]">Skeleton for a user avatar and name loading state. Click "Reveal" to simulate content load.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-5">
          <div className="flex items-center gap-4 w-full max-w-xs">
            <ContentLoader show={avatarLoaded} skeleton={<Skeleton className="size-12 rounded-full shrink-0" />}>
              <div className="size-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">JD</div>
            </ContentLoader>
            <div className="flex-1 space-y-2">
              <ContentLoader show={avatarLoaded} skeleton={<Skeleton className="h-4 w-28 rounded-full" />}>
                <div className="text-sm font-semibold">Jane Doe</div>
              </ContentLoader>
              <ContentLoader show={avatarLoaded} skeleton={<Skeleton className="h-3 w-40 rounded-full" />}>
                <div className="text-xs text-[var(--text-muted)]">Product Designer · San Francisco</div>
              </ContentLoader>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setAvatarLoaded(!avatarLoaded)}>
            {avatarLoaded ? "Show Skeleton" : "Reveal Content"}
          </Button>
        </div>
        <CodeBlock language="tsx" code={`<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[120px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`} />
      </section>

      <section id="card" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Card</h2>
        <p className="text-sm text-[var(--text-muted)]">A card-shaped skeleton for image + text content.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-5">
          <ContentLoader
            show={cardLoaded}
            skeleton={
              <div className="w-full max-w-xs rounded-xl border border-[var(--border-subtle)] overflow-hidden">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-5/6 rounded-full" />
                  <div className="flex items-center gap-3 pt-2"><Skeleton className="size-8 rounded-full" /><Skeleton className="h-4 w-24 rounded-full" /></div>
                </div>
              </div>
            }
          >
            <div className="w-full max-w-xs rounded-xl border border-[var(--border-subtle)] overflow-hidden">
              <div className="h-40 w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center text-2xl">🎨</div>
              <div className="p-4 space-y-2">
                <div className="font-semibold text-sm">Design System v2.0</div>
                <div className="text-xs text-[var(--text-muted)]">A comprehensive design system built with React and Tailwind CSS.</div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="size-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-xs font-bold">A</div>
                  <span className="text-xs text-[var(--text-muted)]">Alice Johnson</span>
                </div>
              </div>
            </div>
          </ContentLoader>
          <Button size="sm" variant="outline" onClick={() => setCardLoaded(!cardLoaded)}>
            {cardLoaded ? "Show Skeleton" : "Reveal Content"}
          </Button>
        </div>
        <CodeBlock language="tsx" code={`<div className="w-full max-w-sm rounded-xl border overflow-hidden">
  <Skeleton className="h-40 w-full rounded-none" />
  <div className="p-4 space-y-3">
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>`} />
      </section>

      <section id="text" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Text</h2>
        <p className="text-sm text-[var(--text-muted)]">Simulate loading paragraphs with variable-width skeleton lines.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-5">
          <ContentLoader
            show={textLoaded}
            skeleton={
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2 rounded-md" />
                <div className="space-y-2"><Skeleton className="h-4 w-full rounded-full" /><Skeleton className="h-4 w-11/12 rounded-full" /><Skeleton className="h-4 w-4/5 rounded-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-full rounded-full" /><Skeleton className="h-4 w-3/4 rounded-full" /></div>
              </div>
            }
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold">What is shadcn/ui?</h3>
              <p className="text-sm text-[var(--text-muted)]">shadcn/ui is a collection of beautifully designed, accessible, and customizable components built with Radix UI and Tailwind CSS.</p>
              <p className="text-sm text-[var(--text-muted)]">It is not a component library — it is a way to build your own component library.</p>
            </div>
          </ContentLoader>
          <Button size="sm" variant="outline" onClick={() => setTextLoaded(!textLoaded)}>
            {textLoaded ? "Show Skeleton" : "Reveal Content"}
          </Button>
        </div>
        <CodeBlock language="tsx" code={`<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-11/12" />
  <Skeleton className="h-4 w-4/5" />
</div>`} />
      </section>

      <section id="form" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Form</h2>
        <p className="text-sm text-[var(--text-muted)]">Placeholder skeleton for a form before data loads.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="w-full max-w-sm mx-auto space-y-5">
            {[1, 2, 3].map(i => (<div key={i} className="space-y-2"><Skeleton className="h-4 w-24 rounded-full" /><Skeleton className="h-9 w-full rounded-lg" /></div>))}
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
        <CodeBlock language="tsx" code={`<div className="space-y-2">
  <Skeleton className="h-4 w-24 rounded-full" />
  <Skeleton className="h-9 w-full rounded-lg" />
</div>
<Skeleton className="h-9 w-28 rounded-lg" />`} />
      </section>

      <section id="table" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Table</h2>
        <p className="text-sm text-[var(--text-muted)]">Simulate loading table rows before data arrives.</p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <div className="p-3 border-b border-[var(--border-subtle)] grid grid-cols-4 gap-4">
            {["Invoice","Status","Method","Amount"].map(h => <Skeleton key={h} className="h-4 w-16 rounded-full" />)}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-3 border-b border-[var(--border-subtle)]/50 last:border-0 grid grid-cols-4 gap-4 items-center">
              <Skeleton className="h-4 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-12 rounded-full ml-auto" />
            </div>
          ))}
        </div>
        <CodeBlock language="tsx" code={`{Array.from({ length: 5 }).map((_, i) => (
  <TableRow key={i}>
    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
  </TableRow>
))}`} />
      </section>

      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">Skeleton renders correctly in RTL layouts.</p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-4">
          <Skeleton className="size-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2"><Skeleton className="h-4 w-28 rounded-full" /><Skeleton className="h-3 w-40 rounded-full" /></div>
        </div>
      </section>

    </div>
  )
}
