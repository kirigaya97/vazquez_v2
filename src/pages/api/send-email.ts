import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import siteConfig from '../../data/site-config.json';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, message, website, _timestamp } = data;

        // --- Anti-spam: Honeypot check ---
        // If the hidden "website" field has any value, it's a bot
        if (website) {
            // Silently return success to not alert the bot
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- Anti-spam: Timestamp check ---
        // If form was submitted in less than 2 seconds, it's likely a bot
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

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // --- Send email via Resend ---
        const destinationEmail = siteConfig.contact.formDestinationEmail;

        const { error } = await resend.emails.send({
            from: 'ChapMagic Web <onboarding@resend.dev>',
            to: [destinationEmail],
            replyTo: email,
            subject: `💌 Nuevo contacto: ${name}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111413; color: #F2F2F2; padding: 40px; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 32px; border-bottom: 1px solid #2A2A2A; padding-bottom: 24px;">
                        <h1 style="color: #9582D9; font-size: 24px; margin: 0;">CHAP<span style="color: #F2F2F2;">MAGIC</span></h1>
                        <p style="color: #D9D0C0; font-size: 12px; letter-spacing: 3px; margin-top: 8px;">NUEVO MENSAJE DE CONTACTO</p>
                    </div>
                    <div style="margin-bottom: 24px;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Nombre</p>
                        <p style="font-size: 18px; margin: 0;">${name}</p>
                    </div>
                    <div style="margin-bottom: 24px;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Email</p>
                        <p style="font-size: 18px; margin: 0;"><a href="mailto:${email}" style="color: #9582D9;">${email}</a></p>
                    </div>
                    <div style="margin-bottom: 24px; padding: 20px; background: #3D3C45; border-radius: 8px; border-left: 3px solid #9582D9;">
                        <p style="color: #9582D9; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Mensaje</p>
                        <p style="font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #2A2A2A;">
                        <p style="color: #D9D0C0; font-size: 11px;">Puedes responder directamente a este email para contactar a ${name}</p>
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
