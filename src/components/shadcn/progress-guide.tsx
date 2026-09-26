import React, { useState, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

function ProgressBar({
  value = 0,
  className,
}: {
  value?: number
  className?: string
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
        className
      )}
    >
      <div
        className="h-full bg-[var(--text-main)] transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function ProgressGuide() {
  const [basicVal, setBasicVal] = useState(33)
  const [controlledVal, setControlledVal] = useState(60)
  const [liveVal, setLiveVal] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setLiveVal((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 100
          }
          return prev + 5
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Progress</code> indicator:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Progress</div>
          <div className="pl-4">├── ProgressLabel</div>
          <div className="pl-4">├── ProgressValue</div>
          <div className="pl-4">└── ProgressTrack</div>
          <div className="pl-8">└── ProgressIndicator</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A progress bar displaying completion status.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-sm space-y-3">
            <ProgressBar value={basicVal} />
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <button
                className="hover:text-[var(--text-main)] transition-colors underline"
                onClick={() => setBasicVal(Math.max(0, basicVal - 15))}
              >
                -15%
              </button>
              <span className="font-mono">{basicVal}%</span>
              <button
                className="hover:text-[var(--text-main)] transition-colors underline"
                onClick={() => setBasicVal(Math.min(100, basicVal + 15))}
              >
                +15%
              </button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Progress } from "@/components/ui/progress"

<Progress value={33} />`}
        />
      </section>

      {/* Label */}
      <section id="label" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Label & Value</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Combine with label and live percentage readouts.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[var(--text-main)]">Upload progress</span>
              <span className="font-mono text-[var(--text-muted)]">{controlledVal}%</span>
            </div>
            <ProgressBar value={controlledVal} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress value={56} className="w-full max-w-sm">
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>`}
        />
      </section>

      {/* Controlled / Live Ticker */}
      <section id="controlled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Controlled & Live Animation</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Control the progress value programmatically or with a slider.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-sm mx-auto space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--text-main)]">Downloading assets...</span>
                <span className="font-mono text-[var(--text-muted)]">{liveVal}%</span>
              </div>
              <ProgressBar value={liveVal} />
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="size-3.5 mr-1" /> : <Play className="size-3.5 mr-1" />}
                {isPlaying ? "Pause" : "Start Simulation"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsPlaying(false)
                  setLiveVal(0)
                }}
              >
                <RotateCcw className="size-3.5 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`const [progress, setProgress] = React.useState(13)

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500)
  return () => clearTimeout(timer)
}, [])

<Progress value={progress} className="w-[60%]" />`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Progress bar renders in right-to-left orientation.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[var(--text-main)]">نسبة التحميل</span>
              <span className="font-mono text-[var(--text-muted)]">75%</span>
            </div>
            <ProgressBar value={75} />
          </div>
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
                <td className="p-3 font-mono text-[var(--text-main)]">value</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3">Current progress value (0 to 100)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">max</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">100</td>
                <td className="p-3">Maximum value of the progress bar</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">getValueLabel</td>
                <td className="p-3 font-mono">(value: number, max: number) =&gt; string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Accessible label for screen readers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
