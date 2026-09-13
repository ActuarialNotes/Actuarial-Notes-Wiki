---
target: Concepts/Territory Ratemaking.md
created: 2026-09-12
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/4385
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Every structural claim diffed against Werner Ch. 11: geography as a primary claims driver and one of the most established rating variables (p.188), the two phases (boundaries then relativities), the basic geographic unit trade-off between homogeneity and having observations (p.189), signal-vs-noise and the univariate estimator's bias from correlation with non-geographic variables (p.189 and fn.37), the two spatial smoothing types — distance-based and adjacency-based — and the over/under-smoothing balance (p.190), and smoothing applied before clustering units into territories (pp.190-191); both examples recomputed from scratch ($200 and $300 pure premiums, relativity 1.50, urban rate $600; the five postal codes sum to 8,390 exposures and their exposure-weighted relativity is 1.466, matching the page's 'near 1.47', with 0.95 a 35% fall below that level).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.188-191 (PDF pp.200-203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Clean pass — the smoothing-then-grouping order and both smoothing types match Werner Ch. 11, and both examples reproduce.
