# 📁 src/data

## Propósito
Este directorio centraliza la configuración global, la identidad visual y todo el contenido textual del sitio. Actúa como la "única fuente de verdad" para facilitar el mantenimiento de textos, enlaces y parámetros de marca sin modificar la estructura de los componentes.

## Archivos
| Archivo | Descripción |
|---|---|
| `site-config.json` | Configuración maestra que contiene branding, navegación, información de contacto, redes sociales y todas las traducciones de las secciones del sitio. |

## Relaciones
- **Usa**: No aplica (archivo de datos estáticos).
- **Usado por**: Componentes en `src/components/`, layouts en `src/layouts/` y páginas en `src/pages/` para renderizar contenido dinámico y aplicar estilos de marca.

## Detalles clave
- **Esquema de Color y Tipografía**: Define los tokens de diseño (primary, accent, fonts) que deben respetarse en la implementación de Tailwind.
- **Internacionalización (i18n)**: Aunque actualmente se centra en español (`es`), la estructura está preparada para soportar múltiples idiomas dentro del objeto `translations`.
- **Gestión de Secciones**: Cada sección del sitio (Hero, Shows, Reviews, Stats, etc.) tiene su propio objeto de contenido, permitiendo actualizaciones rápidas de textos o imágenes.
- **Datos Estructurados**: Almacena información crítica como números de WhatsApp, correos de destino de formularios y metadatos SEO.
- **Contenido Legal**: Incluye los textos para las páginas de Privacidad y Términos, asegurando consistencia legal en todo el sitio.