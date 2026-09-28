"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RainbowButtonDemo,
  RainbowButtonOutlineDemo,
  RainbowButtonSizesDemo,
} from "./rainbow-button-demo"

export function RainbowButtonGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const cliCode = `npx @infiax/ui add rainbow-button`

  const componentSourceCode = `import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all animate-rainbow",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-xl outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default:
          "border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-white [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] dark:text-black",
        outline:
          "border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-zinc-900 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] dark:text-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface RainbowButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps }`

  const cssVariablesCode = `:root {
  --color-1: hsl(0 100% 63%);
  --color-2: hsl(270 100% 63%);
  --color-3: hsl(210 100% 63%);
  --color-4: hsl(195 100% 63%);
  --color-5: hsl(90 100% 63%);
}

@keyframes rainbow {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}

.animate-rainbow {
  animation: rainbow var(--speed, 2s) infinite linear;
}`

  const usageSnippet = `import { RainbowButton } from "@/components/magicui/rainbow-button"

export function RainbowButtonDemo() {
  return (
    <RainbowButton>Get Unlimited Access</RainbowButton>
  )
}`

  return (
    <div className="space-y-12 text-sm text-[var(--text-main)]">
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Rainbow Button</h2>
        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed max-w-2xl">
          An animated button with a continuous rainbow linear-gradient border and glowing bottom aura. Built using CSS variables, background clip layering, and GPU-accelerated keyframe animation.
        </p>
      </div>

      {/* Examples Section */}
      <div className="space-y-8">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Examples
        </h3>

        {/* Example 1: Default Variant */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Default Variant
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Luminous solid button with high-contrast text and animated border/glow.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <RainbowButtonDemo />
          </div>
        </div>

        {/* Example 2: Outline Variant */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Outline Variant
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Subtle dark background with vivid rainbow perimeter stroke and blur reflection.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <RainbowButtonOutlineDemo />
          </div>
        </div>

        {/* Example 3: Sizes & Icons */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--text-main)]">
            Sizes & Icons
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Supports <code className="text-pink-400">sm</code>, <code className="text-pink-400">default</code>, and <code className="text-pink-400">lg</code> sizes with embedded icons.
          </p>
          <div className="flex justify-center p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <RainbowButtonSizesDemo />
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

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px]">
                  2
                </span>
                <span>Add CSS color variables and keyframe animation to your CSS:</span>
              </div>
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-code)] p-4 font-mono text-xs text-zinc-200">
                <div className="flex justify-end pb-2">
                  <button
                    onClick={() => copyToClipboard(cssVariablesCode, "css-code")}
                    className="rounded p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedKey === "css-code" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
                <pre>{cssVariablesCode}</pre>
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight border-b border-[var(--border-subtle)] pb-2">
          Props
        </h3>
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
                <td className="p-3 text-pink-400 font-semibold">children</td>
                <td className="p-3 text-zinc-400">ReactNode</td>
                <td className="p-3 text-zinc-500">-</td>
                <td className="p-3 font-sans text-zinc-300">The content to be displayed inside the button.</td>
              </tr>
              <tr>
                <td className="p-3 text-pink-400 font-semibold">variant</td>
                <td className="p-3 text-zinc-400">"default" | "outline"</td>
                <td className="p-3 text-zinc-500">"default"</td>
                <td className="p-3 font-sans text-zinc-300">The visual style variant of the button.</td>
              </tr>
              <tr>
                <td className="p-3 text-pink-400 font-semibold">size</td>
                <td className="p-3 text-zinc-400">"default" | "sm" | "lg" | "icon"</td>
                <td className="p-3 text-zinc-500">"default"</td>
                <td className="p-3 font-sans text-zinc-300">The button sizing preset.</td>
              </tr>
              <tr>
                <td className="p-3 text-pink-400 font-semibold">className</td>
                <td className="p-3 text-zinc-400">string</td>
                <td className="p-3 text-zinc-500">-</td>
                <td className="p-3 font-sans text-zinc-300">Additional CSS classes to apply.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits */}
      <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center justify-between">
        <span>Authored by @dillionverma for Magic UI.</span>
        <a
          href="https://magicui.design/docs/components/rainbow-button"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-white"
        >
          <span>Magic UI Docs</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}

