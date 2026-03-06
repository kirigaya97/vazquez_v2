# 📁 src/pages

## Propósito
Este directorio actúa como el motor de enrutamiento basado en el sistema de archivos de Astro, definiendo las páginas públicas del sitio y los puntos de entrada para la lógica del servidor (API).

## Archivos
| Archivo | Descripción |
|---|---|
| `index.astro` | Punto de entrada principal; orquesta la landing page integrando todas las secciones del portafolio. |
| `privacy.astro` | Página de Políticas de Privacidad que renderiza secciones legales de forma dinámica. |
| `terms.astro` | Página de Términos y Condiciones con estructura consistente para contenido legal. |
| `api/` | Subdirectorio que contiene los endpoints del lado del servidor, como el envío de correos. |

## Relaciones
- **Usa**: `src/layouts/BaseLayout.astro`, `src/components/`, `src/data/site-config.json`, `src/lib/`.
- **Usado por**: Astro Framework (para la generación de rutas estáticas y dinámicas).

## Detalles clave
- **Estructura de Layout**: Todas las páginas utilizan `BaseLayout` para garantizar consistencia en el SEO, metadatos y estilos globales.
- **Gestión de Contenido**: La lógica de visualización depende fuertemente de `site-config.json` para las traducciones y la configuración de contacto.
- **Interactividad Global**: La página principal integra componentes críticos de UX como `SmoothScroll` (Lenis) y `WhatsAppButton`.
- **Patrón de Animación**: Se observa el uso recurrente de la clase `reveal` en las páginas legales, vinculada probablemente a disparadores de GSAP o Motion para animaciones de entrada.
- **Enrutamiento API**: El subdirectorio `api/` gestiona funciones serverless (como `send-email.ts`) compatibles con el despliegue en Vercel.