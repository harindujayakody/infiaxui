import * as React from "react"
import { DirectionProvider, useDirectionController } from "@/components/shadcn/direction"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Languages, ArrowRight, ArrowLeft, Send } from "lucide-react"

function DirectionCardInner() {
  const { direction, toggleDirection, setDirection } = useDirectionController()
  const isRtl = direction === "rtl"

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Direction & Language Switcher Bar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono px-2">
          <Languages className="size-4 text-[var(--text-main)]" />
          <span>Direction: <strong className="text-[var(--text-main)] uppercase">{direction}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant={direction === "ltr" ? "default" : "outline"}
            className="h-7 px-2.5 text-xs"
            onClick={() => setDirection("ltr")}
          >
            English (LTR)
          </Button>
          <Button
            size="sm"
            variant={direction === "rtl" ? "default" : "outline"}
            className="h-7 px-2.5 text-xs font-arabic"
            onClick={() => setDirection("rtl")}
          >
            العربية (RTL)
          </Button>
        </div>
      </div>

      {/* Interactive Form Card */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-sm space-y-4 transition-all">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            {isRtl ? "تعديل الملف الشخصي" : "Edit Profile"}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            {isRtl
              ? "قم بإجراء التغييرات على ملفك الشخصي هنا وانقر على حفظ."
              : "Make changes to your profile here and click save."}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="dir-name">{isRtl ? "الاسم الكامل" : "Full Name"}</Label>
            <Input
              id="dir-name"
              defaultValue={isRtl ? "هاريندو جاياكودي" : "Harindu Jayakody"}
              className={isRtl ? "font-arabic text-right" : ""}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dir-email">{isRtl ? "البريد الإلكتروني" : "Email Address"}</Label>
            <Input
              id="dir-email"
              defaultValue="harindu@example.com"
              type="email"
              className={isRtl ? "text-right" : ""}
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-[var(--border-subtle)]">
          <Button variant="outline" size="sm" onClick={toggleDirection} className="gap-1.5 text-xs">
            {isRtl ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
            <span>{isRtl ? "تبديل الاتجاه" : "Toggle Direction"}</span>
          </Button>
          <Button size="sm" className="gap-1.5 text-xs">
            <span>{isRtl ? "حفظ التغييرات" : "Save Changes"}</span>
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function DirectionDemo() {
  return (
    <DirectionProvider defaultDirection="ltr">
      <DirectionCardInner />
    </DirectionProvider>
  )
}

export function DirectionCardRtlDemo() {
  return (
    <DirectionProvider defaultDirection="rtl">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-sm space-y-4 font-arabic text-right">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-[var(--text-main)]">الاشتراك الشهري</h4>
          <p className="text-xs text-[var(--text-muted)]">إدارة خطة اشتراكك الحالي والفواتير.</p>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-subtle)]/60 text-xs flex justify-between items-center">
          <span className="text-[var(--text-muted)]">الخطة النشطة:</span>
          <span className="font-bold text-[var(--text-main)]">الاحترافية (Pro)</span>
        </div>
        <Button size="sm" className="w-full">ترقية الخطة</Button>
      </div>
    </DirectionProvider>
  )
}

export function DirectionNestedDemo() {
  return (
    <DirectionProvider defaultDirection="ltr">
      <div className="space-y-4 w-full max-w-md">
        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs">
          Outer context is <strong>LTR</strong>
        </div>
        <DirectionProvider defaultDirection="rtl">
          <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-xs font-arabic text-right">
            السياق الداخلي يعمل باتجاه <strong>RTL</strong> بشكل مستقل.
          </div>
        </DirectionProvider>
      </div>
    </DirectionProvider>
  )
}
