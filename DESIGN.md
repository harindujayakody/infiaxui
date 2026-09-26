# Infiax UI — Design System Specification

## 1. Design Philosophy: Minimal but Rich

Infiax UI is designed around surgical precision, obsidian depth, and architectural restraint. Every interface element is functional, tactile, and free of generic "AI slop" or unnecessary visual noise.

- **Restraint over Decoration**: Depth is achieved through hairline borders (`1px`) and precise background contrast, not heavy dropshadows or blurry rainbow halos.
- **Strict Color Discipline**: Surfaces are strictly anchored to `#0A0A0A` and `#161616`.
- **Tactile Feedback**: Every interactive surface reacts predictably with Slate hover states (`#1F1F1F`), micro-translations, and subtle active borders.
- **Geist Sans Precision**: Typography uses calibrated line-heights and negative letter-spacing for clean, dense information display.

---

## 2. Color System & Design Tokens

### 2.1 Color Palette

| Token | Dark Value | Light Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--bg-page` | `#0A0A0A` | `#FFFFFF` | Primary viewport and background canvas |
| `--bg-card` | `#161616` | `#F9F9F9` | Elevated card surfaces and containers |
| `--bg-subtle` | `#1F1F1F` | `#F0F0F0` | Hover states, tab backgrounds, secondary controls |
| `--border-subtle` | `#262626` | `#E5E5E5` | Structural hairline dividers, borders, card outlines |
| `--border-active` | `#404040` | `#D4D4D4` | Focused inputs, hovered cards, active borders |
| `--text-main` | `#EDEDED` | `#0A0A0A` | Headings, primary text, prominent labels |
| `--text-muted` | `#8C8C8C` | `#737373` | Secondary text, captions, subtitles, meta info |
| `--accent-indigo` | `#4F39F6` | `#4F39F6` | Electric Indigo accent (brand & magic cards) |
| `--accent-blue` | `#3B82F6` | `#2563EB` | Active indicator dots, status chips |

### 2.2 Hover States: Strictly Slate

All hovers must use slate and subtle surface transitions:
```css
/* Card & Button Hovers */
hover:bg-[var(--bg-subtle)]        /* #1F1F1F in dark mode */
hover:border-[var(--border-active)]  /* #404040 in dark mode */
hover:text-[var(--text-main)]       /* #EDEDED in dark mode */
```

---

## 3. Typography Scale (Geist Sans)

Infiax UI incorporates exact tokens extracted from canonical Shadcn UI:

```css
:root {
  --font-geist: Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --text-12: 12px;
  --text-14: 14px;
  --text-15: 15px;
  --text-16: 16px;
  --text-18: 18px;
  --text-30: 30px;
  --tracking-neg-0-75: -0.75px;
}
```

### Semantic Classes

- **`.type-h1`**: 30px / 600 weight / line-height 1.20 / letter-spacing `-0.75px` (Page Titles)
- **`.type-h2`**: 18px / 600 weight / line-height 1.46 (Section Titles)
- **`.type-heading`**: 16px / 600 weight / line-height 1.25 (Subheadings, Card Titles)
- **`.type-body`**: 14px / 400 weight / line-height 1.43 / letter-spacing `-0.15px` (Standard Prose)
- **`.type-body-strong`**: 14px / 600 weight / line-height 1.43 (Bold Body Text)
- **`.type-small-body`**: 14px / 400 weight / line-height 1.43 (Navigation & TOC links)
- **`.type-link-14`**: 14px / 500 weight / line-height 1.43 (Interactive Links)
- **`.type-caption`**: 12px / 400 & 500 weight / line-height 1.33 (Badges, Timestamps, Labels)
- **`.type-link-12`**: 12px / 500 weight / line-height 1.33 (Button Labels, Action Pills)

---

## 4. Component Rules

### 4.1 Buttons
- **Default (Primary)**: Background `#EDEDED`, Text `#0A0A0A`, Rounded `8px` (`rounded-lg`), subtle active translate `active:scale-[0.98]`.
- **Outline**: Background transparent or `var(--bg-card)`, Border `1px solid var(--border-subtle)`, Hover `var(--bg-subtle)`.
- **Ghost**: Background transparent, Hover `var(--bg-subtle)`, Text `var(--text-muted)` to `var(--text-main)`.
- **Squircle Icons**: `size-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]` with centered Lucide icons.

### 4.2 Cards
- **Obsidian Card**: Rounded `16px` (`rounded-2xl`), Background `var(--bg-card)` (`#161616`), Border `1px solid var(--border-subtle)` (`#262626`).
- **Magic Card**: Features radial mouse-tracking border highlights (`#4F39F6` / electric indigo) with slate elevation.

### 4.3 Action Toolbar (Split-Pill)
- Unified pill container (`rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]`).
- Main action: `Copy Page` with clipboard icon.
- Split divider: `1px` vertical line (`bg-[var(--border-subtle)]`).
- Dropdown arrow (`⌵`) triggering copy options (Markdown, Raw TSX, CLI command).

### 4.4 Right Table of Contents (Timeline Menu)
- Sticky positioned at `top-[92px]` with independent scroll.
- ScrollSpy tracking the viewport with 105px threshold.
- Active item marked with `text-[var(--text-main)] font-semibold`.
- Sub-item indent with `pl-3.5`.

### 4.5 Mac Style Window Header & Code Blocks
- **Window Header (`MacTitleBar`)**:
  - Pinned desktop-style header with macOS traffic lights (`#FF5F56`, `#FFBD2E`, `#27C93F`).
  - Interactive hover glyphs (`✕`, `−`, `⤢`) on traffic light cluster with full-screen toggle on the green dot.
  - Centered dynamic window title (e.g. `Breadcrumb - Infiax UI — shadcn/ui`).
- **Mac Style Code Headers**:
  - Code block window bar with traffic light buttons, language badges (`[TS]`), file path (`components/ui/{component}.tsx`), interactive `Expand` / `Collapse` controls, and copy feedback.

---

## 5. Anti-Patterns Explicitly Banished

- ❌ **No AI Slop Hero Grids**: No generic 3-box stat counters ("99.9% Uptime", "10k+ Users", "5-Star Rating") unless requested by domain context.
- ❌ **No Tacky Gradients**: No bright purple-to-cyan rainbow gradient text.
- ❌ **No Hardcoded Slate Colors**: Never hardcode arbitrary Tailwind classes like `bg-slate-900` when CSS tokens (`var(--bg-card)`) should be used.
- ❌ **No Unstyled Focus Rings**: Always use custom `ring-1 ring-[var(--border-active)] outline-none`.
- ❌ **No Flash of Unstyled Theme**: Instant CSS variable switching with persistent `localStorage` and `prefers-color-scheme` support.
