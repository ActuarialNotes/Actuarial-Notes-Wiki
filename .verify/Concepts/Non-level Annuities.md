---
target: Concepts/Non-level Annuities.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: The three categories (arithmetic, geometric, other non-level cash flows) vs SYL p.3 Topic 2 outcome b (word for word); PV = Σ C_t v^t as the general method vs FIN §26 p.234 ('taking the present value … of each payment separately and adding the results'). Example recomputed in python: 95.2381 + 181.4059 + 259.1513 + 329.0810 = 864.88 (matches, each term too). Links, figure, LaTeX resolve. Medium: example is the vault's own; method rank 3.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
