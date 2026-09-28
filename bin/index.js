#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const args = process.argv.slice(2)
const command = args[0]
const targetName = args[1]

// Component Registry Mapping
const COMPONENT_REGISTRY = {
  idynamics: {
    name: "iDynamics",
    files: [
      {
        src: "src/components/ui/morph-pill-card.tsx",
        dest: "components/ui/morph-pill-card.tsx",
      },
    ],
    dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
  },
  "morph-pill-card": {
    name: "Morph Pill Card",
    files: [
      {
        src: "src/components/ui/morph-pill-card.tsx",
        dest: "components/ui/morph-pill-card.tsx",
      },
    ],
    dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
  },
  "animated-beam": {
    name: "Animated Beam",
    files: [
      {
        src: "src/components/magicui/animated-beam.tsx",
        dest: "components/ui/animated-beam.tsx",
      },
    ],
    dependencies: ["framer-motion"],
  },
  "dock": {
    name: "Dock",
    files: [
      {
        src: "src/components/magicui/dock.tsx",
        dest: "components/ui/dock.tsx",
      },
    ],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "magic-card": {
    name: "Magic Card",
    files: [
      {
        src: "src/components/magicui/magic-card.tsx",
        dest: "components/ui/magic-card.tsx",
      },
    ],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "glare-hover": {
    name: "Glare Hover",
    files: [
      {
        src: "src/components/magicui/glare-hover.tsx",
        dest: "components/ui/glare-hover.tsx",
      },
    ],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "tweet-card": {
    name: "Tweet Card",
    files: [
      {
        src: "src/components/magicui/tweet-card.tsx",
        dest: "components/ui/tweet-card.tsx",
      },
    ],
    dependencies: ["react-tweet"],
  },
  "warp-background": {
    name: "Warp Background",
    files: [
      {
        src: "src/components/magicui/warp-background.tsx",
        dest: "components/ui/warp-background.tsx",
      },
    ],
    dependencies: ["framer-motion"],
  },
  "bento-grid": {
    name: "Bento Grid",
    files: [
      {
        src: "src/components/magicui/bento-grid.tsx",
        dest: "components/ui/bento-grid.tsx",
      },
    ],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  },
  "globe": {
    name: "Globe",
    files: [
      {
        src: "src/components/magicui/globe.tsx",
        dest: "components/ui/globe.tsx",
      },
    ],
    dependencies: ["cobe"],
  },
  "terminal": {
    name: "Terminal",
    files: [
      {
        src: "src/components/magicui/terminal.tsx",
        dest: "components/ui/terminal.tsx",
      },
    ],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "rainbow-button": {
    name: "Rainbow Button",
    files: [
      {
        src: "src/components/magicui/rainbow-button.tsx",
        dest: "components/ui/rainbow-button.tsx",
      },
    ],
    dependencies: ["clsx", "tailwind-merge"],
  },
  "3d-card": {
    name: "3D Card Effect",
    files: [
      {
        src: "src/components/ui/3d-card.tsx",
        dest: "components/ui/3d-card.tsx",
      },
    ],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "cloud-shader": {
    name: "Cloud Shader",
    files: [
      {
        src: "src/components/ui/cloud-shader.tsx",
        dest: "components/ui/cloud-shader.tsx",
      },
    ],
    dependencies: ["three", "@types/three"],
  },
  "glowing-effect": {
    name: "Glowing Effect",
    files: [
      {
        src: "src/components/ui/glowing-effect.tsx",
        dest: "components/ui/glowing-effect.tsx",
      },
    ],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  "container-scroll-animation": {
    name: "Container Scroll Animation",
    files: [
      {
        src: "src/components/ui/container-scroll-animation.tsx",
        dest: "components/ui/container-scroll-animation.tsx",
      },
    ],
    dependencies: ["framer-motion"],
  },
  "button": {
    name: "Button",
    files: [
      {
        src: "src/components/ui/button.tsx",
        dest: "components/ui/button.tsx",
      },
    ],
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
  },
}

function printHeader() {
  console.log("\n\x1b[1m\x1b[36m◆ Infiax UI CLI\x1b[0m \x1b[90mv1.0.0\x1b[0m")
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

  const normalized = componentSlug.toLowerCase().trim().replace(/^@infiax\//, "")
  const item = COMPONENT_REGISTRY[normalized]

  if (!item) {
    console.error(`\x1b[31m✖ Error:\x1b[0m Component '\x1b[1m${componentSlug}\x1b[0m' not found in Infiax registry.`)
    console.log("\nAvailable components:")
    Object.keys(COMPONENT_REGISTRY).forEach((k) => console.log(`  - \x1b[36m${k}\x1b[0m`))
    process.exit(1)
  }

  const baseDir = detectProjectDir()
  ensureUtils(baseDir)

  console.log(`\x1b[34mℹ\x1b[0m Installing \x1b[1m${item.name}\x1b[0m...`)

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
    console.log(`  \x1b[36m${slug.padEnd(28)}\x1b[0m \x1b[90m${data.name}\x1b[0m`)
  })
  console.log(`\nRun \x1b[36mnpx @infiax/ui add <component>\x1b[0m to install any component.\n`)
}

// Entry Router
printHeader()

switch (command) {
  case "add":
    handleAdd(targetName)
    break
  case "init":
    handleInit()
    break
  case "list":
    handleList()
    break
  case "help":
  case "--help":
  case "-h":
  default:
    console.log("Usage:")
    console.log("  \x1b[36mnpx @infiax/ui add <component>\x1b[0m   Add a component to your project")
    console.log("  \x1b[36mnpx @infiax/ui init\x1b[0m              Initialize utils and folders")
    console.log("  \x1b[36mnpx @infiax/ui list\x1b[0m              List all available components")
    console.log("  \x1b[36mnpx @infiax/ui help\x1b[0m              Show help\n")
    break
}
