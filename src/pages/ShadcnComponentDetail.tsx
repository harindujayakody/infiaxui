import React, { useState } from "react"
import {
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  CheckCircle2,
  Info,
  ChevronRight,
  MoreHorizontal,
  FileCode,
  Maximize2,
} from "lucide-react"
import { SHADCN_COMPONENTS_DETAIL, ShadcnComponentDef, ALL_COMPONENTS_COLUMNS } from "@/data/shadcn-components"
import { ShadcnPageActions } from "@/components/layout/ShadcnPageActions"
import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn/alert"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Switch } from "@/components/shadcn/switch"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Skeleton } from "@/components/shadcn/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import { Separator } from "@/components/shadcn/separator"

interface ShadcnComponentDetailProps {
  componentName: string
  onSelectComponent: (componentName: string) => void
  onBackToCatalog: () => void
}

export function ShadcnComponentDetail({
  componentName,
  onSelectComponent,
  onBackToCatalog,
}: ShadcnComponentDetailProps) {
  const [libTab, setLibTab] = useState<"Base UI" | "React Aria" | "Radix UI">("Base UI")
  // By default, start with "Manual" for Breadcrumb or "Command"
  const [installMode, setInstallMode] = useState<"Command" | "Manual">("Manual")
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("npm")
  const [isCodeExpanded, setIsCodeExpanded] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  
  // Interactive state demos
  const [switchOn, setSwitchOn] = useState(false)
  const [checkboxOn, setCheckboxOn] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(1)

  // Flatten and sort components for next/prev navigation
  const allComponentsList = Array.from(
    new Set(ALL_COMPONENTS_COLUMNS.flat())
  ).sort()
  const currentIndex = allComponentsList.indexOf(componentName)
  const prevComponent =
    currentIndex > 0
      ? allComponentsList[currentIndex - 1]
      : allComponentsList[allComponentsList.length - 1]
  const nextComponent =
    currentIndex >= 0 && currentIndex < allComponentsList.length - 1
      ? allComponentsList[currentIndex + 1]
      : allComponentsList[0]

  const componentData: ShadcnComponentDef =
    SHADCN_COMPONENTS_DETAIL[componentName] || {
      id: componentName.toLowerCase().replace(/\s+/g, "-"),
      name: componentName,
      description: `Displays the path to the current resource using a hierarchy of links.`,
      installationCommand: `npx shadcn@latest add ${componentName.toLowerCase().replace(/\s+/g, "-")}`,
      importCode: `import { ${componentName} } from "@/components/ui/${componentName.toLowerCase().replace(/\s+/g, "-")}"`,
      usageCode: `<${componentName} />`,
      apiReference: [componentName],
    }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const getCliCommand = () => {
    const slug = componentData.id
    switch (pkgManager) {
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${slug}`
      case "npm":
        return `npx shadcn@latest add ${slug}`
      case "yarn":
        return `npx shadcn@latest add ${slug}`
      case "bun":
        return `bunx --bun shadcn@latest add ${slug}`
      default:
        return `npx shadcn@latest add ${slug}`
    }
  }

  const renderLivePreview = () => {
    switch (componentData.name) {
      case "Breadcrumb":
        return (
          <nav aria-label="breadcrumb" className="flex items-center space-x-2 type-link text-[var(--text-muted)]">
            <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Home</span>
            <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
            <span className="flex items-center justify-center size-6 rounded-md hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors">
              <MoreHorizontal className="size-4" />
            </span>
            <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
            <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Components</span>
            <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
            <span className="text-[var(--text-main)] font-semibold">Breadcrumb</span>
          </nav>
        )

      case "Alert":
        return (
          <div className="w-full max-w-xl space-y-4">
            <Alert>
              <CheckCircle2 className="size-4 text-[var(--text-main)]" />
              <AlertTitle className="type-heading text-[var(--text-main)]">Payment successful</AlertTitle>
              <AlertDescription className="type-small-body text-[var(--text-muted)]">
                Your payment of $29.99 has been processed. A receipt has been sent to your email address.
              </AlertDescription>
            </Alert>
            <Alert>
              <Info className="size-4 text-[var(--text-main)]" />
              <AlertTitle className="type-heading text-[var(--text-main)]">New feature available</AlertTitle>
              <AlertDescription className="type-small-body text-[var(--text-muted)]">
                We've added dark mode support. You can enable it in your account settings.
              </AlertDescription>
            </Alert>
          </div>
        )

      case "Button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="default">Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        )

      case "Badge":
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="default">Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        )

      case "Card":
        return (
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="type-heading">Create project</CardTitle>
                <CardDescription className="type-small-body">Deploy your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <span className="type-caption text-[var(--text-muted)]">Name</span>
                  <Input placeholder="Name of your project" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Deploy</Button>
              </CardFooter>
            </Card>
          </div>
        )

      case "Input":
        return (
          <div className="w-full max-w-sm space-y-2">
            <label className="type-caption text-[var(--text-main)]">Email</label>
            <Input type="email" placeholder="m@example.com" />
            <p className="type-caption text-[var(--text-muted)]">Enter your email address.</p>
          </div>
        )

      case "Switch":
        return (
          <div className="flex items-center space-x-3 rounded-xl border border-[var(--border-subtle)] p-4 bg-[var(--bg-card)]">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="airplane-mode" />
            <div className="space-y-0.5">
              <label htmlFor="airplane-mode" className="type-caption text-[var(--text-main)] cursor-pointer">
                Airplane Mode
              </label>
              <p className="type-link-12-400 text-[var(--text-muted)]">Disable all wireless connections.</p>
            </div>
          </div>
        )

      case "Checkbox":
        return (
          <div className="flex items-start space-x-3 rounded-xl border border-[var(--border-subtle)] p-4 bg-[var(--bg-card)] max-w-sm">
            <Checkbox checked={checkboxOn} onCheckedChange={setCheckboxOn} id="terms-box" />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="terms-box" className="type-caption text-[var(--text-main)] cursor-pointer font-medium">
                Accept terms and conditions
              </label>
              <p className="type-link-12-400 text-[var(--text-muted)]">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        )

      case "Skeleton":
        return (
          <div className="flex items-center space-x-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        )

      case "Avatar":
        return (
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </div>
        )

      case "Questionnaire":
        return (
          <div className="w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 space-y-5">
            <div className="space-y-1">
              <span className="type-caption text-[var(--text-muted)]">Step 2 of 4</span>
              <h4 className="type-heading text-[var(--text-main)]">What is your primary use case?</h4>
            </div>
            <div className="space-y-2">
              {[
                "Production SaaS Dashboard",
                "Marketing Website & Landing Pages",
                "Internal Tools & Admin Portals",
              ].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-colors ${
                    selectedAnswer === idx
                      ? "border-[var(--text-main)] bg-[var(--bg-subtle)] text-[var(--text-main)] font-medium"
                      : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <span>{option}</span>
                  {selectedAnswer === idx && <Check className="size-3.5 text-[var(--text-main)]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <Button variant="ghost" size="sm">Back</Button>
              <Button size="sm">Continue</Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center space-y-3">
            <div className="type-heading text-[var(--text-main)]">{componentData.name}</div>
            <p className="type-small-body text-[var(--text-muted)]">{componentData.description}</p>
            <div className="pt-2">
              <Button variant="outline" size="sm">
                Interactive {componentData.name}
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 max-w-4xl py-8 px-4 sm:px-8 space-y-10">
      {/* Header section matching Screenshot 2 */}
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="space-y-1.5">
          <h1 className="type-h1 text-[var(--text-main)]">
            {componentData.name}
          </h1>
          <p className="type-body text-[var(--text-muted)] max-w-xl">
            {componentData.description}
          </p>
        </div>

        {/* Action buttons matching exact user screenshot: media_1790404348168.png */}
        <ShadcnPageActions
          pageTitle={componentData.name}
          componentCode={componentData.usageCode}
          onPrev={() => onSelectComponent(prevComponent)}
          onNext={() => onSelectComponent(nextComponent)}
          prevLabel={`Previous: ${prevComponent}`}
          nextLabel={`Next: ${nextComponent}`}
        />
      </div>

      {/* Framework Tabs: Base UI | React Aria | Radix UI matching Screenshot 2 */}
      <div className="flex items-center gap-6 border-b border-[var(--border-subtle)]">
        {(["Base UI", "React Aria", "Radix UI"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setLibTab(tab)}
            className={`pb-2.5 transition-colors relative type-link ${
              libTab === tab
                ? "text-[var(--text-main)] font-semibold"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            {tab}
            {libTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-main)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Live Preview Box with exact #161616 background matching Screenshot */}
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-xl">
        {/* Component Display */}
        <div className="p-8 sm:p-14 flex flex-col items-center justify-center min-h-[260px]">
          {renderLivePreview()}
        </div>

        {/* Code Snippet Preview & "View Code" bar matching user screenshot */}
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/70 p-4 font-mono text-xs relative">
          <div className="overflow-hidden max-h-24 opacity-60">
            <div className="text-[var(--text-muted)]">1  import Link from "next/link"</div>
            <div className="text-[var(--text-muted)]">2</div>
            <div className="text-[var(--text-muted)]">3  import &#123;</div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent">
            <button
              onClick={() => setIsCodeExpanded(!isCodeExpanded)}
              className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] type-link-12 text-[var(--text-main)] shadow-lg transition-colors"
            >
              {isCodeExpanded ? "Collapse Code" : "View Code"}
            </button>
          </div>
        </div>

        {/* Expanded code view if toggled */}
        {isCodeExpanded && (
          <div className="border-t border-[var(--border-subtle)] p-4 bg-[var(--bg-page)] font-mono text-xs overflow-x-auto text-[var(--text-main)]">
            <pre className="leading-relaxed">
              <code>{componentData.usageCode}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Installation Section matching Screenshot */}
      <div id="installation" className="scroll-mt-20 space-y-5 pt-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>

        {/* Command | Manual switcher */}
        <div className="flex items-center gap-6 border-b border-[var(--border-subtle)]">
          {(["Command", "Manual"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setInstallMode(mode)}
              className={`pb-2.5 transition-colors relative type-link ${
                installMode === mode
                  ? "text-[var(--text-main)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {mode}
              {installMode === mode && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-main)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {installMode === "Command" ? (
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-3">
            {/* Package Manager Tabs: pnpm | npm | yarn | bun */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setPkgManager(pkg)}
                    className={`px-3 py-1 rounded-md type-link-12 font-mono transition-colors ${
                      pkgManager === pkg
                        ? "bg-[var(--bg-subtle)] text-[var(--text-main)] font-medium"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCopy(getCliCommand(), "cli")}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                title="Copy command"
              >
                {copiedSection === "cli" ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>

            {/* CLI Command Line */}
            <div className="font-mono text-xs text-[var(--text-main)] pt-1">
              <code>{getCliCommand()}</code>
            </div>
          </div>
        ) : (
          /* Manual Mode matching exact user screenshot! */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-6 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] type-link-12 font-semibold text-[var(--text-main)]">
                1
              </span>
              <span className="type-heading text-[var(--text-main)]">
                Copy and paste the following code into your project.
              </span>
            </div>

            {/* Manual Code block matching user screenshot */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/50">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="font-bold text-[10px] bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded text-[var(--text-main)]">
                    TS
                  </span>
                  <span>components/ui/{componentData.id}.tsx</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <button className="hover:text-[var(--text-main)] transition-colors">Expand</button>
                  <button
                    onClick={() => handleCopy(componentData.importCode, "manual-file")}
                    className="hover:text-[var(--text-main)] transition-colors"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-x-auto text-[var(--text-main)] leading-relaxed">
                <div><span className="text-[var(--text-muted)] mr-4">1</span>import * as React from "react"</div>
                <div><span className="text-[var(--text-muted)] mr-4">2</span>import &#123; mergeProps &#125; from "@base-ui/react/merge-props"</div>
                <div><span className="text-[var(--text-muted)] mr-4">3</span>import &#123; useRender &#125; from "@base-ui/react/use-render"</div>
                <div><span className="text-[var(--text-muted)] mr-4">4</span>import &#123; cn &#125; from "cn"</div>
                <div><span className="text-[var(--text-muted)] mr-4">5</span>import &#123; ChevronRightIcon, MoreHorizontalIcon &#125; from "lucide-react"</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Usage Section matching Screenshot 3 */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>

        {/* Code Block 1: Imports */}
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => handleCopy(componentData.importCode, "import")}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            title="Copy import"
          >
            {copiedSection === "import" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)] leading-relaxed">
            <code>
              {componentData.importCode.split("\n").map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[var(--text-muted)] select-none w-4 text-right">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Code Block 2: Usage */}
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => handleCopy(componentData.usageCode, "usage")}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            title="Copy usage"
          >
            {copiedSection === "usage" ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <pre className="text-[var(--text-main)] leading-relaxed">
            <code>
              {componentData.usageCode.split("\n").map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[var(--text-muted)] select-none w-4 text-right">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Composition Section */}
      <div id="composition" className="scroll-mt-20 space-y-3 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="type-body text-[var(--text-muted)]">
          The <code className="text-[var(--text-main)] font-mono">{componentData.name}</code> component is structured to be completely customizable via standard HTML attributes and className composition.
        </p>
      </div>

      {/* Breadcrumb-specific sections when viewing Breadcrumb (matches Screenshot media_1790404131604.png) */}
      {componentData.name === "Breadcrumb" ? (
        <>
          {/* Basic Section */}
          <div id="basic" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
            <p className="type-body text-[var(--text-muted)]">
              A standard default breadcrumb hierarchy.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <nav aria-label="breadcrumb" className="flex items-center space-x-2 type-link text-[var(--text-muted)]">
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Home</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Components</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="text-[var(--text-main)] font-semibold">Breadcrumb</span>
              </nav>
            </div>
          </div>

          {/* Custom Separator Section */}
          <div id="custom-separator" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Custom separator</h2>
            <p className="type-body text-[var(--text-muted)]">
              Use a custom component as `<code className="text-[var(--text-main)] font-mono">BreadcrumbSeparator</code>`, such as a slash or custom icon.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <nav aria-label="breadcrumb" className="flex items-center space-x-2 type-link text-[var(--text-muted)]">
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Home</span>
                <span className="text-[var(--text-muted)] font-mono">/</span>
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Docs</span>
                <span className="text-[var(--text-muted)] font-mono">/</span>
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Components</span>
                <span className="text-[var(--text-muted)] font-mono">/</span>
                <span className="text-[var(--text-main)] font-semibold">Breadcrumb</span>
              </nav>
            </div>
          </div>

          {/* Dropdown Section */}
          <div id="dropdown" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Dropdown</h2>
            <p className="type-body text-[var(--text-muted)]">
              You can compose `<code className="text-[var(--text-main)] font-mono">BreadcrumbItem</code>` with a `<code className="text-[var(--text-main)] font-mono">DropdownMenu</code>` to provide quick navigation between intermediate paths.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <nav aria-label="breadcrumb" className="flex items-center space-x-2 type-link text-[var(--text-muted)]">
                <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Home</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="flex items-center justify-center size-6 rounded-md bg-[var(--bg-subtle)] text-[var(--text-main)] hover:bg-[var(--border-subtle)] cursor-pointer transition-colors">
                  <MoreHorizontal className="size-4" />
                </span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="text-[var(--text-main)] font-semibold">Breadcrumb</span>
              </nav>
            </div>
          </div>

          {/* Collapsed Section */}
          <div id="collapsed" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Collapsed</h2>
            <p className="type-body text-[var(--text-muted)]">
              Use `<code className="text-[var(--text-main)] font-mono">BreadcrumbEllipsis</code>` to collapse multiple long items into a compact interactive token.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <nav aria-label="breadcrumb" className="flex items-center space-x-2 type-link text-[var(--text-muted)]">
                <span className="hover:text-[var(--text-main)] cursor-pointer">Dashboard</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="text-[var(--text-muted)]">...</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="hover:text-[var(--text-main)] cursor-pointer">Settings</span>
                <ChevronRight className="size-3.5 text-[var(--text-muted)]" />
                <span className="text-[var(--text-main)] font-semibold">Security</span>
              </nav>
            </div>
          </div>

          {/* Link Component Section */}
          <div id="link-component" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Link component</h2>
            <p className="type-body text-[var(--text-muted)]">
              Integrate with framework routing by using `<code className="text-[var(--text-main)] font-mono">asChild</code>` to pass your framework's Link component.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto text-[var(--text-main)]">
              <code>{`<BreadcrumbLink asChild>\n  <Link to="/docs">Documentation</Link>\n</BreadcrumbLink>`}</code>
            </div>
          </div>

          {/* RTL Section */}
          <div id="rtl" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
            <p className="type-body text-[var(--text-muted)]">
              Breadcrumbs seamlessly flip separators and direction in RTL modes.
            </p>
            <div dir="rtl" className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <nav aria-label="breadcrumb" className="flex items-center space-x-2 space-x-reverse type-link text-[var(--text-muted)]">
                <span className="hover:text-[var(--text-main)] cursor-pointer">الرئيسية</span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="hover:text-[var(--text-main)] cursor-pointer">المكونات</span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--text-main)] font-semibold">مسار التنقل</span>
              </nav>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Basic Section */}
          <div id="basic" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
            <p className="type-body text-[var(--text-muted)]">
              A standard default rendering of <code className="text-[var(--text-main)] font-mono">{componentData.name}</code> without extra flags.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              {renderLivePreview()}
            </div>
          </div>

          {/* Destructive Section */}
          <div id="destructive" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Destructive</h2>
            <p className="type-body text-[var(--text-muted)]">
              Use the destructive variant for critical alerts, irreversible actions, or error states.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-300 flex items-start gap-3">
                <Info className="size-4 shrink-0 mt-0.5 text-red-400" />
                <div className="space-y-1">
                  <h5 className="type-heading text-red-200">Critical Error Encountered</h5>
                  <p className="type-small-body text-red-400/90">
                    Your session has expired. Please re-authenticate to continue modifying resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div id="action" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Action</h2>
            <p className="type-body text-[var(--text-muted)]">
              Adding interactive action triggers, confirmation buttons, and secondary links.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 flex items-center justify-between">
              <span className="type-small-body text-[var(--text-muted)]">
                Perform an immediate synchronization on this resource.
              </span>
              <Button size="sm">Execute Action</Button>
            </div>
          </div>

          {/* Custom Colors Section */}
          <div id="custom-colors" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">Custom Colors</h2>
            <p className="type-body text-[var(--text-muted)]">
              Customize backgrounds and foregrounds by injecting Tailwind arbitrary color values or design tokens.
            </p>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-emerald-500" />
                <span className="type-small-body text-[var(--text-main)] font-mono">emerald-500 • Active System Status</span>
              </div>
            </div>
          </div>

          {/* RTL Section */}
          <div id="rtl" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
            <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
            <p className="type-body text-[var(--text-muted)]">
              Right-to-left layout support works out of the box with logical CSS properties like <code className="text-[var(--text-main)] font-mono">ms-auto</code> and <code className="text-[var(--text-main)] font-mono">ps-4</code>.
            </p>
            <div dir="rtl" className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
              <p className="type-small-body text-[var(--text-muted)]">
                هذا مثال تجريبي لدعم النصوص باللغة العربية مع محاذاة تلقائية من اليمين إلى اليسار.
              </p>
            </div>
          </div>
        </>
      )}

      {/* API Reference Section */}
      <div id="api-reference" className="scroll-mt-20 space-y-6 pt-6 border-t border-[var(--border-subtle)]">
        <div>
          <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
          <p className="type-body text-[var(--text-muted)] mt-1">
            Complete exported primitives, components, and props for <code className="text-[var(--text-main)] font-mono">{componentData.name}</code>.
          </p>
        </div>

        <div className="space-y-4">
          {(componentData.apiReference || [componentData.name]).map((api) => {
            const apiId = `api-${api.toLowerCase().replace(/\s+/g, "-")}`
            return (
              <div
                key={api}
                id={apiId}
                className="scroll-mt-20 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="type-heading text-[var(--text-main)] font-mono font-bold">
                    {api}
                  </h3>
                  <span className="type-caption text-[var(--text-muted)] font-mono">React.Component</span>
                </div>
                <p className="type-small-body text-[var(--text-muted)]">
                  The <code className="text-[var(--text-main)] font-mono">&lt;{api} /&gt;</code> primitive accepts standard HTML attributes and forwards refs to the underlying DOM element.
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
