# 🎩 Vázquez Ilusionista — Mentalismo & Magia

A premium, high-performance landing page for **Vázquez Ilusionista**, featuring state-of-the-art web animations, a custom cinematic experience, and a bilingual interface. Built with **Astro v5**, **Tailwind CSS 4**, and **GSAP**.

![Astro v5](https://img.shields.io/badge/Astro-v5.0-BC52EE?style=flat-square&logo=astro)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat-square&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-v3.14-88CE02?style=flat-square&logo=greensock)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=flat-square&logo=typescript)

---

## ✨ Features

- **🎭 Cinematic Animations**: Custom GSAP timelines for the Hero section with a 3D coin spin, scroll-based parallax effects, and staggered reveals.
- **🎥 Video Triptych**:
    - **Desktop**: A 3-column interactive layout with B&W-to-color hover transitions and synchronized unmuting.
    - **Mobile**: A TikTok-style vertical snap scroll, rebuilt with **ScrollTrigger + Sticky** architecture for 100% compatibility with Lenis.
- **🌫️ Noise Background**: An animated, procedural noise texture (`feTurbulence`) that adds a premium film-grain aesthetic without video overhead.
- **🚪 Curtain Preloader**: A polished entry animation that gracefully reveals the site content once assets are ready.
- **🏷️ Dynamic Show Badges**: "Sold Out" and "New" badges tailored to each show, configurable via JSON.
- **📱 Hybrid Mobile UX**: Smart "auto-reveal" Show cards on mobile (using ScrollTrigger) while maintaining interactive hovers for desktop.
- **📩 Production-Ready Contact Form**:
    - Built with **Resend** for reliable email delivery.
    - **Anti-Spam Protection**: Invisible honeypot + timestamp-based bot detection.
    - **SSR Hybrid mode**: Server-side API endpoint powered by `@astrojs/vercel`.
- **🤏 Custom Golden Cursor**: A bespoke GSAP-powered "magnetic" cursor that expands on interaction (desktop only).
- **🌐 Bilingual (i18n)**: Fully localized in Spanish (ES) and English (EN) using Astro's native i18n routing.
- **🕊️ Smooth Navigation**: Integrated **Lenis** smooth scrolling with optimized mobile handling.

---

## 🏗️ Project Structure

```bash
vazquez_v2/
├── public/                 # Static assets (favicon, videos, etc.)
│   ├── favicon.svg         # Brand logo
│   └── videos/             # High-quality hero & reel videos
├── src/
│   ├── components/
│   │   ├── sections/       # Primary page segments (Hero, Details, VideoTriptych, etc.)
│   │   ├── ui/             # Reusable atomic UI components (Button, GoldenBorder, Badge)
│   │   └── Navbar.astro    # Core navigation with language switching
│   ├── data/
│   │   └── site-config.json # The "Brain": Site-wide translations, settings & content
│   ├── layouts/
│   │   └── BaseLayout.astro # Global wrapper (Fonts, GSAP init, Lenis, Preloader)
│   ├── pages/
│   │   ├── api/            # Server-side endpoints
│   │   │   └── send-email.ts # Resend integration + Anti-spam logic
│   │   ├── [lang]/         # i18n dynamic routes
│   │   └── index.astro      # Main entry point
│   └── styles/
│       └── global.css      # Tailwind 4 foundation & themed tokens
└── package.json            # Dependencies & Scripts
```

---

## 🛠️ Tech Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation + Server-Side API)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (New Vite-based engine)
- **Animation**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger, Flip, Timeline) & [Motion](https://motion.dev/)
- **Scrolling**: [Lenis](https://lenis.studiofreight.com/) (Smooth scroll optimization)
- **Interactivity**: [React 19](https://react.dev/) (Dynamic components like Stats counter)
- **Email**: [Resend](https://resend.com/)
- **Deployment**: Configured for [Vercel](https://vercel.com/) (using `@astrojs/vercel`)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
RESEND_API_KEY=re_your_api_key_here
```

### 3. Development
```bash
npm run dev
```

---

## 🎨 Design System

Core design tokens are defined in `src/styles/global.css` using the new Tailwind 4 `@theme` block:

- **Primary (Dark)**: `--color-dark` (`#111413`)
- **Secondary (Gray)**: `--color-dark-gray` (`#3D3C45`)
- **Accent (Purple)**: `--color-purple` (`#330673`)
- **Accent Light**: `--color-purple-light` (`#9582D9`)
- **Text (Light)**: `--color-light` (`#F2F2F2`)

**Typography**:
- **Headings**: `Playfair Display` (Serif, Elegant)
- **Body**: `Inter` (Sans-serif, Modern)

---

Built with ❤️ for **Vázquez Ilusionista** in Argentina.
