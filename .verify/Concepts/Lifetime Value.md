---
target: Concepts/Lifetime Value.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: The LTV formula diffed against Werner's own construction — his column notes read (5) profit = premium - losses - expense, (7) cumulative persistency = (6) x prior (7), (8) = (5) x (7), (9) = (8) discounted by 5% per annum — i.e. the page's sum of profit x survival probability, discounted, exactly; the retention ratio definition diffed against Werner p.10 ('Number of Policies Renewed / Number of Potential Renewal Policies', his 85,000/100,000 = 85% example); both examples recomputed from scratch before reading the answers (a-angle-4 at 8% = 3.31213, PV $397.46, LTV +$147.45; at p = 0.80 the geometric factors 0.7407/0.5487/0.4064/0.3011 sum to 1.99695, PV $239.63, LTV -$10.37; at p = 0.65 they sum to 1.31329, PV $157.60, LTV -$92.40) and the average-customer-life claims (1/0.15 = 6.7, 1/0.10 = 10).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 p.257 and Tables 13.16-13.17 with their column notes (PDF pp.269-270), and Ch. 1 p.10 (PDF p.22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Clean pass — every figure reproduced to the cent and the structure matches Werner's lifetime value tables.
