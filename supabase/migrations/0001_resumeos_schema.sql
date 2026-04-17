create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  default_target_role text not null default 'Frontend Developer',
  roast_mode_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_default_target_role check (
    default_target_role in (
      'Frontend Developer',
      'Full-Stack Developer',
      'Backend Developer',
      'Software Engineer Intern',
      'React Developer',
      'Node.js Developer'
    )
  )
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  target_role text not null,
  linkedin_text text,
  github_username text,
  portfolio_url text,
  parsed_text text,
  parse_status text not null default 'pending',
  parse_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_target_role check (
    target_role in (
      'Frontend Developer',
      'Full-Stack Developer',
      'Backend Developer',
      'Software Engineer Intern',
      'React Developer',
      'Node.js Developer'
    )
  ),
  constraint valid_parse_status check (parse_status in ('pending', 'parsed', 'failed'))
);

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid not null references public.resumes(id) on delete cascade,
  target_role text not null,
  overall_score integer not null check (overall_score between 0 and 100),
  ats_score integer not null check (ats_score between 0 and 100),
  recruiter_summary text not null,
  analysis jsonb not null,
  model text not null,
  roast_mode boolean not null default false,
  created_at timestamptz not null default now(),
  constraint valid_analysis_target_role check (
    target_role in (
      'Frontend Developer',
      'Full-Stack Developer',
      'Backend Developer',
      'Software Engineer Intern',
      'React Developer',
      'Node.js Developer'
    )
  )
);

create index if not exists resumes_user_created_idx on public.resumes(user_id, created_at desc);
create index if not exists analyses_user_created_idx on public.analyses(user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger user_settings_updated_at
before update on public.user_settings
for each row execute function public.set_updated_at();

create trigger resumes_updated_at
before update on public.resumes
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do update set email = excluded.email;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.resumes enable row level security;
alter table public.analyses enable row level security;

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read own settings"
on public.user_settings for select
using (auth.uid() = user_id);

create policy "Users can upsert own settings"
on public.user_settings for insert
with check (auth.uid() = user_id);

create policy "Users can update own settings"
on public.user_settings for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own resumes"
on public.resumes for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own analyses"
on public.analyses for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 6291456, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Users can upload own resume PDFs"
on storage.objects for insert
with check (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can read own resume PDFs"
on storage.objects for select
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update own resume PDFs"
on storage.objects for update
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own resume PDFs"
on storage.objects for delete
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);
