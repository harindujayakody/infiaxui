# Installation & Setup Guide — Infiax UI

This guide walks you through setting up the Infiax UI documentation and component library locally, as well as integrating Infiax UI components into an existing React or Next.js project.

---

## 1. Prerequisites

Before getting started, make sure you have:
- **Node.js**: `18.17.0` or higher
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`
- **Git** installed on your system

---

## 2. Quick Setup: Running Infiax UI Locally

If you want to run the Infiax UI documentation, component catalog, and live changelog locally:

### Step 1: Clone the repository

```bash
git clone https://github.com/harindujayakody/infiaxui.git
cd infiaxui
```

### Step 2: Install dependencies

```bash
npm install
# or
pnpm install
# or
bun install
```

### Step 3: Run the development server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to preview the components, interact with the timeline menu, toggle light/dark modes, and explore the changelog.

### Step 4: Build for production

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or any static host.

---

## 3. Integrating Components into an Existing Project

You can easily copy and use Infiax UI components in your own React, Next.js, Remix, or Vite project.

### Step 1: Install core utility dependencies

```bash
npm install clsx tailwind-merge lucide-react framer-motion
```

### Step 2: Configure Global CSS Tokens

Add the Infiax UI Slate & Black tokens to your `src/index.css` (or `app/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-page: #FFFFFF;
  --bg-card: #F9F9F9;
  --bg-subtle: #F0F0F0;
  --border-subtle: #E5E5E5;
  --border-active: #D4D4D4;
  --text-main: #0A0A0A;
  --text-muted: #737373;
  --accent: #4F39F6;

  --font-geist: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.dark {
  --bg-page: #0A0A0A;
  --bg-card: #161616;
  --bg-subtle: #1F1F1F;
  --border-subtle: #262626;
  --border-active: #404040;
  --text-main: #EDEDED;
  --text-muted: #8C8C8C;
  --accent: #4F39F6;
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
  font-family: var(--font-geist);
  margin: 0;
  padding: 0;
}
```

### Step 3: Set up the `cn` utility function

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

*(Note: In September 2026 releases, you can also use `export { cn } from "cn"` if using the standalone `cn` package).*

### Step 4: Configure `tailwind.config.js`

Ensure your Tailwind configuration supports dark mode via class and maps your paths:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
      colors: {
        background: "var(--bg-page)",
        card: "var(--bg-card)",
        border: "var(--border-subtle)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
}
```

### Step 5: Add ThemeProvider

Create `src/lib/theme-context.tsx` to handle light/dark mode without flicker:

```tsx
import React, { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDark: boolean
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleDark: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

---

## 4. Using Components

Now you can import and use any Infiax UI component in your templates:

```tsx
import { Button } from "@/components/shadcn/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"

export default function MyDashboard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Welcome to Infiax UI</CardTitle>
          <Badge variant="outline">v1.1.0</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="type-body text-[var(--text-muted)]">
          Ultra-minimal React UI components built with Obsidian surfaces and Slate accents.
        </p>
        <Button variant="default">Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

---

## 5. CLI & Migration Commands

Infiax UI is compatible with standard Shadcn CLI workflows:

```bash
# Add components directly via CLI
npx shadcn@latest add button card badge alert

# Migrate to standalone cn package
npx shadcn@latest migrate cn

# Add the new Questionnaire multi-step component
npx shadcn@latest add questionnaire

# Use Private GitHub Registries
gh auth login
npx shadcn@latest add <owner>/<repo>/<component>
```

---

## 6. Troubleshooting

- **Path Aliases**: If `@/components` does not resolve, verify that `tsconfig.json` contains:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```
  and `vite.config.ts` includes `resolve: { alias: { "@": path.resolve(__dirname, "./src") } }`.
- **Theme Not Applying**: Ensure your root `<html>` or `<body>` element receives the `dark` class from `ThemeProvider`.
