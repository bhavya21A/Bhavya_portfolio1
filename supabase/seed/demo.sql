insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
)
values (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'demo@resumeos.dev',
  crypt('resumeos123', gen_salt('bf')),
  now(),
  '{"full_name":"Demo Student"}'::jsonb,
  now(),
  now()
)
on conflict (id) do nothing;

insert into public.profiles (id, full_name, email)
values ('11111111-1111-1111-1111-111111111111', 'Demo Student', 'demo@resumeos.dev')
on conflict (id) do update set full_name = excluded.full_name, email = excluded.email;

insert into public.user_settings (user_id, default_target_role, roast_mode_default)
values ('11111111-1111-1111-1111-111111111111', 'Frontend Developer', false)
on conflict (user_id) do update set default_target_role = excluded.default_target_role;

insert into public.resumes (
  id,
  user_id,
  file_name,
  file_path,
  target_role,
  linkedin_text,
  github_username,
  portfolio_url,
  parsed_text,
  parse_status
)
values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'demo-frontend-resume.pdf',
  '11111111-1111-1111-1111-111111111111/demo-frontend-resume.pdf',
  'Frontend Developer',
  'CS student building React projects and looking for a frontend internship.',
  'demo-dev',
  'https://demo.resumeos.dev',
  'Demo resume text for a frontend developer with React, TypeScript, Tailwind, projects, and internship goals.',
  'parsed'
)
on conflict (id) do nothing;

insert into public.analyses (
  id,
  user_id,
  resume_id,
  target_role,
  overall_score,
  ats_score,
  recruiter_summary,
  analysis,
  model,
  roast_mode
)
values (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Frontend Developer',
  78,
  72,
  'Strong early-career frontend profile with clear React direction, but the resume needs more measurable outcomes, accessibility proof, testing signals, and deployment details.',
  '{
    "overall_score": 78,
    "ats_score": 72,
    "strengths": [
      "Clear frontend direction with React, TypeScript, and Tailwind projects.",
      "Project work is relevant to internship and junior frontend roles.",
      "Readable structure with education, skills, and project sections."
    ],
    "weaknesses": [
      "Project bullets need measurable outcomes such as performance, users, or complexity.",
      "Testing, accessibility, and state management signals are too light.",
      "GitHub and portfolio proof should be connected directly to resume bullets."
    ],
    "missing_skills": ["Accessibility", "Unit testing", "React Query", "Performance optimization", "CI/CD", "API integration"],
    "suggested_projects": [
      {
        "title": "Accessible Job Tracker",
        "description": "Build a keyboard-friendly job application tracker with auth, filters, optimistic updates, and analytics.",
        "skills_proven": ["React", "TypeScript", "Accessibility", "Supabase"]
      },
      {
        "title": "Frontend Performance Lab",
        "description": "Create a public case study improving Core Web Vitals on a content-heavy app with before and after metrics.",
        "skills_proven": ["Next.js", "Performance", "Testing"]
      }
    ],
    "rewritten_bullet_points": [
      "Built a responsive React dashboard with reusable TypeScript components, reducing duplicate UI code across 6 screens.",
      "Implemented Supabase auth and row-level protected data flows for a full-stack job tracker used in portfolio demos.",
      "Improved Lighthouse performance from 71 to 93 by optimizing images, reducing client JavaScript, and lazy-loading heavy sections."
    ],
    "recruiter_summary": "Strong early-career frontend profile with clear React direction, but the resume needs more measurable outcomes, accessibility proof, testing signals, and deployment details.",
    "30_day_action_plan": [
      {
        "week": "Week 1",
        "focus": "Resume proof",
        "actions": ["Rewrite every project bullet with action, technology, and measurable result.", "Add live demo and GitHub links beside each project."]
      },
      {
        "week": "Week 2",
        "focus": "Testing signal",
        "actions": ["Add unit tests for the strongest project.", "Mention testing tools and coverage in the project bullet."]
      },
      {
        "week": "Week 3",
        "focus": "Accessibility",
        "actions": ["Run an accessibility audit and fix keyboard navigation.", "Add one bullet describing WCAG-minded UI improvements."]
      },
      {
        "week": "Week 4",
        "focus": "Portfolio polish",
        "actions": ["Publish a case study for the best project.", "Update LinkedIn headline and featured links for the target role."]
      }
    ]
  }'::jsonb,
  'seeded-demo',
  false
)
on conflict (id) do nothing;
