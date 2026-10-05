---
target: Resources/Books/Nonlife Actuarial Models (Tse - 2009).md
created: 2026-10-04
---

## [F-001] Outline omits the sections of Chapters 2-15, including every assigned MAS-I and MAS-II section except 1.1 and 2.2
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: ### 2 Claim-severity distribution (after 2.2) through ### 15; front and back matter; ## Sources, second entry
- claim: Chapter 2 stops at '2.2 Some continuous distributions for claim severity' and Chapters 3-15 are bare headings. The second ## Sources entry says contents pp. viii-xii 'could not be fetched, so the other chapters are listed without their sections'. Preface, Notation and convention, References and Index are not listed.
- evidence: The printed contents pp. vii-xii can be read in Google Books' preview of this edition (id zzlyNPTlqccC, ISBN 9780521764650; https://books.google.com/books?id=zzlyNPTlqccC&pg=PR7 to https://books.google.com/books?id=zzlyNPTlqccC&pg=PR12). Images fetched 2026-10-04: p.vii (pg=PR7) sha256:f714af39286f7f255943e1c96886eeadcaf04d2f8f7951fd03b34a2ccf3b4827; p.viii (pg=PR8) sha256:1604ada36bbf7722a51f62e2c64829215e7b343c2c711dd03fca1a35b39863f7; p.ix (pg=PR9) sha256:649758e0c5319023e7347408da9f922ca9ab82b53aec6e1bec84ed838a2e7096; p.x (pg=PR10) sha256:9eac400042dd6efda8e4d39a4602a9efbaf8bff07eb22eab84ae534c6bafcabb; p.xi (pg=PR11) sha256:845cd7a74ff2cb301aa6e31c9aff09ba0cc4b30f160c7af3b5a87995c600a222; p.xii (pg=PR12) sha256:a2315182e0cc8924cca30ef0f6bd37763f3cf9d87ee62a26aa1d33f62ceb2b0b. p.vii matches the Cambridge Core image the page cites (sha256:310e411c2bcc82d3ba9d145325e7a649444a68994c6d03c990c75475c2e59fc0). Together they list 208 entries: 4 parts, 15 chapters, 85 sections, 83 subsections, 15 Exercises, Preface (xiii), Notation and convention (xv), Appendix, Answers to exercises, References (518) and Index (521). The page carries 41 of them, all correct and in order, and is missing 76 sections, 73 subsections, 14 Exercises and the four front/back-matter entries. The missing sections include the whole assigned scope apart from 1.1 and 2.2. MAS-I 2026 p.6 assigns 2.3 Some methods for creating new distributions, 2.4 Tail properties of claim severity, 2.5 Effects of coverage modifications, 10.1 Estimation, 10.2 Types of data, 11.1 Estimation with complete individual data, 12.1 Methods of moments and percentile matching, 12.3 Maximum likelihood estimation method and 13.2 Misspecification tests and diagnostic checks. MAS-II 2026 p.4 assigns 6.1 Framework and notations, 6.2 Full credibility, 6.3 Partial credibility, 7.1 Framework and notations, 7.2 Variance components, 7.3 Buhlmann credibility, 7.4 Buhlmann-Straub credibility, 8.1 Bayesian inference and estimation, 8.2 Conjugate distributions, 9.1 Empirical Bayes method and 9.2 Nonparametric estimation. Even p.vii, which the page cites, prints 2.2.1 Exponential distribution, and the page omits it. A reader cannot tell from the page what the assigned sections cover, or which neighbouring sections are excluded (6.4 Variation of assumptions, 8.3 Bayesian versus Buhlmann credibility, 8.4 Linear exponential family and exact credibility, 9.3-9.4, 10.3, 11.2-11.3, 12.2, 12.4-12.5, 13.1, 13.3).
- source_rank: 2
- proposed_action: Transcribe the rest of the printed contents from pp. vii-xii (Google Books preview pg=PR7 to PR12): 2.2.1-2.2.4, 2.3-2.7 and Exercises; Chapters 3-15 with their sections, subsections and Exercises; Preface, Notation and convention, References and Index. Then rewrite the second ## Sources entry to cite those pages. This is authoring from the source and is left to a writer pass.
- applied: false
- fingerprint: 89c1a81e8f09

## [F-002] Sources cite the superseded MAS-I and MAS-II content outlines instead of the 2026 outlines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Sources, fifth and sixth entries
- claim: Sources names 'CAS Exam MAS-I Content Outline (2025)' and 'CAS Exam MAS-II Content Outline (2025)' at the 2023-06 URLs (MASI_Content_Outline.pdf, MASII_Content_Outline.pdf) for the citation and the MAS-I and MAS-II sections.
- evidence: The CAS exam pages now link only the 2026 outlines: MAS-I sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (p.6: 'Tse, Y., Nonlife Actuarial Models, Theory Methods and Evaluation, Cambridge University Press, 2009. - Sections 1.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2', B1-B4, B7-9). MAS-II sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b, https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf (p.4: 'Chapters 6.1-6.3, 7.1-7.4, 8.1-8.2, and 9.1-9.2', A1-A2). Both Tse entries are word for word the same as in the 2023-06 uploads the page cites (MAS-I sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610; MAS-II sha256:bf41c7cee564b1063c661cd7223bd30ed51866f9e1f68dcefac886656349d2db; both still HTTP 200). The callout is still correct; only the citations name outlines the CAS no longer links.
- source_rank: 1
- proposed_action: Replace the fifth and sixth ## Sources entries with the 2026 MAS-I and MAS-II outlines (URLs above), keeping the notes.
- applied: false
- fingerprint: cb3d94b98dac

## [C-001] A second edition exists; the CAS still assigns the 2009 edition
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: frontmatter / edition
- note: No change to this page; noted for whoever maintains the MAS-I and MAS-II exam pages and the Store. Cambridge Core's record for this book (sha256:50c221074a0cf6b5ba7bb28a59487e2c54c372501c631ad7e323997bc2b31e60, https://www.cambridge.org/core/books/nonlife-actuarial-models/41EF4E4BB9E3A31F63DDCC18C245C271) now reads 'This textbook has now been replaced with a newer edition and is no longer available for personal or institutional sales'. The newer edition is the 2nd (Cambridge, 25 May 2023, HB ISBN 9781009315074; sha256:d38e2fda79594abc24773f71d5f42a75bf352d32a36ca4e16f2e07976995ec53, https://www.cambridge.org/highereducation/books/nonlife-actuarial-models/26577128CDCB4C4B898131F5FEBDD165). Its description says it 'includes two brand new chapters on loss reserving and ratemaking' and that 'R replaces Excel', so its section numbers may not match the CAS assignment. Both 2026 outlines still cite the 2009 Cambridge University Press edition, which is the one this page describes.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: Full contents (pp. vii-xii) read from page images and transcribed before re-reading the page, then diffed mechanically: 41 of 41 page entries match the printed contents in number, title and order, and 167 printed entries are missing (F-001). Chapter list also checked against Cambridge Core, the LC publisher TOC and K10plus 505. Both callout bullets diffed against the 2026 MAS-I p.6 and MAS-II p.4 outlines and the 2023-06 uploads. Frontmatter checked against the title and copyright pages. Lead checked against the Preface. Every ## Sources URL fetched (HTTP 200). resource_lint 0 errors (links resolve, cover exists).
- sources_checked: Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge University Press, 2009), Google Books preview of the printed book: title page p.iii (pg=PR3) sha256:8695604283c0a487308521be7bf7d5191d6f88eae36d7b6fba455a47cf43326a, copyright page p.iv (pg=PR4) sha256:eebe8bb7fb7dc1a53b59a07afa5785abac4c0e49f23d76044265e3186c9d4646, Contents p.vii (pg=PR7) sha256:f714af39286f7f255943e1c96886eeadcaf04d2f8f7951fd03b34a2ccf3b4827; p.viii (pg=PR8) sha256:1604ada36bbf7722a51f62e2c64829215e7b343c2c711dd03fca1a35b39863f7; p.ix (pg=PR9) sha256:649758e0c5319023e7347408da9f922ca9ab82b53aec6e1bec84ed838a2e7096; p.x (pg=PR10) sha256:9eac400042dd6efda8e4d39a4602a9efbaf8bff07eb22eab84ae534c6bafcabb; p.xi (pg=PR11) sha256:845cd7a74ff2cb301aa6e31c9aff09ba0cc4b30f160c7af3b5a87995c600a222; p.xii (pg=PR12) sha256:a2315182e0cc8924cca30ef0f6bd37763f3cf9d87ee62a26aa1d33f62ceb2b0b — https://books.google.com/books?id=zzlyNPTlqccC&pg=PR7; Cambridge Core book record (title, author, series, hardback ISBN 9780521764650, publication date 17 September 2009, description, chapter list), fetched 2026-10-04, sha256:50c221074a0cf6b5ba7bb28a59487e2c54c372501c631ad7e323997bc2b31e60 — https://www.cambridge.org/core/books/nonlife-actuarial-models/41EF4E4BB9E3A31F63DDCC18C245C271; Contents p.vii page image sha256:310e411c2bcc82d3ba9d145325e7a649444a68994c6d03c990c75475c2e59fc0 — https://static.cambridge.org/content/id/urn%3Acambridge.org%3Aid%3Abook%3A9780511812156/resource/name/firstPage-9780511812156toc_pvii-xii_CBO.jpg; Preface opening sha256:0371a7c19ac7b04b92e3fa45338f2a3cfe93489191f8a6b7b38678d9682f56a1 — https://www.cambridge.org/core/books/nonlife-actuarial-models/preface/113E9D17410E3DAD5DB7C32CDD9EB567; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F, created 2026-06-29), Complete Text References p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (Tse entry; Domain B readings p.4); CAS Exam MAS-II Content Outline 2026, Domain A p.2 and Complete Text References p.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf (Tse entry); Library of Congress table of contents for LCCN 2009520513 (publisher-supplied, chapter level), sha256:8b8e4835d7af6d0f6cc863a3ed00d7cb89a9fd9f7c4227c1d6510f527aa476a8 — https://catdir.loc.gov/catdir/enhancements/fy1005/2009520513-t.html
- note: Everything the page says is right. Title and subtitle are as on the title page; Yiu-Kuen Tse; Cambridge University Press; (c) 2009, 'First published 2009'; hardback ISBN 978-0-521-76465-0 (copyright page); no edition is stated, so none is given. The four parts, 15 chapters, Appendix: Review of statistics, Answers to exercises, and the Chapter 1 sections and subsections with 2.1-2.2 all match the printed contents. Every lead clause is in the Preface: senior undergraduates; theory, methods and empirical implementation; SOA Exam C / CAS Exam 4 per the 2007 Basic Education Catalog; risk measures and ruin theory beyond those exams; four parts; appendix reviewing statistics; many examples; Excel computation sections. The callout matches both 2026 outlines word for word (MAS-I B1-B4, B7-B9: 1.1, 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2; MAS-II A1-A2: 6.1-6.3, 7.1-7.4, 8.1-8.2, 9.1-9.2), and every one of those section numbers exists in the printed contents. The related reading (Hogg for Domain B) matches the outline p.4. Confidence low because F-001 (major) is open. The page gives section titles for none of the assigned sections except 1.1 and 2.2, although the contents can now be read. F-002 (stale outline citations) is also open, and C-001 notes the 2023 second edition.

## [C-003] Second, independent source for the printed contents (supports F-001)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: F-001 evidence
- note: The publisher's eBook preview at https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf (sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404, 55 pp.) contains the title page (PDF p.5), the copyright page (PDF p.6: (c) Y.-K. Tse 2009, Hardback ISBN-13 978-0-521-76465-0, eBook 978-0-511-63023-1), the full printed Contents pp. vii-xii (PDF pp.9-14) with a text layer, the Preface (PDF pp.15-16) and Chapter 1. A mechanical diff of its Contents text against the transcription from the Google Books page images cited in F-001 agrees on all 208 entries: parts, chapters, sections, subsections, Exercises, front matter and back matter. F-001's omission count therefore stands. This PDF is the better source to transcribe the missing sections from, because it is a stable, hashable document with a text layer.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Transcribed the full printed contents pp. vii-xii from the publisher's eBook preview (PDF pp.9-14, text layer extracted with pymupdf, NFKC-normalised for the fi/fl ligatures, wrapped titles joined, running heads and page numbers dropped, then converted to the page shape by script — not retyped): Preface and Notation and convention as ## headings before Part I; the four parts as ##; Chapters 1-15 as ###; all 85 sections, 83 subsections (nested) and the 15 Exercises entries as bullets; Appendix: Review of statistics, Answers to exercises, References and Index as ## headings. 208 entries in all; the page's 41 earlier entries are all among them unchanged. Assigned sections now carry their titles (MAS-I 1.1, 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2; MAS-II 6.1-6.3, 7.1-7.4, 8.1-8.2, 9.1-9.2). Concept links added only on exact-match pages that exist (2.2.1, 2.2.2, 2.3.1, 2.5.1, 2.5.3, 6.3, 7.3, 7.4, 8.4, 9.1, 12.1.1, 12.3, 12.4.2, 13.2.4, 14.3.1), display text as printed. The second ## Sources entry (the Cambridge Core p.vii image, which said pp. viii-xii could not be fetched) is replaced by the preview, cited for the copyright page and the full contents. Source: Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge University Press, 2009), publisher eBook preview, Contents pp. vii-xii (PDF pp.9-14), copyright page (PDF p.6), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Fifth and sixth ## Sources entries now cite [CAS Exam MAS-I Content Outline (2026)](https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) (p.6 Tse entry: Sections 1.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2; B1-B4, B7-9; sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed) and [CAS Exam MAS-II Content Outline (2026)](https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) (p.4 Tse entry: Chapters 6.1-6.3, 7.1-7.4, 8.1-8.2, and 9.1-9.2; A1-A2; sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b), notes unchanged. Both URLs fetched this session (HTTP 200, hashes match). The callout is unchanged.
