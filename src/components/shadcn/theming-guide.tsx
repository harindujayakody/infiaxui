import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Palette,
  Sparkles,
  Check,
  Copy,
  Sliders,
  Layers,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/shadcn/badge"
import { Switch } from "@/components/shadcn/switch"
import { Input } from "@/components/shadcn/input"

interface ColorPreset {
  name: string
  label: string
  primaryLight: string
  primaryDark: string
  primaryLightOklch: string
  primaryDarkOklch: string
  accentColor: string
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "neutral",
    label: "Neutral",
    primaryLight: "#171717",
    primaryDark: "#fafafa",
    primaryLightOklch: "oklch(0.205 0 0)",
    primaryDarkOklch: "oklch(0.985 0 0)",
    accentColor: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
  },
  {
    name: "zinc",
    label: "Zinc",
    primaryLight: "#18181b",
    primaryDark: "#f4f4f5",
    primaryLightOklch: "oklch(0.21 0.006 285.885)",
    primaryDarkOklch: "oklch(0.985 0 0)",
    accentColor: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  },
  {
    name: "slate",
    label: "Slate",
    primaryLight: "#0f172a",
    primaryDark: "#f8fafc",
    primaryLightOklch: "oklch(0.208 0.042 265.755)",
    primaryDarkOklch: "oklch(0.984 0.003 247.858)",
    accentColor: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
  },
  {
    name: "stone",
    label: "Stone",
    primaryLight: "#1c1917",
    primaryDark: "#fafaf9",
    primaryLightOklch: "oklch(0.216 0.006 56.043)",
    primaryDarkOklch: "oklch(0.985 0.001 106.423)",
    accentColor: "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
  },
  {
    name: "blue",
    label: "Blue",
    primaryLight: "#2563eb",
    primaryDark: "#3b82f6",
    primaryLightOklch: "oklch(0.546 0.245 262.881)",
    primaryDarkOklch: "oklch(0.623 0.214 259.815)",
    accentColor: "bg-blue-600 text-white dark:bg-blue-500 dark:text-white",
  },
  {
    name: "violet",
    label: "Violet",
    primaryLight: "#7c3aed",
    primaryDark: "#8b5cf6",
    primaryLightOklch: "oklch(0.541 0.281 293.009)",
    primaryDarkOklch: "oklch(0.606 0.25 292.717)",
    accentColor: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
  },
  {
    name: "emerald",
    label: "Emerald",
    primaryLight: "#059669",
    primaryDark: "#10b981",
    primaryLightOklch: "oklch(0.596 0.145 163.225)",
    primaryDarkOklch: "oklch(0.696 0.17 162.48)",
    accentColor: "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white",
  },
  {
    name: "rose",
    label: "Rose",
    primaryLight: "#e11d48",
    primaryDark: "#f43f5e",
    primaryLightOklch: "oklch(0.588 0.233 17.595)",
    primaryDarkOklch: "oklch(0.645 0.246 16.439)",
    accentColor: "bg-rose-600 text-white dark:bg-rose-500 dark:text-white",
  },
  {
    name: "amber",
    label: "Amber",
    primaryLight: "#d97706",
    primaryDark: "#f59e0b",
    primaryLightOklch: "oklch(0.665 0.179 58.318)",
    primaryDarkOklch: "oklch(0.769 0.188 70.08)",
    accentColor: "bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950",
  },
]

const RADIUS_OPTIONS = [
  { label: "0", value: "0px", description: "Sharp, brutalist edges" },
  { label: "0.3", value: "0.3rem", description: "Subtle tight radius" },
  { label: "0.5", value: "0.5rem", description: "Default standard" },
  { label: "0.75", value: "0.75rem", description: "Smooth rounded modern" },
  { label: "1.0", value: "1.0rem", description: "Pill / playful curvature" },
]

export function ThemingGuide() {
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(COLOR_PRESETS[0])
  const [selectedRadius, setSelectedRadius] = useState(RADIUS_OPTIONS[2])
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const handleCopy = (text: string, token: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const generatedCssVariables = `@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: ${selectedPreset.primaryLightOklch};
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: ${selectedPreset.primaryLightOklch};
    --radius: ${selectedRadius.value};
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.145 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.145 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: ${selectedPreset.primaryDarkOklch};
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.637 0.237 25.331);
    --border: oklch(0.269 0 0);
    --input: oklch(0.269 0 0);
    --ring: ${selectedPreset.primaryDarkOklch};
  }
}`

  const themeTokens = [
    {
      token: "background",
      foregroundToken: "foreground",
      description: "Default page background color and primary body typography text.",
      classes: "bg-background text-foreground",
    },
    {
      token: "card",
      foregroundToken: "card-foreground",
      description: "Card, sheet, and elevated panel surfaces.",
      classes: "bg-card text-card-foreground",
    },
    {
      token: "popover",
      foregroundToken: "popover-foreground",
      description: "Floating overlays, tooltips, dropdown menus, and popovers.",
      classes: "bg-popover text-popover-foreground",
    },
    {
      token: "primary",
      foregroundToken: "primary-foreground",
      description: "Primary call-to-action buttons, active tabs, and emphasized UI elements.",
      classes: "bg-primary text-primary-foreground",
    },
    {
      token: "secondary",
      foregroundToken: "secondary-foreground",
      description: "Secondary actions, quiet badges, and subtle container buttons.",
      classes: "bg-secondary text-secondary-foreground",
    },
    {
      token: "muted",
      foregroundToken: "muted-foreground",
      description: "Subtle backgrounds, secondary descriptions, and placeholder captions.",
      classes: "bg-muted text-muted-foreground",
    },
    {
      token: "accent",
      foregroundToken: "accent-foreground",
      description: "Hover and focus states for list items, dropdown options, and navigation.",
      classes: "bg-accent text-accent-foreground",
    },
    {
      token: "destructive",
      foregroundToken: "destructive-foreground",
      description: "Destructive actions, error notifications, and delete confirmations.",
      classes: "bg-destructive text-destructive-foreground",
    },
    {
      token: "border",
      foregroundToken: "—",
      description: "Default border color for cards, dividers, tables, and wrappers.",
      classes: "border-border",
    },
    {
      token: "input",
      foregroundToken: "—",
      description: "Border color specifically calibrated for inputs, textareas, and radios.",
      classes: "border-input",
    },
    {
      token: "ring",
      foregroundToken: "—",
      description: "Focus outline ring for keyboard navigation accessibility.",
      classes: "ring-ring",
    },
  ]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Visual Preset Builder Callout */}
      <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs flex items-start gap-3 shadow-sm">
        <Sparkles className="size-4 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold">Want to build your theme visually?</span>
          <p className="text-indigo-700 dark:text-indigo-300">
            Use <strong className="underline cursor-pointer">shadcn/create</strong> to preview colors, radius, fonts, and icons, then generate a tailored preset for your project.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <section id="overview" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Overview</h2>
        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          We use and recommend <strong>CSS variables</strong> for theming. This gives you semantic theme tokens like{" "}
          <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">background</code>,{" "}
          <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">foreground</code>, and{" "}
          <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">primary</code> that components use by default. Override those tokens in your CSS to change the look and feel of your app without rewriting component classes.
        </p>

        <CodeBlock
          code={`<div className="bg-background text-foreground" />`}
          language="tsx"
          fileName="Usage Example"
        />

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          To enable CSS variables for theming, ensure <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">tailwind.cssVariables</code> is set to <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">true</code> in your <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">components.json</code> file. This is the default setting.
        </p>

        <CodeBlock
          code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}`}
          language="json"
          fileName="components.json"
        />
      </section>

      {/* Interactive Theme Playground */}
      <section id="theme-playground" className="scroll-mt-20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="type-h2 text-[var(--text-main)]">Interactive Theme Playground</h2>
            <p className="type-body text-[var(--text-muted)]">
              Test palette accents and border radiuses in real time to generate your custom CSS.
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:flex items-center gap-1.5">
            <Sliders className="size-3 text-indigo-500" />
            Live Preview
          </Badge>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
          {/* Controls: Color Palettes & Radius */}
          <div className="space-y-4">
            <div>
              <label className="type-caption uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2.5 block">
                1. Base Color Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = selectedPreset.name === preset.name
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setSelectedPreset(preset)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm scale-105"
                          : "border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <span
                        className="size-3 rounded-full border border-black/10 dark:border-white/20"
                        style={{ backgroundColor: preset.primaryLight }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="type-caption uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2.5 block">
                2. Border Radius Scale ({selectedRadius.value})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {RADIUS_OPTIONS.map((rad) => {
                  const isSelected = selectedRadius.label === rad.label
                  return (
                    <button
                      key={rad.label}
                      onClick={() => setSelectedRadius(rad)}
                      className={`px-3 py-2 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm"
                          : "border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <div className="font-semibold text-xs text-[var(--text-main)]">{rad.label}</div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate">{rad.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Interactive Component Preview Stage */}
          <div
            className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-6 transition-all"
            style={{ borderRadius: selectedRadius.value }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h4 className="type-h4 text-[var(--text-main)]">Project Dashboard</h4>
                <p className="type-caption text-[var(--text-muted)]">
                  Live preview rendered with <code className="font-mono font-semibold">{selectedPreset.label}</code> theme and <code className="font-mono font-semibold">{selectedRadius.value}</code> radius.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  style={{
                    backgroundColor: selectedPreset.primaryLight,
                    color: "#ffffff",
                    borderRadius: selectedRadius.value,
                  }}
                >
                  Active Preset
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card Example */}
              <div
                className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 shadow-sm"
                style={{ borderRadius: selectedRadius.value }}
              >
                <div className="space-y-1">
                  <div className="font-medium text-xs text-[var(--text-main)]">Email Subscriptions</div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    Receive automated weekly analytics summaries.
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[var(--text-muted)]">Weekly digest</span>
                  <Switch checked={true} />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    className="flex-1 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-95"
                    style={{
                      backgroundColor: selectedPreset.primaryLight,
                      borderRadius: selectedRadius.value,
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-3 py-1.5 text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-card)]"
                    style={{ borderRadius: selectedRadius.value }}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Form Input Example */}
              <div
                className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 shadow-sm"
                style={{ borderRadius: selectedRadius.value }}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[var(--text-main)]">API Key Token</label>
                  <Input
                    readOnly
                    value="pk_live_51Msz4829Fj89A2kL0028"
                    className="font-mono text-xs"
                    style={{ borderRadius: selectedRadius.value }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" style={{ borderRadius: selectedRadius.value }}>
                    Read / Write
                  </Badge>
                  <Badge variant="outline" style={{ borderRadius: selectedRadius.value }}>
                    Production
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="type-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Generated globals.css for {selectedPreset.label}
              </span>
              <button
                onClick={() => handleCopy(generatedCssVariables, "theme-css")}
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                {copiedToken === "theme-css" ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied CSS</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy CSS</span>
                  </>
                )}
              </button>
            </div>
            <CodeBlock
              code={generatedCssVariables}
              language="css"
              fileName="app/globals.css"
            />
          </div>
        </div>
      </section>

      {/* Conventions Section */}
      <section id="conventions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Conventions</h2>
        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          We use a simple <strong>Background / Foreground</strong> convention for colors. Whenever a background color is defined, an accompanying foreground token exists for high-contrast legible typography.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-neutral-900 dark:bg-neutral-100" />
              <span className="font-semibold text-xs text-[var(--text-main)]">Primary Pairing</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <code className="font-mono text-[11px] text-[var(--text-main)]">bg-primary</code> applies the background color, and{" "}
              <code className="font-mono text-[11px] text-[var(--text-main)]">text-primary-foreground</code> applies the matching readable text color.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-neutral-200 dark:bg-neutral-800" />
              <span className="font-semibold text-xs text-[var(--text-main)]">Muted Pairing</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <code className="font-mono text-[11px] text-[var(--text-main)]">bg-muted</code> creates subdued container backdrops, paired with{" "}
              <code className="font-mono text-[11px] text-[var(--text-main)]">text-muted-foreground</code> for secondary copy.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-rose-500" />
              <span className="font-semibold text-xs text-[var(--text-main)]">Destructive Pairing</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <code className="font-mono text-[11px] text-[var(--text-main)]">bg-destructive</code> delivers urgent alert red, paired with{" "}
              <code className="font-mono text-[11px] text-[var(--text-main)]">text-destructive-foreground</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Theme Tokens Table */}
      <section id="tokens-table" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">List of Theme Tokens</h2>
        <p className="type-body text-[var(--text-muted)]">
          Every component in the system is styled using these canonical theme variables.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50">
                  <th className="p-3 font-semibold text-[var(--text-main)]">Token Variable</th>
                  <th className="p-3 font-semibold text-[var(--text-main)]">Foreground Token</th>
                  <th className="p-3 font-semibold text-[var(--text-main)]">Tailwind Classes</th>
                  <th className="p-3 font-semibold text-[var(--text-main)]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono">
                {themeTokens.map((item) => (
                  <tr key={item.token} className="hover:bg-[var(--bg-subtle)]/30 transition-colors">
                    <td className="p-3 text-indigo-500 font-semibold flex items-center gap-1.5">
                      <span>--{item.token}</span>
                      <button
                        onClick={() => handleCopy(`--${item.token}`, item.token)}
                        className="opacity-0 group-hover:opacity-100 hover:text-[var(--text-main)]"
                        title="Copy variable"
                      >
                        <Copy className="size-3" />
                      </button>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">
                      {item.foregroundToken !== "—" ? (
                        <span className="text-emerald-500">--{item.foregroundToken}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 text-[var(--text-main)] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                        {item.classes}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-[var(--text-muted)]">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Derived Radius Scale */}
      <section id="radius-scale" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Derived Radius Scale</h2>
        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          The <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">--radius</code> variable serves as the single source of truth for the entire application's border radius scale. Nested child radius classes automatically compute from this base value:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { name: "rounded-sm", formula: "calc(var(--radius) - 4px)" },
            { name: "rounded-md", formula: "calc(var(--radius) - 2px)" },
            { name: "rounded-lg", formula: "var(--radius)" },
            { name: "rounded-xl", formula: "calc(var(--radius) + 4px)" },
            { name: "rounded-2xl", formula: "calc(var(--radius) + 8px)" },
            { name: "rounded-3xl", formula: "calc(var(--radius) + 12px)" },
            { name: "rounded-4xl", formula: "calc(var(--radius) + 16px)" },
          ].map((r) => (
            <div
              key={r.name}
              className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1.5"
            >
              <div className="size-10 mx-auto border-2 border-indigo-500 bg-indigo-500/10 flex items-center justify-center text-[10px] font-mono font-semibold" style={{ borderRadius: selectedRadius.value }}>
                {r.name.replace("rounded-", "")}
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--text-main)]">{r.name}</div>
              <div className="font-mono text-[10px] text-[var(--text-muted)] truncate" title={r.formula}>
                {r.formula}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adding Custom Tokens */}
      <section id="custom-tokens" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Adding New Tokens</h2>
        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          To add custom semantic color tokens (such as <code className="font-mono text-xs">warning</code> or <code className="font-mono text-xs">info</code>), define the CSS variables in <code className="font-mono text-xs">globals.css</code> and bind them into Tailwind using the <code className="font-mono text-xs">@theme inline</code> directive.
        </p>

        <CodeBlock
          code={`@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}

:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 84);
  --info: oklch(0.70 0.14 235);
  --info-foreground: oklch(0.98 0 0);
  --success: oklch(0.72 0.19 145);
  --success-foreground: oklch(0.98 0 0);
}`}
          language="css"
          fileName="app/globals.css"
        />

        <p className="type-body text-[var(--text-muted)] leading-relaxed">
          You can now immediately use <code className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-main)]">bg-warning text-warning-foreground</code> across any component.
        </p>
      </section>
    </div>
  )
}
