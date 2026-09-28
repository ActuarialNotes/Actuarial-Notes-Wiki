---
target: Concepts/Effective Rate.md
created: 2026-09-28
---

## [F-001] Comparison example: 6.9% monthly gives 7.1224%, not 7.1286%, and the conclusion is reversed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: Comparing Two Rates example, answer lines 30-31
- claim: Monthly: i = (1+0.069/12)^12 - 1 = (1.00575)^12 - 1 = 7.1286%. Monthly compounding is slightly better.
- evidence: Recomputed: 1.00575^12 = 1.0712245, so 6.9% convertible monthly is 7.12245% effective; 7% convertible semi-annually is 1.035^2 - 1 = 7.1225% (the page's semi-annual line is right). The semi-annual rate is higher by 0.00005 percentage points - the two are essentially equivalent (the i^(12) equivalent to 7% semi-annual is 12[(1.071225)^(1/12) - 1] = 6.90005%), and if either is 'better' it is the semi-annual one. The page's 7.1286% is wrong in the third decimal and its conclusion 'Monthly compounding is slightly better' is the opposite of what the numbers show. Method (i = (1 + i^(m)/m)^m - 1) is right per FIN §9 p.67 and BA2 p.6.
- source_rank: 5
- proposed_action: Maintainer: correct the monthly figure to 7.1224% and the conclusion (the rates are practically equivalent; semi-annual is marginally higher), or choose rates that differ visibly.
- applied: false
- fingerprint: a60b6bd8a751

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition (rate credited once per period, equivalent to a nominal rate compounded more often) vs FIN §9 p.66-67 and NOTE p.1 (effective rate i); i = (1 + i^(m)/m)^m - 1 vs FIN §9 p.67 and BA2 p.6; d = iv = i/(1+i) vs NOTE p.1 and FIN (8.2)-(8.3) p.57. Worked example (vault's own) recomputed: semi-annual 7.1225% correct; monthly 7.12245% vs page 7.1286% and the conclusion reversed (F-001, major). Figure (annual/quarterly/continuous paths to the same 1+i) consistent. Links resolve; LaTeX fine. Low: a worked-example result and its conclusion are materially wrong and open.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9, PDF p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf
