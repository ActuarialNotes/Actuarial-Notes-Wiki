---
target: Concepts/Loss Trend.md
created: 2026-09-12
---

## [F-001] The overlap fallacy is mischaracterized
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: bullet 2 ('Trend and development answer different questions…'), final clause
- claim: 'Werner warns explicitly against the overlap fallacy — using calendar-year data that already contains inflation and then trending it again.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 120 (PDF p. 132), section headed 'Overlap Fallacy: Loss Development and Loss Trend': 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case… It is true that loss development incorporates inflationary pressures that cause payments for reported claims to increase in the time after reporting, but this does not prove an overlap either.' The overlap fallacy is therefore (a) the mistaken *belief* that applying both loss development and loss trend double-counts inflation — a belief Werner refutes, not a practice he warns against — and (b) about development vs. trend, not about calendar-year data. It is listed as its own key concept (item 10) in Werner's Key Concepts in Chapter 6, p. 124 (PDF p. 136), so a candidate asked to define it would be misled by this sentence.
- source_rank: 2
- proposed_action: Restate the clause as: the overlap fallacy is the mistaken belief that developing and trending the same losses double-counts inflation; Werner shows it does not, because development moves an immature year to its own ultimate while trend moves that ultimate to a future cost level (Werner Fig. 6.22 timeline, p. 120).
- applied: false
- fingerprint: e7856070a686

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: medium
- checks_run: Recomputed the trend-period example independently first: AY 2023 average loss date 7/1/2023; policies written 7/1/2025-6/30/2026 are exposed 7/1/2025-6/30/2027 with midpoint 7/1/2026; n = 3.0 and 1.05^3 = 1.157625 — all correct, and the construction matches Werner's Fig. 6.22 timeline (CAY 2010 avg. 7/1/2010 to PY 2012 avg. 12/31/2012 = 30 months). Refit the severity series from scratch: (11,100/8,000)^0.2 - 1 = 6.77%, (11,100/8,700)^(1/3) - 1 = 8.46%, (11,100/9,400)^0.5 - 1 = 8.67%, and all five year-over-year changes (3.75/4.82/8.05/8.51/8.82%) round to the table. Located and read the Overlap Fallacy section — the page mischaracterizes it (F-001, major, open). Confidence held at medium for one further reason: the page's characterization of ASOP 13's requirements could not be checked — ASOP 13 is not in the offline corpus (only ASOP 12 and ASOP 43 are), so that sentence is unsourced. All wiki-links resolve incl. the ASOP 13 page; embed present; LaTeX balanced.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 109-120 (PDF pp. 121-132), Loss Trend, trend period and Overlap Fallacy incl. Fig. 6.22, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 124 (PDF p. 136), Key Concepts in Chapter 6, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
