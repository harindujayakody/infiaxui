import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { FolderKanban, Plus, Search, UploadCloud, Users, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmptyGuide() {
  const [variant, setVariant] = useState<"default" | "outlined" | "gradient">("default")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Construct empty states, zero-data placeholders, and onboarding callouts using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Empty</code> family:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Empty",
            "├── EmptyHeader",
            "│   ├── EmptyMedia (Icon / Avatar / Group)",
            "│   ├── EmptyTitle",
            "│   └── EmptyDescription",
            "└── EmptyContent (Actions / Form / CTA)",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Empty State</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard empty state with media icon, title, description, and primary CTA.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="size-12 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] mb-4">
            <FolderKanban className="size-6 text-[var(--text-main)]" />
          </div>
          <h3 className="text-base font-semibold text-[var(--text-main)] mb-1">
            No projects found
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mb-6 leading-relaxed">
            You haven't created any workspaces or projects yet. Get started by creating your first project.
          </p>
          <button className="h-9 px-4 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
            <Plus className="size-4" />
            <span>Create Project</span>
          </button>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { FolderKanban, Plus } from "lucide-react"

export function EmptyProjectDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderKanban className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          You haven't created any workspaces or projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Project
        </Button>
      </EmptyContent>
    </Empty>
  )
}`}
        />
      </section>

      {/* Stylings & Variants */}
      <section id="variants" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Variants & Frames</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Select between default flat, dashed outlined, or soft gradient background frames.
        </p>

        <div className="flex items-center gap-2">
          {(["default", "outlined", "gradient"] as const).map((v) => (
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

        <div
          className={cn(
            "p-10 rounded-2xl flex flex-col items-center justify-center text-center max-w-lg mx-auto transition-all",
            variant === "default" && "border border-[var(--border-subtle)] bg-[var(--bg-card)]",
            variant === "outlined" && "border-2 border-dashed border-[var(--border-subtle)] bg-transparent",
            variant === "gradient" && "border border-[var(--border-subtle)] bg-gradient-to-b from-indigo-500/5 via-[var(--bg-card)] to-[var(--bg-card)] shadow-lg"
          )}
        >
          <div className="size-12 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            <UploadCloud className="size-6" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-main)] mb-1">
            Drop assets here to upload
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mb-5">
            Support for PNG, JPG, SVG, and WebP files up to 25MB.
          </p>
          <button className="h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] hover:bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)] transition-colors">
            Browse Files
          </button>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Empty variant="${variant}">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <UploadCloud className="size-6 text-primary" />
    </EmptyMedia>
    <EmptyTitle>Drop assets here to upload</EmptyTitle>
    <EmptyDescription>
      Support for PNG, JPG, SVG, and WebP files up to 25MB.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">Browse Files</Button>
  </EmptyContent>
</Empty>`}
        />
      </section>

      {/* Avatar Group Empty State */}
      <section id="avatar-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Avatar Media Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Empty state showcasing team membership or pending user invites.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto text-center flex flex-col items-center">
          <div className="flex -space-x-2 overflow-hidden mb-4">
            <div className="inline-block size-9 rounded-full ring-2 ring-[var(--bg-card)] bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-xs font-semibold">
              SC
            </div>
            <div className="inline-block size-9 rounded-full ring-2 ring-[var(--bg-card)] bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-semibold">
              AL
            </div>
            <div className="inline-block size-9 rounded-full ring-2 ring-[var(--bg-card)] bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white text-xs font-semibold">
              MK
            </div>
          </div>
          <h4 className="text-sm font-semibold text-[var(--text-main)] mb-1">
            No active collaborators
          </h4>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mb-5">
            Invite your colleagues to start pair editing and reviewing deployments.
          </p>
          <button className="h-8 px-3 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium flex items-center gap-1.5 hover:opacity-90">
            <Users className="size-3.5" />
            <span>Invite Team</span>
          </button>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="avatar-group">
      <AvatarGroup>
        <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
      </AvatarGroup>
    </EmptyMedia>
    <EmptyTitle>No active collaborators</EmptyTitle>
    <EmptyDescription>
      Invite your colleagues to start pair editing and reviewing deployments.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">
      <Users className="mr-2 size-3.5" />
      Invite Team
    </Button>
  </EmptyContent>
</Empty>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Empty states seamlessly adapt to right-to-left languages.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto text-center flex flex-col items-center">
          <div className="size-10 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)] mb-3">
            <Search className="size-5" />
          </div>
          <h4 className="text-sm font-semibold text-[var(--text-main)] mb-1">
            لم يتم العثور على نتائج
          </h4>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            جرّب تغيير كلمات البحث أو إعادة تعيين الفلاتر.
          </p>
          <button className="h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)]">
            مسح الفلاتر
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
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Empty.variant</td>
                <td className="p-3 font-mono">"default" | "outlined" | "gradient"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Container visual appearance and border styling</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">EmptyMedia.variant</td>
                <td className="p-3 font-mono">"icon" | "avatar" | "avatar-group"</td>
                <td className="p-3 font-mono">"icon"</td>
                <td className="p-3">Media wrapper sizing and layout configuration</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">EmptyTitle</td>
                <td className="p-3 font-mono">HTMLHeadingElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Primary header summary text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">EmptyContent</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Slot for buttons, input forms, or secondary links</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
