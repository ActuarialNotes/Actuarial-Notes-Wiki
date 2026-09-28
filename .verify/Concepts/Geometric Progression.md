---
target: Concepts/Geometric Progression.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (each payment (1+g) times the previous) vs FIN §26 p.238 and SYL p.3 ('Geometric progression, finite term and perpetuity'); PV = v(1-r^n)/(1-r), r = (1+g)/(1+i), = (1-(1+g)^n(1+i)^{-n})/(i-g), i ≠ g vs FIN p.238 and SOA-S Q451 p.118 (image: the same geometric-sum form); two forms equal numerically (13.331663 at i = 7%, g = 3%, n = 20); perpetuity 1/(i-g), i > g vs FIN p.239 and SOA-S Q460 p.122 (image). Example recomputed: 5,000/0.06 = 83,333.33 (page 83,333; brute-force partial sum agrees). Links, figure, LaTeX resolve. Medium: example is the vault's own.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, geometric progression, PDF p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 451, solutions PDF p.118, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 460, solutions PDF p.122, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
