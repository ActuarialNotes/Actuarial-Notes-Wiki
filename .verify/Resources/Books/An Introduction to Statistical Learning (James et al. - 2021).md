---
target: Resources/Books/An Introduction to Statistical Learning (James et al. - 2021).md
created: 2026-10-04
---

## [F-001] Syllabus citations name the superseded 2025 MAS-I and MAS-II outlines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Sources, MAS-I and MAS-II content outline entries
- claim: Sources cites CAS Exam MAS-I Content Outline (2025), https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf, and CAS Exam MAS-II Content Outline (2025), https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf, for the citation and the two assignments.
- evidence: The CAS exam pages now link only the 2026 outlines (MAS-I page html sha256:60386e2cc573d16ac1792989fdf4d27382f0944e668a773669bb2567ca26004a; MAS-II page html sha256:7db188777daf66dbed1b0b150bf09511ef0adbc7f730aae0d96ea59c747d558e): CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b, https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf. The cited files are MASI_CO_2025_S v04 2024_12_19 (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) and the Dec 2024 MAS-II outline (fetched this run, sha256:bf41c7cee564b1063c661cd7223bd30ed51866f9e1f68dcefac886656349d2db). The James entries are identical old vs new: MAS-I p.6 'Chapters 1, 2 (excluding Section 2.2.3), 3 (Sections 3.1 through 3.3, and 3.6 labs on Sections 3.1 through 3.3), 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested), 5, 6, and 7', C1-C9, OP; MAS-II p.4 'Chapters 1 (Background reading only), 2.2, 4.4.2 (Confusion Matrix Only), 8, 10, 12. Exam questions will not be sourced directly from Chapter 1.', C1-C9, OP. The callout matches both 2026 entries word for word; only the citations are stale. (The 2026 MAS-II outline's one change in Domain C is a new reading, Salis, Measures of Predictive Accuracy, Nov 2025, C3 & C10 — not a change to the James assignment.)
- source_rank: 1
- proposed_action: Cite the two 2026 outlines (labels and URLs); content unchanged.
- applied: true
- fingerprint: 31272c59090f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Sources now cites CAS Exam MAS-I Content Outline (2026) and CAS Exam MAS-II Content Outline (2026) at their 2026-06 and 2026-01 casact.org URLs; both James entries are identical to the 2025 ones, so the callout is unchanged.

## [C-001] Conflicts inside the source (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: ## 3 Linear Regression, 3.1.2; ## 4 Classification, 4.4.2
- note: Outline built from the CAS copy's PDF bookmarks (269 entries) and its printed Contents (PDF pp.5-11) before re-reading the page; the page's 266 numbered headings match the 266 numbered bookmarks one for one, in order, with two differences, both inside the book: (1) 3.1.2 — the bookmark reads 'Assessing the Accuracy of the Coefficients Estimates', the printed Contents and the section heading in the text (PDF p.73) read 'Assessing the Accuracy of the Coefficient Estimates'; the page follows the printed text. (2) 4.4.2 — both bookmark and Contents text layer read 'p >1' (TeX math spacing); the page writes 'p > 1'. No heading is missing in either direction. The statlearning.com free PDF is a later corrected printing (ISLRv2_corrected_June_2023) than the CAS copy (First Printing: August 4, 2021); the outlines link the CAS copy, which is the one checked.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: high
- checks_run: outline built from bookmarks + printed contents before re-reading the page, then diffed programmatically heading by heading (266/266, same order; 3.1.2 follows printed text); bookmark vs printed-contents conflict logged; omissions walk (all 13 chapters and every section/subsection present); MAS-I and MAS-II callout bullets diffed word for word against the 2026 outlines and the 2025 ones they cited (identical) and against both exam pages' Source Material (C1–C9); lead checked against the Preface (applications over mathematics; audience; labs from Ch.2; 2nd-ed additions: Ch.10, 11, 13, naive Bayes and GLMs in Ch.4, BART in Ch.8, matrix completion in Ch.12); frontmatter vs title page and Crossref (ISBN check digit valid); Available-from fetched; resource_lint clean
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer, first printing Aug 4 2021) — title page, Preface pp.vii-viii, printed Contents pp.ix-xv and the PDF bookmark outline, CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.5-6 (Domain C readings; James citation, chapter/section scope, C1-C9, OP), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), pp.3-4 (Domain C readings; James scope, C1-C9, OP), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Crossref record for doi:10.1007/978-1-0716-1418-1 (title, subtitle with Applications in R, authors, Springer US, Springer Texts in Statistics, print ISBN 9781071614174), sha256:5782b3e6bc217981cd73db1f9a03fb1ed6dac5dbbb0663e509b592fb876a4a0a — https://api.crossref.org/works/10.1007/978-1-0716-1418-1; An Introduction to Statistical Learning, authors' site (offers the 2nd-edition PDF free: Download the PDFs here — 2nd Edition of ISL with R), html sha256:2312bb72cb8d25954719aca8f9a1614dacde351d444a6f1fae5335e9a7ec8b18 — https://www.statlearning.com/
- note: Outline complete and verbatim; scope callouts match the 2026 MAS-I and MAS-II outlines exactly. Fixed: stale outline citations (F-001). No open findings.

## [C-003] Delta re-check — cover jacket and syllabus bullets
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: delta diff against the verified version; jacket compared with the frontmatter; cited sources re-fetched; new syllabus bullets diffed against the SOA syllabi
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer, first printing Aug 4 2021) — title page, Preface pp.vii-viii, printed Contents pp.ix-xv and the PDF bookmark outline, CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.5-6 (Domain C readings; James citation, chapter/section scope, C1-C9, OP), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), pp.3-4 (Domain C readings; James scope, C1-C9, OP), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Crossref record for doi:10.1007/978-1-0716-1418-1 (title, subtitle with Applications in R, authors, Springer US, Springer Texts in Statistics, print ISBN 9781071614174), sha256:38a0598c497347c7a8fa730b48e7f2ee6fea0a6ea52c52d3ce70583d2c81c316 — https://api.crossref.org/works/10.1007/978-1-0716-1418-1; An Introduction to Statistical Learning, authors' site (offers the 2nd-edition PDF free: Download the PDFs here — 2nd Edition of ISL with R), html, sha256:26052e3e80e700fce1b0781d69d01cd2fc28ca80b8f4f11310b1027f566f9dad — https://www.statlearning.com/; SOA Exam PA syllabus, October 2026, Readings, the James et al. table (First and Second Edition rows), sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf; SOA Exam SRM syllabus, January 2027, Readings, James et al. Second Edition, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Stale only because of an edit after the pass of 2026-10-04 (commit 1206e728). The cover embed now names the real jacket, '- Cover.jpg', instead of the generated '- Cover.svg' (commit 756fa1d1, 2026-10-07). The jacket shows this page's title, authors and edition. The page also gained two On-the-syllabus bullets, Exam PA and Exam SRM (commit dd9a00c5, 2026-10-05). Each is the syllabus's assignment word for word — SOA's own unclosed parenthesis after '8.3.5' included — checked against the October 2026 PA syllabus (sha256 1f1c4642…) and the January 2027 SRM syllabus (sha256 2165c0de…), the same files .syllabus/pa-1 and .syllabus/srm-1 were extracted from. Every PDF the earlier pass cited was re-fetched and is byte-identical; catalogue pages were re-read (an HTML page's hash moves on every fetch).

## [C-004] Delta re-check — ACIA Capstone bullet
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T22:08Z/2e97
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta diff against the verified version (git); new callout bullet and Sources line diffed word for word against the CIA's ACIA Capstone syllabus PDF, sha256 checked; prior sources unchanged by the edit
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer, first printing Aug 4 2021) — title page, Preface pp.vii-viii, printed Contents pp.ix-xv and the PDF bookmark outline, CAS-hosted copy, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), pp.5-6 (Domain C readings; James citation, chapter/section scope, C1-C9, OP), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), pp.3-4 (Domain C readings; James scope, C1-C9, OP), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Crossref record for doi:10.1007/978-1-0716-1418-1 (title, subtitle with Applications in R, authors, Springer US, Springer Texts in Statistics, print ISBN 9781071614174), sha256:38a0598c497347c7a8fa730b48e7f2ee6fea0a6ea52c52d3ce70583d2c81c316 — https://api.crossref.org/works/10.1007/978-1-0716-1418-1; An Introduction to Statistical Learning, authors' site (offers the 2nd-edition PDF free: Download the PDFs here — 2nd Edition of ISL with R), html, sha256:26052e3e80e700fce1b0781d69d01cd2fc28ca80b8f4f11310b1027f566f9dad — https://www.statlearning.com/; SOA Exam PA syllabus, October 2026, Readings, the James et al. table (First and Second Edition rows), sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf; SOA Exam SRM syllabus, January 2027, Readings, James et al. Second Edition, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; CIA Education Syllabus – ACIA Capstone Exam and Modules (CIA, last updated January 19, 2026), section 4 'Topics of predictive analytics and statistics', pp.30-31, rows A5.1-A5.9, sha256:2a0fb1facb47c97a76ac956d86f0514bcb9e5459ecdc0a973bd3f6f155e3d291 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=608114&fid=627235 (listed at https://www.cia-ica.ca/publications/997001e/)
- note: Stale only because of commit d9b9240c (19 Oct), which added an ACIA Capstone bullet to the On-the-syllabus callout and a CIA syllabus line to Sources; nothing else changed since the verified version. Every assignment in the bullet matches the syllabus's reading-reference column word for word (pp.30-31): A5.1 Chapters 2 (Sections 1-3) and 5 (Sections 1 and 3); A5.2 Chapters 3 (Sections 1-6), 4 (Sections 1-3 and 6) and 6 (Sections 1-5); A5.7 Chapter 12 (Sections 1 and 2); A5.8 Chapter 8 (Sections 1 and 3); A5.9 Chapter 12 (Section 4); each section's (C) level as printed. The ISBN and edition match. Downloaded PDF's sha256 equals the one .syllabus/acia-capstone was extracted from.
