# DESIGN.md — Aether UI Design System (Overhaul)

## Visual World: Minimal but Rich
- **Core Aesthetic**: Precision engineering with zero AI slop. Clean obsidian depth, slate architectural borders, Google Sans typography, and `#4F39F6` electric indigo accent.
- **Color Discipline**:
  - Primary Accent: `#4F39F6` (Electric Indigo: `rgb(79, 57, 246)` / HSL `247 91% 59%`).
  - Hovers: Strictly **Slate** (`slate-900`, `slate-800`, `slate-700`, `slate-200`).
  - Surfaces: Deep obsidian (`#08090d` / `zinc-950`), elevated slate card backgrounds (`slate-950/80` or `zinc-900/60`).
  - Hairline Borders: `slate-800/80` transitioning to `slate-700` on hover.
- **Signature Component**: Magic Card (`@magicui/magic-card`) with cursor-following radial gradient borders in `#4F39F6` and slate backdrops.
- **Typography**: Google Sans (`Google Sans`, `Google Sans Text`, system-ui), with JetBrains Mono for CLI and code.
- **Anti-Patterns Banished**:
  - ❌ No generic 3-box hero metrics (big number + small label).
  - ❌ No rainbow/purple-to-blue gradient slop text.
  - ❌ No zero-blur colored halos.
  - ❌ No unstyled browser focus rings or ugly gray hover states.
