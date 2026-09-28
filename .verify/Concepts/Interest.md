---
target: Concepts/Interest.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition ('compensation paid by a borrower to a lender for the use of money') vs Finan §1 p.10 ('an amount charged to a borrower for the use of the lender's money over a period of time ... sometimes referred to as the time value of money'): match. Loan context matches SYL Topic 3 a)-b) p.3 (interest; interest and principal repayment in a payment). I_t = i B_{t-1}, P_t = Payment - I_t and 'interest portion decreases, principal increases' in a level-payment schedule vs Finan §38 p.342 (interest in period k = i a_{n-k+1} = 1 - v^{n-k+1}, principal v^{n-k+1}): match. Example recomputed: a_3|5% = 2.723248, payment 10000/2.723248 = 3672.09, I_1 = 500, P_1 = 3172.09 = page. Links [[Interest Rate]], [[Outstanding Balance]], [[Amortization]] resolve; figure exists; LaTeX ok. Claims rest on Finan (rank 3) and the example is the vault's own -> medium. No findings.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf
