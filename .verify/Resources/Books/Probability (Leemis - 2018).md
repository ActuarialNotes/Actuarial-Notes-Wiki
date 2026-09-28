---
target: Resources/Books/Probability (Leemis - 2018).md
created: 2026-09-27
---

## [F-001] Section 3.5 title drops the source's parenthetical
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: ## 3 Random Variables, section 3.5
- claim: Page listed section 3.5 as: Inequalities
- evidence: The author's own contents list for the 2nd edition (https://www.math.wm.edu/~leemis/ptext.con, fetched 2026-09-27, sha256:2e8c718840614a51e42de65131bc4f91268a3fbb0402bc0f258c0ebe0118f955) gives: 3.5 Inequalities (Markov, Chebyshev). No fetched page of the book shows the 3.5 heading itself, so that list is the only source for this title; every other section title on the page matches it verbatim.
- source_rank: 3
- proposed_action: Transcribe as: 3.5 Inequalities (Markov, Chebyshev)
- applied: true
- fingerprint: b518858b2abe

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Transcribed in this pass from ptext.con: the bullet now reads 3.5 Inequalities (Markov, Chebyshev). resource_lint clean.

## [F-002] Outline omits the chapters' numbered Exercises sections
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: ## 3 Random Variables and ## 4 Common Discrete Distributions (and likely every chapter)
- claim: Chapter 3 is listed as 3.1-3.5 and Chapter 4 as 4.1-4.7; no chapter lists an Exercises section.
- evidence: The book's own pages, from the author's 2nd-edition sample pages (https://www.math.wm.edu/~leemis/probability/samplepages/): page170.pdf (sha256:60ac8455a94174a6aa8cf04d5a4521ec020b7a8ddacfecd9ab293d994d1a9410) is headed 3.6 Exercises under running head Chapter 3. Random Variables; page242.pdf (sha256:db6f2e1da8a170024f760d8efefa0b0f338d0567df44f56fbf14988e07d6ee93) is headed 4.8 Exercises under Chapter 4. Common Discrete Distributions. The author's contents list ptext.con also omits these sections, which is presumably where the omission came from. The numbers of the Exercises sections in Chapters 1, 2 and 5-8 are not confirmed by any fetched 2nd-edition source. Low consequence: the syllabus assignment is by content section, but a candidate walking the outline cannot see the chapter-end problem sets.
- source_rank: 2
- proposed_action: Add bullets 3.6 Exercises (Ch. 3) and 4.8 Exercises (Ch. 4), and the Exercises section of each other chapter once its number is confirmed against the book.
- applied: false
- fingerprint: d89ef6f699d8

## [F-003] ScholarWorks description source is attached to the first edition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: nit
- status: open
- locus: ## Sources, W&M ScholarWorks entry
- claim: Sources cites the ScholarWorks item as the book's description (the lead's first two sentences) without saying which edition it belongs to.
- evidence: The ScholarWorks record (https://scholarworks.wm.edu/asbookchapters/125/, html sha256:d426dd4fa9348ae742226d1a067345c0597cdcad76e4aa3da98b9d4e633915ec) carries the description the lead paraphrases (calculus-based, secondary emphasis on Monte Carlo simulation, examples from a wide range of fields, covers all Exam P topics), but its attached PDF (sha256:9758dcf6fe8ccbaf1071c40b0d103edc56c7caaa6cf62b4a1b67709537e2c9ce, 36 pp., scanned) is the FIRST edition: its copyright page reads (c) 2011, ISBN 978-0-9829174-0-4, LC call no. QA 273.L44 2011. The lead's claims do hold for the 2nd edition on other sources: the JQT 2021 review of the 2nd edition says its topics align with all of Exam P, and 2nd-edition sample p.129 is a Monte Carlo simulation example in Section 3.3.
- source_rank: 3
- proposed_action: Note in the Sources line that the ScholarWorks record is attached to the 2011 first edition, and cite the JQT review for the Exam P claim.
- applied: false
- fingerprint: 1bb528c3eb0d

## [C-001] Conflicts inside the author's sources (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- locus: outline, Chapters 7-8; frontmatter Year
- note: (1) ptext.con titles Chapter 8 Limit Theorems; the book's own running head on 2nd-ed sample p.542 (page542.pdf sha256:0f6d3c4f84931522e6f39a1daeded8554166d92f014bf96deb971962249260ba) reads Chapter 8. Limiting Distributions. The page follows the book, the higher source, and its Sources line records the difference. (2) The author's Exercises by Section list for the 2nd edition (https://www.math.wm.edu/~leemis/ptext2.exercises, sha256:bd8c162bb4fca79aa15b9b166e96b6de3424c459f8503d39916565d95c266bb7) lists sections 7.1-7.4 and 8.1-8.2 only, contradicting ptext.con (7.1-7.3, 8.1-8.3) and sample pp.489 and 543 (Section 7.2. Transformation Technique, Section 8.3. Central Limit Theorem); the first-edition list (ptext.exercises) uses 7.0-7.3 and 8.2-8.3, so the 2nd-ed list looks shifted by one in Chapters 7-8. Not taken as evidence of a section 7.4. (3) The JQT 2021 review dates the book Lighting Source, 2017, 566 pp.; the syllabus and the author's home page give 2018 and the errata date the first printing October 2017, so Year 2018 stands.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: On-the-syllabus callout diffed both ways vs Nov 2026 syllabus p.7 (Sep 2026 and Jan 2027 identical for this book); outline built from ptext.con and 2nd-ed sample-page headings/running heads before diffing; frontmatter vs syllabus, author home page and review; lead claims vs ScholarWorks description and JQT review; resource_lint
- sources_checked: SOA Probability Exam syllabus, November 2026, REFERENCES pp.5-7, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Lawrence M. Leemis, Probability, Second Edition: contents (author's list), https://www.math.wm.edu/~leemis/ptext.con, sha256:2e8c718840614a51e42de65131bc4f91268a3fbb0402bc0f258c0ebe0118f955; Leemis, Probability 2nd ed., sample pages of the book pp.27, 55-56, 129, 170, 206-207, 211, 242, 257-258, 290-291, 344, 393, 489-490, 542-543, 550, https://www.math.wm.edu/~leemis/probability/samplepages/ (page489.pdf sha256:d38cb3730a6d9d70cef5acdba5c948989f081f33b2e792025a94bb2c72190f28, page542.pdf sha256:0f6d3c4f84931522e6f39a1daeded8554166d92f014bf96deb971962249260ba); Lawrence Leemis home page (W&M), book citation and errata links, https://www.math.wm.edu/~leemis/, sha256:370224d526ef2951ae6427e4aeedc8d6f8e31c1aa1e210be917373525fe887ab; S. Huang, review of Probability (Leemis), Journal of Quality Technology 53(3):332, 2021, https://www.math.wm.edu/~leemis/probability2e-review.pdf, sha256:88c930e079af88b3b1378bd9bbb11c1ffdd831b56e091e7574a53ac2bae4dcc8; Introduction to Probability, W&M ScholarWorks record (description), https://scholarworks.wm.edu/asbookchapters/125/
- note: Book itself not reachable (commercial); outline checked against the author's contents list (rank 3) corroborated by 14 sample pages of the 2nd edition, whose headings and running heads confirm all 8 chapter titles and sections 1.2, 2.3, 3.3, 4.3, 4.4, 5.2, 5.5, 6.5, 7.2, 8.3 (p.489 also confirms order statistics sit in 7.2, as the syllabus assignment assumes). Every ptext.con section is on the page and vice versa; 3.5 title transcribed (F-001). Callout identical to the syllabus; nothing rolls over in Jan 2027. Frontmatter (Probability; Lawrence M. Leemis; Lightning Source; 2018; 2nd; ISBN 978-0-9829174-7-3) matches syllabus and author. Lead: Exam P coverage and 2nd-ed additions (moment-ratio diagrams end of Ch.5, distribution relationship chart end of Ch.8) confirmed by the JQT review. Open: F-002 minor (Exercises sections omitted), F-003 nit. Content beyond the TOC and any back matter unchecked; index starts p.550 per sample page.

## [F-004] Syllabus citation names a past sitting (July 2026)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- severity: minor
- status: open
- locus: ## Sources, SOA syllabus entry
- claim: Sources cites SOA Exam P Syllabus, July 2026 (https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf) for the citation and the assigned chapters and sections.
- evidence: SOA Probability Exam syllabus, November 2026 (7 pp.), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf. p.7 carries the same Leemis citation (Second Edition, 2018, Lightning Source, ISBN 978-0-9829174-7-3) and chapter list as the callout; the July 2026 sitting has passed and its text is identical bar the title (July PDF sha256:d441d15582c7f77a783a012ef25c09f07b9c4bdcf781b8f667b589c59fb1e719, per the Ross and Hogg logs of 2026-09-27).
- source_rank: 1
- proposed_action: Cite the November 2026 syllabus.
- applied: true
- fingerprint: 628b25c515d6

## [F-004/R] Citation moved to the November 2026 syllabus
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-004
- status: resolved
- note: Sources now cites the SOA Exam P Syllabus, November 2026 (p.7: same citation and chapter list as the callout).

## [F-002/R] Confirmed Exercises sections added to the outline
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Added 3.6 Exercises and 4.8 Exercises, each headed so on the book own page (2nd-ed sample pages p.170 sha256:60ac8455a94174a6aa8cf04d5a4521ec020b7a8ddacfecd9ab293d994d1a9410, p.242 sha256:db6f2e1da8a170024f760d8efefa0b0f338d0567df44f56fbf14988e07d6ee93, text re-read this run). The other chapters Exercises sections are not added: the author contents file ptext.con, re-fetched this run (sha256:2e8c718840614a51e42de65131bc4f91268a3fbb0402bc0f258c0ebe0118f955; the server omits its intermediate, so Sectigo published InCommon RSA OV SSL CA 3 from the leaf AIA URL http://crt.sectigo.com/InCommonRSAOVSSLCA3.crt, sha256:9c0f288eaabb71405701020c972f8159446296078d38591c68499b12ce379444, was supplied and the chain verified to the trusted Sectigo root), lists no Exercises section in any chapter, and no fetched 2nd-edition page shows another one number. The Sources lines now say both.

## [F-003/R] ScholarWorks line names the first edition; Exam P claim sourced to the review
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-003
- status: resolved
- note: The ScholarWorks Sources line now says the record is the 2011 first edition (its attached PDF, sha256:9758dcf6fe8ccbaf1071c40b0d103edc56c7caaa6cf62b4a1b67709537e2c9ce, p.2 read from the page image: copyright 2011, ISBN 978-0-9829174-0-4, QA 273.L44 2011). The JQT review line now carries the Exam P claim for the second edition (review p.332, read from the page image: the book selection of topics aligns with all the topics associated with Exam P given by the Society of Actuaries).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-002..F-004: outline re-diffed against re-fetched ptext.con (all 8 chapters and 33 sections) plus the 3.6 and 4.8 Exercises headings on sample pp.170 and 242; callout against Nov 2026 syllabus p.7; Sources lines against ptext.con, the sample pages, the review page image and the ScholarWorks PDF p.2 image; resource_lint
- sources_checked: SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES p.7, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Lawrence M. Leemis, Probability, Second Edition: contents (author list), https://www.math.wm.edu/~leemis/ptext.con, sha256:2e8c718840614a51e42de65131bc4f91268a3fbb0402bc0f258c0ebe0118f955 (fetched 2026-09-28 with the InCommon RSA OV SSL CA 3 intermediate supplied); Leemis, Probability 2nd ed., sample pages of the book pp.27, 55-56, 129, 170, 206-207, 211, 242, 257-258, 290-291, 344, 393, 489-490, 542-543, 550, https://www.math.wm.edu/~leemis/probability/samplepages/ (page170.pdf sha256:60ac8455a94174a6aa8cf04d5a4521ec020b7a8ddacfecd9ab293d994d1a9410, page242.pdf sha256:db6f2e1da8a170024f760d8efefa0b0f338d0567df44f56fbf14988e07d6ee93, page542.pdf sha256:0f6d3c4f84931522e6f39a1daeded8554166d92f014bf96deb971962249260ba); Lawrence Leemis home page (W&M), book citation and errata links, https://www.math.wm.edu/~leemis/, sha256:370224d526ef2951ae6427e4aeedc8d6f8e31c1aa1e210be917373525fe887ab; S. Huang, review of Probability (Leemis), Journal of Quality Technology 53(3):332, 2021, https://www.math.wm.edu/~leemis/probability2e-review.pdf, sha256:88c930e079af88b3b1378bd9bbb11c1ffdd831b56e091e7574a53ac2bae4dcc8; Introduction to Probability, W&M ScholarWorks record (first edition), https://scholarworks.wm.edu/asbookchapters/125/, html sha256:d426dd4fa9348ae742226d1a067345c0597cdcad76e4aa3da98b9d4e633915ec, attached PDF sha256:9758dcf6fe8ccbaf1071c40b0d103edc56c7caaa6cf62b4a1b67709537e2c9ce p.2

## [C-004] Correction to the pass checks line
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- note: The pass above says 33 sections; ptext.con lists 37 (3+6+5+7+5+5+3+3). A mechanical diff of the page against the re-fetched ptext.con finds all 37 on the page with the same numbers and titles, and the page adds only 3.6 Exercises and 4.8 Exercises (confirmed by sample pp.170 and 242).
