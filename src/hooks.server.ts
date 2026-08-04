import type { Handle } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseServer';

interface GooglePayload {
    email: string;
    name: string;
    picture: string;
}

function generateSlug(email: string): string {
    const prefix = email.split('@')[0];
    return prefix.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if (session) {
        try {
            const base64Url = session.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
            const payload = JSON.parse(jsonPayload) as GooglePayload;

            const slug = generateSlug(payload.email);

            // Masukkan data user ke Locals
            event.locals.user = {
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                slug: slug
            };

            // Simpan/Update data ke Supabase
            const { error } = await supabase.from('users').upsert(
                { 
                    email: payload.email, 
                    name: payload.name, 
                    picture: payload.picture,
                    last_active: new Date().toISOString()
                },
                { onConflict: 'email' }
            );

            if (error) {
                console.error('❌ Gagal simpan ke Supabase:', error.message);
            } else {
                console.log('✅ User berhasil disimpan/diupdate:', payload.email, 'slug:', slug);
            }

        } catch (err) {
            // Token rusak/kedaluwarsa
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
};