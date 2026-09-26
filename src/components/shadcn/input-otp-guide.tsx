import React, { useState, useRef } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

function OTPInput({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  invalid = false,
  hasSeparator = true,
}: {
  length?: number
  value?: string
  onChange?: (val: string) => void
  disabled?: boolean
  invalid?: boolean
  hasSeparator?: boolean
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(-1)
    const chars = value.split("")
    chars[index] = val
    const next = chars.join("")
    onChange?.(next)
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").slice(0, length)
    onChange?.(pasted)
  }

  const half = Math.floor(length / 2)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 divide-x divide-[var(--border-subtle)]">
        {Array.from({ length: half }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            aria-invalid={invalid}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              "size-10 text-center font-mono text-sm font-semibold bg-transparent focus:outline-none focus:bg-[var(--bg-subtle)] text-[var(--text-main)]",
              invalid && "text-red-400"
            )}
          />
        ))}
      </div>

      {hasSeparator && <span className="text-[var(--text-muted)] font-bold">-</span>}

      <div className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1 divide-x divide-[var(--border-subtle)]">
        {Array.from({ length: length - half }).map((_, i) => {
          const idx = half + i
          return (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              disabled={disabled}
              aria-invalid={invalid}
              value={value[idx] || ""}
              onChange={(e) => handleChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className={cn(
                "size-10 text-center font-mono text-sm font-semibold bg-transparent focus:outline-none focus:bg-[var(--bg-subtle)] text-[var(--text-main)]",
                invalid && "text-red-400"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

export function InputOTPGuide() {
  const [otp6, setOtp6] = useState("123456")
  const [pin4, setPin4] = useState("")
  const [verified, setVerified] = useState(false)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">InputOTP</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "InputOTP",
            "├── InputOTPGroup",
            "│   ├── InputOTPSlot",
            "│   ├── InputOTPSlot",
            "│   └── InputOTPSlot",
            "├── InputOTPSeparator",
            "└── InputOTPGroup",
            "    ├── InputOTPSlot",
            "    ├── InputOTPSlot",
            "    └── InputOTPSlot",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* 6-Digit Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">6-Digit Verification Code</h2>
        <p className="text-sm text-[var(--text-muted)]">
          One-time password component supporting auto-advance, backspace navigation, and clipboard paste.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-4">
          <OTPInput length={6} value={otp6} onChange={setOtp6} />
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span>Entered code: <strong className="font-mono text-[var(--text-main)]">{otp6 || "(empty)"}</strong></span>
            {otp6.length === 6 && (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="size-3.5" /> Complete
              </span>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
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

      {/* 4-Digit PIN */}
      <section id="four-digits" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">4-Digit PIN</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A compact 4-digit layout for security PIN authentication.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-4">
          <OTPInput length={4} value={pin4} onChange={setPin4} hasSeparator={false} />
          <Button
            size="sm"
            disabled={pin4.length < 4}
            onClick={() => setVerified(true)}
          >
            Verify PIN
          </Button>
          {verified && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3.5" /> PIN successfully validated!
            </p>
          )}
        </div>
        <CodeBlock
          language="tsx"
          code={`<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </section>

      {/* Invalid State */}
      <section id="invalid" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Invalid State</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Highlight error state when the verification code is incorrect or expired.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-3">
          <OTPInput length={6} value="987654" invalid />
          <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="size-3.5" />
            Invalid verification code. Please check and try again.
          </p>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Field data-invalid>
  <InputOTP maxLength={6} aria-invalid>
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
    </InputOTPGroup>
  </InputOTP>
  <FieldError>Invalid verification code.</FieldError>
</Field>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Input OTP supports RTL layout with left-to-right digit sequence preservation.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <OTPInput length={6} value="456123" />
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
                <td className="p-3 font-mono text-[var(--text-main)]">maxLength</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">6</td>
                <td className="p-3">Total number of input character slots</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">pattern</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">"^[0-9]+$"</td>
                <td className="p-3">Regex pattern to constrain character input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">disabled</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">false</td>
                <td className="p-3">Disables all slot inputs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
