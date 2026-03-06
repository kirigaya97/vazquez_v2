# 📁 src/pages/api

## Propósito
Este directorio contiene los endpoints de la API del proyecto, gestionando la lógica del lado del servidor (SSR) para funcionalidades interactivas como el procesamiento de formularios y servicios de terceros.

## Archivos
| Archivo | Descripción |
|---|---|
| `send-email.ts` | Endpoint POST que procesa el formulario de contacto, aplica medidas anti-spam y envía correos electrónicos mediante Resend. |

## Relaciones
- **Usa**: `resend` (SDK de envíos), `../../data/site-config.json` (para obtener el email de destino).
- **Usado por**: Componentes de frontend que contienen el formulario de contacto (ej. `Contact.astro`).

## Detalles clave
- **Renderizado**: Configurado como `prerender = false`, lo que requiere un entorno de ejecución dinámico (SSR) en Vercel.
- **Seguridad Anti-spam**: Implementa una técnica de *honeypot* (campo `website`) y una validación de tiempo de envío (`_timestamp`) para filtrar bots.
- **Validación y Sanitización**: Valida campos obligatorios y formato de email, además de escapar caracteres HTML para prevenir inyecciones.
- **Marca**: Genera correos con una plantilla HTML personalizada que respeta la identidad visual del proyecto (colores y tipografías).