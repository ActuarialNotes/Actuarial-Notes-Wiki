---
target: Concepts/Level Payment Annuity.md
created: 2026-09-28
---

## [F-001] Loan payment 4,621.02 should be 4,619.50
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Loan Repayment', last line
- claim: 'P = 20000/4.3295 = 4621.02'
- evidence: 20,000/4.3295 = 4,619.47; with the unrounded a_5@5% = 4.329477, P = 4,619.50 (recomputed in python). 4,621.02 would need a_5 = 4.32805. Method P = L/a_n per FIN §37 p.335.
- source_rank: 5
- proposed_action: Maintainer: show P = 4,619.50.
- applied: false
- fingerprint: a1cddbe34fed

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: 'Level payment annuity' is a syllabus term (SYL p.3); PV = P a_n = P(1-v^n)/i and FV = P s_n = P((1+i)^n-1)/i vs FIN p.144-145; a_n / s_n as standard notation vs NOTE p.1 (image); 'future value' term vs NOTE p.1. Example recomputed (F-001, 1.52 slip). Links, figure, LaTeX resolve. Medium: example is the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
