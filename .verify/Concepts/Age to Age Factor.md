---
target: Concepts/Age to Age Factor.md
created: 2026-10-31
---

## [F-001] Volume-weighted average in worked example miscomputed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: major
- status: open
- locus: Example 'When the Averages Disagree', answer, second line
- claim: Volume-weighted all-year = 1.545
- evidence: The page's own definition (formula 2, and Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.7 PDF p.93, printed 87: 'the sum of the claims ... divided by the sum of the claims for the same years at the previous age') applied to the table: Σ f·C = 1.42×4,100 + 1.45×4,300 + 1.38×900 + 1.61×4,800 + 1.63×5,200 + 1.66×5,600 = 38,799; Σ C = 24,900; 38,799/24,900 = 1.558, not 1.545. The other three averages recompute exactly (1.525, 1.633, 1.528). The 'eleven points' spread (1.525–1.633) is unchanged. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 5
- proposed_action: Change 1.545 to 1.558.
- applied: true
- fingerprint: 8baadd4fb23b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Corrected to 1.558 in this run; Σf·C/ΣC = 38,799/24,900 = 1.5582.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (12-24 all 1.500; 24-36 1.167/1.152/1.159; simple 1.525, vol-wtd 1.558, latest-3 1.633, medial 1.528); definitions diffed against Friedland pp.91-93; downward-development causes against p.162 (salvage/subrogation, conservative case outstanding); 'Chapter 4' reference checked (Ch.4 Meeting with Management)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7, PDF pp.91-95 (printed 85-89): age-to-age factors, averages (simple, medial, volume-weighted, geometric), selection criteria, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9, PDF p.162 (printed 156): development factors below 1.00, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Definitions agree with Friedland Ch.7; one arithmetic error in the second example corrected.
