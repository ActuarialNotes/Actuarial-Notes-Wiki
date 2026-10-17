---
target: Resources/Books/Using the ODP Bootstrap Model (Shapland - 2016).md
created: 2026-10-11
---

## [F-001] Back-matter divisions missing from the outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- severity: minor
- status: open
- locus: divisions after ## Appendix E—GLM Bootstrap Results
- claim: The page's divisions end at Appendix E and go straight to the vault's ## Errata; there is no heading for References, Selected Bibliography, Abbreviations and Notations or About the Author.
- evidence: Shapland's printed contents, p. iv (PDF p. 6), lists after Appendix E: References p. 111, Selected Bibliography p. 114, Abbreviations and Notations p. 115, About the Author p. 116; the PDF bookmarks carry the same four (14321-15_Ref, -16_Bib, -17_Abbr, -18_About at PDF pp. 119, 122, 123, 124). docs/resource-pages.md section 2.3 item 4 asks for the document's divisions as titled; the page's own ## Sources entry says the References were read. Sibling Exam 7 pages (Meyers, Taylor and McGuire) carry ## References.
- source_rank: 2
- proposed_action: Add the four bare headings, titled as printed, between Appendix E and Errata.
- applied: false
- fingerprint: 8faf0e2875cf

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7raa
- date: 2026-10-11
- status_set: in_review
- checks_run: outline built from the printed contents (PDF pp. 5-6) and bookmarks first; Sections 1-9, Supplementary Materials, Appendix D-E intros read; every bullet checked against its section text (incl. 2.6-3.1% vs 8-13%, 53 residuals, |t|>2, 5.0% P-value, 5/3/0 GLM parameters); formulas 3.5 (as corrected) and 3.7; three errata against the errata sheet; frontmatter (ISBN 978-0-9968897-5-9 electronic, Monograph 4) against PDF pp. 1, 4; syllabus bullet against the outline (A.i.1, A.iii.4-A.iv.1, A.iv.3 = A1, A9-A11, A13; supplementary files pp. 61-62); related reading (Venter, footnote 50 and References)
- note: Every claim on the page checks against the monograph. One minor omission (four back-matter divisions) is open and is fixed in the clean-up round, after which the page is passed again.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rab
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Added the four back-matter divisions as bare headings, titled as printed in the contents p. iv (PDF p. 6): ## References, ## Selected Bibliography, ## Abbreviations and Notations, ## About the Author, between Appendix E and the vault's Errata. Transcription only; resource_lint passes.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rab
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: re-check after the clean-up edit: divisions now match the printed contents and the PDF bookmarks one for one (1-9, Supplementary Materials, Appendices A-E, References, Selected Bibliography, Abbreviations and Notations, About the Author); the rest unchanged since the e7raa pass (every bullet against its section, formulas 3.5 as corrected and 3.7, three errata, frontmatter, syllabus bullet, related reading)
- sources_checked: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide, CAS Monograph 4 (2016), title/copyright pp. (PDF 1-4), contents pp. iii-iv (PDF 5-6) and PDF bookmarks; Sections 1-9 and Supplementary Materials, pp. 1-62 (PDF 9-70); Appendix D-E intros (PDF 112, 116), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Shapland, Monograph 4 Errata, p. 1, sha256:0ed7707772c959ff87c1f424bcd5793af45b149edf3313ed5f157b82eb28efa8 — https://www.casact.org/sites/default/files/2021-02/Errata-ODP-Bootstrap-Monograph_4.pdf; CAS Exam 7 Content Outline, Fall 2026 (v04 2026_9_16), tasks pp. 3-4; text references pp. 5-6, sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: F-001 resolved; clean.
