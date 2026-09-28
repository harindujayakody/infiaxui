"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BentoDemo, BentoVerticalDemo } from "./bento-grid-demo"

export function BentoGridGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add bento-grid`

  const bentoGridComponentCode = `import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      "bg-[#0A0A0A] border border-[var(--border-subtle)] transform-gpu transition-all duration-300",
      "hover:border-zinc-700/80 hover:shadow-2xl",
      "[box-shadow:0_0_0_1px_rgba(255,255,255,.04),0_8px_20px_rgba(0,0,0,.4)]",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 pointer-events-none overflow-hidden">{background}</div>

    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-6 transition-all duration-300 lg:group-hover:-translate-y-10 mt-auto">
      <Icon className="size-11 origin-left transform-gpu text-zinc-500 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-zinc-200" />
      <h3 className="text-xl font-semibold text-zinc-100 tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-[13px] text-zinc-400 leading-relaxed">{description}</p>
    </div>

    <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center px-6 pb-6 pt-0 transition-all duration-300 lg:hidden">
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center text-xs font-medium text-zinc-300 hover:text-white transition-colors"
      >
        <span>{cta}</span>
        <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" />
      </a>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20"
      )}
    >
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center text-xs font-medium text-zinc-200 hover:text-white transition-colors"
      >
        <span>{cta}</span>
        <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.02]" />
  </div>
)`

  const usageSnippet = `import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { Bell, FileText, Share2, Calendar } from "lucide-react"

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
]

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Bento Grid</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          Bento grid is a layout used to showcase the features of a product in a simple and elegant way. Supports rich interactive backgrounds, smooth GPU-accelerated hover shifts, and responsive grid layouts.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Default Bento Grid */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Default Bento Grid
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Full 3-column asymmetrical grid with live animated beam, floating file cards, calendar, and notification feed.
          </p>
          <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
            <BentoDemo />
          </div>
        </div>

        {/* Example 2: Vertical Layout */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Vertical Layout
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Compact 3-column card arrangement with row spanning.
          </p>
          <div className="p-4 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
            <BentoVerticalDemo />
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-3.5 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-zinc-400" />
                  {cliCode}
                </span>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  1
                </span>
                <span>Copy and paste the component code into your project:</span>
              </div>
              <div className="relative max-h-96 overflow-y-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex justify-end pb-2">
                  <button
                    onClick={() => copyToClipboard(bentoGridComponentCode, "component-code")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "component-code" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
                <pre>{bentoGridComponentCode}</pre>
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
          <div className="flex justify-end pb-2">
            <button
              onClick={() => copyToClipboard(usageSnippet, "usage")}
              className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedKey === "usage" ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
          <pre>{usageSnippet}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props Reference
        </h3>

        {/* BentoGrid Props */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            BentoGrid
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">children</td>
                  <td className="p-3 text-zinc-400">ReactNode</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">A collection of BentoCard components.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">className</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Custom CSS grid classes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BentoCard Props */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            BentoCard
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">name</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Heading title for the card.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">description</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Short explanatory text.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">Icon</td>
                  <td className="p-3 text-zinc-400">ElementType</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Lucide or icon element displayed at top.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">background</td>
                  <td className="p-3 text-zinc-400">ReactNode</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Interactive background layer (e.g. AnimatedBeam, Calendar).</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">cta / href</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 text-zinc-500">-</td>
                  <td className="p-3 font-sans text-zinc-300">Call-to-action button label and URL.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center justify-between">
        <span>Authored by @dillionverma for Magic UI.</span>
        <a
          href="https://magicui.design/docs/components/bento-grid"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
        >
          <span>Magic UI Docs</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}

