import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

function Pagination({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)}>
      {children}
    </nav>
  )
}

function PaginationContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)}>
      {children}
    </ul>
  )
}

function PaginationItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("", className)}>{children}</li>
}

function PaginationLink({
  children,
  isActive = false,
  onClick,
  disabled = false,
  className,
}: {
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg text-xs font-medium transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-main)]",
        "disabled:pointer-events-none disabled:opacity-40",
        isActive
          ? "border border-[var(--border-subtle)] bg-[var(--text-main)] text-[var(--bg-page)] font-semibold shadow-sm"
          : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]",
        className
      )}
    >
      {children}
    </button>
  )
}

function PaginationPrevious({
  onClick,
  disabled,
  text = "Previous",
  className,
}: {
  onClick?: () => void
  disabled?: boolean
  text?: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label="Go to previous page"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors select-none",
        "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:inline-block">{text}</span>
    </button>
  )
}

function PaginationNext({
  onClick,
  disabled,
  text = "Next",
  className,
}: {
  onClick?: () => void
  disabled?: boolean
  text?: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label="Go to next page"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors select-none",
        "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      <span className="hidden sm:inline-block">{text}</span>
      <ChevronRight className="size-4" />
    </button>
  )
}

function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex size-9 items-center justify-center text-[var(--text-muted)]", className)}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export function PaginationGuide() {
  const [currentPage, setCurrentPage] = useState(2)
  const [simplePage, setSimplePage] = useState(1)
  const [iconPage, setIconPage] = useState(3)
  const [rtlPage, setRtlPage] = useState(2)

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Pagination</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Pagination",
            "└── PaginationContent",
            "    ├── PaginationItem",
            "    │   └── PaginationPrevious",
            "    ├── PaginationItem",
            "    │   └── PaginationLink",
            "    ├── PaginationItem",
            "    │   └── PaginationEllipsis",
            "    └── PaginationItem",
            "        └── PaginationNext",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Full pagination with previous/next buttons, page numbers, and ellipsis. Click pages to test live state.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col items-center gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive={currentPage === 2} onClick={() => setCurrentPage(2)}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive={currentPage === 3} onClick={() => setCurrentPage(3)}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  disabled={currentPage === 10}
                  onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <span className="text-xs text-[var(--text-muted)]">Current Page: {currentPage}</span>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </section>

      {/* Simple */}
      <section id="simple" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Simple</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A compact pagination showing only page numbers.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              {[1, 2, 3, 4, 5].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={simplePage === page}
                    onClick={() => setSimplePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </section>

      {/* Icons Only */}
      <section id="icons-only" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Icons Only</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Previous and next arrow buttons only without numeric labels. Ideal for compact tables.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>Page {iconPage} of 10</span>
            <div className="flex items-center gap-1">
              <PaginationLink
                disabled={iconPage === 1}
                onClick={() => setIconPage(Math.max(1, iconPage - 1))}
              >
                <ChevronLeft className="size-4" />
              </PaginationLink>
              <PaginationLink
                disabled={iconPage === 10}
                onClick={() => setIconPage(Math.min(10, iconPage + 1))}
              >
                <ChevronRight className="size-4" />
              </PaginationLink>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<div className="flex items-center gap-2">
  <PaginationLink size="icon" href="#" aria-label="Previous page">
    <ChevronLeft className="size-4" />
  </PaginationLink>
  <PaginationLink size="icon" href="#" aria-label="Next page">
    <ChevronRight className="size-4" />
  </PaginationLink>
</div>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Pagination supports RTL layouts with Arabic previous/next labels.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text="السابق"
                  disabled={rtlPage === 1}
                  onClick={() => setRtlPage(Math.max(1, rtlPage - 1))}
                />
              </PaginationItem>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={rtlPage === page}
                    onClick={() => setRtlPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  text="التالي"
                  disabled={rtlPage === 3}
                  onClick={() => setRtlPage(Math.min(3, rtlPage + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* Changelog */}
      <section id="changelog" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Changelog</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              RTL Support
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Added customizable <code className="text-[var(--text-main)] font-mono">text</code> prop to{" "}
            <code className="text-[var(--text-main)] font-mono">PaginationPrevious</code> and{" "}
            <code className="text-[var(--text-main)] font-mono">PaginationNext</code> for localization.
          </p>
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
                <td className="p-3 font-mono text-[var(--text-main)]">PaginationLink</td>
                <td className="p-3 font-mono">isActive</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3">Applies active highlighted styling</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">PaginationPrevious</td>
                <td className="p-3 font-mono">text</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Button label text (default "Previous")</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">PaginationNext</td>
                <td className="p-3 font-mono">text</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Button label text (default "Next")</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
