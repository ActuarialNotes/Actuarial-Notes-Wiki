---
target: Concepts/Duration Matching.md
created: 2026-09-28
---

## [F-001] Redington's convexity condition presented as the condition for full immunization
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: critical
- status: open
- locus: bullet after the two display formulas (deleted)
- claim: 'For **full [[Immunization]]** (protection against any single interest rate change), [[Convexity]] must also satisfy $C_{assets} \geq C_{liabilities}$'
- evidence: SOA Q268 (questions PDF p.113) / S268 (solutions p.69): equal PV, equal modified durations and asset convexity exceeding liability convexity 'are precisely what is required for Redington immunization' — 'Fully immunized' (B) is a wrong option. Full immunization is PV + duration + asset cash flows before and after the liability: Finan §56 p.486 conditions (1)-(3); SOA S56 (p.16) and S105 (p.30) solve it from the PV and derivative equations with asset flows bracketing the liability; S333 (p.88) II ('the durations will be equal'). No source makes a convexity inequality the full-immunization condition. A student trusting the bullet answers Q268 'fully immunized'.
- source_rank: 1
- proposed_action: Delete the bullet (done); full immunization's conditions live on [[Full Immunization]].
- applied: true
- fingerprint: e2ca023e9cf1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the bullet 'For full [[Immunization]] (protection against any single interest rate change), [[Convexity]] must also satisfy C_assets ≥ C_liabilities'. The opening's '(also called Redington immunization when combined with convexity conditions)', the two matching conditions, the remaining bullet and the example are unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: After the deletion (F-001, critical, resolved): PV and duration conditions vs Finan §55 p.479-480 conditions (1)-(2) and S268 ✓; 'Redington when combined with convexity conditions' vs S268/Finan p.480 ✓; 'small parallel shifts' vs S432/Finan p.479 ✓. Example recomputed: 10,000/1.06^5 = 7,472.58 ✓; D_mac of a single payment = its time (DUR (3.5) p.6) ✓; portfolio duration as the PV-weighted average vs S106 p.30 and S354 p.94 ✓. Links and figure resolve; linked only from Exam FM. Medium: example is the vault's own.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.479, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §56 Full Immunization and Dedication, PDF p.486, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF p.69, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 56, solutions PDF p.16, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 105, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 354, solutions PDF p.94, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3, (3.5), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
