---
target: Concepts/Cash Flow.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (payment at a point in time, positive or negative) vs DUR §2 p.4 (a cash flow is a pair (a,t), amount may be negative) and Finan §30 p.276 (net cash flow c_t positive or negative); PV = ΣC_t v^t vs DUR (2.1) p.4 and NOTE p.1 (v = 1/(1+i), present/current value). Example recomputed: 500/1.08 = 462.96, 200/1.08^2 = 171.47, 1000/1.08^3 = 793.83; the displayed line 462.96 − 171.47 + 793.83 = 1085.32 resolves; unrounded sum 1085.3274 → 1085.33 (one-cent effect of summing rounded terms — rounding only, no finding). All eight links and the figure resolve; linked from Exam FM only (Exam 6U links the distinct page [[Cash Flow Statement]]). Medium: example is the vault's own.
- sources_checked: Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §2 Cash Flow Series and Present Value, (2.1), PDF p.4, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.276, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
