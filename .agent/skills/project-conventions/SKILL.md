---
name: project-conventions
description: File structure, naming conventions, data architecture, and content patterns for the Vazquez Ilusionista magician landing page.
---

# Vazquez Ilusionista Project Conventions

> **This document defines the rules for this project.**
> Every file you create or modify MUST follow these conventions.
> When in doubt, consult this document first.

---

## 1. Project Structure (Canonical)

```
vazquez-ilusionista/
├── astro.config.mjs              # Astro config
├── tsconfig.json                 # TypeScript strict
├── package.json
├── public/
│   ├── fonts/                    # Self-hosted fonts (optional)
│   ├── videos/                   # Hero background video
│   ├── favicon.svg               # Favicon
│   └── robots.txt
├── src/
│   ├── content.config.ts         # ⚠️ AT SRC ROOT, not src/content/
│   ├── assets/                   # Optimized images (use astro:assets)
│   │   ├── shows/                # Show type images
│   │   ├── jury/                 # Jury headshots
│   │   └── hero/                 # Hero imagery
│   ├── components/
│   │   ├── ui/                   # Small, reusable UI atoms
│   │   │   ├── Button.astro
│   │   │   ├── Reveal.astro      # Motion inView wrapper
│   │   │   ├── SectionHeading.astro
│   │   │   └── Counter.tsx       # React island (client:visible)
│   │   ├── sections/             # Full page sections
│   │   │   ├── Hero.astro
│   │   │   ├── Shows.astro
│   │   │   ├── JuryFeedback.astro
│   │   │   ├── Stats.astro
│   │   │   ├── Tickets.astro
│   │   │   ├── Contact.astro
│   │   │   └── Footer.astro
│   │   ├── WhatsAppButton.astro  # Floating FAB
│   │   └── SmoothScroll.astro    # Lenis initialization
│   ├── data/
│   │   └── site-config.json      # Master config (see §3)
│   ├── layouts/
│   │   └── BaseLayout.astro      # HTML shell, <head>, ClientRouter
│   ├── pages/
│   │   ├── index.astro           # Main landing page (Spanish)
│   │   └── api/
│   │       └── send-email.ts     # POST /api/send-email
│   └── styles/
│       └── global.css            # Tailwind 4 entry + @theme
└── .agent/
    ├── skills/                   # THIS directory
    └── workflows/
```

### Path Rules

| Rule | Correct | Wrong |
|------|---------|-------|
| Content config | `src/content.config.ts` | `src/content/config.ts` |
| API routes | `src/pages/api/send-email.ts` | `src/api/send-email.ts` |
| Optimizable images | `src/assets/` | `public/images/` |
| Static files (no processing) | `public/` | `src/assets/` |
| Global CSS | `src/styles/global.css` | `src/styles/index.css` |

---

## 2. Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| Astro components | `PascalCase.astro` | `HeroSection.astro`, `Button.astro` |
| React islands | `PascalCase.tsx` | `Counter.tsx` |
| Layouts | `PascalCase.astro` | `BaseLayout.astro` |
| Pages | `lowercase.astro` or `[param].astro` | `index.astro`, `[lang]/index.astro` |
| API routes | `kebab-case.ts` | `send-email.ts` |
| Style files | `kebab-case.css` | `global.css` |
| Data files | `kebab-case.json` | `site-config.json` |

### CSS Classes

Use lowercase kebab-case for custom classes:

```html
<div class="hero-title">       ✅
<div class="HeroTitle">         ❌
<div class="hero_title">        ❌
```

### Component Props

Use TypeScript interfaces with PascalCase interface names and camelCase prop names:

```typescript
interface Props {
  showTitle: string;
  isActive?: boolean;
  onBookClick?: () => void;
}
```

---

## 3. Data Architecture: `site-config.json`

This is the **single source of truth** for all text, colors, links, and contact info.
The user should NEVER need to edit component code to change content.

### Required Structure

```json
{
  "branding": {
    "siteName": "Vazquez Ilusionista",
    "logo": "/images/logo.svg",
    "colors": {
      "primary": "#111413",
      "secondary": "#3D3C45",
      "accent": "#330673",
      "accentLight": "#9582D9",
      "text": "#F2F2F2",
      "textMuted": "#D9D9D9"
    },
    "fonts": {
      "heading": "Playfair Display",
      "body": "Inter"
    }
  },
  "contact": {
    "whatsapp": "+54XXXXXXXXX",
    "email": "info@vazquezilusionista.com",
    "formDestinationEmail": "bookings@vazquezilusionista.com"
  },
  "links": {
    "instagram": "https://www.instagram.com/...",
    "youtube": "https://www.youtube.com/...",
    "heroVideoSrc": "/videos/hero.mp4"
  },
  "translations": {
    "es": {
      "meta": {
        "title": "Vazquez Ilusionista — Mago y Mentalista",
        "description": "Espectáculos de magia y mentalismo..."
      },
      "nav": {
        "shows": "Espectáculos",
        "about": "Sobre Mí",
        "contact": "Contacto",
        "bookNow": "Reservar"
      },
      "hero": {
        "title": "...",
        "subtitle": "Mentalismo · Ilusionismo · Experiencias Únicas",
        "cta": "Reservar Ahora"
      },
      "shows": {
        "sectionTitle": "Espectáculos",
        "items": [
          {
            "id": "corporate",
            "title": "Corporativo",
            "description": "Eventos empresariales inolvidables..."
          }
        ]
      },
      "jury": {
        "sectionTitle": "Lo Que Dicen",
        "quotes": [
          {
            "text": "...",
            "author": "Name",
            "role": "Role"
          }
        ]
      },
      "stats": {
        "sectionTitle": "Los Números",
        "items": [
          { "value": 14, "label": "Países", "prefix": "+" }
        ]
      },
      "tickets": {
        "sectionTitle": "Entradas",
        "cta": "Comprar Entradas",
        "subtitle": "Próximos espectáculos disponibles"
      },
      "contact": {
        "sectionTitle": "Contacto",
        "nameLabel": "Nombre",
        "namePlaceholder": "Tu nombre",
        "emailLabel": "Email",
        "emailPlaceholder": "tu@email.com",
        "messageLabel": "Mensaje",
        "messagePlaceholder": "Contanos sobre tu evento...",
        "submitButton": "Enviar Mensaje",
        "submitting": "Enviando...",
        "successMessage": "¡Mensaje enviado! Te responderemos pronto.",
        "errorMessage": "Error al enviar. Intentá de nuevo."
      },
      "whatsapp": {
        "prefillMessage": "Hola, me interesa contratar un espectáculo de magia."
      },
      "footer": {
        "copyright": "© 2026 Vazquez Ilusionista. Todos los derechos reservados.",
        "privacyPolicy": "Política de Privacidad",
        "termsOfService": "Términos de Servicio"
      }
    }
  }
}
```
  }
}
```

### How to Use in Components

```astro
---
// Every section receives the translation object as a prop
interface Props {
  t: typeof import('../data/site-config.json').translations.es;
  config: typeof import('../data/site-config.json');
}
const { t, config } = Astro.props;
---
<section>
  <h2>{t.shows.sectionTitle}</h2>
  {t.shows.items.map((show) => (
    <div>
      <h3>{show.title}</h3>
      <p>{show.description}</p>
    </div>
  ))}
</section>
```

---

## 4. Component Prop Passing Pattern

The main page (`[lang]/index.astro`) loads the config and passes relevant slices to each section:

```astro
---
// src/pages/index.astro
import siteConfig from '../data/site-config.json';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import Shows from '../components/sections/Shows.astro';
// ... other sections

const t = siteConfig.translations.es;
---
<BaseLayout lang="es" title={t.meta.title} description={t.meta.description}>
  <Hero t={t.hero} videoSrc={siteConfig.links.heroVideoSrc} />
  <Shows t={t.shows} />
  <!-- ... more sections -->
</BaseLayout>
```

---

## 5. Accessibility Requirements

### Mandatory

1. **All images** MUST have descriptive `alt` text.
2. **All interactive elements** MUST be keyboard-accessible (Tab, Enter, Escape).
3. **Color contrast** MUST meet WCAG AA (4.5:1 for text, 3:1 for large text).
   - Light Purple (#9582D9) on Dark (#111413) = high contrast ✅
   - Off-white (#F2F2F2) on Dark (#111413) = very high contrast ✅
4. **Form inputs** MUST have associated `<label>` elements.
5. **Language attribute** MUST be set on `<html lang="es">` or `<html lang="en">`.
6. **Skip navigation** link should be provided.
7. **Reduced motion** preference MUST be respected.

### Pattern for Reduced Motion

```astro
<script>
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Initialize animations only if user allows motion
    initRevealAnimations();
    initSmoothScroll();
  }
</script>
```

---

## 6. Performance Checklist

Before considering any section complete, verify:

- [ ] No unused CSS/JS is shipped
- [ ] Images use `<Image>` from `astro:assets` (not `<img>` with string src)
- [ ] Videos use `preload="metadata"` (not `preload="auto"`)
- [ ] Fonts use `display=swap` and are preconnected
- [ ] No `client:load` is used where `client:visible` would suffice
- [ ] All sections have `loading="lazy"` for below-fold images
- [ ] GSAP is only loaded in the Hero section script, not globally

---

## 7. Git Commit Convention

```
feat(hero): add GSAP timeline with video sync
fix(contact): correct email validation regex
style(global): add gold gradient button styles
chore(config): update site-config.json translations
docs(skills): update animation guide with inView signature
```

Format: `type(scope): description`

Types: `feat`, `fix`, `style`, `chore`, `docs`, `refactor`, `perf`, `test`
