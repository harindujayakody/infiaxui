import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      // Slate dark theme styles
      "bg-[#0A0A0A] border border-[var(--border-subtle)] transform-gpu transition-all duration-300",
      "hover:border-zinc-700/80 hover:shadow-2xl",
      "[box-shadow:0_0_0_1px_rgba(255,255,255,.04),0_8px_20px_rgba(0,0,0,.4)]",
      className
    )}
    {...props}
  >
    {/* Background container pinned to top */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {background}
    </div>

    {/* Content metadata anchored to bottom */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-6 transition-all duration-300 lg:group-hover:-translate-y-10 mt-auto">
      <Icon className="size-11 origin-left transform-gpu text-zinc-500 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-zinc-200" />
      <h3 className="text-xl font-semibold text-zinc-100 tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-[13px] text-zinc-400 leading-relaxed">{description}</p>
    </div>

    {/* Mobile visible CTA */}
    <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center px-6 pb-6 pt-0 transition-all duration-300 lg:hidden">
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center text-xs font-medium text-zinc-300 hover:text-white transition-colors"
      >
        <span>{cta}</span>
        <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" />
      </a>
    </div>

    {/* Desktop hover slide-up CTA */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20"
      )}
    >
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center text-xs font-medium text-zinc-200 hover:text-white transition-colors"
      >
        <span>{cta}</span>
        <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.02]" />
  </div>
)
