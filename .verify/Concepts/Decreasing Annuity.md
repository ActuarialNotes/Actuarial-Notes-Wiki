---
target: Concepts/Decreasing Annuity.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: (Da)_n = (n - a_n)/i vs FIN (26.6) p.236; (Ds)_n = (1+i)^n (Da)_n vs FIN p.236 and SOA-S Q5 p.4 (image: 6(Ds)_10 = 6(10(1.09)^10 - s_10)/0.09); (Ia)_n + (Da)_n = (n+1)a_n vs FIN Ex. 26.5 p.237 (and numerically: 25.274183 both sides at 6%, n = 5); general decreasing PV = P a_n - (Q/i)(a_n - n v^n) from FIN (26.3) p.234 with Q -> -Q (recomputed: P = 500, Q = 100 gives 1,312.73). Example recomputed in python: a_5 = 4.212364, (Da)_5 = 13.127270, PV = 1,312.73; brute force 1,312.73 — matches. Links, figure, LaTeX resolve. Medium: example is the vault's own.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 5, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
