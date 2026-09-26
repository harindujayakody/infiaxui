import React from "react"
import { cn } from "@/lib/utils"

interface TabOption {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabsProps {
  options: TabOption[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ options, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 p-1 border border-zinc-200 dark:border-zinc-800", className)}>
      {options.map((option) => {
        const isActive = activeTab === option.id
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            {option.icon}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
