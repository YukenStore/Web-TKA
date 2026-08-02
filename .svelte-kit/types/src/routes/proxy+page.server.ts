// @ts-nocheck
import { supabaseServer } from "$lib/supabaseServer";
import type { PageServerLoad } from './$types';

export const load = async () => {
  const { data, error } = await supabaseServer
    .from("nama-tabel")
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return { testing: [] };
  }

  return {
    testing: data ?? [],
  };
};;null as any as PageServerLoad;