---
target: Concepts/Loss Ratio.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: high
- checks_run: Loss ratio = losses (or losses and LAE) / earned premium diffed against Werner Ch. 6 p.94 ('Loss ratio is the ratio of losses (or losses and LAE) to premium... The most common loss ratio metric is reported loss ratio, or reported losses divided by earned premium'), which also supplies the page's 'state the basis' caveat ('varies depending on the types of premium and loss used, and the method of aggregation... may or may not include loss adjustment expenses or be developed to ultimate'); Werner's own example 18,750,000/32,000,000 = 58.6% recomputed. The identity loss ratio = pure premium / average premium re-derived (losses/exposures divided by premium/exposures). PLR = 1 - variable expense % - profit % checked against Werner's Appendix A walkthrough at p.327: 'Row 15 is the variable permissible loss ratio, which is calculated as 100% minus the sum of Rows 13 and 14' (variable expense provision and underwriting profit provision). Both examples recomputed before reading the answers: 715,000/1,000,000 = 71.5% against PLR 70.0%, 0.715/0.700 - 1 = +2.14%; and 58.0%, 5,800,000 x 1.32 = 7,656,000 -> 76.56%, x 1.12 = 8,574,720 -> 85.75%, on-level premium 10,000,000 x 1.10/1.05 = 10,476,190 and 8,574,700/10,476,200 = 81.85%, all as printed. The AY 2024 average rate level index of 1.05 against a current 1.10 is internally consistent with a 10% 1/1/2024 increase and uniform annual writings. No findings.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 (PDF p.106), Appendix A description at p.327 (PDF p.339), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
