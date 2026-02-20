import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import siteConfig from '../../data/site-config.json';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, message, website, _timestamp } = data;

        // --- Anti-spam: Honeypot check ---
        if (website) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- Anti-spam: Timestamp check ---
        const submissionTime = Date.now() - Number(_timestamp);
        if (submissionTime < 2000) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- Validation ---
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- Sanitization ---
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);

        // --- Send email via Resend ---
        const destinationEmail = siteConfig.contact.formDestinationEmail;

        const { error } = await resend.emails.send({
            from: 'Vazquez Ilusionista <web@vazquezilusionista.com.ar>',
            to: [destinationEmail],
            replyTo: email,
            subject: `💌 Nuevo contacto: ${safeName}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111413; color: #F2F2F2; padding: 40px; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 32px; border-bottom: 1px solid #2A2A2A; padding-bottom: 24px;">
                        <h1 style="color: #9582D9; font-size: 24px; margin: 0; font-family: 'Playfair Display', serif;">FERNANDO<span style="color: #F2F2F2;">VAZQUEZ</span></h1>
                        <p style="color: #9582D9; font-size: 11px; letter-spacing: 3px; margin-top: 8px;">NUEVO MENSAJE DE CONTACTO</p>
                    </div>
                    <div style="margin-bottom: 24px;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Nombre</p>
                        <p style="font-size: 18px; margin: 0;">${safeName}</p>
                    </div>
                    <div style="margin-bottom: 24px;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Email</p>
                        <p style="font-size: 18px; margin: 0;"><a href="mailto:${safeEmail}" style="color: #9582D9;">${safeEmail}</a></p>
                    </div>
                    <div style="margin-bottom: 24px; padding: 20px; background: #3D3C45; border-radius: 8px; border-left: 3px solid #9582D9;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Mensaje</p>
                        <p style="font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
                    </div>
                    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #2A2A2A;">
                        <p style="color: #D9D9D9; font-size: 11px;">Puedes responder directamente a este email para contactar a ${safeName}</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return new Response(JSON.stringify({ error: 'Failed to send email' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Server error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
