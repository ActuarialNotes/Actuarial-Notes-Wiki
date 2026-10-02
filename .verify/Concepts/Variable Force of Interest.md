---
target: Concepts/Variable Force of Interest.md
created: 2026-09-28
---

## [F-001] Example: e^0.129 is 1.1377, not 1.1378
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Accumulation Under Variable Force example, answer line 31
- claim: a(3) = e^{0.129} ≈ 1.1378
- evidence: Recomputed: the integral 0.04(3) + 0.001(3^2) = 0.129 is right; e^0.129 = 1.1376901, which rounds to 1.1377, not 1.1378. Method right (FIN §10 p.82: a(t) = exp(int_0^t delta_r dr); SOA-S Q10 p.5).
- source_rank: 5
- proposed_action: Change 1.1378 to 1.1377.
- applied: false
- fingerprint: e5cb4674d3d6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: a(t) = exp(int_0^t delta(s) ds) vs FIN §10 p.82, FIN §11 p.93 and SOA-S Q10 p.5 (image: a(t) = exp[int_0^t (s^2/100) ds] = exp(t^3/300), a(6)/a(3)); a(t)/a(s) = exp(int_s^t delta) vs SOA-S Q86 p.25 (image: e^(int_5^10 1/(t+1) dt) accumulating from 5 to 10) and SOA-S Q10 p.5; syllabus outcome b) 'time value of money equations involving variable force of interest' (SYL p.2). Notation: page delta(t), NOTE p.1 delta_t. Worked example (vault's own) recomputed: integral 0.129 correct; e^0.129 = 1.13769 vs page 1.1378 (F-001, minor rounding). Figure consistent. Links resolve; LaTeX fine.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 10, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 86, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §10, PDF p.80-82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §11, PDF p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-001/R] e^0.129 rounded correctly to 1.1377
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Changed 1.1378 to 1.1377. Recomputed in python: ∫_0^3 (0.04 + 0.002t) dt = 0.12 + 0.009 = 0.129; e^0.129 = 1.13769012 -> 1.1377. Method a(t) = exp(∫_0^t δ) per Finan §10 p.82.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001. a(t) = exp(∫_0^t δ(s) ds) vs Finan §10 p.82 and §11 p.93 (A(t) = A(0)e^{∫δ}): match; a(t)/a(s) = exp(∫_s^t δ) vs Finan Example 10.7 p.82 (10 a(5)/a(2) = 10 e^{∫_2^5 δ}), SOA S10 pp.5-6 (a(t) = exp(t^3/300)) and S86 p.25 (e^{∫_5^10 1/(t+1) dt}): match. Syllabus Topic 1 b) p.2 ('variable force of interest'). Notation δ(t) vs NOTE p.1 δ_t: equivalent. Example recomputed in python: ∫_0^3 (0.04 + 0.002t) dt = 0.129; e^0.129 = 1.137690 -> 1.1377 = page. Links [[Accumulation Function]], [[Time Value of Money Equations]] resolve; figure exists. Example is the vault's own -> medium.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 10, solutions PDF pp.5-6, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 86, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
