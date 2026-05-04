-- Seren website waitlist table.
-- Run this in Supabase SQL editor if you want website emails saved to Supabase.

create table if not exists public.website_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'seren-website',
  created_at timestamptz not null default now()
);

alter table public.website_waitlist enable row level security;

drop policy if exists "Anyone can join website waitlist" on public.website_waitlist;
create policy "Anyone can join website waitlist"
on public.website_waitlist for insert
with check (
  email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
);

-- For production, a server-only SUPABASE_SERVICE_ROLE_KEY is still stronger.
-- The anon-key policy above is fine for the early simple waitlist form.
