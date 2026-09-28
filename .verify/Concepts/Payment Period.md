---
target: Concepts/Payment Period.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (interval between payments) vs FIN p.143 ('The interval between annuity payments is called a payment period'); converting to the rate per payment period j = (1+i)^{1/m} - 1 and from i^(k) vs FIN §22 p.206 (Ex. 22.1: (1+j)^12 = (1+0.12/4)^4; Ex. 22.2: j = 1.05^{1/2} - 1), also for less-frequent payments (FIN §22 intro); a^(m)_T = (1-v^T)/i^(m) and a^(m) = (i/i^(m))a > a vs FIN §24 p.218; five linked items vs SYL p.3 Topic 3 outcome b; i^(m) notation vs NOTE p.1. Examples recomputed in python: j = 0.0041239, a_300 = 171.938, P = 1,744.81 (0.05/12 gives 1,753.77, higher, as stated); 1.005^12 - 1 = 6.1678%; P_A = 14,902.95, j = 1.9427%, P_Q = 3,618.91, 4P_Q = 14,475.64, i^(4) = 7.7706%, a^(4)_10 = 6.9081566, difference 427.31 — all match. Links, LaTeX resolve. Medium: examples are the vault's own; formulas rank 3.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'The Basics of Annuity Theory' introduction, PDF p.143, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §22 Annuities Payable at a Different Frequency than Interest is Convertible, PDF p.206, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §24 Analysis of Annuities Payable More Frequently than Interest is Convertible, PDF p.218-220, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf
