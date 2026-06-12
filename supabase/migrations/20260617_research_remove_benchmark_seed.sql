-- Remove the synthetic "seeded" benchmark documents/metrics introduced by the
-- (now-deleted) 20260610_research_benchmark_seed.sql and
-- 20260612_research_lob_seed.sql migrations.
--
-- Those migrations inserted placeholder research_documents rows (mostly
-- marked "ILLUSTRATIVE — replace with confirmed figure...") plus the
-- research_metrics that powered the Benchmarks tab with fake numbers. Real
-- benchmark data will be loaded from verified source filings in batches
-- instead.
--
-- Deleting the documents cascades to research_metrics, research_chunks, and
-- research_project_documents rows that reference them (all declared
-- `on delete cascade`). This is safe to run on a database where the seed
-- migrations never ran (the ids simply won't match anything).

delete from research_documents
where id in (
  '3a5b6e49-77d5-596f-8fc4-6afb94e7457d', -- Aviva Canada 2023 Annual Report
  '80ee830a-86ad-5ad2-8176-27ec299acebd', -- Co-operators General 2023 Annual Report
  'f30d4952-b30d-5a0f-a11a-1c6d2f08a215', -- Desjardins Group 2023 Annual Report
  '95077b84-6a14-5229-af4f-cc1fe98175b9', -- Facts of the P&C Insurance Industry in Canada 2022
  'c07c2f78-67fb-5842-a6f9-7967475725a1', -- Facts of the P&C Insurance Industry in Canada 2023
  'ebf3b879-90db-56fe-8a44-874d6d6de201', -- ICBC Annual Report
  '2bf652a7-8a6e-5519-9953-14d3da10a6e3', -- Intact annual report segment disclosures
  '9ad2873a-7dcc-5211-a065-23c4b8fb4753', -- Intact Q4-2021 results
  'b0186b22-0ba7-51fa-8d2f-90fa18db3dd3', -- Intact Q4-2023 results
  'a7081004-a5d2-513f-8e23-2e75fd0bf7a9', -- Intact Q4-2024 results
  '05138de1-3de5-51d9-a50c-6499a345b941'  -- TD Insurance financial disclosures
);
