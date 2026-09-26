import React, { useState, useRef, useEffect } from "react"
import { Copy, Check, ChevronDown, ArrowLeft, ArrowRight, ExternalLink, Code } from "lucide-react"

interface ShadcnPageActionsProps {
  pageTitle?: string
  componentCode?: string
  onPrev?: () => void
  onNext?: () => void
  prevLabel?: string
  nextLabel?: string
  hideNav?: boolean
}

export function ShadcnPageActions({
  pageTitle = "Page",
  componentCode,
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
  hideNav = false,
}: ShadcnPageActionsProps) {
  const [copied, setCopied] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCopyUrl = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setIsDropdownOpen(false)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyCode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (componentCode) {
      navigator.clipboard.writeText(componentCode)
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    setCopied(true)
    setIsDropdownOpen(false)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyMarkdown = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const md = `[${pageTitle}](${window.location.href})`
    navigator.clipboard.writeText(md)
    setCopied(true)
    setIsDropdownOpen(false)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 shrink-0 select-none">
      {/* Exact Split Button matching user screenshot: media_1790404348168.png */}
      <div ref={dropdownRef} className="relative inline-flex">
        <div className="inline-flex items-center h-9 rounded-xl bg-[#242424] hover:bg-[#2b2b2b] text-white border border-white/[0.08] shadow-sm transition-colors duration-150">
          {/* Main Action: Copy Page */}
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 pl-3.5 pr-2.5 h-full type-link-12 font-medium text-white transition-opacity active:opacity-75 focus-visible:outline-none"
            title="Copy page link"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400 stroke-[2.2]" />
                <span className="text-white">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-white/90 stroke-[2]" />
                <span className="text-white">Copy Page</span>
              </>
            )}
          </button>

          {/* Hairline Divider matching user screenshot */}
          <div className="w-[1px] h-4 bg-white/20 shrink-0" />

          {/* Chevron Dropdown Trigger matching user screenshot */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center px-2 h-full text-white/80 hover:text-white transition-colors focus-visible:outline-none"
            title="More copy options"
          >
            <ChevronDown
              className={`size-3.5 stroke-[2] transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-[#1c1c1c] border border-white/[0.1] shadow-2xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95 font-sans">
            <button
              onClick={handleCopyUrl}
              className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-white hover:bg-[#2c2c2c] transition-colors text-left"
            >
              <span>Copy URL</span>
              <ExternalLink className="size-3 text-white/60" />
            </button>
            {componentCode && (
              <button
                onClick={handleCopyCode}
                className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-white hover:bg-[#2c2c2c] transition-colors text-left"
              >
                <span>Copy Code</span>
                <Code className="size-3 text-white/60" />
              </button>
            )}
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-white hover:bg-[#2c2c2c] transition-colors text-left"
            >
              <span>Copy as Markdown</span>
              <Copy className="size-3 text-white/60" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Arrow Buttons matching user screenshot */}
      {!hideNav && (
        <>
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className="flex items-center justify-center size-9 rounded-xl bg-[#242424] hover:bg-[#2b2b2b] text-white border border-white/[0.08] shadow-sm transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none"
            title={prevLabel}
          >
            <ArrowLeft className="size-4 text-white stroke-[2]" />
          </button>

          <button
            onClick={onNext}
            disabled={!onNext}
            className="flex items-center justify-center size-9 rounded-xl bg-[#242424] hover:bg-[#2b2b2b] text-white border border-white/[0.08] shadow-sm transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none"
            title={nextLabel}
          >
            <ArrowRight className="size-4 text-white stroke-[2]" />
          </button>
        </>
      )}
    </div>
  )
}
