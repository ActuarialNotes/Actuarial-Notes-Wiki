---
target: Resources/Books/Mathematics of Investment and Credit (Broverman, S.A. – 2024).md
created: 2026-09-28
---

## [F-001] Year 2024 differs from the book's own copyright date (2023)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: frontmatter, Year / date
- claim: Year: "2024" and date: "2024" — the year the SOA syllabus cites for the 8th edition.
- evidence: The publisher's 8th-edition sample (sha256:1560f9e2…, PDF p.4, copyright page) reads 'Copyright © 2023 ACTEX Learning, a division of ArchiMedia Advantage Inc. … ISBN: 978-1-64756-616-6'; the Preface (PDF p.14, p.xiv) is signed 'University of Toronto, May 2023'; the sample PDF was created 2023-05-19; AbeBooks' record for the printed 8th edition (ISBN 979-8-89016-016-4) gives 2023. The SOA December 2026 FM syllabus (PDF p.6, image-checked) cites 'Mathematics of Investment and Credit (Eighth Edition), 2024'. docs/resource-pages.md §2.1 takes Year from the title/copyright page. The page's own ## Sources entry already labels the sample '(ACTEX Learning, 2023)' and '© 2023', so the page states both years. This is a conflict between the SOA's citation (rank 1) and the book's imprint (rank 2) over a bibliographic field, so it is logged and not fixed.
- source_rank: 2
- proposed_action: Maintainer's call: either set Year/date to 2023 (the copyright page, per resource-pages §2.1) and let the SOA's '2024' stand only as the syllabus's citation, or keep 2024 and state in ## Sources that the SOA cites 2024 for a book copyrighted 2023. The filename (… – 2024) is a link target and should not change.
- applied: false
- fingerprint: 4f58b783b9c5

## [C-001] Source conflict: the syllabus's ISBN for the 8th edition fails its check digit
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- locus: frontmatter, ISBN
- note: SOA Dec 2026 FM syllabus p.6 (image-checked) prints ISBN 978-1-74756-616-6 for the 8th edition. Its ISBN-13 check digit computes to 5, not the printed 6, so it is not a valid ISBN — evidently a typo for ACTEX's 978-1-64756 prefix. The page's ISBN 978-1-64756-616-6 has a valid check digit and is the one printed on the book's copyright page (ACTEX sample PDF p.4, sha256:1560f9e2…). ACTEX's product page now sells the 8th edition under 979-8-89016-016-4 (printed) plus four digital/bundle ISBNs, and none of them is 978-1-64756-616-6; the page's ## Sources already records the printed one. The page is left as it is. The conflict is logged here so that no one 'corrects' the page to the syllabus's value.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Outline built from the source first: the printed Table of Contents (sample PDF pp.5–12) and the PDF bookmark outline (228 entries) were extracted, then the page's Preface, chapters 1–10, Answers, Bibliography, Websites and Index were diffed against them mechanically. Every section number (1.0–10.14, 205 numbered entries) and every title is identical after case normalisation. The only differences are three source glitches, which the page renders cleanly: the LaTeX garble in the bookmark for 2.1.2.3, 'MBS)T]Mortgage-backed Securities' in both the TOC and the bookmarks for 4.4.3.3, and a missing space in the bookmark for 7.3.1. Apart from those the TOC and the bookmarks agree, so there is no conflict inside the source. No division is omitted and none is misattributed. The lead was checked sentence by sentence against the Preface (PDF pp.13–14) and ACTEX's description. The syllabus callout was diffed word for word against the SOA Dec 2026 syllabus p.6 (image): all seven chapter exclusions and the 7th-edition allowance match. The textbook block is identical in the June, Aug, Oct and Dec 2026 syllabi, and the page cites June 2026. Spot-check of the 7th edition's sample TOC (actexmadriver, sha256:dc3b414f06d6a9c6fa3f6656aab4a4c65d3d130d92e96a317cdabd1e12976a15): the excluded section numbers carry the same titles, which supports 'same sections'. Frontmatter: Title, Authors, Publisher and Edition per the title page (PDF pp.1, 3); ISBN per the copyright page (check digit valid; see comment); Year, see F-001. There is no Available from (the book is sold) and every Sources URL was fetched (HTTP 200). resource_lint: 0 errors. Wiki-links resolve and the cover exists. Capped at medium because it is a commercial text and only its sample pages were readable.
- sources_checked: Broverman, Mathematics of Investment & Credit, 8th ed. (ACTEX Learning, © 2023) — publisher's sample: title page PDF pp.1,3; copyright page PDF p.4; Table of Contents pp.v–xii (PDF pp.5–12) and PDF bookmark outline; Preface pp.xiii–xiv (PDF pp.13–14), sha256:1560f9e2bbcabe090d090abfea1e8e82a93ca4c7ff289e73b4180e30ab4d3eee — https://www.actexlearning.com/samples/MIC_8th_edition_051923_SAMPLE.pdf; ACTEX Learning, Mathematics of Investment & Credit 8th Edition product page (retrieved 2026-09-28): description and ISBN list, sha256:d4df654c574bdddcfe206a011dffad044b94693bd268c8948307c4feb6f8a715 — https://www.actexlearning.com/exams/fm/mathematics-of-investment-and-credit; SOA Financial Mathematics Exam syllabus, December 2026, Text References / Suggested Textbooks, PDF p.6 (page image read), sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [C-003] Count in C-002 corrected
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- locus: C-002 checks_run
- note: C-002 gives the diffed entries as '205 numbered entries'; the actual count is 213 dotted section numbers (1.0 to 10.14) plus the 10 chapter numbers. All of them are identical between the page and the printed TOC. The count was wrong; the outcome is unchanged.
