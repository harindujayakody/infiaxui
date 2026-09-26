import * as React from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  REGEXP_ONLY_DIGITS,
} from "@/components/shadcn/input-otp"
import { Button } from "@/components/shadcn/button"
import { Label } from "@/components/shadcn/label"
import { ShieldCheck, ArrowRight, Check } from "lucide-react"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6} defaultValue="123">
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
    </InputOTP>
  )
}

export function InputOTPPatternDemo() {
  return (
    <div className="space-y-2 text-center">
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} defaultValue="A1B">
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
      </InputOTP>
      <p className="text-[11px] text-[var(--text-muted)] font-mono">Accepts letters and numbers</p>
    </div>
  )
}

export function InputOTPSeparatorDemo() {
  return (
    <InputOTP maxLength={6} defaultValue="482910">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

export function InputOTPDisabledDemo() {
  return (
    <InputOTP maxLength={6} disabled defaultValue="839201">
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
    </InputOTP>
  )
}

export function InputOTPControlledDemo() {
  const [value, setValue] = React.useState("582")

  return (
    <div className="space-y-3 text-center">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
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
      </InputOTP>
      <div className="text-xs text-[var(--text-muted)] font-mono">
        Current value: <span className="text-[var(--text-main)] font-bold">{value || "(empty)"}</span>
      </div>
    </div>
  )
}

export function InputOTPInvalidDemo() {
  return (
    <div className="space-y-2 text-center">
      <div className="inline-flex rounded-lg border border-rose-500/50 p-1 bg-rose-500/5">
        <InputOTP maxLength={6} defaultValue="999">
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-rose-500 text-rose-500" />
            <InputOTPSlot index={1} className="border-rose-500 text-rose-500" />
            <InputOTPSlot index={2} className="border-rose-500 text-rose-500" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="border-rose-500 text-rose-500" />
            <InputOTPSlot index={4} className="border-rose-500 text-rose-500" />
            <InputOTPSlot index={5} className="border-rose-500 text-rose-500" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p className="text-[11px] text-rose-500 font-medium">The verification code you entered has expired.</p>
    </div>
  )
}

export function InputOTPFourDigitsDemo() {
  return (
    <div className="space-y-2 text-center">
      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} defaultValue="7492">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-[11px] text-[var(--text-muted)] font-mono">4-digit PIN code</p>
    </div>
  )
}

export function InputOTPAlphanumericDemo() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} defaultValue="GH9X2K">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

export function InputOTPFormDemo() {
  const [otp, setOtp] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-sm">
      {submitted ? (
        <div className="py-6 text-center space-y-3">
          <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <Check className="size-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[var(--text-main)]">Authentication Verified</h4>
            <p className="text-xs text-[var(--text-muted)]">Your device has been approved for access.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-center">
            <div className="size-8 rounded-full bg-[var(--bg-subtle)] text-[var(--text-main)] flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="size-4" />
            </div>
            <Label className="text-sm font-semibold">Two-Factor Authentication</Label>
            <p className="text-xs text-[var(--text-muted)]">
              Enter the 6-digit code sent to your authenticator app.
            </p>
          </div>

          <div className="flex justify-center py-2">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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
            </InputOTP>
          </div>

          <Button type="submit" size="sm" className="w-full gap-2" disabled={otp.length !== 6}>
            <span>Verify Account</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </form>
      )}
    </div>
  )
}

export function InputOTPRtlDemo() {
  return (
    <div dir="rtl" className="space-y-3 text-center font-arabic">
      <Label className="text-xs block">رمز التحقق السريع</Label>
      <div className="flex justify-center">
        <InputOTP maxLength={6} defaultValue="519284">
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
        </InputOTP>
      </div>
    </div>
  )
}
