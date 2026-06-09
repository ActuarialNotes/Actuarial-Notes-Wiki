-- Add line-of-business-segmented benchmark metrics so the LOB filter in the
-- Benchmarks tab returns real data.  All values are ILLUSTRATIVE starter
-- figures drawn from IBC Facts Book trend ranges; replace with confirmed
-- figures as filings are ingested.
--
-- IBC combined ratios by LOB (FY2021-2023) use the existing IBC documents:
--   95077b84  IBC Facts Book 2022
--   c07c2f78  IBC Facts Book 2023
--
-- Intact LOB breakdowns use the existing Intact documents:
--   9ad2873a  Intact Q4-2021 results
--   b0186b22  Intact Q4-2023 results
--   a7081004  Intact Q4-2024 results

insert into research_metrics
  (document_id, agent_id, metric_name, value, unit, period, line_of_business, source_page, source_text, confidence)
values
  -- ── IBC industry combined ratio by LOB ──────────────────────────────────────
  -- personal_auto
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 98.5,  '%', 'FY2021', 'personal_auto',       10, 'ILLUSTRATIVE — personal auto industry combined ratio FY2021 (IBC Facts Book 2022).', 0.5),
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 104.2, '%', 'FY2022', 'personal_auto',       10, 'ILLUSTRATIVE — personal auto industry combined ratio FY2022 (IBC Facts Book 2022).', 0.5),
  ('c07c2f78-67fb-5842-a6f9-7967475725a1', 'ibc', 'combined_ratio', 111.8, '%', 'FY2023', 'personal_auto',       10, 'ILLUSTRATIVE — personal auto industry combined ratio FY2023 (IBC Facts Book 2023).', 0.5),
  -- commercial_auto
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 90.2,  '%', 'FY2021', 'commercial_auto',     11, 'ILLUSTRATIVE — commercial auto industry combined ratio FY2021 (IBC Facts Book 2022).', 0.5),
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 92.6,  '%', 'FY2022', 'commercial_auto',     11, 'ILLUSTRATIVE — commercial auto industry combined ratio FY2022 (IBC Facts Book 2022).', 0.5),
  ('c07c2f78-67fb-5842-a6f9-7967475725a1', 'ibc', 'combined_ratio', 95.4,  '%', 'FY2023', 'commercial_auto',     11, 'ILLUSTRATIVE — commercial auto industry combined ratio FY2023 (IBC Facts Book 2023).', 0.5),
  -- personal_property
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 93.8,  '%', 'FY2021', 'personal_property',   12, 'ILLUSTRATIVE — personal property industry combined ratio FY2021 (IBC Facts Book 2022).', 0.5),
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 101.5, '%', 'FY2022', 'personal_property',   12, 'ILLUSTRATIVE — personal property industry combined ratio FY2022 (IBC Facts Book 2022).', 0.5),
  ('c07c2f78-67fb-5842-a6f9-7967475725a1', 'ibc', 'combined_ratio', 107.3, '%', 'FY2023', 'personal_property',   12, 'ILLUSTRATIVE — personal property industry combined ratio FY2023 (IBC Facts Book 2023).', 0.5),
  -- commercial_property
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 89.4,  '%', 'FY2021', 'commercial_property', 13, 'ILLUSTRATIVE — commercial property industry combined ratio FY2021 (IBC Facts Book 2022).', 0.5),
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 91.2,  '%', 'FY2022', 'commercial_property', 13, 'ILLUSTRATIVE — commercial property industry combined ratio FY2022 (IBC Facts Book 2022).', 0.5),
  ('c07c2f78-67fb-5842-a6f9-7967475725a1', 'ibc', 'combined_ratio', 94.7,  '%', 'FY2023', 'commercial_property', 13, 'ILLUSTRATIVE — commercial property industry combined ratio FY2023 (IBC Facts Book 2023).', 0.5),
  -- liability
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 82.1,  '%', 'FY2021', 'liability',           14, 'ILLUSTRATIVE — liability industry combined ratio FY2021 (IBC Facts Book 2022).', 0.5),
  ('95077b84-6a14-5229-af4f-cc1fe98175b9', 'ibc', 'combined_ratio', 84.5,  '%', 'FY2022', 'liability',           14, 'ILLUSTRATIVE — liability industry combined ratio FY2022 (IBC Facts Book 2022).', 0.5),
  ('c07c2f78-67fb-5842-a6f9-7967475725a1', 'ibc', 'combined_ratio', 88.2,  '%', 'FY2023', 'liability',           14, 'ILLUSTRATIVE — liability industry combined ratio FY2023 (IBC Facts Book 2023).', 0.5),

  -- ── Intact combined ratio by LOB ─────────────────────────────────────────────
  -- personal_auto
  ('9ad2873a-7dcc-5211-a065-23c4b8fb4753', 'intact-financial', 'combined_ratio', 95.5, '%', 'FY2021', 'personal_auto', 4, 'ILLUSTRATIVE — Intact personal auto combined ratio FY2021 (Q4-2021 press release).', 0.5),
  ('b0186b22-0ba7-51fa-8d2f-90fa18db3dd3', 'intact-financial', 'combined_ratio', 97.2, '%', 'FY2023', 'personal_auto', 4, 'ILLUSTRATIVE — Intact personal auto combined ratio FY2023 (Q4-2023 press release).', 0.5),
  ('a7081004-a5d2-513f-8e23-2e75fd0bf7a9', 'intact-financial', 'combined_ratio', 95.8, '%', 'FY2024', 'personal_auto', 4, 'ILLUSTRATIVE — Intact personal auto combined ratio FY2024 (Q4-2024 press release).', 0.5),
  -- personal_property
  ('9ad2873a-7dcc-5211-a065-23c4b8fb4753', 'intact-financial', 'combined_ratio', 88.1, '%', 'FY2021', 'personal_property', 5, 'ILLUSTRATIVE — Intact personal property combined ratio FY2021 (Q4-2021 press release).', 0.5),
  ('b0186b22-0ba7-51fa-8d2f-90fa18db3dd3', 'intact-financial', 'combined_ratio', 93.5, '%', 'FY2023', 'personal_property', 5, 'ILLUSTRATIVE — Intact personal property combined ratio FY2023 (Q4-2023 press release).', 0.5),
  ('a7081004-a5d2-513f-8e23-2e75fd0bf7a9', 'intact-financial', 'combined_ratio', 90.3, '%', 'FY2024', 'personal_property', 5, 'ILLUSTRATIVE — Intact personal property combined ratio FY2024 (Q4-2024 press release).', 0.5),
  -- commercial lines (combined commercial_auto + commercial_property + liability segment)
  ('9ad2873a-7dcc-5211-a065-23c4b8fb4753', 'intact-financial', 'combined_ratio', 90.2, '%', 'FY2021', 'commercial_auto', 6, 'ILLUSTRATIVE — Intact commercial lines combined ratio FY2021 (Q4-2021 press release).', 0.5),
  ('b0186b22-0ba7-51fa-8d2f-90fa18db3dd3', 'intact-financial', 'combined_ratio', 91.8, '%', 'FY2023', 'commercial_auto', 6, 'ILLUSTRATIVE — Intact commercial lines combined ratio FY2023 (Q4-2023 press release).', 0.5),
  ('a7081004-a5d2-513f-8e23-2e75fd0bf7a9', 'intact-financial', 'combined_ratio', 88.4, '%', 'FY2024', 'commercial_auto', 6, 'ILLUSTRATIVE — Intact commercial lines combined ratio FY2024 (Q4-2024 press release).', 0.5)
;
