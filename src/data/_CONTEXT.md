# 📁 src/data

## Propósito
Este directorio centraliza la configuración global, el contenido estático y las traducciones del proyecto, funcionando como la "fuente de verdad" (Single Source of Truth) para la identidad visual y los textos del sitio.

## Archivos
| Archivo | Descripción |
|---|---|
| site-config.json | Configuración maestra que contiene branding, navegación, metadatos i18n, datos de contacto y el contenido de todas las secciones del sitio. |

## Relaciones
- **Usa**: Ninguno (archivo de datos estático).
- **Usado por**: Componentes en `src/components/`, layouts en `src/layouts/` y páginas en `src/pages/` para la inyección de contenido y configuración de UI.

## Detalles clave
- **Internacionalización (i18n)**: El archivo gestiona todas las traducciones bajo el objeto `translations.es`, facilitando la escalabilidad a otros idiomas en el futuro.
- **Branding Dinámico**: Define la paleta de colores (Primary, Accent, etc.) y tipografías que deben ser consistentes con la configuración de Tailwind CSS y GSAP.
- **Gestión de Secciones**: Estructura los datos para componentes complejos como `Shows`, `Stats` y `Reviews`, permitiendo actualizar el catálogo de servicios o testimonios sin tocar el código de los componentes.
- **Configuración de Contacto**: Centraliza los destinos de formularios y enlaces directos a WhatsApp y redes sociales.