---
target: Concepts/Accident Year.md
created: 2026-09-13
---

## [F-001] Werner's data-aggregation objectives stated as two; the text lists three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: minor
- status: open
- locus: bullet 2, 'the best compromise on Werner & Modlin's two axes'
- claim: Accident year is 'the best compromise on Werner & Modlin's two axes': matching losses to exposure, and closing at year end.
- evidence: Werner & Modlin Ch. 3 printed p.42 (PDF p.54): 'When aggregating data for ratemaking purposes, three general objectives apply: Accurately match losses and premium for the policy; Use the most recent data available; Minimize the cost of data collection and retrieval.' The page names two of the three and attributes the pair to Werner & Modlin by name; the omitted objective (cost of collection and retrieval) is the one that explains the calendar-year method's survival, and is listable on an exam question. The substantive claim about accident year is otherwise correct per p.43 (PDF p.55): 'Accident year aggregation represents a better match of premium and losses than calendar year aggregation.'
- source_rank: 2
- proposed_action: Restate as Werner's three objectives, or drop the attribution and present the two axes as the page's own framing.
- applied: false
- fingerprint: 4cc00546d1cd

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Definition diffed against Werner p.43 ('losses for accidents that have occurred during a twelve-month period, regardless of when the policy was issued or the claim was reported') and Friedland p.40 ('accident year 2008 consists of all claims with an occurrence date in 2008'); 'not final at year end' and the need to develop confirmed at Werner p.43 and Friedland p.41; premium/loss mismatch and the need for on-levelling confirmed at Werner p.43; the five-basis assignment table checked date by date against the definitions in Werner Ch. 3 and Friedland Ch. 3; example 2 recomputed before reading the answer - 4,400,000/8,000,000 = 55.0%, 5,300,000/8,000,000 = 66.25% (printed 66.3%), 5,300,000 x 1.150 = 6,095,000, 6,095,000/8,000,000 = 76.19% (printed 76.2%). One minor finding open (F-001, the 'two axes' attribution).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-43 (PDF pp.54-55), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.40-41 (PDF pp.46-47), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
