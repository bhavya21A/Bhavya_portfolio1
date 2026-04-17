import { z } from "zod";
export const analysisSchema = z.object({
    overall_score: z.number().int().min(0).max(100),
    ats_score: z.number().int().min(0).max(100),
    strengths: z.array(z.string().min(4)).min(1),
    weaknesses: z.array(z.string().min(4)).min(1),
    missing_skills: z.array(z.string().min(2)),
    suggested_projects: z.array(z.object({
        title: z.string().min(3),
        description: z.string().min(20),
        skills_proven: z.array(z.string().min(2)).min(1)
    })),
    rewritten_bullet_points: z.array(z.string().min(10)),
    recruiter_summary: z.string().min(40),
    "30_day_action_plan": z.array(z.object({
        week: z.string().min(3),
        focus: z.string().min(5),
        actions: z.array(z.string().min(8)).min(1)
    })).length(4)
});
export const uploadResumeSchema = z.object({
    targetRole: z.enum([
        "Frontend Developer",
        "Full-Stack Developer",
        "Backend Developer",
        "Software Engineer Intern",
        "React Developer",
        "Node.js Developer"
    ]),
    linkedinText: z.string().max(12000).optional(),
    githubUsername: z.string().max(80).optional(),
    portfolioUrl: z.string().max(240).optional(),
    roastMode: z.boolean().default(false)
});
