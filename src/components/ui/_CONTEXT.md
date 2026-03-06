# 📁 src/components/ui

## Propósito
Este directorio contiene los componentes atómicos y elementos de interfaz reutilizables del proyecto. Se enfoca en proporcionar bloques de construcción visuales con alta fidelidad estética, consistencia de diseño y animaciones integradas.

## Archivos
| Archivo | Descripción |
|---|---|
| Button.astro | Componente polimórfico (botón o enlace) con múltiples variantes visuales (primary, gold, outline) y estados interactivos. |
| CounterVanilla.astro | Contador numérico animado para estadísticas que se activa mediante scroll utilizando GSAP y ScrollTrigger. |
| GoldenBorder.astro | Efecto de borde luminoso animado basado en Canvas que reacciona al hover del mouse, diseñado para elementos destacados en escritorio. |
| Reveal.astro | Wrapper simple para aplicar clases de animación de entrada (fade-in y desplazamiento) a cualquier contenido. |
| SectionHeading.astro | Estructura estandarizada para títulos de sección que incluye subtítulo decorativo, título principal y línea divisoria. |

## Relaciones
- **Usa**: `gsap`, `ScrollTrigger` (vía `src/lib/gsap-init.ts`), Tailwind CSS 4 para utilidades de estilo y animaciones.
- **Usado por**: Componentes de `src/components/sections/` y páginas en `src/pages/` para construir la jerarquía visual del sitio.

## Detalles clave
- **Interactividad Avanzada**: Uso de GSAP para animaciones complejas ligadas al scroll y Canvas API para efectos visuales de alta performance (`GoldenBorder`).
- **Compatibilidad con View Transitions**: Los scripts utilizan el evento `astro:page-load` para asegurar que las animaciones y listeners se reinicialicen correctamente durante la navegación.
- **Polimorfismo**: El componente `Button` detecta automáticamente si debe renderizar una etiqueta `<a>` o `<button>` basándose en la presencia del atributo `href`.
- **Diseño Adaptativo**: Algunos componentes complejos como `GoldenBorder` están restringidos a dispositivos de escritorio (`md:block`) para optimizar el rendimiento en móviles.