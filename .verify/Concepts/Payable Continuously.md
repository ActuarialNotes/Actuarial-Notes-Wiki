---
target: Concepts/Payable Continuously.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: 'Payable continuously' is a syllabus term (SYL p.3); ā_n = ∫v^t dt = ∫e^{-δt} dt = (1-e^{-δn})/δ = (1-v^n)/δ vs FIN §25 p.228 and SOA-S Q115 p.33 (image); limit of a^(m)_n as m -> ∞ vs FIN p.228 (and numerically, m = 10^6 at 6%, n = 10: 7.578745 vs 7.578745). Example recomputed: e^{-0.35} = 0.704688, ā_5 = 4.218742, PV = 4,218.74 (page 4,219 — rounded to the dollar, fine). Links, figure, LaTeX resolve. Medium: example is the vault's own.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §25 Continuous Annuities, PDF p.228-230, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 115, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
