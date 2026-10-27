-- Preserve the public form's existing INSERT grants and policy.
-- Only server-managed Supabase Auth app_metadata can grant the admin role.
begin;

alter table public.wholesale_requests enable row level security;

revoke select, update, delete on public.wholesale_requests from anon, authenticated;

grant select (
  id, created_at, contact_name, business_name, business_type,
  email, phone, monthly_coffee_need, message
) on public.wholesale_requests to authenticated;

drop policy if exists wholesale_admin_select_guard on public.wholesale_requests;
create policy wholesale_admin_select_guard
  on public.wholesale_requests as restrictive
  for select to anon, authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  );

drop policy if exists wholesale_admin_select on public.wholesale_requests;
create policy wholesale_admin_select
  on public.wholesale_requests
  for select to authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  );

commit;
