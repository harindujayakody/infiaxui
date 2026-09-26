"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { WarpBackgroundCustomDemo } from "@/components/magicui/warp-background-demo"

export function WarpBackgroundGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import React, { useCallback, useMemo, type HTMLAttributes } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

interface BeamProps {
  width: string | number
  x: string | number
  delay: number
  duration: number
}

const Beam = ({ width, x, delay, duration }: BeamProps) => {
  const hue = useMemo(() => Math.floor(Math.random() * 360), [])
  const ar = useMemo(() => Math.floor(Math.random() * 10) + 1, [])

  return (
    <motion.div
      style={
        {
          left: typeof x === "number" ? \`\${x}%\` : x,
          width: typeof width === "number" ? \`\${width}%\` : width,
          aspectRatio: \`1 / \${ar}\`,
          background: \`linear-gradient(hsl(\${hue} 80% 60%), transparent)\`,
        } as React.CSSProperties
      }
      className="absolute top-0 pointer-events-none"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border-subtle, rgba(255, 255, 255, 0.12))",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ x, delay })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams = useMemo(() => generateBeams(), [generateBeams])

  const sideStyle: React.CSSProperties = {
    backgroundImage: \`linear-gradient(\${gridColor} 0 1px, transparent 1px \${beamSize}%), linear-gradient(90deg, \${gridColor} 0 1px, transparent 1px \${beamSize}%)\`,
    backgroundSize: \`\${beamSize}% \${beamSize}%\`,
    backgroundPosition: "50% -0.5px, 50% 50%",
    transformStyle: "preserve-3d",
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-16",
        className
      )}
      {...props}
    >
      <div
        style={{
          perspective: \`\${perspective}px\`,
          transformStyle: "preserve-3d",
          containerType: "size",
          clipPath: "inset(0)",
        }}
        className="pointer-events-none absolute inset-0 size-full overflow-hidden"
      >
        {/* top side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotateX(-90deg)",
            transformOrigin: "50% 0%",
            height: "100cqmax",
            width: "100cqi",
          }}
          className="absolute top-0 left-0 z-20"
        >
          {topBeams.map((beam, index) => (
            <Beam
              key={\`top-\${index}\`}
              width={\`\${beamSize}%\`}
              x={\`\${beam.x * beamSize}%\`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* bottom side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotateX(-90deg)",
            transformOrigin: "50% 0%",
            height: "100cqmax",
            width: "100cqi",
          }}
          className="absolute top-full left-0 z-20"
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={\`bottom-\${index}\`}
              width={\`\${beamSize}%\`}
              x={\`\${beam.x * beamSize}%\`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* left side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotate(90deg) rotateX(-90deg)",
            transformOrigin: "0% 0%",
            height: "100cqmax",
            width: "100cqh",
          }}
          className="absolute top-0 left-0 z-20"
        >
          {leftBeams.map((beam, index) => (
            <Beam
              key={\`left-\${index}\`}
              width={\`\${beamSize}%\`}
              x={\`\${beam.x * beamSize}%\`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>

        {/* right side */}
        <div
          style={{
            ...sideStyle,
            transform: "rotate(-90deg) rotateX(-90deg)",
            transformOrigin: "100% 0%",
            height: "100cqmax",
            width: "100cqh",
          }}
          className="absolute top-0 right-0 z-20"
        >
          {rightBeams.map((beam, index) => (
            <Beam
              key={\`right-\${index}\`}
              width={\`\${beamSize}%\`}
              x={\`\${beam.x * beamSize}%\`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>

      <div className="relative z-30">{children}</div>
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Warp Background"
        componentSlug="warp-background"
        dependencies="framer-motion"
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/warp-background.tsx"
      />

      {/* Usage Section */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Embed hero text, callout cards, or celebration modals inside <code className="text-zinc-200 font-mono text-xs">&lt;WarpBackground&gt;</code> to create an immersive 3D grid tunnel.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "usage-warp",
                `import { WarpBackground } from "@/components/magicui/warp-background"\n\nexport function WarpDemo() {\n  return (\n    <WarpBackground>\n      <div className="w-80 rounded-xl bg-zinc-900/90 p-6">\n        <h4 className="font-semibold text-white">Congratulations on Your Promotion!</h4>\n        <p className="text-xs text-zinc-400 mt-2">Your hard work and dedication have paid off.</p>\n      </div>\n    </WarpBackground>\n  )\n}`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "usage-warp" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`import { WarpBackground } from "@/components/magicui/warp-background"

export function WarpDemo() {
  return (
    <WarpBackground>
      <div className="w-80 rounded-xl bg-zinc-900/90 p-6">
        <h4 className="font-semibold text-white">Congratulations on Your Promotion!</h4>
        <p className="text-xs text-zinc-400 mt-2">Your hard work and dedication have paid off.</p>
      </div>
    </WarpBackground>
  )
}`}</code>
          </pre>
        </div>
      </div>

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Tune the tunnel perspective depth, beam count, and travel velocities.
        </p>
      </div>

      {/* Example: High-Speed Warp Tunnel */}
      <div id="example-custom" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Hyperdrive Acceleration
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Speed up the relativistic particle flow with accelerated duration and increased beam density.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <WarpBackgroundCustomDemo />
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;WarpBackground /&gt;</code>.
        </p>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-[var(--text-muted)]">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">children</td>
                <td className="p-3.5 text-[var(--text-muted)]">React.ReactNode</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Content placed in center of warp tunnel.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">perspective</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">100</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">3D CSS perspective depth in pixels.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">beamsPerSide</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">3</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Number of animated beams traversing each side.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">beamSize</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">5</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Width and grid cell size percentage.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">beamDuration</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">3</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Travel cycle duration in seconds.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">beamDelayMin</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">0</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Minimum random delay offset for beams.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">beamDelayMax</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">3</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Maximum random delay offset for beams.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">gridColor</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-emerald-400">"var(--border-subtle)"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Color of the 3D perspective grid lines.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits Section */}
      <div id="credits" className="scroll-mt-20 space-y-2 pt-6 border-t border-[var(--border-subtle)] text-[13px] text-[var(--text-muted)]">
        <h4 className="font-semibold text-[var(--text-main)] text-[14px]">Credits</h4>
        <p>
          Component designed and credited to{" "}
          <a
            href="https://magicui.design/docs/components/warp-background"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @magicui <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
