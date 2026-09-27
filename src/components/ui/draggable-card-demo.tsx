"use client"

import React, { useRef } from "react"
import { DraggableCard, DraggableCardContainer, DraggableCardItem } from "@/components/ui/draggable-card"
import { cn } from "@/lib/utils"

const DEMO_CARDS: DraggableCardItem[] = [
  {
    id: "canada",
    title: "Canada",
    subtitle: "Banff National Park",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop",
    rotation: -6,
    top: "42%",
    left: "32%",
    zIndex: 1,
  },
  {
    id: "new-zealand",
    title: "New Zealand",
    subtitle: "Milford Sound",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    rotation: 8,
    top: "48%",
    left: "68%",
    zIndex: 2,
  },
  {
    id: "japan",
    title: "Japan",
    subtitle: "Mount Fuji",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    rotation: -3,
    top: "52%",
    left: "50%",
    zIndex: 3,
  },
]

export function DraggableCardDemo({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <DraggableCardContainer items={DEMO_CARDS} className="min-h-[480px]" />
    </div>
  )
}

export function DraggableCardBlockPreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  const previewCards: DraggableCardItem[] = [
    {
      id: "card-1",
      title: "Canada",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=400&auto=format&fit=crop",
      rotation: -8,
      top: "45%",
      left: "38%",
    },
    {
      id: "card-2",
      title: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
      rotation: 6,
      top: "52%",
      left: "62%",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-2 select-none"
    >
      <div className="absolute inset-0 bg-radial-gradient from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      {previewCards.map((card) => (
        <DraggableCard
          key={card.id}
          item={card}
          containerRef={containerRef}
          className="scale-75 origin-center"
        />
      ))}
    </div>
  )
}
