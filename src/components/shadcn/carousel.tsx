import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"

// ---------------------------------------------------------------------------
// Types & Context
// ---------------------------------------------------------------------------

export type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
  selectedScrollSnap: () => number
  scrollSnapList: () => number[]
  on: (event: string, callback: () => void) => () => void
}

export type CarouselOptions = {
  align?: "start" | "center" | "end"
  axis?: "x" | "y"
  direction?: "ltr" | "rtl"
  loop?: boolean
  startIndex?: number
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: any[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement | null>
  api: CarouselApi | null
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: "horizontal" | "vertical"
  currentIndex: number
  totalCount: number
  dir: "ltr" | "rtl"
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

// ---------------------------------------------------------------------------
// Carousel Root
// ---------------------------------------------------------------------------

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      dir: propDir,
      ...props
    },
    ref
  ) => {
    const carouselRef = React.useRef<HTMLDivElement | null>(null)
    const [currentIndex, setCurrentIndex] = React.useState(opts?.startIndex || 0)
    const [totalCount, setTotalCount] = React.useState(0)
    const listenersRef = React.useRef<Map<string, Set<() => void>>>(new Map())

    const dir = (propDir || opts?.direction || "ltr") as "ltr" | "rtl"
    const loop = opts?.loop ?? false

    // Measure slide count from DOM container
    React.useEffect(() => {
      if (carouselRef.current) {
        const items = carouselRef.current.querySelectorAll("[data-carousel-item]")
        setTotalCount(items.length)
      }
    }, [children])

    const canScrollPrev = loop ? true : currentIndex > 0
    const canScrollNext = loop ? true : currentIndex < totalCount - 1

    const emit = React.useCallback((event: string) => {
      const set = listenersRef.current.get(event)
      if (set) {
        set.forEach((cb) => cb())
      }
    }, [])

    const scrollTo = React.useCallback(
      (index: number) => {
        if (totalCount === 0) return
        let nextIndex = index
        if (loop) {
          nextIndex = (index + totalCount) % totalCount
        } else {
          nextIndex = Math.max(0, Math.min(index, totalCount - 1))
        }
        setCurrentIndex(nextIndex)

        if (carouselRef.current) {
          const items = carouselRef.current.querySelectorAll("[data-carousel-item]")
          const target = items[nextIndex] as HTMLElement
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: opts?.align === "end" ? "end" : opts?.align === "center" ? "center" : "start",
            })
          }
        }
        emit("select")
      },
      [totalCount, loop, opts?.align, emit]
    )

    const scrollPrev = React.useCallback(() => {
      scrollTo(currentIndex - 1)
    }, [scrollTo, currentIndex])

    const scrollNext = React.useCallback(() => {
      scrollTo(currentIndex + 1)
    }, [scrollTo, currentIndex])

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          if (dir === "rtl") scrollNext()
          else scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          if (dir === "rtl") scrollPrev()
          else scrollNext()
        }
      },
      [scrollPrev, scrollNext, dir]
    )

    const api = React.useMemo<CarouselApi>(() => {
      return {
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev: () => canScrollPrev,
        canScrollNext: () => canScrollNext,
        selectedScrollSnap: () => currentIndex,
        scrollSnapList: () => Array.from({ length: totalCount }, (_, i) => i),
        on: (event: string, callback: () => void) => {
          if (!listenersRef.current.has(event)) {
            listenersRef.current.set(event, new Set())
          }
          listenersRef.current.get(event)!.add(callback)
          return () => {
            listenersRef.current.get(event)?.delete(callback)
          }
        },
      }
    }, [scrollPrev, scrollNext, scrollTo, canScrollPrev, canScrollNext, currentIndex, totalCount])

    React.useEffect(() => {
      if (setApi && api) {
        setApi(api)
      }
    }, [setApi, api])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation,
          currentIndex,
          totalCount,
          dir,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative focus:outline-none", className)}
          role="region"
          aria-roledescription="carousel"
          dir={dir}
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

// ---------------------------------------------------------------------------
// Carousel Content (Viewport & Container)
// ---------------------------------------------------------------------------

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

// ---------------------------------------------------------------------------
// Carousel Item (Slide)
// ---------------------------------------------------------------------------

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      data-carousel-item
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full transition-transform",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

// ---------------------------------------------------------------------------
// Carousel Navigation Buttons (Previous & Next)
// ---------------------------------------------------------------------------

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, dir } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-md hover:bg-[var(--bg-card)] transition-all disabled:opacity-30",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        dir === "rtl" && "rtl:rotate-180",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, dir } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-md hover:bg-[var(--bg-card)] transition-all disabled:opacity-30",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        dir === "rtl" && "rtl:rotate-180",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"
