"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  DockDemoDirection,
  DockDemoMagnification,
} from "@/components/magicui/dock-demo"

export function DockGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import React, { useRef, type PropsWithChildren } from "react"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from "framer-motion"
import { cn } from "@/lib/utils"

export interface DockProps {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

export const dockVariants = (className?: string) =>
  cn(
    "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-2 backdrop-blur-md shadow-2xl transition-colors",
    className
  )

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants(className), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

export const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification = false,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Infinity)

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const targetSize = disableMagnification ? size : magnification

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-colors",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center size-full">{children}</div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Dock"
        componentSlug="dock"
        dependencies="framer-motion"
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/dock.tsx"
      />

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore customizable alignment directions, icon magnification settings, and distance responsiveness.
        </p>
      </div>

      {/* Example 1: Direction Alignment */}
      <div id="example-direction" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Direction Alignment
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Align dock icons to <code className="text-zinc-200 font-mono text-xs">top</code>, <code className="text-zinc-200 font-mono text-xs">middle</code>, or <code className="text-zinc-200 font-mono text-xs">bottom</code> to match specific navigation positions.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <DockDemoDirection />
        </div>
      </div>

      {/* Example 2: Magnification & Distance */}
      <div id="example-magnification" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Custom Magnification &amp; Distance
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Tune the peak icon magnification and mouse interaction radius with <code className="text-zinc-200 font-mono text-xs">iconMagnification</code> and <code className="text-zinc-200 font-mono text-xs">iconDistance</code>.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <DockDemoMagnification />
        </div>
      </div>

      {/* Example 3: Code Snippet */}
      <div id="example-code" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Usage
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Compose the <code className="text-zinc-200 font-mono text-xs">&lt;Dock&gt;</code> with child <code className="text-zinc-200 font-mono text-xs">&lt;DockIcon&gt;</code> elements and standard icons.
        </p>
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                "code-usage",
                `<Dock>\n  <DockIcon>\n    <Home className="size-5" />\n  </DockIcon>\n  <DockIcon>\n    <Terminal className="size-5" />\n  </DockIcon>\n</Dock>`
              )
            }
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            {copiedId === "code-usage" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)]">
            <code>{`<Dock>
  <DockIcon>
    <Home className="size-5" />
  </DockIcon>
  <DockIcon>
    <Terminal className="size-5" />
  </DockIcon>
</Dock>`}</code>
          </pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;Dock /&gt;</code> and <code className="text-[var(--text-main)] font-mono">&lt;DockIcon /&gt;</code>.
        </p>

        {/* Dock Props */}
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[15px] pt-2">
          Dock Props
        </h3>
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
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom styling applied to dock container.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">iconSize</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">40</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Default resting size for child icons (in px).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">iconMagnification</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">60</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Maximum size of hovered icons (in px).</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">iconDistance</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">140</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Mouse distance threshold triggering spring magnification.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">direction</td>
                <td className="p-3.5 text-[var(--text-muted)]">"top" | "middle" | "bottom"</td>
                <td className="p-3.5 text-emerald-400">"middle"</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Vertical alignment of icons within the dock container.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">disableMagnification</td>
                <td className="p-3.5 text-[var(--text-muted)]">boolean</td>
                <td className="p-3.5 text-emerald-400">false</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Disable hover zoom effect and keep static size.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DockIcon Props */}
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[15px] pt-4">
          DockIcon Props
        </h3>
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
                <td className="p-3.5 text-blue-400 font-semibold">size</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">40</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Base icon size override for this specific icon.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">magnification</td>
                <td className="p-3.5 text-[var(--text-muted)]">number</td>
                <td className="p-3.5 text-emerald-400">60</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Magnified size override for this specific icon.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom styling applied to the icon wrapper.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">children</td>
                <td className="p-3.5 text-[var(--text-muted)]">React.ReactNode</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Icon element or image content.</td>
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
            href="https://magicui.design/docs/components/dock"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>{" "}
          and inspired by macOS Dock.
        </p>
      </div>
    </div>
  )
}
