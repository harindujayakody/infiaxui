import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ---------- Minimal self-contained ToggleGroup primitives ----------
interface ToggleGroupItemProps {
  value: string
  pressed?: boolean
  onPress?: (value: string) => void
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

function TGItem({
  value,
  pressed = false,
  onPress,
  children,
  variant = "default",
  size = "default",
  disabled = false,
  className,
  ...rest
}: ToggleGroupItemProps) {
  const sizes = {
    sm: "h-7 px-2 text-xs",
    default: "h-9 px-3 text-sm",
    lg: "h-10 px-4 text-sm",
  }
  return (
    <button
      type="button"
      role="radio"
      aria-checked={pressed}
      data-state={pressed ? "on" : "off"}
      disabled={disabled}
      onClick={() => !disabled && onPress?.(value)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizes[size],
        variant === "outline"
          ? cn(
              "border border-[var(--border-subtle)]",
              pressed
                ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/60 hover:text-[var(--text-main)]"
            )
          : cn(
              pressed
                ? "bg-[var(--bg-subtle)] text-[var(--text-main)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/60 hover:text-[var(--text-main)]"
            ),
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

interface ToggleGroupProps {
  type: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  orientation?: "horizontal" | "vertical"
  spacing?: number
  className?: string
  disabled?: boolean
}

function TG({
  type,
  value,
  onValueChange,
  children,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  spacing = 2,
  className,
  disabled = false,
}: ToggleGroupProps) {
  const gap = spacing === 0 ? "gap-0" : spacing === 2 ? "gap-2" : "gap-1"
  return (
    <div
      role="group"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        gap,
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        const itemValue = (child.props as any).value as string
        let pressed = false
        if (type === "single") {
          pressed = value === itemValue
        } else {
          pressed = Array.isArray(value) ? value.includes(itemValue) : false
        }
        return React.cloneElement(child as React.ReactElement<any>, {
          pressed,
          variant,
          size,
          disabled: disabled || (child.props as any).disabled,
          onPress: (v: string) => {
            if (!onValueChange) return
            if (type === "single") {
              onValueChange(v)
            } else {
              const arr = Array.isArray(value) ? value : []
              if (arr.includes(v)) {
                onValueChange(arr.filter((x) => x !== v))
              } else {
                onValueChange([...arr, v])
              }
            }
          },
        })
      })}
    </div>
  )
}

export function ToggleGroupGuide() {
  const [format, setFormat] = useState<string[]>(["bold"])
  const [align, setAlign] = useState("center")
  const [outlineAlign, setOutlineAlign] = useState("left")
  const [size, setSize] = useState("md")
  const [spacedAlign, setSpacedAlign] = useState("left")
  const [verticalAlign, setVerticalAlign] = useState("center")
  const [fontWeight, setFontWeight] = useState<string[]>(["bold"])

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A grouped set of toggles. Supports both <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">single</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">multiple</code> selection.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <TG type="multiple" value={format} onValueChange={(v) => setFormat(v as string[])}>
            <TGItem value="bold" aria-label="Toggle bold"><Bold className="size-4" /></TGItem>
            <TGItem value="italic" aria-label="Toggle italic"><Italic className="size-4" /></TGItem>
            <TGItem value="underline" aria-label="Toggle underline"><Underline className="size-4" /></TGItem>
          </TG>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="size-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
        />
      </section>

      {/* Outline */}
      <section id="outline" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Outline</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">variant="outline"</code> for an outline style.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <TG type="single" value={outlineAlign} onValueChange={(v) => setOutlineAlign(v as string)} variant="outline">
            <TGItem value="left" aria-label="Align left"><AlignLeft className="size-4" /></TGItem>
            <TGItem value="center" aria-label="Align center"><AlignCenter className="size-4" /></TGItem>
            <TGItem value="right" aria-label="Align right"><AlignRight className="size-4" /></TGItem>
          </TG>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="single" variant="outline">
  <ToggleGroupItem value="left"><AlignLeft className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight className="size-4" /></ToggleGroupItem>
</ToggleGroup>`}
        />
      </section>

      {/* Size */}
      <section id="size" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Size</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop to change the size of the toggle group.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-4">
          <TG type="single" value={size + "-sm"} onValueChange={(v) => setSize(v as string)} size="sm">
            <TGItem value="sm-left"><AlignLeft className="size-3.5" /></TGItem>
            <TGItem value="sm-center"><AlignCenter className="size-3.5" /></TGItem>
            <TGItem value="sm-right"><AlignRight className="size-3.5" /></TGItem>
          </TG>
          <TG type="single" value={align} onValueChange={(v) => setAlign(v as string)} size="default">
            <TGItem value="left"><AlignLeft className="size-4" /></TGItem>
            <TGItem value="center"><AlignCenter className="size-4" /></TGItem>
            <TGItem value="right"><AlignRight className="size-4" /></TGItem>
          </TG>
          <TG type="single" value={size + "-lg"} onValueChange={(v) => setSize(v as string)} size="lg">
            <TGItem value="lg-left"><AlignLeft className="size-5" /></TGItem>
            <TGItem value="lg-center"><AlignCenter className="size-5" /></TGItem>
            <TGItem value="lg-right"><AlignRight className="size-5" /></TGItem>
          </TG>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="single" size="sm">...</ToggleGroup>
<ToggleGroup type="single" size="default">...</ToggleGroup>
<ToggleGroup type="single" size="lg">...</ToggleGroup>`}
        />
      </section>

      {/* Spacing */}
      <section id="spacing" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Spacing</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">spacing</code> to add spacing between items. Default changed to <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">2</code> in v2026-05-17. Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">spacing={"{"} 0 {"}"}</code> for connected items.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-6">
          <div className="space-y-2 text-center">
            <p className="text-xs text-[var(--text-muted)]">spacing=0 (connected)</p>
            <TG type="single" value={spacedAlign} onValueChange={(v) => setSpacedAlign(v as string)} spacing={0} variant="outline">
              <TGItem value="left"><AlignLeft className="size-4" /></TGItem>
              <TGItem value="center"><AlignCenter className="size-4" /></TGItem>
              <TGItem value="right"><AlignRight className="size-4" /></TGItem>
            </TG>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xs text-[var(--text-muted)]">spacing=2 (default — spaced)</p>
            <TG type="single" value={align} onValueChange={(v) => setAlign(v as string)} spacing={2}>
              <TGItem value="left"><AlignLeft className="size-4" /></TGItem>
              <TGItem value="center"><AlignCenter className="size-4" /></TGItem>
              <TGItem value="right"><AlignRight className="size-4" /></TGItem>
            </TG>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`{/* Connected items */}
<ToggleGroup type="single" spacing={0} variant="outline">...</ToggleGroup>

{/* Spaced items (default) */}
<ToggleGroup type="single" spacing={2}>...</ToggleGroup>`}
        />
      </section>

      {/* Vertical */}
      <section id="vertical" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Vertical</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for vertical toggle groups.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <TG type="single" value={verticalAlign} onValueChange={(v) => setVerticalAlign(v as string)} orientation="vertical">
            <TGItem value="top" aria-label="Align top"><AlignLeft className="size-4 rotate-90" /></TGItem>
            <TGItem value="center" aria-label="Align center"><AlignCenter className="size-4 rotate-90" /></TGItem>
            <TGItem value="bottom" aria-label="Align bottom"><AlignRight className="size-4 rotate-90" /></TGItem>
          </TG>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="single" orientation="vertical">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Disable the entire group with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code>, or disable individual items.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-4">
          <TG type="multiple" value={["bold"]} disabled>
            <TGItem value="bold"><Bold className="size-4" /></TGItem>
            <TGItem value="italic"><Italic className="size-4" /></TGItem>
            <TGItem value="underline"><Underline className="size-4" /></TGItem>
          </TG>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ToggleGroup type="multiple" disabled>
  <ToggleGroupItem value="bold"><Bold className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="size-4" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="size-4" /></ToggleGroupItem>
</ToggleGroup>`}
        />
      </section>

      {/* Custom — Font Weight Selector */}
      <section id="custom" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Custom</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Compose <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ToggleGroup</code> with labels and helper text to build rich selectors.
        </p>
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="space-y-2 w-full max-w-xs">
            <p className="text-xs font-medium text-[var(--text-main)]">Font weight</p>
            <TG type="multiple" value={fontWeight} onValueChange={(v) => setFontWeight(v as string[])} variant="outline" spacing={2}>
              <TGItem value="light" className="flex-1 font-light">Light</TGItem>
              <TGItem value="regular" className="flex-1">Regular</TGItem>
              <TGItem value="bold" className="flex-1 font-bold">Bold</TGItem>
            </TG>
            <p className="text-xs text-[var(--text-muted)]">
              Selected: {fontWeight.length > 0 ? fontWeight.join(", ") : "none"}
            </p>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<div className="space-y-2">
  <p className="text-xs font-medium">Font weight</p>
  <ToggleGroup type="multiple" variant="outline">
    <ToggleGroupItem value="light" className="flex-1 font-light">Light</ToggleGroupItem>
    <ToggleGroupItem value="regular" className="flex-1">Regular</ToggleGroupItem>
    <ToggleGroupItem value="bold" className="flex-1 font-bold">Bold</ToggleGroupItem>
  </ToggleGroup>
</div>`}
        />
      </section>

      {/* Changelog */}
      <section id="changelog" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Changelog</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">2026-05-17</span>
              <span className="text-xs font-semibold text-[var(--text-main)]">Default Spacing</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Changed the default <code className="text-[var(--text-main)] font-mono">spacing</code> from <code className="text-[var(--text-main)] font-mono">0</code> to <code className="text-[var(--text-main)] font-mono">2</code> so toggle groups render with space between items by default. Use <code className="text-[var(--text-main)] font-mono">spacing={"{"}0{"}"}</code> for connected items.
            </p>
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
                <td className="p-3 font-mono">"single" | "multiple"</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Selection mode</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">value</td>
                <td className="p-3 font-mono">string | string[]</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled selected value(s)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">onValueChange</td>
                <td className="p-3 font-mono">(v: string | string[]) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback on selection change</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">variant</td>
                <td className="p-3 font-mono">"default" | "outline"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Visual style</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono">"sm" | "default" | "lg"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Size of each item</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">orientation</td>
                <td className="p-3 font-mono">"horizontal" | "vertical"</td>
                <td className="p-3 font-mono">"horizontal"</td>
                <td className="p-3">Layout direction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">spacing</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">2</td>
                <td className="p-3">Gap between items (0 = connected)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Disables all items in the group</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
