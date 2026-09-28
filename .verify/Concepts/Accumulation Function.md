---
target: Concepts/Accumulation Function.md
created: 2026-09-28
---

## [F-001] 'Three standard forms' introduces a four-row table
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: nit
- status: open
- locus: bullet above the regime table (line 18)
- claim: 'Three standard forms arise from different interest assumptions:' followed by a table with four rows (compound, simple, constant force, time-varying force).
- evidence: The table directly below the sentence has four rows. Each row's a(t) is itself correct: (1+i)^t (Finan §6 p.41-42), 1+it (Finan §4 p.28-30; NOTE p.2), e^{δt} (Finan §10 p.78-80, δ = ln(1+i)), exp(∫δ) (Finan §11 p.93, A(t) = A(0)e^{∫δ_r dr}). Only the count is off.
- source_rank: 5
- proposed_action: Change 'Three' to 'Four', or say the fourth row is the general case the others specialise.
- applied: false
- fingerprint: 666abc90c375

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (a(t) = value at t of 1 invested at 0; a(0)=1; non-decreasing; A(t) = k a(t)) vs Finan §2 p.14-16: match (Finan's P2 is 'if t1<t2 then a(t1) <= a(t2)'). a(t) = exp(∫δ) and δ(t) = a'(t)/a(t) vs Finan §10 p.80 and §11 p.93: match. Table rows vs Finan §4/§6/§10/§11 and NOTE p.1-2 (δ, δ_t; simple interest a(t)=1+ti per cash flow): match; SOA's per-cash-flow simple-interest convention is consistent with this page (it gives no a(t)/a(s) formula). 'Compound beats simple beyond t = 1' vs Finan Theorem 6.1 p.42-43: match. Example recomputed: 1000(1+0.08*5) = 1400.00, 1000(1.08)^5 = 1469.33 = page. Links [[Force of Interest]] resolve; figure exists; LaTeX ok. Rests on Finan (rank 3) for a(t)=(1+i)^t, e^{δt}; example is the vault's own -> medium. Open: F-001 nit.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions, PDF p.14, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest, PDF p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest (Theorem 6.1), PDF p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10 Force of Interest: Continuous Compounding, PDF p.78, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10 Force of Interest: Continuous Compounding, PDF p.80, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §11 Time Varying Interest Rates, PDF p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
