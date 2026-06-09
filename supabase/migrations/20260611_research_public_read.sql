-- The /research page is publicly routable (no auth guard) and the corpus
-- reference tables hold only public regulatory/financial data — regulator
-- filings, insurer disclosures, industry benchmarks. The original policies
-- required auth.role() = 'authenticated', so logged-out / private-browsing
-- visitors saw an empty corpus (0 documents, 0 metrics) even though the rows
-- exist. Allow anonymous read in addition to authenticated.
--
-- Writes remain service-role only (the ingestion edge functions bypass RLS),
-- and the user-owned research_alert_subscriptions table is intentionally left
-- authenticated/owner-only — it is NOT touched here.

drop policy if exists "authenticated users can read agents" on research_agents;
drop policy if exists "authenticated users can read documents" on research_documents;
drop policy if exists "authenticated users can read metrics" on research_metrics;
drop policy if exists "authenticated users can read chunks" on research_chunks;
drop policy if exists "authenticated users can read relationships" on research_relationships;

create policy "public can read agents" on research_agents
  for select to anon, authenticated using (true);
create policy "public can read documents" on research_documents
  for select to anon, authenticated using (true);
create policy "public can read metrics" on research_metrics
  for select to anon, authenticated using (true);
create policy "public can read chunks" on research_chunks
  for select to anon, authenticated using (true);
create policy "public can read relationships" on research_relationships
  for select to anon, authenticated using (true);
