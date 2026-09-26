import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Sparkles,
  X,
  Bell,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToastItem {
  id: string
  type: "default" | "success" | "info" | "warning" | "error"
  title: string
  description?: string
  actionLabel?: string
}

export function SonnerGuide() {
  const [toasts, setToasts] = useState<ToastItem[]>([
    {
      id: "1",
      type: "default",
      title: "Event has been created",
      description: "Sunday, December 03, 2026 at 9:00 AM",
      actionLabel: "Undo",
    },
  ])
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "top-right" | "top-left">("bottom-right")

  const addToast = (type: ToastItem["type"], title: string, description?: string, actionLabel?: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, type, title, description, actionLabel }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Sonner</code> is an opinionated, fluid toast component for React built and maintained by <a href="https://twitter.com/emilkowalski" target="_blank" rel="noreferrer" className="underline underline-offset-4 text-[var(--text-main)]">Emil Kowalski</a>. It stacks multiple notifications with smooth spring physics, action handlers, and promise states.
        </p>
      </section>

      {/* Interactive Demo */}
      <section id="interactive" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Toast Playground</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Trigger rich toasts with descriptions, action callbacks, and semantic types.
        </p>

        {/* Buttons Grid */}
        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() =>
                addToast(
                  "default",
                  "Event has been created",
                  "Sunday, December 03, 2026 at 9:00 AM",
                  "Undo"
                )
              }
              className="px-3.5 py-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 shadow-sm"
            >
              Default with Action
            </button>

            <button
              onClick={() =>
                addToast(
                  "success",
                  "Payment Successful",
                  "Receipt #INV-8924 sent to your email."
                )
              }
              className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)]"
            >
              Success Toast
            </button>

            <button
              onClick={() =>
                addToast(
                  "info",
                  "New Update Available",
                  "Version 2.4.0 is ready to install."
                )
              }
              className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)]"
            >
              Info Toast
            </button>

            <button
              onClick={() =>
                addToast(
                  "warning",
                  "Approaching API Rate Limit",
                  "You have used 85% of your quota."
                )
              }
              className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)]"
            >
              Warning Toast
            </button>

            <button
              onClick={() =>
                addToast(
                  "error",
                  "Failed to Save Workspace",
                  "Network disconnected. Retrying..."
                )
              }
              className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 text-xs font-medium"
            >
              Error Toast
            </button>
          </div>

          {/* Positioning */}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-medium text-[var(--text-muted)]">Position:</span>
            {(["bottom-right", "bottom-left", "top-right", "top-left"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPosition(p)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors",
                  position === p
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Toast Stack Visualization Area */}
          <div className="relative min-h-[220px] rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-page)] p-6 overflow-hidden">
            <div className="text-[11px] text-[var(--text-muted)] text-center pt-2 select-none">
              Toasts will float into the {position} container below
            </div>

            <div
              className={cn(
                "absolute flex flex-col gap-2 z-40 max-w-sm w-full p-4 pointer-events-none",
                position === "bottom-right" && "bottom-0 right-0",
                position === "bottom-left" && "bottom-0 left-0",
                position === "top-right" && "top-0 right-0",
                position === "top-left" && "top-0 left-0"
              )}
            >
              <AnimatePresence>
                {toasts.map((toast) => (
                  <motion.div
                    key={toast.id}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                    className={cn(
                      "p-3.5 rounded-xl border bg-[var(--bg-card)] shadow-xl pointer-events-auto flex items-start justify-between gap-3 text-xs text-[var(--text-main)]",
                      toast.type === "error"
                        ? "border-red-500/30 bg-red-500/5 text-red-500"
                        : "border-[var(--border-subtle)]"
                    )}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      {toast.type === "success" && (
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {toast.type === "info" && (
                        <Info className="size-4 text-indigo-500 shrink-0 mt-0.5" />
                      )}
                      {toast.type === "warning" && (
                        <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      {toast.type === "error" && (
                        <AlertCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-0.5 min-w-0">
                        <div className="font-semibold text-xs text-[var(--text-main)]">
                          {toast.title}
                        </div>
                        {toast.description && (
                          <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                            {toast.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      {toast.actionLabel && (
                        <button
                          onClick={() => removeToast(toast.id)}
                          className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px] font-semibold text-[var(--text-main)] hover:bg-[var(--border-subtle)] transition-colors"
                        >
                          {toast.actionLabel}
                        </button>
                      )}
                      <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2026 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo action executed"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}`}
        />
      </section>

      {/* Promise Toast */}
      <section id="promise" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Promise Toast</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Bind asynchronous loading states directly to the toast with automatic resolution/rejection banners.
        </p>

        <CodeBlock
          language="tsx"
          code={`toast.promise(saveUserDataPromise, {
  loading: "Saving account preferences...",
  success: (data) => "Preferences updated successfully!",
  error: "Error saving data. Please check your network.",
})`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Sonner toasts and action buttons mirror layout automatically in RTL environments.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto">
          <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <div>
                <div className="text-xs font-semibold">تم حفظ التغييرات</div>
                <div className="text-[10px] text-[var(--text-muted)]">الأحد، ٣ ديسمبر ٢٠٢٦</div>
              </div>
            </div>
            <button className="text-[10px] font-semibold px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              تراجع
            </button>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Method / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">toast(message, data)</td>
                <td className="p-3 font-mono">(message: string, data?: ToastOptions) =&gt; string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Triggers a standard notification popup</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">toast.success / error</td>
                <td className="p-3 font-mono">(message: string, data?: ToastOptions) =&gt; string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Semantic colored toast with corresponding status icon</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Toaster.position</td>
                <td className="p-3 font-mono">"top-left" | "top-right" | "bottom-left" | "bottom-right"</td>
                <td className="p-3 font-mono">"bottom-right"</td>
                <td className="p-3">Viewport anchor placement for the notification stack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
