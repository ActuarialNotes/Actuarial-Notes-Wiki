---
target: Exam 5 (CAS).md
created: 2026-10-09
---

## [F-001] Domain A lacks task A18 on rate proposals
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: Learning Objectives, A. Ratemaking, task list (ends at 17)
- claim: Domain A lists 17 tasks; the page has no task 18.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), p.4: Domain A has 18 tasks; A18 reads 'Understand qualitative considerations for developing and filing rate proposals.' The p.6 references table cites Werner & Modlin for 'A1-15, A17-A18', so A18 is examinable from Werner. No line on the page carries it.
- source_rank: 1
- proposed_action: Add task 18 to the Domain A callout with the outline's wording, linking its concepts (syllabus_write.py can generate it).
- applied: false
- fingerprint: 1e15c61804f9

## [F-002] Task statements carry content the outline does not, and A10 is reworded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: Learning Objectives, tasks A3, A6, A7, A9, A10, A11, A14, A15, B6, B8, B9
- claim: A3 adds 'close year', 'net of reinsurance' and '; collect written, earned and unearned premium and Earned Exposure'. A6 adds 'such as Frequency, Severity, Pure Premium and Loss Ratio' and 'such as development and trend'. A7 adds 'On Level Premium' and 'via the parallelogram method or extension of exposures'. A9 adds 'the Expense Ratio', 'underwriting profit' and '; determine indicated Rate Change'. A10 reads 'Demonstrate proper handling of extraordinary losses ... (e.g., Large Losses, Catastrophes)'. A11 adds '; calculate a Permissible Loss Ratio'. A14 adds LER, LEV, coinsurance percentage, experience/schedule/retrospective rating, SIRs and large deductibles and drops 'etc.'. A15 'Generalized Linear Model' for 'GLM'. B6 adds 'paid and reported', 'Case Reserves' and '; select age-to-age factors and Cumulative Development Factors'. B8 reads 'changes and development trends (e.g., claim count, Severity, Severity Analysis, ...'. B9 reads '(i.e., Chain Ladder Method, ..., Expected Loss Method ...); estimate IBNR and Ultimate Loss'.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), pp.3-5. A3: 'calendar year, policy year, accident year, report year, and in-force.' A6: '(e.g., common ratios, adjustments to losses, claims-made vs occurrence coverage).' A7: '(e.g., on-leveling, premium audit).' A9: '(e.g., fixed and variable expenses, profit and contingency, reinsurance costs).' A10: 'Demonstrate the reasonable handling of events for ratemaking purposes (e.g., large losses, catastrophes, Covid-19).' A11: 'using the pure premium and loss ratio methods.' A14: '(e.g., classification, territory, deductibles, increased limits, coinsurance, commercial lines rating mechanisms, etc.).' A15: '(e.g., GLM).' B6: '(e.g., loss, count, allocated loss adjustment expenses (ALAE)).' B8: 'identify changes and trends (e.g., loss and claim count, ratio of losses to premium, severity, ratios of loss and claim counts).' B9: '(e.g., development/chain ladder, case outstanding development, expected losses, Bornhuetter-Ferguson, Cape Cod, frequency-severity, Berquist-Sherman, Benktander).' None of the added clauses appear. Removing them would drop concept links (e.g. Permissible Loss Ratio, Parallelogram Method, Expense Ratio) from the syllabus concept set, which changes readiness and study-plan scope, so not applied here.
- source_rank: 1
- proposed_action: Restore each task to the outline's words, keeping links only on the outline's own words; decide where the dropped concepts (PLR, parallelogram method, LER, ILF/LEV, age-to-age factors, IBNR, etc.) should hang. Replace A10 with the outline's 'events ... (e.g., large losses, catastrophes, Covid-19)'.
- applied: false
- fingerprint: b90ec7652e01

## [F-003] Outline words missing from twelve tasks
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: Learning Objectives, tasks A2, A4, A13, B1, B3, B10, B11, B13, B14, B15, B17, B20
- claim: A2 lacked 'for use in the ratemaking process'; A4 lacked 'completeness'; A13 lacked 'to implement'; B1 lacked 'etc.'; B3 lacked 'the process of'; B10 lacked 'and/or claim-related expenses' and read 'deductibles, salvage' for 'deductibles and salvage'; B11 lacked 'claims processes that result in' and the second 'shift in'; B13-B15 lacked 'the'; B17 read 'reasonableness' for 'reasonability'; B20 lacked '(e.g., inflation, tort reform, attorney involvement)'.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), pp.3-5, each task's wording as quoted in the claim's restored form; e.g. A4 'Evaluate ratemaking data and analyses for errors, completeness, and reasonableness.', B17 'Monitor results for adequacy and reasonability including interim valuations', B20 'Utilize external information in a reserve analysis (e.g., inflation, tort reform, attorney involvement).' Each fix inserts the outline's words only; no link was removed, so the concept set is unchanged. syllabus_lint now warns (not errors) that 'completeness', 'process', 'claim-related expenses', 'claims processes', 'inflation', 'tort reform', 'attorney involvement' have no concept link.
- source_rank: 1
- proposed_action: Insert the missing outline words (done).
- applied: true
- fingerprint: 902b33e3f6d1

## [F-004] Domain B tasks numbered 18-37; the outline numbers them B1-B20
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: Learning Objectives, B. Estimating Claim Liabilities, task numbers
- claim: Domain B's tasks were numbered 18 to 37, continuing Domain A's count.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), pp.4-5 number Domain B's tasks 1-20, and the p.6 references table cites them as B1-B20 (Friedland 'B1-B20', ASOP 43 'A4, B2'). Under the page's numbering ASOP 43's B2 pointed at no task. Renumbered 1-20; text unchanged by this fix.
- source_rank: 1
- proposed_action: Renumber 18-37 to 1-20 (done).
- applied: true
- fingerprint: eb2f51ef4944

## [F-005] Source Material task codes wrong for Friedland and Werner
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Source Material: Werner and Friedland code lines
- claim: Werner's line read 'A1–A15, A17' and Friedland's 'B1–B42'.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), p.6 references table: Werner & Modlin 'A1-15, A17-A18'; Friedland 'B1-B20'. There is no B21-B42 in the outline (pp.4-5, Domain B has 20 tasks). The other four codes match: ASOP 12 A4-5, ASOP 13 A4, A8, ASOP 43 A4, B2, CAS Ratemaking Principles A4, A16. Corrected the two lines to the outline's codes. A18 remains absent from the task list (separate finding).
- source_rank: 1
- proposed_action: Set Werner to A1–A15, A17–A18 and Friedland to B1–B20 (done).
- applied: true
- fingerprint: 29b179042896

## [F-006] Reading scopes omitted: Werner Chapter 2 excluded and Appendices examinable; Friedland Appendices excluded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Source Material: Werner and Friedland entries
- claim: The Werner and Friedland entries give task codes only, with no chapter scope.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), p.6: Werner & Modlin, Fifth Edition, May 2016: 'The Appendices are an integral part of the textbook and will be used for creating questions. Chapter 2 is excluded. - Chapters 1, 3-16 Including errata.' Friedland, Third Version, July 2010: '- All chapters (the Appendices are excluded).' A candidate reading the page cannot tell that Werner's appendices are examinable, that Chapter 2 is out, or that Friedland's appendices are out. Adding the lines is new page structure, so not applied.
- source_rank: 1
- proposed_action: Add the outline's scope lines under each entry, as the Exam 9 page does.
- applied: false
- fingerprint: d635b0e75448

## [F-007] Domain B preamble altered
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: Learning Objectives, B. preamble
- claim: Preamble reads 'for both insurance entities and non-insurance entities that retain risk (e.g., self-insureds). See Loss Reserving for the overall framework.'
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), p.4: 'Candidates should understand how to estimate unpaid claims for both insurance entities and also for non-insurance entities that retain risk.' The '(e.g., self-insureds)' example and the 'See ... framework' pointer are not the outline's, and 'also' is missing. Domain A's preamble matches p.3 word for word.
- source_rank: 1
- proposed_action: Restore the outline's sentence; move the Loss Reserving pointer out of the preamble or link it from the outline's words.
- applied: false
- fingerprint: 03ae63bf8104

## [F-008] Lead omits the 15-minute scheduled break; minor wording variants
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: lead; tasks A8, B4
- claim: The lead gives the 4-hour exam and 4.5-hour appointment but not the break. A8 reads 'Exposure, Premium, Loss' and 'exponential and linear'; B4 'vs.' for 'versus'.
- evidence: CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), p.1 Delivery Format: 'APPOINTMENT TIME: 4.5 HOURS', Exam Duration 4 hours, Scheduled Break 15 min, Tutorial/agreement/survey 15 min. p.3 A8 '(e.g., exposure, premium, losses) ... (e.g., exponential, and linear analyses)'; p.4 B4 'long tail versus short tail lines, low frequency versus high frequency lines, occurrence versus claims made'.
- source_rank: 1
- proposed_action: Optionally mention the 15-minute break in the lead and match the A8/B4 wording.
- applied: false
- fingerprint: 3fb0c2a5cca7

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: in_review
- checks_run: Lead: 4-hour exam and 4.5-hour appointment match p.1 (break not stated, nit). Domain titles and weights A 45-55%, B 45-55% match p.3. Domain A preamble word for word; B preamble altered (minor). Tasks, links stripped, against pp.3-5: A has 17 of 18 (A18 missing, major); 11 tasks carry vault-added content or rewording (major, open); 12 tasks missing outline words fixed; B renumbered 18-37 -> 1-20. Readings lines A (Werner & Modlin, CAS Ratemaking Principles, ASOP 12, 13, 43) and B (Friedland, ASOP 43) match pp.4-5. Source Material: 6 readings = p.6's 6 citations; link names' titles/years agree (Werner 5th ed. 2016, Friedland 2010, ASOP 12 2005, ASOP 13 2009, ASOP 43 2007, Principles 1988); codes fixed for Werner and Friedland, other four match; chapter scopes absent (major). Sitting: CAS page links only the October 2026 outline (v02 2026-09-15); examPdfLinks '5-1', examSittings CAS-5 2026-10-19..27 deadline 2026-09-29 and examSittingDetails CAS-5 agree. syllabus_lint: 0 errors, 5 unlinked-noun warnings from restored words. Not on the page and not filed: p.2 cognitive levels, item types, OP source key.
- sources_checked: CAS, Exam Content Outline — Basic Techniques for Ratemaking and Estimating Claim Liabilities (Exam 5), Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15, 6 pp.; https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795), pp.1-6; CAS, Exam 5 — Basic Ratemaking and Est Claim Liabilities exam page, read 2026-10-09: window October 19 - October 27, 2026; register by Sep. 29, 2026; refund deadline October 6, 2026; fee $850 ($680 students); 'October 2026 Content Outline' (Updated September 2026) the only outline linked, sha256:4768a5849e7021628953aadeebb0a33de3b128301b9e9479e523b004d1168b2b — https://www.casact.org/exam/exam-5-basic-ratemaking-and-est-claim-liabilities
- note: In review, not verified. The Fall 2026 outline was read in full, but three major findings stay open: task A18 is missing, eleven tasks carry content or wording that is not the outline's, and the Werner/Friedland chapter scopes are absent. None is a pure transcription fix. Applied: missing outline words in twelve tasks, Domain B renumbered B1-B20, Werner and Friedland task codes. No critical finding: weights, domain titles, readings and the six sources all agree with the outline.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Outline words inserted into A2, A4, A13, B1, B3, B10, B11, B13-B15, B17, B20 in this change; each now matches outline pp.3-5 for the restored words.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-004
- status: resolved
- note: Domain B renumbered 1-20 in this change, matching outline pp.4-5 and the p.6 codes.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-005
- status: resolved
- note: Werner set to A1–A15, A17–A18 and Friedland to B1–B20 in this change, matching outline p.6.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- note: Coordinator, after this run's pass: linked five phrases the pass restored from the outline (completeness, process, claim-related expenses, claims processes, inflation/tort reform/attorney involvement) to existing concept pages, so test_syllabus_lib's every-noun-phrase-linked rule holds. Link targets only; the words are unchanged.

## [C-003] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: in_review
- checks_run: Re-recorded after the link-only edit; findings and checks as in this run's earlier pass.
- note: in_review: F-001, F-002, F-006, F-007, F-008 still open.
