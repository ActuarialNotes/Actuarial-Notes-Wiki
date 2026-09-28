---
target: Concepts/Level Annuity.md
created: 2026-09-28
---

## [F-001] Annuity-due value carries rounding (3,723.3 vs 3,723.25)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Annuity-Immediate vs. Annuity-Due', second line
- claim: 'Due: 1000 × ä_4 = 3546.0 × 1.05 = 3723.3'
- evidence: Recomputed (python): a_4@5% = 3.545951, 1,000 a_4 = 3,545.95; ä_4 = 3.723248, 1,000 ä_4 = 3,723.25. 3,546.0 × 1.05 = 3,723.3 carries the rounding of 3,545.95 up to 3,546.0.
- source_rank: 5
- proposed_action: Maintainer: show 3,545.95 and 3,723.25.
- applied: false
- fingerprint: 18c16f9c533a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Level annuity / level payment annuity and 'Level annuity, finite term' vs SYL p.3; immediate (end) and due (beginning) vs NOTE p.1 (image); a_n = (1-v^n)/i vs FIN p.144; ä_n = (1-v^n)/d vs FIN p.158; ä_n = (1+i)a_n vs FIN Thm 16.2 p.160. Example recomputed in python: 3,545.95 (page 3,546.0, fine at 1 d.p.) and 3,723.25 (F-001). Links, figure, LaTeX resolve. Medium: example is the vault's own.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §16 Annuity in Advance: Annuity Due, PDF p.157-160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
