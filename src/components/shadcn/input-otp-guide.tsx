import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  InputOTPDemo,
  InputOTPPatternDemo,
  InputOTPSeparatorDemo,
  InputOTPDisabledDemo,
  InputOTPControlledDemo,
  InputOTPInvalidDemo,
  InputOTPFourDigitsDemo,
  InputOTPAlphanumericDemo,
  InputOTPFormDemo,
  InputOTPRtlDemo,
} from "@/components/shadcn/input-otp-demo"

export function InputOTPGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[220px]">
          <InputOTPDemo />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-20 space-y-2">
        <h2 className="type-h2 text-[var(--text-main)]">About</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Input OTP is built on top of accessible one-time password inputs with full clipboard copy-paste and keyboard navigation functionality.
        </p>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="input-otp"
        dependencies="input-otp lucide-react"
        sourcePath="components/ui/input-otp.tsx"
        sourceCode={`import * as React from "react"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

export const REGEXP_ONLY_DIGITS = "^[0-9]+$"
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$"
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$"

// Context and components
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"`}
        />
        <CodeBlock
          language="tsx"
          code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">InputOTP</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>InputOTP</div>
          <div className="pl-4">├── InputOTPGroup</div>
          <div className="pl-8">├── InputOTPSlot</div>
          <div className="pl-8">├── InputOTPSlot</div>
          <div className="pl-8">└── InputOTPSlot</div>
          <div className="pl-4">├── InputOTPSeparator</div>
          <div className="pl-4">└── InputOTPGroup</div>
          <div className="pl-8">├── InputOTPSlot</div>
          <div className="pl-8">├── InputOTPSlot</div>
          <div className="pl-8">└── InputOTPSlot</div>
        </div>
      </section>

      {/* Pattern */}
      <section id="pattern" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Pattern</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">pattern</code> prop to define a custom regex pattern.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPPatternDemo />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { REGEXP_ONLY_DIGITS_AND_CHARS } from "@/components/ui/input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  {/* slots */}
</InputOTP>`}
        />
      </section>

      {/* Separator */}
      <section id="separator" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Separator</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;InputOTPSeparator /&gt;</code> component to place separators between groups.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPSeparatorDemo />
        </div>
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPDisabledDemo />
        </div>
      </section>

      {/* Controlled */}
      <section id="controlled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Controlled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control the value and listen to changes using <code className="font-mono text-xs">value</code> and <code className="font-mono text-xs">onChange</code>.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPControlledDemo />
        </div>
      </section>

      {/* Invalid */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid State</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Display error states and highlight invalid codes.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPInvalidDemo />
        </div>
      </section>

      {/* Four Digits */}
      <section id="four-digits" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Four Digits</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard layout for 4-digit PIN verification codes.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPFourDigitsDemo />
        </div>
      </section>

      {/* Alphanumeric */}
      <section id="alphanumeric" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Alphanumeric</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPAlphanumericDemo />
        </div>
      </section>

      {/* Form */}
      <section id="form" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Form Integration</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[300px]">
          <InputOTPFormDemo />
        </div>
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[180px]">
          <InputOTPRtlDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">InputOTP.maxLength</td>
                <td className="p-3">number</td>
                <td className="p-3">6</td>
                <td className="p-3 font-sans">Total number of characters expected in the OTP input.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">InputOTP.pattern</td>
                <td className="p-3">string</td>
                <td className="p-3">"^[0-9]+$"</td>
                <td className="p-3 font-sans">Regex pattern string to validate each character.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">InputOTPSlot.index</td>
                <td className="p-3">number</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Zero-based index of the slot inside the OTP container.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
