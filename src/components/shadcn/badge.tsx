import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-[var(--text-main)] text-[var(--bg-page)] shadow hover:opacity-90",
    secondary: "border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:opacity-80",
    destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
    outline: "border-[var(--border-subtle)] text-[var(--text-main)]",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--border-subtle)]",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
