"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContainerScrollDemo } from "./container-scroll-animation-demo"

export function ContainerScrollGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add container-scroll-animation-demo`

  const componentSourceCode = `"use client"

import React, { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className={cn(
        "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
        className
      )}
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C75] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}`

  const usageCode = `import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function Example() {
  return (
    <ContainerScroll
      titleComponent={
        <h1 className="text-4xl font-semibold text-white">
          Unleash the power of <br />
          <span className="text-6xl font-bold mt-1 leading-none text-white">
            Scroll Animations
          </span>
        </h1>
      }
    >
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
        alt="Hero dashboard preview"
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        draggable={false}
      />
    </ContainerScroll>
  )
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Container Scroll Animation</h1>
        <p className="text-base text-zinc-400">
          A scroll animation that rotates in 3D on scroll. Perfect for hero or marketing sections.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <ContainerScrollDemo />
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
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/container-scroll-animation.tsx</code>
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
                <td className="px-4 py-3 text-cyan-400 font-bold">titleComponent</td>
                <td className="px-4 py-3 text-purple-400">string | React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">required</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Title or heading component rendered above the 3D scroll card.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">children</td>
                <td className="px-4 py-3 text-purple-400">React.ReactNode</td>
                <td className="px-4 py-3 text-zinc-500">required</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Inner content, image, or UI board to place inside the tilted 3D card.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">className</td>
                <td className="px-4 py-3 text-purple-400">string</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Outer container styling for padding, height, and backgrounds.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

