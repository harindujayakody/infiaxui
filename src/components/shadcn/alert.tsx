import React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-[var(--text-main)] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-[var(--text-main)] [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 transition-colors",
        variant === "destructive" && "border-red-900/50 bg-red-950/20 text-red-400 [&>svg]:text-red-400",
        className
      )}
      {...props}
    />
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-semibold leading-none tracking-tight text-[var(--text-main)] text-sm", className)}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-xs text-[var(--text-muted)] leading-relaxed", className)}
      {...props}
    />
  )
}

export function AlertAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-3 flex items-center gap-2", className)}
      {...props}
    />
  )
}
