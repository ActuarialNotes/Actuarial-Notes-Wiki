---
target: Concepts/Continuous Annuity.md
created: 2026-09-28
---

## [F-001] Second example's AV off by 1 cent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Accumulated Value of a Continuous Annuity', last two lines
- claim: '0.47746/0.048790 ≈ 9.7859' and 'AV = 500 × 9.7859 ≈ $4,892.94'
- evidence: Recomputed (python): δ = ln 1.05 = 0.0487902, 1.05^8 = 1.477455, s̄_8 = 0.477455/0.0487902 = 9.785895, AV = 4,892.95 (numerical integral of 500e^{δ(8-t)} over [0,8] = 4,892.95). 500 × 9.7859 = 4,892.95, not 4,892.94. FIN Example 25.4 p.230 uses the same s̄_n = ((1+i)^n - 1)/δ.
- source_rank: 5
- proposed_action: Maintainer: show AV ≈ $4,892.95.
- applied: false
- fingerprint: e50bf782df1c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: ā_n = ∫v^t dt = (1-v^n)/δ = (1-e^{-δn})/δ vs FIN §25 p.228 and SOA-S Q115 p.33 (image); s̄_n = ((1+i)^n-1)/δ = (e^{δn}-1)/δ and s̄_n = (1+i)^n ā_n vs FIN p.229 and SOA-S Q115; ā_n = (i/δ)a_n > a_n vs FIN p.228; v = e^{-δ}, δ = ln(1+i) vs FIN p.228; δ symbol vs NOTE p.1. Example 1 recomputed: e^{-0.6} = 0.548812, ā_10 = 7.519806, PV = 7,519.81 (matches). Example 2 (F-001, 1 cent). Links, figure resolve; one-line $$\begin{align*}…$$ blocks are the shape vaultMath promotes to display. Medium: examples are the vault's own.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 115, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §25 Continuous Annuities, PDF p.228-230, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
