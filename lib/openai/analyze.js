import OpenAI from "openai";
import { analysisSchema } from "@/lib/validators/analysis";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
function extractJson(content) {
    const trimmed = content.trim();
    if (trimmed.startsWith("{")) {
        return trimmed;
    }
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) {
        throw new Error("AI response did not include valid JSON.");
    }
    return match[0];
}
export async function analyzeResume(input) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is missing.");
    }
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const tone = input.roastMode
        ? "Be direct and sharper than usual, but stay useful, professional, and non-insulting."
        : "Be encouraging, specific, and recruiter-realistic.";
    const response = await client.chat.completions.create({
        model,
        temperature: 0.25,
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: `You are ResumeOS, a senior technical recruiter and engineering mentor for early-career developers. Return only strict JSON. ${tone}`
            },
            {
                role: "user",
                content: `
Analyze this resume for the target role: ${input.targetRole}.

Return this exact JSON shape:
{
  "overall_score": number from 0 to 100,
  "ats_score": number from 0 to 100,
  "strengths": string[],
  "weaknesses": string[],
  "missing_skills": string[],
  "suggested_projects": [{"title": string, "description": string, "skills_proven": string[]}],
  "rewritten_bullet_points": string[],
  "recruiter_summary": string,
  "30_day_action_plan": [{"week": string, "focus": string, "actions": string[]}]
}

Rules:
- Make feedback practical and specific to the target role.
- Mention exact missing keywords, measurable outcomes, and proof gaps.
- Suggested projects must be portfolio-ready and realistic in 2-4 weeks.
- Rewritten bullets should be stronger versions of likely resume bullets, with metrics where reasonable.
- The 30 day plan must contain exactly 4 weekly items.
- Do not invent employers, degrees, dates, certifications, or private GitHub facts.
- If GitHub or portfolio context is thin, say what signals should be added.

LinkedIn text:
${input.linkedinText || "Not provided"}

GitHub username:
${input.githubUsername || "Not provided"}

Portfolio URL:
${input.portfolioUrl || "Not provided"}

Resume text:
${input.resumeText.slice(0, 30000)}
`
            }
        ]
    });
    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error("AI analysis returned an empty response.");
    }
    const parsed = JSON.parse(extractJson(content));
    const analysis = analysisSchema.parse(parsed);
    return { analysis, model };
}
