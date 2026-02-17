# MASTER PROMPT: Vazquez Ilusionista — High-Performance Magician Landing Page

> **⚠️ THIS IS THE CORRECTED MASTER PROMPT. All information here has been verified against official documentation as of February 2026.**
>
> **Before writing ANY code, you MUST read the skill files referenced throughout this document.**
> **If you skip or ignore a skill file, you WILL produce broken code.**

---

## 0. Agent Behavioral Directives

### MANDATORY PRE-FLIGHT CHECKLIST

Before starting ANY implementation task, you MUST:

1. **Read this entire document** (`master-prompt.md`) from top to bottom.
2. **Read the relevant skill file(s)** for whatever you are about to implement (see §0.2).
3. **DO NOT write code from memory.** If you are unsure about an API, syntax, or pattern, **re-read the skill file** first. Do not guess.
4. **DO NOT use deprecated APIs.** This project uses Astro v5, Tailwind CSS 4, Motion (not "Motion One"), and GSAP v3. Older patterns from tutorials, blog posts, or training data are WRONG.

### 0.1 Skill Files — What They Are and When to Use Them

Skill files are comprehensive reference guides located at `.agent/skills/*/SKILL.md`. They contain **verified, correct API usage** for every library in this project. They exist specifically to prevent you from hallucinating incorrect code.

### 0.2 Skill Reference Table

| When you are working on... | You MUST read this skill file FIRST |
|---|---|
| Any `.astro` component, layout, page, or content collection | `.agent/skills/astro-architecture/SKILL.md` |
| Any animation (GSAP, Motion, Lenis, scroll effects) | `.agent/skills/animation-guide/SKILL.md` |
| Any styling, CSS, Tailwind classes, design tokens, colors, fonts | `.agent/skills/tailwind4-astro/SKILL.md` |
| File creation, naming, props, data flow, site-config.json, accessibility | `.agent/skills/project-conventions/SKILL.md` |

### 0.3 Absolute Rules (NEVER break these)

1. **NEVER import from `'zod'`.** Always use `import { z } from 'astro/zod'`.
2. **NEVER create a file at `src/content/config.ts`.** The correct path is `src/content.config.ts` (at the `src/` root).
3. **NEVER create API routes outside `src/pages/api/`.** The path `src/api/` does NOT work in Astro.
4. **NEVER use `<ViewTransitions />`.** The correct component is `<ClientRouter />` from `'astro:transitions'`.
5. **NEVER import from `'motion-one'` or `'@motionone/dom'`.** The correct package is `'motion'`.
6. **NEVER use `({ target })` as the `inView` callback signature.** The correct signature is `(element, info) => { ... }`.
7. **NEVER use `@astrojs/tailwind` integration.** Tailwind 4 uses `@tailwindcss/vite` as a Vite plugin.
8. **NEVER use `@tailwind base; @tailwind components; @tailwind utilities;`** in CSS. Tailwind 4 uses `@import "tailwindcss";`.
9. **NEVER hardcode text strings in components.** All user-facing text comes from `site-config.json` translations.
10. **NEVER use `client:load` when `client:visible` would suffice.** Prefer `client:visible` for below-fold interactive components.

---

## 1. Project Overview

You are building a **premium, high-performance, Spanish-only (Argentine Spanish) landing page** for a world-class Magician/Mentalist. The site name is **Vazquez Ilusionista** (full name: Fernando Vazquez Ilusionista).

### Design Vision
- **Aesthetic**: Premium Mystery — think luxury brand meets dark theatrical magic
- **Palette**: Near-black (`#111413`), Deep Purple (`#330673`), Light Purple (`#9582D9`), Dark Gray (`#3D3C45`), Off-white (`#F2F2F2`)
- **Feel**: Large negative space, smooth scroll, elegant reveals, "anti-gravity" physics feel
- **Typography**: Serif headings (Playfair Display), clean sans-serif body (Inter)

### Design References
- **[Gaita Gonzalez](https://gaitagonsalez.com/)**: Storytelling flow, large typography, sophisticated sectional reveals
- **[Paul Henry / henryillusion.com](https://www.henryillusion.com/en/homepage/)**: Clean grids, professional photography layout, high-contrast "Magical" vibes

---

## 2. Technical Stack (Exact Versions & Packages)

| Technology | Package Name | Purpose | Bundle Impact |
|------------|-------------|---------|---------------|
| **Astro** (latest, v5+) | `astro` | Framework — static-first, Islands architecture | 0kb client JS by default |
| **Tailwind CSS 4** | `tailwindcss` + `@tailwindcss/vite` | Styling — CSS-first config, `@theme` tokens | Tree-shaken CSS |
| **GSAP v3** | `gsap` | Hero entry animation ONLY — timeline synced to video | ~25kb (loaded only in Hero) |
| **Motion** | `motion` | Scroll reveals + counter animations | ~2.3kb (mini) or ~18kb (hybrid) |
| **Lenis** | `lenis` | Global smooth scrolling | ~4kb |
| **React** | `react` + `react-dom` + `@astrojs/react` | Counter.tsx island component ONLY | Only loaded for that island |

> **IMPORTANT**: The library formerly called "Motion One" has been **rebranded to "Motion"**. The npm package is `motion`. Do NOT use `motion-one` or `@motionone/dom` — those are outdated names.

### Installation Command

```bash
npm create astro@latest ./ -- --template minimal --typescript strict --install --git
npm install gsap motion lenis
npm install @tailwindcss/vite tailwindcss
npx astro add react
npx astro add tailwind
```

---

## 3. Core Architectural Principles

> 📖 **BEFORE implementing anything in this section, read:** `.agent/skills/astro-architecture/SKILL.md`

### 3.1 Astro Islands Architecture

Astro renders ALL HTML on the server by default. **Zero JavaScript is shipped to the browser** unless you explicitly opt in with `client:*` directives.

**Rules:**

| Component Type | File Extension | JavaScript Shipped? | Directive |
|----------------|---------------|--------------------|-----------| 
| Layouts, sections, UI atoms | `.astro` | ❌ No | None needed |
| Interactive counter (React) | `.tsx` | ✅ Yes, only when visible | `client:visible` |
| Contact form (if React) | `.tsx` | ✅ Yes, on page load | `client:load` |

**Example — embedding a React island inside an Astro section:**
```astro
---
import Counter from '../ui/Counter.tsx';
---
<!-- This React component ONLY loads JS when scrolled into view -->
<Counter client:visible target={700} label="Shows" />
```

### 3.2 Content Collections (Astro v5 Content Layer API)

> **⚠️ CRITICAL**: Astro v5 changed the Content Collections API significantly. The old pattern (`src/content/config.ts` without a `loader`) is BROKEN in v5.

**Correct pattern:**

```typescript
// FILE: src/content.config.ts  ← AT THE src/ ROOT, NOT inside src/content/
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';        // ← MUST import a loader
import { z } from 'astro/zod';               // ← MUST import from astro/zod, NOT from 'zod'

const translations = defineCollection({
  loader: file("src/data/site-config.json"),  // ← loader is REQUIRED
  schema: z.object({ /* ... */ }),
});

export const collections = { translations };
```

> **NOTE**: For this project, since `site-config.json` is a single config file (not a collection of entries), it is **simpler and recommended** to import it directly as JSON: `import siteConfig from '../data/site-config.json';`. Content Collections are better suited for multiple entries. You MAY use either approach.

### 3.3 View Transitions

> **⚠️ CRITICAL**: The component is called `<ClientRouter />`, NOT `<ViewTransitions />`.

```astro
---
// In BaseLayout.astro
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

**Script re-initialization after navigation:**
When using `<ClientRouter />`, scripts do NOT automatically re-run on page navigation. You MUST use the `astro:page-load` event:

```html
<script>
  document.addEventListener('astro:page-load', () => {
    // This fires on EVERY navigation, including initial load
    initLenis();
    initRevealAnimations();
  });
</script>
```

### 3.4 Language (Spanish Only)

This site is **Spanish-only (Argentine Spanish)**. There is no bilingual routing.

**URL structure:**
```
/          → main landing page (Spanish)
```

**File structure:**
```
src/pages/
└── index.astro           # Main landing page
```

**The `index.astro` page loads content from `site-config.json`:**
```astro
---
import siteConfig from '../data/site-config.json';
import BaseLayout from '../layouts/BaseLayout.astro';

const t = siteConfig.translations.es;
---
<BaseLayout lang="es" title={t.meta.title} description={t.meta.description}>
  <!-- Sections receive translation slices as props -->
</BaseLayout>
```

### 3.5 API Routes

> **⚠️ CRITICAL**: API routes MUST be inside `src/pages/api/`. The path `src/api/` is NOT recognized by Astro.

```typescript
// FILE: src/pages/api/send-email.ts  ← Creates endpoint: POST /api/send-email
import type { APIRoute } from 'astro';

export const prerender = false; // This endpoint runs on the server

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // ... validate and send email ...
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

> **NOTE**: API routes that handle POST requests require an SSR adapter (e.g., `@astrojs/node` or `@astrojs/vercel`). This must be configured in `astro.config.mjs`.

---

## 4. Animation Strategy

> 📖 **BEFORE implementing anything in this section, read:** `.agent/skills/animation-guide/SKILL.md`

### 4.1 GSAP — Hero Entry Sequence ONLY

GSAP is used **exclusively** for the Hero section's entrance animation. It is NOT used anywhere else on the site.

**Pattern:** A GSAP `gsap.timeline()` that is created in `paused` state and triggered when the background video reaches the "golden button press" moment.

```javascript
import gsap from "gsap";

// Create paused timeline
const tl = gsap.timeline({ paused: true });

// Sequence hero elements
tl.from(".hero-title",    { opacity: 0, y: 80, scale: 0.9, duration: 1.4, ease: "power3.out" })
  .from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.9 }, "-=0.7")
  .from(".hero-cta",      { opacity: 0, y: 30, scale: 0.85, duration: 0.7 }, "-=0.4");

// Sync with video
const video = document.querySelector(".hero-video");
video?.addEventListener("timeupdate", () => {
  if (video.currentTime >= 3.5) tl.play(); // Adjust timestamp to match golden button moment
});
```

**GSAP position parameter reference (the `"-=0.7"` part):**
| Value | Meaning |
|-------|---------|
| `"-=0.7"` | Start 0.7s BEFORE the end of the timeline (overlap) |
| `"+=0.5"` | Start 0.5s AFTER the end of the timeline (gap) |
| `"<"` | Start at the same time as the previous animation |
| `"<0.3"` | Start 0.3s after the START of the previous animation |

### 4.2 Motion — Scroll Reveals & Counters

Motion is used for ALL scroll-triggered reveal animations and the Stats counter animation.

**⚠️ CRITICAL: Correct `inView` callback signature:**

```javascript
// ❌ WRONG — DO NOT USE THIS
inView(".reveal", ({ target }) => { animate(target, ...) });

// ✅ CORRECT — USE THIS
inView(".reveal", (element, info) => { animate(element, ...) });
//                  ^^^^^^^^  ^^^^
//                  DOM element    IntersectionObserverEntry
```

**Reveal animation pattern:**
```javascript
import { inView, animate } from "motion";

inView(".reveal", (element) => {
  animate(element, { opacity: 1, y: 0 }, {
    duration: 0.8,
    easing: [0.17, 0.55, 0.55, 1]
  });
});
```

**Stagger pattern (for cards):**
```javascript
import { animate, stagger } from "motion";

animate(".show-card", { opacity: 1, y: 0 }, {
  delay: stagger(0.15),
  duration: 0.6,
  easing: [0.17, 0.55, 0.55, 1]
});
```

**Counter animation (for Stats section):**
```javascript
import { animate, inView } from "motion";

// Animate a number from 0 to target
animate(0, targetValue, {
  duration: 2,
  easing: [0.17, 0.55, 0.55, 1],
  onUpdate: (latest) => {
    element.textContent = Math.round(latest).toLocaleString();
  },
});
```

### 4.3 Lenis — Smooth Scroll

Initialize globally in a dedicated component. **Must re-initialize after View Transition navigations.**

```javascript
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis = null;

function initLenis() {
  lenis?.destroy();
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Re-init on every navigation (View Transitions compatibility)
document.addEventListener('astro:page-load', () => initLenis());
```

---

## 5. Styling Strategy

> 📖 **BEFORE implementing anything in this section, read:** `.agent/skills/tailwind4-astro/SKILL.md`

### 5.1 Tailwind CSS 4 Setup

**Integration method:** Vite plugin (NOT the old `@astrojs/tailwind` integration).

```javascript
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**CSS entry file (`src/styles/global.css`):**

```css
@import "tailwindcss";

@theme {
  --color-dark: #111413;
  --color-dark-gray: #3D3C45;
  --color-purple: #330673;
  --color-purple-light: #9582D9;
  --color-purple-glow: #7B68C8;
  --color-light: #F2F2F2;
  --color-light-muted: #D9D9D9;
  --color-smoke: #2A2A2A;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --spacing-section: 120px;
  --spacing-section-mobile: 80px;
  --radius-card: 12px;
  --ease-smooth: cubic-bezier(0.17, 0.55, 0.55, 1);
}
```

**These tokens then become available as Tailwind utilities:**
```html
<h1 class="text-purple-light font-heading text-6xl">...</h1>
<section class="bg-dark text-light py-section">...</section>
```

---

## 6. Centralized Data Architecture

> 📖 **BEFORE implementing anything in this section, read:** `.agent/skills/project-conventions/SKILL.md`

### `src/data/site-config.json`

This JSON file is the **single source of truth** for ALL user-facing content, contact info, colors, links, and translations. The user should NEVER need to edit component code to change text, a phone number, or a translation.

**Required top-level keys:**

```json
{
  "branding": { "siteName", "logo", "colors": {...}, "fonts": {...} },
  "contact":  { "whatsapp", "email", "formDestinationEmail" },
  "links":    { "instagram", "youtube", "heroVideoSrc" },
  "translations": {
    "es": { "meta", "nav", "hero", "shows", "jury", "stats", "tickets", "contact", "whatsapp", "footer" }
  }
}
```

> **The full schema with all fields is documented in:** `.agent/skills/project-conventions/SKILL.md` §3.

### Data Flow Pattern

```
site-config.json
  └─→ index.astro (reads JSON, extracts `t = translations.es`)
       └─→ Hero.astro        (receives `t.hero` as prop)
       └─→ Shows.astro       (receives `t.shows` as prop)
       └─→ Stats.astro       (receives `t.stats` as prop)
       └─→ Contact.astro     (receives `t.contact` as prop)
       └─→ Footer.astro      (receives `t.footer` as prop)
       └─→ WhatsAppButton    (receives `config.contact.whatsapp` + `t.whatsapp`)
```

---

## 7. Section Specifications

Each section below is a separate `.astro` component in `src/components/sections/`.

### 7.A — Hero (The Golden Button)

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Hero.astro` |
| **Background** | Full-viewport video of the AGT Golden Button impact (`<video>` tag with `autoplay muted loop playsinline`) |
| **Animation** | GSAP `gsap.timeline()` that fades/scales the headline AFTER the video's golden button press moment |
| **Content** | Main title, subtitle, "Book Now" CTA button — ALL text from `t.hero` |
| **Overlay** | Semi-transparent dark gradient overlay on video for text readability |
| **Height** | Full viewport height (`min-h-screen`) |

**Initial state** (before GSAP plays): hero text elements have `opacity: 0` and are translated down.

### 7.B — Show Types (4 Cards)

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Shows.astro` |
| **Layout** | 4 cards in a responsive grid (1 col mobile, 2 col tablet, 4 col desktop) |
| **Cards** | Corporate, Private, Mentalism, Virtual — data from `t.shows.items[]` |
| **Animation** | Staggered entrance using Motion `inView` + `stagger` |
| **Hover** | Subtle scale-up + gold border glow on hover (CSS transitions) |

### 7.C — Jury Feedback (AGT Judges)

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/JuryFeedback.astro` |
| **Content** | Testimonial quotes from famous judges — data from `t.jury.quotes[]` |
| **Layout** | Grid or horizontal scroll of quote cards |
| **Typography** | Italicized serif quotes, gold star icons, judge name + role |
| **Animation** | Fade-in reveal using Motion `inView` |

### 7.D — Comparative Stats (The Numbers)

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Stats.astro` |
| **Data** | +14 countries, +700 shows, +40,000 spectators, +15 years — from `t.stats.items[]` |
| **Animation** | Numbers count up from 0 to target ONLY when visible (Motion `animate()` with `onUpdate`) |
| **Component** | `Counter.tsx` (React island) with `client:visible` directive |
| **Layout** | 4-column grid, large numbers with labels below |

### 7.E — Tickets & CTA

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Tickets.astro` |
| **Content** | Large headline, subtitle, prominent CTA button — from `t.tickets` |
| **CTA** | Links to the Atrapalo.com profile URL from `config.links.atrapalo` |
| **Visual** | High-impact section with gold gradient background or accent |

### 7.F — Contact Form

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Contact.astro` |
| **Fields** | Name, Email, Message — labels from `t.contact` |
| **Validation** | Client-side HTML5 validation + JS validation |
| **Submit** | `POST /api/send-email` with JSON body |
| **States** | Idle → Loading (spinner, disabled button) → Success toast / Error toast |
| **Backend** | `src/pages/api/send-email.ts` — uses Resend or email API service |

### 7.G — WhatsApp Floating Button

| Property | Value |
|----------|-------|
| **File** | `src/components/WhatsAppButton.astro` |
| **Position** | Fixed bottom-right, always visible (`position: fixed; z-index: 50;`) |
| **Logic** | Opens `https://wa.me/{whatsapp}?text={encodedMessage}` |
| **Data** | Phone from `config.contact.whatsapp`, message from `t.whatsapp.prefillMessage` |
| **Style** | Green WhatsApp brand color, circular, subtle hover scale |

### 7.H — Footer

| Property | Value |
|----------|-------|
| **File** | `src/components/sections/Footer.astro` |
| **Content** | Copyright, social links (Instagram, YouTube), privacy/terms links — from `t.footer` + `config.links` |
| **Style** | Dark background, minimal, gold accents |

---

## 8. Project File Structure (Canonical)

> 📖 **Full file structure with naming rules:** `.agent/skills/project-conventions/SKILL.md` §1 and §2.

```
vazquez-ilusionista/
├── astro.config.mjs              # Astro config (adapter, TW4 vite plugin, React)
├── tsconfig.json                 # TypeScript strict config
├── package.json
├── public/
│   ├── fonts/                    # Self-hosted font files (optional)
│   ├── videos/                   # Hero video
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── content.config.ts         # ⚠️ AT SRC ROOT (if using Content Collections)
│   ├── assets/                   # Images processed by astro:assets
│   │   ├── shows/
│   │   ├── jury/
│   │   └── hero/
│   ├── components/
│   │   ├── ui/                   # Button.astro, Reveal.astro, Counter.tsx, etc.
│   │   ├── sections/             # Hero, Shows, JuryFeedback, Stats, Tickets, Contact, Footer
│   │   ├── WhatsAppButton.astro
│   │   └── SmoothScroll.astro
│   ├── data/
│   │   └── site-config.json      # THE master config file
│   ├── layouts/
│   │   └── BaseLayout.astro      # HTML shell, <ClientRouter />, meta tags, fonts
│   ├── pages/
│   │   ├── index.astro           # Main landing page (Spanish)
│   │   └── api/
│   │       └── send-email.ts     # POST /api/send-email
│   └── styles/
│       └── global.css            # @import "tailwindcss"; @theme { ... }
└── .agent/
    ├── master-prompt.md          # THIS FILE
    ├── rules.md                  # Agent behavioral rules
    ├── skills/
    │   ├── astro-architecture/SKILL.md
    │   ├── animation-guide/SKILL.md
    │   ├── tailwind4-astro/SKILL.md
    │   └── project-conventions/SKILL.md
    └── workflows/
```

---

## 9. `astro.config.mjs` Reference

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// import node from '@astrojs/node'; // Required for API routes (uncomment when needed)

export default defineConfig({
  site: 'https://vazquezilusionista.com', // Replace with actual domain
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // output: 'hybrid',                    // Uncomment for API routes
  // adapter: node({ mode: 'standalone' }), // Uncomment for API routes
});
```

---

## 10. Quality Standards

### Performance Targets
- Lighthouse Performance: **95+**
- Lighthouse Accessibility: **100**
- Lighthouse Best Practices: **100**
- Lighthouse SEO: **100**
- Total client-side JS: **< 60kb** (GSAP + Motion + Lenis + Counter island)

### Accessibility (WCAG AA)
- All images have descriptive `alt` text
- All interactive elements keyboard-accessible
- Color contrast ≥ 4.5:1 (Light Purple on Dark = high ✅, Off-white on Dark = very high ✅)
- Form inputs have associated `<label>` elements
- `<html lang="es">` set correctly
- `prefers-reduced-motion` respected (skip animations if user prefers)

### SEO
- Unique `<title>` and `<meta name="description">`
- Single `<h1>` per page
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Open Graph meta tags for social sharing
- `<link rel="canonical">` set

---

## 11. Implementation Order

Execute in this exact sequence:

1. **Phase 1 — Scaffold**: Initialize project, install deps, configure astro.config.mjs, create BaseLayout.astro, global.css
2. **Phase 2 — Data**: Write site-config.json, create routing pages (index.astro + [lang]/index.astro)
3. **Phase 3 — Sections**: Build all 8 section components, create reusable UI components
4. **Phase 4 — Animations**: GSAP Hero, Motion reveals, Motion counters, Lenis, LanguageToggle, WhatsApp FAB
5. **Phase 5 — Form & Polish**: Contact form + API route, accessibility audit, performance audit

**DO NOT skip phases. DO NOT work on Phase 4 before Phase 3 sections exist.**

---

## 12. Final Directive

- Do NOT skip any section listed in §7.
- Ensure `site-config.json` is exhaustive — the user NEVER touches component code to change content.
- Prioritize: **speed** (Lighthouse 95+), **smooth scrolling** (Lenis), **magical feel** (elegant animations).
- Every piece of text on the site MUST come from `site-config.json` translations.
- Test that `/` renders correctly with all Spanish content.
