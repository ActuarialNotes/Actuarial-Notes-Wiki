---
target: questions/exam-fm/fm-an-001.md
created: 2026-10-25
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: blind recompute before the key: 1000/1.05^3 = 1000/1.157625 = 863.84 -> A = key; explanation PV = FV/(1+i)^n is Finan p.50's discount function and the SOA notation note's v, and resolves; options 863.84/857.34/950.00/1,157.63/869.57 distinct (E = 1000/1.15, simple interest), one correct; topic Time Value of Money / Time Value of Money per ontology_map; wiki_link pages Time Value of Money and Time Value of Money Equations exist and fit; validate_content and question_lint clean
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1 (v = 1/(1+i); present value), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §7 Present Value and Discount Functions, p.50 (discount function 1/(1+i)^t = v^t), sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
- note: Vault-written question verified from scratch at its new path: sourced method + independent recomputation, capped at medium as an original with no official solution. Same sources as its withdrawn predecessor's log, re-read in the cache this run.
