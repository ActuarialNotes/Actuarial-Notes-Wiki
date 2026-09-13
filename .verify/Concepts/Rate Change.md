---
target: Concepts/Rate Change.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Both indication forms checked against Werner Ch. 8; the off-balance example re-derived against Werner p.276, where the off-balance factor is defined as 1/(1 + change in average rate differential) — 1.080/1.030 = 1.0485 and 1.0485 x 1.030 = 1.080, with the page's 1.08 x 1.03 = 1.1124 error case reproduced; the regulatory-threshold narrative in example 1 checked against Werner p.240 ('a company may decide to implement a rate change that is less than the threshold to avoid the extra requirements'); retention arithmetic recomputed (14.2 x 0.4 = 5.7 points); links, embed and $$ balance checked.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.143-145 (PDF pp.155-157), Ch. 13 p.240 (PDF p.252) and Ch. 14 p.276 (PDF p.288), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988), sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — p.2, Principle 4
- note: Clean pass — every figure reproduced and both the indication and off-balance mechanics match the source.
