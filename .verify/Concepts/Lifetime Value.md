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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/b3a4
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: New table bullet diffed against W&M's column notes ((5) = (2) - (3) - (4); (7) = (6) x prior (7); (8) = (5) x (7); (10) = (2) x (7) discounted at 5%; (11) = (9)/(10)). 'Discounted from its start' recomputed: 800 x 0.75/1.05 = 571.43, 790 x 0.563/1.05^2 = 403.42, year 1 = 810.00 undiscounted; 83.01/2,088.06 = 4.0%. Rest of page unchanged since 2026-09-12.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 13 pp. 257-258 (PDF pp. 269-270), Tables 13.16-13.17, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Clean pass. The page's LTV formula discounts year t by (1+r)^t, while Werner's table discounts from the start of each year; the new bullet states Werner's convention, so the two are reconciled on the page.
