---
target: Concepts/Exposure Trend.md
created: 2026-09-12
---

## [F-001] Wrong trend factors make the stated net pure premium trend 7.7% instead of 7.4%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: major
- status: open
- locus: Example 1 'Net Pure Premium Trend in Workers Compensation' and Example 2, answer blocks
- claim: The page gave 1.03^2.5 = 1.0764 (trended payroll $53,820,000), 1.06^2.5 = 1.1593 (trended losses $1,854,880), projected PP per $100 = $3.446, and net trend 1.1593/1.0764 = 1.0770 = +7.7% over 2.5 years, 'about 3.0% a year'. Example 2 then used $3.710 against $3.446.
- evidence: Independent recomputation (P5, falsifying): 1.03^2.5 = 1.0766966 (not 1.0764) and 1.06^2.5 = 1.1568170 (not 1.1593 — the same mis-exponentiation appears on Concepts/Pure Premium.md). Trended payroll = $53,834,830 (shown as $53,835,000), trended losses = $1,850,907 ($1,600,000 x 1.1568 = $1,850,880), projected PP per $100 = 1,850,880/538,350 = $3.4381. The net trend is exactly (1.06/1.03)^2.5 = 1.0291262^2.5 = 1.074411, i.e. +7.44% over 2.5 years and 2.91% a year, not +7.7%/3.0%. Example 2's +7.7% is separately correct because that ratio is exactly 1.03^2.5 = 1.0767, but its inputs were wrong ($3.702 vs $3.438). Method confirmed against Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp. 61-62 (PDF pp. 73-74, EXPOSURE TREND) and Ch. 6 p. 119 (PDF p. 131), which states the projected loss measure 'needs to be compared to exposures that have been projected to future levels using the selected exposure trend'.
- source_rank: 5
- proposed_action: Replace 1.0764/1.1593 with 1.0767/1.1568 and restate the derived figures: $53,835,000, $1,850,880, $3.438, 1.0744, +7.4%, ~2.9%/yr, $3.702.
- applied: true
- fingerprint: b530d2862e25

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- resolves: F-001
- status: resolved
- note: Corrected in this pass; both examples now recompute exactly. Example 2's +7.7% is unchanged and is now reproduced by $3.702/$3.438 - 1 = 7.68%.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed both examples from scratch before reading the answers, which is what surfaced F-001 (resolved in this pass): 1.03^2.5 = 1.0766966, 1.06^2.5 = 1.1568170, trended payroll $53,835K, trended losses $1,850,880, projected PP per $100 = $3.4381, net trend (1.06/1.03)^2.5 = 1.074411 = +7.44% over 2.5 years = 2.91%/yr; second example $3.7018 vs $3.4381 = +7.68%, which is exactly 1.03^2.5. Definition checked against Werner Ch. 4 p. 61: 'For some lines of business, the exposure measure used is sensitive to time-related influences such as inflation. For example, payroll and sales revenue' — and the internal-data / industry-index (average wage index) sources the page cites are Werner's. The pure-premium-method bullet is Werner Ch. 6 p. 119: the projected loss measure 'needs to be compared to exposures that have been projected to future levels using the selected exposure trend'; the loss-ratio-method counterpart (the effect entering through average premium instead) is on the same page. Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp. 61-62 (PDF pp. 73-74), EXPOSURE TREND, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 119-120 (PDF pp. 131-132), Coordinating Exposure, Premium and Loss Trends, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
