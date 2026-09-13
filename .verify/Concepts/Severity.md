---
target: Concepts/Severity.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Severity = losses / number of claims diffed against Werner Ch. 6 p.94 ('Severity is a measure of the average loss per claim'), with Werner's figure 18,750,000/7,500 = 2,500 recomputed; pure premium = frequency x severity against the same page; the basic-limits/capped-data prescription against Werner Ch. 6 p.117 ('Leveraged Effect of Limits on Severity Trend') and the excess layer trending faster against Werner Ch. 11 p.197, which states the relationship Basic Limits Trend < Total Limits Trend < Increased Limits Trend; the report-year basis for severity triangles is consistent with Friedland Ch. 3 p.42. Both examples recomputed before reading the answers: 4,200,000/600 = 7,000, x 1.20 = 8,400, x 650 = 5,460,000, implied LDF 1.30 = 1.20 x (650/600) exactly; the capped series year-over-year changes recompute to +4.865%, +4.639%, +4.926%, +4.695% (printed 4.9/4.6/4.9/4.7) with a four-year geometric mean of +4.78% (printed 4.8%), and the unlimited series to +11.90%, -7.23%, +35.32%, -11.86% (printed 11.9/-7.2/35.3/-11.9). No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 and p.117 (PDF pp.106, 129), Ch. 11 p.197 (PDF p.209), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
