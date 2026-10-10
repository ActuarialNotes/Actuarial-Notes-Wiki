---
target: Resources/Books/Basic Ratemaking (Werner - 2016).md
created: 2026-09-05
---

## [F-001] Syllabus scope statement is inverted: Ch 2 excluded, Ch 16 included, no Ch 17 exists
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: critical
- status: open
- locus: intro paragraph, line 1 of body
- claim: Page stated: 'Chapters 1-15 and 17 are on the syllabus; Chapter 16 is excluded.'
- evidence: CAS Exam 5 Content Outline, Fall 2026 (https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf, version string 'Exam_5_CO_2026_F v01 2026_4_22.docx', sha256 a7ba895343f7d888bc2c2d5f3b10b2811c8911620c628ae4cebd3ae6393ff1ea), p.6 'Complete Text References for Exam 5', Werner & Modlin row, verbatim: 'Basic Ratemaking, Casualty Actuarial Society, Fifth Edition, May 2016. The Appendices are an integral part of the textbook and will be used for creating questions. Chapter 2 is excluded. - Chapters 1, 3-16 Including errata.' So the page had the two exclusions exactly backwards: Chapter 2 (Rating Manuals) is OFF the syllabus and Chapter 16 (Claims-Made Ratemaking) is ON it. Separately, no Chapter 17 exists: the book's PDF bookmark outline (official CAS PDF, sha256 6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c, 423 pp.) ends at 'Chapter 16: Claims-Made Ratemaking' (PDF p.324) followed by Bibliography and Appendices A-F, and the printed Table of Contents (PDF pp.8-12) lists Chapters 1-16 only. The '17' is a misreading of the content outline's Domains/Task column for this reading, which reads 'A1-15, A17' - CAS Domain A TASK numbers (Domain A has 18 tasks; A16 maps to the CAS Ratemaking Principles and A18 to qualitative filing considerations), not chapter numbers. Exam 5 (CAS).md line 91 cites the same string 'A1-A15, A17' correctly, as a task range.
- source_rank: 1
- proposed_action: Restate the scope sentence from the CAS content outline: Chapters 1 and 3-16, Chapter 2 excluded, Appendices included.
- applied: true
- fingerprint: 2f11d1d2e5af

## [F-002] Outline has no Chapter 16 section although Chapter 16 is on the syllabus
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: critical
- status: open
- locus: chapter outline, between '## 15 Commercial Lines Rating Mechanisms' and '## Appendices'
- claim: The page's chapter outline runs 1-15 and then jumps to the Appendices; there is no '## 16 Claims-Made Ratemaking' section.
- evidence: CAS Exam 5 Content Outline Fall 2026 p.6 puts Werner & Modlin 'Chapters 1, 3-16' on the syllabus, so Chapter 16 is examinable. The chapter exists: official Werner PDF bookmark 'Chapter 16: Claims-Made Ratemaking' at PDF p.324, printed pp.313-322, with sections REPORT YEAR AGGREGATION (p.314), PRINCIPLES (p.315), DETERMINING RATES (p.318), COORDINATING POLICIES (p.318), SUMMARY (p.321), KEY CONCEPTS (p.322). Werner p.92 (PDF 104) explicitly forwards to it: 'Claims-made ratemaking is covered in more detail in Chapter 16.' A student using this page as their Werner map skips an examinable chapter entirely. Not auto-fixed: writing the section's bullets is authoring new content, which section 6 of the agent definition reserves for a human.
- source_rank: 1
- proposed_action: Author a '## 16 Claims-Made Ratemaking' section covering report-year aggregation, the five claims-made principles, determining claims-made rates, and coordinating claims-made with occurrence policies (tail/nose coverage).
- applied: false
- fingerprint: 844f7f5e7cb6

## [F-003] Chapter 2 outlined as syllabus material although the syllabus excludes it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: major
- status: open
- locus: '## 2 Rating Manuals' section
- claim: The page carries a full outline for Chapter 2 (Rating Manuals) with no indication that it is off the syllabus.
- evidence: CAS Exam 5 Content Outline Fall 2026 p.6, Werner & Modlin row: 'Chapter 2 is excluded.' The page's framing sentence presents the whole outline as the syllabus reading, so a candidate budgets study time on an untested chapter. Not auto-fixed: whether to delete the section or keep it marked 'not on the syllabus' is a pedagogical judgement call, which section 6 of the agent definition puts out of bounds.
- source_rank: 1
- proposed_action: Either drop the '## 2 Rating Manuals' section or keep it with an explicit 'Excluded from the Exam 5 syllabus' marker.
- applied: false
- fingerprint: e1256e5224ea

## [F-004] Chapter 11 bullet attributes a 'Lee diagram' consistency test to Werner; the phrase appears nowhere in the book
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: major
- status: open
- locus: '## 11 Special Classification', bullet 2
- claim: Bullet reads: 'Increased limits factors and consistency (Lee diagram) tests'.
- evidence: Full-text search of all 423 pages of the official Werner PDF returns ZERO occurrences of 'Lee diagram' or 'Lee Diagram' (checked case-sensitively for both capitalisations via pymupdf get_text over every page). 'Consistency Test' occurs only on PDF pp.416, 418, 419 - inside Appendix F, 'Multivariate Classification Example', where it is a GLM model-validation exhibit, not an ILF check. Chapter 11's INCREASED LIMITS RATEMAKING section (printed pp.192-198, PDF 204-210) covers: the ILF definition and indicated-ILF formula, limited average severity, handling censored data by layer, trend/other considerations, and curve fitting (lognormal, Pareto, truncated Pareto). There is no consistency test in it. Werner does not teach ILF consistency testing or Lee diagrams anywhere. Not auto-fixed: deleting the false half is mechanical but choosing the replacement content is authoring.
- source_rank: 2
- proposed_action: Remove '(Lee diagram)' and the consistency-test claim; replace with what Ch 11 actually covers - limited average severity, layer-by-layer treatment of censored data, and curve fitting.
- applied: false
- fingerprint: cab6ae594f1f

## [F-005] Chapter 2 bullet names a personal-auto rating manual example the chapter does not contain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: major
- status: open
- locus: '## 2 Rating Manuals', bullet 3
- claim: Bullet reads: 'Worked personal auto and homeowners rating examples'.
- evidence: Chapter 2's worked examples are, per both the printed TOC (PDF p.8) and the body headings scanned from PDF pp.25-47: HOMEOWNERS RATING MANUAL EXAMPLE (printed p.17 / PDF 29), MEDICAL MALPRACTICE RATING MANUAL EXAMPLE (printed p.23 / PDF 35), U.S. WORKERS COMPENSATION RATING MANUAL EXAMPLE (printed p.29 / PDF 41). There is no personal auto rating manual example; personal automobile appears in Ch 2 only as a row in Table 2.1 (typical rating variables, PDF p.27) and Table 2.2 (typical underwriting characteristics, PDF p.29). So the bullet names one example that does not exist and omits two that do. Interacts with F-003 - if the section is dropped as off-syllabus this becomes moot.
- source_rank: 2
- proposed_action: If the section is kept, change to 'Worked homeowners, medical malpractice and U.S. workers compensation rating manual examples'.
- applied: false
- fingerprint: ce1d863a7a09

## [F-006] Appendices section was numbered '17'; the book has 16 chapters plus lettered Appendices A-F
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: minor
- status: open
- locus: '## 17 Appendices' heading
- claim: Heading read '## 17 Appendices', implying a Chapter 17.
- evidence: Official Werner PDF bookmark outline: chapters run 1-16, then 'Bibliography' (PDF 334), 'Appendices' (337) and 'Appendix A: Auto Indication' (338) through 'Appendix F: Multivariate Classification Example' (415), then 'Changes' (422). The printed TOC (PDF pp.11-12) lists APPENDIX A through APPENDIX F with their own page numbering restarting at 1. Nothing in the book is numbered 17. Same root cause as F-001 (the CAS task string 'A1-15, A17').
- source_rank: 2
- proposed_action: Renumber the heading to '## Appendices'.
- applied: true
- fingerprint: 7c72a0e901cf

## [F-007] Appendices bullet omits Appendices E and F
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: minor
- status: open
- locus: '## Appendices' section, sole bullet
- claim: Bullet reads: 'Full ratemaking indication worked examples for personal auto, homeowners, workers compensation, and medical malpractice' - i.e. Appendices A-D only.
- evidence: Printed TOC PDF pp.11-12 and the PDF bookmark outline list six appendices: A Auto Indication, B Homeowners Indication, C Medical Malpractice Indication, D Workers Compensation Indication, E Univariate Classification Example (PDF 411), F Multivariate Classification Example (PDF 415). E and F are classification examples, not indication examples, so the bullet's wording does not cover them. This matters because the CAS content outline (Fall 2026, p.6) says the Appendices 'are an integral part of the textbook and will be used for creating questions' - E and F are examinable.
- source_rank: 2
- proposed_action: Add a bullet for Appendix E (univariate classification example: pure premium and loss ratio approaches) and Appendix F (multivariate classification example: predictive vs unpredictive variable, overall model validation).
- applied: false
- fingerprint: e7f2aaf36ed9

## [F-008] Chapter 15 bullet claims self-insured retentions; the term does not occur in the book
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: minor
- status: open
- locus: '## 15 Commercial Lines Rating Mechanisms', bullet 4
- claim: Bullet reads: 'Large deductible programs and [[Self-Insured Retention|self-insured retentions]]'.
- evidence: Full-text search of all 423 pages of the official Werner PDF returns ZERO occurrences of 'self-insured', 'Self-Insured' or 'self insured'. The word 'retention' occurs on PDF pp.22-24 (Ch 1), 158, 259-274 (Ch 13 customer retention/persistency) and 299 - never in Ch 15 in the SIR sense. Chapter 15's RATING MECHANISMS FOR LARGE COMMERCIAL RISKS section states its own scope on PDF p.310: 'These mechanisms include loss-rated composite risks, large deductible policies, and retrospective rating plans.' Confirmed by reading pp.310-321. The rest of the bullet list for Ch 15 checks out: composite/loss-rated risks (PDF 310-311), experience and schedule rating (301-309), and retrospective rating's basic premium, loss conversion factor (LCF), tax multiplier and minimum/maximum premium (PDF 319-321).
- source_rank: 2
- proposed_action: Drop the self-insured-retention clause, or replace with 'loss-rated composite risks' which is what the section actually adds.
- applied: false
- fingerprint: 8a146512004a

## [F-009] Permissible loss ratio listed under Chapter 8; its section is in Chapter 7
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: minor
- status: open
- locus: '## 8 Overall Indication', bullet 2
- claim: Bullet reads: 'Calculating a [[Permissible Loss Ratio]]' under Chapter 8.
- evidence: The PERMISSIBLE LOSS RATIOS section heading is in Chapter 7 (printed p.139 / PDF p.151), per both the printed TOC (PDF p.9, listed under CHAPTER 7: OTHER EXPENSES AND PROFIT) and the body. Chapter 8's own section headings, scanned from PDF pp.153-161, are PURE PREMIUM METHOD (153), LOSS RATIO METHOD (155), LOSS RATIO VERSUS PURE PREMIUM METHODS (157), INDICATION EXAMPLES (159), SUMMARY, KEY CONCEPTS. Chapter 8 uses the PLR (mentions on PDF 153, 155) but does not derive it. Low consequence - the concept is on the syllabus either way - but a candidate mapping topics to chapters is sent to the wrong one.
- source_rank: 2
- proposed_action: Move the permissible-loss-ratio bullet to '## 7 Other Expenses and Profit'.
- applied: false
- fingerprint: 369fac6939a0

## [F-010] Frontmatter Type is 'Study Note'; CAS and the book both call it a textbook
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- severity: minor
- status: open
- locus: frontmatter, 'Type:' key
- claim: Type: Study Note
- evidence: CAS Exam 5 Content Outline Fall 2026 p.6 calls it 'the textbook' ('The Appendices are an integral part of the textbook'). The book's own front matter (PDF p.2) calls it 'a single educational text', and the cover (PDF p.1) presents it as a CAS-published fifth-edition text, not a study note. The vault already uses 'Type: Textbook' for two other Resources/Books pages, so the value exists in the taxonomy. Not auto-fixed: picking between the vault's own Type values is a taxonomy decision rather than a transcription of the source. Everything else in the frontmatter checks out against the PDF cover: Title 'Basic Ratemaking'; Authors 'Geoff Werner, FCAS, MAAA' and 'Claudine Modlin, FCAS, MAAA'; Edition 'Fifth Edition, May 2016'; Year 2016 (PDF creationDate 2016-05-09); Publisher 'Casualty Actuarial Society, 2016'.
- source_rank: 1
- proposed_action: Change Type to 'Textbook', or confirm 'Study Note' is the intended vault taxonomy for CAS-published syllabus texts.
- applied: false
- fingerprint: 0602c7e57209

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- resolves: F-001
- status: resolved
- note: Scope sentence rewritten in this working tree to transcribe the CAS Exam 5 Content Outline (Fall 2026, p.6) verbatim in substance: Chapters 1 and 3-16, Chapter 2 excluded, Appendices integral and used for creating questions, errata included. The phantom 'Chapter 17' is gone. The structural consequences - the missing Ch 16 section and the retained Ch 2 section - stay open as F-002 and F-003.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- resolves: F-006
- status: resolved
- note: Heading changed from '## 17 Appendices' to '## Appendices'. Book has 16 numbered chapters plus lettered Appendices A-F; no chapter 17 exists.

## [C-001] What checked out clean against the source (so the next sweep need not redo it)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- note: Chapter headings 1-15: every '## N <Title>' matches the official Werner PDF exactly - 1 Introduction, 2 Rating Manuals, 3 Ratemaking Data, 4 Exposures, 5 Premium, 6 Losses and LAE, 7 Other Expenses and Profit, 8 Overall Indication, 9 Traditional Risk Classification, 10 Multivariate Classification, 11 Special Classification, 12 Credibility, 13 Other Considerations, 14 Implementation, 15 Commercial Lines Rating Mechanisms. (Note the PDF bookmark for Ch 12 is misspelled 'Credibitiliy' in the source's own outline; the printed TOC and the chapter body both read CREDIBILITY, so the page is right and the PDF bookmark is the typo.) Bullet-level claims confirmed against chapter bodies: Ch 1 combined ratio (PDF 22); Ch 3 four aggregation methods incl. report year under DATA AGGREGATION (PDF 54-56) and external data (56-58); Ch 4 the three exposure-base criteria verbatim on PDF 61 ('directly proportional to expected loss ... practical ... consider any preexisting exposure base established within the industry') and written/earned/unearned/in-force on PDF 61+63, exposure trend (73); Ch 5 parallelogram and extension of exposures (PDF 83-92), one-step/two-step premium trend, premium audits (PDF 81, 92-93); Ch 6 occurrence vs claims-made coverage trigger (PDF 104, which forwards to Ch 16), report year, ALAE/ULAE (121+); Ch 11 territorial ratemaking with spatial smoothing (PDF 202), deductible pricing and loss elimination ratio (211-214), coinsurance and insurance-to-value (221-226); Ch 12 limited fluctuation (229), Buhlmann/Buhlmann-Straub (232-235), first-dollar and excess complements (236-249); Ch 13 Lifetime Value Analysis with persistency/renewal modelling (PDF 269); Ch 15 experience and schedule rating, composite/loss-rated risks (310-311), retrospective rating basic premium + LCF + tax multiplier + min/max premium (319-321). Structural checks: all 69 [[wiki-links]] on the page resolve to existing vault files; the ![[Basic Ratemaking (Werner - 2016) - Cover.svg]] embed exists in Media/Attachments; the page contains no LaTeX. Both 'Available from' candidates return HTTP 200 application/pdf with identical content-length 2545456: the /old/studynotes_werner_modlin_ratemaking.pdf URL in the frontmatter and the /2021-03/5_Werner_Modlin.pdf URL in the Links section are the same file. Note for whoever fixes F-001's downstream: quiz/src/data/examPdfLinks.ts line ~210 still points Exam 5's syllabus at .../2023-06/Exam_5_Content_Outline.pdf, while casact.org now serves .../2026-03/Exam_5_CO_2026_Fall.pdf. Out of scope for this file, but worth a separate look.

## [C-002] Outline checked against the book and the current CAS content outline
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-05T16:45Z/fb4a
- date: 2026-09-05
- status_set: disputed
- checks_run: chapter-by-chapter heading diff against the printed TOC and the PDF bookmark outline; bullet-level claim checks against chapter bodies; full-text search for every named term the outline asserts (Lee diagram, consistency test, self-insured retention, personal auto example, permissible loss ratio, LCF/tax multiplier, lifetime value, spatial smoothing, limited fluctuation); syllabus scope resolved against the current CAS content outline; frontmatter fields against the PDF cover page; both Available-from URLs fetched (HTTP 200, identical content-length); 69 wiki-links and the cover embed resolved
- sources_checked: CAS Exam 5 Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf (version Exam_5_CO_2026_F v01 2026_4_22.docx; sha256 a7ba895343f7d888bc2c2d5f3b10b2811c8911620c628ae4cebd3ae6393ff1ea), p.6 'Complete Text References for Exam 5'; Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS) — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf (sha256 6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c, 423 pp.): PDF bookmark outline, printed Table of Contents PDF pp.8-12, and chapter bodies as cited per finding
- note: Left disputed rather than verified: F-002 is an unresolved critical finding (Chapter 16 is on the syllabus and the page has no section for it), and per docs/verification.md an unresolved critical finding is exactly what disputed means. The two mechanical, source-quotable errors (F-001 scope sentence, F-006 phantom chapter number) are fixed in this working tree. The remaining eight need authoring or a taxonomy decision, which section 6 of the agent definition reserves for a human. Both rank-1/rank-2 sources agreed with each other throughout - the only conflicts found were between the page and the sources.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-002
- status: resolved
- note: Authored '## 16 Claims-Made Ratemaking' from Werner ch.16 (PDF pp.324-333, printed 312-321). Bullets transcribe the chapter's own scope list (PDF p.324): report-year/report-lag aggregation with the occurrence policy as a diagonal and the claims-made policy as a row of table 16.1; the report-date coverage trigger; the five Marker and Mohl (1980) principles verbatim in substance from PDF p.326; and the coordination mechanics from PDF pp.330-332 (retroactive date, first/second-year vs mature policies, step factors as a percentage of the mature rate per table 16.8, extended reporting endorsement / tail coverage for the switch back to occurrence and for retirement). Cross-checked against KEY CONCEPTS IN CHAPTER 16 (PDF p.333), which lists exactly these five items.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-003
- status: resolved
- note: Chapter 2 section kept, and marked with a collapsed '[!warning]- Not on the Exam 5 syllabus' callout naming the CAS content outline as the authority. Rationale: this page is the book's map, not only a syllabus map, and later chapters refer back to ch.2 - deleting the section would leave a numbering hole between 1 and 3. The exclusion is now stated where a candidate reads the chapter rather than only in the intro.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-004
- status: resolved
- note: 'consistency (Lee diagram) tests' removed. Replaced with what the INCREASED LIMITS RATEMAKING section actually contains, per its sub-headings across PDF pp.204-210: the Standard ILF Approach (built on limited average severity), Censored Losses, Other Considerations (trend's differential effect on higher layers), the ISO Mixed Exponential Methodology, and the Multivariate Approach. 'Lee diagram' still occurs zero times in the 423-page book.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-005
- status: resolved
- note: Corrected to the three worked examples the chapter actually contains, per the printed TOC (PDF p.8) and the body headings: HOMEOWNERS RATING MANUAL EXAMPLE (printed p.17), MEDICAL MALPRACTICE RATING MANUAL EXAMPLE (printed p.23), U.S. WORKERS COMPENSATION RATING MANUAL EXAMPLE (printed p.29). The non-existent personal auto example is gone. Bullet 1 also corrected from 'rate tables' to 'rate pages', the book's own section name.

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-007
- status: resolved
- note: Appendices bullet expanded from four to all six, split A-D / E / F, with the CAS content outline's sentence that they are 'an integral part of the textbook and will be used for creating questions' quoted inline. E is the univariate classification example (pure premium and loss ratio approaches, PDF p.411); F is the multivariate example (GLM output for a predictive and an unpredictive variable, plus hold-out model validation, PDF p.415). Appendix A is labelled loss ratio and B pure premium, matching the printed TOC's 'LR (LOSS RATIO) INDICATION EXHIBIT' and 'PP (PURE PREMIUM) INDICATION EXHIBIT'.

## [F-008/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-008
- status: resolved
- note: Self-insured-retention clause removed. Replaced with the section's own scope sentence, Werner PDF p.310 verbatim: 'These mechanisms include loss-rated composite risks, large deductible policies, and retrospective rating plans.' 'self-insured' still occurs zero times in the book.

## [F-009/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-009
- status: resolved
- note: Permissible-loss-ratio bullet moved from ch.8 to ch.7, where the PERMISSIBLE LOSS RATIOS section heading sits (printed p.139 / PDF p.151; ch.8 opens at printed p.141 / PDF p.153). While editing ch.7, also added the exposure/policy-based projection method, which the chapter carries alongside the premium-based one (printed pp.130 and 133) and the page had omitted.

## [F-010/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- resolves: F-010
- status: resolved
- note: Type changed from 'Study Note' to 'Textbook'. The CAS content outline (Fall 2026, p.6) calls it 'the textbook'; the book's own front matter (PDF p.2) calls it 'a single educational text'. 'Textbook' is an existing value in the vault's Resources/Books taxonomy (2 other pages use it), so this is a move within the taxonomy rather than a new value.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1-followup
- run_id: 2026-09-05T17:10Z/fe28
- date: 2026-09-05
- status_set: verified
- confidence: high
- checks_run: all eight findings from run 2026-09-05T16:45Z/fb4a resolved and re-checked against the source; chapter 16 section authored from ch.16 body and cross-checked against its KEY CONCEPTS list; heading sequence now 1-16 plus lettered Appendices, matching the printed TOC; 64 wiki-links and the cover embed re-resolved after editing
- sources_checked: Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS) — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf (sha256 6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c, 423 pp.): printed Table of Contents PDF pp.8-12, PDF bookmark outline, and chapter bodies pp.204-210 (ILF), 310 (large commercial scope), 324-333 (ch.16), 411/415 (Appendices E/F); CAS Exam 5 Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf (version Exam_5_CO_2026_F v01 2026_4_22.docx; sha256 a7ba895343f7d888bc2c2d5f3b10b2811c8911620c628ae4cebd3ae6393ff1ea), p.6 'Complete Text References for Exam 5' and p.4 Domain A task list
- note: Every heading and bullet on the page now traces to a cited page of the Werner PDF or to the CAS content outline. Chapter 2 is retained but marked off-syllabus rather than deleted (see F-003 resolution). Two terms the page previously asserted - 'Lee diagram' and 'self-insured' - occur zero times in the book and are gone.

## [F-011] Chapter 6 bullet tells the reader to avoid an overlap the book calls a fallacy
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: '## 6 Losses and LAE', bullet 3
- claim: Bullet read: 'Loss development to ultimate and loss trend to the future period; avoiding overlap between the two'.
- evidence: Werner & Modlin, Basic Ratemaking (CAS, May 2016; sha256 6b214d4d...), PDF p.132 (printed p.120), section 'Overlap Fallacy: Loss Development and Loss Trend': 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case.' The chapter's KEY CONCEPTS list (PDF p.136) names it item 10, 'Overlap fallacy'. 'Avoiding overlap' implies a double count the actuary must remove, which is the opposite of what the chapter teaches; a candidate who trusts it would answer an overlap-fallacy question wrong.
- source_rank: 2
- proposed_action: Restate as the overlap fallacy: trending and developing losses are not overlapping adjustments.
- applied: true
- fingerprint: 16574c76c258

## [F-012] Chapter 12 bullet names Bühlmann-Straub, which the book never mentions, and omits Bayesian analysis
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: major
- status: open
- locus: '## 12 Credibility', bullet 2
- claim: Bullet read: '[[Bühlmann Credibility|Bühlmann]] and [[Bühlmann-Straub Credibility|Bühlmann-Straub]] approaches'.
- evidence: Full-text search of all 423 pages of the Werner PDF (sha256 6b214d4d...) returns zero occurrences of 'Straub'. Chapter 12's METHODS FOR MEASURING CREDIBILITY section (PDF pp.228-235) names three methods: the classical (limited fluctuation) approach, Bühlmann credibility ('commonly referred to as least squares credibility'), and Bayesian analysis ('A third method, Bayesian analysis'); KEY CONCEPTS IN CHAPTER 12 (PDF p.250) lists 2a Classical credibility, 2b Bühlmann credibility, 2c Bayesian analysis. Bühlmann-Straub is MAS-II material, not this book's.
- source_rank: 2
- proposed_action: Replace with 'Bühlmann (least squares) credibility and Bayesian analysis'.
- applied: true
- fingerprint: 9bb0d09c3ad5

## [F-013] Chapter 9 names an 'actuarial' criterion for rating variables; the book's first category is 'statistical'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: '## 9 Traditional Risk Classification', bullet 2
- claim: Bullet read: 'Criteria for evaluating rating variables: actuarial, operational, social, and legal'.
- evidence: Werner PDF p.167 (printed p.155), CRITERIA FOR EVALUATING RATING VARIABLES, after Finger (2001): 'The criteria can be grouped into the following categories: Statistical, Operational, Social, Legal', followed by the subsection 'Statistical Criteria' (statistical significance, homogeneity, credibility). The phrase 'actuarial criteria' occurs nowhere in the PDF (full-text search).
- source_rank: 2
- proposed_action: Change 'actuarial' to 'statistical'.
- applied: true
- fingerprint: bae7bab2860d

## [F-014] Chapter 3 bullet invents aggregation trade-offs (availability, timeliness) instead of the book's three objectives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: '## 3 Ratemaking Data', bullet 4
- claim: Bullet read: 'Trade-offs between accuracy, availability, and timeliness of each aggregation'.
- evidence: Werner PDF p.54 (printed p.42), DATA AGGREGATION: 'When aggregating data for ratemaking purposes, three general objectives apply: Accurately match losses and premium for the policy; Use the most recent data available; Minimize the cost of data collection and retrieval. ... Each method differs in how well it achieves the objectives outlined above.' 'timeliness' occurs zero times in the PDF, and the bullet drops the cost objective.
- source_rank: 2
- proposed_action: Restate the three objectives as the book lists them.
- applied: true
- fingerprint: b7c828a81e84

## [F-015] Chapter 14 bullet speaks of 'rebalancing', a word the book does not use, for the off-balance factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: '## 14 Implementation', bullet 2
- claim: Bullet read: 'Off-balancing and rebalancing the [[Rating Algorithm|rating algorithm]]'.
- evidence: 'rebalancing'/'rebalance' occur zero times in the Werner PDF. The concept the chapter teaches is the off-balance factor, PDF p.288 (printed p.276): 'is commonly referred to as the off-balance factor. It is called that as it represents the amount the base rate needs to be adjusted to balance the changes in the rate differentials.'
- source_rank: 2
- proposed_action: Restate as the off-balance factor in the book's words.
- applied: true
- fingerprint: a407b9e95a54

## [F-016] Sources line lists two of the errata's three items
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: '## Sources', errata entry
- claim: Errata entry said the errata cover 'the coinsurance clause (pp. 209–210) and Appendix D-14'.
- evidence: Errata to Basic Ratemaking, 5th Edition (CAS Exam 5 Syllabus Committee, Version 1.0, June 27, 2024; https://www.casact.org/sites/default/files/2024-07/2024_Exam_5_Werner_Errata_2024_06_27.pdf, sha256 d4d11b59...), pp.1-2 list three errata: the Coinsurance Clause (pp. 209-210), Workers Compensation (app. D-14), and 'Composite Rating Example Calculation ... (p. 300): Disregard the $500,000 general aggregate limit'. The Fall 2026 content outline includes the errata in the reading, so the omitted composite-rating erratum is examinable.
- source_rank: 1
- proposed_action: Add the composite rating example (p. 300) to the errata entry.
- applied: true
- fingerprint: 5b8c94968476

## [F-011/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-011
- status: resolved
- note: Bullet now reads '...loss trend to the future period; the overlap fallacy — trending and developing losses are not overlapping adjustments', transcribing Werner PDF p.132 (printed p.120): 'It may seem that trending and developing losses results in overlapping adjustments; however, this is not the case.'

## [F-012/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-012
- status: resolved
- note: Bullet now reads '[[Bühlmann Credibility|Bühlmann]] (least squares) credibility and Bayesian analysis', per Werner PDF pp.232-235 and KEY CONCEPTS IN CHAPTER 12 (PDF p.250). The Bühlmann-Straub link is gone; 'Straub' still occurs zero times in the book.

## [F-013/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-013
- status: resolved
- note: 'actuarial' changed to 'statistical', matching Werner PDF p.167 (printed p.155): Statistical, Operational, Social, Legal.

## [F-014/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-014
- status: resolved
- note: Bullet now lists the three objectives verbatim in substance from Werner PDF p.54 (printed p.42) — accurately match losses and premium, use the most recent data available, minimize the cost of data collection and retrieval — and how well each method achieves them.

## [F-015/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-015
- status: resolved
- note: Bullet now reads 'The off-balance factor: the amount the base rate needs to be adjusted to balance the changes in the rate differentials of the rating algorithm', the book's own definition at PDF p.288 (printed p.276).

## [F-016/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-016
- status: resolved
- note: Errata entry now lists all three items: the coinsurance clause (pp. 209–210), Appendix D-14, and the composite rating example (p. 300), per the 2024 errata pp.1-2.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: re-verification of the c3d5c977 rewrite: chapter outline rebuilt from the printed TOC (PDF pp.8-12) and bookmark outline before re-reading the page (16 chapters, Bibliography, Appendices A-F, Changes; bookmark 'Credibitiliy' typo is the source's own); every heading diffed; full-text search for every named term and method (34 terms; zero hits for Straub, rebalancing, timeliness, actuarial criteria — all fixed); bullet claims re-read against chapter bodies; lead checked against the abstract (PDF p.2) and Organization of this Text (p.4); On the syllabus callout diffed against the Fall 2026 outline v02 p.6; frontmatter against title page PDF pp.1-2; errata fetched and read; Related readings checked (SoP principles 1-3 quoted PDF pp.17-19, ASOP 13 social influences PDF p.122, both in Bibliography PDF pp.334-336); all wiki-links and the cover embed resolve; resource_lint 0 errors
- sources_checked: Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS), title page/abstract PDF pp.1-2, Organization of this Text pp.4-6, printed TOC PDF pp.8-12, bookmark outline, chapter text PDF pp.13-19, 48-60, 61, 75, 93-101, 122, 132-136, 139-142, 152, 166-167, 176, 183, 204-211, 228-250, 251, 269, 275-300, 310, 324-332, 334-336, 415-420, Changes p.422, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15), p.4 Domain A tasks 1-18 and readings; p.6 Complete Text References, Werner & Modlin row, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf; Errata to Basic Ratemaking, 5th Edition (CAS Exam 5 Syllabus Committee, Version 1.0, June 27, 2024), pp.1-2, all three errata, sha256:d4d11b5935d8c3fa7863759a70d2f8d0ed68d0b69fb16ab337a44100b075be10 — https://www.casact.org/sites/default/files/2024-07/2024_Exam_5_Werner_Errata_2024_06_27.pdf
- note: Re-verified as it now stands. Six new findings (F-011..F-016), all fixed from the source in this run, two of them major (overlap fallacy inverted; Bühlmann-Straub attributed to a book that never names it). The CAS Fall 2026 outline has been revised since the 2026-09-05 pass: v02 dated 2026-09-15 (sha256 fd8373ae..., was v01 a7ba895...) now gives Werner & Modlin tasks 'A1-15, A17-A18'; the page's callout already says A1–A15 and A17–A18, Chapters 1 and 3–16, Chapter 2 excluded, Appendices integral, errata included. Exam 5 (CAS).md's Source Material still says 'A1–A15, A17' for this reading (and B1–B42 for Friedland, which v02 gives as B1-B20) — outside this file. The [!warning] Chapter 2 callout F-003 added was dropped in the rewrite; the exclusion is now carried by the On the syllabus callout, which is where docs/resource-pages.md §2.3 puts scope.
