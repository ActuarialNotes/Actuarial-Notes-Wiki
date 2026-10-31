---
target: Concepts/Tail Factor.md
created: 2026-10-31
---

## [F-001] Formula gives the CDF at the last age as last factor × tail
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: major
- status: open
- locus: defining formula
- claim: CDF_{last age → ult} = f_{last observed} × Tail
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.7 Step 6, PDF p.97 (printed 91): 'Reported CDF at 120 months = selected tail (120-ultimate) factor = 1.000; Reported CDF at 108 months = (selected tail factor) x (selected development factor 108-120 months)'. The CDF at the last observed age is the tail alone; last factor × tail is the CDF at the age before. The page's own first example applies the tail alone at the last age (120 months), contradicting its formula. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Show CDF_last = Tail, and f_last × Tail as the CDF at the prior age.
- applied: true
- fingerprint: 2f303e66a0bd

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Formula now reads CDF_{last age→ult} = Tail and CDF_{prior age→ult} = f_{last observed} × Tail, as in Friedland Step 6.

## [F-002] Inverse power curve asserted to be the more common choice
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: Methods list, curve fitting
- claim: The inverse power curve gives a heavier tail than the exponential and is the more common choice in casualty.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) PDF p.96 (printed 90): 'Another common approach is to fit a curve to the selected or observed development factors to extrapolate the tail factors; exponential decay is a common assumption for such curve fitting.' 'inverse power' occurs zero times in the 451-page document (full-text search). The heavier-tail comparison is standard and kept; the 'more common' claim is unsourced and runs against the reading. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Delete 'and is the more common choice in casualty'.
- applied: true
- fingerprint: 96c1db39a543

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Clause deleted; the heavier-tail comparison stays.

## [F-003] Reported-to-paid tail approach missing its condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: Methods list, paid-to-reported convergence
- claim: Paid-to-reported convergence — reported losses must eventually equal paid, so the ratio of the two at the oldest maturities implies how much paid development remains.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) PDF p.96 (printed 90): 'A third approach, used for paid development where the comparable reported development is already considered to be at ultimate, is to utilize reported-to-paid ratios at the latest observed paid development period.' Without that condition the ratio understates the paid tail. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Add Friedland's condition: used for a paid tail where reported development is already at ultimate.
- applied: true
- fingerprint: bd3a1b7a1f64

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Condition added in Friedland's terms.

## [F-004] Bondy method not in the Exam 5 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: Methods list, Bondy method; second example
- claim: Bondy method — set the tail equal to the last observed age-to-age factor (or a multiple of it), on the reasoning that development decays geometrically.
- evidence: Full-text search of Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) (sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464) for 'Bondy': zero occurrences. Friedland names three approaches only (PDF p.96: industry benchmarks, curve fitting with exponential decay, reported-to-paid ratios) and defers further discussion to the CAS Tail Factors Working Party. The method is real elsewhere in the literature, but nothing read this run supports the page's description of it.
- source_rank: 2
- proposed_action: Cite a source for the Bondy method (e.g. the CAS Tail Factors Working Party report or Boor, 'Estimating Tail Development Factors'), or mark it as outside the Exam 5 reading.
- applied: false
- fingerprint: 54d223da8bc8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (2,060,000/2,100,000, 40,000, 67%, 400,000; excess ratios 0.70/0.714/0.70, remaining excess 0.0327, product ≈1.033); formula against Step 6; selection approaches against PDF p.96; full-text search for 'Bondy' and 'inverse power'
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7 Step 5-6, PDF pp.95-97 (printed 89-91): tail factor approaches, Thorne on tail leverage, CDF at the last age = tail, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formula corrected to Friedland's Step 6; two source-backed edits to the methods list; Bondy method left open as unsourced in this reading.
