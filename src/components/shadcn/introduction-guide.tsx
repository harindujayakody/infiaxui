import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Palette,
  Bot,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function IntroductionGuide() {
  const principles = [
    {
      icon: <Code2 className="size-5 text-indigo-500" />,
      title: "Open Code",
      description:
        "Not an npm dependency that locks you in. The code lives directly in your codebase so you have 100% control over design and functionality.",
    },
    {
      icon: <Layers className="size-5 text-emerald-500" />,
      title: "Composition First",
      description:
        "Built on top of headless primitives (Base UI & Radix UI) with Tailwind CSS styling, enabling composable, accessible patterns.",
    },
    {
      icon: <Palette className="size-5 text-rose-500" />,
      title: "Beautiful Defaults",
      description:
        "Engineered with precise typography scales, OKLCH semantic color palettes, subtle dark mode gradients, and micro-interactions.",
    },
    {
      icon: <Bot className="size-5 text-amber-500" />,
      title: "AI-Ready Architecture",
      description:
        "Machine-readable registry formats, strict TypeScript schemas, and native AI assistant skills for rapid scaffolding.",
    },
  ]

  const faqs = [
    {
      question: "Why not publish this as an npm package?",
      answer:
        "The main reason is that component libraries often suffer from style customization constraints. By placing the source code directly into your project repository, you can customize any aspect of any component whenever your design requirements evolve, without fighting complex CSS overrides or waiting for upstream library maintainers.",
    },
    {
      question: "Which frameworks and bundlers are supported?",
      answer:
        "Any React 18 or React 19 framework is fully supported, including Next.js (App Router & Pages Router), Vite, TanStack Start, Remix / React Router v7, Laravel Inertia React, Astro, Gatsby, and custom Webpack / Turbopack setups.",
    },
    {
      question: "Can I use this in an existing project?",
      answer:
        "Yes. Run 'npx @infiax/ui init' inside your existing project. It will detect your Tailwind CSS configuration and tsconfig paths, generate components.json, and install the utility helpers without disturbing existing code.",
    },
    {
      question: "How do I get updates when components improve?",
      answer:
        "You can run 'npx @infiax/ui diff' to inspect changes between your local component and the latest registry release, or use 'npx @infiax/ui add <component> --overwrite' to pull the newest version.",
    },
  ]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Hero Welcome Banner */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-indigo-500 border-indigo-500/20 bg-indigo-500/10">
            Design Catalog
          </Badge>
          <span className="type-caption text-[var(--text-muted)]">v2.0 Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-main)]">
          Re-usable components built with Base UI and Tailwind CSS.
        </h1>
        <p className="type-body text-[var(--text-muted)] leading-relaxed max-w-3xl">
          This is <strong>NOT</strong> a component library. It is a collection of re-usable components that you can copy and paste into your apps. Accessible, customizable, and open source.
        </p>
      </div>

      {/* Philosophy & Core Principles */}
      <section id="principles" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Core Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-[var(--text-main)]">{item.title}</h3>
              </div>
              <p className="type-body text-xs text-[var(--text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section id="quick-start" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Quick Start</h2>
        <p className="type-body text-[var(--text-muted)]">
          Initialize your project in seconds using the CLI command:
        </p>

        <CodeBlock
          code="npx @infiax/ui init"
          language="bash"
          fileName="Terminal"
        />

        <p className="type-body text-[var(--text-muted)]">
          Then add any component you need:
        </p>

        <CodeBlock
          code="npx @infiax/ui add button dialog dropdown-menu"
          language="bash"
          fileName="Terminal"
        />
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Frequently Asked Questions</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[var(--border-subtle)] last:border-b-0">
                <AccordionTrigger className="type-link text-left font-medium text-[var(--text-main)] hover:text-indigo-500 py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="type-body text-xs text-[var(--text-muted)] leading-relaxed pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}

