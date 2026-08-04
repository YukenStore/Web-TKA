import { json, type RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseServer';

function generateSlug(email: string): string {
    const prefix = email.split('@')[0];
    return prefix.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { token } = await request.json();

    cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 minggu
    });

    let slug = '';
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
        const payload = JSON.parse(jsonPayload);
        if (payload.email) {
            slug = generateSlug(payload.email);

            // Simpan ke Supabase
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
                console.error('Gagal simpan ke Supabase di login handler:', error.message);
            } else {
                console.log('User berhasil disimpan ke Supabase di login handler:', payload.email);
            }
        }
    } catch (e) {
        console.error('Gagal parse token saat login:', e);
    }

    return json({ 
        success: true, 
        slug: slug,
        redirectUrl: slug ? `/${slug}` : '/' 
    });
};
