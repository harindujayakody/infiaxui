import React, { useState } from "react"
import { Check, Copy, Code2, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { highlightGithubLine } from "@/lib/github-highlighter"

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
  
  const lines = code.trim().split("\n")
  const isShortCode = lines.length <= 5

  // Short snippets (<= 5 lines) stay expanded automatically; longer snippets follow initialExpanded
  const [isExpanded, setIsExpanded] = useState(isShortCode || initialExpanded)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] font-mono text-xs overflow-hidden shadow-lg transition-colors">
      {/* Top Mac Header (always visible if short snippet, or revealed when expanded) */}
      {(isExpanded || isShortCode) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 select-none">
          <div className="flex items-center gap-3">
            {/* macOS window control dots */}
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
                <span className="font-mono text-xs text-[var(--text-muted)] truncate max-w-[200px] sm:max-w-none">
                  {fileName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isShortCode && (
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-2.5 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer flex items-center gap-1"
                title="Collapse Code"
              >
                <span>Collapse Code</span>
                <ChevronUp className="size-3" />
              </button>
            )}
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
      )}

      {/* Code area with fluid animated height expansion */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded || isShortCode ? "auto" : maxCollapsedHeight }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden"
      >
        <div
          className={`p-4 leading-relaxed text-[var(--text-main)] ${
            isExpanded || isShortCode ? "overflow-x-auto max-h-[520px]" : "overflow-hidden"
          }`}
        >
          <pre className="table w-full">
            <code>
              {lines.map((line, idx) => (
                <div key={idx} className="flex gap-4 hover:bg-[var(--bg-subtle)]/30 px-1 py-0.5 rounded">
                  {showLineNumbers && (
                    <span className="text-[var(--text-muted)]/60 select-none w-6 text-right shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className="whitespace-pre">{highlightGithubLine(line)}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Bottom Collapse Footer (for long code blocks when expanded) */}
        {!isShortCode && isExpanded && (
          <div className="flex justify-end p-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Collapse Code</span>
              <ChevronUp className="size-3" />
            </button>
          </div>
        )}

        {/* Collapsed overlay with centered "View Code" button and quick copy */}
        <AnimatePresence>
          {!isExpanded && !isShortCode && (
            <motion.div
              key="codeblock-collapsed-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/90 to-transparent z-10 select-none"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="size-3.5" />
                  <span>View Code</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] shadow-lg transition-colors cursor-pointer"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
