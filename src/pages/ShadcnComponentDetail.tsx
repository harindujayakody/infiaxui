import React, { useState } from "react"
import {
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Copy,
  Check,
  CheckCircle2,
  Info,
  ChevronRight,
  MoreHorizontal,
  FileCode,
  Maximize2,
  Code2,
} from "lucide-react"
import { SHADCN_COMPONENTS_DETAIL, ShadcnComponentDef, ALL_COMPONENTS_COLUMNS } from "@/data/shadcn-components"
import { getPrevNextComponents, getComponentUrl } from "@/lib/component-routing"
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
import { Slider } from "@/components/shadcn/slider"

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
  const [isManualExpanded, setIsManualExpanded] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [sliderVal, setSliderVal] = useState<number[]>([50])
  
  // Interactive state demos
  const [switchOn, setSwitchOn] = useState(false)
  const [checkboxOn, setCheckboxOn] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(1)

  // Accurate alphabetical sequence for previous / next navigation matching shadcn docs
  const { prev, next } = getPrevNextComponents(componentName)
  const prevComponent = prev.name
  const nextComponent = next.name

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

  const getComponentDemoCode = (): string => {
    switch (componentData.name) {
      case "Button":
        return `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
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
}`

      case "Breadcrumb":
        return `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, MoreHorizontal } from "lucide-react"

export function BreadcrumbDemo() {
  return (
    <nav aria-label="breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
      <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
      <ChevronRight className="size-3.5" />
      <span className="flex items-center justify-center size-6 rounded-md hover:bg-muted cursor-pointer transition-colors">
        <MoreHorizontal className="size-4" />
      </span>
      <ChevronRight className="size-3.5" />
      <span className="hover:text-foreground cursor-pointer transition-colors">Components</span>
      <ChevronRight className="size-3.5" />
      <span className="text-foreground font-semibold">Breadcrumb</span>
    </nav>
  )
}`

      case "Alert":
        return `import { CheckCircle2, Info } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="w-full max-w-xl space-y-4">
      <Alert>
        <CheckCircle2 className="size-4 text-foreground" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <Info className="size-4 text-foreground" />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We've added dark mode support. You can enable it in your account settings.
        </AlertDescription>
      </Alert>
    </div>
  )
}`

      case "Badge":
        return `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge variant="default">Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`

      case "Card":
        return `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Name</label>
          <Input placeholder="Name of your project" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </Card>
  )
}`

      case "Input":
        return `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-xs font-medium text-foreground">Email</label>
      <Input type="email" placeholder="m@example.com" />
      <p className="text-xs text-muted-foreground">Enter your email address.</p>
    </div>
  )
}`

      case "Switch":
        return `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-3 rounded-xl border border-border p-4 bg-card">
      <Switch id="airplane-mode" />
      <div className="space-y-0.5">
        <label htmlFor="airplane-mode" className="text-xs font-medium cursor-pointer">
          Airplane Mode
        </label>
        <p className="text-xs text-muted-foreground">Disable all wireless connections.</p>
      </div>
    </div>
  )
}`

      case "Checkbox":
        return `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-start space-x-3 rounded-xl border border-border p-4 bg-card max-w-sm">
      <Checkbox id="terms" defaultChecked />
      <div className="grid gap-1.5 leading-none">
        <label htmlFor="terms" className="text-xs font-medium cursor-pointer">
          Accept terms and conditions
        </label>
        <p className="text-xs text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}`

      case "Slider":
        return `import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Volume</span>
        <span>50%</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  )
}`

      case "Avatar":
        return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
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
}`

      case "Skeleton":
        return `import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  )
}`

      case "Separator":
        return `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`

      case "Questionnaire":
        return `import { Questionnaire } from "@/components/ui/questionnaire"

export function QuestionnaireDemo() {
  return (
    <Questionnaire
      questions={[
        {
          id: "usecase",
          title: "What is your primary use case?",
          options: [
            { id: "1", label: "Production SaaS Dashboard" },
            { id: "2", label: "Marketing Website & Landing Pages" },
            { id: "3", label: "Internal Tools & Admin Portals" },
          ],
        },
      ]}
    />
  )
}`

      case "Button Group":
        return `import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}`

      case "Bubble":
        return `import { Bubble, BubbleMessage, BubbleAvatar } from "@/components/ui/bubble"

export function BubbleDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Bubble sender="assistant">
        <BubbleAvatar initials="AI" />
        <BubbleMessage>Hello! How can I assist you with your project today?</BubbleMessage>
      </Bubble>
      <Bubble sender="user">
        <BubbleMessage>Show me how to build modern interfaces with shadcn/ui.</BubbleMessage>
        <BubbleAvatar initials="ME" />
      </Bubble>
    </div>
  )
}`

      case "Calendar":
        return `import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`

      case "Attachment":
        return `import { Attachment, AttachmentPreview, AttachmentRemove } from "@/components/ui/attachment"

export function AttachmentDemo() {
  return (
    <Attachment filename="Quarterly_Report_2026.pdf" size="2.4 MB">
      <AttachmentPreview type="pdf" />
      <AttachmentRemove onRemove={() => console.log("Removed")} />
    </Attachment>
  )
}`

      case "Field":
        return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldDemo() {
  return (
    <Field>
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" placeholder="m@example.com" />
      <FieldDescription>We will never share your email with third parties.</FieldDescription>
    </Field>
  )
}`

      case "Combobox":
        return `import { Combobox } from "@/components/ui/combobox"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function ComboboxDemo() {
  return (
    <Combobox
      options={frameworks}
      placeholder="Select framework..."
    />
  )
}`

      default:
        return `${componentData.importCode}\n\nexport function ${componentData.name.replace(/[^a-zA-Z0-9]/g, "")}Demo() {\n  return (\n    <div className="flex items-center justify-center p-6">\n      ${componentData.usageCode}\n    </div>\n  )\n}`
    }
  }

  const renderHighlightedLine = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>

    const parts = line.split(
      /(".*?"|'.*?'|`.*?`|\b(?:import|from|export|function|const|let|var|return|default|interface|type|class|extends|public|private)\b|[{}\[\](),;<>])/g
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
            return (
              <span key={index} className="text-emerald-400">
                {part}
              </span>
            )
          }
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
          if (/^[<>]/.test(part)) {
            return (
              <span key={index} className="text-pink-400 font-medium">
                {part}
              </span>
            )
          }
          if (/^[{}[\](),;]$/.test(part)) {
            return (
              <span key={index} className="text-[var(--text-muted)]">
                {part}
              </span>
            )
          }
          return (
            <span key={index} className="text-[var(--text-main)]">
              {part}
            </span>
          )
        })}
      </span>
    )
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

      case "Slider":
        return (
          <div className="w-full max-w-sm space-y-4 p-4">
            <div className="flex justify-between type-caption text-[var(--text-muted)] font-mono">
              <span>Volume</span>
              <span>{sliderVal[0]}%</span>
            </div>
            <Slider
              value={sliderVal}
              onValueChange={setSliderVal}
              max={100}
              step={1}
            />
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

      case "Button Group":
        return (
          <div className="inline-flex rounded-lg shadow-sm" role="group">
            <button className="px-4 py-2 text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-l-lg hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors">
              Left
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-[var(--bg-card)] border-t border-b border-r border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors">
              Middle
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-[var(--bg-card)] border-t border-b border-r border-[var(--border-subtle)] rounded-r-lg hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors">
              Right
            </button>
          </div>
        )

      case "Bubble":
        return (
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-start gap-2.5">
              <Avatar className="size-7">
                <AvatarFallback className="text-[10px] bg-blue-600 text-white font-semibold">AI</AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-tl-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] px-4 py-2.5 text-xs text-[var(--text-main)] shadow-sm max-w-[85%]">
                Hello! How can I assist you with your project today?
              </div>
            </div>
            <div className="flex items-start justify-end gap-2.5">
              <div className="rounded-2xl rounded-tr-sm bg-blue-600 text-white px-4 py-2.5 text-xs shadow-sm max-w-[85%]">
                I'm building an interface with shadcn/ui and React!
              </div>
              <Avatar className="size-7">
                <AvatarFallback className="text-[10px] bg-[var(--bg-subtle)] text-[var(--text-main)] font-semibold">ME</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )

      case "Calendar":
        return (
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm text-center">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
              <span className="type-caption font-semibold text-[var(--text-main)]">September 2026</span>
              <div className="flex items-center gap-1">
                <button className="size-6 flex items-center justify-center rounded hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] text-sm">‹</button>
                <button className="size-6 flex items-center justify-center rounded hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] text-sm">›</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px] text-[var(--text-muted)] font-mono mb-2">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  className={`size-7 rounded-md flex items-center justify-center transition-colors ${
                    d === 26
                      ? "bg-[var(--text-main)] text-[var(--bg-page)] font-bold shadow"
                      : "hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )

      case "Attachment":
        return (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm">
            <div className="size-9 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-main)] font-mono text-[10px] font-bold">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[var(--text-main)] truncate">Quarterly_Report_2026.pdf</div>
              <div className="text-[11px] text-[var(--text-muted)]">2.4 MB • Ready</div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
        )

      case "Field":
        return (
          <div className="w-full max-w-sm space-y-1.5">
            <label className="type-caption font-medium text-[var(--text-main)]">Email address</label>
            <Input type="email" placeholder="m@example.com" />
            <p className="type-caption text-[var(--text-muted)]">We will never share your email with third parties.</p>
          </div>
        )

      case "Combobox":
        return (
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)]">
              <span>Next.js</span>
              <ChevronDown className="size-4" />
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

        {/* Code Snippet Preview & "View Code" toggle */}
        {!isCodeExpanded ? (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)]/80 p-4 font-mono text-xs relative select-none">
            {/* Show real first 3 lines of demo code */}
            <div className="overflow-hidden max-h-20 opacity-60 space-y-1">
              {getComponentDemoCode()
                .trim()
                .split("\n")
                .slice(0, 3)
                .map((line, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-[var(--text-muted)]/50 select-none w-4 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[var(--text-muted)] truncate">{line}</span>
                  </div>
                ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent">
              <button
                onClick={() => setIsCodeExpanded(true)}
                className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] type-link-12 text-[var(--text-main)] shadow-lg transition-colors flex items-center gap-1.5"
              >
                <Code2 className="size-3.5" />
                <span>View Code</span>
              </button>
            </div>
          </div>
        ) : (
          /* Full expanded code block with Mac style header */
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)] font-mono text-xs overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 group/dots">
                  <span className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 inline-block" />
                  <span className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 inline-block" />
                  <span className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 inline-block" />
                </div>
                <div className="h-3 w-px bg-[var(--border-subtle)]" />
                <span className="font-bold text-[10px] bg-[var(--bg-card)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded text-[var(--text-main)] font-mono">
                  TS
                </span>
                <span className="text-[var(--text-muted)] font-mono text-xs">
                  components/ui/{componentData.id}-demo.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCodeExpanded(false)}
                  className="px-2.5 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
                >
                  Collapse Code
                </button>
                <button
                  onClick={() => handleCopy(getComponentDemoCode(), "preview-demo")}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] transition-colors"
                >
                  {copiedSection === "preview-demo" ? (
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

            <div className="p-4 overflow-x-auto max-h-[500px] leading-relaxed text-[var(--text-main)]">
              {getComponentDemoCode()
                .trim()
                .split("\n")
                .map((line, idx) => (
                  <div key={idx} className="flex gap-4 hover:bg-[var(--bg-subtle)]/30 px-1 py-0.5 rounded">
                    <span className="text-[var(--text-muted)]/60 select-none w-6 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">{renderHighlightedLine(line)}</span>
                  </div>
                ))}
            </div>

            <div className="flex justify-end p-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30">
              <button
                onClick={() => setIsCodeExpanded(false)}
                className="px-3 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
              >
                Collapse Code
              </button>
            </div>
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

            {/* Manual Code block with Mac style header matching user request */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden font-mono text-xs shadow-md">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/60 select-none">
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
                      onClick={() => setIsManualExpanded(!isManualExpanded)}
                      className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center transition-all hover:brightness-95 cursor-pointer"
                      title={isManualExpanded ? "Collapse" : "Expand"}
                    >
                      <span className="opacity-0 group-hover/dots:opacity-100 text-[7px] text-[#003800] leading-none font-black">
                        {isManualExpanded ? "⤡" : "⤢"}
                      </span>
                    </span>
                  </div>

                  <div className="h-3 w-px bg-[var(--border-subtle)]" />

                  {/* TS badge & file path */}
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <span className="font-bold text-[10px] bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded text-[var(--text-main)]">
                      TS
                    </span>
                    <span className="font-mono text-xs">components/ui/{componentData.id}.tsx</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <button
                    onClick={() => setIsManualExpanded(!isManualExpanded)}
                    className="hover:text-[var(--text-main)] transition-colors type-link-12 font-medium"
                  >
                    {isManualExpanded ? "Collapse" : "Expand"}
                  </button>
                  <button
                    onClick={() =>
                      handleCopy(
                        `import * as React from "react"\nimport { mergeProps } from "@base-ui/react/merge-props"\nimport { useRender } from "@base-ui/react/use-render"\nimport { cn } from "cn"\nimport { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"\n\nexport function ${componentName}() {\n  return (\n    <div className={cn("inline-flex items-center gap-2")}>\n      {/* ${componentName} implementation */}\n    </div>\n  )\n}`,
                        "manual-file"
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] px-2 py-1 text-xs text-[var(--text-main)] transition-all"
                    title="Copy source"
                  >
                    {copiedSection === "manual-file" ? (
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

              <div
                className={`p-4 overflow-x-auto text-[var(--text-main)] leading-relaxed transition-all duration-200 ${
                  isManualExpanded ? "max-h-[500px]" : "max-h-[220px]"
                }`}
              >
                <div><span className="text-[var(--text-muted)] mr-4">1</span><span className="text-purple-400">import</span> * <span className="text-purple-400">as</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">"react"</span></div>
                <div><span className="text-[var(--text-muted)] mr-4">2</span><span className="text-purple-400">import</span> &#123; mergeProps &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@base-ui/react/merge-props"</span></div>
                <div><span className="text-[var(--text-muted)] mr-4">3</span><span className="text-purple-400">import</span> &#123; useRender &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@base-ui/react/use-render"</span></div>
                <div><span className="text-[var(--text-muted)] mr-4">4</span><span className="text-purple-400">import</span> &#123; cn &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"cn"</span></div>
                <div><span className="text-[var(--text-muted)] mr-4">5</span><span className="text-purple-400">import</span> &#123; ChevronRightIcon, MoreHorizontalIcon &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"lucide-react"</span></div>
                {isManualExpanded && (
                  <>
                    <div className="pt-2"><span className="text-[var(--text-muted)] mr-4">6</span></div>
                    <div><span className="text-[var(--text-muted)] mr-4">7</span><span className="text-purple-400">export function</span> <span className="text-blue-300">{componentName}</span>() &#123;</div>
                    <div><span className="text-[var(--text-muted)] mr-4">8</span>  <span className="text-purple-400">return</span> (</div>
                    <div><span className="text-[var(--text-muted)] mr-4">9</span>    &lt;<span className="text-pink-400">div</span> <span className="text-sky-300">className</span>={"{cn(\"inline-flex items-center gap-2\")}"}&gt;</div>
                    <div><span className="text-[var(--text-muted)] mr-4">10</span>      &lt;<span className="text-pink-400">span</span>&gt;{componentName} Primitive&lt;/<span className="text-pink-400">span</span>&gt;</div>
                    <div><span className="text-[var(--text-muted)] mr-4">11</span>    &lt;/<span className="text-pink-400">div</span>&gt;</div>
                    <div><span className="text-[var(--text-muted)] mr-4">12</span>  )</div>
                    <div><span className="text-[var(--text-muted)] mr-4">13</span>&#125;</div>
                  </>
                )}
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
              <Button size="sm" variant="outline">
                Remote Action
              </Button>
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

      {/* Bottom Navigation matching Shadcn Docs (media_1790405329387.png) */}
      <div className="flex items-center justify-between pt-8 pb-16 border-t border-[var(--border-subtle)] mt-12">
        {prev.name ? (
          <a
            href={prev.url}
            onClick={(e) => {
              e.preventDefault()
              onSelectComponent(prev.name)
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] text-[var(--text-muted)] type-small-body font-medium transition-colors shadow-sm"
          >
            <ChevronLeft className="size-4" />
            <span>{prev.name}</span>
          </a>
        ) : (
          <div />
        )}
        {next.name ? (
          <a
            href={next.url}
            onClick={(e) => {
              e.preventDefault()
              onSelectComponent(next.name)
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] text-[var(--text-muted)] type-small-body font-medium transition-colors shadow-sm"
          >
            <span>{next.name}</span>
            <ChevronRight className="size-4" />
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
