# 📁 /

## Propósito
Directorio raíz del proyecto "Vázquez Ilusionista", un sitio web de alto rendimiento desarrollado con Astro v5. Actúa como el centro de configuración para el despliegue en Vercel, la gestión de dependencias y la integración de herramientas de diseño y animación.

## Archivos
| Archivo | Descripción |
|---|---|
| `astro.config.mjs` | Configuración principal de Astro, incluyendo el adaptador de Vercel y el plugin de Vite para Tailwind CSS 4. |
| `package.json` | Definición de dependencias, scripts de automatización (Astro, mapeo de contexto) y metadatos del proyecto. |
| `tsconfig.json` | Configuración de TypeScript con soporte estricto para Astro y tipado de React para componentes interactivos. |
| `.env.example` | Plantilla de variables de entorno para servicios externos como Resend. |
| `.gitignore` | Definición de archivos y directorios excluidos del control de versiones. |
| `README.md` | Documentación general y guía de inicio rápido del proyecto. |

## Relaciones
- **Usa**: Astro v5, Tailwind CSS 4, Vercel Adapter, GSAP, Lenis, Resend.
- **Usado por**: El entorno de ejecución de Vercel y los procesos de desarrollo local.

## Detalles clave
- **Arquitectura de Animación**: Combina GSAP para secuencias visuales y Lenis para scroll suave, configurados globalmente.
- **Estilizado Moderno**: Implementa Tailwind CSS 4 mediante su nuevo plugin oficial para Vite, eliminando la necesidad de archivos de configuración CSS complejos.
- **Infraestructura de Datos**: El proyecto incluye scripts personalizados en el directorio `scripts/` para la generación automática de contexto y optimización de assets.
- **Integración de React**: Configurado para soportar "Hydration" de componentes React (Islands Architecture) dentro del ecosistema Astro.