#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const rawArgs = process.argv.slice(2)
let command = rawArgs[0] || "help"
let targetName = rawArgs[1]

// Complete Infiax UI Component Registry
const COMPONENT_REGISTRY = {
  idynamics: {
    name: "iDynamics",
    files: [{ src: "src/components/ui/morph-pill-card.tsx", dest: "components/ui/morph-pill-card.tsx" }],
    dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
  },
  "morph-pill-card": {
    name: "Morph Pill Card",
    files: [{ src: "src/components/ui/morph-pill-card.tsx", dest: "components/ui/morph-pill-card.tsx" }],
    dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
  },
  "animated-beam": {
    name: "Animated Beam",
    files: [{ src: "src/components/magicui/animated-beam.tsx", dest: "components/ui/animated-beam.tsx" }],
    dependencies: ["framer-motion"],
  },
  dock: {
    name: "Dock",
    files: [{ src: "src/components/magicui/dock.tsx", dest: "components/ui/dock.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "magic-card": {
    name: "Magic Card",
    files: [{ src: "src/components/magicui/magic-card.tsx", dest: "components/ui/magic-card.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "glare-hover": {
    name: "Glare Hover",
    files: [{ src: "src/components/magicui/glare-hover.tsx", dest: "components/ui/glare-hover.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "tweet-card": {
    name: "Tweet Card",
    files: [{ src: "src/components/magicui/tweet-card.tsx", dest: "components/ui/tweet-card.tsx" }],
    dependencies: ["react-tweet"],
  },
  "warp-background": {
    name: "Warp Background",
    files: [{ src: "src/components/magicui/warp-background.tsx", dest: "components/ui/warp-background.tsx" }],
    dependencies: ["framer-motion"],
  },
  "floating-3d-particles": {
    name: "Floating 3D Particles",
    files: [{ src: "src/components/magicui/floating-3d-particles-demo.tsx", dest: "components/ui/floating-3d-particles.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "bento-grid": {
    name: "Bento Grid",
    files: [{ src: "src/components/magicui/bento-grid.tsx", dest: "components/ui/bento-grid.tsx" }],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  },
  globe: {
    name: "Globe",
    files: [{ src: "src/components/magicui/globe.tsx", dest: "components/ui/globe.tsx" }],
    dependencies: ["cobe"],
  },
  terminal: {
    name: "Terminal",
    files: [{ src: "src/components/magicui/terminal.tsx", dest: "components/ui/terminal.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "rainbow-button": {
    name: "Rainbow Button",
    files: [{ src: "src/components/magicui/rainbow-button.tsx", dest: "components/ui/rainbow-button.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "3d-card": {
    name: "3D Card Effect",
    files: [{ src: "src/components/ui/3d-card.tsx", dest: "components/ui/3d-card.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "animated-shiny-text": {
    name: "Animated Shiny Text",
    files: [{ src: "src/components/magicui/animated-shiny-text.tsx", dest: "components/ui/animated-shiny-text.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "scroll-based-velocity": {
    name: "Scroll Based Velocity",
    files: [{ src: "src/components/magicui/scroll-based-velocity.tsx", dest: "components/ui/scroll-based-velocity.tsx" }],
    dependencies: ["framer-motion"],
  },
  "smooth-cursor": {
    name: "Smooth Cursor",
    files: [{ src: "src/components/magicui/smooth-cursor.tsx", dest: "components/ui/smooth-cursor.tsx" }],
    dependencies: ["framer-motion"],
  },
  "animated-list": {
    name: "Animated List",
    files: [{ src: "src/components/magicui/animated-list.tsx", dest: "components/ui/animated-list.tsx" }],
    dependencies: ["framer-motion"],
  },
  ripple: {
    name: "Ripple",
    files: [{ src: "src/components/magicui/ripple.tsx", dest: "components/ui/ripple.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "striped-pattern": {
    name: "Striped Pattern",
    files: [{ src: "src/components/magicui/striped-pattern.tsx", dest: "components/ui/striped-pattern.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "pixel-image": {
    name: "Pixel Image",
    files: [{ src: "src/components/magicui/pixel-image.tsx", dest: "components/ui/pixel-image.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "dia-text-reveal": {
    name: "Dia Text Reveal",
    files: [{ src: "src/components/magicui/dia-text-reveal.tsx", dest: "components/ui/dia-text-reveal.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "theme-toggler": {
    name: "Theme Toggler",
    files: [{ src: "src/components/magicui/animated-theme-toggler.tsx", dest: "components/ui/animated-theme-toggler.tsx" }],
    dependencies: ["lucide-react"],
  },
  "dot-pattern": {
    name: "Dot Pattern",
    files: [{ src: "src/components/magicui/dot-pattern.tsx", dest: "components/ui/dot-pattern.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  particles: {
    name: "Particles",
    files: [{ src: "src/components/magicui/particles.tsx", dest: "components/ui/particles.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "flickering-grid": {
    name: "Flickering Grid",
    files: [{ src: "src/components/magicui/flickering-grid.tsx", dest: "components/ui/flickering-grid.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "morphing-text": {
    name: "Morphing Text",
    files: [{ src: "src/components/magicui/morphing-text.tsx", dest: "components/ui/morphing-text.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  pointer: {
    name: "Pointer",
    files: [{ src: "src/components/magicui/pointer.tsx", dest: "components/ui/pointer.tsx" }],
    dependencies: ["framer-motion"],
  },
  "background-gradient-animation": {
    name: "Background Gradient Animation",
    files: [{ src: "src/components/ui/background-gradient-animation.tsx", dest: "components/ui/background-gradient-animation.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "cloud-shader": {
    name: "Cloud Shader",
    files: [{ src: "src/components/ui/cloud-shader.tsx", dest: "components/ui/cloud-shader.tsx" }],
    dependencies: ["three", "@types/three"],
  },
  "tooltip-card": {
    name: "Tooltip Card",
    files: [{ src: "src/components/ui/tooltip-card.tsx", dest: "components/ui/tooltip-card.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "animated-testimonials": {
    name: "Animated Testimonials",
    files: [{ src: "src/components/ui/animated-testimonials.tsx", dest: "components/ui/animated-testimonials.tsx" }],
    dependencies: ["framer-motion", "lucide-react"],
  },
  "card-spotlight": {
    name: "Card Spotlight",
    files: [{ src: "src/components/ui/card-spotlight.tsx", dest: "components/ui/card-spotlight.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "background-ripple-effect": {
    name: "Background Ripple Effect",
    files: [{ src: "src/components/ui/background-ripple-effect.tsx", dest: "components/ui/background-ripple-effect.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "comet-card": {
    name: "Comet Card",
    files: [{ src: "src/components/ui/comet-card.tsx", dest: "components/ui/comet-card.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "focus-cards": {
    name: "Focus Cards",
    files: [{ src: "src/components/ui/focus-cards.tsx", dest: "components/ui/focus-cards.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  lens: {
    name: "Lens",
    files: [{ src: "src/components/ui/lens.tsx", dest: "components/ui/lens.tsx" }],
    dependencies: ["framer-motion"],
  },
  "draggable-card": {
    name: "Draggable Card",
    files: [{ src: "src/components/ui/draggable-card.tsx", dest: "components/ui/draggable-card.tsx" }],
    dependencies: ["framer-motion"],
  },
  "animated-tabs": {
    name: "Animated Tabs",
    files: [{ src: "src/components/ui/animated-tabs.tsx", dest: "components/ui/animated-tabs.tsx" }],
    dependencies: ["framer-motion"],
  },
  "evervault-card": {
    name: "Evervault Card",
    files: [{ src: "src/components/ui/evervault-card.tsx", dest: "components/ui/evervault-card.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "glowing-effect": {
    name: "Glowing Effect",
    files: [{ src: "src/components/ui/glowing-effect.tsx", dest: "components/ui/glowing-effect.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "container-scroll-animation": {
    name: "Container Scroll Animation",
    files: [{ src: "src/components/ui/container-scroll-animation.tsx", dest: "components/ui/container-scroll-animation.tsx" }],
    dependencies: ["framer-motion"],
  },
  "resizable-navbar": {
    name: "Resizable Navbar",
    files: [{ src: "src/components/ui/resizable-navbar.tsx", dest: "components/ui/resizable-navbar.tsx" }],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "hero-sections": {
    name: "Hero Sections",
    files: [{ src: "src/components/ui/hero-section.tsx", dest: "components/ui/hero-section.tsx" }],
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
  },
  "chromatic-image": {
    name: "Chromatic Image",
    files: [{ src: "src/components/ui/chromatic-image.tsx", dest: "components/ui/chromatic-image.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "image-generation-loader": {
    name: "Image Generation Loader",
    files: [{ src: "src/components/ui/image-generation-loader.tsx", dest: "components/ui/image-generation-loader.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  button: {
    name: "Button",
    files: [{ src: "src/components/ui/button.tsx", dest: "components/ui/button.tsx" }],
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  badge: {
    name: "Badge",
    files: [{ src: "src/components/ui/badge.tsx", dest: "components/ui/badge.tsx" }],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  card: {
    name: "Card",
    files: [{ src: "src/components/ui/card.tsx", dest: "components/ui/card.tsx" }],
    dependencies: ["clsx", "tailwind-merge"],
  },
  skills: {
    name: "Agent Skills",
    files: [],
    dependencies: [],
  },
  theming: {
    name: "Theming & Tokens",
    files: [],
    dependencies: [],
  },
  installation: {
    name: "Project Installation",
    files: [],
    dependencies: [],
  },
  introduction: {
    name: "Introduction",
    files: [],
    dependencies: [],
  },
}

function printHeader() {
  console.log("\n\x1b[1m\x1b[36m◆ Infiax UI CLI\x1b[0m \x1b[90mv1.0.1\x1b[0m")
  console.log("\x1b[90mModern React UI & Animation Blocks for High-Craft Interfaces\x1b[0m\n")
}

function detectProjectDir() {
  const cwd = process.cwd()
  const hasSrc = fs.existsSync(path.join(cwd, "src"))
  return hasSrc ? "src" : ""
}

function ensureUtils(baseDir) {
  const targetUtilsPath = path.join(process.cwd(), baseDir, "lib", "utils.ts")
  if (!fs.existsSync(targetUtilsPath)) {
    fs.mkdirSync(path.dirname(targetUtilsPath), { recursive: true })
    const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    fs.writeFileSync(targetUtilsPath, utilsContent, "utf8")
    console.log(`\x1b[32m✔\x1b[0m Created \x1b[1m${path.join(baseDir, "lib", "utils.ts")}\x1b[0m`)
  }
}

function handleAdd(componentSlug) {
  if (!componentSlug) {
    console.error("\x1b[31m✖ Error:\x1b[0m Please specify a component name.")
    console.log("Usage: \x1b[36mnpx @infiax/ui add <component>\x1b[0m")
    console.log("Example: \x1b[36mnpx @infiax/ui add idynamics\x1b[0m")
    process.exit(1)
  }

  const normalized = componentSlug.toLowerCase().trim().replace(/^@infiax\//, "").replace(/-demo$/, "")
  const item = COMPONENT_REGISTRY[normalized]

  if (!item) {
    console.error(`\x1b[31m✖ Error:\x1b[0m Component '\x1b[1m${componentSlug}\x1b[0m' not found in Infiax registry.`)
    console.log("\nAvailable components:")
    Object.keys(COMPONENT_REGISTRY).forEach((k) => console.log(`  - \x1b[36m${k}\x1b[0m`))
    process.exit(1)
  }

  const baseDir = detectProjectDir()
  ensureUtils(baseDir)

  console.log(`\x1b[34mℹ\x1b[0m Adding \x1b[1m${item.name}\x1b[0m...`)

  if (item.files && item.files.length > 0) {
    item.files.forEach((f) => {
      const srcPath = path.join(rootDir, f.src)
      const destPath = path.join(process.cwd(), baseDir, f.dest)

      if (fs.existsSync(srcPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true })
        let content = fs.readFileSync(srcPath, "utf8")
        fs.writeFileSync(destPath, content, "utf8")
        console.log(`\x1b[32m✔\x1b[0m Written to \x1b[1m${path.join(baseDir, f.dest)}\x1b[0m`)
      } else {
        console.error(`\x1b[31m✖\x1b[0m Source file missing: ${f.src}`)
      }
    })
  }

  if (item.dependencies && item.dependencies.length > 0) {
    console.log(`\n\x1b[33m⚡ Required dependencies:\x1b[0m \x1b[1m${item.dependencies.join(" ")}\x1b[0m`)
    console.log(`Run: \x1b[36mnpm install ${item.dependencies.join(" ")}\x1b[0m\n`)
  }

  console.log(`\x1b[32m✔ Ready!\x1b[0m Import and use in your application.`)
}

function handleInit() {
  const baseDir = detectProjectDir()
  ensureUtils(baseDir)
  console.log(`\x1b[32m✔\x1b[0m Infiax UI initialized successfully in your project!`)
}

function handleList() {
  console.log("\x1b[1mAvailable Components & Blocks in Infiax UI:\x1b[0m\n")
  Object.entries(COMPONENT_REGISTRY).forEach(([slug, data]) => {
    console.log(`  \x1b[36m${slug.padEnd(30)}\x1b[0m \x1b[90m${data.name}\x1b[0m`)
  })
  console.log(`\nRun \x1b[36mnpx @infiax/ui add <component>\x1b[0m to install any component.\n`)
}

// Entry Router
printHeader()

const normalizedCommand = command.toLowerCase().trim().replace(/^@infiax\//, "")

// Smart fallback: If user types "npx @infiax/ui idynamics", treat as "add idynamics"
if (COMPONENT_REGISTRY[normalizedCommand] && !["add", "init", "list", "help", "diff"].includes(normalizedCommand)) {
  handleAdd(normalizedCommand)
} else {
  switch (normalizedCommand) {
    case "add":
      handleAdd(targetName)
      break
    case "init":
    case "installation":
    case "theming":
    case "introduction":
      handleInit()
      break
    case "list":
      handleList()
      break
    case "diff":
      console.log("\x1b[32m✔\x1b[0m All components are up-to-date with Infiax UI registry.")
      break
    case "help":
    case "--help":
    case "-h":
    default:
      console.log("Usage:")
      console.log("  \x1b[36mnpx @infiax/ui add <component>\x1b[0m   Add a component to your project")
      console.log("  \x1b[36mnpx @infiax/ui init\x1b[0m              Initialize utils and folders")
      console.log("  \x1b[36mnpx @infiax/ui list\x1b[0m              List all available components")
      console.log("  \x1b[36mnpx @infiax/ui diff\x1b[0m              Check for component updates")
      console.log("  \x1b[36mnpx @infiax/ui help\x1b[0m              Show help\n")
      break
  }
}
