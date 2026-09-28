---
target: Concepts/Payable m-thly.md
created: 2026-09-28
---

## [F-001] 'Whole-life' annuity named on an annuity-certain page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: first sentence
- claim: 'The present value of a whole-life or n-year Annuity Immediate payable m-thly uses the modified annuity symbol a^(m)_n'
- evidence: SYL p.3 Topic 2 is 'Annuities/cash flows with non-contingent payments'; FIN p.143 calls an annuity paid as long as a person survives a contingent (life) annuity, outside annuities-certain; a^(m)_n = (1-v^n)/i^(m) (FIN §24 p.218) values n conversion periods of payments, not a whole-life annuity. The clause is contradicted by the sources and is not needed.
- source_rank: 1
- proposed_action: Delete 'whole-life or' (done): the sentence now reads 'The present value of an n-year Annuity Immediate payable m-thly uses …'.
- applied: true
- fingerprint: 77f28e837162

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted 'a whole-life or' and wrote 'an' before '$n$-year'; the formula line is unchanged.

## [F-002] Example PV 9,068 should be 9,072.43
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Monthly Annuity Present Value'
- claim: 'i^(12) = 12[(1.06)^{1/12}-1] = 12(0.004868) = 5.842%' … '1200 · 0.44161/0.05842 = 1200 × 7.557 = 9068'
- evidence: Recomputed (python): j = 1.06^{1/12} - 1 = 0.00486755, i^(12) = 0.0584106 (5.8411%), 1 - 1.06^{-10} = 0.441605, a^(12)_10 = 7.560360, PV = 1,200 × 7.560360 = 9,072.43; brute-force sum of 100(1.06)^{-k/12}, k = 1..120, = 9,072.43. On the page, 0.44161/0.05842 = 7.5592 (not 7.557), and 12 × 0.004868 over-rounds i^(12); the PV is $4.43 low. Method a^(m)_n = (1-v^n)/i^(m) per FIN §24 p.218 (Ex. 24.2 p.219 same set-up).
- source_rank: 5
- proposed_action: Maintainer: show i^(12) = 5.8411%, a^(12)_10 = 7.5604 and PV ≈ 9,072.43.
- applied: false
- fingerprint: e2d08c0fa617

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: m payments of 1/m per period and a^(m)_n = (1-v^n)/i^(m) vs FIN §24 p.218 (and the 'periodic rent' coefficient remark p.219); i^(m) notation and v = 1/(1+i) vs NOTE p.1 (image); 'payable m-thly' syllabus term vs SYL p.3; 'whole-life' clause removed (F-001, fixed, FIN p.143 contingent vs certain); example recomputed (F-002). Links, figure, LaTeX resolve. Medium: example is the vault's own; formulas rank 3.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §24 Analysis of Annuities Payable More Frequently than Interest is Convertible, PDF p.218-220, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'The Basics of Annuity Theory' introduction, PDF p.143, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
