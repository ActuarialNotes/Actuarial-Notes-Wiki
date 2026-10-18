---
target: Concepts/Profit Commission.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: PC formula reproduces Clark's example (0.5 x (100-55-25-10) = 5%); aggregate-distribution evaluation and carryforward ambiguity p.13; finite-risk profit commission p.46; both examples recomputed (-5% deficit, $160,000 vs $320,000; E[PC] 2.0% vs 0.8% plug-in, 93.0% vs 91.8%)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.12-13 (profit commission definition and 55/25/10/50% example, aggregate evaluation, carryforward ambiguity), pp.46-48 (profit commissions on finite risk covers, 75% of premium if loss free), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formula, Clark attributions and examples check out; the convexity point is the formula's own algebra. Exam 9 only.
