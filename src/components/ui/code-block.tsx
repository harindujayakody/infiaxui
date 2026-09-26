import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  fileName?: string
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  fileName,
}: CodeBlockProps) {
  const { copyToClipboard } = useTheme()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copyToClipboard(code, fileName || "code snippet")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split("\n")

  // Simple, robust syntax colorizer
  const renderHighlightedLine = (line: string) => {
    // If empty line
    if (!line.trim()) return <span>&nbsp;</span>

    // Basic token rendering without external heavy parsers
    const parts = line.split(/(".*?"|'.*?'|`.*?`|\b(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)\b|[{}\[\](),;<>])/g)

    return (
      <span>
        {parts.map((part, index) => {
          if (!part) return null
          // String literal
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'")) || (part.startsWith('`') && part.endsWith('`'))) {
            return (
              <span key={index} className="text-emerald-400">
                {part}
              </span>
            )
          }
          // Keywords
          if (/^(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)$/.test(part)) {
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
              <span key={index} className="text-zinc-500">
                {part}
              </span>
            )
          }
          // Default text
          return (
            <span key={index} className="text-zinc-200">
              {part}
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <div className="relative group rounded-2xl border border-zinc-800 bg-zinc-950 font-mono text-xs sm:text-sm overflow-hidden shadow-2xl">
      {/* Code Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-zinc-400 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          {fileName && <span className="font-sans text-zinc-300 ml-2 font-medium">{fileName}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/60 px-2.5 py-1 text-xs text-zinc-300 transition-all hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code container */}
      <div className="overflow-x-auto p-4 max-h-[520px]">
        <pre className="table w-full">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row leading-relaxed hover:bg-zinc-900/40">
                {showLineNumbers && (
                  <span className="table-cell select-none pr-4 text-right text-zinc-600 w-8 text-xs font-mono">
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
      </div>
    </div>
  )
}
