---
target: Concepts/Fund Accumulation.md
created: 2026-09-28
---

## [F-001] 'When deposits are level' the sum reduces to C s_n only for end-of-period deposits at t = 1..n
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: second bullet (line 19)
- claim: 'When deposits are level, sum_t C_t(1+i)^{n-t} reduces to C s_{n|i}, the annuity accumulated value.'
- evidence: NOTE p.1: s_n is 'the accumulated value of an annuity-immediate with n payments of 1', and an annuity-immediate has 'payments made at the end of each period'; level deposits at the beginning of each period accumulate to C s-double-dot_n (NOTE p.1-2). The page's sum has no stated range for t, so 'level' alone does not give s_n (deposits at t = 0..n-1 give C(1+i)s_n). The link text points at [[Annuity Immediate]], which partly carries the condition.
- source_rank: 1
- proposed_action: Maintainer: state the timing ('level deposits C at the end of each of years 1..n').
- applied: false
- fingerprint: ab1cf0ff5aaa

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: AV_n = F_0(1+i)^n + sum C_t(1+i)^{n-t} vs compound accumulation (Finan §6 p.41; NOTE p.1 s_n): match. Level-deposit reduction -> F-001 (minor, timing). Second-fund scenario ('common Exam FM scenario') vs SOA sample Q403 (p.170, Fund X interest reinvested in Fund Y; S403 p.106 uses 930.83 s_5|i) and Q280 (p.118, interest reinvested at 5%): supported. Examples recomputed: 2000(1.05)^6 = 2680.19, s_6|5% = 6.801913, 300 s_6 = 2040.57, AV = 4720.77 (page 4720.76, sum of the rounded parts — fine); Fund B 25 s_4|8% = 25(4.506112) = 112.65 = page. Note: 'fund accumulation' is not a term in SYL Topic 1 a) (p.2), though the vault's Exam FM page lists it among that outcome's terms — an exam-page matter, not this page's. Links resolve; figure exists; LaTeX ok. Examples are the vault's own -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments, learning objective and outcome b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF p.170, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 280, questions PDF p.118, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf

## [F-001/R] Level-deposit reduction states its timing
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Bullet now: level deposits C at the end of each period (t = 1..n) reduce the sum to C s_n|i, the annuity-immediate accumulated value; level deposits at the start of each period (t = 0..n−1) give C s̈_n|i (annuity-due). SOA notation note p.1: s_n is the accumulated value of an annuity-immediate (payments at the end of each period), s̈_n that of an annuity-due (payments at the beginning), p.1-2. Checked in python at C = 300, i = 5%, n = 6: Σ_{t=1..6} 300(1.05)^(6−t) = 2040.57 = 300 s_6; Σ_{t=0..5} = 2142.60 = 300(1.05)s_6 = 300 s̈_6.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001. AV_n = F_0(1+i)^n + Σ C_t(1+i)^(n−t) vs compound accumulation (Finan §6 p.41): match. Level-deposit bullet vs NOTE p.1-2 (s_n annuity-immediate, s̈_n annuity-due): match, checked numerically (2040.57 vs 2142.60). Second-fund scenario vs SOA Q403/S403 (Fund X interest reinvested in Fund Y; 930.83 s_5|i = 5461, i = 8.00%): supported. Examples recomputed in python: 2000(1.05)^6 = 2680.19, s_6|5% = 6.801913, 300 s_6 = 2040.57, AV = 4720.77 (page 4720.76 = sum of the two rounded parts, consistent); Fund B 25 s_4|8% = 25(4.506112) = 112.65 = page. Links [[Accumulation Function]], [[Annuity Immediate]], [[Annuity Due]], [[Accumulated Value]], [[Future Value]] resolve; figure exists. Examples are the vault's own -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF pp.170-171, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
