---
target: Concepts/Annuity Due.md
created: 2026-09-28
---

## [F-001] Example PV carries rounding from the 4-digit factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Present Value of a 4-Year Annuity-Due', last line
- claim: 'PV = 800 × 3.7233 ≈ $2,978.64'
- evidence: Recomputed (python): v^4 = 0.822702, a_4@5% = 3.545951, ä_4 = 1.05 a_4 = 3.723248, PV = 800 × 3.723248 = 2,978.60 (brute-force sum 800(1 + v + v^2 + v^3) = 2,978.60). 800 × 3.7233 = 2,978.64 only because ä was rounded to 4 d.p. Method matches FIN §16 p.158-160 (ä_n = (1-v^n)/d = (1+i)a_n).
- source_rank: 5
- proposed_action: Maintainer: show PV ≈ $2,978.60 (carry ä_4 = 3.723248).
- applied: false
- fingerprint: e5e6eee3ae03

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (payments at the beginning of each period) and symbol ä_n vs NOTE p.1 (image); ä_n = (1+i)a_n and s̈_n = (1+i)s_n vs FIN Thm 16.2 p.160; ä_n = (1-v^n)/d and s̈_n = ((1+i)^n-1)/d vs FIN p.158; 'accumulated value one period after the final payment' vs FIN p.157 (Fig 16.1/16.3 text); d = i/(1+i) vs NOTE p.1. Example recomputed in python (F-001, 4 cents). Links, figure, LaTeX (\$$800$ shape handled by vaultMath) resolve. Medium: example is the vault's own; formulas rest on rank 3 plus NOTE notation.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §16 Annuity in Advance: Annuity Due, PDF p.157-160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example rewritten as one align* carrying six decimals: v^4=0.822702, a_4@5%=3.545951, ä_4=1.05·a_4=3.723248, PV=800×3.723248=2,978.60 (was 2,978.64 from the 4-d.p. factor). Python: 800(1+v+v^2+v^3)=2,978.598, agreeing.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: definition and ä/s̈ symbols vs notation note p.1; ä_n=(1+i)a_n=(1-v^n)/d and s̈_n=(1+i)s_n=((1+i)^n-1)/d vs Finan p.158-160; d=i/(1+i) vs notation note p.1. Example recomputed in python: v^4=0.822702, a_4=3.545951, ä_4=3.723248, PV=2,978.60 (brute-force sum 2,978.598). 11 math nodes typeset in KaTeX; links and figure resolve.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.157-160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
