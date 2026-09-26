"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreeDCardDemo } from "./three-d-card-demo"

export function ThreeDCardGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx shadcn@latest add @aceternity/3d-card-demo`

  const componentSourceCode = `"use client"

import { cn } from "@/lib/utils"
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react"

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg)\`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
    if (!containerRef.current) return
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = \`rotateY(0deg) rotateX(0deg)\`
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "flex items-center justify-center p-2 sm:p-4 select-none",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "h-auto w-auto [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    handleAnimations()
  }, [isMouseEntered])

  const handleAnimations = () => {
    if (!ref.current) return
    if (isMouseEntered) {
      ref.current.style.transform = \`translateX(\${translateX}px) translateY(\${translateY}px) translateZ(\${translateZ}px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) rotateZ(\${rotateZ}deg)\`
    } else {
      ref.current.style.transform = \`translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)\`
    }
  }

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterContext")
  }
  return context
}`

  const usageSnippet = `import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

export function ThreeDCardDemo() {
  return (
    <CardContainer>
      <CardBody className="bg-[#0A0A0A] border-zinc-800 rounded-2xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          Make things float in air
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-zinc-400 text-sm mt-2">
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            className="h-60 w-full object-cover rounded-xl"
            alt="Forest"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">3D Card Effect</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          A card perspective effect using CSS 3D transforms. Hover over the card to elevate individual card elements with customizable Z-axis translation and cursor-tracking rotational physics.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Full 3D Card */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Floating Elements Card
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Move your cursor across the card to experience multi-layer 3D elevation.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <ThreeDCardDemo />
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Installation
        </h3>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <TabsTrigger value="cli" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs data-[state=active]:bg-[var(--bg-card)]">
              Manual
            </TabsTrigger>
          </TabsList>

          {/* CLI Tab */}
          <TabsContent value="cli" className="mt-4">
            <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-3.5 font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-zinc-400" />
                  {cliCode}
                </span>
                <button
                  onClick={() => copyToClipboard(cliCode, "cli")}
                  className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedKey === "cli" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="mt-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  1
                </span>
                <span>Copy and paste the component code into your project:</span>
              </div>
              <div className="relative max-h-96 overflow-y-auto rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex justify-end pb-2">
                  <button
                    onClick={() => copyToClipboard(componentSourceCode, "component-code")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "component-code" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
                <pre>{componentSourceCode}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Usage
        </h3>
        <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
          <div className="flex justify-end pb-2">
            <button
              onClick={() => copyToClipboard(usageSnippet, "usage")}
              className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedKey === "usage" ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
          <pre>{usageSnippet}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props Reference
        </h3>

        {/* CardContainer */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            CardContainer
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">children</td>
                  <td className="p-3 text-zinc-400">ReactNode</td>
                  <td className="p-3 font-sans text-zinc-300">The 3D card content (CardBody).</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">containerClassName</td>
                  <td className="p-3 text-zinc-400">string</td>
                  <td className="p-3 font-sans text-zinc-300">CSS class for the outer perspective viewport.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CardItem */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            CardItem
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] font-mono">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">translateZ</td>
                  <td className="p-3 text-zinc-400">number | string</td>
                  <td className="p-3 text-zinc-500">0</td>
                  <td className="p-3 font-sans text-zinc-300">Depth distance in pixels for 3D elevation.</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">as</td>
                  <td className="p-3 text-zinc-400">ElementType</td>
                  <td className="p-3 text-zinc-500">"div"</td>
                  <td className="p-3 font-sans text-zinc-300">HTML element tag (div, p, button, a, img).</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-400 font-semibold">rotateX / rotateY / rotateZ</td>
                  <td className="p-3 text-zinc-400">number | string</td>
                  <td className="p-3 text-zinc-500">0</td>
                  <td className="p-3 font-sans text-zinc-300">Degrees of rotation on hover.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center justify-between">
        <span>Authored by Manu Arora for Aceternity UI.</span>
        <a
          href="https://ui.aceternity.com/components/3d-card-effect"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
        >
          <span>Aceternity UI Docs</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}
