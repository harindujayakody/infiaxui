import * as React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card"
import { CalendarDays, Sparkles, User } from "lucide-react"
import { Button } from "./button"

export function HoverCardDemo({ direction = "ltr" }: { direction?: "ltr" | "rtl" }) {
  return (
    <HoverCard direction={direction}>
      <HoverCardTrigger asChild>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-[var(--text-main)] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          @nextjs
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
            N
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-xs font-semibold text-[var(--text-main)]">@nextjs</h4>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[var(--text-muted)]">
              <CalendarDays className="size-3 text-[var(--text-muted)]" />
              <span>Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardSidesDemo() {
  const [side, setSide] = React.useState<"top" | "right" | "bottom" | "left">("top")

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-2">
        {(["top", "right", "bottom", "left"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={side === s ? "default" : "outline"}
            onClick={() => setSide(s)}
            className="capitalize text-xs"
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="p-8 flex items-center justify-center min-h-[140px]">
        <HoverCard side={side}>
          <HoverCardTrigger>
            <Button variant="outline" size="sm">
              Hover ({side})
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-64">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-[var(--text-main)] capitalize">
                {side} Placement
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Hover card displayed dynamically on the <strong>{side}</strong> side.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

export function HoverCardDelaysDemo() {
  return (
    <HoverCard delay={100} closeDelay={200}>
      <HoverCardTrigger delay={100} closeDelay={200}>
        <Button variant="outline" size="sm">
          Quick Hover (100ms delay)
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-[var(--text-main)]">Custom Delays</h4>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Opens after 100ms and closes 200ms after mouse leaves.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex justify-center">
      <HoverCardDemo direction="rtl" />
    </div>
  )
}
