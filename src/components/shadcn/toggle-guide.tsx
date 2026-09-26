import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------- Minimal self-contained Toggle primitive ----------
interface ToggleProps {
  pressed: boolean
  onPressedChange: (v: boolean) => void
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

function Toggle({
  pressed,
  onPressedChange,
  children,
  variant = "default",
  size = "default",
  disabled = false,
  className,
  ...rest
}: ToggleProps) {
  const sizes = {
    sm: "h-7 px-2.5 text-xs",
    default: "h-9 px-3 text-sm",
    lg: "h-10 px-4 text-sm",
  }
  const variants = {
    default: cn(
      "bg-transparent",
      pressed
        ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
        : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/60 hover:text-[var(--text-main)]"
    ),
    outline: cn(
      "border border-[var(--border-subtle)]",
      pressed
        ? "bg-[var(--bg-subtle)] text-[var(--text-main)] border-[var(--text-muted)]"
        : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/60 hover:text-[var(--text-main)]"
    ),
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={pressed}
      data-state={pressed ? "on" : "off"}
      disabled={disabled}
      onClick={() => !disabled && onPressedChange(!pressed)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ToggleGuide() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(true)
  const [underline, setUnderline] = useState(false)

  const [outlineBold, setOutlineBold] = useState(false)
  const [outlineItalic, setOutlineItalic] = useState(false)
  const [outlineUnder, setOutlineUnder] = useState(false)

  const [textBold, setTextBold] = useState(true)
  const [textItalic, setTextItalic] = useState(false)

  const [smPressed, setSmPressed] = useState(false)
  const [defPressed, setDefPressed] = useState(true)
  const [lgPressed, setLgPressed] = useState(false)

  const [disabledOn, setDisabledOn] = useState(true)
  const [disabledOff, setDisabledOff] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A single two-state button that toggles between pressed and not-pressed.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Toggle pressed={bold} onPressedChange={setBold} aria-label="Toggle bold">
            <Bold className="size-4" />
          </Toggle>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>`}
        />
      </section>

      {/* Outline */}
      <section id="outline" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Outline</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant="outline"</code> for an outline style.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-2">
          <Toggle pressed={outlineBold} onPressedChange={setOutlineBold} variant="outline" aria-label="Bold">
            <Bold className="size-4" />
          </Toggle>
          <Toggle pressed={outlineItalic} onPressedChange={setOutlineItalic} variant="outline" aria-label="Italic">
            <Italic className="size-4" />
          </Toggle>
          <Toggle pressed={outlineUnder} onPressedChange={setOutlineUnder} variant="outline" aria-label="Underline">
            <Underline className="size-4" />
          </Toggle>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Toggle variant="outline" aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>`}
        />
      </section>

      {/* With Text */}
      <section id="with-text" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Text</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Toggles can include both an icon and a text label.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-2">
          <Toggle pressed={textBold} onPressedChange={setTextBold} aria-label="Toggle bold">
            <Bold className="size-4" />
            Bold
          </Toggle>
          <Toggle pressed={textItalic} onPressedChange={setTextItalic} aria-label="Toggle italic">
            <Italic className="size-4" />
            Italic
          </Toggle>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Toggle aria-label="Toggle bold">
  <Bold className="size-4" />
  Bold
</Toggle>`}
        />
      </section>

      {/* Size */}
      <section id="size" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Size</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop to change the size of the toggle.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-3">
          <Toggle pressed={smPressed} onPressedChange={setSmPressed} size="sm" aria-label="Bold sm">
            <Bold className="size-3.5" />
          </Toggle>
          <Toggle pressed={defPressed} onPressedChange={setDefPressed} size="default" aria-label="Bold default">
            <Bold className="size-4" />
          </Toggle>
          <Toggle pressed={lgPressed} onPressedChange={setLgPressed} size="lg" aria-label="Bold lg">
            <Bold className="size-5" />
          </Toggle>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Toggle size="sm" aria-label="Toggle bold">
  <Bold className="size-3.5" />
</Toggle>

<Toggle size="default" aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>

<Toggle size="lg" aria-label="Toggle bold">
  <Bold className="size-5" />
</Toggle>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to prevent interaction.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-3">
          <Toggle pressed={disabledOn} onPressedChange={setDisabledOn} disabled aria-label="Bold disabled on">
            <Bold className="size-4" />
          </Toggle>
          <Toggle pressed={disabledOff} onPressedChange={setDisabledOff} disabled aria-label="Italic disabled off">
            <Italic className="size-4" />
          </Toggle>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Toggle disabled aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Toggles support RTL layouts. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-2">
          <Toggle pressed={false} onPressedChange={() => {}} variant="outline" aria-label="RTL align right">
            <AlignRight className="size-4" />
          </Toggle>
          <Toggle pressed={true} onPressedChange={() => {}} variant="outline" aria-label="RTL align center">
            <AlignCenter className="size-4" />
          </Toggle>
          <Toggle pressed={false} onPressedChange={() => {}} variant="outline" aria-label="RTL align left">
            <AlignLeft className="size-4" />
          </Toggle>
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
                <td className="p-3 font-mono text-[var(--text-main)]">pressed</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled pressed state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">defaultPressed</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Uncontrolled default state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onPressedChange</td>
                <td className="p-3 font-mono">(pressed: boolean) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback when pressed state changes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">"default" | "outline"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Visual style variant</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono">"sm" | "default" | "lg"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Size of the toggle</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Prevents interaction when true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
