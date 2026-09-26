import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  render?: React.ReactElement
}

const badgeVariants = {
  default: "border-transparent bg-[var(--text-main)] text-[var(--bg-page)] shadow hover:opacity-90",
  secondary: "border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:opacity-80",
  destructive: "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
  outline: "border-[var(--border-subtle)] text-[var(--text-main)] bg-transparent",
  ghost: "border-transparent bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-subtle)]",
  link: "border-transparent text-[var(--brand)] underline-offset-4 hover:underline p-0 h-auto font-normal",
}

export function Badge({
  className,
  variant = "default",
  render,
  children,
  ...props
}: BadgeProps) {
  const baseClasses = cn(
    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--border-subtle)] select-none",
    badgeVariants[variant],
    className
  )

  if (render && React.isValidElement(render)) {
    return React.cloneElement(
      render as React.ReactElement<any>,
      {
        className: cn(baseClasses, (render.props as any).className),
        ...props,
      },
      children || (render.props as any).children
    )
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}
