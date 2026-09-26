import React, { useState } from "react"
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  fileName?: string
  initialExpanded?: boolean
  maxCollapsedHeight?: number
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  fileName,
  initialExpanded = true,
  maxCollapsedHeight = 240,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split("\n")

  // Simple, robust syntax colorizer
  const renderHighlightedLine = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>

    const parts = line.split(
      /(".*?"|'.*?'|`.*?`|\b(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)\b|[{}\[\](),;<>])/g
    )

    return (
      <span>
        {parts.map((part, index) => {
          if (!part) return null
          // String literal
          if (
            (part.startsWith('"') && part.endsWith('"')) ||
            (part.startsWith("'") && part.endsWith("'")) ||
            (part.startsWith("`") && part.endsWith("`"))
          ) {
            return (
              <span key={index} className="text-emerald-400">
                {part}
              </span>
            )
          }
          // Keywords
          if (
            /^(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)$/.test(
              part
            )
          ) {
            return (
              <span key={index} className="text-purple-400 font-medium">
                {part}
              </span>
            )
          }
          // Tags or JSX
          if (/^[<>]/.test(part)) {
            return (
              <span key={index} className="text-pink-400 font-medium">
                {part}
              </span>
            )
          }
          // Symbols
          if (/^[{}[\](),;]$/.test(part)) {
            return (
              <span key={index} className="text-[var(--text-muted)]">
                {part}
              </span>
            )
          }
          // Default text
          return (
            <span key={index} className="text-[var(--text-main)]">
              {part}
            </span>
          )
        })}
      </span>
    )
  }

  const isLongCode = lines.length > 8

  return (
    <div className="relative group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] font-mono text-xs overflow-hidden shadow-lg transition-colors">
      {/* Mac Style Code Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/60 px-4 py-2.5 text-xs select-none">
        <div className="flex items-center gap-3">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5 group/dots">
            <span
              className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center transition-all hover:brightness-95 cursor-pointer"
              title="Close"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] text-[#4A0002] leading-none font-bold">
                ✕
              </span>
            </span>
            <span
              className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center transition-all hover:brightness-95 cursor-pointer"
              title="Minimize"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] text-[#402A00] leading-none font-bold">
                −
              </span>
            </span>
            <span
              onClick={() => setIsExpanded(!isExpanded)}
              className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center transition-all hover:brightness-95 cursor-pointer"
              title="Expand / Collapse"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 text-[7px] text-[#003800] leading-none font-black">
                {isExpanded ? "⤡" : "⤢"}
              </span>
            </span>
          </div>

          <div className="h-3 w-px bg-[var(--border-subtle)]" />

          {/* TS badge & File name */}
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <span className="font-bold text-[10px] bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded text-[var(--text-main)] font-mono">
              {language.toUpperCase()}
            </span>
            {fileName && (
              <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                {fileName}
              </span>
            )}
          </div>
        </div>

        {/* Right side: Expand + Copy buttons */}
        <div className="flex items-center gap-2">
          {isLongCode && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors type-link-12 font-medium px-2 py-0.5 rounded hover:bg-[var(--bg-subtle)]"
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              {isExpanded ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] px-2.5 py-1 text-xs text-[var(--text-main)] transition-all"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-[var(--text-muted)]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code container */}
      <div
        className={`overflow-x-auto p-4 transition-all duration-200 ${
          !isExpanded && isLongCode
            ? `max-h-[${maxCollapsedHeight}px] overflow-hidden relative`
            : "max-h-[600px]"
        }`}
        style={!isExpanded && isLongCode ? { maxHeight: `${maxCollapsedHeight}px` } : {}}
      >
        <pre className="table w-full">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row leading-relaxed hover:bg-[var(--bg-subtle)]/40">
                {showLineNumbers && (
                  <span className="table-cell select-none pr-4 text-right text-[var(--text-muted)]/60 w-8 text-xs font-mono">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">
                  {renderHighlightedLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>

        {!isExpanded && isLongCode && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/80 to-transparent flex items-end justify-center pb-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs text-[var(--text-main)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3 py-1 rounded-full shadow-lg transition-colors flex items-center gap-1"
            >
              <span>Expand code ({lines.length} lines)</span>
              <ChevronDown className="size-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
