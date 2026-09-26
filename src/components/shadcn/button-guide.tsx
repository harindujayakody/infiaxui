import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  ArrowRight,
  Mail,
  Loader2,
  Trash2,
  Plus,
  Sparkles,
  Send,
  Download,
  Settings,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ButtonGuide() {
  const [variant, setVariant] = useState<"default" | "outline" | "secondary" | "ghost" | "destructive" | "link">("default")
  const [size, setSize] = useState<"default" | "sm" | "lg" | "icon">("default")
  const [loading, setLoading] = useState(false)
  const [rounded, setRounded] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Overview */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Button</code> component renders an accessible button element with built-in variants, size scaling, inline icon slots, and active/focus ring states.
        </p>
      </section>

      {/* Interactive Playground */}
      <section id="interactive" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Button Playground</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Experiment with visual variants, sizing, loading spinners, and rounded pill styles.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">Variant:</span>
            {(["default", "outline", "secondary", "ghost", "destructive", "link"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs capitalize border transition-colors",
                  variant === v
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">Size:</span>
            {(["default", "sm", "lg", "icon"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs uppercase border transition-colors",
                  size === sz
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLoading(!loading)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs border transition-colors",
                loading
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              Loading: {loading ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setRounded(!rounded)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs border transition-colors",
                rounded
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              Pill: {rounded ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Live Canvas */}
        <div className="p-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[160px]">
          <button
            className={cn(
              "inline-flex items-center justify-center font-medium transition-all duration-150 select-none active:scale-[0.98]",
              rounded ? "rounded-full" : size === "sm" ? "rounded-lg" : "rounded-xl",
              size === "default" && "h-9 px-4 text-xs gap-2",
              size === "sm" && "h-8 px-3 text-[11px] gap-1.5",
              size === "lg" && "h-11 px-6 text-sm gap-2.5",
              size === "icon" && "size-9 p-0",
              variant === "default" && "bg-[var(--text-main)] text-[var(--bg-page)] shadow-sm hover:opacity-90",
              variant === "destructive" && "bg-red-500 hover:bg-red-600 text-white shadow-sm",
              variant === "outline" && "border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)]",
              variant === "secondary" && "bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-main)]",
              variant === "ghost" && "hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]",
              variant === "link" && "text-[var(--text-main)] underline underline-offset-4 hover:opacity-80 p-0 h-auto"
            )}
          >
            {loading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : size === "icon" ? (
              <Sparkles className="size-4" />
            ) : (
              <>
                <Send className="size-3.5" />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"

export function ButtonDemo() {
  return (
    <Button
      variant="${variant}"
      size="${size}"
      className="${rounded ? "rounded-full" : ""}"
    >
      ${loading ? `<Loader2 className="mr-2 h-4 w-4 animate-spin" />` : `<Send className="mr-2 h-4 w-4" />`}
      Submit Request
    </Button>
  )
}`}
        />
      </section>

      {/* All Variants Gallery */}
      <section id="variants-gallery" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variant Gallery</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Every variant styled for high-contrast accessibility across light and dark themes.
        </p>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center gap-3">
          <button className="h-9 px-4 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold shadow-sm hover:opacity-90">
            Default
          </button>
          <button className="h-9 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-subtle)]">
            Outline
          </button>
          <button className="h-9 px-4 rounded-xl bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] hover:bg-[var(--border-subtle)]">
            Secondary
          </button>
          <button className="h-9 px-4 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]">
            Ghost
          </button>
          <button className="h-9 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-sm">
            Destructive
          </button>
          <button className="text-xs font-semibold text-[var(--text-main)] underline underline-offset-4 px-2">
            Link Button
          </button>
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Buttons automatically flip inline icon order and spacing in RTL mode.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto flex items-center justify-center gap-3">
          <button className="h-9 px-4 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium flex items-center gap-2">
            <ArrowRight className="size-3.5 rotate-180" />
            <span>متابعة الحساب</span>
          </button>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Visual styling archetype</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono">"default" | "xs" | "sm" | "lg" | "icon"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Padding, height, and typography scale</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Dims button opacity and disables pointer events</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
