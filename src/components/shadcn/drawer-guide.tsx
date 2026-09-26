import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Minus, Plus, X, ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DrawerGuide() {
  const [openBottom, setOpenBottom] = useState(false)
  const [direction, setDirection] = useState<"bottom" | "top" | "left" | "right">("bottom")
  const [openSide, setOpenSide] = useState(false)
  const [goal, setGoal] = useState(350)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build fluid, swipeable bottom and edge drawers using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Drawer</code> primitives:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Drawer",
            "├── DrawerTrigger",
            "└── DrawerContent",
            "    ├── DrawerHandle (Optional drag indicator)",
            "    ├── DrawerHeader",
            "    │   ├── DrawerTitle",
            "    │   └── DrawerDescription",
            "    ├── Content Body",
            "    └── DrawerFooter",
            "        └── DrawerClose",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Bottom Drawer</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Interactive swipe-to-dismiss bottom sheet modal with step adjustment controls.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <button
            onClick={() => setOpenBottom(true)}
            className="px-4 py-2 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Open Daily Goal Drawer
          </button>

          <AnimatePresence>
            {openBottom && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenBottom(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                {/* Drawer Panel */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl border-t border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-2xl text-[var(--text-main)]"
                >
                  <div className="mx-auto w-12 h-1.5 rounded-full bg-[var(--border-subtle)] mb-6 cursor-grab" />

                  <div className="text-center space-y-1 mb-6">
                    <h3 className="text-lg font-bold">Move Goal</h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Set your daily calorie burn target.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-6 my-6">
                    <button
                      onClick={() => setGoal(Math.max(100, goal - 50))}
                      className="size-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <Minus className="size-4" />
                    </button>
                    <div className="text-center">
                      <div className="text-4xl font-extrabold tracking-tight font-mono">
                        {goal}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mt-1">
                        CALORIES / DAY
                      </div>
                    </div>
                    <button
                      onClick={() => setGoal(goal + 50)}
                      className="size-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <div className="space-y-2 mt-8">
                    <button
                      onClick={() => setOpenBottom(false)}
                      className="w-full h-10 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Save Goal
                    </button>
                    <button
                      onClick={() => setOpenBottom(false)}
                      className="w-full h-10 rounded-xl border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 text-center">
            <div className="text-7xl font-bold tracking-tighter">350</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              Calories/day
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}`}
        />
      </section>

      {/* Direction Variants */}
      <section id="directions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Edge Directions (Top, Bottom, Left, Right)</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control open direction using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">direction</code> prop.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {(["bottom", "top", "left", "right"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium border capitalize transition-colors",
                  direction === d
                    ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)]"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                )}
              >
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpenSide(true)}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Open {direction} drawer
          </button>

          <AnimatePresence>
            {openSide && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenSide(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{
                    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
                    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
                  }}
                  animate={{ x: 0, y: 0 }}
                  exit={{
                    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
                    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
                  }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={cn(
                    "fixed z-50 bg-[var(--bg-card)] border-[var(--border-subtle)] p-6 shadow-2xl flex flex-col justify-between",
                    direction === "bottom" && "bottom-0 inset-x-0 max-w-lg mx-auto rounded-t-2xl border-t",
                    direction === "top" && "top-0 inset-x-0 max-w-lg mx-auto rounded-b-2xl border-b",
                    direction === "left" && "left-0 inset-y-0 w-80 rounded-r-2xl border-r",
                    direction === "right" && "right-0 inset-y-0 w-80 rounded-l-2xl border-l"
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm capitalize">{direction} Drawer</h4>
                      <button
                        onClick={() => setOpenSide(false)}
                        className="p-1 rounded-md hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Sliding panel configured with <code className="font-mono">direction="{direction}"</code>.
                    </p>
                  </div>

                  <button
                    onClick={() => setOpenSide(false)}
                    className="w-full h-9 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold hover:opacity-90"
                  >
                    Close
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Drawer direction="${direction}">
  <DrawerTrigger asChild>
    <Button variant="outline">Open ${direction} drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>${direction.charAt(0).toUpperCase() + direction.slice(1)} Drawer</DrawerTitle>
      <DrawerDescription>Sliding drawer sheet.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Left and right drawer directions automatically mirror when text direction is set to RTL.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto text-center space-y-2">
          <h4 className="text-sm font-semibold text-[var(--text-main)]">
            لوحة تفاعلية منسدلة
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            تدعم التمرير والإغلاق السلس في بيئة اللغات من اليمين إلى اليسار.
          </p>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Drawer.direction</td>
                <td className="p-3 font-mono">"top" | "bottom" | "left" | "right"</td>
                <td className="p-3 font-mono">"bottom"</td>
                <td className="p-3">Direction edge from which the drawer animates and expands</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Drawer.dismissible</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Whether drag gestures and backdrop clicks dismiss the drawer</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Drawer.snapPoints</td>
                <td className="p-3 font-mono">(string | number)[]</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Array of fractional or pixel heights to snap between during drag</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DrawerHandle</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Pill handle visual element for tactile drag feedback</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
