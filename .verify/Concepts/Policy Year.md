---
target: Concepts/Policy Year.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner p.43 ('considers all premium and loss transactions on policies that were written during a twelve-month period, regardless of when the claim occurred') and Friedland p.41; 'underwriting year / year of account' synonym confirmed at both; 'best match of premium and loss' is Werner p.43 and Friedland p.42 ('a true match between claims and exposures'); the 24-month span and 'not fully earned until 24 months' confirmed at Werner p.43 and Friedland p.41; the maturity claim recomputed independently - uniform writing puts PY 2024's average loss date at 1/1/2025 against AY 2024's 7/1/2024, so PY at 24 months is comparable to AY at 18, as the page says; example 1 recomputed (6,000,000 x 0.50 = 3,000,000 earned in CY 2024, remainder in 2025); example 2's conclusion is Friedland's own, Ch. 13 p.283 citing Berquist-Sherman: 'Substituting policy year data for accident year data when there has been a significant change in policy limits or deductibles between successive policy years.' No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.43 (PDF p.55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.41-42 (PDF pp.47-48), and Ch. 13 p.283 (PDF p.289), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
