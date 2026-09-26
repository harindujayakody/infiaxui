import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Loader2, LoaderIcon, RefreshCw } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import { Input } from "@/components/shadcn/input"
import { cn } from "@/lib/utils"

function Spinner({ className, size = "default" }: { className?: string; size?: "xs" | "sm" | "default" | "lg" | "xl" }) {
  const sizes = { xs: "size-3", sm: "size-4", default: "size-5", lg: "size-6", xl: "size-8" }
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-[var(--text-muted)]", sizes[size], className)}
    />
  )
}

export function SpinnerGuide() {
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [emptyLoading, setEmptyLoading] = useState(false)

  const handleBtnClick = () => {
    setLoadingBtn(true)
    setTimeout(() => setLoadingBtn(false), 2000)
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">The default spinner using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Spinner</code> component.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Spinner />
        </div>
        <CodeBlock language="tsx" code={`import { Spinner } from "@/components/ui/spinner"\n\n<Spinner />`} />
      </section>

      <section id="customization" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Customization</h2>
        <p className="text-sm text-[var(--text-muted)]">Replace the default icon by editing the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Spinner</code> component. Swap <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">LoaderIcon</code> with any Lucide icon.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-8">
          {[LoaderIcon, Loader2, RefreshCw].map((Icon, i) => (
            <Icon key={i} className="size-5 animate-spin text-[var(--text-muted)]" aria-label="Loading" />
          ))}
        </div>
        <CodeBlock language="tsx" code={`// components/ui/spinner.tsx
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }`} />
      </section>

      <section id="size" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Size</h2>
        <p className="text-sm text-[var(--text-muted)]">Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size-*</code> utility class to change the size of the spinner.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-end justify-center gap-6">
          {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Spinner size={s} />
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{s}</span>
            </div>
          ))}
        </div>
        <CodeBlock language="tsx" code={`<Spinner className="size-3" />   {/* xs */}
<Spinner className="size-4" />   {/* sm */}
<Spinner className="size-5" />   {/* default */}
<Spinner className="size-6" />   {/* lg */}
<Spinner className="size-8" />   {/* xl */}`} />
      </section>

      <section id="button" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Button</h2>
        <p className="text-sm text-[var(--text-muted)]">Add a spinner to a button to indicate a loading state. Click "Submit" to see it in action.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4 flex-wrap">
          <Button onClick={handleBtnClick} disabled={loadingBtn}>
            {loadingBtn ? <><Spinner size="sm" className="mr-1.5 text-current" />Processing...</> : "Submit"}
          </Button>
          <Button variant="outline" disabled>
            <Spinner size="sm" className="mr-1.5" />Loading
          </Button>
          <Button variant="ghost" disabled>
            Please wait<Spinner size="sm" className="ml-1.5" />
          </Button>
        </div>
        <CodeBlock language="tsx" code={`<Button disabled>
  <Spinner className="mr-1.5 size-4" />
  Loading
</Button>`} />
      </section>

      <section id="badge" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Badge</h2>
        <p className="text-sm text-[var(--text-muted)]">Add a spinner to a badge to indicate a loading state.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-3 flex-wrap">
          <Badge variant="secondary"><Spinner size="xs" className="mr-1 text-current" /><span>Syncing</span></Badge>
          <Badge variant="outline"><Spinner size="xs" className="mr-1" /><span>Processing</span></Badge>
          <Badge variant="default"><span>Uploading</span><Spinner size="xs" className="ml-1 text-current" /></Badge>
        </div>
        <CodeBlock language="tsx" code={`<Badge variant="secondary">
  <Spinner className="mr-1 size-3" />
  Syncing
</Badge>`} />
      </section>

      <section id="input-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Input Group</h2>
        <p className="text-sm text-[var(--text-muted)]">A spinner inside an input field to show an async validation or search in progress.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            <Input placeholder="Search..." className="pr-9" />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <Spinner size="sm" />
            </div>
          </div>
        </div>
        <CodeBlock language="tsx" code={`<div className="relative">
  <Input placeholder="Search..." className="pr-9" />
  <div className="absolute inset-y-0 right-3 flex items-center">
    <Spinner className="size-4" />
  </div>
</div>`} />
      </section>

      <section id="empty" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Empty</h2>
        <p className="text-sm text-[var(--text-muted)]">A full-area loading placeholder, used when an entire section is loading. Click to simulate.</p>
        <div
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center justify-center gap-3 py-16 cursor-pointer"
          onClick={() => { setEmptyLoading(true); setTimeout(() => setEmptyLoading(false), 1500) }}
        >
          <Spinner size="lg" />
          <p className="text-xs text-[var(--text-muted)]">{emptyLoading ? "Loading..." : "Click to simulate loading"}</p>
        </div>
        <CodeBlock language="tsx" code={`<div className="flex flex-col items-center justify-center py-16 gap-3">
  <Spinner className="size-6" />
  <p className="text-sm text-muted-foreground">Loading content...</p>
</div>`} />
      </section>

      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">Spinner is symmetric — no flipping needed in RTL layouts.</p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4">
          <Button variant="outline" disabled dir="rtl"><Spinner size="sm" className="ml-1.5" />جارٍ التحميل</Button>
          <Badge variant="secondary"><Spinner size="xs" className="ml-1 text-current" /><span>مزامنة</span></Badge>
        </div>
      </section>

      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr><th className="p-3 font-semibold">Prop</th><th className="p-3 font-semibold">Type</th><th className="p-3 font-semibold">Default</th><th className="p-3 font-semibold">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr><td className="p-3 font-mono text-[var(--text-main)]">className</td><td className="p-3 font-mono">string</td><td className="p-3 font-mono">-</td><td className="p-3">Use <code>size-*</code> utilities to resize</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">role</td><td className="p-3 font-mono">string</td><td className="p-3 font-mono">"status"</td><td className="p-3">ARIA role for screen readers</td></tr>
              <tr><td className="p-3 font-mono text-[var(--text-main)]">aria-label</td><td className="p-3 font-mono">string</td><td className="p-3 font-mono">"Loading"</td><td className="p-3">Accessible label announced by screen readers</td></tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
