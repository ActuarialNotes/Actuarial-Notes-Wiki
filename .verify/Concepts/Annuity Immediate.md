---
target: Concepts/Annuity Immediate.md
created: 2026-09-28
---

## [F-001] Example PV off by 3 cents
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Present Value of a 5-Year Annuity-Immediate', last line
- claim: 'a_5 = 0.25274/0.06 ≈ 4.2124' and 'PV = 1,200 × 4.2124 ≈ $5,054.87'
- evidence: Recomputed (python): v^5 = 0.747258, a_5@6% = 4.212364, PV = 1,200 × 4.212364 = 5,054.84. The page's own lines do not resolve: 0.25274/0.06 = 4.21233 (not 4.2124) and 1,200 × 4.2124 = 5,054.88 (not 5,054.87). Formula a_n = (1-v^n)/i per FIN §15 p.144 and SOA-S Q4 p.4.
- source_rank: 5
- proposed_action: Maintainer: show a_5 = 4.212364 and PV ≈ $5,054.84.
- applied: false
- fingerprint: 8f6befb717cb

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (payments at the end of each period) and symbols a_n, s_n vs NOTE p.1 (image); a_n = (1-v^n)/i vs FIN (15.1) p.144 and SOA-S Q4 p.4 (image); s_n = ((1+i)^n-1)/i and 'accumulated value right after the nth payment' vs FIN p.145; 'PV one period before the first payment' vs FIN p.144/176; s_n = (1+i)^n a_n follows from the two (checked numerically). Example recomputed in python (F-001, 3 cents). Links, figure, LaTeX resolve. 'Building block for loans, bonds, reserves' is a generic remark, not filed. Medium: example is the vault's own; formulas partly rank 3.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example rewritten as one align* with six-decimal factors: v^5=0.747258, a_5@6%=(1-0.747258)/0.06=4.212364, PV=1,200×4.212364=5,054.84 (was 4.2124 and 5,054.87, neither of which followed from the lines before them). Python: 1,200·Σv^k, k=1..5 = 5,054.837.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: definition (end-of-period payments) and a/s symbols vs notation note p.1; a_n=(1-v^n)/i vs Finan (15.1) p.144; s_n=((1+i)^n-1)/i, accumulated right after the nth payment, vs Finan p.145-146; s_n=(1+i)^n a_n follows. Example recomputed in python: v^5=0.747258, a_5=4.212364, PV=5,054.84 (brute-force sum 5,054.837). 12 math nodes typeset in KaTeX; links and figure resolve.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.144-146, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
