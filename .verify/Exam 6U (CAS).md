---
target: Exam 6U (CAS).md
created: 2026-10-09
---

## [F-001] Domain A tasks do not match the Fall 2026 outline; 'Describe the functions of NAIC' is missing
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Learning Objectives, domain A, tasks 1-7
- claim: Task 2 reads 'Discuss the historic development of solvency regulation; describe current programs used to monitor solvency.' Task 3 reads 'Describe the current state of insurance regulation (e.g., Sarbanes-Oxley, Dodd-Frank) and how current regulations address specialized insurance topics (e.g., Excess and Surplus Lines, Credit-Based Insurance Scoring, Risk Retention Groups).' Task 4 reads 'Discuss current programs used to monitor solvency (RBC).' Task 6's e.g. list adds Nuclear Verdicts. Task 1 has no e.g. list.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), p.3, TASKS: A1 'Describe the historic development and the current state of insurance regulation and governance (e.g., antitrust provisions, rate regulation, rating agencies, the business of insurance, relevant federal laws and Supreme court decisions).' A2 'Describe the functions of NAIC.' A3 'Discuss the current programs used to monitor solvency (e.g., RBC, insurance department examination, receivership, NAIC regulatory tests such as IRIS and Own Risk Solvency Assessment (ORSA)).' A4 'Describe current regulations addressing specialized insurance topics (e.g., Surplus Lines Companies, Risk Retention Groups, Risk Purchasing Groups, captives, non-admitted companies).' A6 '(e.g., tort reform, class action suits)'. A5 and A7 match the page word for word with links stripped. The page has no task about NAIC's functions. Its task 2 (historic development of solvency regulation) and task 3 (Sarbanes-Oxley, Dodd-Frank, credit-based scoring) appear in no Fall 2026 task. The outline's ORSA, examination, receivership, RPG, captive and non-admitted scope is absent from the page. Diffed line by line, whitespace normalised.
- source_rank: 1
- proposed_action: Re-transcribe A1-A7 from p.3 in CAS's order and words. Move vault-chosen terms (Sarbanes-Oxley, Dodd-Frank, Credit-Based Insurance Scoring, Nuclear Verdicts) to marked key-concept lines, as the FM and P pages do. Not auto-fixed: every new noun phrase needs a concept link, and choosing it is a maintainer's call.
- applied: false
- fingerprint: a3302c41f38b

## [F-002] Domain C has 10 tasks from an earlier outline; Fall 2026 has 9 and adds RBC and IRIS calculations
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Learning Objectives, domain C, tasks 11-20
- claim: Ten tasks (11-20): describe the primary statements; differentiate them under SAP, GAAP and IFRS; use schedules, IEE, RBC, IRIS and SAO to evaluate financial health; differentiate accounting principles (e.g., SAP, GAAP); actuary's responsibilities; appointed actuary's responsibilities; 'Identify and propose language for sections of the SAO'; 'Use Schedule P data in support of a SAO'; 'Create an Actuarial Opinion Summary'; income tax (discounting).
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), p.5, TASKS C1-C9. C1 'Describe, differentiate, and perform calculations related to the primary financial statements (e.g., balance sheet, income statement, cash flows, capital and surplus, notes to financial statements) and use them to evaluate the financial health of an insurance entity.' C2 the same for 'the annual statement schedules and exhibits (e.g., Underwriting and Investment Exhibit, Schedule F, Schedule P, Exhibit of Premiums and Losses (Statutory Page 14), 5-year Historical Data), insurance expense exhibits, and Statement of Actuarial Opinion (SAO)'. C3 'Describe and perform calculations related to Risk Based Capital (RBC) and use them to evaluate the financial health of an insurance entity.' C4 the same for IRIS ratios. C5 'Describe and quantify the differences between various accounting reporting principles and standards (e.g., SAP, GAAP, IFRS, Solvency II).' C6 matches page task 15, except 'the standards of practice' where the page has 'the Actuarial Standards of Practice'. C7 '...regarding the SAO, actuarial opinion summary (AOS), and actuarial report.' C8 'Construct and discuss the content of the SAO and AOS (e.g., the opinion of the actuary on reserve adequacy, required disclosures, company-specific risk factors, intended users).' C9 'Discuss and calculate specific elements of income tax and evaluate their implications for a property/casualty insurer related to discounting.' The outline has no task for page tasks 17, 18 or 19 as worded. The page has none that requires calculations for the statements, schedules, RBC or IRIS, and none that names Solvency II. Domain C is 60-75% of the exam.
- source_rank: 1
- proposed_action: Re-transcribe C1-C9 from p.5, linking each noun phrase. Do it together with the Source Material codes (the code-set finding), because the codes on the page were written against the same earlier task list. Not auto-fixed: new prose needs links.
- applied: false
- fingerprint: 7fc1e510dc29

## [F-003] Domain B and D tasks drop CAS's e.g. lists; D1, D2 and D5 reworded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Learning Objectives, tasks 9, 10, 21, 22, 23, 24, 25
- claim: Task 9 ends at 'voluntary private insurance sector.' Task 10 ends at 'program.' Task 21: 'Describe Reinsurance Accounting and its impact on financial statements.' Task 22: 'Evaluate whether a contract qualifies for Insurance Accounting treatment or deposit treatment.' Task 23 has no e.g. list. Task 24 says 'impact to'. Task 25: 'Evaluate the health of an insurance entity using Schedule F.'
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), p.4: B2 continues '(e.g., related to funding mechanisms/sources, allocation/assignment of exposures and associated costs, claim settlement and insurance coverage provisions, welfare (subsidization) versus insurance principles).' B3 continues '(e.g., solvency, efficiencies, stability, viability/longer term prospects, how well the program meets its purpose).' B1 matches. p.6: D1 'Describe reinsurance accounting terminology and practices related to the identification and evaluation of insurance and financing components of contracts.' D2 'Determine whether the contract qualifies for insurance accounting treatment or deposit accounting treatment via risk transfer testing and understand the impact on financial statements.' D3 adds '(e.g., definition, motivations of parties)'. D4 'based on the impact on the financial statements'. D5 'Describe Schedule F and use it to evaluate the financial health of an insurance entity.'
- source_rank: 1
- proposed_action: Transcribe B2, B3 and D1-D5 word for word from pp.4 and 6, with links on the new noun phrases.
- applied: false
- fingerprint: c42e435d3758

## [F-004] Source Material task codes are stale: 28 of 46 readings differ from the Fall 2026 outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: major
- status: open
- locus: ## Source Material, the indented code line under each reading
- claim: The 28 differing code lines: ASOP 20 C6, C7; ASOP 36 C7; AAA CECL D1, D3–D4; AAA Retained Risk C4, C7; AAA Materiality C7; Brandt & Maxwell C7; Cole & Marzen A3, A6–A7; COPLFR C5–C9; Emmanuel A3; FIO A3; Feldblum (Rating Agencies) A2; 2025 IEE C3; NAIC Solvency Framework A2, A4, C3; APPM Preamble A2, C2, C4; SSAP 9 C5; SSAP 62R C1–C2, D2–D3, D5; SSAP 63 C1–C2; Kucera A3; McCarty A3; IRIS A2, C3, C7; Annual Statement Blanks C1–C2; Annual Statement Examples C1; NAIC RRG A3; Odomirok A2, C1–C7, C9–C10; Porter 2-8 A1–A2; Porter 12 A2, B1; Vaughn A2, A4; Webel B1–B2.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), pp.7-12, 'Domains/Tasks' column, in the same order: ASOP 20 C9; ASOP 36 C2, C7-C8; AAA CECL D1, D3-D5; AAA Retained Risk A4, C5-C6; AAA Materiality C8; Brandt & Maxwell C8; Cole and Marzen A4, A6-A7; COPLFR C5-C8; Emmanuel A4; FIO A1; Feldblum (Rating Agencies) A1; 2025 IEE C2; NAIC Solvency Regulatory Framework A3, A4, C3; NAIC APPM, Preamble A2, C1-C2; SSAP 9 C7; SSAP 62R C1-C2, D2, D5; SSAP 63 C1-C2, C8; Kucera A5; McCarty A5; NAIC IRIS A3, C4, C8; NAIC Annual Statement C1-C8; Examples C2; NAIC RRG A4; CAS Financial Reporting A2, C1-C8; Porter 1 A1; Porter 2 A1, B1; Vaughn A3; Webel B1-B3. The other 18 match: ASOP 41, ASOP 43, CASTF, Cedar & Thompson, Cook, Feldblum (Surplus), ASC 944, FHCF, Freihaut & Vendetti, Government Insurers, Horn & Webel, Klann, SSAP 5R, 53, 55, 65, 66 and NAIC Price. The page's C10 is not a Fall 2026 code, because the outline stops at C9. The 46 bullets match the outline's 46 citations one to one, and the title {46 Readings} is right.
- source_rank: 1
- proposed_action: Replace each code line with the outline's Domains/Tasks entry. Do it in the same change as the domain A and C task re-transcription; otherwise the codes point at tasks the page does not show. Not auto-fixed for that reason.
- applied: false
- fingerprint: 598c5b3e078b

## [F-005] Tasks numbered 1-25 across domains; the outline numbers them A1-A7, B1-B3, C1-C9, D1-D5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Learning Objectives, numbered lists
- claim: Tasks are numbered 1-25 continuously: A 1-7, B 8-10, C 11-20, D 21-25.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), pp.3-6: each domain's TASKS list restarts at 1, and the text-reference table on pp.7-12 cites tasks as domain letter + number (e.g. 'C5-C8'). The outline has 24 tasks (7/3/9/5); the page has 25. A reader cannot find 'C8' from a Source Material code on this page. The CLAUDE.md note that 6U's readings 'cite codes in another numbering than their objectives' is the same symptom.
- source_rank: 1
- proposed_action: Number each domain's tasks from 1, as the Exam 9 page does, when the tasks are re-transcribed. Then the shelf's Learning objective filter can work for 6U.
- applied: false
- fingerprint: 905037fb749f

## [F-006] Domain A Readings line omits AAA Retained Risk and NAIC APPM, Preamble
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Learning Objectives, domain A, **Readings:** line
- claim: 15 readings, starting 'CASTF Predictive Models'. Neither AAA Retained Risk nor NAIC APPM Preamble is listed.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), p.3, domain A 'Readings' list has 17 entries, including 'AAA Retained Risk' and 'NAIC APPM, Preamble'. Their p.7 and p.9 citations carry codes A4 and A2. The other 15 match. The B, C and D Readings lines match pp.4 and 6 entry for entry.
- source_rank: 1
- proposed_action: Add the two names to the line in its alphabetical order. The line is plain text, so the concept set is unchanged.
- applied: true
- fingerprint: 7f97a834d4e6

## [F-007] Domain preambles condensed; A loses ratemaking/risk classification and ORSA, B and C lose scope
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Learning Objectives, the opening paragraph of each domain callout
- claim: Each domain opens with one vault-written sentence, e.g. A: 'Candidates navigate Insurance Regulation required by governmental agencies overseeing insurers, including the dual U.S. state and federal regulatory system, Rate Regulation, Solvency Regulation, Antitrust Law, Risk-Based Capital, and Tort Law.'
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf): p.3, A has three paragraphs and a bulleted list. Absent from the page: contract terms; 'regulations as they affect insurance ratemaking in the US, as well as regulatory and political aspects of risk classification'; IRIS-type ratios and guaranty fund mechanisms; 'ORSA and risk-based capital calculations from the statutory blank'; 'The judicial role in the development of tort law'. p.4, B's list qualifies its items: 'Automobile Plans (e.g., MD Fund)', 'Government Backstops, e.g., TRIA and Florida Hurricane Catastrophe Fund', 'Residual markets (e.g., auto, workers compensation, property)', 'Workers' compensation, including its interaction with Medicare'. p.5, C has three paragraphs. They cover contents, purposes and recent changes of the Annual Statement and IEE; federal income tax treatment including loss reserve discounting; GAAP 'for both insurance and non-insurance companies'; and 'educational notes issued by the American Academy of Actuaries and the NAIC'. p.6, D's three sentences are condensed to one; the page's 'Commutations' and 'reinsurance strategies' come from the tasks.
- source_rank: 1
- proposed_action: Transcribe the four preambles word for word (syllabus_lib.py: 'preamble, verbatim'), linking each noun phrase.
- applied: false
- fingerprint: 1c9fd55bc489

## [F-008] Source Material gives codes only; the outline's page, section and exclusion limits are absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Source Material, every reading
- claim: Each reading carries a task-code line and nothing else.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), pp.7-12 limit most readings. Examples: AAA Retained Risk 'Chapters 1, pages 7-10 ending with section on Trusts and 4, pp. 17-23'; COPLFR 'Exclude Appendix I.1.3 NAIC Title SAO Instructions and Appendix IV. SSAPs'; Emmanuel pp.5-7 and 8-12 with three excluded sections; Feldblum (Rating Agencies) pp.1-7, 14-15 and Appendix A; NAIC Solvency Regulatory Framework with a paragraph-level exclusion list; SSAP paragraph ranges (5R 1-13, 31-34, 38-39; 62R 1-111; 66 1-5, 7.a., 8, 9.a., 10-14); Odomirok 'excluding Part VII [Canadian Introduction and Canadian Chapters 27-29] and Appendix II, including errata'; Porter 1's seven chapter-level inclusions and exclusions; Webel 'Summary page and pp. 1-10, stop at The Terrorism Insurance Market'. A candidate reading the page studies whole documents.
- source_rank: 1
- proposed_action: Append each reading's Fall 2026 scope after its codes, word for word from pp.7-12, as the Exam 9 page does. Best done in the same pass as the code-set correction.
- applied: false
- fingerprint: d75d300022a5

## [F-009] Reading link names carry the 2024 editions where the outline assigns 2025, and Porter 1 is named 'Chapters 2-8'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Source Material, link names
- claim: Link names include COPLFR (… - 2024); '2024 Excess and Surplus Lines Laws Manual (Emmanuel & Lerner - 2024)'; SSAP 5R, 9, 53, 55, 62R, 63, 65, 66 (NAIC - 2024); IRIS Ratios Manual (NAIC - 2024); 'Official 2024 NAIC Annual Statement Blanks … (NAIC - 2024)'; 'Insurance Regulation Chapters 2-8 (Porter - 2008)'; 'Government Insurers Study Note' with no author or year.
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), pp.8-12: COPLFR Practice Note '2025'. Emmanuel '2025 Excess and Surplus Lines Laws Manual,' revised 04/2025. Each SSAP is cited from 'Accounting Practices and Procedures Manual, 2025'. IRIS Ratios Manual '2025'. 'Official 2025 NAIC Annual Statement Blanks'. Porter 1's scope includes 'Chapter 12 – exclude pp. 12.12-12.17' alongside Chapters 2-6 and 8, so 'Chapters 2-8' misdescribes it (Chapter 7 is not assigned; Chapter 12 is). Government Insurers is 'Germani, W., et al., ... April 2017'. None of these 44 linked pages exists yet (syllabus_lint: 44 broken-source warnings), so a candidate cannot yet land on the wrong edition, but the names will become the pages' titles.
- source_rank: 1
- proposed_action: Name the resource pages after the 2025 editions (and Porter 1 after its actual scope) when they are written, and update the links to match. Not auto-fixed: the names are resource-page titles, chosen with docs/resource-pages.md.
- applied: false
- fingerprint: 11668bb7dfe0

## [F-010] Lead omits the 4.5-hour appointment and 15-minute break
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: lead paragraph
- claim: '…is a 4-hour computer-based exam…'
- evidence: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf), p.1, Delivery Format: 'APPOINTMENT TIME: 4.5 HOURS'; Exam Duration 4 hours; Scheduled Break 15 min; Exam Tutorial, Confidentiality Agreement, End of Exam Survey 15 min. The 4 hours is right. The Exam 9 page's lead states all three.
- source_rank: 1
- proposed_action: Add the appointment and break to the lead in the Exam 9 page's form.
- applied: false
- fingerprint: 6e604f87568f

## [C-001] Conflicts inside the Fall 2026 outline (logged, not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- locus: Exam_6U_CO_2026_F v02
- note: CAS Exam 6U Content Outline, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp., sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf). (1) Domain C's title is 'Financial Reporting and Professional Responsibilities of the Actuary' in the p.2 weights table but 'Financial Reporting, Taxation, and Professional Responsibilities of the Actuary' in the p.5 heading. The page uses the p.2 form. No finding filed; the choice is a maintainer's call, and Exam 6U has no question bank whose learning_objective would move with it. (2) The p.8 COPLFR note says 'SSAP 5R, 9, 53, 62R, and 66 found in Appendix IV are readings for Domain/Tasks C1-C2'. The SSAP citations themselves give SSAP 9 C7, SSAP 53 C1-C7 and SSAP 66 D2, and say that SSAP 55, 63 and 65 are also in Appendix IV. The page follows the citation column. (3) The p.5 C preamble sentence 'Candidates will be able to demonstrate an understanding of federal income tax treatment, including loss reserve discounting, is expected.' is ungrammatical in the source. Transcribe it as printed.

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-006
- status: resolved
- note: Applied in this change: domain A's Readings line now lists AAA Retained Risk and NAIC APPM Preamble, in alphabetical order. It has 17 entries, matching outline p.3. Hash re-synced.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: in_review
- checks_run: Lead: 4 hours matches p.1; appointment and break absent (F-010). Weights: A 10-20, B 5-15, C 60-75, D 5-10 and the A, B, D titles match p.2; C's title matches p.2 but not the p.5 heading (C-001). Tasks diffed line by line against pp.3-6 with links stripped. A5, A7 and B1 match. A1-A4 and A6 depart (F-001). C is an earlier 10-task list against CAS's 9 (F-002). B2, B3 and D1-D5 depart (F-003). Numbering is 1-25, not per domain (F-005). Preambles are condensed (F-007). Readings lines: B, C and D match; A was missing 2 and is fixed (F-006). Source Material: 46 bullets for 46 citations, title right; 18 code lines match and 28 do not (F-004); no scopes (F-008); link-name years (F-009). Sitting: the CAS page links only the October 2026 outline (v02); window Oct 19-27, 2026; no errata; the 2027 schedule notice posts no new outline. examSittingDetails '6u-1' cites this outline URL; examPdfLinks has no 6u entry (comment there). syllabus_lint: 0 errors, 44 broken-source warnings (44 of 46 reading pages unwritten). Concept links: 124, 80 distinct, all exact.
- sources_checked: CAS, Exam Content Outline — United States Regulation and Financial Reporting – Exam 6U, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp.), PDF pp.1-12, sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951 — https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf; CAS, Exam 6U — Regulation and Financial Reporting (US) exam page, read 2026-10-09: window October 19 - October 27, 2026; register by Sep. 29, 2026; refund deadline October 6, 2026; fee $850 ($680 students); 'October 2026 Content Outline' the only outline linked, sha256:ec11b08b8decba6cb4c7372bbb5b3a6afdf164ae5042fbc1b9017d996008713c — https://www.casact.org/exam/exam-6u-regulation-and-financial-reporting-us
- note: In review, not verified. The Fall 2026 outline was read in full. Three major findings stay open: domain A's tasks (F-001), domain C's task list (F-002), and 28 stale task codes (F-004). All three come from an earlier outline, and fixing them means re-transcribing linked prose. One Readings-line fix was applied (F-006). No critical finding: the weights and the reading list (46 for 46) agree with the outline.

## [C-003] F-009 partly addressed by PR #1629's link retargets
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T22:54Z/ad0b
- date: 2026-10-17
- locus: ## Source Material, link names (F-009)
- note: PR #1629 (commit 3ee3ec5) retargeted seven reading links to the resource pages now written. Against the Fall 2026 outline (re-fetched 2026-10-17, sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951, https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf): 'Official 2025 NAIC Annual Statement Blanks Property and Casualty (NAIC - 2025)' now matches the p.11 citation 'Official 2025 NAIC Annual Statement Blanks'; both Porter bullets now link 'Insurance Regulation (Porter - 2008)', the one book p.12 cites for Porter 1 and Porter 2, so the 'Chapters 2-8' misdescription is gone. Feldblum ('Rating Agencies', CAS Study Note 2011, p.8), Freihaut & Vendetti (E-Forum Spring 2009, p.9), CAS Financial Reporting (Odomirok et al. 2020 Ed. 5, p.12) and ASOP 41 (Dec 2010, p.7) each land on the page for the document the outline cites. F-009 stays open: COPLFR, Emmanuel & Lerner, the eight SSAPs and the IRIS manual still carry 2024 link names where the outline assigns 2025, and Government Insurers Study Note still has no author or year. With the two Porter entries now showing the same name, only their task codes tell them apart, which F-008 (no scope lines) already covers.

## [C-004] Validation pass — in_review (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T22:54Z/ad0b
- date: 2026-10-17
- status_set: in_review
- checks_run: Delta re-check after PR #1629 (commit 3ee3ec5). git diff cb52162..HEAD: 7 Source Material link lines changed, nothing else. Each new target resolves to an existing Resources/Books page; each matched against the outline's citation (pp.7-12) — same documents. Outline re-fetched 2026-10-17: sha256 identical to the 2026-10-09 read. syllabus_lint: 0 errors.
- sources_checked: CAS, Exam Content Outline — United States Regulation and Financial Reporting – Exam 6U, Fall 2026 (Exam_6U_CO_2026_F v02 2026_4_2, 12 pp.), PDF pp.1-12, sha256:11d626dc3093e467832cce0b86eca970c6add2904bb028d36f4c5b6e80356951 — https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf; CAS, Exam 6U — Regulation and Financial Reporting (US) exam page, read 2026-10-09: window October 19 - October 27, 2026; register by Sep. 29, 2026; refund deadline October 6, 2026; fee $850 ($680 students); 'October 2026 Content Outline' the only outline linked, sha256:ec11b08b8decba6cb4c7372bbb5b3a6afdf164ae5042fbc1b9017d996008713c — https://www.casact.org/exam/exam-6u-regulation-and-financial-reporting-us
- note: In review, not verified: the retargets are sound, but the nine findings from the 2026-10-09 pass (three major: F-001, F-002, F-004) remain open and untouched by this change. See the comment above for F-009's partial progress.
