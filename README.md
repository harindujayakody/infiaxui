# Infiax UI (`@infiax/ui`)

<div align="center">
  <p><strong>Precision Engineering with Zero AI Slop. A production-ready React component library, CLI tool, and interactive block system built with Tailwind CSS, Framer Motion, and Radix UI primitives.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/@infiax/ui"><img src="https://img.shields.io/npm/v/@infiax/ui.svg?style=flat-square&color=black" alt="npm version" /></a>
    <a href="https://github.com/harindujayakody/infiaxui"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat-square&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square&logo=typescript" alt="TypeScript" />
  </p>
</div>

---

## ⚡ Quick Start with CLI

Install any component directly into your project using the Infiax CLI:

```bash
# Add the Apple-inspired Dynamic Island
npx @infiax/ui add idynamics

# Add navigation dock, animated beam, or interactive cards
npx @infiax/ui add dock
npx @infiax/ui add animated-beam
npx @infiax/ui add magic-card
npx @infiax/ui add button

# Initialize folders and utils in your project
npx @infiax/ui init

# List all available components and blocks
npx @infiax/ui list
```

Or install the package directly:

```bash
npm install @infiax/ui
```

---

## 🌟 Highlights

- **Native CLI**: Add production-ready TypeScript components and styles into your project with `npx @infiax/ui add <component>`.
- **iDynamics**: An Apple Dynamic Island-style morphing surface that physically stretches and transforms between compact wings and expanded interactive cards with authentic spring physics.
- **Pure Slate & Black Aesthetic**: Pure `#0A0A0A` page background, `#121214` card surfaces, `#262626` hairline borders, and `#EDEDED` high-contrast typography.
- **Interactive Block Catalog**: 40+ responsive building blocks including Bento Grids, 3D particles, cloud shaders, interactive terminals, and floating cards.
- **Flawless Dark & Light Mode**: Seamless dynamic theme switching with persistent CSS variables and zero flash on reload.
- **Mac Style Window Header & Code Blocks**: Desktop-class macOS window titlebars with interactive red/yellow/green traffic lights, fullscreen toggle, and syntax-highlighted code.
- **Command Palette (`⌘K`)**: Instant modal search across all components and CLI commands.

---

## 📦 Component & Block Catalog

| Component | Slug | Description |
| :--- | :--- | :--- |
| **iDynamics** | `idynamics` | Apple Dynamic Island morphing surface with spring physics & interactive modes |
| **Animated Beam** | `animated-beam` | Animated light ray traversing nodes for integration diagrams |
| **Dock** | `dock` | macOS-inspired magnification dock built with Framer Motion |
| **Magic Card** | `magic-card` | Spotlight card with cursor-following radial border illumination |
| **Glare Hover** | `glare-hover` | Diagonal CSS-variable light glare on hover without global keyframes |
| **Bento Grid** | `bento-grid` | Modular Bento layout system for feature showcases |
| **Globe** | `globe` | Interactive, performant WebGL globe powered by Cobe |
| **Terminal** | `terminal` | macOS terminal window with animated typing sequences |
| **3D Card Effect** | `3d-card` | Perspective tilt card with depth-aware multi-layer parallax |
| **Cloud Shader** | `cloud-shader` | Soft procedural volumetric cloud shader with customizable drift |
| **Glowing Effect** | `glowing-effect` | Proximity-tracking glowing borders with zero layout shift |
| **Button** | `button` | Multi-variant button system (Default, Outline, Ghost, Secondary, Destructive) |
| **Card** | `card` | Obsidian elevated surfaces with header, title, description, and footer slots |

---

## 🚀 Running the Documentation Site Locally

```bash
# 1. Clone the repository
git clone https://github.com/harindujayakody/infiaxui.git
cd infiaxui

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🎨 Design Tokens

Infiax UI enforces a strict color and typography token system:

```css
:root {
  --bg-page: #FFFFFF;
  --bg-card: #FAFAFA;
  --bg-subtle: #F4F4F5;
  --border-subtle: #E4E4E7;
  --text-main: #09090B;
  --text-muted: #71717A;
}

.dark {
  --bg-page: #0A0A0A;
  --bg-card: #161616;
  --bg-subtle: #1F1F1F;
  --border-subtle: #262626;
  --text-main: #EDEDED;
  --text-muted: #8C8C8C;
}
```

---

## 📄 License & Acknowledgements

Infiax UI is licensed under the [MIT License](LICENSE).

This library incorporates and builds upon open-source primitives and concepts from:
- [shadcn/ui](https://ui.shadcn.com) (MIT License, Copyright © 2023 shadcn)
- [Aceternity UI](https://ui.aceternity.com) open-source components by Manu Arora (MIT License, Copyright © 2024 Manu Arora)
- [Magic UI](https://magicui.design) by Dillion Verma (MIT License, Copyright © 2024 dillionverma)
- [Radix UI Primitives](https://www.radix-ui.com) (MIT License, Copyright © 2022 WorkOS)

Full license texts and author credits are preserved in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
