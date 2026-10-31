---
target: Concepts/Cumulative Development Factor.md
created: 2026-10-31
---

## [F-001] CDFs stated to decrease monotonically
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: second bullet
- claim: CDFs are built backwards from the tail ... They decrease monotonically with maturity.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) PDF p.101 (printed 95): 'Generally, cumulative claim development factors are the greatest for the most recent accident years and the smallest for the oldest'. Monotone decrease needs every age-to-age factor ≥ 1, and Friedland documents factors below 1.00 (PDF p.95 fn 41, p.162, p.202 — subrogation, conservative case reserves, claims closed without payment), as does the vault's own [[Age to Age Factor]] page. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Replace 'decrease monotonically' with Friedland's 'generally decrease'.
- applied: true
- fingerprint: 7867f2f780f4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Now reads 'They generally decrease with maturity.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of both examples (CDFs 1.020/1.071/1.285/1.928, % reported 98.0/93.4/77.8/51.9, ultimate 1,156,800, IBNR 556,800; 4,320,000 vs 4,095,000, 5.5% gap, future payments 2,520,000/2,295,000); formula and backwards construction diffed against Friedland Step 6 (PDF p.96-97); 1/CDF against PDF p.99
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7, PDF pp.96-99, 101, 103 (printed 90-93, 95, 97): CDF calculation, percentage reported = 1/CDF, leverage (CDF 4.00 example), paid vs reported CDFs, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Agrees with Friedland Ch.7; one over-strong clause softened to the source's wording.
