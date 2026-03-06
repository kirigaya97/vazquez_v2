# 📁 src/components/sections

## Propósito
Este directorio contiene los componentes de alto nivel que conforman las secciones principales de la landing page. Están diseñados para ser piezas modulares que gestionan tanto la presentación visual como la lógica de interacción compleja (GSAP, ScrollTrigger, multimedia).

## Archivos
| Archivo | Descripción |
|---|---|
| AboutMe.astro | Sección biográfica con imagen estilizada y animaciones de revelación para el texto narrativo. |
| Contact.astro | Formulario de contacto funcional con validación, protección anti-spam (honeypot/timestamp) y envío asíncrono. |
| Footer.astro | Pie de página institucional que centraliza redes sociales, datos de contacto legal y créditos del desarrollador. |
| Hero.astro | Pantalla de bienvenida inmersiva con disparador de "modo mágico", audio sincronizado y presentación dinámica de imágenes. |
| JuryFeedback.astro | Galería de testimonios de reconocimiento internacional con diseño de citas alternadas y acentos visuales. |
| JuryVIP.astro | Sistema de reseñas estilo Google con scroll fijado (pinned) donde las tarjetas transicionan mediante ScrollTrigger. |
| Shows.astro | Catálogo interactivo de servicios con tarjetas que expanden su descripción mediante hover o scroll en móviles. |
| Stats.astro | Sección de métricas de trayectoria con contadores animados y bordes decorativos dorados. |
| VideoTriptych.astro | Experiencia de video híbrida: triptico interactivo en desktop y feed vertical estilo "Reels" con scroll-snap en mobile. |

## Relaciones
- **Usa**: Componentes de `../ui/` (Reveal, Button, GoldenBorder, CounterVanilla, SectionHeading), utilidades de `../../lib/gsap-init.ts` y configuración de `../../data/site-config.json`.
- **Usado por**: Principalmente por `src/pages/index.astro` para ensamblar la página de inicio.

## Detalles clave
- **Lógica de Animación Avanzada**: Se utiliza GSAP y ScrollTrigger para gestionar estados complejos, como el scroll infinito simulado en `JuryVIP` y las transiciones del `Hero`.
- **Dualidad Mobile/Desktop**: Varios componentes (especialmente `VideoTriptych` y `Shows`) implementan lógicas de interacción radicalmente distintas según el dispositivo para optimizar la UX.
- **Gestión de Multimedia**: El `Hero` y `VideoTriptych` incluyen manejo de precarga, reproducción condicional de video/audio y gestión de estados de silencio (mute/unmute).
- **Consistencia de Diseño**: Se apoya en clases de Tailwind CSS 4 y componentes UI compartidos para mantener la estética "premium" (dorados, desenfoques, tipografía heading).
- **Ciclo de Vida Astro**: Las interacciones del lado del cliente están encapsuladas en scripts que escuchan el evento `astro:page-load` para asegurar la compatibilidad con View Transitions.