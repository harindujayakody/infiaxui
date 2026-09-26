import React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "tag"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground dark:bg-zinc-800 dark:text-zinc-200",
    outline: "border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300",
    accent: "border-transparent bg-primary/10 text-primary font-medium",
    tag: "border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
