# 📁 src/pages/api

## Propósito
Contiene los endpoints de servidor (API Routes) de Astro encargados de procesar lógica dinámica y comunicaciones del lado del servidor, como el envío de correos electrónicos y validaciones de formularios.

## Archivos
| Archivo | Descripción |
|---|---|
| `send-email.ts` | Endpoint POST que gestiona el envío de correos de contacto utilizando el servicio Resend, incluyendo validación, saneamiento y protección anti-spam. |

## Relaciones
- **Usa**: `resend` (SDK de correo), `src/data/site-config.json` (configuración del destinatario), Variables de entorno (`RESEND_API_KEY`).
- **Usado por**: Componentes de interfaz que contienen formularios de contacto (como `Contact.astro`).

## Detalles clave
- **Seguridad Anti-spam**: Implementa una técnica de *honeypot* (campo `website`) y una validación de tiempo de envío (`_timestamp`) para bloquear bots.
- **Saneamiento**: Incluye una función `escapeHtml` personalizada para limpiar las entradas del usuario y prevenir inyecciones de código en los correos enviados.
- **SSR Requerido**: El archivo tiene `prerender = false`, lo que significa que se ejecuta exclusivamente en el servidor al momento de la solicitud (necesario para manejar secretos y procesos dinámicos).
- **Plantilla Visual**: Genera correos electrónicos con una estructura HTML estilizada que mantiene la identidad visual de la marca (colores y tipografía).