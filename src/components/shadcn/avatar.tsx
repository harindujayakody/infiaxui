import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
}

const sizeClasses = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-14 text-base",
}

export function Avatar({
  className,
  size = "default",
  children,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 rounded-full border border-[var(--border-subtle)] select-none",
        sizeClasses[size],
        className
      )}
      data-size={size}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export function AvatarImage({ className, src, alt = "", onError, ...props }: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(false)

  if (!src || hasError) return null

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-[var(--bg-subtle)] font-medium text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

export function AvatarBadge({ className, children, ...props }: AvatarBadgeProps) {
  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 rtl:right-auto rtl:left-0 z-10 flex size-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[var(--bg-page)]",
        children && "size-4 text-[9px] text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AvatarGroup({ className, children, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn("flex items-center -space-x-2.5 rtl:space-x-reverse overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarGroupCountProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AvatarGroupCount({ className, children, ...props }: AvatarGroupCountProps) {
  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-main)] shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
