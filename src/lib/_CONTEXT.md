# 📁 src/lib

## Propósito
Este directorio centraliza la configuración de librerías de terceros y utilidades core del sistema. Su objetivo es proveer una base técnica unificada para herramientas compartidas, especialmente para el motor de animaciones.

## Archivos
| Archivo | Descripción |
|---|---|
| `gsap-init.ts` | Inicializa y exporta GSAP con el plugin ScrollTrigger registrado, asegurando una instancia única y configurada para el proyecto. |

## Relaciones
- **Usa**: `gsap`, `gsap/ScrollTrigger`.
- **Usado por**: Componentes de la interfaz en `src/components/` que implementan animaciones avanzadas o efectos basados en el scroll.

## Detalles clave
- Centraliza la registración de plugins de GSAP para evitar errores de doble inicialización en el cliente.
- Actúa como el punto de entrada estándar para cualquier lógica de animación compleja dentro del ecosistema Astro.