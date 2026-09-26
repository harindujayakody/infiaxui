import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  DirectionDemo,
  DirectionCardRtlDemo,
  DirectionNestedDemo,
} from "@/components/shadcn/direction-demo"

export function DirectionGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Intro Text */}
      <div className="text-sm text-[var(--text-muted)] leading-relaxed">
        The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DirectionProvider</code> component is used to set the text direction (<code className="font-mono text-xs">ltr</code> or <code className="font-mono text-xs">rtl</code>) for your application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and Persian.
      </div>

      {/* Hero Preview Section */}
      <section className="space-y-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-12 flex items-center justify-center min-h-[260px]">
          <DirectionDemo />
        </div>
      </section>

      {/* Installation Section */}
      <InstallationSection
        componentSlug="direction"
        dependencies="@base-ui/react"
        sourcePath="components/ui/direction.tsx"
        sourceCode={`import * as React from "react"

export type Direction = "ltr" | "rtl"

interface DirectionContextValue {
  direction: Direction
  setDirection: (dir: Direction) => void
  toggleDirection: () => void
}

const DirectionContext = React.createContext<DirectionContextValue>({
  direction: "ltr",
  setDirection: () => {},
  toggleDirection: () => {},
})

export function useDirection(): Direction {
  const context = React.useContext(DirectionContext)
  return context.direction
}

export function DirectionProvider({
  direction: controlledDirection,
  defaultDirection = "ltr",
  onDirectionChange,
  children,
}: {
  direction?: Direction
  defaultDirection?: Direction
  onDirectionChange?: (dir: Direction) => void
  children: React.ReactNode
}) {
  const [uncontrolledDirection, setUncontrolledDirection] = React.useState<Direction>(defaultDirection)
  const isControlled = controlledDirection !== undefined
  const direction = isControlled ? controlledDirection : uncontrolledDirection

  const setDirection = React.useCallback(
    (nextDir: Direction) => {
      if (!isControlled) setUncontrolledDirection(nextDir)
      onDirectionChange?.(nextDir)
    },
    [isControlled, onDirectionChange]
  )

  const toggleDirection = React.useCallback(() => {
    setDirection(direction === "rtl" ? "ltr" : "rtl")
  }, [direction, setDirection])

  return (
    <DirectionContext.Provider value={{ direction, setDirection, toggleDirection }}>
      <div dir={direction} data-direction={direction} className="contents">
        {children}
      </div>
    </DirectionContext.Provider>
  )
}`}
      />

      {/* Usage Section */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { DirectionProvider } from "@/components/ui/direction"`}
        />
        <CodeBlock
          language="tsx"
          code={`<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>`}
        />
      </section>

      {/* useDirection Hook */}
      <section id="hook" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">useDirection Hook</h2>
        <p className="text-sm text-[var(--text-muted)]">
          The <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">useDirection</code> hook allows any component to query the current reading direction.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}`}
        />
      </section>

      {/* RTL Card Preview */}
      <section id="rtl-card" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Card Preview</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DirectionCardRtlDemo />
        </div>
      </section>

      {/* Nested Providers */}
      <section id="nested" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Nested Direction Contexts</h2>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <DirectionNestedDemo />
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-left font-mono">
                <th className="p-3">Component / Hook</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">DirectionProvider</td>
                <td className="p-3">React.FC</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Context provider that supplies directional orientation.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">direction</td>
                <td className="p-3">"ltr" | "rtl"</td>
                <td className="p-3">"ltr"</td>
                <td className="p-3 font-sans">Controlled direction prop.</td>
              </tr>
              <tr>
                <td className="p-3 text-[var(--text-main)] font-semibold">useDirection()</td>
                <td className="p-3">() =&gt; "ltr" | "rtl"</td>
                <td className="p-3">-</td>
                <td className="p-3 font-sans">Hook returning the current active direction.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
