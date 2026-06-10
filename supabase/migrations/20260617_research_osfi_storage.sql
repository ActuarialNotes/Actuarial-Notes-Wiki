-- Private Storage bucket for the raw OSFI P&C regulatory-return dumps.
--
-- These quarterly dumps (CanadianPC_*.txt, ~18 MB each) are the canonical ETL
-- inputs for scripts/etl_osfi.py. They are too large and churn-heavy for git, so
-- they live here instead. scripts/osfi_storage.py pushes/pulls them with the
-- service-role key.
--
-- The bucket is PRIVATE (public = false) and gets NO storage.objects policies on
-- purpose: with RLS enabled and no policy, anon/authenticated clients cannot read
-- or write it, while the service-role key (server-side only) bypasses RLS. That
-- keeps the raw dumps reachable by the maintenance scripts and no one else.

insert into storage.buckets (id, name, public)
values ('osfi-raw', 'osfi-raw', false)
on conflict (id) do nothing;
