# 🎩 Vázquez Ilusionista — Mentalismo & Magia

A premium, high-performance landing page for **Vázquez Ilusionista**, featuring state-of-the-art web animations, a custom cinematic experience, and a refined Argentine Spanish interface. Built with **Astro v5**, **Tailwind CSS 4**, and **GSAP**.

![Astro v5](https://img.shields.io/badge/Astro-v5.0-BC52EE?style=flat-square&logo=astro)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat-square&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-v3.14-88CE02?style=flat-square&logo=greensock)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=flat-square&logo=typescript)

---

## ✨ Features

- **🎭 Cinematic Hero**: Custom GSAP-driven image presentation with vertical crossfades, spatial audio triggers, and a 3D-orbiting magic star.
- **🎥 Reels Experience**:
    - **Desktop**: Interactive triptych with B&W-to-color transitions and spatial unmuting.
    - **Mobile**: TikTok-style vertical snap scroll with an optimized social overlay (+7vh offset for browser clearance).
- **🚪 Smart Intro Reveal**: Cinematic entrance GIF with mandatory audio unlock. Persists per session using `sessionStorage` to allow seamless internal navigation.
- **🌫️ Procedural Noise**: Animated SVG filter background that adds cinematic texture without the performance cost of video backgrounds.
- **⏳ Dynamic Shows**: Automated show list with configurable badges ("Recepción", "Show Central", etc.) and SEO-friendly metadata.
- **👤 Sobre Fer**: A personal storyteller section with warm yellow accents matched to brand photography.
- **🤏 Magnetic Cursor**: Custom GSAP-powered cursor that expands and adapts to interactive elements (desktop only).
- **🇦🇷 Argentine Core**: Tailored specifically for the local market with Argentine Spanish (voseo) throughout.

---

## 🏗️ Project Structure

```bash
vazquez_v2/
├── public/                 # Static assets
│   ├── favicon.svg         # Brand logo (Purple Light)
│   ├── images/             # Optimized WebP assets & about photography
│   ├── mp3/                # Atmospheric audio tracks
│   └── videos/             # High-quality reels & intro GIF
├── src/
│   ├── components/
│   │   ├── sections/       # Hero, Shows, VideoTriptych, Stats, AboutMe, Contact, etc.
│   │   ├── ui/             # Reusable atoms (Button, Reveal, GoldenBorder)
│   │   └── Navbar.astro    # Clean navigation with scroll-to-section
│   ├── data/
│   │   └── site-config.json # Centralized content (translations, show data, settings)
│   ├── layouts/
│   │   └── BaseLayout.astro # Global wrapper (GSAP init, Lenis, Intro Reveal)
│   ├── pages/
│   │   ├── api/            # Serverless endpoints (e.g., Contact Form via Resend)
│   │   ├── privacy.astro   # Legal pages
│   │   └── index.astro      # Main entry point (Flat routing)
│   └── styles/
│       └── global.css      # Tailwind 4 theme & custom tokens
└── package.json            # Dependencies & Scripts
```

---

## 🛠️ Tech Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation + Server-Side API)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (New Vite-based engine)
- **Animation**: [GSAP](https://greensock.com/gsap/) (Core animation engine for Hero, Reels, and Cursor)
- **Scrolling**: [Lenis](https://lenis.studiofreight.com/) (Smooth scroll foundation)
- **Email**: [Resend](https://resend.com/) (Reliable delivery for the contact section)
- **Images**: [Sharp](https://sharp.pixelplumbing.com/) (Built-in Astro optimization)

---

## 🎨 Design System

Core tokens defined in `src/styles/global.css` using the Tailwind 4 `@theme` block:

- **Primary**: `--color-dark` (`#111413`)
- **Secondary**: `--color-dark-gray` (`#3D3C45`)
- **Accent Purple**: `--color-purple-light` (`#9582D9`)
- **Accent Warm**: `--color-accent-warm` (`#E8C547`) — Used sparingly for highlights.
- **Typography**:
    - **Headings**: `Playfair Display` (Elegant Serif)
    - **Body**: `Inter` (Precise Sans-Serif)

---

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Environment Variables**: Add `RESEND_API_KEY` to your `.env` for the contact form.
3. **Run Dev**: `npm run dev`
4. **Build**: `npm run build`

Built with ❤️ for **Vázquez Ilusionista**.
