"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableNavbarDemo } from "./resizable-navbar-demo"

export function ResizableNavbarGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/resizable-navbar-demo`

  const componentSourceCode = `"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItemType {
  name: string
  link: string
}

export interface ResizableNavbarProps {
  navItems?: NavItemType[]
  className?: string
  logo?: React.ReactNode
  cta?: React.ReactNode
  login?: React.ReactNode
  children?: React.ReactNode
  scrollContainerRef?: React.RefObject<HTMLElement | null>
}

export const ResizableNavbar = ({
  navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ],
  logo,
  cta,
  login,
  className,
  children,
  scrollContainerRef,
}: ResizableNavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll(
    scrollContainerRef
      ? { container: scrollContainerRef }
      : undefined
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  return (
    <motion.header
      animate={{
        width: scrolled ? "90%" : "100%",
        maxWidth: scrolled ? "780px" : "1000px",
        y: scrolled ? 16 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "sticky top-0 z-50 mx-auto flex items-center justify-between transition-all select-none",
        scrolled
          ? "rounded-full border border-white/10 bg-[#090A0F]/80 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          : "border-b border-white/[0.08] bg-[#0A0A0A]/40 px-6 py-4 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {logo || (
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-white font-bold text-black text-sm">
              A
            </div>
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">
              Startup
            </span>
          </div>
        )}
      </div>

      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {login || (
          <a
            href="#login"
            className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </a>
        )}
        {cta || (
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm">
            Book a call
          </button>
        )}
      </div>

      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl border border-white/10 bg-[#0E0F14]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-center text-sm font-medium text-zinc-300 hover:text-white"
              >
                Login
              </a>
              <button className="w-full rounded-xl bg-white py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors">
                Book a call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}`

  const usageCode = `import { ResizableNavbar } from "@/components/ui/resizable-navbar"

export default function Example() {
  return (
    <ResizableNavbar
      navItems={[
        { name: "Features", link: "#features" },
        { name: "Pricing", link: "#pricing" },
        { name: "Contact", link: "#contact" },
      ]}
    />
  )
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Resizable Navbar</h1>
        <p className="text-base text-zinc-400">
          A navbar that changes width on scroll, responsive and animated.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <ResizableNavbarDemo />
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
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/resizable-navbar.tsx</code>
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
                <td className="px-4 py-3 text-cyan-400 font-bold">navItems</td>
                <td className="px-4 py-3 text-purple-400">NavItemType[]</td>
                <td className="px-4 py-3 text-zinc-500">DEFAULT_ITEMS</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Array of navigation links with title and destination href.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">logo</td>
                <td className="px-4 py-3 text-purple-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Custom brand logo component or graphic.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">cta</td>
                <td className="px-4 py-3 text-purple-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Call-to-action button or interactive element.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">scrollContainerRef</td>
                <td className="px-4 py-3 text-purple-400">React.RefObject</td>
                <td className="px-4 py-3 text-zinc-500">window</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Optional ref to an inner scrolling container element.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
