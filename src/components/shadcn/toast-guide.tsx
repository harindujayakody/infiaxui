import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { CheckCircle, Info, AlertTriangle, XCircle, Loader2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

// ---------- Toast type icons ----------
const TYPE_ICONS = {
  success: <CheckCircle className="size-4 text-emerald-400 shrink-0" />,
  info: <Info className="size-4 text-sky-400 shrink-0" />,
  warning: <AlertTriangle className="size-4 text-amber-400 shrink-0" />,
  error: <XCircle className="size-4 text-red-400 shrink-0" />,
  loading: <Loader2 className="size-4 text-[var(--text-muted)] animate-spin shrink-0" />,
}

// ---------- Minimal toast renderer ----------
interface ToastItem {
  id: string
  title: string
  description?: string
  type?: keyof typeof TYPE_ICONS
  action?: { label: string; onClick: () => void }
  autoClose?: number
}

function ToastDemo({ items, onClose }: { items: ToastItem[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-start gap-3 w-80 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 shadow-2xl"
          >
            {item.type && TYPE_ICONS[item.type]}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[var(--text-main)]">{item.title}</div>
              {item.description && (
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.description}</div>
              )}
            </div>
            {item.action && (
              <button
                onClick={item.action.onClick}
                className="ml-auto shrink-0 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-2 py-1 text-[11px] text-[var(--text-main)] font-medium hover:bg-[var(--border-subtle)] transition-colors"
              >
                {item.action.label}
              </button>
            )}
            <button
              onClick={() => onClose(item.id)}
              className="shrink-0 rounded-md p-0.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              aria-label="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = (item: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...item, id }])
    const ttl = item.autoClose ?? 4000
    if (ttl > 0) setTimeout(() => remove(id), ttl)
    return id
  }

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return { toasts, add, remove }
}

export function ToastGuide() {
  const { toasts, add, remove } = useToasts()

  // For promise demo
  const [promiseState, setPromiseState] = useState<"idle" | "loading" | "done">("idle")

  const handlePromise = () => {
    setPromiseState("loading")
    const id = add({ title: "Uploading file...", type: "loading", autoClose: 0 })
    setTimeout(() => {
      remove(id)
      add({ title: "File uploaded successfully!", type: "success" })
      setPromiseState("done")
      setTimeout(() => setPromiseState("idle"), 3000)
    }, 2500)
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      <ToastDemo items={toasts} onClose={remove} />

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Call <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">toast.add()</code> to show a toast notification.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Button
            variant="outline"
            onClick={() =>
              add({
                title: "Event created",
                description: "Sunday, December 3 at 9:00 AM",
              })
            }
          >
            Show Toast
          </Button>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { toast } from "@/components/ui/toast"

toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
})`}
        />
      </section>

      {/* Types */}
      <section id="types" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Types</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Set the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">type</code> option to render a status icon. Supported values: <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">success</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">info</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">warning</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">error</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">loading</code>.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-center gap-3">
          {(["success", "info", "warning", "error", "loading"] as const).map((t) => (
            <Button
              key={t}
              variant="outline"
              size="sm"
              onClick={() =>
                add({
                  title: `${t.charAt(0).toUpperCase() + t.slice(1)} toast`,
                  description: `This is a ${t} message`,
                  type: t,
                  autoClose: t === "loading" ? 3000 : 4000,
                })
              }
            >
              {t}
            </Button>
          ))}
        </div>
        <CodeBlock
          language="tsx"
          code={`toast.add({ title: "Saved!", type: "success" })
toast.add({ title: "FYI", type: "info" })
toast.add({ title: "Watch out", type: "warning" })
toast.add({ title: "Failed", type: "error" })
toast.add({ title: "Working...", type: "loading" })`}
        />
      </section>

      {/* Action */}
      <section id="action" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Action</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pass <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">actionProps</code> to render an action button inside the toast.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Button
            variant="outline"
            onClick={() => {
              let id: string
              id = add({
                title: "Event created",
                description: "Sunday, December 3 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => remove(id),
                },
              })
            }}
          >
            Show with Undo
          </Button>
        </div>
        <CodeBlock
          language="tsx"
          code={`const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})`}
        />
      </section>

      {/* Promise */}
      <section id="promise" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Promise</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">toast.promise</code> to automatically move through loading → success / error states as an async operation progresses.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Button
            variant="outline"
            disabled={promiseState === "loading"}
            onClick={handlePromise}
          >
            {promiseState === "loading" ? (
              <>
                <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload File"
            )}
          </Button>
        </div>
        <CodeBlock
          language="tsx"
          code={`toast.promise(uploadFile(), {
  loading: "Uploading file...",
  success: "File uploaded successfully!",
  error: "Upload failed. Please try again.",
})`}
        />
      </section>

      {/* Toaster Setup */}
      <section id="toaster" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Toaster Setup</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;Toaster /&gt;</code> component to your root layout to render toast notifications globally.
        </p>
        <CodeBlock
          language="tsx"
          code={`// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Option</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">title</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Main toast heading</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">description</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Supporting description text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">type</td>
                <td className="p-3 font-mono">"success" | "info" | "warning" | "error" | "loading"</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Status icon and semantic color</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">actionProps</td>
                <td className="p-3 font-mono">ButtonHTMLAttributes</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Props for the action button</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">duration</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4000</td>
                <td className="p-3">Auto-dismiss delay in ms (0 = persist)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
