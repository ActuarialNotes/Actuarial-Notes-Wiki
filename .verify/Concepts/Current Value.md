---
target: Concepts/Current Value.md
created: 2026-09-28
---

## [F-001] Current-value formula a(t)/a(t_k) stated without the compound-interest condition; contradicts SOA's simple-interest convention
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: formula block 'Current Value at time t = sum_k C_k a(t)/a(t_k)' (lines 16-20)
- claim: The current value at time t is sum_k C_k a(t)/a(t_k), 'using the applicable Interest Rate or Accumulation Function', with no restriction on the accumulation function.
- evidence: SOA's notation note (NOTE p.2, read as page image) states: 'If an examination question specifies simple interest, the accumulation function for each cash flow is given by a(t) = 1 + ti, with t measured from the moment that cash flow occurs.' Finan Remark 4.3 (p.31) contrasts exactly this with the a(t)/a(s) approach of §2 (p.16): 'According to the SOA/CAS, simple interest is generally understood to mean that the linear function starts all over again from the date of each deposit or withdrawal.' SOA sample solution 112 (solutions PDF p.32) applies it: Gomer's deposit at time 3 accumulates by 'accumulation function from time 3 is 1 + yt', i.e. 1000(1 + 2y) at time 5, not 1000 a(5)/a(3). Recomputation: 100 deposited at t=1 at 10% simple, valued at t=3 — SOA convention 100(1 + 0.1*2) = 120.00; the page's a(t)/a(t_k) with a(t) = 1 + it (the form the linked [[Accumulation Function]] page lists for simple interest) gives 100(1.3/1.1) = 118.18. The formula is right for compound interest and any force of interest, but the page states it without that condition, and an FM student applying it to a simple-interest question gets a different number from SOA's.
- source_rank: 1
- proposed_action: Maintainer: restrict the formula to compound interest / a force of interest, and add SOA's simple-interest rule (each cash flow accumulates by 1 + ti from its own date, NOTE p.2).
- applied: false
- fingerprint: e7c50179ff98

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs NOTE p.1 (page image): 'the accumulated value of the cash flows occurring prior to the given date plus the discounted value of the cash flows occurring on or after the given date'; 'present value' when all are discounted, 'future value' when all are accumulated — the page's prose matches. Formula vs Finan §2 p.16 (accumulation factor) and §7 p.51 (Example 7.2, current value (1+i)^n + (1+i)^-n): right for compound interest; conflicts with NOTE p.2 simple-interest convention -> F-001 (major, open). Example recomputed: 1000(1.05)^2 = 1102.50, 1000(1.05)^-2 = 907.029, sum 2009.53 = page. Links [[Interest Rate]], [[Accumulation Function]] resolve; figure exists; LaTeX ok. Also linked from Exam FM Topics 1, 2 and 5 (current value) — same definition throughout.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments, learning objective and outcome b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Remark 4.3, SOA/CAS convention), PDF p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions (Example 7.2, current value), PDF p.51, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
