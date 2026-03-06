# 📁 src/components

## Propósito
Este directorio contiene los componentes fundamentales de la interfaz de usuario, gestionando la navegación global, la experiencia de carga inicial y las utilidades de interacción y desplazamiento suave.

## Archivos
| Archivo | Descripción |
|---|---|
| `IntroReveal.astro` | Pantalla de bienvenida con video (sombras) y botón de entrada; gestiona el desbloqueo de audio y usa persistencia de sesión. |
| `Navbar.astro` | Cabecera fija con diseño de "pill" para desktop y menú overlay animado para dispositivos móviles. |
| `SmoothScroll.astro` | Integración de la librería Lenis para desplazamiento suave, sincronizada con el ticker de GSAP. |
| `WhatsAppButton.astro` | Botón flotante de contacto directo que formatea el número y mensaje para la API de WhatsApp. |

## Relaciones
- **Usa**: GSAP (`../lib/gsap-init`), Lenis, `site-config.json`, componentes de `ui/` (como `Button.astro`).
- **Usado por**: Principalmente por `BaseLayout.astro` para envolver todas las páginas del sitio.

## Detalles clave
- **Persistencia**: `IntroReveal` utiliza `sessionStorage` para asegurar que el usuario solo vea la animación de entrada una vez por sesión de navegación.
- **Rendimiento**: `SmoothScroll` desactiva Lenis en dispositivos táctiles de forma nativa para evitar conflictos con el scroll del sistema y utiliza el ticker de GSAP para las actualizaciones de frame.
- **Accesibilidad**: Se incluyen detecciones de `userAgent` para omitir el overlay de introducción en bots/crawlers y se respeta la preferencia de `prefers-reduced-motion`.
- **Navegación**: El `Navbar` implementa una lógica de visibilidad basada en el scroll (se oculta en el top, aparece al bajar) y soporta scroll suave para enlaces internos (hashes).

## Subdirectorios
- **sections/**: Contiene los bloques de contenido de la página principal (9 archivos).
- **ui/**: Componentes atómicos y elementos de diseño base (5 archivos).