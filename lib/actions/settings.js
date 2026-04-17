"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
export async function updateSettingsAction(formData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Not signed in." };
    }
    const fullName = String(formData.get("fullName") || "");
    const defaultRole = String(formData.get("defaultRole") || "Frontend Developer");
    const roastMode = formData.get("roastMode") === "on";
    const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);
    const { error: settingsError } = await supabase
        .from("user_settings")
        .upsert({
        user_id: user.id,
        default_target_role: defaultRole,
        roast_mode_default: roastMode
    });
    if (profileError || settingsError) {
        return { error: profileError?.message || settingsError?.message || "Could not save settings." };
    }
    revalidatePath("/settings");
    return { success: true };
}
