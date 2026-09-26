import * as React from "react"
import { cn } from "@/lib/utils"

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"
  align?: "start" | "end"
  children?: React.ReactNode
}

const variantStyles: Record<NonNullable<BubbleProps["variant"]>, string> = {
  default: "bg-[var(--brand)] text-white shadow-sm",
  secondary: "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-sm",
  muted: "bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]",
  tinted: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  outline: "border border-[var(--border-subtle)] bg-transparent text-[var(--text-main)]",
  ghost: "bg-transparent text-[var(--text-main)] border-0 max-w-full p-0 shadow-none",
  destructive: "bg-red-500/10 text-red-400 border border-red-500/25",
}

export function Bubble({
  variant = "default",
  align = "start",
  className,
  children,
  ...props
}: BubbleProps) {
  const isGhost = variant === "ghost"

  return (
    <div
      className={cn(
        "relative flex flex-col group",
        align === "end" ? "items-end self-end" : "items-start self-start",
        !isGhost && "max-w-[80%]",
        className
      )}
      data-align={align}
      data-variant={variant}
      {...props}
    >
      <div
        className={cn(
          "relative transition-all leading-relaxed text-xs",
          !isGhost && "px-4 py-2.5 rounded-2xl",
          align === "end" && !isGhost ? "rounded-tr-sm" : !isGhost ? "rounded-tl-sm" : "",
          variantStyles[variant]
        )}
      >
        {children}
      </div>
    </div>
  )
}

export interface BubbleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  render?: React.ReactElement
  children?: React.ReactNode
}

export function BubbleContent({ render, className, children, ...props }: BubbleContentProps) {
  if (render && React.isValidElement(render)) {
    return React.cloneElement(
      render as React.ReactElement<any>,
      {
        className: cn("inline-block w-full outline-none focus-visible:ring-1 focus-visible:ring-[var(--brand)] rounded-lg", className, (render.props as any).className),
        ...props,
      },
      children || (render.props as any).children
    )
  }

  return (
    <div className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  )
}

export interface BubbleReactionsProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom"
  align?: "start" | "end"
  children?: React.ReactNode
}

export function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  children,
  ...props
}: BubbleReactionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 z-10 select-none",
        side === "top" ? "-top-3" : "-bottom-3",
        align === "end" ? "right-2" : "left-2",
        "absolute rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-1.5 py-0.5 shadow-md text-[11px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface BubbleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function BubbleGroup({ className, children, ...props }: BubbleGroupProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}
