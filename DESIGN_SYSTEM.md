# KodNest Premium Build System — Design System Reference

## Philosophy
- **Calm**. Nothing screams. Every element earns its place.
- **Intentional**. No random values. Every pixel follows the scale.
- **Coherent**. One mind designed it. No visual drift.
- **Confident**. Clear hierarchy, decisive spacing, no hedging.

Not flashy. Not loud. Not playful. Not hackathon-style.
No gradients. No glassmorphism. No neon. No animation noise.

---

## Color System (4 colors maximum)

| Token                 | Value     | Purpose                               |
|-----------------------|-----------|---------------------------------------|
| `--color-bg`          | `#F7F6F3` | Global background (off-white)         |
| `--color-surface`     | `#FFFFFF` | Cards, panels, elevated surfaces      |
| `--color-text-primary`| `#111111` | Headings, primary text                |
| `--color-accent`      | `#8B0000` | Primary actions, links (deep red)     |

### Supporting tones (derived, not new colors)
| Token                   | Value     | Purpose                      |
|-------------------------|-----------|------------------------------|
| `--color-text-secondary`| `#5C5C5C` | Body text, descriptions      |
| `--color-text-tertiary` | `#8C8C8C` | Captions, placeholders       |
| `--color-success`       | `#4A7C59` | Muted green, confirmations   |
| `--color-warning`       | `#B8860B` | Muted amber, progress states |
| `--color-border`        | `#E0DDD8` | Borders, dividers            |

---

## Typography

### Headings
- **Font**: Playfair Display (serif)
- **Weight**: 600–700
- **Line-height**: 1.2
- **Letter-spacing**: -0.01em
- **Sizes**: 48px (h1), 40px (h2), 32px (h3), 24px (h4)

### Body Text
- **Font**: Inter (sans-serif)
- **Weight**: 400–500
- **Size**: 16–18px
- **Line-height**: 1.6–1.8
- **Max width**: 720px for text blocks

### Monospace
- Font: SF Mono / Menlo / Consolas
- Use: Code blocks, prompt boxes

### Rules
- No decorative fonts anywhere.
- No random sizes outside the type scale.
- System is: 12, 14, 16, 18, 24, 32, 40, 48px.

---

## Spacing System

| Token       | Value | Usage examples                              |
|-------------|-------|---------------------------------------------|
| `--space-1` | 8px   | Inner padding, icon gaps, tight spacing     |
| `--space-2` | 16px  | Card padding, form gaps, standard spacing   |
| `--space-3` | 24px  | Section padding, card groups                |
| `--space-4` | 40px  | Section separators, generous breathing room |
| `--space-5` | 64px  | Page-level separators, major sections       |

**Rule**: Never use spacing values outside this scale (no 13px, 27px, 12px, etc.).
Whitespace is a design element, not an afterthought.

---

## Layout Structure

Every page follows this vertical flow:

```
┌──────────────────────────────────────────┐
│  TOP BAR                                 │
│  Left: Project name                      │
│  Center: Progress (Step X / Y)           │
│  Right: Status badge                     │
├──────────────────────────────────────────┤
│  CONTEXT HEADER                          │
│  Large serif headline + 1-line subtext   │
├────────────────────┬─────────────────────┤
│                    │                     │
│  PRIMARY           │  SECONDARY          │
│  WORKSPACE         │  PANEL              │
│  (70%)             │  (30%)              │
│                    │                     │
│                    │  • Step explanation  │
│  Clean cards,      │  • Copyable prompt  │
│  predictable       │  • Action buttons   │
│  components        │                     │
│                    │                     │
├────────────────────┴─────────────────────┤
│  PROOF FOOTER (persistent)               │
│  □ UI Built  □ Logic Working             │
│  □ Test Passed  □ Deployed               │
└──────────────────────────────────────────┘
```

### CSS Classes
- `.top-bar` → sticky nav with `.top-bar__left`, `.top-bar__center`, `.top-bar__right`
- `.context-header` → with `.context-header__headline`, `.context-header__subtext`
- `.workspace` → flex container, `.workspace__primary` (70%), `.workspace__secondary` (30%)
- `.proof-footer` → sticky bottom bar with `.proof-footer__list`

---

## Components

### Buttons
| Class           | Style                              |
|-----------------|------------------------------------|
| `.btn-primary`  | Solid deep red, white text         |
| `.btn-secondary`| Transparent, outlined              |
| `.btn-copy`     | Light surface, muted, utility feel |
| `.btn-success`  | Muted green, confirmation actions  |
| `.btn-sm`       | 32px height, smaller padding       |

All buttons share: `border-radius: 4px`, same height (40px default), same hover transition (200ms ease-in-out).

### Inputs
- Class: `.input`
- Clean 1px border, `#E0DDD8`
- Focus: border goes to `#111111` — no shadow ring by default
- Clear placeholder color, no heavy decorations

### Cards
- Class: `.card`
- 1px border, `border-radius: 4px`, no drop shadows
- Variants: `.card-compact` (16px padding), `.card-spacious` (40px padding)

### Badges
- Class: `.badge` + `.badge-neutral` / `.badge-progress` / `.badge-shipped` / `.badge-error`
- 4px radius, uppercase, 12px, wide letter-spacing

### Prompt Box
- Class: `.prompt-box`
- Monospace font, off-white background, 1px border
- Designed for copyable text in the secondary panel

### Checklist
- Class: `.checklist-item` + `.checklist-checkbox`
- `.completed` state turns checkbox green with white checkmark
- Designed for the Proof Footer

### Progress Indicator
- Class: `.progress-indicator` with `.progress-step`
- States: `.active` (red), `.completed` (green), `.pending` (gray)
- Connected by `.progress-divider`

---

## Interaction Rules

- All transitions: **150–200ms, ease-in-out**
- No bounce, no parallax, no scale transforms
- No decorative animations
- Hover effects: color/border changes only

---

## Error States
- Never blame the user
- Always explain what went wrong
- Always provide a next action
- Use `.error-state` with `__title`, `__message`, `__action`

## Empty States
- Never feel dead
- Always provide a next action
- Use `.empty-state` with `__title`, `__message`
- Center-aligned, generous padding

---

## File Map

| File                 | Purpose                                    |
|----------------------|--------------------------------------------|
| `index.html`         | Google Fonts import (Inter, Playfair Display) |
| `src/index.css`      | Complete design system — single source of truth |
| `src/App.css`        | Minimal root container setup               |
| `DESIGN_SYSTEM.md`   | This document                              |
