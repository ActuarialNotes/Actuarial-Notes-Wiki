---
target: Concepts/Arithmetic Increasing Annuity.md
created: 2026-09-28
---

## [F-001] Example PV off by 2 cents from intermediate rounding
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Present Value of Payments 1, 2, 3, 4, 5', last two lines
- claim: '(Ia)_5 = 0.7288/0.06 ≈ 12.1467' and 'PV = 100 × 12.1467 ≈ $1,214.67'
- evidence: Recomputed (python): ä_5@6% = 4.465106, 5v^5 = 3.736291, (Ia)_5 = 0.728815/0.06 = 12.146912, PV = 1,214.69; brute-force sum 100t·1.06^-t, t = 1..5 = 1,214.69. The page's 1,214.67 comes from rounding the numerator to 0.7288. Formula (Ia)_n = (ä_n - n v^n)/i per SOA-S Q4 p.4 and Q118 p.33.
- source_rank: 5
- proposed_action: Maintainer: show (Ia)_5 ≈ 12.1469 and PV ≈ $1,214.69.
- applied: false
- fingerprint: eab874c96302

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: (Ia)_n = (ä_n - n v^n)/i vs SOA-S Q4 p.4 and Q118 p.33 (images) and FIN (26.5) p.235; (Is)_n = (1+i)^n (Ia)_n vs FIN p.235; general P, Q formula PV = P a_n + (Q/i)(a_n - n v^n) vs FIN (26.3) p.234 (and recomputed: P = Q = 100 gives 1,214.69, matching 100(Ia)_5). Example recomputed in python (F-001, 2 cents). Links, figure, LaTeX (\$$100,\,\$200…$ promoted by vaultMath) resolve. Medium: example is the vault's own.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 118, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
