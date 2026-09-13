---
target: Concepts/Line of Business.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:16Z/58a9
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Rate formula re-derived: (L + LAE + E_F)/(X(1-V-Q)) is algebraically Werner's pure premium indication P_I = (L/X + E_F/X)/(1-V-Q_T) (PDF p.154) — identity holds. Segmentation claims checked against Werner PDF pp.118 and 122, which state the analysis should be on 'a body of homogeneous claims... may imply a line of business or something more granular (e.g., coverages or types of losses within that line of business). Liability claims and property claims are typically analyzed separately' — this supports both the by-coverage bullet and the homeowners segmentation example. Exposure bases in the example table checked against Werner Ch.4 (payroll for workers compensation, gross sales for products/general liability, car-years for personal auto; PDF pp.61-62). Schedule P / industry benchmark bullet checked against Friedland PDF pp.15 and 94.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.106,110 (PDF pp.118,122) and Ch. 8 p.142 (PDF p.154), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 1 p.9 (PDF p.15) and Ch. 7 (PDF p.94), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
- note: No findings. Confidence medium rather than high: the corpus uses 'line of business' throughout but nowhere gives it a formal definition, so the opening sentence is checked as consistent syllabus usage rather than transcribed; the reserving-method column of the first example is a pedagogical selection, not a source claim.
