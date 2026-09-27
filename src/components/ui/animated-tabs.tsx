"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode
}

export interface AnimatedTabsProps {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}

export function AnimatedTabs({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  const [hovering, setHovering] = useState(false)

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full p-1.5 rounded-full bg-[#18181b]/80 border border-white/10 backdrop-blur-md",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer outline-none",
              active.value === tab.value ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200",
              tabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="active-tab-indicator"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block z-10">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8 w-full", contentClassName)}
      />
    </div>
  )
}

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string
  key?: string
  tabs: Tab[]
  active: Tab
  hovering?: boolean
}) => {
  const isSelected = (tab: Tab) => tab.value === tabs[0].value

  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: hovering ? idx * -25 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.15 : 0,
          }}
          animate={{
            y: isSelected(tab) ? [0, 10, 0] : 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  )
}
