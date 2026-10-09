---
target: Exam 8 (CAS).md
created: 2026-10-09
---

## [C-001] Ten Source Material links have no Resources/Books page yet
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- locus: ## Source Material
- note: syllabus_lint.py 'Exam 8 (CAS).md' reports 0 errors, 10 [broken-source] warnings: no page yet for ASOP 25 (line 61), Bahnemann (63), Bailey and Simon (65), Chalk et al. (67), Couret and Venter (69), Fisher et al. study note (71), Fisher et al. case study (73), Holmes and Casotto (77), ISO CGL plan (79) and Mahler (81). ASOP 12 and Goldburd et al. resolve (scripts/vault_links.py). Exam 8 carries source_pages: partial in scripts/exam_catalog.json, which keeps these warnings. Known gap, not filed as a vault error; the link names were still checked against CAS's citations and the documents' title pages (see the pass). All 61 concept links on the page resolve exactly (73 links in all: 61 concept, 12 readings).

## [C-002] Two irregularities inside the CAS sources, not vault errors
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- locus: ## Source Material: Goldburd et al.; Couret and Venter
- note: (1) The Fall 2026 outline (Exam_8_CO_2026_F v03 2026_6_22, sha256:306e7a7b…1964521) p.5 prints Goldburd et al.'s Domains/Tasks as 'A1, A3-A5, -A9'. The stray hyphen leaves it open whether A9 alone or a range ending at A9 is meant. The page reads it as A9 and says in a footnote what the outline prints. That is a disclosed reading of an ambiguous source, so no edit. (2) The outline p.5 cites Couret & Venter as ASTIN Bulletin Vol. 38 No. 1, pp. 72-85. The paper's own first page (casact.org 8_Couret_Venter.pdf, sha256:ce50d8a0…ebba18) prints 'Astin Bulletin 38(1), 73-85'. The page does not cite page numbers, so nothing on it is affected.

## [F-001] Goldburd link names the 2020 edition; Exam 8 assigns the 2025 revision
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Source Material: [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]]
- claim: The reading is linked as Goldburd et al. - 2020, and the resource card the app draws from that page shows Year 2020.
- evidence: Outline p.5 cites 'Goldburd, M., et al., "Generalized Linear Models for Insurance Rating," CAS Monograph #5, 2nd edition, 2025. Including errata.' The document the outline hyperlinks (casact.org 2021-01/05-Goldburd-Khare-Tevet.pdf, sha256:89b203ea…24cf34b) prints 'Second Edition (2025 revision)' on PDF pp.1 and 3 and adds Dmitriy Guller as fourth author. The errata the outline links (2026-02/Monograph_No_5_Errata_Sheet.pdf, sha256:4622f596…b6735b) is headed '2nd Edition (2025 revision)', approved 1/28/2026. The page's own sub-bullet correctly says '2nd edition, 2025, including errata'. Only the link name and the resource page's Year: "2020" disagree. The resource page is shared with Exam MAS-II and six concept pages, so renaming it is not a transcription fix on this page.
- source_rank: 1
- proposed_action: Maintainer: decide whether the Goldburd resource page should describe the 2025 revision (Year, date, file name) or whether a separate page is needed because MAS-II assigns the 2020 printing; then update the link here.
- applied: false
- fingerprint: 456387e112b5

## [F-002] Couret and Venter link name drops 'in Workers Compensation' from the title
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: ## Source Material: [[Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008)]]
- claim: The link name gives the title as 'Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors'.
- evidence: Outline p.5 cites 'Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation', ASTIN Bulletin 38(1), May 2008. The paper's first page (sha256:ce50d8a0…ebba18) prints the same full title. The resource page does not exist yet (see the broken-source comment), so the link name is the name that page will be written under.
- source_rank: 1
- proposed_action: Write the resource page under the full title and update this link at the same time.
- applied: false
- fingerprint: 1236206b9a84

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Delivery: the lead's 4-hour exam, 4.5-hour appointment and 15-minute scheduled break match outline p.1. Weights and titles: A Classification Ratemaking 60-80%, B Excess, Deductible, and Individual Risk Rating 20-40% match p.2. Preambles and tasks: links and markup stripped, all 20 page lines (A preamble + 9 tasks; B preamble, 3 sub-headed paragraphs, 6 tasks) are whitespace-normalised substrings of the outline, word for word, numbering 1-n, every e.g. list included; nothing on pp.3-4 is missing from the page. Readings lines: A (8) and B (4) match pp.3-4 in order. Source Material: 12 bullets for the 12 citations of the pp.5-6 table, title {12 Sources}; every code matches (ASOP 12 A2, ASOP 25 A2-A3, Bahnemann B1-B3, Bailey & Simon A2-A4, Chalk A7-A8, Couret & Venter A2-A4, Fisher B1-B6, Case Study B1-B6, Goldburd A1, A3-A5, A9 with the '-A9' quirk footnoted, Holmes & Casotto A1, A3-A5, ISO B5-B6, Mahler A2, A4); each scope note (deviation language May 2011; Chapters 5 and 6 incl. errata, Chapters 1-4 assumed; Hazam discussion PCAS XLVII 1960; Monograph #16 1st ed.; Version 3, October 2019; Excel file; 2nd ed. 2025 incl. errata; Monograph #13 2025 revision incl. errata; GL-MU-2019-CGLES-001, manual in study kit and on exam, use not memorize; appendices excluded) agrees with the citation. Link names (title, author, year) against citations and title pages: agree except F-001 (Goldburd year) and F-002 (Couret title truncated). All 25 outline hyperlinks (15 distinct documents) fetched and read. Sitting: CAS page links only the October 2026 outline, window Oct 19-27 2026, no newer outline posted (2027 schedule notice 10/06/2026). App data agrees: examPdfLinks '8-1' is this URL (v03 22 Jun 2026); examSittings CAS-8 2026-10-19 to 2026-10-27, deadline 2026-09-29; examSittingDetails CAS-8 page and outline URLs. Not on the page, not filed: p.2 cognitive levels and the OP/SK source key. syllabus_lint: 0 errors, 10 broken-source warnings (comment C-001). Concept links: 61, all exact.
- sources_checked: CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (the 'October 2026 Content Outline'; Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf; CAS, Exam 8 — Advanced Ratemaking exam page, read 2026-10-09: window October 19 - October 27, 2026; register by Sep. 29, 2026 11:59 pm; fee $850 ($680 students); refund deadline October 6, 2026; 'October 2026 Content Outline' the only outline linked, sha256:84844040018c40dc5cab1a0f521698ce32383120b414c520dae1de8c3ca62c77 — https://www.casact.org/exam/exam-8-advanced-ratemaking; Title pages of the outline's hyperlinked readings, read 2026-10-09 (casact.org unless noted): 8_ASOP12.pdf p.1 sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7; asop025_174.pdf (actuarialstandardsboard.org) p.1 sha256:04693d357236c800665202064f3eaa45307d92bb5648c0b36fcd5ce94a5d00d3; 8_Bahnemann.pdf p.1 sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8; 8_Bahnemann_Errata.pdf sha256:e03ea8f6bce776b3ea3cf1439f1fc06a965d8edb7c05f025ee0cf23584de2bed; 8_Bailey_Simon.pdf p.1 sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2; 8_Bailey_Simon_Discussion_of_Paper.pdf sha256:48b8d420ffd358904509532447e15d50df0d5b1756c2026f81e8d058a02f09e4; CAS_Monograph-16_From_GLMs.pdf p.1 sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74; 8_Couret_Venter.pdf p.1 sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18; 8_Fisher_et_al.pdf p.1 sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81; 8_Fisher_et_al_Case_Study.xlsx sha256:d1110d51591018fad4286d1c6bcb3dccfa9fbdac87422a044c707ed1f70b3350; 05-Goldburd-Khare-Tevet.pdf pp.1,3 sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757; Monograph_No_5_Errata_Sheet.pdf sha256:4622f59623aded645b229235ab0579a527823942ff35dce531033fe534b6735b; CAS_Monograph_13_2025_revision.pdf p.1 sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd; Monograph_13_Errata_sheet.pdf sha256:642022832e3ec1a7a08b587ae70a0e0d0d710ee30ab96f55b7907288e3b8e906; 8_Mahler.pdf p.1 sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58
- note: Verified high. Every examinable statement on the page (delivery, weights, preambles, 15 tasks, readings, every reading's code and scope) is the Fall 2026 outline's own wording. Open findings are bibliographic only: F-001 minor (Goldburd link/resource page dated 2020, outline assigns the 2025 revision) and F-002 nit (Couret & Venter title truncated in the link name). No edits made.
