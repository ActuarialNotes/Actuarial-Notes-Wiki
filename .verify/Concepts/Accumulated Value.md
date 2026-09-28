---
target: Concepts/Accumulated Value.md
created: 2026-09-28
---

## [F-001] Multi-cash-flow formula a(t)/a(t_k) stated without the compound-interest condition; contradicts SOA's simple-interest convention
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: formula block 'AV = sum_k C_{t_k} a(t)/a(t_k)' (lines 20-22) and the accumulation-factor bullet (line 26)
- claim: For cash flows C_{t_k} at times t_k <= t, 'the total accumulated value at time t is AV = sum_k C_{t_k} a(t)/a(t_k)', with a(t)/a(s) called the accumulation factor, stated for any accumulation function.
- evidence: SOA's notation note (NOTE p.2, read as page image) states: 'If an examination question specifies simple interest, the accumulation function for each cash flow is given by a(t) = 1 + ti, with t measured from the moment that cash flow occurs.' Finan Remark 4.3 (p.31) contrasts exactly this with the a(t)/a(s) approach of §2 (p.16): 'According to the SOA/CAS, simple interest is generally understood to mean that the linear function starts all over again from the date of each deposit or withdrawal.' SOA sample solution 112 (solutions PDF p.32) applies it: Gomer's deposit at time 3 accumulates by 'accumulation function from time 3 is 1 + yt', i.e. 1000(1 + 2y) at time 5, not 1000 a(5)/a(3). Recomputation: 100 deposited at t=1 at 10% simple, valued at t=3 — SOA convention 100(1 + 0.1*2) = 120.00; the page's a(t)/a(t_k) with a(t) = 1 + it (the form the linked [[Accumulation Function]] page lists for simple interest) gives 100(1.3/1.1) = 118.18. The formula is right for compound interest and any force of interest, but the page states it without that condition, and an FM student applying it to a simple-interest question gets a different number from SOA's.
- source_rank: 1
- proposed_action: Maintainer: state that a(t)/a(t_k) holds under compound interest (or a force of interest), and that under simple interest SOA accumulates each cash flow by 1 + i(t - t_k) from its own date (NOTE p.2).
- applied: false
- fingerprint: fa2d4d453b0c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs NOTE p.1 ('future value' when all cash flows are accumulated) and SYL Topic 1/2 (p.2-3): consistent. AV = PV*a(t) and the accumulation factor a(t)/a(s) vs Finan §2 p.16: match; compound form (1+i)^(t-t_k) vs Finan §6 p.41: match. Simple-interest case vs NOTE p.2 (page image) and SOA S112 p.32: the general a(t)/a(t_k) form conflicts -> F-001 (major, open). Worked example recomputed in python: 500(1.05)^4 = 607.753, 800(1.05)^2 = 882.000, total 1489.75 = page. Links [[Accumulation Function]], [[Present Value]] resolve; figure Media/Figures/Accumulated_Value.svg exists; LaTeX renders (\$$500$ is the vault's escaped-dollar pattern). Example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments, learning objective and outcome b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Remark 4.3, SOA/CAS convention), PDF p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
