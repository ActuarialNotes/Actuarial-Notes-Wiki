---
target: Concepts/Interest Rate Risk.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: Exam 9 half against Panning: franchise-value definition, duration mechanism (premiums priced to a fixed target return fall as rates rise, p.9), asset-duration hedge needing zero or negative duration (p.10), pricing-strategy alternative (pp.10-11); 'Franchise Value and Total Economic Value' example recomputed (126.19 = S+P-E, 71.43 = L/1.05, D_V = 6.70, 5.18 with zero-duration assets, D_A = -3.42; 7.62 and 3.27 under a=10%, b=1) and diffed with Panning pp.9-10; surplus-duration example recomputed (D_S = 9.17, ΔS = -27.5M, D_A = 1.75); wiki links resolve
- sources_checked: Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Panning half (the franchise-value bullet and the second example) agrees with Panning in full; the example's 'both treated as having duration 1' is a stated simplification of Panning's 'duration just less than one year' (p.9), which still gives Panning's 6.70 and 5.18. Left in_review because the page is shared with SOA CP-351 and ILA-101, whose readings were not reached this session: the surplus-duration formulas, price/reinvestment risk, key-rate and effective duration, negative convexity of MBS and callables, claim inflation offset and the hedging-tools bullet appear in neither Panning nor Coval, Jurek & Stafford and still need those exams' sources. Arithmetic of both examples is right.
