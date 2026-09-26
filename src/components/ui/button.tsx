import React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "glow"
  size?: "sm" | "md" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border-subtle)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"

    const variants = {
      default:
        "bg-[var(--text-main)] text-[var(--bg-page)] hover:opacity-90 shadow-sm",
      secondary:
        "bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:opacity-80 shadow-sm",
      outline:
        "border border-[var(--border-subtle)] bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-subtle)] shadow-sm",
      ghost:
        "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      glow:
        "relative overflow-hidden bg-[var(--text-main)] text-[var(--bg-page)] shadow-lg hover:opacity-90",
    }

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-9 px-4 py-2 text-sm gap-2 rounded-xl",
      lg: "h-11 px-6 text-base gap-2.5 rounded-xl",
      icon: "size-9 p-0 rounded-xl",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
