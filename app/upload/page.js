import { AppShell } from "@/components/layout/app-shell";
import { UploadForm } from "@/components/resume/upload-form";
import { getUserSettings } from "@/lib/data";
export default async function UploadPage() {
    const { settings } = await getUserSettings();
    return (<AppShell>
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase text-primary">Resume intake</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Build a sharper application signal.</h1>
        <p className="mt-3 text-muted-foreground">
          Upload a PDF resume, choose the role you are targeting, and add public career context.
        </p>
      </div>
      <UploadForm defaultRole={settings?.default_target_role || "Frontend Developer"}/>
    </AppShell>);
}
