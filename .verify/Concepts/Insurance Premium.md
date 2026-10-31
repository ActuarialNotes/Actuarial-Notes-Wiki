---
target: Concepts/Insurance Premium.md
created: 2026-10-31
---

## [F-001] 'Newer cars' not among the reading's premium-trend drivers
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Premium trend'
- claim: Average premium drifts 'as the mix shifts toward higher deductibles, newer cars or higher insured values'.
- evidence: Werner Ch.5 pp.82-84 (PDF pp.94-96) names as distributional changes behind premium trend: amount of insurance indexed to inflation (homeowners), a move of insureds to higher deductibles, and the purchase of another company's portfolio; plus inflation-sensitive exposure bases (payroll, receipts). Full-text search: 'newer' occurs only at PDF p.182 (univariate distortion, Ch.9) and p.296, never as a premium-trend driver. The claim is plausible but unsourced in the reading.
- source_rank: 2
- proposed_action: Replace 'newer cars' with one of the reading's examples, or cite a source for it.
- applied: false
- fingerprint: ccfd9e6868b3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:34Z/d6ef
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Lead and Premium = Rate x Exposure against Werner Ch.1/Ch.2 ('premium is generally calculated based on a given rate per unit of exposure'); written/earned/unearned/in-force definitions against Ch.1 p.2 (in-force = full-term premium of policies in effect); extension of exposures 'most accurate … requires detailed data' and parallelogram 'assumes policies are written evenly' against Ch.5; premium development via payroll audits (WC) against Ch.5 pp.80-81; premium trend against pp.82-84 (finding F-001). Both examples recomputed from scratch before reading the answers: CY2024 old-rate triangle 0.125, average level 1.0875, OLF 1.011494, on-level EP $5,057,471; CY2023 OLF 1.1/1.0125 = 1.0864; WC deposit $200,000, final $230,000, audit +$30,000 (15%). All reproduce. Wiki-links resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 pp.1-2 and Ch.2 p.13 (PDF pp.13-14, 25), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.5 pp.64-67, 71-73, 80-84 (PDF pp.76-79, 83-85, 92-96), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Verified at medium: one minor unsourced example ('newer cars') left open. The Projected EP = EP x OLF x Trend line omits premium development, which the next bullet covers in words.
