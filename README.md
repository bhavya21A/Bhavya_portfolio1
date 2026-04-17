# ResumeOS

ResumeOS is a production-style MVP for early-career developers and students. Users upload a resume PDF, choose a target role, optionally add LinkedIn/GitHub/portfolio context, and receive a recruiter-friendly job-readiness dashboard powered by Supabase and OpenAI.

## Stack

- Next.js 15 App Router
- JavaScript
- Tailwind CSS
- shadcn/ui-style components
- Supabase Auth, Postgres, Storage, and RLS
- OpenAI API for structured resume analysis
- PDF parsing with `pdf-parse`

## Features

- Landing page with polished marketing sections
- Email/password sign up and sign in
- Protected dashboard routes
- PDF resume upload to Supabase Storage
- Server-side PDF text extraction
- AI analysis with validated structured JSON
- Target role support for frontend, full-stack, backend, intern, React, and Node.js roles
- Dashboard with scores, progress bars, strengths, weaknesses, missing skills, rewritten bullets, projects, and a 30-day plan
- History page for past analyses
- Settings page with default target role and roast mode
- Dark/light theme toggle
- Seeded demo data for local Supabase

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Create a Supabase project or start Supabase locally. Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Apply the database migration:

```bash
supabase db reset
```

If you are using a hosted Supabase project, run the SQL in `supabase/migrations/0001_resumeos_schema.sql` from the Supabase SQL editor, then optionally run `supabase/seed/demo.sql`.

5. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Account

When the seed file is applied locally:

- Email: `demo@resumeos.dev`
- Password: `resumeos123`

The demo account includes one seeded frontend resume analysis.

## Supabase Notes

The migration creates:

- `profiles`
- `user_settings`
- `resumes`
- `analyses`
- private `resumes` storage bucket
- RLS policies for user-owned profile, settings, resume, analysis, and storage records
- an auth trigger that creates a profile and settings row for new users

Uploaded files are stored under:

```text
resumes/{user_id}/{generated-id}-{file-name}.pdf
```

## AI Analysis Contract

The OpenAI call is made only on the server. The response is parsed as JSON and validated with Zod before it is stored.

Expected shape:

```json
{
  "overall_score": 0,
  "ats_score": 0,
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggested_projects": [
    {
      "title": "",
      "description": "",
      "skills_proven": []
    }
  ],
  "rewritten_bullet_points": [],
  "recruiter_summary": "",
  "30_day_action_plan": [
    {
      "week": "",
      "focus": "",
      "actions": []
    }
  ]
}
```

## Project Structure

```text
app/
  auth/sign-in
  auth/sign-up
  dashboard
  upload
  analysis/[id]
  history
  settings
components/
  auth
  dashboard
  landing
  layout
  resume
  ui
lib/
  actions
  openai
  pdf
  supabase
  validators
supabase/
  migrations
  seed
```

## Useful Commands

```bash
npm run dev
npm run build
```

## Optional Improvements

- Fetch public GitHub profile and repository signals through the GitHub API.
- Generate a downloadable PDF report from the analysis dashboard.
- Add a public share page with signed, expiring links.
- Add background jobs for large PDFs and slower AI analysis.
- Store analysis prompt versions for longitudinal comparison.
