"use client"

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

  // Dynamic spring tilt based on horizontal drag velocity
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

export interface DraggableCardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DraggableCardItem[]
  className?: string
  children?: React.ReactNode
}

export function DraggableCardContainer({
  items,
  className,
  children,
  ...props
}: DraggableCardContainerProps) {
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
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

      {items
        ? items.map((item) => (
            <DraggableCard key={item.id} item={item} containerRef={containerRef} />
          ))
        : children}
    </div>
  )
}
