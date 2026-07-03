-- ============================================================
-- Orphans World Foundation — Events Widget Setup
-- Run this in: Supabase > SQL Editor
-- ============================================================

create type event_status as enum ('active', 'paused', 'completed');

create table if not exists events (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  date           timestamptz not null,
  location       text,
  image_url      text,
  target_amount  numeric(12,2) not null default 0,
  current_amount numeric(12,2) not null default 0,
  status         event_status not null default 'active',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at_events()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_events_updated_at
before update on events
for each row execute procedure update_updated_at_events();

-- RLS
alter table events enable row level security;

-- Public can only read active events whose date has not passed
create policy "public_read_active_events" on events
  for select using (
    status = 'active'
    and date >= now()
  );

-- Authenticated admin can do everything
create policy "admin_all_events" on events
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
