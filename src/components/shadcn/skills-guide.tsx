import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Bot,
  Sparkles,
  Terminal,
  Cpu,
  Workflow,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SkillsGuide() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  const handleCopy = (cmd: string, key: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedCmd(key)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  const supportedAgents = [
    { name: "Antigravity", badge: "Native", desc: "Built-in agentic tool calls & skills integration" },
    { name: "Claude Code", badge: "CLI Skill", desc: "Direct execution via claude skills system" },
    { name: "Cursor", badge: "Rules & MCP", desc: "Contextual rule prompts and indexing" },
    { name: "GitHub Copilot", badge: "Workspace", desc: "Visual Studio Code agent instructions" },
    { name: "Windsurf", badge: "Cascade", desc: "Flow integration with memory context" },
  ]

  const capabilities = [
    {
      title: "Context-Aware Component Scaffolding",
      desc: "Reads your components.json to detect your icon library (Lucide/Radix), Tailwind configuration, and import aliases before writing code.",
    },
    {
      title: "Intelligent Form Synthesis",
      desc: "Generates type-safe forms combining React Hook Form, Zod schema validation, and Field composables.",
    },
    {
      title: "Palette & OKLCH Theme Computation",
      desc: "Calculates mathematically harmonious dark/light color ramps in the perceptual OKLCH color space.",
    },
    {
      title: "Custom Registry Authoring & Linting",
      desc: "Validates your custom component registry JSON against official JSON schemas for private design systems.",
    },
  ]

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10 flex items-center gap-1.5">
            <Zap className="size-3" />
            AI Assistant Skills
          </Badge>
          <span className="type-caption text-[var(--text-muted)]">Official Specification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-main)]">
          Supercharge your AI coding assistant with shadcn skills.
        </h1>
        <p className="type-body text-[var(--text-muted)] leading-relaxed max-w-3xl">
          Equip your AI assistants (Antigravity, Claude Code, Cursor, Copilot) with deep knowledge of component APIs, CLI commands, theming rules, and headless primitives.
        </p>
      </div>

      {/* Installation Section */}
      <section id="install-skill" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>
        <p className="type-body text-[var(--text-muted)]">
          Install the official skill package directly into your workspace:
        </p>

        <CodeBlock
          code="npx @infiax/ui add skills"
          language="bash"
          fileName="Terminal"
        />

        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-xs space-y-2">
          <div className="font-semibold text-[var(--text-main)] flex items-center gap-2">
            <Sparkles className="size-4 text-indigo-500" />
            <span>Automatic Agent Discovery</span>
          </div>
          <p className="text-[var(--text-muted)] leading-relaxed">
            When installed, your AI agent automatically detects installed components, available presets, CSS variable palettes, and CLI commands without hallucinating outdated APIs.
          </p>
        </div>
      </section>

      {/* Supported Environments */}
      <section id="supported-agents" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Supported Environments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {supportedAgents.map((agent) => (
            <div
              key={agent.name}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[var(--text-main)]">{agent.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  {agent.badge}
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Core Capabilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <h3 className="font-semibold text-xs text-[var(--text-main)]">{cap.title}</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-6">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Manual Agent Rules Snippet */}
      <section id="manual-rules" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Manual Configuration (.cursorrules / CLAUDE.md)</h2>
        <p className="type-body text-[var(--text-muted)]">
          If you prefer manual setup, add this instruction prompt to your agent configuration file:
        </p>

        <CodeBlock
          code={`# shadcn/ui Best Practices
- Always use CSS variables for colors (bg-background, text-foreground, bg-primary).
- Check components.json for path aliases and tailwind config before writing code.
- Prefer Base UI primitives and composable patterns over monolithic components.
- Wrap form controls with Field, FieldLabel, FieldDescription, and FieldError.
- Use framer-motion or CSS transitions for symmetric collapse/expand animations.`}
          language="markdown"
          fileName=".cursorrules"
        />
      </section>
    </div>
  )
}
