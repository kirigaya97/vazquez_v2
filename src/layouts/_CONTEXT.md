# 📁 src/layouts

## Propósito
Este directorio contiene los componentes de estructura base que definen el esqueleto HTML, la configuración de SEO y los comportamientos globales de la interfaz de usuario para todas las páginas del sitio.

## Archivos
| Archivo | Descripción |
|---|---|
| BaseLayout.astro | Componente raíz que centraliza el head HTML, metadatos SEO, fuentes, estilos globales y la lógica compartida de animaciones y cursor personalizado. |

## Relaciones
- **Usa**: `astro:transitions` (ClientRouter), `../components/IntroReveal.astro`, `../styles/global.css`, `../lib/gsap-init.ts`.
- **Usado por**: `src/pages/index.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`.

## Detalles clave
- Utiliza `ClientRouter` de Astro para habilitar transiciones suaves entre páginas manteniendo el estado de los scripts globales.
- Implementa un sistema de cursor personalizado (punto y anillo) mediante GSAP que detecta dispositivos con `pointer: fine` y reacciona a elementos interactivos.
- Gestiona animaciones de revelado automáticas para elementos con la clase `.reveal` usando `ScrollTrigger`.
- Incluye lógica de accesibilidad que desactiva animaciones si el usuario tiene activada la preferencia `prefers-reduced-motion`.
- Centraliza la carga optimizada de fuentes de Google Fonts (Inter y Playfair Display) con técnicas de precarga y fallback.