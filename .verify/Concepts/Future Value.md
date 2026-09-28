---
target: Concepts/Future Value.md
created: 2026-09-28
---

## [F-001] Worked example's result is wrong: 500 s-double-dot_4 at 6% is 2318.55, not 2431.01
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: Example 'Saving for a Future Goal', answer line (line 31)
- claim: 'FV = 500(1.06)^4 + 500(1.06)^3 + 500(1.06)^2 + 500(1.06)^1 = 500 s-double-dot_4 ≈ 2431.01'
- evidence: Recomputed in python from the page's own sum: 1.06^4 + 1.06^3 + 1.06^2 + 1.06 = 1.262477 + 1.191016 + 1.123600 + 1.060000 = 4.637093, and (1.06)((1.06^4 - 1)/0.06) = 4.637093 = s-double-dot_4|6% (NOTE p.1-2: s-double-dot_n is the accumulated value of an annuity-due of n payments of 1); 500 x 4.637093 = 2318.55. The page's 2431.01 implies a factor of 4.86202, which no reading of the stated terms produces. The setup and the four terms are right; only the final number is wrong, by 112.46 (4.9%).
- source_rank: 5
- proposed_action: Replace 2431.01 with 2318.55 (500 x 4.63709).
- applied: false
- fingerprint: f11c0c862edc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs NOTE p.1 ('future value' when all cash flows are accumulated): match. FV = PV(1+i)^n and FV_n = sum C_t(1+i)^{n-t} vs Finan §7 p.50 (Example 7.1 FV = PV(1+i)^3) and §6 p.41: match. 'Inverse of present value' vs Finan §7 p.50 ('accumulation and discounting are opposite processes'): match. Example: annuity-due identification right (NOTE p.1-2), terms right, final number wrong -> F-001 (major, open; the right value 2318.55 is my recomputation only, so not applied). Links [[Accumulated Value]], [[Compound Interest]], [[Present Value]], [[Annuity Due]] resolve; figure exists; LaTeX ok.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments, learning objective and outcome b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
