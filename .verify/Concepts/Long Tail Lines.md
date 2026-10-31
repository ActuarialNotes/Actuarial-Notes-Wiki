---
target: Concepts/Long Tail Lines.md
created: 2026-10-31
---

## [F-001] Example applies a 'tail factor' as the whole CDF
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Leverage in the Tail Factor', stem
- claim: Stem says two actuaries select tail factors of 3.50 and 3.75 'against the same age-to-age factors', then multiplies reported at 36 months by the tail factor alone.
- evidence: If age-to-age factors beyond 36 months apply as well, the 36-to-ultimate CDF is their product times the tail factor (Friedland Ch. 7 p.89, PDF 95: the tail factor is the 'To Ult' factor selected after the age-to-age factors; Ch. 14 Exhibit I Sheet 1, PDF 339: the 'CDF to Ultimate' row is the cumulative product of the selected age-to-age factors and the tail), so ultimate is not reported × tail. The arithmetic as written (10,500,000 vs 11,250,000; 7.1% vs 10.0%) is right only if 3.50 and 3.75 are the 36-to-ultimate CDFs. Rank 5 internal inconsistency.
- source_rank: 5
- proposed_action: Call 3.50 and 3.75 the selected 36-to-ultimate CDFs (differing only in the tail), or show the product.
- applied: false
- fingerprint: df69a490291b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and line examples vs Friedland p.15 and Part 3 intro (med mal, WC, GL incl. products and E&O); BF for leveraged immature long-tail years vs Ch. 9; frequency-severity more used for long-tail vs Ch. 11; investment income / lower UW profit vs W&M Ch. 7; Reported % = 1/CDF vs Ch. 14 exhibit; both examples recomputed
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 1 p.15 (PDF p.21); Part 3 intro pp.79-80 (PDF pp.85-86); Ch. 9 p.155 (PDF p.161); Ch. 11 p.194 (PDF p.200); Ch. 14 p.333 (PDF p.339, percent reported = 1/CDF), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Agrees with Friedland and W&M. One minor internal inconsistency in the first example left open.
