---
target: Concepts/Amortization.md
created: 2026-09-28
---

## [F-001] Definition restricts amortization to level payments
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening sentence
- claim: 'Amortization is the process of repaying a loan through a series of level periodic payments P'.
- evidence: FIN p.333 defines the amortization method as installment payments whose progressive reduction of the amount owed is the amortization of the loan, with no level-payment condition; FIN §38 p.346 builds amortization schedules where 'the payments are not all leveled'; SOA sample Q128 (questions PDF p.54) amortizes a loan with payments of 100 for eight years then 300. The level-payment formula P = L/a_n that follows is correct for the level case (FIN §37 p.335) but the definition is narrower than the sources.
- source_rank: 3
- proposed_action: Maintainer: define amortization generally (installment repayment of interest plus principal) and present level payments as the common case.
- applied: false
- fingerprint: b7e913e8f54b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 term list and FIN p.333; P=L/a_n and OB_k=P a_{n-k} vs FIN §37 p.335; I_k=P(1-v^{n-k+1}), PR_k=P v^{n-k+1} vs FIN §38 p.342 table; example recomputed in python: a_4@5%=3.5460, P=2820.12, I_1=500.00, PR_1=2320.12, OB_1=7679.88 = P a_3 (2.723248) with unrounded P — all resolve; links and figure resolve. Medium: worked example is the vault's own; formulas rest on rank 3.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Loan Repayment Methods' introduction, PDF p.333, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 128, questions PDF p.54, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
