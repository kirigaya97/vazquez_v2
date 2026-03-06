# 📁 / (Raíz del Proyecto)

## Propósito
Punto de entrada y configuración global del proyecto "Vazquez Ilusionista", gestionando la infraestructura de compilación, las dependencias de animaciones de alto rendimiento y el despliegue en Vercel.

## Archivos
| Archivo | Descripción |
|---|---|
| `astro.config.mjs` | Configuración central de Astro que integra Tailwind CSS 4 vía Vite y el adaptador de Vercel. |
| `package.json` | Define las dependencias del proyecto (GSAP, Lenis, React), scripts de desarrollo y herramientas de mapeo de contexto. |
| `tsconfig.json` | Configuración de TypeScript con soporte para JSX de React y reglas estrictas de Astro. |
| `AI_ROUTER.md` | Documentación de arquitectura y reglas específicas para la navegación y prompts de IA. |
| `README.md` | Guía general del proyecto, instrucciones de configuración y visión técnica. |
| `.env.example` | Plantilla de variables de entorno para servicios externos como Resend. |
| `.gitignore` | Definición de archivos y directorios excluidos del control de versiones. |
| `lighthouse_results.pdf` | Reporte de auditoría de rendimiento, accesibilidad y SEO del sitio. |

## Relaciones
- **Usa**: Astro v5, Tailwind CSS 4, GSAP, Lenis, React, Vercel Adapter.
- **Usado por**: Vercel (para el despliegue), Scripts de automatización en `scripts/`.

## Detalles clave
- **Estilización Moderna**: Utiliza Tailwind CSS v4 a través de su nuevo plugin para Vite, optimizando el tiempo de compilación.
- **Ecosistema de Animación**: Combina GSAP y Motion para microinteracciones con Lenis para el control del scroll global.
- **Arquitectura de Islas**: Configurado para soportar React Islands, permitiendo interactividad selectiva en un entorno principalmente estático.
- **Automatización**: Incluye un sistema propio de mapeo de contexto (`scripts/map-context.mjs`) para facilitar la comprensión del proyecto por herramientas de IA.
- **Despliegue**: Optimizado para el entorno de ejecución de Vercel mediante `@astrojs/vercel`.