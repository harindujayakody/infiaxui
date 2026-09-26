# Infiax UI

<div align="center">
  <p><strong>Precision Engineering with Zero AI Slop. An open-source, ultra-minimal, high-precision React Component Library and documentation platform built with Shadcn UI, Tailwind CSS, Geist Sans, and Radix Primitives.</strong></p>

  <p>
    <a href="https://github.com/harindujayakody/infiaxui"><img src="https://img.shields.io/badge/version-v1.1.0-blue.svg?style=flat-square" alt="Version" /></a>
    <a href="https://github.com/harindujayakody/infiaxui/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat-square&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square&logo=typescript" alt="TypeScript" />
  </p>
</div>

---

## 🌟 Highlights

- **Pure Slate & Black Aesthetic**: Pure `#0A0A0A` page background, `#161616` cards & containers, `#262626` hairline borders, `#EDEDED` high-contrast typography, and `#8C8C8C` muted accents.
- **Flawless Dark & Light Mode**: Seamless dynamic theme switching with persistent CSS variables and zero flash on reload.
- **Geist Sans Typography**: Official typography styles extracted via Peek with exact scales (`type-h1`, `type-h2`, `type-heading`, `type-body`, `type-caption`).
- **57+ Canonical Shadcn Components**: Breadcrumb, Button, Card, Badge, Alert, Checkbox, Switch, Input, Skeleton, Separator, Avatar, Questionnaire, and more.
- **Up-to-Date Changelog**: Canonical release timeline tracking **September 2026** (`cn` package), **August 2026** (Private GitHub Registries, Human in the Loop, Questionnaire), and **July 2026** (Dynamic Search).
- **Interactive Questionnaire Component**: Built-in multi-step question flow primitive for intake forms, AI clarification, and onboarding.
- **Mac Style Window Header & Code Blocks**: Desktop-class macOS window titlebar with interactive red/yellow/green traffic lights, fullscreen toggle, dynamic titles, and Mac-themed code editors with TS badges and line expanders.
- **Interactive Action Bar**: Split-pill button (`Copy Page | ⌵`) with copy options and previous/next squircle navigation buttons.
- **Precision ScrollSpy Table of Contents**: Dynamic right sidebar tracking headers in real time with smooth scrolling and sticky header offsets.
- **Command Palette (`⌘K`)**: Instant modal search across all components and CLI commands.

---

## 📦 Component Catalog

| Component | Status | Description |
| :--- | :--- | :--- |
| **Breadcrumb** | ✅ Stable | Accessible hierarchical navigation with custom separators, ellipsis dropdowns, and RTL support |
| **Button** | ✅ Stable | Multi-variant button system (Default, Outline, Ghost, Secondary, Destructive, Icon, Squircle) |
| **Card** | ✅ Stable | Obsidian elevated surfaces with header, title, description, content, and footer slots |
| **Magic Card** | ✅ Stable | Radial gradient cursor-following border glow effects with slate background |
| **Badge** | ✅ Stable | Pill and rounded badges with Default, Secondary, Outline, and Destructive variants |
| **Alert** | ✅ Stable | Notification callouts with icons, titles, and descriptions |
| **Input** | ✅ Stable | High-precision text fields with focus rings, disabled states, and validation styles |
| **Checkbox** | ✅ Stable | Custom-styled accessible checkbox with check indicator animations |
| **Switch** | ✅ Stable | Accessible toggle switch with smooth thumb translations |
| **Skeleton** | ✅ Stable | Pulsing loading placeholders with customizable shapes and sizes |
| **Avatar** | ✅ Stable | Profile image with graceful fallback initials |
| **Separator** | ✅ Stable | Clean 1px divider for horizontal and vertical layouts |
| **Questionnaire** | ✅ New (v1.1.0) | Multi-step interactive question flow for AI prompts and forms |

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/harindujayakody/infiaxui.git
cd infiaxui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the catalog, components, and live interactive changelog.

### 4. Build for production

```bash
npm run build
```

---

## 🎨 Design Tokens

Infiax UI enforces a strict color and typography token system:

```css
:root {
  --bg-page: #FFFFFF;
  --bg-card: #F9F9F9;
  --bg-subtle: #F0F0F0;
  --border-subtle: #E5E5E5;
  --border-active: #D4D4D4;
  --text-main: #0A0A0A;
  --text-muted: #737373;
}

.dark {
  --bg-page: #0A0A0A;
  --bg-card: #161616;
  --bg-subtle: #1F1F1F;
  --border-subtle: #262626;
  --border-active: #404040;
  --text-main: #EDEDED;
  --text-muted: #8C8C8C;
}
```

For full specifications and typography scales, refer to [DESIGN.md](file:///d:/Demo/All%20in%20One/DESIGN.md).

---

## 📖 Documentation

- [Design System Guide (DESIGN.md)](file:///d:/Demo/All%20in%20One/DESIGN.md)
- [Installation & Setup Guide (Installation.md)](file:///d:/Demo/All%20in%20One/Installation.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
