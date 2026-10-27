-- Runs against the existing table. All fixture inserts and role changes roll back.
begin;
select set_config('furks.test.expected_count', (select count(*)::text from public.wholesale_requests), true);

set local role anon;
do $$
begin
  begin
    perform id from public.wholesale_requests limit 1;
    raise exception 'Anonymous visitors must not read wholesale requests';
  exception when insufficient_privilege then
    null;
  end;
end $$;

insert into public.wholesale_requests (
  contact_name, business_name, business_type, email, phone,
  monthly_coffee_need, message, kvkk_accepted
) values (
  'RLS Test', '[RLS TEST] temporary fixture', 'Kafe', 'rls-test@example.com',
  '+1 202 555 0100', 'between_5_20', 'This test insert will be rolled back.', true
);

reset role;
set local role authenticated;
select set_config('request.jwt.claims',
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","app_metadata":{},"user_metadata":{"role":"admin"}}', true);
do $$
begin
  if exists (select 1 from public.wholesale_requests) then
    raise exception 'A regular user or forged user_metadata must not read requests';
  end if;
end $$;

select set_config('request.jwt.claims',
  '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","app_metadata":{"role":"admin"}}', true);
do $$
declare actual_count bigint;
begin
  select count(id) into actual_count from public.wholesale_requests;
  if actual_count <> current_setting('furks.test.expected_count')::bigint + 1 then
    raise exception 'An administrator must be able to read all requests';
  end if;
  if has_any_column_privilege('authenticated', 'public.wholesale_requests', 'UPDATE')
    or has_table_privilege('authenticated', 'public.wholesale_requests', 'DELETE') then
    raise exception 'The admin dashboard must not grant update or delete access';
  end if;
end $$;

rollback;
select 'PASS: anon read denied; public insert preserved; regular user denied; user_metadata escalation denied; admin read allowed; update/delete denied; fixtures rolled back' as result;
