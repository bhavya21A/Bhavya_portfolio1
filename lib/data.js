import { createClient } from "@/lib/supabase/server";
export async function getCurrentUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
export async function getDashboardData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { user: null, profile: null, analyses: [] };
    }
    const [{ data: profile }, { data: analyses }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
            .from("analyses")
            .select("*, resumes(file_name,target_role,created_at)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(8)
    ]);
    return {
        user,
        profile,
        analyses: (analyses || [])
    };
}
export async function getAnalysis(id) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("analyses")
        .select("*, resumes(file_name,target_role,created_at)")
        .eq("id", id)
        .single();
    if (error) {
        return null;
    }
    return data;
}
export async function getUserSettings() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { user: null, profile: null, settings: null };
    }
    const [{ data: profile }, { data: settings }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("user_settings").select("*").eq("user_id", user.id).single()
    ]);
    return { user, profile, settings };
}
