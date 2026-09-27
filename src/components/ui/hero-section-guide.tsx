"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroSectionDemo } from "./hero-section-demo"

export function HeroSectionGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/hero-section-demo-1`

  const componentSourceCode = `"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TechStackItem {
  name: string
  icon?: React.ReactNode
}

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  titlePrefix?: string
  highlightedText?: string
  description?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  avatars?: string[]
  trustedText?: string
  className?: string
}

export function HeroSection({
  titlePrefix = "Build world class websites at",
  highlightedText = "warp speed",
  description = "Access an ever-growing collection of premium, meticulously crafted templates and component packs. Save time and focus on what matters—building standout websites that captivate your audience.",
  primaryCtaText = "Explore Collection",
  secondaryCtaText = "Unlock Unlimited Access",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80",
  ],
  trustedText = "Trusted by Founders and Entrepreneurs from all over the world",
  className,
  ...props
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white px-4 sm:px-8 py-16 sm:py-24 transition-colors select-none",
        className
      )}
      {...props}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          <span>{titlePrefix} </span>
          <span className="relative inline-block px-3 py-1 mt-1 sm:mt-0">
            <span className="absolute inset-0 border-2 border-dashed border-zinc-400 dark:border-zinc-500 rounded-lg bg-zinc-500/10 pointer-events-none" />
            <span className="absolute -top-1 -left-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -top-1 -right-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -bottom-1 -left-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="absolute -bottom-1 -right-1 size-2 bg-zinc-600 dark:bg-zinc-300 rounded-[1px]" />
            <span className="relative z-10">{highlightedText}</span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onPrimaryCtaClick}
            className="rounded-xl bg-black dark:bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-white dark:text-black hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            {primaryCtaText}
          </button>
          <button
            onClick={onSecondaryCtaClick}
            className="rounded-xl border border-zinc-300 dark:border-white/20 bg-transparent px-6 py-3 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            {secondaryCtaText}
          </button>
        </div>

        <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-white/[0.08] w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden p-1">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={\`Founder \${i + 1}\`}
                  className="inline-block size-8 sm:size-9 rounded-full ring-2 ring-white dark:ring-[#0A0A0A] object-cover"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
              {trustedText}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="font-bold font-mono">▲</span>
              <span>Next.js</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-cyan-400 font-bold">⚛</span>
              <span>React</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-teal-400 font-bold">≈</span>
              <span>TailwindCSS</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="text-purple-400 font-bold">☲</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`

  const usageCode = `import { HeroSection } from "@/components/ui/hero-section"

export default function Example() {
  return (
    <HeroSection
      titlePrefix="Build world class websites at"
      highlightedText="warp speed"
      description="Access an ever-growing collection of premium, meticulously crafted templates and component packs."
    />
  )
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Hero Sections</h1>
        <p className="text-base text-zinc-400">
          A set of hero sections ranging from simple to complex layouts.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <HeroSectionDemo />
      </div>

      {/* Installation Tabs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Installation</h2>
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[#18181b] border border-white/10">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#121214] px-4 py-3 font-mono text-sm text-zinc-200">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-400" />
                <span>{cliCode}</span>
              </div>
              <button
                onClick={() => copyToClipboard(cliCode, "cli")}
                className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              >
                {copiedKey === "cli" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-300">
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/hero-section.tsx</code>
              </span>
              <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[400px]">
                <button
                  onClick={() => copyToClipboard(componentSourceCode, "manual-comp")}
                  className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                >
                  {copiedKey === "manual-comp" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Usage</h2>
        <div className="relative rounded-xl border border-white/10 bg-[#121214] p-4 font-mono text-xs text-zinc-200 overflow-x-auto">
          <button
            onClick={() => copyToClipboard(usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
          >
            {copiedKey === "usage" ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          </button>
          <pre>{usageCode}</pre>
        </div>
      </div>

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Props Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121214]">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase text-zinc-400">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">titlePrefix</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">"Build world class websites at"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Prefix string before highlighted box word.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">highlightedText</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">"warp speed"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Word or phrase surrounded by selection bounding box.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">description</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">...</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Lead paragraph copy below heading.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">primaryCtaText</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">"Explore Collection"</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Label for main action button.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">avatars</td>
                <td className="px-4 py-3 text-purple-400">string[]</td>
                <td className="px-4 py-3 text-zinc-500">Array of URLs</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Image sources for social proof avatar stack.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
