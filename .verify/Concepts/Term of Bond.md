---
target: Concepts/Term of Bond.md
created: 2026-09-28
---

## [F-001] Unsourced claim that a longer term always means a higher duration
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: third bullet, line 17
- claim: 'The exposure to **price risk**: longer-term bonds are more sensitive to interest rate changes (higher [[Duration]])'
- evidence: No syllabus source read states this (full-text search of Alps FM-24-17, the SOA notation note, the SOA sample solutions and Finan). It is not a general rule: recomputed Macaulay durations of a 2% annual-coupon bond at a 10% yield are 13.33 (20-year), 14.03 (30-year), 13.13 (40-year), 12.19 (50-year), 11.03 (100-year), falling toward the perpetuity limit (1 + j)/j = 11 — a longer term with a lower duration.
- source_rank: 5
- proposed_action: Maintainer: qualify the claim (e.g. 'typically', or for bonds at or near par) or cite a source.
- applied: false
- fingerprint: 1148a59d9370

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (issue to maturity; maturity date = final payment) vs FIN §42 p.380; n counted from the valuation date to maturity vs FIN §43 p.384 (so '(or purchase date)' is consistent); n = term × m and v^n vs FIN p.384-385; callable bonds' uncertain term vs FIN §47 p.420 ('the call date of the bond is unknown'). Example recomputed in one python script (work/c-bonds.py): 5-year 920.1458 → 920.15, 10-year 865.7984 → 865.80 (402.61 = 60 × the displayed 6.7101), both correct; longer term → lower price for a discount bond, correct. F-001 minor open. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
