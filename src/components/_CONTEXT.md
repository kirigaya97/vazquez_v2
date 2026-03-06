# 📁 src/components

## Propósito
Este directorio contiene los bloques de construcción de la interfaz de usuario, incluyendo componentes de navegación, utilidades de experiencia de usuario (scroll, intros) y elementos visuales reutilizables organizados por nivel de complejidad.

## Archivos
| Archivo | Descripción |
|---|---|
| `IntroReveal.astro` | Pantalla de bienvenida con video y animación GSAP; gestiona la persistencia mediante `sessionStorage`. |
| `Navbar.astro` | Cabecera de navegación con lógica de scroll (sticky/hide) y menú móvil animado con GSAP. |
| `SmoothScroll.astro` | Implementación de Lenis para desplazamiento suave, sincronizada con el ticker de GSAP. |
| `WhatsAppButton.astro` | Botón flotante de contacto directo con enlace dinámico y tooltip de invitación. |

## Relaciones
- **Usa**: `gsap` (vía `../lib/gsap-init`), `lenis`, `../data/site-config.json`, `../components/ui/Button.astro`.
- **Usado por**: Principalmente por `src/layouts/BaseLayout.astro` para configurar la estructura global de la página y las utilidades de UX.

## Detalles clave
- **Lógica de Intro**: El componente `IntroReveal` detecta bots mediante el *User-Agent* para evitar bloquear el rastreo de contenido y utiliza un flag en `sessionStorage` para mostrarse solo una vez por sesión.
- **Sincronización de Animaciones**: `SmoothScroll` vincula el motor de Lenis con `ScrollTrigger` y el `gsap.ticker` para asegurar que las animaciones basadas en el scroll no pierdan fluidez.
- **Transiciones de Página**: Los componentes utilizan el evento `astro:page-load` para reinicializar scripts de GSAP y Lenis, garantizando compatibilidad con *Astro View Transitions*.
- **Diseño Adaptativo**: La navegación emplea un sistema de "pills" (cápsulas) con efectos de desenfoque (*backdrop-blur*) y bordes sutiles acordes a la estética premium del proyecto.

## Subdirectorios
- `sections/` — Contiene secciones completas de la página (Hero, About, Contact, etc.).
- `ui/` — Componentes atómicos y elementos de diseño base (Botones, Heading, Bordes dorados).