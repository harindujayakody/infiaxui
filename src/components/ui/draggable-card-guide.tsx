"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DraggableCardDemo } from "./draggable-card-demo"

export function DraggableCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/draggable-card-demo-2`

  const componentSourceCode = `"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DraggableCardItem {
  id: string
  title: string
  subtitle?: string
  image: string
  rotation?: number
  top?: string
  left?: string
  zIndex?: number
}

export interface DraggableCardProps extends HTMLMotionProps<"div"> {
  item: DraggableCardItem
  containerRef?: React.RefObject<HTMLDivElement | null>
  className?: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function DraggableCard({
  item,
  containerRef,
  className,
  onDragStart,
  onDragEnd,
  ...props
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateZ = useSpring(useTransform(x, [-150, 0, 150], [-12, item.rotation || 0, 12]), {
    stiffness: 300,
    damping: 20,
  })

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum={true}
      style={{
        x,
        y,
        rotate: rotateZ,
        zIndex: isDragging ? 50 : item.zIndex || 10,
        position: "absolute",
        top: item.top || "50%",
        left: item.left || "50%",
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.04, cursor: "grab" }}
      whileTap={{ scale: 1.08, cursor: "grabbing" }}
      onDragStart={() => {
        setIsDragging(true)
        onDragStart?.()
      }}
      onDragEnd={() => {
        setIsDragging(false)
        onDragEnd?.()
      }}
      className={cn(
        "touch-none select-none rounded-2xl bg-[#161618] p-3 shadow-2xl border border-white/10 transition-shadow",
        isDragging && "shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-cyan-500/40",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/3] w-48 sm:w-56 overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="h-full w-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
          <p className="text-sm font-bold text-white tracking-wide truncate">{item.title}</p>
          {item.subtitle && (
            <p className="text-[11px] font-medium text-neutral-300 truncate">{item.subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function DraggableCardContainer({
  items,
  className,
  children,
  ...props
}: {
  items?: DraggableCardItem[]
  className?: string
  children?: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      {items
        ? items.map((item) => (
            <DraggableCard key={item.id} item={item} containerRef={containerRef} />
          ))
        : children}
    </div>
  )
}`

  const usageCode = `import { DraggableCardContainer } from "@/components/ui/draggable-card"

const cards = [
  {
    id: "canada",
    title: "Canada",
    subtitle: "Banff National Park",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop",
    rotation: -6,
    top: "42%",
    left: "32%",
  },
  {
    id: "japan",
    title: "Japan",
    subtitle: "Mount Fuji",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    rotation: 8,
    top: "50%",
    left: "65%",
  },
]

export default function Example() {
  return <DraggableCardContainer items={cards} className="h-[500px] w-full" />
}`

  return (
    <div className="space-y-12">
      {/* Component Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Draggable Card</h1>
        <p className="text-base text-zinc-400">
          A tiltable, draggable card component with fluid physics that jumps on bounds and springs realistically on drag.
        </p>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Preview</h2>
        <DraggableCardDemo />
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
                1. Copy and paste the following code into <code className="text-cyan-400">components/ui/draggable-card.tsx</code>
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
                <td className="px-4 py-3 text-cyan-400 font-bold">items</td>
                <td className="px-4 py-3 text-purple-400">DraggableCardItem[]</td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Array of card objects to render inside container.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">rotation</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Resting angle in degrees for the card.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-cyan-400 font-bold">dragElastic</td>
                <td className="px-4 py-3 text-purple-400">number</td>
                <td className="px-4 py-3 text-zinc-500">0.15</td>
                <td className="px-4 py-3 text-zinc-300 font-sans">Spring resistance when dragged outside bounds.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
