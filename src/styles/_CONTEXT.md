# 📁 src/styles

## Propósito
Este directorio centraliza la identidad visual y los estilos globales del proyecto. Define la configuración base de Tailwind CSS 4, la paleta de colores temática y las animaciones complejas de bajo nivel que no se gestionan mediante librerías de JS.

## Archivos
| Archivo | Descripción |
|---|---|
| `global.css` | Punto de entrada principal de estilos; define variables de tema, capas base, estilos de scrollbar y animaciones personalizadas (GPU-accelerated). |

## Relaciones
- **Usa**: Tailwind CSS 4 (vía `@import "tailwindcss"`), Google Fonts (Playfair Display e Inter).
- **Usado por**: `src/layouts/BaseLayout.astro` (generalmente importado en el layout principal para aplicarse a todo el sitio).

## Detalles clave
- **Tailwind CSS 4**: Utiliza la nueva directiva `@theme` para definir tokens de diseño como colores corporativos (paleta de púrpuras y misterio) y escalas de espaciado personalizadas.
- **Optimización de Animaciones**: Incluye animaciones críticas para el Hero (ruido de fondo, efectos 3D y pulsos de brillo) utilizando propiedades transform y opacity para asegurar el renderizado por GPU.
- **Consistencia Visual**: Define variables específicas para el ecosistema "Vazquez Ilusionista", incluyendo una scrollbar personalizada y fuentes tipográficas que refuerzan la estética de magia y elegancia.
- **Layout Base**: Configura el comportamiento fundamental de `html` y `body` para prevenir desbordamientos horizontales (`overflow-x: clip`) y asegurar la integración con Lenis (Smooth Scroll).