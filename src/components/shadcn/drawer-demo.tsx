import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import {
  Minus,
  Plus,
  Sliders,
  Layers,
  Settings2,
  Terminal,
  Activity,
  Server,
  X,
} from "lucide-react"

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer swipeDirection="down">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="size-8 rounded-full p-0"
              onClick={() => onClick(-10)}
              disabled={goal <= 200}
            >
              <Minus className="size-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-5xl font-bold tracking-tighter text-[var(--text-main)] font-mono">
                {goal}
              </div>
              <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="size-8 rounded-full p-0"
              onClick={() => onClick(10)}
              disabled={goal >= 400}
            >
              <Plus className="size-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="mt-6 h-[80px] flex items-end justify-between gap-1.5 px-4 pb-2">
            {[30, 45, 60, 40, 75, 90, 80, 65, 85, 95, 70, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[var(--text-main)]/20 hover:bg-[var(--text-main)] rounded-t transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerSlideOverDemo() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger asChild>
        <Button variant="default" className="gap-2">
          <Settings2 className="size-4" />
          <span>Slide-over Panel</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-md">
        <DrawerHeader className="border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="size-4 text-[var(--text-muted)]" />
              <DrawerTitle>Project Telemetry & Config</DrawerTitle>
            </div>
            <DrawerClose className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
              <X className="size-4" />
            </DrawerClose>
          </div>
          <DrawerDescription>
            Configure environment variables, edge runtime, and monitor live telemetry.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--text-main)] uppercase tracking-wider text-[10px] font-mono">
              Environment Variables
            </h4>
            <div className="space-y-2">
              <Label htmlFor="env-prod">DATABASE_URL</Label>
              <Input
                id="env-prod"
                defaultValue="postgres://user:***@aws.postgres.neon.tech/main"
                className="font-mono text-[11px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="env-api">API_SECRET_KEY</Label>
              <Input
                id="env-api"
                defaultValue="sk_live_948201839201"
                type="password"
                className="font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <h4 className="font-semibold text-[var(--text-main)] uppercase tracking-wider text-[10px] font-mono">
              Live Edge Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30 p-3 space-y-1">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">P99 Latency</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">18ms</div>
              </div>
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30 p-3 space-y-1">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">Memory</span>
                <div className="text-lg font-bold text-[var(--text-main)] font-mono">42 MB</div>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="border-t border-[var(--border-subtle)] pt-4">
          <Button>Save Configuration</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close Panel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerSidesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(["right", "down", "left", "up"] as const).map((side) => (
        <Drawer key={side} swipeDirection={side}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">
              {side === "down" ? "Bottom Drawer" : side === "right" ? "Right Slide-over" : `${side} Drawer`}
            </Button>
          </DrawerTrigger>
          <DrawerContent className={side === "down" || side === "up" ? "max-w-md mx-auto" : "sm:max-w-sm"}>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{side} Panel</DrawerTitle>
              <DrawerDescription>
                This drawer opens from the {side} side of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-xs text-[var(--text-muted)]">
              Interactive drawer panel content configured with <code className="font-mono text-xs">swipeDirection="{side}"</code>.
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}

export function DrawerSwipeHandleDemo() {
  return (
    <Drawer swipeDirection="down" showSwipeHandle={true}>
      <DrawerTrigger asChild>
        <Button variant="outline">Swipe Handle Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>Swipe To Dismiss</DrawerTitle>
          <DrawerDescription>Grab the top handle bar and swipe down to close.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-center text-xs text-[var(--text-muted)]">
          Swipe gesture handle is visible at the top.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerNestedDemo() {
  return (
    <Drawer swipeDirection="down">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Primary Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>First Drawer</DrawerTitle>
          <DrawerDescription>You can open another drawer on top of this one.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex justify-center">
          <Drawer swipeDirection="right">
            <DrawerTrigger asChild>
              <Button size="sm">Open Nested Slide-over</Button>
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>Stacked cleanly over the primary drawer.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Back to First Drawer</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerNonModalDemo() {
  return (
    <Drawer swipeDirection="right" modal={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Non-Modal Panel</Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Non-Modal Inspector</DrawerTitle>
          <DrawerDescription>You can still interact with the page while this is open.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-xs text-[var(--text-muted)]">
          Background clicks and scrolling remain active.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close Inspector</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerSnapPointsDemo() {
  return (
    <Drawer swipeDirection="down" snapPoints={[0.25, 0.5, 1]}>
      <DrawerTrigger asChild>
        <Button variant="outline">Snap Points (25%, 50%, 100%)</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto h-[60vh]">
        <DrawerHeader>
          <DrawerTitle>Snap Point Drawer</DrawerTitle>
          <DrawerDescription>Supports dragging between predefined height points.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-xs text-center text-[var(--text-muted)]">
          Drag up or down to snap between presets.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DrawerDialogDemo() {
  return <DrawerDemo />
}
