---
target: Concepts/Development Triangle.md
created: 2026-10-31
---

## [F-001] Development triangles are not always cumulative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead, line 14
- claim: Development Triangle is the fundamental data structure of reserving: cumulative amounts arranged with cohorts as rows...
- evidence: Friedland Ch.5 p.51 (PDF 57): 'A development triangle is a table that shows changes in the value of various cohorts over time'; p.61 (PDF 67) lists 'Incremental paid claims' among the common triangle types, and Ch.12 builds an incremental paid triangle.
- source_rank: 2
- proposed_action: Delete 'cumulative' from the definition; the formula bullet that follows is explicitly about cumulative cells and stays.
- applied: true
- fingerprint: c008891009e7

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: 'cumulative' deleted from the lead in this change.

## [F-002] Unsourced overclaim: every reserving distortion is one of three assumptions failing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 6, line 25
- claim: Every reserving distortion on the syllabus is one of these three failing.
- evidence: Friedland states the development technique's assumption as 'the reporting and payment of future claims will be similar to the patterns observed in the past' (Ch.7 p.95, PDF 101), and treats changes in mix, case adequacy, settlement, claim ratios, retentions and reinsurance one by one (Ch.7 'Influence of a Changing Environment', Ch.13, Ch.15). She does not state the three-assumption reduction or that it exhausts the distortions.
- source_rank: 2
- proposed_action: Remove the sentence, or source it.
- applied: false
- fingerprint: abd56e92aa23

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Rows, columns, diagonals and age measured from the start of the cohort vs pp.52-54; orientation vs p.54; interval choice (monthly/quarterly/semi-annual; credibility and stability) vs p.61; data bases and ratio triangles vs p.61; diagnostic use vs Ch.6; volume-weighted age-to-age formula vs Ch.7; both examples recomputed independently (1.500/1.150/1.040; column growth 10%, 18%, 19%; +12%/+11%/+12% diagonal lift) — agree.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.5 pp.51-62 (PDF 57-68); Ch.6 (PDF 69-83); Ch.7 pp.84-95 (PDF 90-101), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Checks against Friedland. One wording fix applied (triangles can be incremental). One minor finding open (an unsourced overclaim).
