import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Info, AlertTriangle, AlertCircle, CheckCircle2, Terminal, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function AlertGuide() {
  const [variant, setVariant] = useState<"default" | "destructive" | "warning" | "success">("default")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct prominent status callouts using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Alert</code> primitive hierarchy:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Alert (variant='default' | 'destructive')",
            "├── Icon (Info | AlertCircle | CheckCircle2)",
            "├── AlertTitle",
            "├── AlertDescription",
            "└── AlertAction",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Alert Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Switch between semantic visual alert variants.
        </p>

        <div className="flex items-center gap-2">
          {(["default", "destructive", "warning", "success"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium border capitalize transition-colors",
                variant === v
                  ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-lg mx-auto">
          <div
            role="alert"
            className={cn(
              "relative w-full rounded-xl border p-4 transition-all space-y-1",
              variant === "default" && "border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-main)]",
              variant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400",
              variant === "warning" && "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
              variant === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}
          >
            <div className="flex items-start gap-3">
              {variant === "default" && <Terminal className="size-4 shrink-0 mt-0.5 text-indigo-500" />}
              {variant === "destructive" && <AlertCircle className="size-4 shrink-0 mt-0.5" />}
              {variant === "warning" && <AlertTriangle className="size-4 shrink-0 mt-0.5" />}
              {variant === "success" && <CheckCircle2 className="size-4 shrink-0 mt-0.5" />}

              <div className="flex-1 space-y-1">
                <h5 className="font-semibold text-xs leading-none">
                  {variant === "default" && "Heads up!"}
                  {variant === "destructive" && "Authentication Error"}
                  {variant === "warning" && "Maintenance Window"}
                  {variant === "success" && "Deployment Complete"}
                </h5>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {variant === "default" && "You can add components and dependencies to your app using the shadcn CLI."}
                  {variant === "destructive" && "Your session token expired. Please re-authenticate with your security key."}
                  {variant === "warning" && "Scheduled database migrations begin tonight at 02:00 UTC."}
                  {variant === "success" && "Production edge nodes updated to release v2.4.0 successfully."}
                </p>

                <div className="pt-2 flex items-center justify-end">
                  <button className="h-7 px-2.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-medium text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors">
                    {variant === "default" && "Install CLI"}
                    {variant === "destructive" && "Re-login"}
                    {variant === "warning" && "View Schedule"}
                    {variant === "success" && "View Logs"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AlertDemo() {
  return (
    <Alert variant="${variant === "destructive" ? "destructive" : "default"}">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">Enable</Button>
      </AlertAction>
    </Alert>
  )
}`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Alert icons, title alignment, and action slots mirror in right-to-left layout mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)]">
            <Info className="size-4 shrink-0 text-indigo-500 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-semibold text-xs text-[var(--text-main)]">تنبيه هام</h5>
              <p className="text-[11px] text-[var(--text-muted)]">
                يرجى التحقق من صحة مفاتيح الـ API قبل نشر التطبيق في بيئة الإنتاج.
              </p>
            </div>
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
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Alert.variant</td>
                <td className="p-3 font-mono">"default" | "destructive"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Changes color palette, borders, and icon tinting</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AlertTitle</td>
                <td className="p-3 font-mono">HTMLHeadingElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Primary header summary text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AlertAction</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Action button container slot</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
