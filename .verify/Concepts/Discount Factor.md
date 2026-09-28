---
target: Concepts/Discount Factor.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: v = 1/(1+i) vs NOTE p.1; v = 1 - d vs FIN §8 p.57 eq.(8.4); v^n and PV = C v^n = C/(1+i)^n compound-interest discounting (FIN §8 p.57, §10 p.79: 1000(1+i)^-8 = 1000e^-8delta); v = e^-delta under constant force vs FIN §10 p.79. Worked example (vault's own) recomputed: 1.04^-5 = 0.8219271, PV = 8219.27 - correct (the displayed line 10,000 x 0.82193 would give 8219.30; the page carries the unrounded factor, result right, no finding). Figure (v per step back to v^4) consistent. Cross-exam: linked from cas6c-2017s-q16 and Concepts/Insurance Cash Flows.md (v = 1/(1+r)) - same meaning, no conflict. Links resolve; LaTeX fine.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.79, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
