---
target: Exam 7 (CAS).md
created: 2026-10-09
---

## [F-001] Shapland scope note paraphrased, not the outline's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: ## Source Material: Shapland (2016) scope line
- claim: Page read: 'the supplementary modeling files linked on pages 61-62 aid understanding of the method's application'.
- evidence: CAS Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16; https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed), PDF p.5, Shapland citation: 'Supplementary modeling files linked on pages 61-62 will aid in understanding of the method's application.' Same meaning; the page's wording was not the outline's. Replaced with the outline's sentence (lower-cased to continue the line).
- source_rank: 1
- proposed_action: Use the outline's wording.
- applied: true
- fingerprint: 5c601e0254c8

## [F-002] Teng and Perkins scope note paraphrased, not the outline's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: ## Source Material: Teng and Perkins (1996) scope line
- claim: Page read: 'candidates are not responsible for specific Annual Statement notation but are responsible for the concepts presented'.
- evidence: CAS Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16; https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed), PDF p.6, Teng and Perkins citation: 'Candidates will not be held responsible for specific Annual Statement notation but will be responsible for concepts presented.' Same meaning; the page's wording was not the outline's. Replaced with the outline's sentence (lower-cased to continue the line).
- source_rank: 1
- proposed_action: Use the outline's wording.
- applied: true
- fingerprint: 89b4bd2e61f1

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Fixed in this change: the Shapland line now carries the outline p.5 sentence verbatim (first letter lower-cased).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Fixed in this change: the Teng and Perkins line now carries the outline p.6 sentence verbatim (first letter lower-cased).

## [C-001] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- note: Bibliographic conflicts between the outline and the readings themselves, logged per P2 and not filed as vault errors (no examinable content touched; Exam 9 C-002 precedent). (1) Mack 2000: outline p.5 cites 'Credible Claims Reserve: The Benktander Method,' ASTIN Bulletin, 2000, pp. 333-337. The paper's own p.1 (https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf, sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086) reads 'CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD' and 'ASTIN BULLETIN, Vol. 30, No. 2, 2000, pp. 333-347'; its last page is numbered 347. The page links the plural title and prints pp. 333-347 with a footnote naming the outline's 333-337: it follows the document, and the footnote states the conflict. (2) Clark: outline p.5 'LDF Curve Fitting'; the paper's p.1 (7_Clark.pdf, sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e) 'LDF Curve-Fitting'; the page follows the paper. (3) Friedland: outline p.5 and the page say 'CAS Study Note, 2022'; the PDF (Exam7_Study_Note_Friedland.pdf, posted 2022-11, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb) p.2 prints '© 2023 Casualty Actuarial Society'. The page follows the outline. No edits for any of the three.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Delivery: lead's 4-hour exam, 4.5-hour appointment, 15-minute scheduled break match outline p.1. Domain: one domain, 'A. Estimation of Claims Liabilities', 100%, p.3. Preamble, the five task-group headings (i-v) and all 17 tasks: links stripped, each of the 23 page lines is a whitespace-normalised substring of pp.3-4, word for word, numbered 1-17 in order, e.g. list included; nothing on pp.3-4 missing. Readings line: 15 abbreviations match p.4 in order. Source Material: 15 bullets for the 15 citations of pp.5-6, title {15 Sources}. Codes: outline's A.<group>.<n> translated to the page's flat 1-17 numbering (i=1, ii=2-5, iii=6-10, iv=11-14, v=15-17) and every reading agrees: Brosius and Hurlimann A1-A3,A6,A11; Clark A2-A3,A6-A8,A11; Friedland A15-A17; Mack CL A2,A6-A8; Mack Benktander A1-A3,A9,A11-A12; Marshall A14; Meyers A9-A11,A14; Sahasrabuddhe A4; Shapland A1,A9-A11,A13; Siewert A4; Taylor A9-A12; Teng A5; Venter A2,A6,A12; Verrall A9,A13. Scope notes (Hurlimann proofs, Taylor Chapters 1-6, Teng excl. Section 5 + Feldblum Sections 1-2, every 'including errata', Venter updated errata, Sahasrabuddhe revised 2013, Siewert/Teng/Venter page ranges, Meyers 2nd ed.) match; two paraphrases fixed (F-001, F-002). Link names against citations and title pages; bibliographic conflicts logged in the comment above (Mack 2000 title and pp., Clark hyphen, Friedland 2022 vs (c)2023). Outline hyperlinks (38 annotations, pp.5-6) listed; the six documents above read. Sitting: CAS page links only the October 2026 outline, window Oct 19-27 2026, no errata or new outline (2027 schedule notice 10/06/2026). App data agrees: examPdfLinks '7-1' is this URL (v04); examSittings CAS-7 2026-10-19..27, deadline 2026-09-29; examSittingDetails CAS-7 page URL and outline URL. syllabus_lint: 0 errors, 0 warnings. Links: 56, all exact (41 to 30 Concepts pages, 15 to Resources).
- sources_checked: CAS, Exam Content Outline — Advanced Estimation of Claims Liabilities – Exam 7, Fall 2026 (the 'October 2026 Content Outline'; Exam_7_CO_2026_F v04 2026_9_16, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; CAS, Exam 7 — Advanced Estimation of Claims Liabilities exam page, read 2026-10-09: window October 19 - October 27, 2026; register by Sep. 29, 2026 11:59 pm; fee $850 ($680 full-time students); refund deadline October 6, 2026; 'October 2026 Content Outline' the only outline linked, sha256:a1f1961b2d543a917412958c43136b75ce082e9c16e08a2d541fd081a211a279 — https://www.casact.org/exam/exam-7-advanced-estimation-claims-liabilities; Mack, Credible Claims Reserves: The Benktander Method, ASTIN Bulletin 30(2) 2000 pp.333-347, PDF p.1 and p.15, sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf; Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, PDF pp.1-2, sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf; Meyers, CAS Monograph 8 (2nd ed.), PDF p.4 (Copyright 2019), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf; Shapland, CAS Monograph 4, PDF p.4 (Copyright 2016), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Taylor and McGuire, CAS Monograph 3, PDF p.4 (Copyright 2016), sha256:d9ca082d0e8e8c0ed514e5e526cf0372cc457f4b5c94e4ff774cd6fc9e24249a — https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf; Friedland, Reserving for Reinsurance, CAS Study Note, PDF pp.1-3, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Verified high. Every examinable statement on the page is the Fall 2026 outline's: delivery, the single 100% domain, preamble, 17 tasks, readings, codes and scopes. Two nit paraphrases in scope notes replaced with the outline's words (F-001, F-002, resolved). Bibliographic conflicts are logged, not vault errors.
