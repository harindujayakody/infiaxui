import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shadcn/accordion"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/shadcn/tabs"
import { Progress } from "@/components/shadcn/progress"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/shadcn/dialog"
import { Textarea } from "@/components/shadcn/textarea"
import { Tooltip } from "@/components/shadcn/tooltip"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/shadcn/table"
import { InputOTP } from "@/components/shadcn/input-otp"
import { Select } from "@/components/shadcn/select"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/shadcn/collapsible"
import { DataTableDemo } from "@/components/shadcn/data-table-demo"
import { DataTableGuide } from "@/components/shadcn/data-table-guide"
import { AccordionGuide } from "@/components/shadcn/accordion-guide"
import { Bubble, BubbleContent, BubbleReactions, BubbleGroup } from "@/components/shadcn/bubble"
import { BubbleGuide } from "@/components/shadcn/bubble-guide"
import { BadgeGuide } from "@/components/shadcn/badge-guide"
import { AvatarGuide } from "@/components/shadcn/avatar-guide"
import { AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/shadcn/avatar"
import { TooltipGuide } from "@/components/shadcn/tooltip-guide"
import { ToggleGuide } from "@/components/shadcn/toggle-guide"
import { ToggleGroupGuide } from "@/components/shadcn/toggle-group-guide"
import { ToastGuide } from "@/components/shadcn/toast-guide"
import { TextareaGuide } from "@/components/shadcn/textarea-guide"
import { TabsGuide } from "@/components/shadcn/tabs-guide"
import { TableGuide } from "@/components/shadcn/table-guide"
import { SwitchGuide } from "@/components/shadcn/switch-guide"
import { SpinnerGuide } from "@/components/shadcn/spinner-guide"
import { SliderGuide } from "@/components/shadcn/slider-guide"
import { SkeletonGuide } from "@/components/shadcn/skeleton-guide"
import { SidebarGuide } from "@/components/shadcn/sidebar-guide"
import { SheetGuide } from "@/components/shadcn/sheet-guide"
import { SeparatorGuide } from "@/components/shadcn/separator-guide"
import { SelectGuide } from "@/components/shadcn/select-guide"
import { ScrollAreaGuide } from "@/components/shadcn/scroll-area-guide"
import { ResizableGuide } from "@/components/shadcn/resizable-guide"
import { RadioGroupGuide } from "@/components/shadcn/radio-group-guide"
import { QuestionnaireGuide } from "@/components/shadcn/questionnaire-guide"
import { ProgressGuide } from "@/components/shadcn/progress-guide"
import { PopoverGuide } from "@/components/shadcn/popover-guide"
import { NavigationMenuGuide } from "@/components/shadcn/navigation-menu-guide"
import { PaginationGuide } from "@/components/shadcn/pagination-guide"
import { NativeSelectGuide } from "@/components/shadcn/native-select-guide"
import { MessageScrollerGuide } from "@/components/shadcn/message-scroller-guide"
import { MessageGuide } from "@/components/shadcn/message-guide"
import { MenubarGuide } from "@/components/shadcn/menubar-guide"
import { MarkerGuide } from "@/components/shadcn/marker-guide"
import { LabelGuide } from "@/components/shadcn/label-guide"
import { KbdGuide } from "@/components/shadcn/kbd-guide"
import { ItemGuide } from "@/components/shadcn/item-guide"
import { InputOTPGuide } from "@/components/shadcn/input-otp-guide"
import { InputGroupGuide } from "@/components/shadcn/input-group-guide"
import { InputGuide } from "@/components/shadcn/input-guide"
import { HoverCardGuide } from "@/components/shadcn/hover-card-guide"
import { FieldGuide } from "@/components/shadcn/field-guide"
import { EmptyGuide } from "@/components/shadcn/empty-guide"
import { DropdownMenuGuide } from "@/components/shadcn/dropdown-menu-guide"
import { DrawerGuide } from "@/components/shadcn/drawer-guide"
import { DirectionGuide } from "@/components/shadcn/direction-guide"
import { DialogGuide } from "@/components/shadcn/dialog-guide"
import { DatePickerGuide } from "@/components/shadcn/date-picker-guide"
import { ContextMenuGuide } from "@/components/shadcn/context-menu-guide"
import { CommandGuide } from "@/components/shadcn/command-guide"
import { ComboboxGuide } from "@/components/shadcn/combobox-guide"
import { CollapsibleGuide } from "@/components/shadcn/collapsible-guide"
import { CheckboxGuide } from "@/components/shadcn/checkbox-guide"
import { ChartGuide } from "@/components/shadcn/chart-guide"
import { CarouselGuide } from "@/components/shadcn/carousel-guide"
import { CardGuide } from "@/components/shadcn/card-guide"
import { CalendarGuide } from "@/components/shadcn/calendar-guide"
import { ButtonGroupGuide } from "@/components/shadcn/button-group-guide"
import { AlertGuide } from "@/components/shadcn/alert-guide"
import { AlertDialogGuide } from "@/components/shadcn/alert-dialog-guide"
import { AspectRatioGuide } from "@/components/shadcn/aspect-ratio-guide"
import { AttachmentGuide } from "@/components/shadcn/attachment-guide"
import { ButtonGuide } from "@/components/shadcn/button-guide"
import { SonnerGuide } from "@/components/shadcn/sonner-guide"
import { InstallationGuide } from "@/components/shadcn/installation-guide"
import { ThemingGuide } from "@/components/shadcn/theming-guide"
import { IntroductionGuide } from "@/components/shadcn/introduction-guide"
import { SkillsGuide } from "@/components/shadcn/skills-guide"
import { NavigationMenuDemo } from "@/components/shadcn/navigation-menu-demo"
import { HoverCardDemo } from "@/components/shadcn/hover-card-demo"
import { PopoverDemo } from "@/components/shadcn/popover-demo"
import { MenubarDemo } from "@/components/shadcn/menubar-demo"
import { LabelDemo } from "@/components/shadcn/label-demo"
import { InputOTPDemo } from "@/components/shadcn/input-otp-demo"
import { DropdownMenuDemo } from "@/components/shadcn/dropdown-menu-demo"
import { DrawerDemo } from "@/components/shadcn/drawer-demo"
import { DirectionDemo } from "@/components/shadcn/direction-demo"
import { ContextMenuDemo } from "@/components/shadcn/context-menu-demo"
import { ChartDemo } from "@/components/shadcn/chart-demo"
import { BubbleDemo } from "@/components/shadcn/bubble-demo"
import { AvatarDemo } from "@/components/shadcn/avatar-demo"
import { SeparatorDemo } from "@/components/shadcn/separator-demo"
import { ComboboxDemo } from "@/components/shadcn/combobox-demo"
import { CarouselDemo } from "@/components/shadcn/carousel-demo"
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam-demo"
import { AnimatedBeamGuide } from "@/components/magicui/animated-beam-guide"
import { GlareHoverDemo } from "@/components/magicui/glare-hover-demo"
import { GlareHoverGuide } from "@/components/magicui/glare-hover-guide"
import { DockDemo } from "@/components/magicui/dock-demo"
import { DockGuide } from "@/components/magicui/dock-guide"
import { TweetCardDemo } from "@/components/magicui/tweet-card-demo"
import { TweetCardGuide } from "@/components/magicui/tweet-card-guide"
import { MagicCardDemo } from "@/components/magicui/magic-card-demo"
import { MagicCardGuide } from "@/components/magicui/magic-card-guide"
import { WarpBackgroundDemo } from "@/components/magicui/warp-background-demo"
import { WarpBackgroundGuide } from "@/components/magicui/warp-background-guide"
import { Floating3DParticlesDemo } from "@/components/magicui/floating-3d-particles-demo"
import { Floating3DParticlesGuide } from "@/components/magicui/floating-3d-particles-guide"
import { MarqueeDemo } from "@/components/magicui/marquee-demo"
import { MarqueeGuide } from "@/components/magicui/marquee-guide"
import { GlobeDemo } from "@/components/magicui/globe-demo"
import { GlobeGuide } from "@/components/magicui/globe-guide"
import { TerminalDemo } from "@/components/magicui/terminal-demo"
import { TerminalGuide } from "@/components/magicui/terminal-guide"
import { BentoDemo } from "@/components/magicui/bento-grid-demo"
import { BentoGridGuide } from "@/components/magicui/bento-grid-guide"
import { RainbowButtonDemo } from "@/components/magicui/rainbow-button-demo"
import { RainbowButtonGuide } from "@/components/magicui/rainbow-button-guide"
import { ThreeDCardDemo } from "@/components/ui/three-d-card-demo"
import { ThreeDCardGuide } from "@/components/ui/three-d-card-guide"
import { AnimatedShinyTextDemo } from "@/components/magicui/animated-shiny-text-demo"
import { AnimatedShinyTextGuide } from "@/components/magicui/animated-shiny-text-guide"
import { ScrollBasedVelocityDemo } from "@/components/magicui/scroll-based-velocity-demo"
import { ScrollBasedVelocityGuide } from "@/components/magicui/scroll-based-velocity-guide"
import { SmoothCursorDemo } from "@/components/magicui/smooth-cursor-demo"
import { SmoothCursorGuide } from "@/components/magicui/smooth-cursor-guide"
import { AnimatedListDemo } from "@/components/magicui/animated-list-demo"
import { AnimatedListGuide } from "@/components/magicui/animated-list-guide"
import { RippleDemo } from "@/components/magicui/ripple-demo"
import { RippleGuide } from "@/components/magicui/ripple-guide"
import { StripedPatternDemo } from "@/components/magicui/striped-pattern-demo"
import { StripedPatternGuide } from "@/components/magicui/striped-pattern-guide"
import { PixelImageDemo } from "@/components/magicui/pixel-image-demo"
import { PixelImageGuide } from "@/components/magicui/pixel-image-guide"
import { DiaTextRevealDemo } from "@/components/magicui/dia-text-reveal-demo"
import { DiaTextRevealGuide } from "@/components/magicui/dia-text-reveal-guide"
import { ThemeTogglerDemo } from "@/components/magicui/animated-theme-toggler-demo"
import { AnimatedThemeTogglerGuide } from "@/components/magicui/animated-theme-toggler-guide"
import { DotPatternDemo } from "@/components/magicui/dot-pattern-demo"
import { DotPatternGuide } from "@/components/magicui/dot-pattern-guide"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { highlightGithubLine } from "@/lib/github-highlighter"
import { cn } from "@/lib/utils"

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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [radioValue, setRadioValue] = useState("comfortable")
  const [otpVal, setOtpVal] = useState("123456")
  const [textareaVal, setTextareaVal] = useState("")
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [toggleBold, setToggleBold] = useState(true)
  const [toggleItalic, setToggleItalic] = useState(false)
  const [toggleUnderline, setToggleUnderline] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

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
      case "Animated Beam":
        return `import React, { useRef } from "react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { CircleUser, Server, Cloud, Database, Globe, Layers, Cpu } from "lucide-react"

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[350px] w-full items-center justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-10"
    >
      <div ref={div1Ref} className="z-10 flex size-12 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] shadow-md">
        <CircleUser className="size-6 text-indigo-400" />
      </div>
      <div ref={div2Ref} className="z-10 flex size-12 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-subtle)] shadow-md">
        <Server className="size-6 text-cyan-400" />
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        curvature={0}
      />
    </div>
  )
}`

      case "Glare Hover":
        return `import { GlareHover } from "@/components/ui/glare-hover"
import { Check } from "lucide-react"

export function GlareHoverDemo() {
  return (
    <GlareHover
      className="w-full max-w-[340px] rounded-2xl border border-white/10 bg-[#161616] p-6 sm:p-7 shadow-2xl select-none text-left"
      color="#ffffff"
      opacity={0.3}
      angle={-45}
      size={250}
      duration={650}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Pro</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">For teams that need more.</p>
          </div>
          <span className="rounded-full bg-zinc-200 px-3 py-0.5 text-xs font-semibold text-zinc-900 shadow-sm">
            Popular
          </span>
        </div>

        <div className="flex items-baseline my-6">
          <span className="text-4xl font-extrabold text-white tracking-tight">$49</span>
          <span className="text-sm font-normal text-zinc-400 ml-1">/mo</span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
            <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
            <span>Unlimited projects</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
            <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
            <span>Team collaboration</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200">
            <Check className="size-4 shrink-0 text-white" strokeWidth={2.5} />
            <span>Advanced analytics</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-500">
            <span className="mx-1 text-base leading-none">·</span>
            <span>SSO (coming soon)</span>
          </div>
        </div>

        <button className="w-full py-2.5 px-4 rounded-xl bg-zinc-200 hover:bg-white text-zinc-900 font-semibold text-sm transition-colors shadow-sm cursor-pointer">
          Get started
        </button>
      </div>
    </GlareHover>
  )
}`

      case "Dock":
        return `import { Dock, DockIcon } from "@/components/magicui/dock"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Home, Pencil, Mail } from "lucide-react"

export function DockDemo() {
  return (
    <div className="relative flex flex-col w-full items-center justify-center p-8 overflow-hidden select-none">
      <span className="pointer-events-none select-none bg-gradient-to-b from-white to-zinc-800/10 bg-clip-text text-8xl font-bold tracking-tight text-transparent pb-3">
        Dock
      </span>

      <TooltipProvider delayDuration={0}>
        <Dock className="bg-[#161616]/90 border border-[#262626] shadow-2xl backdrop-blur-md">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Home"
                  className="size-11 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Home className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
              >
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Blog"
                  className="size-11 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Pencil className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
              >
                <p>Blog</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <div className="h-6 w-[1px] bg-[#262626] mx-1 self-center" />

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Contact"
                  className="size-11 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Mail className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#161616] text-zinc-200 border border-[#262626] text-xs px-2.5 py-1 rounded-md shadow-xl"
              >
                <p>Contact</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  )
}`

      case "Tweet Card":
        return `import { TweetCard } from "@/components/magicui/tweet-card"

export function TweetCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <TweetCard id="1441032681968212480" />
    </div>
  )
}`

      case "Magic Card":
        return `import { MagicCard } from "@/components/magicui/magic-card"

export function MagicCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <MagicCard
        gradientSize={240}
        gradientFrom="#9E7AFF"
        gradientTo="#FE8BBB"
        className="p-6 cursor-pointer max-w-sm"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-white">Spotlight Effect</h3>
          <p className="text-xs text-zinc-400">
            A spotlight effect that follows your mouse cursor and highlights borders on hover.
          </p>
        </div>
      </MagicCard>
    </div>
  )
}`

      case "Warp Background":
        return `import { WarpBackground } from "@/components/magicui/warp-background"

export function WarpBackgroundDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <WarpBackground
        perspective={120}
        beamsPerSide={4}
        beamSize={5}
        beamDuration={3.5}
        className="w-full max-w-xl min-h-[360px] p-6 sm:p-12 shadow-2xl"
      >
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl max-w-md text-left">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Congratulations on Your Promotion!
          </h3>
          <p className="mt-2.5 text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
            Your hard work and dedication have paid off. We're thrilled to see you take this next step in your career. Keep up the fantastic work!
          </p>
        </div>
      </WarpBackground>
    </div>
  )
}`

      case "Floating 3D Particles":
        return `import { Floating3DParticles } from "@/components/magicui/floating-3d-particles"
import { ArrowRight } from "lucide-react"

export function Floating3DParticlesDemo() {
  return (
    <div className="relative flex min-h-[420px] w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-6 text-center shadow-2xl">
      <Floating3DParticles color="#FFFFFF" quantity={360} size={4} opacity={0.32} drift={0.75} depth={0.65} />
      <div className="relative z-10 max-w-lg space-y-3 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Build something magical
        </h2>
        <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-md mx-auto">
          A pseudo-3D particle background that stays behind your content with continuous rotation and buoyant drift.
        </p>
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black">
            <span>Get Started</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}`

      case "Marquee":
        return `import { Marquee } from "@/components/magicui/marquee"

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
]

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0A0A0A]">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0A0A0A]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0A0A0A]" />
    </div>
  )
}`

      case "Globe":
        return `import { Globe } from "@/components/magicui/globe"

export function GlobeDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] px-10 pb-40 pt-8 md:pb-60">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-zinc-700/30 bg-clip-text text-center text-7xl sm:text-8xl font-semibold leading-none text-transparent select-none z-10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  )
}`

      case "Terminal":
        return `import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal"

export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>> pnpm dlx shadcn@latest init</TypingAnimation>
      <AnimatedSpan className="text-emerald-400">
        ✔ Preflight checks.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Verifying framework. Found Next.js.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Validating Tailwind CSS.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Validating import alias.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Writing components.json.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Checking registry.
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Updating tailwind.config.ts
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Updating app/globals.css
      </AnimatedSpan>
      <AnimatedSpan className="text-emerald-400">
        ✔ Installing dependencies.
      </AnimatedSpan>
      <AnimatedSpan className="text-blue-400">
        ℹ Updated 1 file:
      </AnimatedSpan>
      <AnimatedSpan className="text-blue-400 pl-4">
        - lib/utils.ts
      </AnimatedSpan>
      <TypingAnimation className="text-zinc-200">
        Success! Project initialization completed.
      </TypingAnimation>
      <AnimatedSpan className="text-zinc-500">
        You may now add components.
      </AnimatedSpan>
    </Terminal>
  )
}`

      case "Bento Grid":
        return `import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { Bell, Calendar, FileText, Share2 } from "lucide-react"

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
  {
    Icon: Calendar,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-zinc-900/40" />,
  },
]

export function BentoDemo() {
  return (
    <BentoGrid className="max-w-4xl">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}`

      case "Rainbow Button":
        return `import { RainbowButton } from "@/components/magicui/rainbow-button"

export function RainbowButtonDemo() {
  return (
    <RainbowButton>
      Get Unlimited Access
    </RainbowButton>
  )
}`

      case "3D Card Effect":
        return `import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#0A0A0A] relative group/card border-zinc-800/80 w-auto sm:w-[30rem] h-auto rounded-2xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold text-white tracking-tight">
          Make things float in air
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-zinc-400 text-xs sm:text-[13px] max-w-sm mt-2 leading-relaxed">
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="Forest thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem translateZ={20} as="a" href="#" className="px-4 py-2 rounded-xl text-xs font-normal text-white">
            Try now →
          </CardItem>
          <CardItem translateZ={20} as="button" className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold shadow-md">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}`

      case "Animated Shiny Text":
        return `import { ArrowRight } from "lucide-react"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex min-h-[160px] items-center justify-center select-none">
      <div className="group rounded-full border border-white/10 bg-[#161616] px-4 py-1.5 text-sm sm:text-base text-zinc-300 transition-all ease-in hover:cursor-pointer hover:border-zinc-700 hover:bg-zinc-800/90 shadow-lg inline-flex items-center">
        <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-white hover:duration-300">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-300 text-sm">✨</span>
            <span>Introducing Magic UI</span>
          </span>
          <ArrowRight className="ml-1.5 size-3.5 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:text-zinc-200" />
        </AnimatedShinyText>
      </div>
    </div>
  )
}`

      case "Scroll Based Velocity":
        return `import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 select-none">
      <ScrollVelocityContainer className="w-full text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
        <ScrollVelocityRow baseVelocity={12} direction={1} className="py-2 sm:py-3">
          <span className="mx-4 text-white">ScrollVelocity</span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={12} direction={-1} className="py-2 sm:py-3">
          <span className="mx-4 text-white">ScrollVelocity</span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}`

      case "Smooth Cursor":
        return `import { SmoothCursor } from "@/components/ui/smooth-cursor"

export function SmoothCursorDemo() {
  return (
    <div className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] select-none p-6 shadow-2xl">
      <p className="pointer-events-none z-10 text-base sm:text-lg font-normal text-zinc-300 tracking-tight select-none">
        Move your mouse around
      </p>
      <SmoothCursor />
    </div>
  )
}`

      case "Animated List":
        return `import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const notifications: Item[] = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]

export function AnimatedListDemo() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl select-none mx-auto">
      <AnimatedList delay={1500}>
        {notifications.map((item, idx) => (
          <figure
            key={idx}
            className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 bg-[#161616]/90 border border-white/10 shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-row items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-lg leading-none">{item.icon}</span>
              </div>
              <div className="flex flex-col overflow-hidden text-left">
                <figcaption className="flex flex-row items-center whitespace-pre text-sm sm:text-base font-semibold text-white">
                  <span>{item.name}</span>
                  <span className="mx-1 text-zinc-500 font-normal">·</span>
                  <span className="text-xs text-zinc-500 font-normal font-mono">{item.time}</span>
                </figcaption>
                <p className="text-xs sm:text-sm font-normal text-zinc-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          </figure>
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </div>
  )
}`

      case "Ripple":
        return `import { Ripple } from "@/components/ui/ripple"

export function RippleDemo() {
  return (
    <div className="relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none">
      <p className="z-10 whitespace-pre-wrap text-center text-4xl sm:text-5xl font-bold tracking-tight text-white pointer-events-none">
        Ripple
      </p>
      <Ripple />
    </div>
  )
}`

      case "Striped Pattern":
        return `import { StripedPattern } from "@/components/ui/striped-pattern"

export function StripedPatternDemo() {
  return (
    <div className="relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none">
      <StripedPattern
        direction="left"
        width={14}
        height={14}
        className="stroke-zinc-400/40 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}`

      case "Pixel Image":
        return `import { PixelImage } from "@/components/ui/pixel-image"

export function PixelImageDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <PixelImage
        src="/pixel-image-demo.png"
        grid="6x4"
        grayscaleAnimation={true}
        className="h-72 w-72 md:h-80 md:w-80 shadow-2xl"
      />
    </div>
  )
}`

      case "Dia Text Reveal":
        return `import { DiaTextReveal } from "@/components/ui/dia-text-reveal"

export function DiaTextRevealDemo() {
  return (
    <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white">
      <DiaTextReveal text="Magic" repeat repeatDelay={1.5} textColor="#ffffff" />
    </h2>
  )
}`

      case "Theme Toggler":
        return `import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function ThemeTogglerDemo() {
  return (
    <AnimatedThemeToggler
      variant="circle"
      className="size-16 rounded-full bg-black text-white dark:bg-white dark:text-black border border-white/20 shadow-2xl"
    />
  )
}`

      case "Dot Pattern":
        return `import { DotPattern } from "@/components/ui/dot-pattern"

export function DotPatternDemo() {
  return (
    <div className="relative flex h-[380px] sm:h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl select-none">
      <DotPattern
        width={16}
        height={16}
        cx={1}
        cy={1}
        cr={1}
        className="text-zinc-400/50 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
      />
    </div>
  )
}`

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

      case "Popover":
        return `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SlidersHorizontal } from "lucide-react"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          <span>Dimensions</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3 pt-1">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`

      case "Menubar":
        return `import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`

      case "Label":
        return `import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </Label>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Your email address</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
    </div>
  )
}`

      case "Input OTP":
        return `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`

      case "Dropdown Menu":
        return `import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, CreditCard, Settings, LogOut } from "lucide-react"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 size-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`

      case "Drawer":
        return `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-center">
          <div className="text-5xl font-bold font-mono">350</div>
          <div className="text-xs text-muted-foreground">Calories/day</div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`

      case "Direction":
        return `import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"

export function DirectionDemo() {
  return (
    <DirectionProvider defaultDirection="ltr">
      <div className="space-y-4 max-w-sm">
        <p className="text-xs text-muted-foreground">Sets application reading direction.</p>
        <Button variant="outline">Interactive Direction Demo</Button>
      </div>
    </DirectionProvider>
  )
}`

      case "Context Menu":
        return `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`

      case "Chart":
        return `import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`

      case "Bubble":
        return `import { Bubble, BubbleContent, BubbleReactions, BubbleGroup } from "@/components/ui/bubble"

export function BubbleDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <Bubble variant="default" align="end">
        <BubbleContent>Hey there! what's up?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="secondary" align="start">
          <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
        </Bubble>
        <Bubble variant="secondary" align="start">
          <BubbleContent>
            I can group messages, switch sides, and keep the whole thread easy to scan.
          </BubbleContent>
          <BubbleReactions>
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}`

      case "Carousel":
        return `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`

      case "Combobox":
        return `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ComboboxDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>

      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" alt="Sarah" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80" alt="Marcus" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
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

      case "Accordion":
        return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`

      case "Aspect Ratio":
        return `import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  )
}`

      case "Collapsible":
        return `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CollapsibleDemo() {
  return (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`

      case "Dialog":
      case "Alert Dialog":
        return `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

      case "Tabs":
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
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input id="name" defaultValue="Pedro Duarte" />
            <Input id="username" defaultValue="@peduarte" />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input id="current" type="password" />
            <Input id="new" type="password" />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}`

      case "Navigation Menu":
        return `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <NavigationMenuLink href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <NavigationMenuLink title="Alert Dialog" href="/docs/components/alert-dialog">
                A modal dialog that interrupts the user with important content.
              </NavigationMenuLink>
              <NavigationMenuLink title="Hover Card" href="/docs/components/hover-card">
                For sighted users to preview content available behind a link.
              </NavigationMenuLink>
              <NavigationMenuLink title="Progress" href="/docs/components/progress">
                Displays an indicator showing the completion progress of a task.
              </NavigationMenuLink>
              <NavigationMenuLink title="Scroll-area" href="/docs/components/scroll-area">
                Visually or semantically separates content.
              </NavigationMenuLink>
              <NavigationMenuLink title="Tabs" href="/docs/components/tabs">
                A set of layered sections of content.
              </NavigationMenuLink>
              <NavigationMenuLink title="Tooltip" href="/docs/components/tooltip">
                A popup that displays information related to an element.
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className="font-medium">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`

      case "Hover Card":
        return `import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`

      case "Progress":
        return `import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={66} className="w-[60%]" />
}`

      case "Radio Group":
        return `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`

      case "Textarea":
        return `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}`

      case "Tooltip":
        return `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

      case "Table":
        return `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
]

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`

      case "Data Table":
        return `"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}`

      case "Select":
        return `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}`

      case "Toggle":
      case "Toggle Group":
        return `import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`

      case "Toast":
      case "Sonner":
        return `import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2026 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}`

      case "Command":
        return `import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`

      case "Date Picker":
        return `import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}`

      case "Scroll Area":
        return `import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => \`v1.2.0-beta.\${a.length - i}\`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}`

      default:
        return `${componentData.importCode}\n\nexport function ${componentData.name.replace(/[^a-zA-Z0-9]/g, "")}Demo() {\n  return (\n    <div className="flex items-center justify-center p-6">\n      ${componentData.usageCode}\n    </div>\n  )\n}`
    }
  }

  const renderHighlightedLine = (line: string) => {
    return highlightGithubLine(line)
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
          <div className="w-full flex justify-center py-6">
            <AvatarDemo />
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
          <div className="w-full flex justify-center py-6">
            <ComboboxDemo />
          </div>
        )
      case "Accordion":
        return (
          <div className="w-full max-w-md">
            <Accordion type="single" defaultValue="item-1" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern and supports full keyboard navigation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other components' aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )

      case "Aspect Ratio":
        return (
          <div className="w-full max-w-md overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-md">
            <div className="relative aspect-video w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=80"
                alt="Photo by Drew Beamer"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[11px] font-mono text-white backdrop-blur-sm">
                16:9 Aspect Ratio
              </div>
            </div>
          </div>
        )

      case "Collapsible":
        return (
          <div className="w-full max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[var(--text-main)]">
                @peduarte starred 3 repositories
              </h4>
              <button
                onClick={() => setCollapsibleOpen(!collapsibleOpen)}
                className="size-7 rounded-md hover:bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <ChevronDown className={cn("size-4 transition-transform", collapsibleOpen && "rotate-180")} />
              </button>
            </div>
            <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 px-3 py-2 text-xs font-mono text-[var(--text-main)]">
              @radix-ui/primitives
            </div>
            {collapsibleOpen && (
              <div className="space-y-2 animate-in fade-in-0 duration-150">
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 px-3 py-2 text-xs font-mono text-[var(--text-main)]">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 px-3 py-2 text-xs font-mono text-[var(--text-main)]">
                  @stitches/react
                </div>
              </div>
            )}
          </div>
        )

      case "Dialog":
      case "Alert Dialog":
        return (
          <div className="flex flex-col items-center gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Button variant="outline">Open {componentData.name}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 text-xs">
                    <label className="text-right text-[var(--text-muted)]">Name</label>
                    <Input defaultValue="Pedro Duarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-xs">
                    <label className="text-right text-[var(--text-muted)]">Username</label>
                    <Input defaultValue="@peduarte" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setDialogOpen(false)}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )

      case "Sheet":
        return (
          <div className="flex flex-col items-center gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Button variant="outline">Open {componentData.name}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>{componentData.name} Slide-over</DialogTitle>
                  <DialogDescription>
                    This is a slide-over panel that opens from the edge of the screen.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2 text-xs text-[var(--text-muted)]">
                  <p>Configure project settings, environment variables, or inspect telemetry data.</p>
                </div>
                <DialogFooter>
                  <Button size="sm" onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )

      case "Tabs":
        return (
          <div className="w-full max-w-sm">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Account</CardTitle>
                    <CardDescription className="text-xs">
                      Make changes to your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Input placeholder="Your Name" defaultValue="Pedro Duarte" />
                    <Input placeholder="Username" defaultValue="@peduarte" />
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Password</CardTitle>
                    <CardDescription className="text-xs">
                      Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "Navigation Menu":
        return (
          <div className="w-full flex justify-center py-6">
            <NavigationMenuDemo />
          </div>
        )

      case "Hover Card":
        return (
          <div className="w-full flex justify-center py-6">
            <HoverCardDemo />
          </div>
        )

      case "Popover":
        return (
          <div className="w-full flex justify-center py-6">
            <PopoverDemo />
          </div>
        )

      case "Menubar":
        return (
          <div className="w-full flex justify-center py-6">
            <MenubarDemo />
          </div>
        )

      case "Label":
        return (
          <div className="w-full flex justify-center py-6">
            <LabelDemo />
          </div>
        )

      case "Input OTP":
        return (
          <div className="w-full flex justify-center py-6">
            <InputOTPDemo />
          </div>
        )

      case "Dropdown Menu":
        return (
          <div className="w-full flex justify-center py-6">
            <DropdownMenuDemo />
          </div>
        )

      case "Drawer":
        return (
          <div className="w-full flex justify-center py-6">
            <DrawerDemo />
          </div>
        )

      case "Direction":
        return (
          <div className="w-full flex justify-center py-6">
            <DirectionDemo />
          </div>
        )

      case "Context Menu":
        return (
          <div className="w-full flex justify-center py-6">
            <ContextMenuDemo />
          </div>
        )

      case "Chart":
        return (
          <div className="w-full flex justify-center py-6">
            <ChartDemo />
          </div>
        )

      case "Bubble":
        return (
          <div className="w-full flex justify-center py-6">
            <BubbleDemo />
          </div>
        )

      case "Separator":
        return (
          <div className="w-full flex justify-center py-6">
            <SeparatorDemo />
          </div>
        )

      case "Carousel":
        return (
          <div className="w-full flex justify-center py-6">
            <CarouselDemo />
          </div>
        )

      case "Animated Beam":
        return (
          <div className="w-full flex justify-center py-6">
            <AnimatedBeamDemo />
          </div>
        )

      case "Glare Hover":
        return (
          <div className="w-full flex justify-center py-6">
            <GlareHoverDemo />
          </div>
        )

      case "Dock":
        return (
          <div className="w-full flex justify-center py-6">
            <DockDemo />
          </div>
        )

      case "Tweet Card":
        return (
          <div className="w-full flex justify-center py-6">
            <TweetCardDemo />
          </div>
        )

      case "Magic Card":
        return (
          <div className="w-full flex justify-center py-6">
            <MagicCardDemo />
          </div>
        )

      case "Warp Background":
        return (
          <div className="w-full flex justify-center py-6">
            <WarpBackgroundDemo />
          </div>
        )

      case "Floating 3D Particles":
        return (
          <div className="w-full flex justify-center py-6">
            <Floating3DParticlesDemo />
          </div>
        )

      case "Marquee":
        return (
          <div className="w-full flex justify-center py-6">
            <MarqueeDemo />
          </div>
        )

      case "Globe":
        return (
          <div className="w-full flex justify-center py-6">
            <GlobeDemo />
          </div>
        )

      case "Terminal":
        return (
          <div className="w-full flex justify-center py-6">
            <TerminalDemo />
          </div>
        )

      case "Bento Grid":
        return (
          <div className="w-full flex justify-center py-6">
            <BentoDemo />
          </div>
        )

      case "Rainbow Button":
        return (
          <div className="w-full flex justify-center py-6">
            <RainbowButtonDemo />
          </div>
        )

      case "3D Card Effect":
        return (
          <div className="w-full flex justify-center py-6">
            <ThreeDCardDemo />
          </div>
        )

      case "Animated Shiny Text":
        return (
          <div className="w-full flex justify-center py-6">
            <AnimatedShinyTextDemo />
          </div>
        )

      case "Scroll Based Velocity":
        return (
          <div className="w-full flex justify-center py-6">
            <ScrollBasedVelocityDemo />
          </div>
        )

      case "Smooth Cursor":
        return (
          <div className="w-full flex justify-center py-6">
            <SmoothCursorDemo />
          </div>
        )

      case "Animated List":
        return (
          <div className="w-full flex justify-center py-6">
            <AnimatedListDemo />
          </div>
        )

      case "Ripple":
        return (
          <div className="w-full flex justify-center py-6">
            <RippleDemo />
          </div>
        )

      case "Striped Pattern":
        return (
          <div className="w-full flex justify-center py-6">
            <StripedPatternDemo />
          </div>
        )

      case "Pixel Image":
        return (
          <div className="w-full flex justify-center py-6">
            <PixelImageDemo />
          </div>
        )

      case "Dia Text Reveal":
        return (
          <div className="w-full flex justify-center py-6">
            <DiaTextRevealDemo />
          </div>
        )

      case "Theme Toggler":
        return (
          <div className="w-full flex justify-center py-6">
            <ThemeTogglerDemo />
          </div>
        )

      case "Dot Pattern":
        return (
          <div className="w-full flex justify-center py-6">
            <DotPatternDemo />
          </div>
        )

      case "Progress":
        return (
          <div className="w-full max-w-sm space-y-3 p-4">
            <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
              <span>Syncing repository...</span>
              <span>66%</span>
            </div>
            <Progress value={66} />
          </div>
        )

      case "Radio Group":
        return (
          <RadioGroup defaultValue="comfortable" value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="default" id="r1" />
              <label htmlFor="r1" className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                Default
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <label htmlFor="r2" className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                Comfortable
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="compact" id="r3" />
              <label htmlFor="r3" className="text-xs font-medium text-[var(--text-main)] cursor-pointer">
                Compact
              </label>
            </div>
          </RadioGroup>
        )

      case "Textarea":
        return (
          <div className="w-full max-w-sm space-y-2">
            <label className="type-caption font-medium text-[var(--text-main)]">Your message</label>
            <Textarea
              placeholder="Type your message here."
              value={textareaVal}
              onChange={(e) => setTextareaVal(e.target.value)}
            />
            <p className="type-caption text-[var(--text-muted)]">Your message will be sent to the team.</p>
          </div>
        )

      case "Tooltip":
        return (
          <Tooltip content="Add to library">
            <Button variant="outline">Hover over me</Button>
          </Tooltip>
        )

      case "Table":
        return (
          <div className="w-full max-w-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">Paid</span></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right font-mono">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">Pending</span></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right font-mono">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">Paid</span></TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right font-mono">$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )

      case "Data Table":
        return <DataTableDemo />

      case "Select":
        return (
          <Select
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "blueberry", label: "Blueberry" },
              { value: "grapes", label: "Grapes" },
              { value: "pineapple", label: "Pineapple" },
            ]}
            defaultValue="apple"
            placeholder="Select a fruit"
          />
        )

      case "Toggle":
      case "Toggle Group":
        return (
          <div className="flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1">
            <button
              onClick={() => setToggleBold(!toggleBold)}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-bold transition-colors",
                toggleBold
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              B
            </button>
            <button
              onClick={() => setToggleItalic(!toggleItalic)}
              className={cn(
                "px-3 py-1.5 rounded text-xs italic transition-colors font-serif",
                toggleItalic
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              I
            </button>
            <button
              onClick={() => setToggleUnderline(!toggleUnderline)}
              className={cn(
                "px-3 py-1.5 rounded text-xs underline transition-colors",
                toggleUnderline
                  ? "bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              U
            </button>
          </div>
        )

      case "Toast":
      case "Sonner":
        return (
          <div className="relative flex flex-col items-center">
            <Button
              variant="outline"
              onClick={() => {
                setToastActive(true)
                setTimeout(() => setToastActive(false), 4000)
              }}
            >
              Show Toast
            </Button>
            {toastActive && (
              <div className="fixed bottom-6 right-6 z-50 flex items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
                <div className="space-y-0.5">
                  <div className="type-heading font-semibold text-xs text-[var(--text-main)]">
                    Event has been created
                  </div>
                  <div className="type-caption text-[var(--text-muted)]">
                    Sunday, December 03, 2026 at 9:00 AM
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setToastActive(false)}>
                  Undo
                </Button>
              </div>
            )}
          </div>
        )

      case "Command":
        return (
          <div className="w-full max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-md overflow-hidden">
            <div className="flex items-center border-b border-[var(--border-subtle)] px-3">
              <Input
                placeholder="Type a command or search..."
                className="border-0 focus:ring-0 shadow-none px-0 py-2.5 bg-transparent"
              />
            </div>
            <div className="p-2 space-y-1 text-xs">
              <div className="px-2 py-1 text-[10px] uppercase font-mono text-[var(--text-muted)]">Suggestions</div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[var(--bg-subtle)] text-[var(--text-main)] cursor-pointer">
                <span>📅 Calendar</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]/50 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">
                <span>🔍 Search Emoji</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]/50 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer">
                <span>⚙️ Settings</span>
              </div>
            </div>
          </div>
        )

      case "Date Picker":
        return (
          <div className="w-full max-w-xs space-y-2">
            <button
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              className="flex h-9 w-full items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 text-xs text-[var(--text-main)] shadow-sm"
            >
              <span>September 26, 2026</span>
              <span>📅</span>
            </button>
            {datePickerOpen && (
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 text-center shadow-lg animate-in fade-in-0 duration-150">
                <div className="text-xs font-semibold text-[var(--text-main)] mb-2">September 2026</div>
                <div className="grid grid-cols-7 gap-1 text-[10px] text-[var(--text-muted)] mb-1">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDatePickerOpen(false)}
                      className={cn(
                        "size-6 rounded flex items-center justify-center transition-colors",
                        d === 26
                          ? "bg-[var(--text-main)] text-[var(--bg-page)] font-bold"
                          : "hover:bg-[var(--bg-subtle)] text-[var(--text-main)]"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case "Pagination":
        return (
          <nav aria-label="pagination" className="flex items-center gap-1 text-xs">
            <Button variant="ghost" size="sm">Previous</Button>
            <Button size="sm" className="size-8 p-0">1</Button>
            <Button variant="ghost" size="sm" className="size-8 p-0">2</Button>
            <Button variant="ghost" size="sm" className="size-8 p-0">3</Button>
            <span className="px-2 text-[var(--text-muted)]">...</span>
            <Button variant="ghost" size="sm" className="size-8 p-0">10</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </nav>
        )

      case "Scroll Area":
        return (
          <div className="h-48 w-48 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 overflow-y-auto space-y-2">
            <h4 className="text-xs font-semibold text-[var(--text-main)] sticky top-0 bg-[var(--bg-card)] pb-1">
              Tags
            </h4>
            {Array.from({ length: 20 }, (_, i) => `v1.2.0-beta.${20 - i}`).map((tag) => (
              <div key={tag} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer py-1 border-b border-[var(--border-subtle)]/50 last:border-0 font-mono">
                {tag}
              </div>
            ))}
          </div>
        )

      case "Empty":
        return (
          <div className="w-full max-w-sm rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)]/50 p-8 text-center space-y-3">
            <div className="size-10 rounded-full bg-[var(--bg-subtle)] mx-auto flex items-center justify-center text-[var(--text-muted)]">
              📭
            </div>
            <div className="space-y-1">
              <h4 className="type-heading text-sm text-[var(--text-main)]">No projects found</h4>
              <p className="type-caption text-[var(--text-muted)]">Get started by creating your first component library project.</p>
            </div>
            <Button size="sm">Create Project</Button>
          </div>
        )

      case "Item":
        return (
          <div className="w-full max-w-sm rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] divide-y divide-[var(--border-subtle)] overflow-hidden">
            {[
              { name: "Documentation.pdf", size: "2.4 MB", tag: "Synced" },
              { name: "Brand_Assets.zip", size: "14.8 MB", tag: "Ready" },
              { name: "Schema.prisma", size: "8.1 KB", tag: "Updated" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 text-xs hover:bg-[var(--bg-subtle)]/50 transition-colors">
                <span className="font-mono text-[var(--text-main)]">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[var(--text-muted)]">{item.size}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[10px] text-[var(--text-muted)] font-mono">{item.tag}</span>
                </div>
              </div>
            ))}
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
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div className="space-y-1.5 min-w-0">
          <h1 className="type-h1 text-[var(--text-main)] truncate">
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
      <div className="flex items-center gap-6 border-b border-[var(--border-subtle)] overflow-x-auto scrollbar-none">
        {(["Base UI", "React Aria", "Radix UI"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setLibTab(tab)}
            className={`pb-2.5 transition-colors relative type-link shrink-0 ${
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

        {/* Code Snippet Preview & "View Code" / "Collapse Code" toggle with unified symmetric animation */}
        <motion.div
          initial={false}
          animate={{ height: isCodeExpanded ? "auto" : 84 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-page)] font-mono text-xs overflow-hidden"
        >
          {/* Top Mac Header (smoothly reveals when expanded) */}
          <motion.div
            initial={false}
            animate={{
              opacity: isCodeExpanded ? 1 : 0,
              height: isCodeExpanded ? "auto" : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
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
                  type="button"
                  onClick={() => setIsCodeExpanded(false)}
                  className="px-2.5 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Collapse Code</span>
                  <ChevronDown className="size-3 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(getComponentDemoCode(), "preview-demo")}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] transition-colors cursor-pointer"
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
          </motion.div>

          {/* Syntax-highlighted code lines */}
          <div
            className={`p-4 leading-relaxed text-[var(--text-main)] ${
              isCodeExpanded ? "overflow-x-auto max-h-[500px]" : "overflow-hidden"
            }`}
          >
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

          {/* Bottom Collapse Footer (smoothly reveals when expanded) */}
          <motion.div
            initial={false}
            animate={{
              opacity: isCodeExpanded ? 1 : 0,
              height: isCodeExpanded ? "auto" : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex justify-end p-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/30">
              <button
                type="button"
                onClick={() => setIsCodeExpanded(false)}
                className="px-3 py-1 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Collapse Code</span>
                <ChevronDown className="size-3 rotate-180" />
              </button>
            </div>
          </motion.div>

          {/* Collapsed Overlay Gradient & Centered "View Code" Button with smooth crossfade */}
          <AnimatePresence>
            {!isCodeExpanded && (
              <motion.div
                key="collapsed-code-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/90 to-transparent z-10 select-none"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCodeExpanded(true)}
                    className="px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] type-link-12 text-[var(--text-main)] font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code2 className="size-3.5" />
                    <span>View Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(getComponentDemoCode(), "preview-demo")}
                    className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] shadow-lg transition-colors cursor-pointer"
                    title="Copy demo code"
                  >
                    {copiedSection === "preview-demo" ? (
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

      {/* Installation Section matching Screenshot */}
      <InstallationSection
        componentName={componentData.name}
        componentSlug={componentData.id}
        dependencies="@base-ui/react"
        sourceCode={`import * as React from "react"\nimport { cn } from "@/lib/utils"\n\nexport function ${componentName.replace(/\s+/g, "")}() {\n  return (\n    <div className={cn("inline-flex items-center gap-2")}>\n      {/* ${componentName} implementation */}\n    </div>\n  )\n}`}
        sourcePath={`components/ui/${componentData.id}.tsx`}
      />

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

      {/* Component-specific custom documentation sections */}
      {componentData.name === "Data Table" ? (
        <DataTableGuide />
      ) : componentData.name === "Accordion" ? (
        <AccordionGuide />
      ) : componentData.name === "Bubble" ? (
        <BubbleGuide />
      ) : componentData.name === "Badge" ? (
        <BadgeGuide />
      ) : componentData.name === "Avatar" ? (
        <AvatarGuide />
      ) : componentData.name === "Tooltip" ? (
        <TooltipGuide />
      ) : componentData.name === "Toggle" ? (
        <ToggleGuide />
      ) : componentData.name === "Toggle Group" ? (
        <ToggleGroupGuide />
      ) : componentData.name === "Toast" ? (
        <ToastGuide />
      ) : componentData.name === "Textarea" ? (
        <TextareaGuide />
      ) : componentData.name === "Tabs" ? (
        <TabsGuide />
      ) : componentData.name === "Table" ? (
        <TableGuide />
      ) : componentData.name === "Switch" ? (
        <SwitchGuide />
      ) : componentData.name === "Spinner" ? (
        <SpinnerGuide />
      ) : componentData.name === "Slider" ? (
        <SliderGuide />
      ) : componentData.name === "Skeleton" ? (
        <SkeletonGuide />
      ) : componentData.name === "Sidebar" ? (
        <SidebarGuide />
      ) : componentData.name === "Sheet" ? (
        <SheetGuide />
      ) : componentData.name === "Separator" ? (
        <SeparatorGuide />
      ) : componentData.name === "Select" ? (
        <SelectGuide />
      ) : componentData.name === "Scroll Area" ? (
        <ScrollAreaGuide />
      ) : componentData.name === "Resizable" ? (
        <ResizableGuide />
      ) : componentData.name === "Radio Group" ? (
        <RadioGroupGuide />
      ) : componentData.name === "Questionnaire" ? (
        <QuestionnaireGuide />
      ) : componentData.name === "Progress" ? (
        <ProgressGuide />
      ) : componentData.name === "Popover" ? (
        <PopoverGuide />
      ) : componentData.name === "Navigation Menu" ? (
        <NavigationMenuGuide />
      ) : componentData.name === "Pagination" ? (
        <PaginationGuide />
      ) : componentData.name === "Native Select" ? (
        <NativeSelectGuide />
      ) : componentData.name === "Message Scroller" ? (
        <MessageScrollerGuide />
      ) : componentData.name === "Message" ? (
        <MessageGuide />
      ) : componentData.name === "Menubar" ? (
        <MenubarGuide />
      ) : componentData.name === "Marker" ? (
        <MarkerGuide />
      ) : componentData.name === "Label" ? (
        <LabelGuide />
      ) : componentData.name === "Kbd" ? (
        <KbdGuide />
      ) : componentData.name === "Item" ? (
        <ItemGuide />
      ) : componentData.name === "Input OTP" ? (
        <InputOTPGuide />
      ) : componentData.name === "Input Group" ? (
        <InputGroupGuide />
      ) : componentData.name === "Input" ? (
        <InputGuide />
      ) : componentData.name === "Hover Card" ? (
        <HoverCardGuide />
      ) : componentData.name === "Field" ? (
        <FieldGuide />
      ) : componentData.name === "Empty" ? (
        <EmptyGuide />
      ) : componentData.name === "Dropdown Menu" ? (
        <DropdownMenuGuide />
      ) : componentData.name === "Drawer" ? (
        <DrawerGuide />
      ) : componentData.name === "Direction" ? (
        <DirectionGuide />
      ) : componentData.name === "Dialog" ? (
        <DialogGuide />
      ) : componentData.name === "Date Picker" ? (
        <DatePickerGuide />
      ) : componentData.name === "Context Menu" ? (
        <ContextMenuGuide />
      ) : componentData.name === "Command" ? (
        <CommandGuide />
      ) : componentData.name === "Combobox" ? (
        <ComboboxGuide />
      ) : componentData.name === "Collapsible" ? (
        <CollapsibleGuide />
      ) : componentData.name === "Checkbox" ? (
        <CheckboxGuide />
      ) : componentData.name === "Chart" ? (
        <ChartGuide />
      ) : componentData.name === "Carousel" ? (
        <CarouselGuide />
      ) : componentData.name === "Animated Beam" ? (
        <AnimatedBeamGuide />
      ) : componentData.name === "Glare Hover" ? (
        <GlareHoverGuide />
      ) : componentData.name === "Dock" ? (
        <DockGuide />
      ) : componentData.name === "Tweet Card" ? (
        <TweetCardGuide />
      ) : componentData.name === "Magic Card" ? (
        <MagicCardGuide />
      ) : componentData.name === "Warp Background" ? (
        <WarpBackgroundGuide />
      ) : componentData.name === "Floating 3D Particles" ? (
        <Floating3DParticlesGuide />
      ) : componentData.name === "Marquee" ? (
        <MarqueeGuide />
      ) : componentData.name === "Globe" ? (
        <GlobeGuide />
      ) : componentData.name === "Terminal" ? (
        <TerminalGuide />
      ) : componentData.name === "Bento Grid" ? (
        <BentoGridGuide />
      ) : componentData.name === "Rainbow Button" ? (
        <RainbowButtonGuide />
      ) : componentData.name === "3D Card Effect" ? (
        <ThreeDCardGuide />
      ) : componentData.name === "Animated Shiny Text" ? (
        <AnimatedShinyTextGuide />
      ) : componentData.name === "Scroll Based Velocity" ? (
        <ScrollBasedVelocityGuide />
      ) : componentData.name === "Smooth Cursor" ? (
        <SmoothCursorGuide />
      ) : componentData.name === "Animated List" ? (
        <AnimatedListGuide />
      ) : componentData.name === "Ripple" ? (
        <RippleGuide />
      ) : componentData.name === "Striped Pattern" ? (
        <StripedPatternGuide />
      ) : componentData.name === "Pixel Image" ? (
        <PixelImageGuide />
      ) : componentData.name === "Dia Text Reveal" ? (
        <DiaTextRevealGuide />
      ) : componentData.name === "Theme Toggler" ? (
        <AnimatedThemeTogglerGuide />
      ) : componentData.name === "Dot Pattern" ? (
        <DotPatternGuide />
      ) : componentData.name === "Card" ? (
        <CardGuide />
      ) : componentData.name === "Calendar" ? (
        <CalendarGuide />
      ) : componentData.name === "Button Group" ? (
        <ButtonGroupGuide />
      ) : componentData.name === "Alert" ? (
        <AlertGuide />
      ) : componentData.name === "Alert Dialog" ? (
        <AlertDialogGuide />
      ) : componentData.name === "Aspect Ratio" ? (
        <AspectRatioGuide />
      ) : componentData.name === "Attachment" ? (
        <AttachmentGuide />
      ) : componentData.name === "Button" ? (
        <ButtonGuide />
      ) : componentData.name === "Sonner" ? (
        <SonnerGuide />
      ) : componentData.name === "Installation" ? (
        <InstallationGuide />
      ) : componentData.name === "Theming" ? (
        <ThemingGuide />
      ) : componentData.name === "Introduction" ? (
        <IntroductionGuide />
      ) : componentData.name === "Skills" ? (
        <SkillsGuide />
      ) : componentData.name === "Breadcrumb" ? (
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
