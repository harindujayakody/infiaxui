"use client"

import React, { useState } from "react"
import { FocusCards, CardType } from "@/components/ui/focus-cards"

// 1. Primary Showcase matching screenshot media_1790460915114.png
export function FocusCardsDemo() {
  const cards: CardType[] = [
    {
      title: "Forest Adventure",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Valley of life",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The road not taken",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The First Rule",
      src: "/images/the-first-rule.png",
    },
  ]

  return (
    <div className="w-full py-4 sm:py-8 flex justify-center">
      <FocusCards cards={cards} />
    </div>
  )
}

// 2. Blocks Page Preview (Interactive preview for /blocks)
export function FocusCardsBlockPreview() {
  const [hovered, setHovered] = useState<number | null>(null)
  const miniCards: CardType[] = [
    {
      title: "Forest Trail",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Valley View",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Coastal Ocean",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=800&auto=format&fit=crop",
    },
  ]

  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-sm">
        {miniCards.map((card, index) => (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`relative h-28 sm:h-36 rounded-lg overflow-hidden transition-all duration-300 ease-out cursor-pointer ${
              hovered !== null && hovered !== index
                ? "blur-sm scale-[0.96] opacity-60"
                : "scale-100 opacity-100 ring-1 ring-white/10"
            }`}
          >
            <img
              src={card.src}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-black/60 flex items-end p-2 transition-opacity duration-300 ${
                hovered === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[10px] sm:text-xs font-semibold text-white truncate leading-tight">
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
