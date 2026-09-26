import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  FileText,
  ImageIcon,
  X,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AttachmentGuide() {
  const [state, setState] = useState<"done" | "uploading" | "processing" | "error" | "idle">("done")
  const [size, setSize] = useState<"default" | "sm" | "xs">("default")
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct file preview cards and chat attachments using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Attachment</code> family:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Attachment (state='done' size='default' orientation='horizontal')",
            "├── AttachmentMedia (variant='icon' | 'image')",
            "├── AttachmentContent",
            "│   ├── AttachmentTitle",
            "│   └── AttachmentDescription",
            "├── AttachmentActions",
            "│   └── AttachmentAction",
            "└── AttachmentTrigger",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Interactive Attachment Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Toggle between upload lifecycle states, sizes, and layout orientations.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">State:</span>
            {(["done", "uploading", "processing", "error"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs capitalize border transition-colors",
                  state === s
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">Size:</span>
            {(["default", "sm", "xs"] as const).map((sz) => (
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

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">Orientation:</span>
            {(["horizontal", "vertical"] as const).map((ori) => (
              <button
                key={ori}
                onClick={() => setOrientation(ori)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs capitalize border transition-colors",
                  orientation === ori
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {ori}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[160px]">
          <div
            className={cn(
              "rounded-xl border transition-all relative overflow-hidden bg-[var(--bg-page)]",
              orientation === "horizontal" ? "flex items-center justify-between" : "flex flex-col",
              size === "default" && "p-3.5 gap-3 w-80",
              size === "sm" && "p-2.5 gap-2.5 w-72",
              size === "xs" && "p-2 gap-2 w-64",
              state === "error"
                ? "border-red-500/40 bg-red-500/5 text-red-500"
                : "border-[var(--border-subtle)] text-[var(--text-main)] shadow-sm"
            )}
          >
            {/* Shimmer overlay for uploading & processing */}
            {(state === "uploading" || state === "processing") && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            )}

            {/* Media */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-lg flex items-center justify-center shrink-0",
                  size === "default" && "size-10",
                  size === "sm" && "size-8",
                  size === "xs" && "size-6",
                  state === "error"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                )}
              >
                {state === "uploading" ? (
                  <Loader2 className="size-4 animate-spin text-indigo-500" />
                ) : state === "error" ? (
                  <AlertCircle className="size-4" />
                ) : (
                  <FileText className={cn(size === "xs" ? "size-3" : "size-4")} />
                )}
              </div>

              {/* Content */}
              <div className="space-y-0.5 min-w-0 flex-1">
                <div
                  className={cn(
                    "font-semibold truncate",
                    size === "default" && "text-xs",
                    size === "sm" && "text-[11px]",
                    size === "xs" && "text-[10px]"
                  )}
                >
                  sales-report-q3.pdf
                </div>
                <div className="text-[10px] text-[var(--text-muted)] truncate">
                  {state === "uploading" && "Uploading 45% · 2.4 MB"}
                  {state === "processing" && "Generating vector preview..."}
                  {state === "error" && "Upload failed: network timeout"}
                  {state === "done" && "PDF · 2.4 MB · Ready"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0 pt-0.5">
              <button
                aria-label="Remove attachment"
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { FileText, X } from "lucide-react"

export function AttachmentDemo() {
  return (
    <Attachment state="${state}" size="${size}" orientation="${orientation}">
      <AttachmentMedia>
        <FileText className="size-4" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-report-q3.pdf</AttachmentTitle>
        <AttachmentDescription>
          ${state === "error" ? "Upload failed: network timeout" : "PDF · 2.4 MB"}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove sales-report-q3.pdf">
          <X className="size-4" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}`}
        />
      </section>

      {/* AttachmentGroup */}
      <section id="group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">AttachmentGroup (Horizontal Snap Row)</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Lay out multiple attachments in a horizontally scrollable, snapping carousel row with edge fade masks.
        </p>

        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {[
              { name: "architecture-v2.png", size: "1.2 MB", ext: "PNG" },
              { name: "database-schema.sql", size: "48 KB", ext: "SQL" },
              { name: "design-tokens.json", size: "14 KB", ext: "JSON" },
              { name: "meeting-summary.docx", size: "820 KB", ext: "DOCX" },
            ].map((file) => (
              <div
                key={file.name}
                className="w-64 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between shrink-0 snap-start shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)] shrink-0">
                    <FileText className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{file.name}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {file.ext} · {file.size}
                    </div>
                  </div>
                </div>
                <button className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-main)]">
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<AttachmentGroup>
  <Attachment>
    <AttachmentMedia><FileText className="size-4" /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>architecture-v2.png</AttachmentTitle>
      <AttachmentDescription>PNG · 1.2 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
  <Attachment>
    <AttachmentMedia><FileText className="size-4" /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>database-schema.sql</AttachmentTitle>
      <AttachmentDescription>SQL · 48 KB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
</AttachmentGroup>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Attachment icons, metadata text, and trailing action buttons mirror smoothly in RTL layouts.
        </p>
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto">
          <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center">
                <FileText className="size-4" />
              </div>
              <div>
                <div className="text-xs font-semibold">تقرير-المبيعات.pdf</div>
                <div className="text-[10px] text-[var(--text-muted)]">مكتمل · 2.4 ميغابايت</div>
              </div>
            </div>
            <button className="p-1 text-[var(--text-muted)]">
              <X className="size-3.5" />
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
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Attachment.state</td>
                <td className="p-3 font-mono">"idle" | "uploading" | "processing" | "error" | "done"</td>
                <td className="p-3 font-mono">"done"</td>
                <td className="p-3">Drives visual styling, spinner, and shimmer animations</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Attachment.size</td>
                <td className="p-3 font-mono">"default" | "sm" | "xs"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Scale of media icon, typography, and card dimensions</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Attachment.orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3 font-mono">"horizontal"</td>
                <td className="p-3">Lays media beside or above title and description content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AttachmentTrigger</td>
                <td className="p-3 font-mono">HTMLButtonElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Full-card overlay click target behind independent action buttons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
