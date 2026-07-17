# Design System — Paul Gibson II Portfolio

## Visual Theme

Warm, atmosphere-led, type-first portfolio inspired by conversational creative portfolios (Ngan Nguyen pattern), adapted for sincere marketing leadership. Soft paper field, peach/sage ambient glows, near-black ink, terracotta accent. Personality in greeting and close; proof in the work mosaic.

## Color Palette

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#F7F3EE` | Page background |
| `--ink` | `#1A1A1A` | Headlines and body |
| `--accent` | `#C45D3A` | Hyphen lead, labels, stats, CTAs, active nav |
| `--muted` | `#5A5550` | Captions and secondary text |
| `--rule` | `#E4DDD4` | Subtle dividers |
| `--glow-a/b/c` | peach / warm sand / sage | Soft hero atmosphere blurs |

## Typography

- Display / headings: **Unbounded** (800 weight on `h1`–`h3`)
- Body / UI: **Source Sans 3** (400 body, 500–600 labels and nav)
- Hero pattern: conversational greeting + “I'm {name}” + hyphen-led display role line
- Section labels: small, tracked, uppercase, accent color (used sparingly)
- Headlines: balanced wrap; letter-spacing ≥ -0.04em; clamp max ≤ 6rem; semibold–bold for presence

## Layout

- Max content width ~72rem; generous horizontal padding
- Home is the full story: hero → intro (portrait + prose + stats) → work mosaic → leadership teaser → closing CTA
- Portrait: soft rounded crop (`rounded-[2rem]`) in intro and on Creative Leadership
- Work: asymmetric mosaic of rounded image tiles linking to case study routes
- Case studies: type header + rounded hero image (not full-bleed dark overlay)
- Cards avoided except mosaic tiles as interaction containers

## Components

- Minimal sticky nav: short name, Work, Leadership, Email, LinkedIn
- Footer: name + one-line positioning, mailto, LinkedIn
- Stats: bold Unbounded numerals beside captions in compact rows; `clamp` up to ~5rem; indexed `01`–`03`
- Case study pager: prev/next text links

## Motion

- Soft fade/slide on section enter; subtle underline on nav hover
- Ambient glow drift behind type-led heroes
- Mosaic tile lift + image scale on hover
- Disable transform/travel under `prefers-reduced-motion`
