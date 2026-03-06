# 📁 src/styles

## Propósito
Este directorio centraliza la identidad visual y el sistema de diseño del proyecto, definiendo los tokens de Tailwind CSS 4, los estilos base del documento y las animaciones personalizadas que crean la atmósfera de misterio e ilusionismo.

## Archivos
| Archivo | Descripción |
|---|---|
| global.css | Punto de entrada principal que configura el tema de Tailwind, define la paleta de colores "Mystery", tipografías, estilos de scrollbar y efectos visuales complejos para el Hero. |

## Relaciones
- **Usa**: `tailwindcss` (v4 vía @import).
- **Usado por**: `src/layouts/BaseLayout.astro` para aplicar los estilos globales a todo el sitio.

## Detalles clave
- **Tailwind 4 @theme**: Utiliza la nueva sintaxis de variables CSS para definir tokens de diseño como los colores (Purple/Mystery palette), fuentes (Playfair Display/Inter) y espaciados personalizados.
- **Atmósfera Visual**: Implementa un fondo de ruido dinámico (`hero-noise-bg`) mediante un patrón SVG con animación de vibración (jitter) para añadir textura táctil.
- **Animaciones CSS**: Incluye lógica de transformación 3D para el símbolo central y efectos de resplandor pulsante (`hero-trigger-glow`) optimizados para composición por GPU.
- **UX & Scroll**: Define una barra de desplazamiento personalizada con degradados púrpura y aplica `overflow-x: clip` en el body para asegurar la estabilidad visual durante las animaciones de entrada.