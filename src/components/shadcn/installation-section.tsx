import React, { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export interface InstallationSectionProps {
  componentName?: string
  componentSlug?: string
  dependencies?: string
  shadcnDependencies?: string[]
  sourceCode?: string
  sourcePath?: string
  className?: string
}

export function InstallationSection({
  componentName = "component",
  componentSlug,
  dependencies = "@base-ui/react",
  shadcnDependencies,
  sourceCode,
  sourcePath,
  className,
}: InstallationSectionProps) {
  const [installMode, setInstallMode] = useState<"Command" | "Manual">("Command")
  const [pkgManager, setPkgManager] = useState<PackageManager>("npm")
  const [copied, setCopied] = useState<string | null>(null)

  const slug =
    componentSlug ||
    componentName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

  const getCliCommand = (pkg: PackageManager) => {
    switch (pkg) {
      case "pnpm":
        return `pnpm dlx @infiax/ui add ${slug}`
      case "yarn":
        return `npx @infiax/ui add ${slug}`
      case "bun":
        return `bunx @infiax/ui add ${slug}`
      case "npm":
      default:
        return `npx @infiax/ui add ${slug}`
    }
  }

  const getDependencyInstallCommand = (pkg: PackageManager, deps: string) => {
    switch (pkg) {
      case "pnpm":
        return `pnpm add ${deps}`
      case "yarn":
        return `yarn add ${deps}`
      case "bun":
        return `bun add ${deps}`
      case "npm":
      default:
        return `npm install ${deps}`
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const cliCommand = getCliCommand(pkgManager)
  const depCommand = getDependencyInstallCommand(pkgManager, dependencies)

  return (
    <div id="installation" className={cn("scroll-mt-20 space-y-4 pt-4", className)}>
      <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>

      {/* Command | Manual Tabs with clean underline matching screenshot */}
      <div className="flex items-center gap-6 border-b border-[var(--border-subtle)]">
        {(["Command", "Manual"] as const).map((mode) => {
          const isActive = installMode === mode
          return (
            <button
              key={mode}
              onClick={() => setInstallMode(mode)}
              className={cn(
                "pb-2.5 transition-colors relative type-link text-sm cursor-pointer",
                isActive
                  ? "text-[var(--text-main)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              {mode}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-main)] rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {installMode === "Command" ? (
        /* Command CLI Box matching exact User Screenshot: media_1790423785470.png */
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/90 dark:bg-[#0c0c0d] p-3.5 sm:p-4 space-y-3 font-mono shadow-sm">
          {/* Top Bar: Terminal Icon + Package Managers Switcher + Copy Button */}
          <div className="flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              {/* Terminal Icon Pill */}
              <div className="size-6 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[11px] font-mono text-[var(--text-muted)] font-bold">
                &gt;_
              </div>

              {/* Package Manager Options: pnpm | npm | yarn | bun */}
              <div className="flex items-center gap-1">
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => {
                  const isSelected = pkgManager === pkg
                  return (
                    <button
                      key={pkg}
                      onClick={() => setPkgManager(pkg)}
                      className={cn(
                        "px-2 py-0.5 rounded-md text-xs font-mono transition-colors cursor-pointer",
                        isSelected
                          ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium shadow-sm"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      )}
                    >
                      {pkg}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(cliCommand, "cli-cmd")}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
              title="Copy command"
            >
              {copied === "cli-cmd" ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>

          {/* Command Code Output */}
          <div className="text-xs text-[var(--text-main)] font-mono pl-1 pt-1 pb-0.5">
            <code>{cliCommand}</code>
          </div>
        </div>
      ) : (
        /* Manual Installation Steps */
        <div className="space-y-6 pt-1">
          {/* Step 1: Install Dependencies */}
          {dependencies && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-semibold text-[var(--text-main)] font-mono">
                  1
                </span>
                <span className="type-heading text-xs font-semibold text-[var(--text-main)]">
                  Install the following dependencies:
                </span>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)]/90 dark:bg-[#0c0c0d] p-3.5 sm:p-4 space-y-3 font-mono shadow-sm">
                <div className="flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[11px] font-mono text-[var(--text-muted)] font-bold">
                      &gt;_
                    </div>
                    <div className="flex items-center gap-1">
                      {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => {
                        const isSelected = pkgManager === pkg
                        return (
                          <button
                            key={pkg}
                            onClick={() => setPkgManager(pkg)}
                            className={cn(
                              "px-2 py-0.5 rounded-md text-xs font-mono transition-colors cursor-pointer",
                              isSelected
                                ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium shadow-sm"
                                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                            )}
                          >
                            {pkg}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(depCommand, "dep-cmd")}
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copied === "dep-cmd" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>

                <div className="text-xs text-[var(--text-main)] font-mono pl-1 pt-1 pb-0.5">
                  <code>{depCommand}</code>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Copy Component Source Code */}
          {sourceCode && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] font-semibold text-[var(--text-main)] font-mono">
                  {dependencies ? "2" : "1"}
                </span>
                <span className="type-heading text-xs font-semibold text-[var(--text-main)]">
                  Copy and paste the following code into your project:
                </span>
              </div>

              <CodeBlock
                code={sourceCode}
                language="tsx"
                fileName={sourcePath || `components/ui/${slug}.tsx`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
