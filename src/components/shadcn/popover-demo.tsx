import * as React from "react"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverClose,
} from "@/components/shadcn/popover"
import { SlidersHorizontal, Settings2, Bell, Mail, ArrowRight, Check } from "lucide-react"

export function PopoverDemo() {
  const [width, setWidth] = React.useState("100%")
  const [maxWidth, setMaxWidth] = React.useState("300px")
  const [height, setHeight] = React.useState("25px")
  const [maxHeight, setMaxHeight] = React.useState("none")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          <span>Dimensions</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3 pt-1">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width" className="text-xs">Width</Label>
            <Input
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="col-span-2 h-8 text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth" className="text-xs">Max. width</Label>
            <Input
              id="maxWidth"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
              className="col-span-2 h-8 text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height" className="text-xs">Height</Label>
            <Input
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="col-span-2 h-8 text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight" className="text-xs">Max. height</Label>
            <Input
              id="maxHeight"
              value={maxHeight}
              onChange={(e) => setMaxHeight(e.target.value)}
              className="col-span-2 h-8 text-xs font-mono"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverBasicDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings2 className="size-4" />
          <span>Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="center">
        <PopoverClose />
        <PopoverHeader>
          <PopoverTitle>Quick Settings</PopoverTitle>
          <PopoverDescription>
            Manage notification preferences and display modes.
          </PopoverDescription>
        </PopoverHeader>
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[var(--text-main)]">Desktop alerts</span>
            <span className="text-emerald-500 font-mono text-[11px] font-medium">Enabled</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[var(--text-main)]">Sound effects</span>
            <span className="text-[var(--text-muted)] font-mono text-[11px]">Muted</span>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-end">
            <Button size="sm" className="h-7 text-xs">Save changes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverAlignDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64">
          <PopoverTitle className="text-xs">Aligned to start</PopoverTitle>
          <PopoverDescription className="text-[11px]">
            This popover content is aligned to the start of the trigger button.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-64">
          <PopoverTitle className="text-xs">Aligned to center</PopoverTitle>
          <PopoverDescription className="text-[11px]">
            This popover content is centered with the trigger button.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64">
          <PopoverTitle className="text-xs">Aligned to end</PopoverTitle>
          <PopoverDescription className="text-[11px]">
            This popover content is aligned to the end of the trigger button.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function PopoverFormDemo() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="gap-2">
          <Mail className="size-4" />
          <span>Subscribe</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center">
        <PopoverClose />
        <PopoverHeader>
          <PopoverTitle>Newsletter</PopoverTitle>
          <PopoverDescription>
            Get updates on new components and framework releases.
          </PopoverDescription>
        </PopoverHeader>
        {submitted ? (
          <div className="py-4 text-center space-y-2">
            <div className="size-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="size-4" />
            </div>
            <p className="text-xs font-medium text-[var(--text-main)]">You're on the list!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-8 text-xs"
              />
            </div>
            <Button type="submit" size="sm" className="w-full h-8 text-xs gap-1.5">
              <span>Join waitlist</span>
              <ArrowRight className="size-3" />
            </Button>
          </form>
        )}
      </PopoverContent>
    </Popover>
  )
}

export function PopoverRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 font-arabic">
            <Bell className="size-4" />
            <span>الإشعارات</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 font-arabic text-right" align="start">
          <PopoverHeader>
            <PopoverTitle className="text-right">مركز الإشعارات</PopoverTitle>
            <PopoverDescription className="text-right">
              لديك ٣ إشعارات جديدة غير مقروءة اليوم.
            </PopoverDescription>
          </PopoverHeader>
          <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
            <div className="p-2 rounded-lg bg-[var(--bg-subtle)]/50">
              <div className="font-semibold">تم تحديث المكونات</div>
              <div className="text-[11px] text-[var(--text-muted)]">منذ ١٠ دقائق</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
