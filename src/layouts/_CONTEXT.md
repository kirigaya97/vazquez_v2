# 📁 src/layouts

## Propósito
Define la estructura base y el shell HTML global del sitio, centralizando la configuración de SEO, la carga optimizada de recursos y los sistemas de interacción global como el cursor y las animaciones de scroll.

## Archivos
| Archivo | Descripción |
|---|---|
| `BaseLayout.astro` | Layout principal que gestiona el head, SEO, pre-carga de imágenes LCP, fuentes de Google, y la lógica global de GSAP para el cursor y revelado de elementos. |

## Relaciones
- **Usa**: `astro:transitions` (ClientRouter), `astro:assets`, `../components/IntroReveal.astro`, `../styles/global.css`, `../lib/gsap-init` (GSAP, ScrollTrigger).
- **Usado por**: `src/pages/index.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`.

## Detalles clave
- **Optimización LCP**: Implementa pre-carga dinámica de la imagen principal del Hero (`hero_foreground.png`) procesada mediante `getImage` para mejorar métricas de Core Web Vitals.
- **Cursor Interactivo**: Sistema de cursor personalizado (punto y anillo) desarrollado con GSAP que reacciona a elementos con `data-cursor="magic"` y estados de hover en botones/links.
- **Scroll Reveal**: Lógica global que anima automáticamente cualquier elemento con la clase `.reveal` al entrar en el viewport, respetando la configuración de `prefers-reduced-motion` del usuario.
- **Ciclo de vida Astro**: Los scripts están vinculados al evento `astro:page-load` para garantizar que el cursor y las animaciones se reinicialicen correctamente tras la navegación entre páginas.
- **Estrategia de Fuentes**: Carga optimizada de "Inter" y "Playfair Display" mediante `preload` para evitar cambios bruscos de maquetación (Layout Shift).