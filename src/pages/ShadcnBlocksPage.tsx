import React, { useState, useMemo } from "react"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam-demo"
import { Search, Sparkles, Copy, Check, ArrowRight, ExternalLink, Box, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockItem {
  id: string
  title: string
  category: string
  description: string
  cliCommand: string
  componentName: string
  isFeatured?: boolean
  isNew?: boolean
  renderPreview: () => React.ReactNode
}

interface ShadcnBlocksPageProps {
  onSelectComponent: (name: string) => void
}

export function ShadcnBlocksPage({ onSelectComponent }: ShadcnBlocksPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", "Magic UI", "Integrations", "Heroes", "Bento Grids"]

  const blocks: BlockItem[] = [
    {
      id: "animated-beam",
      title: "Animated Beam",
      category: "Magic UI",
      description:
        "An animated beam of light which travels along a path. Useful for showcasing the 'integration' features of a website.",
      cliCommand: "npx shadcn@latest add @magicui/animated-beam",
      componentName: "Animated Beam",
      isFeatured: true,
      isNew: true,
      renderPreview: () => <AnimatedBeamDemo className="max-w-full h-[320px] rounded-xl border-0 shadow-none bg-transparent" />,
    },
  ]

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredBlocks = useMemo(() => {
    return blocks.filter((b) => {
      const matchQuery =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCat =
        selectedCategory === "All" || b.category === selectedCategory
      return matchQuery && matchCat
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="flex-1 max-w-4xl py-8 px-4 sm:px-8 space-y-8">
      {/* Header section */}
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-7">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="type-h1 text-[var(--text-main)]">Blocks</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Magic UI & UI Blocks
            </span>
          </div>
          <p className="type-body text-[var(--text-muted)] max-w-xl">
            Clean, interactive, and beautifully composed building blocks for showcasing integrations, hero sections, and feature highlights.
          </p>
        </div>

        {/* Action buttons */}
        <ShadcnPageActions
          pageTitle="Blocks"
          onNext={() => onSelectComponent("Animated Beam")}
          nextLabel="Featured: Animated Beam"
          hideNav={false}
        />
      </div>

      {/* Controls: Search & Category Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="size-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--border-subtle)] transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0",
                selectedCategory === cat
                  ? "bg-[var(--text-main)] text-[var(--bg-page)]"
                  : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blocks Showcase Cards */}
      <div className="space-y-8">
        {filteredBlocks.map((block) => (
          <div
            key={block.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-xl transition-all"
          >
            {/* Block Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:px-6 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="type-heading font-semibold text-[16px] text-[var(--text-main)]">
                    {block.title}
                  </h3>
                  {block.isNew && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      New
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {block.category}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {block.description}
                </p>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(block.id, block.cliCommand)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                  title="Copy CLI command"
                >
                  {copiedId === block.id ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[11px]">Copied CLI</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span className="font-mono text-[11px]">CLI Add</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectComponent(block.componentName)}
                  className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Block Live Interactive Demo Area */}
            <div className="p-4 sm:p-8 flex items-center justify-center bg-[var(--bg-page)]/40 min-h-[340px]">
              {block.renderPreview()}
            </div>

            {/* Block Card Footer Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <code className="text-[11px] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-main)]">
                  {block.cliCommand}
                </code>
              </div>
              <button
                onClick={() => onSelectComponent(block.componentName)}
                className="hover:text-[var(--text-main)] transition-colors flex items-center gap-1"
              >
                <span>Full Documentation &amp; Props</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
