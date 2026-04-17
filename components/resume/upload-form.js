"use client";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { uploadAndAnalyzeResumeAction } from "@/lib/actions/resume";
import { TARGET_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const stages = [
    "Uploading PDF",
    "Extracting resume text",
    "Running AI analysis",
    "Building dashboard"
];
export function UploadForm({ defaultRole = "Frontend Developer" }) {
    const router = useRouter();
    const formRef = useRef < HTMLFormElement > (null);
    const [fileName, setFileName] = useState("");
    const [targetRole, setTargetRole] = useState(defaultRole);
    const [stage, setStage] = useState(0);
    const [isPending, startTransition] = useTransition();
    function submit(formData) {
        formData.set("targetRole", targetRole);
        setStage(0);
        const timer = window.setInterval(() => {
            setStage((current) => Math.min(current + 1, stages.length - 1));
        }, 1800);
        startTransition(async () => {
            const result = await uploadAndAnalyzeResumeAction(formData);
            window.clearInterval(timer);
            if (!result.ok) {
                toast.error(result.error);
                setStage(0);
                return;
            }
            toast.success("Resume analysis is ready.");
            router.push(`/analysis/${result.analysisId}`);
        });
    }
    return (<Card className="shadow-panel">
      <CardHeader>
        <CardTitle>Upload resume</CardTitle>
        <CardDescription>PDF only. Add extra context for sharper feedback.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={submit} className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-8 text-center transition-colors hover:bg-muted/50">
              <UploadCloud className="h-10 w-10 text-primary"/>
              <span className="mt-4 text-lg font-semibold">
                {fileName || "Drop your resume PDF here"}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                Recruiter-friendly PDFs with selectable text work best.
              </span>
              <Input name="resume" type="file" accept="application/pdf" required className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}/>
              {fileName && (<span className="mt-5 inline-flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm">
                  <FileText className="h-4 w-4"/>
                  {fileName}
                </span>)}
            </label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Target role</Label>
                <Select value={targetRole} onValueChange={setTargetRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_ROLES.map((role) => (<SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUsername">GitHub username</Label>
                <Input id="githubUsername" name="githubUsername" placeholder="octocat"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input id="portfolioUrl" name="portfolioUrl" placeholder="https://your.dev"/>
              </div>
              <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
                <input name="roastMode" type="checkbox" className="h-4 w-4 accent-primary"/>
                Roast mode: sharper feedback
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinText">LinkedIn summary or profile text</Label>
            <Textarea id="linkedinText" name="linkedinText" placeholder="Paste your About section, headline, experience snippets, or recruiter-facing summary."/>
          </div>

          {isPending && (<div className="rounded-lg border bg-muted/40 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span>{stages[stage]}</span>
                <span>{Math.min(95, 25 + stage * 23)}%</span>
              </div>
              <Progress value={Math.min(95, 25 + stage * 23)}/>
            </div>)}

          <Button size="lg" disabled={isPending} className="w-full sm:w-auto">
            {isPending && <Loader2 className="h-4 w-4 animate-spin"/>}
            Analyze resume
          </Button>
        </form>
      </CardContent>
    </Card>);
}
