---
target: Concepts/Non-Callable Bond.md
created: 2026-09-28
---

## [F-001] 'Bullet bond' given as a synonym without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening sentence, line 14
- claim: 'A **non-callable bond** (also called a **bullet bond**) cannot be redeemed by the issuer before its stated maturity date.'
- evidence: 'Bullet' occurs zero times in the FM syllabus, the SOA notation note, the SOA sample questions and solutions, Broverman FM-23-05, Alps FM-24-17 and Finan (full-text search of each dump). The syllabus names only 'callable/non-callable' (SYL 4a, PDF p.4). Whether the two terms are synonymous could not be confirmed from any source read.
- source_rank: 1
- proposed_action: Maintainer: source the synonym or delete the parenthetical.
- applied: false
- fingerprint: 254e62620028

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition and call/reinvestment-risk contrast vs FIN §47 p.420 and Investor.gov ('Callable bonds are more risky for investors than non-callable bonds because an investor whose bond has been called is often faced with reinvesting the money at a lower … rate'); 'with certainty' matches FIN §43 p.384 assumptions (default ignored, fixed maturity); price formula vs FIN p.385. Example recomputed in one python script (work/c-bonds.py): 70a_8|5% = 452.4249, 1000v^8 = 676.8394, P = 1129.2643 → 1129.26, correct; premium since 7% > 5% (C = F). Example title says 'vs. Callable' but prices only the non-callable bond (nit, not filed). F-001 minor open. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds
