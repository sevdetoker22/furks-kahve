-- Product content remains publicly readable. Only a verified, non-anonymous
-- administrator may add, edit or remove coffees. No service-role key is needed.
-- Filename matches the applied Supabase migration history version.
begin;

alter table public.products enable row level security;

-- RLS does not protect TRUNCATE; remove the legacy default grants as well.
revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert (name, origin, tasting_notes, roast_level, price, in_stock),
      update (name, origin, tasting_notes, roast_level, price, in_stock)
  on public.products to authenticated;
grant delete on public.products to authenticated;

create policy products_admin_insert on public.products
  for insert to authenticated
  with check (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );
create policy products_admin_update on public.products
  for update to authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  )
  with check (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );
create policy products_admin_delete on public.products
  for delete to authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );

-- Additional permissive policies must not accidentally enable public writes.
create policy products_admin_insert_guard on public.products as restrictive
  for insert to authenticated
  with check (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );
create policy products_admin_update_guard on public.products as restrictive
  for update to authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  )
  with check (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );
create policy products_admin_delete_guard on public.products as restrictive
  for delete to authenticated
  using (
    (select auth.uid()) is not null
    and coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
    and coalesce((select auth.jwt()) ->> 'is_anonymous', 'false') = 'false'
  );

commit;
