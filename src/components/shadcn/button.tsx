import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-subtle)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none"

    const variants = {
      default:
        "bg-[var(--text-main)] text-[var(--bg-page)] shadow-sm hover:opacity-90 font-medium",
      destructive:
        "bg-red-600 text-white shadow-sm hover:bg-red-700",
      outline:
        "border border-[var(--border-subtle)] bg-transparent hover:bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm",
      secondary:
        "bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-sm",
      ghost:
        "hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] text-[var(--text-muted)]",
      link:
        "text-[var(--text-main)] underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-10 rounded-xl px-8",
      icon: "size-9 rounded-xl",
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
