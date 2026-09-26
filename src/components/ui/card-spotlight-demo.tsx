"use client"

import React from "react"
import { CardSpotlight } from "@/components/ui/card-spotlight"

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2.5 items-start">
      <CheckIcon />
      <p className="text-white text-xs sm:text-sm">{title}</p>
    </li>
  )
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-0.5 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.293l3.293 -3.293z" />
    </svg>
  )
}

// 1. Primary Showcase matching screenshot media_1790460775192.png
export function CardSpotlightDemo() {
  return (
    <CardSpotlight className="h-auto min-h-[380px] w-full max-w-sm sm:max-w-md shadow-2xl flex flex-col justify-between">
      <div>
        <p className="text-xl font-bold relative z-20 mt-1 text-white">
          Authentication steps
        </p>
        <div className="text-neutral-200 mt-4 relative z-20 text-sm">
          Follow these steps to secure your account:
          <ul className="list-none mt-3 space-y-2.5">
            <Step title="Enter your email address" />
            <Step title="Create a strong password" />
            <Step title="Set up two-factor authentication" />
            <Step title="Verify your identity" />
          </ul>
        </div>
      </div>
      <p className="text-neutral-400 text-xs sm:text-sm mt-6 relative z-20 leading-relaxed border-t border-neutral-800/80 pt-4">
        Ensuring your account is properly secured helps protect your personal information and data.
      </p>
    </CardSpotlight>
  )
}

// 2. Blocks Page Preview (Interactive preview for /blocks)
export function CardSpotlightBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center p-3 sm:p-5 select-none">
      <CardSpotlight className="w-full max-w-xs p-5 sm:p-6 rounded-xl border border-neutral-800 bg-neutral-950/90 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Card Spotlight
          </span>
        </div>
        <p className="text-sm font-bold text-white mb-2">
          Security Checkup
        </p>
        <ul className="list-none space-y-1.5 text-xs text-neutral-300">
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Multi-factor authentication</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Hardware key active</span>
          </li>
        </ul>
        <p className="text-[11px] text-neutral-400 mt-3 pt-2 border-t border-neutral-800">
          Hover across to reveal interactive canvas spotlight.
        </p>
      </CardSpotlight>
    </div>
  )
}
