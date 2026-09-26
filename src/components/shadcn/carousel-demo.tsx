import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/shadcn/carousel"
import { Card, CardContent } from "@/components/shadcn/card"
import { Button } from "@/components/shadcn/button"
import { Play, Pause, Sparkles, Layers, Image as ImageIcon } from "lucide-react"

export const CAROUSEL_SLIDES = [
  { id: 1, title: "Quantum Compute", desc: "Scale cluster workloads across distributed nodes.", tag: "Cloud", color: "from-blue-600 to-indigo-600" },
  { id: 2, title: "Edge Networking", desc: "Ultra-low latency edge delivery with global routing.", tag: "Network", color: "from-purple-600 to-indigo-500" },
  { id: 3, title: "Vector Indexing", desc: "High-dimensional embeddings indexed in sub-ms lookups.", tag: "Database", color: "from-emerald-600 to-teal-500" },
  { id: 4, title: "Agent Fleet", desc: "Self-healing pipeline workers executing concurrent jobs.", tag: "AI", color: "from-amber-600 to-orange-500" },
  { id: 5, title: "Zero-Trust Auth", desc: "Fine-grained cryptographic session keys and auth tokens.", tag: "Security", color: "from-rose-600 to-pink-500" },
]

/**
 * Primary hero showcase for Carousel
 */
export function CarouselDemo() {
  return (
    <div className="w-full max-w-xs mx-auto py-10 px-8 flex items-center justify-center select-none">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-bold font-mono text-[var(--text-main)]">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

/**
 * Sizing demo with 1/3 basis width items
 */
export function CarouselSizeDemo() {
  return (
    <div className="w-full max-w-md mx-auto py-10 px-8 select-none">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm mx-auto"
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <CardContent className="flex aspect-square items-center justify-center p-4">
                    <span className="text-2xl font-bold font-mono text-[var(--text-main)]">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

/**
 * Spacing demo with negative margin on container and padding on item
 */
export function CarouselSpacingDemo() {
  return (
    <div className="w-full max-w-md mx-auto py-10 px-8 select-none">
      <Carousel className="w-full max-w-sm mx-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-bold font-mono text-[var(--text-main)]">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

/**
 * Vertical orientation demo
 */
export function CarouselOrientationDemo() {
  return (
    <div className="w-full max-w-xs mx-auto py-14 px-8 flex items-center justify-center select-none">
      <Carousel
        orientation="vertical"
        opts={{
          align: "start",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-bold font-mono text-[var(--text-main)]">
                      {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

/**
 * Real-time API demo with slide counter
 */
export function CarouselApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)
  const [count, setCount] = React.useState(5)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length || 5)
    setCurrent(api.selectedScrollSnap() + 1)

    const unsubscribe = api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
    return unsubscribe
  }, [api])

  return (
    <div className="w-full max-w-xs mx-auto py-8 px-8 space-y-4 select-none">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {CAROUSEL_SLIDES.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${slide.color} flex items-center justify-center`}>
                    <span className="text-white text-3xl font-bold font-mono">0{index + 1}</span>
                  </div>
                  <CardContent className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-main)]">{slide.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        {slide.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">{slide.desc}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="text-center text-xs text-[var(--text-muted)] font-mono">
        Slide {current} of {count}
      </div>
    </div>
  )
}

/**
 * Autoplay / Interactive plugin simulator demo
 */
export function CarouselPluginDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [isPlaying, setIsPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!api || !isPlaying) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 2500)

    return () => clearInterval(interval)
  }, [api, isPlaying])

  return (
    <div className="w-full max-w-xs mx-auto py-8 px-8 space-y-4 select-none">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)]">
                  <CardContent className="flex aspect-video items-center justify-center p-6 flex-col gap-1">
                    <span className="text-3xl font-bold font-mono text-[var(--text-main)]">
                      Slide {index + 1}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      Autoplay active (2.5s delay)
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs h-7 px-3 gap-1.5"
        >
          {isPlaying ? (
            <>
              <Pause className="size-3" />
              <span>Pause Autoplay</span>
            </>
          ) : (
            <>
              <Play className="size-3" />
              <span>Resume Autoplay</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

/**
 * RTL layout carousel demo
 */
export function CarouselRtlDemo() {
  const arabicSlides = [
    { title: "الحوسبة السحابية", desc: "توسيع أحمال العمل عبر العقد الموزعة." },
    { title: "شبكات الحافة الفائقة", desc: "توصيل بزمن انتقال منخفض للغاية." },
    { title: "قواعد البيانات الموجهة", desc: "فهرسة عالية الدقة واستعلامات فورية." },
  ]

  return (
    <div dir="rtl" className="w-full max-w-xs mx-auto py-10 px-8 select-none">
      <Carousel
        dir="rtl"
        opts={{
          direction: "rtl",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {arabicSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-[var(--border-subtle)] bg-[var(--bg-card)] text-right">
                  <CardContent className="flex aspect-video flex-col justify-center p-4 space-y-1">
                    <span className="text-xs font-bold text-[var(--text-main)]">
                      {slide.title}
                    </span>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      {slide.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="rtl:rotate-180" />
        <CarouselNext className="rtl:rotate-180" />
      </Carousel>
    </div>
  )
}
