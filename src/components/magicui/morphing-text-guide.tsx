"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MorphingTextDemo } from "./morphing-text-demo"

export function MorphingTextGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add morphing-text`

  const componentSourceCode = `"use client"

import React, { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const morphTime = 1.5
const cooldownTime = 0.5

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2 || !texts.length) return

      current2.style.filter = \`blur(\${Math.min(8 / fraction - 8, 100)}px)\`
      current2.style.opacity = \`\${Math.pow(fraction, 0.4) * 100}%\`

      const invertedFraction = 1 - fraction
      current1.style.filter = \`blur(\${Math.min(
        8 / invertedFraction - 8,
        100
      )}px)\`
      current1.style.opacity = \`\${Math.pow(invertedFraction, 0.4) * 100}%\`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

export interface MorphingTextProps {
  className?: string
  texts: string[]
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts)
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  )
}

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
)

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
      className
    )}
    style={{ filter: "url(#threshold) blur(0.6px)" }}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </div>
)
`

  const usageSnippet = `import { MorphingText } from "@/components/magicui/morphing-text"

const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
]

export function MorphingTextDemo() {
  return (
    <div className="flex h-64 items-center justify-center bg-black">
      <MorphingText texts={texts} className="text-white" />
    </div>
  )
}`

  return (
    <div className="space-y-10 text-[var(--text-main)]">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Morphing Text</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A dynamic text morphing component for Magic UI.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Preview
        </h3>
        <div className="relative flex min-h-[420px] w-full items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-4 sm:p-8">
          <MorphingTextDemo />
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="pt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="size-4 shrink-0 text-amber-400" />
                  <span className="text-zinc-300">{cliCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  aria-label="Copy CLI command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="pt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)]">
                Copy the component code into{" "}
                <code className="text-amber-400 bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded font-mono">
                  @/components/magicui/morphing-text.tsx
                </code>
                :
              </p>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200 max-h-[420px] overflow-y-auto">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual")}
                  className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
                  aria-label="Copy source code"
                >
                  {copiedKey === "manual" ? (
                    <Check className="size-3.5 text-green-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
                <pre className="text-zinc-300 leading-relaxed font-mono">
                  {componentSourceCode}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Usage
        </h3>
        <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-3 top-3 rounded p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors z-10 bg-zinc-900/80 backdrop-blur"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-3.5 text-green-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-zinc-300 leading-relaxed font-mono">
            {usageSnippet}
          </pre>
        </div>
      </div>

      {/* Props Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props
        </h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] border-b border-[var(--border-subtle)] font-mono">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[var(--text-main)]">
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">texts</td>
                <td className="p-3 text-zinc-400 font-normal">string[]</td>
                <td className="p-3 text-zinc-500 font-normal">[]</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Array of texts to dynamically morph between in a loop.
                </td>
                <td className="p-3 text-emerald-400 font-semibold">Yes</td>
              </tr>
              <tr className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <td className="p-3 text-amber-400 font-bold">className</td>
                <td className="p-3 text-zinc-400 font-normal">string</td>
                <td className="p-3 text-zinc-500 font-normal">""</td>
                <td className="p-3 font-sans text-xs text-[var(--text-muted)]">
                  Additional styling classes for the container.
                </td>
                <td className="p-3 text-zinc-500 font-normal">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

