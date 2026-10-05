---
target: Resources/Books/Introduction to Probability Models (Ross - 2019).md
created: 2026-10-04
---

## [F-001] Syllabus callout limits the assignment to the 11th or 12th edition; the 2026 outline adds the 13th
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: > [!info] On the syllabus, Exam MAS-I bullet
- claim: The callout gives the assigned sections '(of the 11th or 12th edition)'.
- evidence: The current CAS MAS-I outline, 2026 p.6 (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf), reads 'Ross, S. M., Introduction to Probability Models, 11th edition, 12th edition, or 13th edition, Academic Press (an imprint of Elsevier, Inc.), 2014/ 2019/2023. - Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, and 11.2.2', A1-A6. The 2023-06 upload the page cites (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) reads '11th edition or 12th edition ... 2014/ 2019'. The section list and objectives did not change; only the edition list grew. A candidate with the 13th edition is told by the page that the assignment is for other editions.
- source_rank: 1
- proposed_action: Change the parenthetical to '(of the 11th, 12th or 13th edition)', as the 2026 outline states, and re-cite the 2026 outline in ## Sources (F-002).
- applied: false
- fingerprint: c0e351b7303e

## [F-002] Sources cite the superseded MAS-I content outline instead of the 2026 outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Sources, fourth entry
- claim: Sources names 'CAS Exam MAS-I Content Outline' at https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf for the citation '(11th or 12th edition, Academic Press, 2014/2019)' and the assigned sections.
- evidence: The CAS MAS-I exam page now links only the 2026 outline (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf), whose p.6 citation is '11th edition, 12th edition, or 13th edition ... 2014/ 2019/2023' with the same sections. The 2023-06 upload (sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610) still resolves but is no longer the published outline.
- source_rank: 1
- proposed_action: Replace the fourth ## Sources entry with the 2026 outline and update its note to '(11th, 12th or 13th edition, Academic Press, 2014/2019/2023)'.
- applied: false
- fingerprint: b7eecad51248

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Outline built from the scan before re-reading the page (OCR text layer corrected against the rendered page images: 'Denned'->Defined, 'fc-Record'->k-Record, 'Py(0'->P_ij(t), 'M/G/l'->M/G/1, chapter numerals restored), then diffed mechanically: 233 of 233 entries match in number, title and order; callout diffed against the 2026 outline p.6 and the 2023-06 upload; frontmatter vs title page, K10plus and Google Books; lead vs the Google Books publisher description; every ## Sources URL fetched (HTTP 200); resource_lint 0 errors (links resolve, cover exists); LaTeX balance
- sources_checked: Ross, Introduction to Probability Models, Twelfth Edition (Academic Press, 2019), title page and printed Contents pp. v-x, library scan (TU Ilmenau via K10plus), sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc — https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F, created 2026-06-29), Complete Text References p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (Ross entry; Domain A readings p.3); Google Books record for ISBN 9780128143469: publisher description, Edition 12, Elsevier Science 2019, ISBN 0128143460 / 9780128143469, fetched 2026-10-04, sha256:aaf2cc3eeff2618b38b0202588152c5928154de0328506e8f862d553d138b5ed — https://books.google.com/books?vid=ISBN9780128143469; K10plus catalogue, MARC records for ISBN 9780128143469 (250 'Twelfth edition'; 264 Elsevier, Academic Press [2019], (c) 2019; 300 xv, 826 pages; hardback), sha256:73a486f191299350fb5ef0588066c71f818342452267a0143c9e02accc139fdd — https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D9780128143469&maximumRecords=10&recordSchema=marcxml
- note: Outline: Preface, all 12 chapters, 98 sections, 97 subsections, the unnumbered 'Properties of Covariance' and 'Examples of Compound Poisson Processes', every chapter's Exercises and the nine References entries (none after Chapters 3, 8 and 12, as printed), Solutions to Starred Exercises and Index match the printed contents exactly. Every assigned MAS-I section number exists in the 12th-edition contents (4.1-4.8; 5.2.1-5.2.4; 5.3; 5.4.1, 5.4.2; 9.1-9.6; 11.1; 11.2.1 Inverse Transformation, 11.2.2 Rejection). Frontmatter: title, Sheldon M. Ross, Twelfth Edition and Academic Press (an imprint of Elsevier) on the title page; (c) 2019, hardback ISBN 978-0-12-814346-9 and xv, 826 pages in K10plus. Lead: every clause is in the publisher description (elementary probability modelling and stochastic processes; engineering, computer science, management science, physical and social sciences, operations research; hallmark features, writing style, exercises and examples; real-world applications). Sources notes match what each source gives. Confidence medium: the book body is not free, and F-001 (13th edition missing from the callout) and F-002 (stale outline citation) stay open; the section scope itself is unchanged and correct.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Callout parenthetical changed from '(of the 11th or 12th edition)' to '(of the 11th, 12th or 13th edition)', as CAS Exam MAS-I Content Outline 2026 p.6 states ('Ross, S. M., Introduction to Probability Models, 11th edition, 12th edition, or 13th edition, Academic Press (an imprint of Elsevier, Inc.), 2014/ 2019/2023. - Sections 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2, 9.1-9.6, 11.1, 11.2.1, and 11.2.2', A1-A6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf. Section list and objectives unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Fourth ## Sources entry now cites [CAS Exam MAS-I Content Outline (2026)](https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) with the note 'the citation (11th, 12th or 13th edition, Academic Press, 2014/2019/2023) and the assigned sections', per its p.6 Ross entry (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed).
