"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parseResumePdf } from "@/lib/pdf/parse";
import { analyzeResume } from "@/lib/openai/analyze";
import { uploadResumeSchema } from "@/lib/validators/analysis";
export async function uploadAndAnalyzeResumeAction(formData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { ok: false, error: "You need to sign in before uploading a resume." };
    }
    const file = formData.get("resume");
    if (!(file instanceof File)) {
        return { ok: false, error: "Please choose a PDF resume." };
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return { ok: false, error: "ResumeOS currently accepts PDF files only." };
    }
    if (file.size > 6 * 1024 * 1024) {
        return { ok: false, error: "Please upload a PDF under 6MB." };
    }
    const fields = uploadResumeSchema.parse({
        targetRole: formData.get("targetRole"),
        linkedinText: String(formData.get("linkedinText") || ""),
        githubUsername: String(formData.get("githubUsername") || ""),
        portfolioUrl: String(formData.get("portfolioUrl") || ""),
        roastMode: formData.get("roastMode") === "on"
    });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, buffer, {
        contentType: "application/pdf",
        upsert: false
    });
    if (uploadError) {
        return { ok: false, error: uploadError.message };
    }
    const { data: resume, error: resumeError } = await supabase
        .from("resumes")
        .insert({
        user_id: user.id,
        file_name: file.name,
        file_path: path,
        target_role: fields.targetRole,
        linkedin_text: fields.linkedinText || null,
        github_username: fields.githubUsername || null,
        portfolio_url: fields.portfolioUrl || null,
        parse_status: "pending"
    })
        .select("id")
        .single();
    if (resumeError || !resume) {
        return { ok: false, error: resumeError?.message || "Could not create resume record." };
    }
    let parsedText;
    try {
        parsedText = await parseResumePdf(buffer);
    }
    catch (error) {
        await supabase
            .from("resumes")
            .update({
            parse_status: "failed",
            parse_error: error instanceof Error ? error.message : "Resume parsing failed."
        })
            .eq("id", resume.id);
        return {
            ok: false,
            error: error instanceof Error ? error.message : "Resume parsing failed."
        };
    }
    await supabase
        .from("resumes")
        .update({
        parsed_text: parsedText,
        parse_status: "parsed",
        parse_error: null
    })
        .eq("id", resume.id);
    try {
        const { analysis, model } = await analyzeResume({
            resumeText: parsedText,
            targetRole: fields.targetRole,
            linkedinText: fields.linkedinText,
            githubUsername: fields.githubUsername,
            portfolioUrl: fields.portfolioUrl,
            roastMode: fields.roastMode
        });
        const { data: analysisRow, error: analysisError } = await supabase
            .from("analyses")
            .insert({
            user_id: user.id,
            resume_id: resume.id,
            target_role: fields.targetRole,
            overall_score: analysis.overall_score,
            ats_score: analysis.ats_score,
            recruiter_summary: analysis.recruiter_summary,
            analysis,
            model,
            roast_mode: fields.roastMode
        })
            .select("id")
            .single();
        if (analysisError || !analysisRow) {
            return { ok: false, error: analysisError?.message || "Could not save analysis." };
        }
        revalidatePath("/dashboard");
        revalidatePath("/history");
        return { ok: true, analysisId: analysisRow.id };
    }
    catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error.message : "AI analysis failed. Please retry."
        };
    }
}
