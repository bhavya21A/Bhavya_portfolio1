import { SettingsForm } from "@/components/resume/settings-form";
import { AppShell } from "@/components/layout/app-shell";
import { getUserSettings } from "@/lib/data";
export default async function SettingsPage() {
    const { user, profile, settings } = await getUserSettings();
    return (<AppShell>
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase text-primary">Settings</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Tune your default analysis.</h1>
        <p className="mt-3 text-muted-foreground">
          Keep your profile clean and set role defaults for faster uploads.
        </p>
      </div>
      <SettingsForm email={user?.email || ""} fullName={profile?.full_name || ""} defaultRole={settings?.default_target_role || "Frontend Developer"} roastMode={Boolean(settings?.roast_mode_default)}/>
    </AppShell>);
}
