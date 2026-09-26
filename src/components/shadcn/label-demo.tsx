import * as React from "react"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"

export function LabelDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </Label>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Your email address</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
    </div>
  )
}

export function LabelInFieldDemo() {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (e.target.value && !e.target.value.includes("@")) {
      setError("Please enter a valid email address.")
    } else {
      setError("")
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-sm">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="field-email" className="font-semibold text-xs">
            Work Email
          </Label>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Required</span>
        </div>
        <Input
          id="field-email"
          type="email"
          placeholder="alex@company.com"
          value={email}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          className={error ? "border-rose-500 focus:border-rose-500" : ""}
        />
        {error ? (
          <p className="text-[11px] text-rose-500 font-medium">{error}</p>
        ) : (
          <p className="text-[11px] text-[var(--text-muted)]">
            We will use this address for billing invoices and account security.
          </p>
        )}
      </div>
      <Button size="sm" className="w-full">
        Save Email
      </Button>
    </div>
  )
}

export function LabelRtlDemo() {
  return (
    <div dir="rtl" className="w-full max-w-sm space-y-4 font-arabic text-right">
      <div className="space-y-1.5">
        <Label htmlFor="rtl-email" className="text-right block">
          عنوان البريد الإلكتروني
        </Label>
        <Input id="rtl-email" type="email" placeholder="name@domain.com" className="text-right" />
        <p className="text-[11px] text-[var(--text-muted)]">
          سنرسل لك رابط التحقق على هذا البريد.
        </p>
      </div>
    </div>
  )
}
