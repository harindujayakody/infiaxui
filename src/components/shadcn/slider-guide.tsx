import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

function Slider({ value: cv, defaultValue = [33], min = 0, max = 100, step = 1, orientation = "horizontal", disabled = false, onValueChange }: any) {
  const [iv, setIv] = useState(defaultValue)
  const value = cv ?? iv
  const handle = (i: number, raw: number) => {
    const c = Math.round(Math.max(min, Math.min(max, raw)) / step) * step
    const n = [...value]; n[i] = c; if (n.length > 1) n.sort((a: number, b: number) => a - b)
    onValueChange ? onValueChange(n) : setIv(n)
  }
  const pct = (v: number) => ((v - min) / (max - min)) * 100

  if (orientation === "vertical") return (
    <div className="relative flex justify-center h-40 w-5 mx-auto">
      <div className="absolute top-0 bottom-0 w-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]" />
      <div className="absolute w-1.5 rounded-full bg-[var(--text-main)]" style={{ bottom: 0, height: `${pct(value[0])}%` }} />
      {value.map((v: number, i: number) => (
        <React.Fragment key={i}>
          <input type="range" min={min} max={max} step={step} value={v} disabled={disabled} onChange={e => handle(i, +e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" style={{ writingMode: "vertical-lr", direction: "rtl" } as any} />
          <div className={cn("absolute left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-[var(--bg-page)] bg-[var(--text-main)] shadow-md", disabled && "opacity-50")}
            style={{ bottom: `calc(${pct(v)}% - 8px)` }} />
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="relative flex items-center w-full h-5">
      <div className="absolute left-0 right-0 h-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)]" />
      {value.length > 1
        ? <div className="absolute h-1.5 rounded-full bg-[var(--text-main)]" style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[value.length - 1])}%` }} />
        : <div className="absolute h-1.5 rounded-full bg-[var(--text-main)]" style={{ left: 0, width: `${pct(value[0])}%` }} />}
      {value.map((v: number, i: number) => (
        <React.Fragment key={i}>
          <input type="range" min={min} max={max} step={step} value={v} disabled={disabled} onChange={e => handle(i, +e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed" />
          <div className={cn("absolute size-4 rounded-full border-2 border-[var(--bg-page)] bg-[var(--text-main)] shadow-md -translate-x-1/2", disabled && "opacity-50")}
            style={{ left: `${pct(v)}%` }} />
        </React.Fragment>
      ))}
    </div>
  )
}

export function SliderGuide() {
  const [basic, setBasic] = useState([33])
  const [range, setRange] = useState([25, 75])
  const [multi, setMulti] = useState([20, 50, 80])
  const [controlled, setControlled] = useState([60])

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">A simple slider. Current value: <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">{basic[0]}</code></p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs"><Slider value={basic} onValueChange={setBasic} /></div>
        </div>
        <CodeBlock language="tsx" code={`import { Slider } from "@/components/ui/slider"\n\n<Slider defaultValue={[33]} max={100} step={1} />`} />
      </section>

      <section id="range" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Range</h2>
        <p className="text-sm text-[var(--text-muted)]">Use two values for a range slider. Current: <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">[{range[0]}, {range[1]}]</code></p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs"><Slider value={range} onValueChange={setRange} /></div>
        </div>
        <CodeBlock language="tsx" code={`<Slider defaultValue={[25, 75]} max={100} step={1} />`} />
      </section>

      <section id="multiple" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Multiple Thumbs</h2>
        <p className="text-sm text-[var(--text-muted)]">Use multiple values for multiple thumbs. Current: <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">[{multi.join(", ")}]</code></p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs"><Slider value={multi} onValueChange={setMulti} /></div>
        </div>
        <CodeBlock language="tsx" code={`<Slider defaultValue={[20, 50, 80]} max={100} step={1} />`} />
      </section>

      <section id="vertical" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Vertical</h2>
        <p className="text-sm text-[var(--text-muted)]">Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for a vertical slider.</p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center gap-10">
          <Slider orientation="vertical" defaultValue={[30]} /><Slider orientation="vertical" defaultValue={[60]} /><Slider orientation="vertical" defaultValue={[90]} />
        </div>
        <CodeBlock language="tsx" code={`<Slider orientation="vertical" defaultValue={[30]} />`} />
      </section>

      <section id="controlled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Controlled</h2>
        <p className="text-sm text-[var(--text-muted)]">A fully controlled slider bound to external state with ±10 buttons.</p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-5">
          <div className="w-full max-w-xs"><Slider value={controlled} onValueChange={setControlled} /></div>
          <div className="flex items-center gap-3">
            <button className="size-7 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs font-bold hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors" onClick={() => setControlled([Math.max(0, controlled[0] - 10)])}>−</button>
            <div className="w-16 text-center"><span className="text-xl font-semibold">{controlled[0]}</span><span className="text-xs text-[var(--text-muted)] ml-0.5">/ 100</span></div>
            <button className="size-7 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-xs font-bold hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors" onClick={() => setControlled([Math.min(100, controlled[0] + 10)])}>+</button>
          </div>
        </div>
        <CodeBlock language="tsx" code={`const [value, setValue] = useState([60])\n\n<Slider value={value} onValueChange={setValue} max={100} step={1} />`} />
      </section>

      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop to prevent interaction.</p>
        <div className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center opacity-60">
          <div className="w-full max-w-xs"><Slider defaultValue={[40]} disabled /></div>
        </div>
        <CodeBlock language="tsx" code={`<Slider defaultValue={[40]} disabled />`} />
      </section>

      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">Sliders support RTL layout. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.</p>
        <div dir="rtl" className="p-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="w-full max-w-xs"><Slider defaultValue={[60]} /></div>
        </div>
      </section>

      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]"><tr><th className="p-3 font-semibold">Prop</th><th className="p-3 font-semibold">Type</th><th className="p-3 font-semibold">Default</th><th className="p-3 font-semibold">Description</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              {[["defaultValue","number[]","[0]","Initial value (uncontrolled)"],["value","number[]","-","Controlled value array"],["onValueChange","(v: number[]) => void","-","Callback on change"],["min","number","0","Minimum value"],["max","number","100","Maximum value"],["step","number","1","Increment step"],["orientation",'"horizontal" | "vertical"','"horizontal"',"Layout direction"],["disabled","boolean","false","Prevents interaction"]].map(([p,t,d,desc]) => (
                <tr key={p}><td className="p-3 font-mono text-[var(--text-main)]">{p}</td><td className="p-3 font-mono">{t}</td><td className="p-3 font-mono">{d}</td><td className="p-3">{desc}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
