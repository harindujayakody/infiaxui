import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// ScrollArea primitive
// ---------------------------------------------------------------------------
function ScrollArea({
  children,
  className,
  orientation = "vertical",
}: {
  children: React.ReactNode
  className?: string
  orientation?: "vertical" | "horizontal" | "both"
}) {
  return (
    <div
      className={cn(
        "relative overflow-auto rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)]",
        className
      )}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "var(--border-subtle) transparent",
      }}
    >
      {children}
    </div>
  )
}

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const ARTWORKS = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465865523598-a834aac5d3fa?w=300&dpr=2&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=300&dpr=2&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?w=300&dpr=2&q=80",
  },
  {
    artist: "Eberhard Grossgasteiger",
    art: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&dpr=2&q=80",
  },
]

export function ScrollAreaGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ScrollArea</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>ScrollArea</div>
          <div className="pl-4">└── ScrollBar</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A scrollable area that constrains height with custom styled scrollbars.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <ScrollArea className="h-72 w-56 p-4">
            <h4 className="mb-4 text-xs font-semibold text-[var(--text-main)]">Tags</h4>
            <div className="space-y-2">
              {TAGS.map((tag) => (
                <div
                  key={tag}
                  className="text-xs text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)] last:border-0 hover:text-[var(--text-main)] cursor-pointer transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-48 rounded-md border p-4">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <React.Fragment key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </React.Fragment>
    ))}
  </div>
</ScrollArea>`}
        />
      </section>

      {/* Horizontal */}
      <section id="horizontal" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Horizontal</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">ScrollBar</code> with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">orientation="horizontal"</code> for horizontal scrolling.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <ScrollArea className="w-full max-w-md whitespace-nowrap p-4" orientation="horizontal">
            <div className="flex w-max space-x-4">
              {ARTWORKS.map((artwork) => (
                <figure key={artwork.artist} className="shrink-0">
                  <div className="overflow-hidden rounded-md border border-[var(--border-subtle)]">
                    <img
                      src={artwork.art}
                      alt={`Photo by ${artwork.artist}`}
                      className="aspect-[3/4] h-48 w-36 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <figcaption className="pt-2 text-xs text-[var(--text-muted)] text-center">
                    Photo by <span className="font-semibold text-[var(--text-main)]">{artwork.artist}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </ScrollArea>
        </div>
        <CodeBlock
          language="tsx"
          code={`<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {works.map((artwork) => (
      <figure key={artwork.artist} className="shrink-0">
        <div className="overflow-hidden rounded-md">
          <Image
            src={artwork.art}
            alt={\`Photo by \${artwork.artist}\`}
            className="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
        <figcaption className="pt-2 text-xs text-muted-foreground">
          Photo by{" "}
          <span className="font-semibold text-foreground">
            {artwork.artist}
          </span>
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Scroll Area supports RTL direction. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <ScrollArea className="h-48 w-60 p-4">
            <h4 className="mb-3 text-xs font-semibold text-[var(--text-main)]">قائمة العناصر</h4>
            <div className="space-y-2">
              {["العنصر الأول", "العنصر الثاني", "العنصر الثالث", "العنصر الرابع", "العنصر الخامس", "العنصر السادس"].map((item) => (
                <div key={item} className="text-xs text-[var(--text-muted)] pb-1.5 border-b border-[var(--border-subtle)] last:border-0">
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ScrollArea</td>
                <td className="p-3 font-mono">type</td>
                <td className="p-3 font-mono">"auto" | "always" | "scroll" | "hover"</td>
                <td className="p-3">Visibility mode of scrollbars</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">ScrollBar</td>
                <td className="p-3 font-mono">orientation</td>
                <td className="p-3 font-mono">"vertical" | "horizontal"</td>
                <td className="p-3">Scroll axis orientation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
