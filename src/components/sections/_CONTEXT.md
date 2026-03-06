# 📁 src/components/sections

## Propósito
Este directorio contiene los componentes de alto nivel que conforman las secciones principales de la landing page. Estos componentes gestionan la narrativa visual, integran animaciones complejas de GSAP y manejan la interactividad principal del usuario.

## Archivos
| Archivo | Descripción |
|---|---|
| **AboutMe.astro** | Sección biográfica con diseño de dos columnas y animaciones de revelado. |
| **Contact.astro** | Formulario de contacto con sistema anti-spam (honeypot/timestamp) e integración con API. |
| **Footer.astro** | Pie de página con enlaces sociales, información legal y créditos del desarrollador. |
| **Hero.astro** | Cabecera interactiva con grilla de 105 imágenes, audio, animaciones 3D y estados inmersivos. |
| **JuryFeedback.astro** | Sección de testimonios internacionales con diseño alternado y decoraciones visuales. |
| **JuryVIP.astro** | Galería de reseñas tipo Google con scroll-pinning y transición de opacidad por scroll. |
| **Shows.astro** | Catálogo de servicios con tarjetas interactivas, bordes dorados dinámicos y estados táctiles. |
| **Stats.astro** | Visualización de logros numéricos mediante contadores animados y tarjetas con desenfoque. |
| **VideoTriptych.astro** | Galería de videos: tríptico en desktop y sistema de Reels con scroll-snap en mobile. |

## Relaciones
- **Usa**: `../ui/` (Reveal, Button, SectionHeading, GoldenBorder, Counter), `../../lib/gsap-init`, `../../data/site-config.json`, `astro:assets`.
- **Usado por**: `src/pages/index.astro`.

## Detalles clave
- **Animaciones Avanzadas**: Uso extensivo de GSAP y ScrollTrigger para manejar estados complejos, especialmente en `Hero` y `JuryVIP`.
- **Diferenciación de Dispositivos**: `VideoTriptych` y `Shows` implementan lógicas de interacción radicalmente distintas para desktop (hover/click) y mobile (scroll-snap/observer).
- **Optimización de Performance**: El componente `Hero` utiliza `requestIdleCallback` y un sistema de "seeds" para precargar 105 imágenes sin bloquear el hilo principal.
- **Seguridad en Formularios**: `Contact` implementa un honeypot invisible y validación de tiempo de carga para mitigar el spam de bots.
- **Interactividad Inmersiva**: El `Hero` integra audio (`hero-track.mp3`) y cambios de escala en tiempo real para crear una experiencia "mágica" al interactuar con el trigger.
- **Consistencia Visual**: Todas las secciones consumen el componente `Reveal` para asegurar una entrada fluida y coordinada de los elementos al hacer scroll.