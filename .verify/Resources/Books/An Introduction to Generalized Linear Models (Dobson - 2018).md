---
target: Resources/Books/An Introduction to Generalized Linear Models (Dobson - 2018).md
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
- claim: Sources names 'CAS Exam MAS-I Content Outline (2025)' at https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf as the source of the citation and the assigned scope.
- evidence: The CAS MAS-I exam page now links only the 2026 outline (MASI_ContentOutline_2026.pdf, version MASI_CO_2026_F, created 2026-06-29; sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed, https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf). Its p.6 entry reads 'Dobson, A., and Barnett, A., An Introduction to Generalized Linear Models, 4th edition, Chapman and Hall/CRC Press, 2018. - Chapters 1-9, excluding 6.3.3, 6.7, 6.8, & 7.9', C1-C9, word for word the same as the 2023-06 upload the page cites (still HTTP 200, PDF created 2024-12-19, sha256:0bd233bd23e60430706b52ab37eb248a9b14d33f9fe3d9bc0712a9e763e2e610). The callout's scope is therefore still correct; only the citation names an outline the CAS no longer links.
- source_rank: 1
- proposed_action: Replace the third ## Sources entry with the 2026 outline (https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf), keeping the same note.
- applied: false
- fingerprint: f71a41105e48

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Outline built from the preview's printed Contents (pp. vii-xiii) before re-reading the page, then diffed mechanically (number, title, order): 210 of 210 page entries match; callout diffed against the 2026 outline p.6 and the 2023-06 upload; frontmatter vs title and copyright pages; lead vs Preface and Routledge description; related readings vs outline pp.5-6 and Larsen pp.1, 3; every ## Sources URL fetched (HTTP 200); resource_lint 0 errors (links resolve, cover exists); LaTeX/link check
- sources_checked: Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC Press, 2018), publisher eBook preview: title page (PDF p.4), copyright page (PDF p.5), Contents pp. vii-xiii (PDF pp.8-14), Preface p. xv (PDF p.16), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F, created 2026-06-29), Complete Text References p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (Dobson & Barnett entry; Domain C readings p.5); Routledge product page, An Introduction to Generalized Linear Models 4th ed., Description and Table of Contents, fetched 2026-10-04, sha256:a74bdbe83be8f9ad0a6ca9f4250280b7de5ca83e0b31ae020397515223f18896 — https://www.routledge.com/An-Introduction-to-Generalized-Linear-Models/Dobson-Barnett/p/book/9781138741515; Larsen, Generalized Linear Models, CAS Study Note (Dec 2015, rev. June 2016), pp.1 and 3 (references to Dobson & Barnett Sections 3.2, 7.7 and 9.8), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; K10plus catalogue, MARC record for ISBN 9781138741515 (250 'Fourth edition'; 264 CRC Press [2018]; 300 xv, 376 pages), sha256:6ed95bb561ab6f399eb7cdf060d614cfa9492276cf09a0b650d0ef540db4dd05 — https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D9781138741515&maximumRecords=10&recordSchema=marcxml
- note: Outline: all 14 chapters, every section and subsection, Postface, Appendix and Software match the printed Contents in number, title and order (including the 4th-edition additions 6.3.3 Model selection, 6.7 Non-linear associations, 6.8 Fractional polynomials and 7.9 Odds ratios and prevalence ratios). Only Preface, References and Index are not listed (front/back matter, not filed). Routledge's chapter list agrees on 14 chapters, Postface and Appendix, as the Sources note says. Frontmatter: title, both authors in title-page order, CRC Press, (c) 2018, Fourth Edition and paperback ISBN 978-1-138-74151-5 all on the copyright page (hardback 978-1-138-74168-3 also printed). Lead: every clause is in the Preface (unified framework accessible to undergraduates and researchers in other fields; Stata, R and WinBUGS code; new sections on model selection and non-linear associations; new Postface) or the Routledge description (Normal, Poisson, Binomial; multilevel modelling; MCMC; good statistical practice). Callout: Chapters 1-9 excluding 6.3.3, 6.7, 6.8 and 7.9, C1-C9, identical in the 2026 outline; every excluded number exists in the Contents. Related readings: Larsen p.3 supplements the Section 3.2 table and p.1 cites 3.2, 9.8 and 7.7 on overdispersion; James and Hogg are Domain C readings with it. Confidence medium: the book body is not free, so the check is against its own front matter and the publisher's records, and F-001 (stale citation) stays open.
