---
target: Resources/Books/Introduction to Mathematical Statistics (Hogg et al. - 2018).md
created: 2026-10-04
---

## [F-001] Sources cite the superseded MAS-I content outline instead of the 2026 outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: ## Sources, third entry
- claim: Sources names 'CAS Exam MAS-I Content Outline' at https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf as the source of the citation (8th edition, Prentice Hall, 2018) and the assigned sections by domain.
- evidence: The CAS MAS-I exam page now links only the 2026 outline (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf). Its p.6 Hogg entry ('8th edition, Prentice Hall, 2018. - Domain B: Sections 1.7, 2.7, 2.8, 3.7, 4.1, 4.4, 4.5, 4.6, 4.7, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 8.1, 8.2, 8.3 - Domain C: 4.4, 6.3, 6.5, 7.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6', B1-B8, C1-C9) is word for word the same as the 2023-06 upload the page cites (still HTTP 200, sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610). The callout is still correct; only the citation names an outline the CAS no longer links.
- source_rank: 1
- proposed_action: Replace the third ## Sources entry with the 2026 outline (https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf), keeping the same note.
- applied: false
- fingerprint: 922b8cc8c542

## [C-001] Conflicts inside the sources (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: frontmatter Year/Publisher; ## Appendix D; outline asterisks
- note: Logged, not filed. (1) Year: the 2026 CAS outline p.6 cites the 8th edition as 2018 and Pearson's product page lists hardcover ISBN 9780134686998 'Published 2018 (2018 update)' (Open Library: Jan 20, 2018), but the K10plus record for the same ISBN (LCCN 2017033015, sha256:871e24dc9bcc507458fc4821acecbb5ca1536d28640fd7c7a3f4ccee1ac9ba0c) reads 'Boston : Pearson, [2019]'. The page's Year 2018 follows the rank-1 outline and the publisher; the US copyright page itself was not reachable to settle it. (2) Publisher: the CAS outline names Prentice Hall; Pearson's page ('Published by Pearson') and K10plus name Pearson, which the page uses. (3) Appendix D: the printed (Global Edition) contents p.9 read 'Tables of Distributions', Pearson's web contents 'Table of Distributions'; the page follows the printed contents. Pearson's web list also jumps from 8.3 to '8.3.2' with no 8.3.1, a listing glitch. (4) The printed contents star optional sections (2.6.1, 3.4.1, 3.5.2, 3.5.3, 3.7, 4.3, 4.10, 5.4, 8.4, 8.5, 9.6.2, 10.5, 10.6); the page drops the stars, and 3.7 Mixture Distributions is one of them although MAS-I Domain B assigns it. The page lists sections only, while the printed contents also give subsections; both are depth choices, not errors.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Section-level outline built from the Pearson web contents and the printed Global Edition contents (read from rendered page images) before re-reading the page, then diffed mechanically: all 11 chapters, 89 sections, Appendices A-F and their A.1-B.6 entries and Index match in number, title and order (one dash variant in 6.2); callout diffed against the 2026 outline p.6 and the 2023-06 upload; frontmatter vs Pearson record and K10plus; lead vs Pearson description; every ## Sources URL fetched (HTTP 200); resource_lint 0 errors (links resolve, cover exists); LaTeX balance
- sources_checked: Pearson product page, Introduction to Mathematical Statistics, 8th edition (Hogg, McKean, Craig): Title overview and Table of contents (sections and appendices), hardcover ISBN-13 9780134686998 'Published 2018', fetched 2026-10-04, sha256:0b390bfdae07c5509c079a5f2b7af46348cc2ab06e68b8c3b7597873a2096cf6 — https://www.pearson.com/en-us/subject-catalog/p/introduction-to-mathematical-statistics/P200000006211; Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed., Global Edition (Pearson, 2020), printed Contents pp.5-9 (library scan linked from K10plus), sha256:56616bd9053ab8a928850890dfe2c0ef47a374f3f914d9393179afb4db21350f — https://www.gbv.de/dms/mpib-toc/1763045706.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F, created 2026-06-29), Complete Text References p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (Hogg entry; Domain B readings p.4, Domain C p.5); K10plus catalogue, MARC record for ISBN 9780134686998 (245 authors; 250 'Eighth edition'; 264 Boston: Pearson [2019]; 300 xiii, 746 pages), sha256:871e24dc9bcc507458fc4821acecbb5ca1536d28640fd7c7a3f4ccee1ac9ba0c — https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D9780134686998&maximumRecords=10&recordSchema=marcxml
- note: Outline: the page's 11 chapters and every section heading match the printed contents and Pearson's list section for section (Pearson's list agrees with the Global Edition scan at section level, as the page's Sources note says); appendix letters A-F and the C-F titles come from the printed contents, as stated. Frontmatter: title, three authors in title-page order (K10plus 245), 8th edition and hardcover ISBN 978-0-13-468699-8 match the publisher and catalogue; Year 2018 and Publisher Pearson are discussed in C-001 (CAS and Pearson say 2018, the catalogue [2019]). Lead: every clause is in Pearson's description (comprehensive coverage, classical inference in estimation and testing, examples and exercises, flexible organization, R expanded, hmcpkg data sets, Tukey's multiple comparisons in Ch 9, confidence intervals for correlation coefficients in Ch 9 and 10). Callout: B1-B8 and C1-C9 with the Domain B and Domain C section lists, identical in the 2026 outline; every listed number exists in the contents. Confidence medium: the US 8th edition's own title/contents pages were not reachable, so the check rests on the publisher's record and the Global Edition's printed contents; F-001 (stale citation) stays open.

## [C-003] Section count in C-002 checks
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: C-002 checks_run
- note: C-002's checks_run says '89 sections'; the mechanical diff counted 81 numbered sections (x.y) in the printed contents and 81 on the page, all matching. The outcome of C-002 is unchanged.

## [C-004] Global Edition publisher preview: contents confirmed; copyright line dates the US edition (c) 2019
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: frontmatter Year; outline
- note: Publisher eBook preview of the 8th edition, Global Edition: https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf (sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99). It has the title page (PDF p.2), the copyright page (PDF p.3), the printed Contents pp.5-9 (PDF pp.6-10) with a text layer, and the Preface. (1) A mechanical diff of its Contents text against the transcription from the gbv.de scan cited in C-002 matches every chapter, section, subsection and appendix entry. The only differences are ligatures (ffi/ff), line-break hyphens and the Preface/Index entries, and 6.2 reads 'Rao-Cramer' with a hyphen, as the page has it. The page's section-level outline is therefore confirmed by a second copy of the printed contents. (2) The copyright page (PDF p.3) reads: 'Authorized adaptation from the United States edition, entitled Introduction to Mathematical Statistics, 8th Edition, ISBN 978-0-13-468699-8, by Robert V. Hogg, Joseph W. McKean, and Allen T. Craig, published by Pearson Education (c) 2019.' This adds a publisher's own (c) 2019 for the US 8th edition to the K10plus '[2019]' in C-001. The CAS 2026 outline p.6 (rank 1) and Pearson's product page give 2018, and the page's Year 2018 follows them (higher rank). This is consistent with a January 2018 release carrying a forward-dated 2019 copyright. The conflict is logged and not filed, and a human may prefer the copyright year. It also confirms the title, the three authors in title-page order and the US hardcover ISBN 978-0-13-468699-8 the page carries.
