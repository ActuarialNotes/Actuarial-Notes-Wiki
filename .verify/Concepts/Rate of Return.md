---
target: Concepts/Rate of Return.md
created: 2026-09-28
---

## [F-001] Dollar- and time-weighted returns presented as FM content though the syllabus excludes them
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: opening paragraph ('measured two ways'), the DW/TW formulas and bullets, and the first example
- claim: 'For a fund with deposits and withdrawals during the year it is measured two ways: dollar-weighted ... and time-weighted ...' — most of the page teaches these two measures.
- evidence: SYL p.6 assigns Broverman, Mathematics of Investment and Credit (8th ed.) 'Chapter 5 (excluding 5.2 ...)'; the publisher's table of contents (ACTEX sample PDF p.8-9) titles §5.2 'Dollar-weighted and Time-weighted Rate of Return'. SYL p.5 Topic 5 lists 'yield rate/rate of return' but no dollar- or time-weighted measure, and a full-text search of the Aug 2026 SOA sample questions finds no dollar-weighted or time-weighted question. The formulas themselves are correct (Finan §33 p.302-303, §34 p.311-312); the issue is that the page does not say they are outside the current FM syllabus.
- source_rank: 1
- proposed_action: Maintainer: mark the dollar-/time-weighted material as outside the December 2026 FM syllabus, or move it off the FM path (a pedagogical call, not fixed).
- applied: false
- fingerprint: cc9014f3d9b9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: IRR = rate making NPV zero, 'i.e. the yield rate' vs Finan §30 p.279 ✓; non-uniqueness with several sign changes vs Finan §31 p.285 examples and Theorem 31.1 p.286-287 (one sign change → one positive root) ✓; DW simple-interest formula and exact equation vs Finan (33.3)-(33.4) p.302-303 ✓; TW product with B_k before C_k vs Finan §34 p.312 ✓; manager-vs-investor reading vs Finan p.311 ✓; DW/TW excluded from the Broverman reading → F-001 (minor). Examples recomputed in python: I = 10,000, DW ≈ 10,000/125,000 = 8.00%, exact 8.031% → 8.03% ✓; TW 1.2 × 0.94118 = 1.12941 → 12.94%, halves +20% / −5.88% ✓; IRR: √(6000² + 4·5500·10000) = 16,000, v = 0.90909, i = 10% ✓ (6000/1.1 + 5500/1.21 = 10,000). Links resolve; no figure; linked only from Exam FM. Medium: examples are the vault's own and the formulas rest on Finan (rank 3).
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.279, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §31 Uniqueness of IRR, PDF p.285, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §31 Uniqueness of IRR, Theorem 31.1, PDF p.287, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §33 Dollar-Weighted Interest Rate, (33.1)-(33.3), PDF p.302, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §33, (33.4), PDF p.303, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §34 Time-Weighted Rate of Interest, PDF p.311, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §34 Time-Weighted Rate of Interest, PDF p.312, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks, Broverman Chapter 5 (excluding 5.2 ...), PDF p.6, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Broverman, Mathematics of Investment and Credit (Eighth Edition, ACTEX Learning, 2023), publisher's sample PDF, table of contents, Chapter 5 §5.2 'Dollar-weighted and Time-weighted Rate of Return', PDF p.8-9, sha256:1560f9e2bbcabe090d090abfea1e8e82a93ca4c7ff289e73b4180e30ab4d3eee — https://www.actexlearning.com/samples/MIC_8th_edition_051923_SAMPLE.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Page restructured so the FM content leads: definition, the IRR equation, the IRR bullets and the IRR example first, plus a bullet placing 'yield rate/rate of return' in syllabus Topic 5 (p.5). The dollar- and time-weighted formulas, bullets and example (unchanged, still correct per Finan §33 pp.302-303 and §34 pp.311-312) now sit under their own heading marked 'Not on the December 2026 Exam FM syllabus', with the reason: the learning outcomes (p.5) name only yield rate/rate of return; the readings on p.6 exclude Broverman Ch.5 §5.2 (Dollar-weighted and Time-weighted Rate of Return), Vaaler Ch.2 §2.6 (Dollar-weighted yield rates) and assign only Brown & Kopp Ch.7 §§1-2 (so §§7.3-7.4, dollar- and time-weighted, are out) — section titles from the vault's Resources/Books pages, which transcribe the publishers' contents pages; and SOA's sample-question set, which says questions not relevant for the syllabus effective October 2022 were deleted (questions PDF p.1), contains no dollar- or time-weighted question (full-text search of all 462). The unsourced 'feeds duration and immunization work' bullet is replaced by the syllabus placement.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: IRR = rate making NPV zero, i.e. the yield rate, vs Finan §30 p.279 ✓; uniqueness with one sign change vs Finan §31 pp.285-287 ✓; Topic 5 placement vs syllabus p.5 ✓; dollar-/time-weighted marked off-syllabus vs syllabus pp.5-6 exclusions and the SOA sample set (none of 462 questions) ✓; DW simple-interest formula and exact equation vs Finan (33.3)-(33.4) pp.302-303 ✓; TW chained ratios and manager-vs-investor reading vs Finan §34 pp.311-312 ✓. Examples recomputed: IRR sqrt(6000^2 + 4·5500·10000) = 16,000, v = 0.90909, i = 10.00% ✓; DW 10,000/125,000 = 8.00%, exact 8.031% ✓; TW 1.2 × 160,000/170,000 = 1.12941 → 12.94% ✓. Links resolve. Medium: examples are the vault's own and the formulas rest on Finan (rank 3).
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.6, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), introduction, questions PDF p.1, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.279, 285-287, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.302-303, 311-312, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
