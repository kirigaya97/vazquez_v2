# 📁 src/components/ui

## Propósito
Este directorio contiene los componentes atómicos y fundamentales de la interfaz de usuario. Son piezas reutilizables, agnósticas al contenido específico, encargadas de mantener la consistencia visual y ejecutar las micro-interacciones y animaciones base del proyecto.

## Archivos
| Archivo | Descripción |
|---|---|
| **Button.astro** | Componente de botón polimórfico (renderiza `<a>` o `<button>`) con variantes de estilo: primary, secondary, gold y outline. |
| **CounterVanilla.astro** | Contador numérico animado que utiliza GSAP y ScrollTrigger para incrementar valores cuando el elemento entra en el viewport. |
| **GoldenBorder.astro** | Efecto visual avanzado que dibuja un borde animado mediante Canvas 2D al hacer hover sobre un elemento padre. |
| **Reveal.astro** | Wrapper utilitario para aplicar animaciones de entrada (fade-in y slide-up) a elementos mediante clases de Tailwind. |
| **SectionHeading.astro** | Encabezado estándar para secciones que incluye subtítulo itálico, título principal y una línea decorativa inferior. |

## Relaciones
- **Usa**: GSAP y ScrollTrigger (vía `src/lib/gsap-init.ts`) para las animaciones de los contadores.
- **Usado por**: Componentes de `src/components/sections/` y páginas principales para construir la estructura visual del sitio.

## Detalles clave
- **Interactividad Híbrida**: Combina Tailwind CSS 4 para el estilado declarativo con scripts de cliente (Vanilla JS/GSAP) para animaciones complejas.
- **Optimización de GoldenBorder**: El efecto de borde está restringido a dispositivos desktop (MD+) y utiliza `requestAnimationFrame` para garantizar un rendimiento fluido del canvas sin sobrecargar el hilo principal.
- **Ciclo de Vida Astro**: Los scripts integrados utilizan el evento `astro:page-load` para asegurar que las animaciones se reinicialicen correctamente durante la navegación entre páginas (View Transitions).
- **Polimorfismo**: El componente `Button` decide dinámicamente qué etiqueta HTML usar basándose en la presencia de la prop `href`, mejorando la semántica y accesibilidad.
- **Diseño Visual**: Implementa una estética premium basada en gradientes púrpura, tipografías elegantes y efectos de brillo (shadow-glow).