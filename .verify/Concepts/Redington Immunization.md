---
target: Concepts/Redington Immunization.md
created: 2026-09-28
---

## [F-001] Example's convexity values omit the (1+j)^-2 factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example, 'Condition 3' paragraph
- claim: 'For zero-coupon bonds, convexity of the asset portfolio equals a weighted average of t(t+1) terms ... Asset convexity = ½[2(3) + 6(7)] = 24 > 20.'
- evidence: Convexity (modified, the FM default per NOTE p.2) of a zero-coupon payment at t is t(t+1)/(1+i)^2 — DUR (5.4) p.8; SOA S390 (solutions p.103) gives a 50-year zero's convexity as 2550/1.05^2 = 2313, not 2550. Recomputed at 5%: asset convexity = 24/1.05^2 = 21.77, liability 20/1.05^2 = 18.14. The comparison 24 > 20 still gives the right conclusion (the common factor cancels), but the values the page calls 'convexity' are 10% too high, and the stated rule would give wrong numbers if carried to a question that asks for a convexity.
- source_rank: 1
- proposed_action: Maintainer: divide by (1+j)^2 (21.77 > 18.14), or say explicitly that the comparison uses Σ t(t+1)-weights with the common v^2 factor cancelled.
- applied: false
- fingerprint: 3f872e5cfa94

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Three conditions vs S268 p.69, S295 p.77 and Finan §55 p.480 (1)-(3) ✓ (Macaulay vs modified durations equivalent at equal PV, S106 p.30); small parallel shifts only vs S432 (E), S333 I ✓; rebalancing vs Finan p.480 (d) and S432 (B) ✓; ΔS ≈ ½(C_A − C_L)V(Δj)² from the second-order expansion, Finan p.480 ✓; less restrictive than matching vs S147 p.40 ✓. Example recomputed in python: Xv² = Yv⁶ = 5000v⁴, X = 4,535.15 (≈4,535 ✓), Y = 5,512.50 (≈5,513 ✓), PV and D = 4 check out; modified convexities 21.77 (assets) vs 18.14 (liability), not 24 vs 20 → F-001 (major, open). Links and figure resolve; linked only from Exam FM. Low: a major is open.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.479, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF p.69, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 390, solutions PDF p.103, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5, (5.4), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
