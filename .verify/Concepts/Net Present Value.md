---
target: Concepts/Net Present Value.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: NPV = sum C_t v^t = PV(inflows) - PV(outflows) vs Finan §30 p.277 ('NPV(i) = sum ν^{t_k} c_{t_k} ... the present value of cash inflows minus the present value of cash outflows'): match. IRR = rate where NPV = 0 vs Finan p.275 ('yield rates are solutions to the equation NPV(i) = 0'; yield rate 'also known as the internal rate of return'): match. Positive/negative NPV interpretation vs Finan p.278 ('projects with positive NPV are considered acceptable ... NPV(i) < 0 should be rejected'): match. v vs NOTE p.1: match. Example recomputed: v^3 = 0.839619, a_3|6% = 2.673012, NPV_A = -10000 + 10692.05 = 692.05 (page $692), NPV_B = -10000 + 10495.24 = 495.24 (page $495); A > B = page. Links resolve; figure exists; LaTeX ok (\$$692 > \$495$ is promoted by vaultMath). Claims rest on Finan (rank 3); example is the vault's own -> medium. No findings.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Rate of Return of an Investment' introduction, PDF p.275, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.277, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.278, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
