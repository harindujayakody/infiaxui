import React, { useState } from "react"
import { Check, Copy, ChevronDown, Code2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  initialExpanded = false,
  maxCollapsedHeight = 84,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split("\n")

  // Same syntax colorizer as main detail page
  const renderHighlightedLine = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>

    const parts = line.split(
      /(\".*?\"|'.*?'|`.*?`|\b(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)\b|[{}\[\](),;<>])/g
    )

    return (
      <span>
        {parts.map((part, index) => {
          if (!part) return null
          if (
            (part.startsWith('"') && part.endsWith('"')) ||
            (part.startsWith("'") && part.endsWith("'")) ||
            (part.startsWith("`") && part.endsWith("`"))
          ) {
            return <span key={index} className="text-emerald-400">{part}</span>
          }
          if (/^(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)$/.test(part)) {
            return <span key={index} className="text-purple-400 font-medium">{part}</span>
          }
          if (/^[<>]/.test(part)) {
            return <span key={index} className="text-pink-400 font-medium">{part}</span>
          }
          if (/^[{}\[\](),;]$/.test(part)) {
            return <span key={index} className="text-[var(--text-muted)]">{part}</span>
          }
          return <span key={index} className="text-[var(--text-main)]">{part}</span>
        })}
      </span>
    )
  }

  return (
    <div className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] font-mono text-xs overflow-hidden shadow-lg transition-colors">
      {/* Mac Style Code Header — same as detail page */}
      <motion.div
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 select-none">
          <div className="flex items-center gap-3">
            {/* Static macOS dots — size-2.5 like detail page */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block" />
              <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block" />
              <span className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block" />
            </div>
            <div className="h-3 w-px bg-[var(--border-subtle)]" />
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <span className="font-bold text-[10px] bg-[var(--bg-card)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded text-[var(--text-main)] font-mono">
                {language.toUpperCase()}
              </span>
              {fileName && (
                <span className="font-mono text-xs text-[var(--text-muted)]">{fileName}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-2.5 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            >
              Collapse Code
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] transition-colors cursor-pointer"
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
      </motion.div>

      {/* Code area — smooth height animation */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : maxCollapsedHeight }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden"
      >
        <div className={`p-4 leading-relaxed text-[var(--text-main)] ${isExpanded ? "overflow-x-auto max-h-[500px]" : "overflow-hidden"}`}>
          <pre className="table w-full">
            <code>
              {lines.map((line, idx) => (
                <div key={idx} className="flex gap-4 hover:bg-[var(--bg-subtle)]/30 px-1 py-0.5 rounded">
                  {showLineNumbers && (
                    <span className="text-[var(--text-muted)]/60 select-none w-6 text-right shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className="whitespace-pre">{renderHighlightedLine(line)}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Bottom Collapse Footer */}
        <motion.div
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="flex justify-end p-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            >
              Collapse Code
            </button>
          </div>
        </motion.div>

        {/* Collapsed overlay with centered "View Code" button — same as detail page */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              key="codeblock-collapsed-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/85 to-transparent z-10 select-none"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="size-3.5" />
                <span>View Code</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
