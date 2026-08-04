import { supabase } from '$lib/supabaseServer';
import type { PageServerLoad } from './$types';

export interface UserData {
    email: string;
    name: string;
    picture: string;
    last_active: string;
    isOnline: boolean;
}

export const load: PageServerLoad = async () => {
    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('last_active', { ascending: false });

    const now = new Date();
    
    const usersWithStatus: UserData[] = (users || []).map((user: any) => {
        const lastActive = new Date(user.last_active);
        const diffInMs = now.getTime() - lastActive.getTime();
        
        return {
            email: user.email ?? '',
            name: user.name ?? '',
            picture: user.picture ?? '',
            last_active: user.last_active ?? new Date().toISOString(),
            isOnline: diffInMs < 300000
        };
    });

    return { users: usersWithStatus };
};