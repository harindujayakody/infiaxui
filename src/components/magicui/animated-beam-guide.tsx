import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  AnimatedBeamDemo,
  AnimatedBeamUniDirectionalDemo,
  AnimatedBeamBiDirectionalDemo,
  AnimatedBeamMultipleInputsDemo,
  AnimatedBeamMultipleOutputsDemo,
} from "@/components/magicui/animated-beam-demo"

export function AnimatedBeamGuide() {
  const propsData = [
    { name: "className", type: "string", default: "-", description: "The class name for the component." },
    { name: "containerRef", type: "RefObject<HTMLElement>", default: "-", description: "The container element ref." },
    { name: "fromRef", type: "RefObject<HTMLElement>", default: "-", description: "The ref of the element from which the beam starts." },
    { name: "toRef", type: "RefObject<HTMLElement>", default: "-", description: "The ref of the element to which the beam ends." },
    { name: "curvature", type: "number", default: "0", description: "The curvature of the animated beam path." },
    { name: "reverse", type: "boolean", default: "false", description: "Whether the gradient flow direction should be reversed." },
    { name: "duration", type: "number", default: "5", description: "Duration of the beam animation loop in seconds." },
    { name: "delay", type: "number", default: "0", description: "Delay before the animation starts in seconds." },
    { name: "repeat", type: "number", default: "Infinity", description: "Number of times the beam animation cycles." },
    { name: "repeatDelay", type: "number", default: "0", description: "Delay between repeated animation cycles." },
    { name: "pathColor", type: "string", default: '"gray"', description: "Background base path stroke color." },
    { name: "pathWidth", type: "number", default: "2", description: "Stroke width of the path in pixels." },
    { name: "pathOpacity", type: "number", default: "0.2", description: "Opacity of the base path." },
    { name: "gradientStartColor", type: "string", default: '"#ffaa40"', description: "Starting hex color of the animated gradient." },
    { name: "gradientStopColor", type: "string", default: '"#9c40ff"', description: "Ending hex color of the animated gradient." },
    { name: "startXOffset", type: "number", default: "0", description: "Horizontal offset for starting point." },
    { name: "startYOffset", type: "number", default: "0", description: "Vertical offset for starting point." },
    { name: "endXOffset", type: "number", default: "0", description: "Horizontal offset for ending point." },
    { name: "endYOffset", type: "number", default: "0", description: "Vertical offset for ending point." },
  ]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Examples Section */}
      <section id="examples" className="scroll-mt-20 space-y-10">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>

        {/* 1. Uni-Directional */}
        <div id="unidirectional" className="space-y-4">
          <h3 className="type-heading text-sm font-semibold text-[var(--text-main)]">
            Uni-Directional Beam
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            A single light beam streaming from a source node to a target node.
          </p>
          <div className="flex justify-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
            <AnimatedBeamUniDirectionalDemo />
          </div>
          <CodeBlock
            language="tsx"
            code={`import React, { useRef } from "react"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { User, Bot } from "lucide-react"

export function UniDirectionalDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative flex h-[180px] w-full items-center justify-between p-12">
      <div ref={fromRef} className="size-12 rounded-full border bg-card p-3">
        <User className="size-5" />
      </div>
      <div ref={toRef} className="size-12 rounded-full border bg-card p-3">
        <Bot className="size-5" />
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        gradientStartColor="#f59e0b"
        gradientStopColor="#38bdf8"
      />
    </div>
  )
}`}
          />
        </div>

        {/* 2. Bi-Directional */}
        <div id="bidirectional" className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
          <h3 className="type-heading text-sm font-semibold text-[var(--text-main)]">
            Bi-Directional Beam
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Dual opposing beams with reverse gradient direction illustrating two-way synchronization.
          </p>
          <div className="flex justify-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
            <AnimatedBeamBiDirectionalDemo />
          </div>
          <CodeBlock
            language="tsx"
            code={`{/* Forward Beam */}
<AnimatedBeam
  containerRef={containerRef}
  fromRef={fromRef}
  toRef={toRef}
  gradientStartColor="#10b981"
  gradientStopColor="#a855f7"
/>

{/* Reverse Beam */}
<AnimatedBeam
  containerRef={containerRef}
  fromRef={fromRef}
  toRef={toRef}
  reverse
  gradientStartColor="#a855f7"
  gradientStopColor="#10b981"
/>`}
          />
        </div>

        {/* 3. Multiple Inputs */}
        <div id="multiple-inputs" className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
          <h3 className="type-heading text-sm font-semibold text-[var(--text-main)]">
            Multiple Inputs
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Several distributed sources routing data to a centralized compute hub.
          </p>
          <div className="flex justify-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
            <AnimatedBeamMultipleInputsDemo />
          </div>
          <CodeBlock
            language="tsx"
            code={`<AnimatedBeam containerRef={containerRef} fromRef={in1Ref} toRef={outRef} curvature={-25} />
<AnimatedBeam containerRef={containerRef} fromRef={in2Ref} toRef={outRef} />
<AnimatedBeam containerRef={containerRef} fromRef={in3Ref} toRef={outRef} curvature={25} />`}
          />
        </div>

        {/* 4. Multiple Outputs */}
        <div id="multiple-outputs" className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
          <h3 className="type-heading text-sm font-semibold text-[var(--text-main)]">
            Multiple Outputs
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Broadcasting events or webhooks from one core emitter to multiple receivers.
          </p>
          <div className="flex justify-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
            <AnimatedBeamMultipleOutputsDemo />
          </div>
          <CodeBlock
            language="tsx"
            code={`<AnimatedBeam containerRef={containerRef} fromRef={inRef} toRef={out1Ref} curvature={-25} />
<AnimatedBeam containerRef={containerRef} fromRef={inRef} toRef={out2Ref} />
<AnimatedBeam containerRef={containerRef} fromRef={inRef} toRef={out3Ref} curvature={25} />`}
          />
        </div>
      </section>

      {/* Props Table */}
      <section id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="text-xs text-[var(--text-muted)]">
          Configuration options and custom curve parameters for <code className="text-[var(--text-main)] font-mono">AnimatedBeam</code>:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 text-[var(--text-main)]">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3 font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              {propsData.map((p) => (
                <tr key={p.name} className="hover:bg-[var(--bg-subtle)]/30 transition-colors">
                  <td className="p-3 font-semibold text-[var(--text-main)]">{p.name}</td>
                  <td className="p-3 text-sky-400">{p.type}</td>
                  <td className="p-3">{p.default}</td>
                  <td className="p-3 font-sans text-xs">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Credits */}
      <section id="credits" className="scroll-mt-20 space-y-2 pt-6 border-t border-[var(--border-subtle)]">
        <h3 className="type-heading text-xs font-semibold text-[var(--text-main)] uppercase tracking-wider">
          Credits
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Credit to <a href="https://twitter.com/itsarghyadas" target="_blank" rel="noreferrer" className="text-[var(--text-main)] underline underline-offset-4 hover:text-sky-400">@itsarghyadas</a> and the <a href="https://magicui.design" target="_blank" rel="noreferrer" className="text-[var(--text-main)] underline underline-offset-4 hover:text-sky-400">Magic UI</a> team for the foundation of this component.
        </p>
      </section>
    </div>
  )
}
