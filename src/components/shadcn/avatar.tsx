import * as React from "react"
import { cn } from "@/lib/utils"

export function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full border border-[var(--border-subtle)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function AvatarImage({ className, src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

export function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex size-full items-center justify-center rounded-full bg-[var(--bg-subtle)] text-xs font-medium text-[var(--text-main)]", className)}
      {...props}
    />
  )
}
