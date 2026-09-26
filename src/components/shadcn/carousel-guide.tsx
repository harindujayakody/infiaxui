import React from "react"
import {
  CarouselSizeDemo,
  CarouselSpacingDemo,
  CarouselOrientationDemo,
  CarouselApiDemo,
  CarouselPluginDemo,
  CarouselRtlDemo,
} from "@/components/shadcn/carousel-demo"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { CodeBlock } from "@/components/ui/code-block"

export function CarouselGuide() {
  const carouselPrimitiveCode = `import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  if (!context) throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

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
      if (set) set.forEach((cb) => cb())
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

    const scrollPrev = React.useCallback(() => scrollTo(currentIndex - 1), [scrollTo, currentIndex])
    const scrollNext = React.useCallback(() => scrollTo(currentIndex + 1), [scrollTo, currentIndex])

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
      if (setApi && api) setApi(api)
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

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
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
  }
)
CarouselContent.displayName = "CarouselContent"

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
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
  }
)
CarouselItem.displayName = "CarouselItem"

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev, dir } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute size-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-md",
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
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext, dir } = useCarousel()
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute size-8 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-md",
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
  }
)
CarouselNext.displayName = "CarouselNext"`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Global Installation UI */}
      <section id="installation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>
        <InstallationSection
          componentName="carousel"
          dependencies="embla-carousel-react"
          sourceCode={carouselPrimitiveCode}
          sourcePath="components/ui/carousel.tsx"
        />
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)]">
          Import carousel primitives and wrap multiple <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">CarouselItem</code> components inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">CarouselContent</code>.
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Carousel</code>:
        </p>
        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`Carousel
├── CarouselContent
│   ├── CarouselItem
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext`}
        />
      </section>

      {/* Sizes */}
      <section id="sizes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sizes</h2>
        <p className="type-body text-[var(--text-muted)]">
          To set the size of the items, use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">basis</code> utility class on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;CarouselItem /&gt;</code>.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselSizeDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`// 33% width on large screens and 50% on medium screens
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* Spacing */}
      <section id="spacing" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Spacing</h2>
        <p className="type-body text-[var(--text-muted)]">
          To set the spacing between items, use a <code className="text-primary font-mono">pl-[VALUE]</code> utility on the item and negative <code className="text-primary font-mono">-ml-[VALUE]</code> on the container.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselSpacingDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Carousel>
  <CarouselContent className="-ml-2 md:-ml-4">
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* Orientation */}
      <section id="orientation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Orientation</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation</code> prop to set vertical or horizontal sliding.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselOrientationDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Carousel orientation="vertical">
  <CarouselContent className="-mt-1 h-[200px]">
    <CarouselItem className="pt-1 md:basis-1/2">...</CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* Options */}
      <section id="options" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Options</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can pass options to the carousel using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">opts</code> prop.
        </p>

        <CodeBlock
          language="tsx"
          code={`<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">setApi</code> prop to get an instance of the carousel API.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselApiDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}`}
        />
      </section>

      {/* Plugins */}
      <section id="plugins" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Plugins</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">plugins</code> prop to attach autoplay or custom event listeners.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselPluginDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import Autoplay from "embla-carousel-autoplay"

<Carousel
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, set <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">{'opts={{ direction: "rtl" }}'}</code> and mirror navigation buttons.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <CarouselRtlDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Carousel
  dir="rtl"
  opts={{
    direction: "rtl",
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="rtl:rotate-180" />
  <CarouselNext className="rtl:rotate-180" />
</Carousel>`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="type-body text-[var(--text-muted)]">
          See the <a href="https://www.embla-carousel.com/api/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Embla Carousel documentation</a> for all options and plugin specifications.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">opts</td>
                <td className="p-3 font-mono text-indigo-400">CarouselOptions</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Configuration options passed directly to the carousel engine.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">orientation</td>
                <td className="p-3 font-mono text-indigo-400">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="p-3 font-mono">&quot;horizontal&quot;</td>
                <td className="p-3">Sets sliding axis orientation.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">setApi</td>
                <td className="p-3 font-mono text-indigo-400">(api: CarouselApi) =&gt; void</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Callback receiving the active carousel API instance.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">plugins</td>
                <td className="p-3 font-mono text-indigo-400">any[]</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Plugins such as Autoplay or AutoScroll.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
