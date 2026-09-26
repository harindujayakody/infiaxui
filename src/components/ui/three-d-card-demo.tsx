"use client"

import React from "react"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { ArrowRight } from "lucide-react"

// 1. Primary Showcase matching screenshot media_1790455906741.png & media_1790455936685.png
export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var w-full max-w-lg">
      <CardBody className="bg-[#0A0A0A] relative group/card border-zinc-800/80 w-auto sm:w-[30rem] h-auto rounded-2xl p-6 sm:p-7 border shadow-2xl">
        <CardItem
          translateZ="50"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-zinc-400 text-xs sm:text-[13px] max-w-sm mt-2 leading-relaxed"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            height="1000"
            width="1000"
            className="h-56 sm:h-64 w-full object-cover rounded-xl group-hover/card:shadow-2xl transition-shadow"
            alt="Forest thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6 pt-2">
          <CardItem
            translateZ={40}
            as="a"
            href="#"
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>Try now</span>
            <ArrowRight className="size-3.5" />
          </CardItem>
          <CardItem
            translateZ={40}
            as="button"
            className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold shadow-md hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

// 2. Blocks Page Preview (Real interactive 3D perspective card, NO double borders, NO inner frame)
export function ThreeDCardBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-2 select-none">
      <CardContainer className="w-full scale-[0.7] sm:scale-[0.76] origin-center">
        <CardBody className="bg-zinc-950/90 relative group/card border-zinc-800/80 w-[24rem] h-auto rounded-2xl p-5 border shadow-xl">
          <CardItem
            translateZ="30"
            className="text-base font-bold text-white tracking-tight"
          >
            Make things float in air
          </CardItem>
          <CardItem
            as="p"
            translateZ="40"
            className="text-zinc-400 text-[11px] mt-1 line-clamp-1"
          >
            Hover to unleash CSS 3D perspective
          </CardItem>
          <CardItem translateZ="70" className="w-full mt-3">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
              height="400"
              width="600"
              className="h-28 w-full object-cover rounded-lg shadow-md"
              alt="Forest thumbnail preview"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-3 pt-1">
            <CardItem
              translateZ={30}
              className="text-[11px] font-medium text-zinc-400 inline-flex items-center gap-1"
            >
              <span>Try now</span>
              <span>→</span>
            </CardItem>
            <CardItem
              translateZ={30}
              className="px-3 py-1 rounded-lg bg-white text-black text-[11px] font-bold shadow"
            >
              Sign up
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  )
}
