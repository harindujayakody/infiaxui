import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Textarea } from "@/components/shadcn/textarea"
import { AlertCircle, Send } from "lucide-react"

export function TextareaGuide() {
  const [basic, setBasic] = useState("")
  const [fieldVal, setFieldVal] = useState("")
  const [invalidVal, setInvalidVal] = useState("")
  const [submitVal, setSubmitVal] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [rtlVal, setRtlVal] = useState("")

  const showInvalidError = invalidVal.length > 0 && invalidVal.length < 10

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A basic textarea with a placeholder.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs">
            <Textarea
              placeholder="Type your message here."
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here." />`}
        />
      </section>

      {/* Field */}
      <section id="field" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Field</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Field</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">FieldLabel</code>, and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">FieldDescription</code> to create a textarea with a label and description.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]" htmlFor="field-area">
              Your message
            </label>
            <Textarea
              id="field-area"
              placeholder="Type your message here."
              value={fieldVal}
              onChange={(e) => setFieldVal(e.target.value)}
            />
            <p className="text-[11px] text-[var(--text-muted)]">
              Your message will be sent to the team.
            </p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

<Field>
  <FieldLabel>Your message</FieldLabel>
  <Textarea placeholder="Type your message here." />
  <FieldDescription>Your message will be sent to the team.</FieldDescription>
</Field>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to disable the textarea.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">
              Your message
            </label>
            <Textarea
              placeholder="You cannot type here."
              disabled
              defaultValue="This textarea is disabled."
            />
            <p className="text-[11px] text-[var(--text-muted)]">
              Editing is not allowed in this state.
            </p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-disabled>
  <FieldLabel>Your message</FieldLabel>
  <Textarea disabled placeholder="You cannot type here." />
  <FieldDescription>Editing is not allowed in this state.</FieldDescription>
</Field>`}
        />
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">aria-invalid</code> prop to mark the textarea as invalid and show a validation error.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]" htmlFor="invalid-area">
              Your message
            </label>
            <Textarea
              id="invalid-area"
              placeholder="Write at least 10 characters..."
              value={invalidVal}
              onChange={(e) => setInvalidVal(e.target.value)}
              aria-invalid={showInvalidError}
              className={showInvalidError ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : ""}
            />
            {showInvalidError && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                Message must be at least 10 characters.
              </p>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-invalid>
  <FieldLabel>Your message</FieldLabel>
  <Textarea
    aria-invalid
    placeholder="Write at least 10 characters..."
  />
  <FieldError>Message must be at least 10 characters.</FieldError>
</Field>`}
        />
      </section>

      {/* Button */}
      <section id="button" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Button</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pair with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Button</code> to create a textarea with a submit action.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-2">
            <Textarea
              placeholder="Write your feedback..."
              value={submitVal}
              onChange={(e) => { setSubmitVal(e.target.value); setSubmitted(false) }}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={!submitVal.trim()}
                onClick={() => { setSubmitted(true); setSubmitVal("") }}
              >
                <Send className="size-3.5 mr-1.5" />
                {submitted ? "Sent!" : "Send"}
              </Button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

<div className="space-y-2">
  <Textarea placeholder="Write your feedback..." />
  <div className="flex justify-end">
    <Button size="sm">Send</Button>
  </div>
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Textarea supports RTL text direction. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-main)]">رسالتك</label>
            <Textarea
              dir="rtl"
              placeholder="اكتب رسالتك هنا..."
              value={rtlVal}
              onChange={(e) => setRtlVal(e.target.value)}
            />
            <p className="text-[11px] text-[var(--text-muted)]">سيتم إرسال رسالتك إلى الفريق.</p>
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
                <td className="p-3 font-mono text-[var(--text-main)]">placeholder</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Placeholder text shown when empty</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Prevents user interaction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">aria-invalid</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Marks the field as invalid for a11y</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">rows</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Number of visible text lines</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">value</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled textarea value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onChange</td>
                <td className="p-3 font-mono">ChangeEventHandler</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Value change callback</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
