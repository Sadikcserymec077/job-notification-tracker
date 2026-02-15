# KodNest Premium Build System

## Design Philosophy
- **Calm, Intentional, Coherent, Confident**
- No flashy elements, gradients, or glassmorphism.
- Focus on typography, spacing, and strict color usage.

## Color System
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | #F7F6F3 | Global background (Off-white) |
| `--color-text-primary` | #111111 | Headings, primary text |
| `--color-accent` | #8B0000 | Primary actions (Deep Red) |
| `--color-success` | #4A7C59 | Confirmation states |
| `--color-warning` | #D97706 | Progress states |

## Interactive Components
- **Buttons**:
  - Primary: Deep red solid (`btn-primary`)
  - Secondary: Outlined (`btn-secondary`)
  - Copy: Special utility style (`btn-copy`)
- **Inputs**: Clean borders, clear focus (`input`)
- **Cards**: Minimal border, no shadow (`card`)

## Layout Structure
1. **Top Bar**: Navigation & Status
2. **Context Header**: Clear goal definition
3. **Primary Workspace**: Main interaction area (70%)
4. **Secondary Panel**: Context & Proof (30%)
5. **Proof Footer**: Persistent checklist

## Usage
Run the development server:
```bash
npm run dev
```
