---
target: Concepts/Principal.md
created: 2026-09-28
---

## [F-001] Worked example payment off by 3 cents
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Principal vs Interest in a Loan Payment', answer
- claim: P = 15000/4.2124 = 3,560.98; PR_1 = 2,660.98; OB_1 = 12,339.02.
- evidence: Recomputed (rank 5): a_5@6% = 4.212364, P = 3,560.95 (15000/4.2124 = 3,560.92); PR_1 = 3560.95 - 900 = 2,660.95; OB_1 = 12,339.05. Interest 900.00 is right. Method per FIN §38 p.342.
- source_rank: 5
- proposed_action: Maintainer: 3,560.95 / 2,660.95 / 12,339.05.
- applied: false
- fingerprint: 374d6e7674e9

## [F-002] Bond 'principal' equated with face value or redemption value without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: third bullet
- claim: 'In the context of bonds, the term principal often refers to the Face Value or Redemption Value — the amount repaid at maturity.'
- evidence: No FM source read calls a bond's face or redemption value its 'principal'. FIN §42 p.380 defines par/face value as 'the amount that the issuer agrees to repay the bondholder by the maturity date'; NOTE p.2 says the redemption value equals the face amount only 'unless otherwise stated', so the two are distinct quantities and only the redemption value is by definition the amount repaid at maturity.
- source_rank: 1
- proposed_action: Maintainer: source the usage or drop it; if kept, do not treat face and redemption value as interchangeable.
- applied: false
- fingerprint: 6488cc52b681

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 and FIN §1 p.10; Interest_1 = L i vs FIN §38 p.342 (interest = i x balance); 'tax purposes' vs FIN §38 p.342 ('for income tax purposes'); bond sentence vs FIN p.380 and NOTE p.2 (F-002); example recomputed (F-001, 3 cents). Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2 (redemption value equals face amount unless otherwise stated), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example recomputed in python: a_5@6% = 4.212364, P = 15000/4.212364 = 3,560.95 (was 3,560.98), PR_1 = 3560.95 - 900.00 = 2,660.95, OB_1 = 12,339.05; the closing sentence's constant payment updated to 3,560.95. Interest 900.00 unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Bullet deleted. Re-checked: Finan p.381 speaks of a bond issuer's 'coupon or principal payments' and p.380 defines par/face value as the amount the issuer agrees to repay by maturity, but no source read equates a bond's 'principal' with its face or redemption value, and NOTE p.2 keeps the two distinct (redemption = face only unless otherwise stated). Every question linking this page (fm-012, 033, 064, 067, 088, 132, 255, 287, 300, 337) is a loan question, so the page now keeps to the loan sense.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 term list and Finan p.10 (money invested/lent is the principal); Interest_1 = L i and the principal/interest split vs Finan p.342 (interest = i x balance; sum of principal repaid = the loan; 'for income tax purposes, for example'); the unsourced bond-principal bullet deleted (F-002). Example recomputed in python: a_5@6% = 4.212364, P = 3,560.95, I_1 = 900.00, PR_1 = 2,660.95, OB_1 = 12,339.05. Links (Outstanding Balance, Amortization Schedule) and figure resolve; validate_links clean. Medium: the worked example is the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
