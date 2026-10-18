---
target: Resources/Books/Linear Mixed Models (West et al. - 2022).md
created: 2026-10-18
---

## [F-001] Scope citation points at the superseded 2025 content outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: ## Sources, fourth bullet
- claim: [CAS Exam MAS-II Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf)
- evidence: The current outline is the 2026 one (https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, sha256 babf0548...): p.2 Domain B tasks B1-B4, Readings: West; p.4 'West ... 3rd Edition, CRC Press, 2022 - All chapters, excluding coding examples - Additional Notes on Shrinkage Means'. The 2025 file (sha256 bf41c7ce...) says the same, so the scope claim is unchanged; only the citation was stale.
- source_rank: 1
- proposed_action: Retarget the bullet to the 2026 outline.
- applied: true
- fingerprint: 250e3aca9f74

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Retargeted to the 2026 outline in this run; the callout's scope (B1-B4, all chapters excluding coding examples, plus the shrinkage notes) matches it word for word.

## [F-002] Assigned shrinkage note named but not linked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: > [!info] On the syllabus
- claim: the authors' Additional Notes on Shrinkage Means
- evidence: The 2026 outline p.4 assigns 'Additional Notes on Shrinkage Means (http://www-personal.umich.edu/~bwest/shrinkage.doc)'. The URL answered 200 this session (application/msword, 22,016 bytes, sha256 a843104b...; also at https://public.websites.umich.edu/~bwest/shrinkage.doc). The page names the note but gives no link to it anywhere, so a candidate cannot reach the second assigned document from the page.
- source_rank: 1
- proposed_action: Add the author-hosted URL to the callout or as a Sources entry (new text, so for the writer).
- applied: false
- fingerprint: 7f3be74f4904

## [C-001] Chapter 4 title differs between Routledge and Crossref
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- locus: ## 4 Three-Level Models for Clustered Data: The Classroom Example
- note: A conflict inside the sources, not a vault error: Routledge's table of contents gives chapter 4 as 'Three-Level Models for Clustered Data' (no subtitle), while Crossref's chapter record 10.1201/9781003181064-4 (pp.141-208) gives 'Three-Level Models for Clustered Data: The Classroom Example', matching chapters 3 and 5-8's pattern. The page follows Crossref.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: chapter outline diffed against Routledge TOC and Crossref chapter records; frontmatter (title, authors, publisher, year, edition, ISBN) against Routledge and Google Books; scope callout against the 2026 MAS-II outline; resource_lint clean
- sources_checked: CAS Exam MAS-II Content Outline 2026, Domain B tasks B1-B4 p.2; Complete Text References p.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Routledge product page, West, Welch & Galecki, Linear Mixed Models 3rd ed., Table of Contents, Description, copyright 2022, 3rd Edition, sha256:f12634bb020648718b44cad8b1038f03ba0a040c7ef9e5440308249d771ed765 — https://www.routledge.com/Linear-Mixed-Models-A-Practical-Guide-Using-Statistical-Software/West-Welch-Galecki/p/book/9781032019321; Crossref chapter records, doi:10.1201/9781003181064, chapter records 10.1201/9781003181064-1 to -9 with page ranges, sha256:a8cdbef6cc9c2c83eab8698e747a5fa349f51fae41e0067293545b43425ec96c — https://api.crossref.org/works?filter=isbn:9781003181064&rows=40&select=DOI,title,page,type; Google Books record, bibliographic information: C&H/CRC Press 2022, Edition 3, ISBN 1032019328/9781032019321, sha256:884c7013e108b134de403e20cf4c035a5b09b72fc5a1288c9f78f112defea374 — https://books.google.com/books?vid=ISBN9781032019321
- note: All nine chapters and three appendices match Routledge's TOC; chapter titles 1-9 match Crossref (ch.4 subtitle conflict logged as a comment). Year 2022, 3rd edition, ISBN 978-1-032-01932-1 and C&H/CRC Press match Routledge and Google Books. Scope matches the 2026 outline. The book itself was not read (commercial), so section-level content is unverifiable and the page lists none. F-002 (shrinkage note not linked) left open for the writer. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.
