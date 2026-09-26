"use client"

import React from "react"
import { motion } from "framer-motion"
import { Pointer } from "@/components/magicui/pointer"
import { cn } from "@/lib/utils"

// 1. Primary Showcase matching user reference screenshots media_1790461140492.png, media_1790461146516.png, media_1790461152570.png, media_1790461158603.png
export function PointerDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 shadow-2xl select-none",
        className
      )}
    >
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:grid-rows-2">
        {/* Card 1: Animated Pointer (Pink pulsing heart) */}
        <div className="relative rounded-xl border border-white/10 bg-[#141414] hover:border-white/20 transition-colors p-6">
          <div className="relative flex h-36 sm:h-40 flex-col items-center justify-center text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Animated Pointer
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Animated pointer
            </p>
          </div>
          <Pointer>
            <motion.div
              animate={{
                scale: [0.85, 1.15, 0.85],
                rotate: [0, 6, -6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-500 drop-shadow-md"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          </Pointer>
        </div>

        {/* Card 2: Colored Pointer (Blue arrow with white border) */}
        <div className="relative rounded-xl border border-white/10 bg-[#141414] hover:border-white/20 transition-colors p-6">
          <div className="relative flex h-36 sm:h-40 flex-col items-center justify-center text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Colored Pointer
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              A custom pointer with different color
            </p>
          </div>
          <Pointer className="fill-blue-500" />
        </div>

        {/* Card 3: Custom Shape (Purple glowing circle with white dot) */}
        <div className="relative rounded-xl border border-white/10 bg-[#141414] hover:border-white/20 transition-colors p-6">
          <div className="relative flex h-36 sm:h-40 flex-col items-center justify-center text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Custom Shape
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              A pointer with a custom SVG shape
            </p>
          </div>
          <Pointer>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            >
              <circle cx="12" cy="12" r="10" className="fill-purple-600" />
              <circle cx="12" cy="12" r="4.5" className="fill-white" />
            </svg>
          </Pointer>
        </div>

        {/* Card 4: Emoji Pointer (Hand pointing emoji) */}
        <div className="relative rounded-xl border border-white/10 bg-[#141414] hover:border-white/20 transition-colors p-6">
          <div className="relative flex h-36 sm:h-40 flex-col items-center justify-center text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Emoji Pointer
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Using an emoji as a custom pointer
            </p>
          </div>
          <Pointer>
            <div className="text-2xl filter drop-shadow">👆</div>
          </Pointer>
        </div>
      </div>
    </div>
  )
}

// 2. Compact Real Component Card Preview for /blocks Grid
export function PointerBlockPreview() {
  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {/* Mini Card 1 */}
        <div className="relative flex h-24 flex-col items-center justify-center rounded-lg border border-white/10 bg-[#141414] p-2 text-center transition-colors hover:border-white/20">
          <span className="text-xs font-medium text-white">Animated</span>
          <span className="text-[10px] text-neutral-400">Heart</span>
          <Pointer>
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-pink-500 fill-current">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </Pointer>
        </div>

        {/* Mini Card 2 */}
        <div className="relative flex h-24 flex-col items-center justify-center rounded-lg border border-white/10 bg-[#141414] p-2 text-center transition-colors hover:border-white/20">
          <span className="text-xs font-medium text-white">Emoji</span>
          <span className="text-[10px] text-neutral-400">Pointer</span>
          <Pointer>
            <div className="text-xl">👆</div>
          </Pointer>
        </div>
      </div>
    </div>
  )
}
