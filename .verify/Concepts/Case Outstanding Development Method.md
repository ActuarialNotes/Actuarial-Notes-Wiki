---
target: Concepts/Case Outstanding Development Method.md
created: 2026-10-31
---

## [F-001] Key assumption and scope of the method missing; unsourced use claimed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: major
- status: open
- locus: fourth bullet
- claim: The method suits books where case reserving is consistent and disciplined ... and where paid patterns are distorted by changing settlement rates.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.12, PDF p.271 (printed 265): 'An additional important assumption is that claims activity related to IBNR is related consistently to claims already reported ... The case outstanding development technique is not used extensively by actuaries ... this method is appropriate when applied to lines of insurance for which most of the claims are reported in the first accident period. It is this requirement that makes the case outstanding development method so strong for claims-made coverages and report year analysis'; PDF p.273 repeats it as the first limitation. The page gave neither the assumption nor the scope, and the settlement-rate use appears nowhere in the chapter. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: State Friedland's added assumption and the claims-made/report-year scope; drop the settlement-rate clause.
- applied: true
- fingerprint: 8aea641ff19c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Bullet now states the IBNR-related-to-reported assumption and its claims-made/report-year scope; settlement-rate clause removed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (1,000,000 / 1,800,000 / IBNR 500,000 vs 1,755,000, 2.6%; 2,140,000, 500,000, 1.60/1.30 = 1.23, ≈1,900,000); period-by-period ratios diffed against Friedland pp.271-273 (incremental paid ÷ prior case; case ÷ prior case)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.12 Case Outstanding Development Technique, PDF pp.271-274 (printed 265-268): Approach #1 (Wiser) ratios, assumptions, limitations; Approach #2, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Mechanics and examples agree with Friedland Ch.12; the method's key assumption and scope added from the reading.
