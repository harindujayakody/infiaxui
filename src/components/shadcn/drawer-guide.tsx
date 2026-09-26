import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  DrawerDemo,
  DrawerSlideOverDemo,
  DrawerSidesDemo,
  DrawerSwipeHandleDemo,
  DrawerNestedDemo,
  DrawerNonModalDemo,
  DrawerSnapPointsDemo,
} from "@/components/shadcn/drawer-demo"

export function DrawerGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <DrawerDemo />
        </div>
      </section>

      {/* Callout */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 p-4 text-xs text-[var(--text-muted)] space-y-1">
        <span className="font-semibold text-[var(--text-main)]">Base UI Architecture:</span>
        <p>
          The drawer component uses Base UI primitives with Framer Motion spring physics instead of Vaul for responsive multi-direction slide panels and edge drawers.
        </p>
      </div>

      {/* Slide-over Showcase */}
      <section id="slide-over" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Slide-over Panel</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A slide-over panel that opens from the edge of the screen to configure project settings, environment variables, or inspect telemetry data.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <DrawerSlideOverDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="drawer"
        dependencies="@base-ui/react framer-motion lucide-react"
        sourcePath="components/ui/drawer.tsx"
        sourceCode={`import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Context and drawer components
export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
}`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* Content here */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        />
      </section>

      {/* Composition Section */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Drawer</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Drawer</div>
          <div className="pl-4">├── DrawerTrigger</div>
          <div className="pl-4">└── DrawerContent</div>
          <div className="pl-8">├── DrawerHeader</div>
          <div className="pl-12">├── DrawerTitle</div>
          <div className="pl-12">└── DrawerDescription</div>
          <div className="pl-8">└── DrawerFooter</div>
        </div>
      </section>

      {/* Position */}
      <section id="position" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Position & Swipe Directions</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">swipeDirection</code> prop to open the drawer from any edge (<code className="font-mono text-xs">"down"</code>, <code className="font-mono text-xs">"right"</code>, <code className="font-mono text-xs">"left"</code>, or <code className="font-mono text-xs">"up"</code>).
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DrawerSidesDemo />
        </div>
      </section>

      {/* Swipe Handle */}
      <section id="swipe-handle" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Swipe Handle</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DrawerSwipeHandleDemo />
        </div>
      </section>

      {/* Nested */}
      <section id="nested" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Nested Drawers</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Open drawers from inside another drawer. Parent drawers remain stacked cleanly in the background.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DrawerNestedDemo />
        </div>
      </section>

      {/* Non-Modal */}
      <section id="non-modal" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Non-Modal</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Set <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">modal=&#123;false&#125;</code> to allow interacting with the page background while the drawer is open.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DrawerNonModalDemo />
        </div>
      </section>

      {/* Snap Points */}
      <section id="snap-points" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Snap Points</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">snapPoints</code> to snap a drawer to preset fractional heights.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DrawerSnapPointsDemo />
        </div>
      </section>

      {/* Migrating from Vaul */}
      <section id="migrating" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Migrating from Vaul</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 space-y-4 text-xs">
          <p className="text-[var(--text-muted)]">
            If you installed the previous base drawer using Vaul, update your usage to the Base UI API:
          </p>
          <div className="space-y-2 font-mono">
            <div className="p-3 rounded-lg bg-[var(--bg-subtle)]/50 space-y-1">
              <span className="text-[var(--text-muted)]">1. Direction property:</span>
              <div className="text-rose-400">- &lt;Drawer direction="bottom"&gt;</div>
              <div className="text-emerald-400">+ &lt;Drawer swipeDirection="down"&gt;</div>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-subtle)]/50 space-y-1">
              <span className="text-[var(--text-muted)]">2. Trigger trigger slot:</span>
              <div className="text-rose-400">- &lt;DrawerTrigger asChild&gt;</div>
              <div className="text-emerald-400">+ &lt;DrawerTrigger asChild&gt; or render=&#123;...&#125;</div>
            </div>
          </div>
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
                <td className="p-3 text-[var(--text-main)] font-semibold">Drawer</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Root drawer container.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">swipeDirection</td>
                <td className="p-3">"down" | "right" | "left" | "up"</td>
                <td className="p-3">"down"</td>
                <td className="p-3 font-sans">Screen edge from which the drawer slides out.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">modal</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 font-sans">Whether to display a backdrop overlay and block outside interactions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
