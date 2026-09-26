"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AnimatedShinyTextDemo,
  AnimatedShinyTextHeadlineDemo,
} from "./animated-shiny-text-demo"

export function AnimatedShinyTextGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @magicui/animated-shiny-text`

  const componentSourceCode = `import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": \`\${shimmerWidth}px\`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",

        // Shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}`

  const cssKeyframesCode = `@keyframes shiny-text {
  0%,
  90%,
  100% {
    background-position: calc(-100% - var(--shiny-width, 100px)) 0;
  }
  30%,
  60% {
    background-position: calc(100% + var(--shiny-width, 100px)) 0;
  }
}

.animate-shiny-text {
  animation: shiny-text 8s infinite;
  background-size: var(--shiny-width, 100px) 100%;
  background-position: 0 0;
}`

  const usageSnippet = `import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { ArrowRight } from "lucide-react"

export function Example() {
  return (
    <div className="group rounded-full border border-white/10 bg-[#161616] px-4 py-1.5 text-sm text-zinc-300 transition-all hover:bg-zinc-800 inline-flex items-center">
      <AnimatedShinyText className="inline-flex items-center justify-center">
        <span>✨ Introducing Magic UI</span>
        <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
      </AnimatedShinyText>
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#161616] border border-[#262626] p-1 rounded-xl">
            <TabsTrigger
              value="cli"
              className="text-xs font-medium text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white rounded-lg px-4 py-1.5 transition-all"
            >
              CLI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="text-xs font-medium text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white rounded-lg px-4 py-1.5 transition-all"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab Content */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-zinc-400" />
                  <code>{cliCode}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  aria-label="Copy CLI command"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab Content */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-3">
              <p className="text-[13px] text-zinc-400">
                1. Copy and paste the following code into your project at{" "}
                <code className="text-zinc-200 font-mono text-xs">
                  components/magicui/animated-shiny-text.tsx
                </code>
              </p>
              <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs overflow-x-auto max-h-[350px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "source")}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors z-10"
                  aria-label="Copy component code"
                >
                  {copiedKey === "source" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre className="text-zinc-300">
                  <code>{componentSourceCode}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[13px] text-zinc-400">
                2. Add the required keyframes and animation to your global CSS (or tailwind.config.js):
              </p>
              <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs overflow-x-auto max-h-[260px]">
                <button
                  onClick={() => copyToClipboard(cssKeyframesCode, "css")}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors z-10"
                  aria-label="Copy css animation code"
                >
                  {copiedKey === "css" ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
                <pre className="text-zinc-300">
                  <code>{cssKeyframesCode}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Examples Header */}
      <section className="space-y-6 pt-6 border-t border-[#262626]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Examples</h2>
          <p className="text-[13px] text-zinc-400 mt-1">
            Showcase of announcement badges and high-contrast headline shimmering effects.
          </p>
        </div>

        {/* Example 1: Announcement Pill */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Announcement Badge</h3>
          <p className="text-[13px] text-zinc-400">
            A rounded pill container with glare highlight panning seamlessly across the label.
          </p>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-hidden flex items-center justify-center p-6">
            <AnimatedShinyTextDemo />
          </div>
        </div>

        {/* Example 2: Headline Shimmer */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Headline Glare</h3>
          <p className="text-[13px] text-zinc-400">
            Apply shimmering reflections over bold hero titles with custom <code className="text-zinc-200 font-mono text-xs">shimmerWidth</code>.
          </p>
          <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-hidden flex items-center justify-center p-6">
            <AnimatedShinyTextHeadlineDemo />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="space-y-4 pt-6 border-t border-[#262626]">
        <h2 className="text-xl font-bold tracking-tight text-white">Usage</h2>
        <div className="relative rounded-2xl border border-[#262626] bg-[#161616] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => copyToClipboard(usageSnippet, "usage")}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors z-10"
            aria-label="Copy usage code"
          >
            {copiedKey === "usage" ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
          <pre className="text-zinc-300">
            <code>{usageSnippet}</code>
          </pre>
        </div>
      </section>

      {/* Props Reference Table */}
      <section className="space-y-4 pt-6 border-t border-[#262626]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Props</h2>
          <p className="text-[13px] text-zinc-400 mt-1">
            API reference properties for <code className="text-zinc-200 font-mono text-xs">&lt;AnimatedShinyText /&gt;</code>.
          </p>
        </div>
        <div className="rounded-2xl border border-[#262626] bg-[#161616] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[#262626] bg-[#181818] text-zinc-400">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-zinc-300">
              <tr>
                <td className="p-3.5 text-zinc-200 font-semibold">children</td>
                <td className="p-3.5 text-zinc-400">React.ReactNode</td>
                <td className="p-3.5 text-zinc-400">—</td>
                <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                  The text or inline icon element to be shimmered.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-zinc-200 font-semibold">shimmerWidth</td>
                <td className="p-3.5 text-zinc-400">number</td>
                <td className="p-3.5 text-zinc-300">100</td>
                <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                  The width of the gradient shimmer sweep in pixels.
                </td>
              </tr>
              <tr>
                <td className="p-3.5 text-zinc-200 font-semibold">className</td>
                <td className="p-3.5 text-zinc-400">string</td>
                <td className="p-3.5 text-zinc-400">—</td>
                <td className="p-3.5 font-sans text-zinc-400 text-[13px]">
                  Optional CSS class name for extra styling and hover states.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Credits Section */}
      <section className="space-y-2 pt-6 border-t border-[#262626] text-[13px] text-zinc-400">
        <h4 className="font-semibold text-white text-[14px]">Credits</h4>
        <p>
          Component designed and credited to{" "}
          <a
            href="https://magicui.design/docs/components/animated-shiny-text"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors inline-flex items-center gap-1"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>{" "}
          and Magic UI.
        </p>
      </section>
    </div>
  )
}
