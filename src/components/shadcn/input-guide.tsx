import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import { AlertCircle, Search, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export function InputGuide() {
  const [basic, setBasic] = useState("")
  const [invalidVal, setInvalidVal] = useState("")
  const [searchVal, setSearchVal] = useState("")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          The standard text input component.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs">
            <Input
              placeholder="Email address..."
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from "@/components/ui/input"

<Input placeholder="Email address..." />`}
        />
      </section>

      {/* Field Composition */}
      <section id="field" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Field with Label & Description</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Wrapped with label and supporting description text.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="text-xs font-semibold text-[var(--text-main)]">
                Username
              </label>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Recommended</Badge>
            </div>
            <Input id="username" placeholder="@shadcn" />
            <p className="text-[11px] text-[var(--text-muted)]">This will be your public display name.</p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field>
  <div className="flex items-center justify-between">
    <FieldLabel htmlFor="username">Username</FieldLabel>
    <Badge variant="secondary">Recommended</Badge>
  </div>
  <Input id="username" placeholder="@shadcn" />
  <FieldDescription>This will be your public display name.</FieldDescription>
</Field>`}
        />
      </section>

      {/* Disabled & Invalid */}
      <section id="states" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled & Invalid States</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Visual styling for disabled interaction and validation errors.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 max-w-xs mx-auto">
          {/* Disabled */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-muted)]">Disabled input</label>
            <Input disabled value="disabled@example.com" />
          </div>

          {/* Invalid */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-main)]">Required email</label>
            <Input
              placeholder="name@example.com"
              value={invalidVal}
              onChange={(e) => setInvalidVal(e.target.value)}
              className={cn(!invalidVal && "border-red-500/80 focus:ring-red-500/80")}
            />
            {!invalidVal && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="size-3 shrink-0" /> Email is required.
              </p>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Disabled */}
<Input disabled value="disabled@example.com" />

{/* Invalid with error message */}
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid placeholder="name@example.com" />
  <FieldError>Email is required.</FieldError>
</Field>`}
        />
      </section>

      {/* File Input */}
      <section id="file" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">File Upload</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">type="file"</code> for file selection.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]">Upload avatar</label>
            <Input type="file" className="text-xs file:mr-2 file:text-xs file:font-medium file:border-0 file:bg-transparent file:text-[var(--text-main)]" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Input type="file" id="picture" />`}
        />
      </section>

      {/* Inline Search with Button */}
      <section id="inline" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Inline Search with Button</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair an input with an action button in a row layout.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex w-full max-w-xs items-center space-x-2">
            <Input
              placeholder="Search components..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <Button size="sm">Search</Button>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<div className="flex w-full max-w-sm items-center space-x-2">
  <Input type="text" placeholder="Search components..." />
  <Button type="submit">Search</Button>
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Inputs support RTL text entry with right-aligned placeholders.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-main)]">البريد الإلكتروني</label>
            <Input placeholder="name@example.com" />
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
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">type</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">"text"</td>
                <td className="p-3">HTML input type (text, email, password, number, file, etc.)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Disables input interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
