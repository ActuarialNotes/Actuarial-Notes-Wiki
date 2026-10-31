---
target: Concepts/Bornhuetter-Ferguson Method.md
created: 2026-10-31
---

## [F-001] 'Three extra dollars of reserve for every real one' overstates the example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: nit
- status: open
- locus: Example 'Why BF Is Safer at an Immature Age', final paragraph
- claim: that assumption manufactures three extra dollars of reserve for every real one.
- evidence: Recomputed from the example (rank 5): the $1.5M claim raises the chain-ladder ultimate by 4.8M, i.e. IBNR by 4.8M − 1.5M = 3.3M — 2.2 extra dollars of reserve per real dollar, not three (3.2 is the CDF, the total multiplier).
- source_rank: 5
- proposed_action: Say 'more than two extra dollars of reserve for every real one', or 'multiplies every real dollar by 3.2'.
- applied: false
- fingerprint: ae457443f92e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (47.3% unreported, IBNR 614,900, BF 1,214,900, CL 1,137,600, gap 77,300; CL 9.6M/14.4M, BF 9,256,250/10,756,250); formula against p.159; credibility weighting against p.158 and p.162
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9 Bornhuetter-Ferguson Technique, PDF pp.158-159, 162 (printed 152-153, 156): Brosius credibility form Z = 1/CDF, key assumption, formulas, CDFs below 1.00, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formulas, the credibility interpretation and both examples agree with Friedland Ch.9; one nit left open.
