-- Run after product_admin_management. All fixtures and policy changes roll back.
begin;
select set_config('furks.test.product_count', (select count(*)::text from public.products), true);

-- Even a future permissive ALL policy cannot weaken the write guards.
create policy test_permissive_products on public.products for all to authenticated using (true) with check (true);

set local role anon;
do $$
begin
  if (select count(*) from public.products) <> current_setting('furks.test.product_count')::bigint then
    raise exception 'Public product reads must remain available';
  end if;
  if has_any_column_privilege('anon', 'public.products', 'INSERT')
    or has_any_column_privilege('anon', 'public.products', 'UPDATE')
    or has_table_privilege('anon', 'public.products', 'DELETE')
    or has_table_privilege('anon', 'public.products', 'TRUNCATE') then
    raise exception 'Anonymous writes must not be granted';
  end if;
  begin
    insert into public.products(name, price) values ('[RLS TEST] anonymous', 100);
    raise exception 'Anonymous insert must fail';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","app_metadata":{},"user_metadata":{"role":"admin"}}', true);
do $$
declare changed bigint;
begin
  if (select count(*) from public.products) <> current_setting('furks.test.product_count')::bigint then
    raise exception 'A normal signed-in visitor must still read the catalog';
  end if;
  begin
    insert into public.products(name, price) values ('[RLS TEST] forged role', 100);
    raise exception 'User metadata must not grant insert access';
  exception when insufficient_privilege then null;
  end;
  update public.products set price = 1;
  get diagnostics changed = row_count;
  if changed <> 0 then raise exception 'Non-admin update must affect zero rows'; end if;
  delete from public.products;
  get diagnostics changed = row_count;
  if changed <> 0 then raise exception 'Non-admin delete must affect zero rows'; end if;
end $$;

select set_config('request.jwt.claims', '{"role":"authenticated","app_metadata":{"role":"admin"}}', true);
do $$
begin
  begin
    insert into public.products(name, price) values ('[RLS TEST] missing subject', 100);
    raise exception 'An admin claim without a user ID must fail';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","is_anonymous":true,"app_metadata":{"role":"admin"}}', true);
do $$
begin
  begin
    insert into public.products(name, price) values ('[RLS TEST] anonymous sign-in', 100);
    raise exception 'Anonymous Auth users must not become administrators';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","app_metadata":{"role":"admin"}}', true);
do $$
declare fixture_id bigint; changed bigint;
begin
  insert into public.products(name, origin, tasting_notes, roast_level, price, in_stock)
    values ('[RLS TEST] owner coffee', 'Brezilya', 'Karamel', 'Orta', 420.50, true)
    returning id into fixture_id;
  update public.products set name = '[RLS TEST] renamed', price = 450.75, in_stock = false where id = fixture_id;
  if not exists (select 1 from public.products where id = fixture_id and name = '[RLS TEST] renamed' and price = 450.75 and in_stock = false) then
    raise exception 'Admin edits must persist';
  end if;
  if has_column_privilege('authenticated', 'public.products', 'id', 'UPDATE')
    or has_column_privilege('authenticated', 'public.products', 'created_at', 'UPDATE')
    or has_table_privilege('authenticated', 'public.products', 'TRUNCATE') then
    raise exception 'System fields and TRUNCATE must remain protected';
  end if;
  delete from public.products where id = fixture_id;
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'An administrator must be able to delete their coffee'; end if;
end $$;

rollback;
select 'PASS: public reads; anon writes denied; user_metadata escalation denied; guards resist permissive policies; missing subject denied; anonymous Auth denied; admin CRUD; system fields protected; fixtures rolled back' as result;
