---
target: Concepts/Compound Interest.md
created: 2026-09-28
---

## [F-001] Sentence equates v^n with the discount factor v
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: third bullet (line 20)
- claim: 'For n periods at rate i, the accumulation factor (1+i)^n is called the accumulation factor, and (1+i)^{-n} = v^n is the discount factor v.'
- evidence: NOTE p.1 (page image): 'The discount factor is denoted by v and is equal to 1/(1+i).' Finan §7 p.50 calls 1+i the accumulation factor and ν = 1/(1+i) the discount factor, and calls 1/(1+i)^t = ν^t the discount function. The sentence sets v^n equal to 'the discount factor v' (v^n = v only for n = 1) and defines the accumulation factor by itself. 'Discount factor' is a term SYL Topic 1 a) (p.2) asks candidates to define.
- source_rank: 1
- proposed_action: Maintainer: reword so v = (1+i)^{-1} is the discount factor and v^n the n-period discount (the present value of 1 due at n).
- applied: false
- fingerprint: 8e24514e20f4

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition and A(t) = P(1+i)^t vs Finan §6 p.41-42 (interest earned is reinvested; a(t)=(1+i)^t for all t>=0): match. Exponential vs linear vs Finan p.42: match. 'Standard convention' vs Finan §9 p.66 ('Compound interest or discount will always be assumed, unless specified otherwise'): supported. v vs NOTE p.1: see F-001 (minor). Example recomputed: 1000(1+0.06*3) = 1180, 1000(1.06)^3 = 1191.016 -> 1191.02 = page. Links resolve; figure exists; LaTeX ok. Example is the vault's own; compound a(t) rests on Finan (rank 3) -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest (Theorem 6.1), PDF p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9 Nominal Rates of Interest and Discount, PDF p.66, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-002] Example's simple and compound lines run together into one paragraph in the app
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: Example 'Comparing Simple vs. Compound Interest', answer lines 'Simple: …', 'Compound: …', closing sentence
- claim: Three consecutive callout lines with no blank line between them: 'Simple: 1000(1 + 0.06×3) = … = 1180' / 'Compound: 1000(1.06)^3 = … = 1191.02' / 'Compound interest yields more …'.
- evidence: The app renders with remark-gfm + remark-math and no remark-breaks (quiz/src/components/wiki/WikiArticle.tsx line 466), so single newlines inside a paragraph become spaces: the two results and the sentence display as one run-on line, 'Simple: … = 1180 Compound: … = 1191.02 Compound interest yields more …'. The same cause the aa33 run summary records for SOA's i)/ii) givens. Numbers themselves recomputed: 1180 and 1191.016 -> 1191.02, correct.
- source_rank: 5
- proposed_action: Separate the three lines with blank '> >' lines so each is its own paragraph.
- applied: true
- fingerprint: 2030a3653431

## [F-001/R] Accumulation and discount factors reworded
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Bullet now: for n periods at rate i, (1+i)^n is the accumulation factor — the value at time n of 1 invested now — and v^n = (1+i)^−n is the present value of 1 due in n periods, where v = (1+i)^−1 is the discount factor (linked to [[Discount Factor]]). Sources: SOA notation note p.1 ('The discount factor is denoted by v and is equal to 1/(1+i)'); Finan §7 p.50 (1+i the accumulation factor, ν = 1/(1+i) the discount factor, (1+i)^t the accumulated value of 1 at the end of t periods, ν^t the present value of 1 to be paid at the end of t periods); Finan Remark 2.1 p.16 (a(t)/a(s) the accumulation factor, = (1+i)^n from 0 to n).

## [F-002/R] Example lines split into paragraphs
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Blank '> >' lines inserted between the Simple, Compound and closing lines of the example's answer, so each renders as its own paragraph; text and numbers unchanged (1180; 1191.02, recomputed 1000(1.06)^3 = 1191.016).
