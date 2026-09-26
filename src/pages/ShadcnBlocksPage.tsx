"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"
import {
  Search,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Star,
  Terminal,
  X,
  Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ImageGenerationLoaderPreview,
  ChromaticImagePreview,
  CloudShaderPreview,
  HeroSectionsPreview,
  AnimatedBeamMiniPreview,
} from "@/components/blocks/block-previews"
import { GlareHoverBlockCardPreview } from "@/components/magicui/glare-hover-demo"
import { DockCardPreview } from "@/components/magicui/dock-demo"
import { TweetCardBlockPreview } from "@/components/magicui/tweet-card-demo"
import { MagicCardBlockPreview } from "@/components/magicui/magic-card-demo"
import { WarpBackgroundBlockPreview } from "@/components/magicui/warp-background-demo"
import { Floating3DParticlesBlockPreview } from "@/components/magicui/floating-3d-particles-demo"
import { MarqueeBlockPreview } from "@/components/magicui/marquee-demo"
import { GlobeBlockPreview } from "@/components/magicui/globe-demo"
import { TerminalBlockPreview } from "@/components/magicui/terminal-demo"
import { BentoGridBlockPreview } from "@/components/magicui/bento-grid-demo"
import { RainbowButtonBlockPreview } from "@/components/magicui/rainbow-button-demo"
import { ThreeDCardBlockPreview } from "@/components/ui/three-d-card-demo"
import { AnimatedShinyTextBlockPreview } from "@/components/magicui/animated-shiny-text-demo"
import { ScrollBasedVelocityBlockPreview } from "@/components/magicui/scroll-based-velocity-demo"
import { SmoothCursorBlockPreview } from "@/components/magicui/smooth-cursor-demo"
import { AnimatedListBlockPreview } from "@/components/magicui/animated-list-demo"
import { RippleBlockPreview } from "@/components/magicui/ripple-demo"
import { StripedPatternBlockPreview } from "@/components/magicui/striped-pattern-demo"
import { PixelImageBlockPreview } from "@/components/magicui/pixel-image-demo"
import { DiaTextRevealBlockPreview } from "@/components/magicui/dia-text-reveal-demo"
import { ThemeTogglerBlockPreview } from "@/components/magicui/animated-theme-toggler-demo"
import { DotPatternBlockPreview } from "@/components/magicui/dot-pattern-demo"
import { ParticlesBlockPreview } from "@/components/magicui/particles-demo"
import { TooltipCardBlockPreview } from "@/components/ui/tooltip-card-demo"
import { AnimatedTestimonialsBlockPreview } from "@/components/ui/animated-testimonials-demo"

interface BlockItem {
  id: string
  title: string
  category: "Magic UI" | "Canvas & Shaders" | "Heroes" | "Integrations" | "Components"
  badge?: string
  hasStar?: boolean
  description: string
  cliCommand: string
  componentTarget?: string
  renderPreview: () => React.ReactNode
}

interface ShadcnBlocksPageProps {
  onSelectComponent: (name: string) => void
}

export function ShadcnBlocksPage({ onSelectComponent }: ShadcnBlocksPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeModalBlock, setActiveModalBlock] = useState<BlockItem | null>(null)

  const categories = [
    "All",
    "Magic UI",
    "Canvas & Shaders",
    "Heroes",
    "Integrations",
    "Components",
  ]

  // Blocks catalog matching the user reference screenshot (media_1790454297899.png)
  const blocks: BlockItem[] = [
    {
      id: "image-generation-loader",
      title: "Image Generation Loader",
      category: "Canvas & Shaders",
      description:
        "A canvas loader that scans across an image with animated pixel grids, text...",
      cliCommand: "npx shadcn@latest add @magicui/image-generation-loader",
      renderPreview: () => <ImageGenerationLoaderPreview />,
    },
    {
      id: "chromatic-image",
      title: "Chromatic Image",
      category: "Canvas & Shaders",
      description:
        "An interactive image with responsive color separation, displacement, and tilt.",
      cliCommand: "npx shadcn@latest add @magicui/chromatic-image",
      renderPreview: () => <ChromaticImagePreview />,
    },
    {
      id: "cloud-shader",
      title: "Cloud Shader",
      category: "Canvas & Shaders",
      description:
        "Soft procedural clouds that drift across the sky. Tune speed, count, and colors...",
      cliCommand: "npx shadcn@latest add @magicui/cloud-shader",
      renderPreview: () => <CloudShaderPreview />,
    },
    {
      id: "hero-sections",
      title: "Hero Sections",
      category: "Heroes",
      badge: "25+ blocks",
      hasStar: true,
      description:
        "A collection of hero sections that are modern and stand out",
      cliCommand: "npx shadcn@latest add @magicui/hero-sections",
      renderPreview: () => <HeroSectionsPreview />,
    },
    {
      id: "animated-beam",
      title: "Animated Beam",
      category: "Integrations",
      badge: "Magic UI",
      componentTarget: "Animated Beam",
      description:
        "An animated beam of light which travels along a path. Useful for showcasing integration features.",
      cliCommand: "npx shadcn@latest add @magicui/animated-beam",
      renderPreview: () => <AnimatedBeamMiniPreview />,
    },
    {
      id: "bento-grid",
      title: "Bento Grid",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Bento Grid",
      description:
        "Bento grid is a layout used to showcase the features of a product in a simple and elegant way.",
      cliCommand: "npx shadcn@latest add @magicui/bento-grid",
      renderPreview: () => <BentoGridBlockPreview />,
    },
    {
      id: "globe",
      title: "Globe",
      category: "Magic UI",
      badge: "WebGL",
      componentTarget: "Globe",
      description:
        "An autorotating, interactive, and highly performant globe made using WebGL.",
      cliCommand: "npx shadcn@latest add @magicui/globe",
      renderPreview: () => <GlobeBlockPreview />,
    },
    {
      id: "dock",
      title: "Dock",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Dock",
      description:
        "An implementation of the MacOS dock using react + tailwindcss + framer motion",
      cliCommand: "npx shadcn@latest add @magicui/dock",
      renderPreview: () => <DockCardPreview />,
    },
    {
      id: "glare-hover",
      title: "Glare Hover",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Glare Hover",
      description:
        "A diagonal light glare on hover using a ::before gradient, CSS variables, and background-position animation—no extra global keyframes required.",
      cliCommand: "npx shadcn@latest add @magicui/glare-hover",
      renderPreview: () => <GlareHoverBlockCardPreview />,
    },
    {
      id: "tweet-card",
      title: "Tweet Card",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Tweet Card",
      description:
        "A card that displays a tweet with the author's name, handle, and profile picture.",
      cliCommand: "npx shadcn@latest add @magicui/tweet-card",
      renderPreview: () => <TweetCardBlockPreview />,
    },
    {
      id: "magic-card",
      title: "Magic Card",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Magic Card",
      description:
        "A spotlight effect that follows your mouse cursor and highlights borders on hover.",
      cliCommand: "npx shadcn@latest add @magicui/magic-card",
      renderPreview: () => <MagicCardBlockPreview />,
    },
    {
      id: "warp-background",
      title: "Warp Background",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Warp Background",
      description:
        "A card with a time warping background effect.",
      cliCommand: "npx shadcn@latest add @magicui/warp-background",
      renderPreview: () => <WarpBackgroundBlockPreview />,
    },
    {
      id: "floating-3d-particles",
      title: "Floating 3D Particles",
      category: "Canvas & Shaders",
      badge: "Canvas 3D",
      componentTarget: "Floating 3D Particles",
      description:
        "A canvas-based pseudo-3D particle field with perspective projection, continuous rotation, buoyant drift and depth-aware rendering.",
      cliCommand: "npx shadcn@latest add @magicui/floating-3d-particles",
      renderPreview: () => <Floating3DParticlesBlockPreview />,
    },
    {
      id: "marquee",
      title: "Marquee",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Marquee",
      description:
        "An infinite scrolling component that can be used to display text, images, or videos.",
      cliCommand: "npx shadcn@latest add @magicui/marquee",
      renderPreview: () => <MarqueeBlockPreview />,
    },
    {
      id: "terminal",
      title: "Terminal",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Terminal",
      description:
        "An implementation of the MacOS terminal. Useful for showcasing a command line interface.",
      cliCommand: "npx shadcn@latest add @magicui/terminal",
      renderPreview: () => <TerminalBlockPreview />,
    },
    {
      id: "rainbow-button",
      title: "Rainbow Button",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Rainbow Button",
      description:
        "An animated button with a continuous rainbow linear gradient border and glowing aura.",
      cliCommand: "npx shadcn@latest add @magicui/rainbow-button",
      renderPreview: () => <RainbowButtonBlockPreview />,
    },
    {
      id: "3d-card",
      title: "3D Card Effect",
      category: "Components",
      badge: "Aceternity",
      componentTarget: "3D Card Effect",
      description:
        "A card perspective effect, hover over the card to elevate card elements.",
      cliCommand: "npx shadcn@latest add @aceternity/3d-card-demo",
      renderPreview: () => <ThreeDCardBlockPreview />,
    },
    {
      id: "animated-shiny-text",
      title: "Animated Shiny Text",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Animated Shiny Text",
      description:
        "A light glare effect which pans across text making it appear as if it is shimmering.",
      cliCommand: "npx shadcn@latest add @magicui/animated-shiny-text",
      renderPreview: () => <AnimatedShinyTextBlockPreview />,
    },
    {
      id: "scroll-based-velocity",
      title: "Scroll Based Velocity",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Scroll Based Velocity",
      description:
        "Scrolling text whose speed changes based on scroll speed.",
      cliCommand: "npx shadcn@latest add @magicui/scroll-based-velocity",
      renderPreview: () => <ScrollBasedVelocityBlockPreview />,
    },
    {
      id: "smooth-cursor",
      title: "Smooth Cursor",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Smooth Cursor",
      description:
        "A customizable, physics-based smooth cursor animation component for React applications.",
      cliCommand: "npx shadcn@latest add @magicui/smooth-cursor",
      renderPreview: () => <SmoothCursorBlockPreview />,
    },
    {
      id: "animated-list",
      title: "Animated List",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Animated List",
      description:
        "A list that animates each item in sequence with a delay. Used to showcase notifications or events.",
      cliCommand: "npx shadcn@latest add @magicui/animated-list",
      renderPreview: () => <AnimatedListBlockPreview />,
    },
    {
      id: "ripple",
      title: "Ripple",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Ripple",
      description:
        "An animated ripple effect typically used behind elements to emphasize them.",
      cliCommand: "npx shadcn@latest add @magicui/ripple",
      renderPreview: () => <RippleBlockPreview />,
    },
    {
      id: "striped-pattern",
      title: "Striped Pattern",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Striped Pattern",
      description:
        "A background striped pattern made with SVGs, fully customizable using Tailwind CSS.",
      cliCommand: "npx shadcn@latest add @magicui/striped-pattern",
      renderPreview: () => <StripedPatternBlockPreview />,
    },
    {
      id: "pixel-image",
      title: "Pixel Image",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Pixel Image",
      description:
        "A component that displays your image with a pixelated effect, enhancing visual appeal.",
      cliCommand: "npx shadcn@latest add @magicui/pixel-image",
      renderPreview: () => <PixelImageBlockPreview />,
    },
    {
      id: "dia-text-reveal",
      title: "Dia Text Reveal",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Dia Text Reveal",
      description:
        "A horizontal color band sweeps across text with a gradient shine, then settles on your foreground color.",
      cliCommand: "npx shadcn@latest add @magicui/dia-text-reveal",
      renderPreview: () => <DiaTextRevealBlockPreview />,
    },
    {
      id: "theme-toggler",
      title: "Theme Toggler",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Theme Toggler",
      description:
        "Animated theme toggle using the View Transitions API with configurable clip-path shapes.",
      cliCommand: "npx shadcn@latest add @magicui/animated-theme-toggler",
      renderPreview: () => <ThemeTogglerBlockPreview />,
    },
    {
      id: "dot-pattern",
      title: "Dot Pattern",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Dot Pattern",
      description:
        "A background dot pattern made with SVGs, fully customizable using Tailwind CSS.",
      cliCommand: "npx shadcn@latest add @magicui/dot-pattern",
      renderPreview: () => <DotPatternBlockPreview />,
    },
    {
      id: "particles",
      title: "Particles",
      category: "Magic UI",
      badge: "Magic UI",
      componentTarget: "Particles",
      description:
        "Particles are a fun way to add some visual flair, movement, and depth to your website.",
      cliCommand: "npx shadcn@latest add @magicui/particles",
      renderPreview: () => <ParticlesBlockPreview />,
    },
    {
      id: "tooltip-card",
      title: "Tooltip Card",
      category: "Components",
      badge: "Aceternity",
      componentTarget: "Tooltip Card",
      description:
        "A tooltip card container that follows mouse pointer when hovered over.",
      cliCommand: "npx shadcn@latest add @aceternity/tooltip-card-demo",
      renderPreview: () => <TooltipCardBlockPreview />,
    },
    {
      id: "animated-testimonials",
      title: "Animated Testimonials",
      category: "Components",
      badge: "Aceternity",
      componentTarget: "Animated Testimonials",
      description:
        "Minimal testimonials sections with image and quote.",
      cliCommand: "npx shadcn@latest add @aceternity/animated-testimonials-demo",
      renderPreview: () => <AnimatedTestimonialsBlockPreview />,
    },
  ]

  const handleCopyCli = (e: React.MouseEvent, id: string, command: string) => {
    e.stopPropagation()
    navigator.clipboard.writeText(command)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCardClick = (block: BlockItem) => {
    if (block.componentTarget) {
      onSelectComponent(block.componentTarget)
    } else {
      setActiveModalBlock(block)
    }
  }

  const filteredBlocks = useMemo(() => {
    return blocks.filter((b) => {
      const matchQuery =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCategory =
        selectedCategory === "All" || b.category === selectedCategory
      return matchQuery && matchCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header section with high-contrast Slate design */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="type-h1 text-[var(--text-main)] tracking-tight">Blocks</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              4-Column Grid
            </span>
          </div>
          <p className="type-body text-[var(--text-muted)] max-w-2xl text-[13px] leading-relaxed">
            Beautifully crafted, responsive components and interactive building blocks for landing pages, hero banners, and integration flows.
          </p>
        </div>

        {/* Header action button */}
        <div className="shrink-0 pt-1">
          <button
            onClick={() => onSelectComponent("Animated Beam")}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] text-xs text-[var(--text-muted)] font-mono transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="size-3 text-amber-400" />
            <span>Featured: Animated Beam</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer shrink-0",
                  isActive
                    ? "bg-[var(--text-main)] text-[var(--bg-page)] shadow-sm font-semibold"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)]"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="size-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-active)] focus:ring-1 focus:ring-[var(--border-active)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4-Column Responsive Grid matching user reference screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredBlocks.map((block) => (
          <div
            key={block.id}
            onClick={() => handleCardClick(block)}
            className="group relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-active)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            {/* Top Interactive Preview Stage with Aspect Ratio */}
            <div className="relative aspect-[16/11] w-full overflow-hidden select-none flex items-center justify-center">
              {block.renderPreview()}

              {/* Star Badge on Top-Right (as shown on Card 4 in screenshot) */}
              {block.hasStar && (
                <div className="absolute top-3 right-3 z-20 size-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)] pointer-events-none">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                </div>
              )}

            </div>

            {/* Bottom Content Metadata Area matching typography rules (16px Title, 13px Body) */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-1.5 bg-[var(--bg-card)]">
              {/* Title Row with optional Badge (e.g. 25+ blocks) */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[16px] font-semibold text-[var(--text-main)] group-hover:text-blue-400 transition-colors tracking-tight leading-snug">
                  {block.title}
                </h3>
                {block.badge && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                    {block.badge}
                  </span>
                )}
              </div>

              {/* Description (Strictly 13px Body font size) */}
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {block.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Detail Modal for previewing code & details */}
      <AnimatePresence>
        {activeModalBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-2xl p-6 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-semibold text-[var(--text-main)]">
                      {activeModalBlock.title}
                    </h3>
                    {activeModalBlock.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {activeModalBlock.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)]">
                    {activeModalBlock.description}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalBlock(null)}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Live Preview Box */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[#0A0A0A] p-3 flex items-center justify-center">
                {activeModalBlock.renderPreview()}
              </div>

              {/* CLI Installation Command Bar */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--text-muted)]">Installation</span>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] font-mono text-xs text-[var(--text-main)]">
                  <code className="truncate">{activeModalBlock.cliCommand}</code>
                  <button
                    onClick={(e) => handleCopyCli(e, activeModalBlock.id, activeModalBlock.cliCommand)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedId === activeModalBlock.id ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setActiveModalBlock(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveModalBlock(null)
                    onSelectComponent("Animated Beam")
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Explore All Magic UI</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
