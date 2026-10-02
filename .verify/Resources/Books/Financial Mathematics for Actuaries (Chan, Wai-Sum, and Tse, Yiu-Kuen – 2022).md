---
target: Resources/Books/Financial Mathematics for Actuaries (Chan, Wai-Sum, and Tse, Yiu-Kuen – 2022).md
created: 2026-09-28
---

## [F-001] Scope cited to the superseded June 2026 FM syllabus
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: ## Sources, third entry
- claim: The scope source is '[SOA Exam FM Syllabus, June 2026](https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-06-exam-fm-syllabus.pdf)'.
- evidence: The current sitting's syllabus is the December 2026 one (https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39); SOA also issued August and October 2026 syllabi. The June 2026 URL still resolves (HTTP 200, sha256:055ccb5e05a984e8c1397521608e7b3678115df190c76a802c2aedea83bfa03f). The Chan & Tse entry is word-for-word the same in June, August, October and December 2026 (Dec PDF p.7: '(Third Edition) 2022, World Scientific Publishing ISBN: 978-9811243271 (hard cover) or 978-9811245671 (paperback). Chapter 1 / Chapter 2 (excluding 2.4) / … / Chapter 8 (excluding 8.6, 8.7 and 8.8)'). So the callout's scope is still right and no reader is misled. The citation is just out of date.
- source_rank: 1
- proposed_action: Cite the December 2026 syllabus (or the current sitting's) in ## Sources, alongside or in place of June 2026. The scope wording needs no change.
- applied: false
- fingerprint: 6c566afbccba

## [F-002] Outline stops at chapter level; the syllabus's excluded sections are untitled
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: chapter headings ## 1 to ## 8
- claim: Each chapter is a bare heading. The Sources note says 'section titles were not available from any fetched source'.
- evidence: The syllabus (Dec 2026 PDF p.7) scopes this book by section: it excludes 2.4, 3.5, 4.2, 4.5, 5.3, 6.4, 8.6, 8.7 and 8.8. None of those sections is titled anywhere on the page, so a candidate reading it cannot tell what is excluded. This session's attempts to find the section list all failed. The World Scientific book page (https://www.worldscientific.com/worldscibooks/10.1142/12464), its front-matter PDF (doi 10.1142/9789811243288_fmatter, pp. i–xx) and its sample-chapter supplement returned HTTP 403 (Cloudflare) to both curl and WebFetch. The Google Books API returned 429 (quota). The Google Books HTML pages (ids for ISBN 9789811243271 and VoZGEAAAQBAJ) give no contents. The WorldCat search returned 429 and Jisc Library Hub 403. Two sources have no section titles: the Barnes & Noble and AbeBooks pages, and the swisscovery MARC 505 contents note, which is at chapter level only. The one earlier-edition source reached, the author's 2009 slides (mysmu.edu, Ch.1), is not evidence for the 3rd edition, whose publisher says 'the theme structure has been altered'. The page's chapter list itself is complete and correct (see the pass).
- source_rank: 1
- proposed_action: When the World Scientific front matter (Contents, pp. i–xx) can be read, transcribe the section titles under each chapter, at least for the sections the syllabus excludes. This needs authoring from the source, so it is left to a writer pass.
- applied: false
- fingerprint: a5c2d7d0c179

## [C-001] Year: release-date metadata says 2021; syllabus and copyright say 2022
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- locus: frontmatter Year/date
- note: Sources that give 2022: the SOA syllabus (rank 1, Dec 2026 PDF p.7, '(Third Edition) 2022') and the page's Year 2022; both library catalogue records (K10plus and swisscovery MARC 264), which give imprint '[2022]' and copyright '©2022'. Sources that give 2021: World Scientific's Crossref deposit for DOI 10.1142/12464 (published-online 2021-07-12, published-print 2021-10, sha256:74cea9eb…) and Google Books ('Sep 15, 2021', 'World Scientific, 2021'). The higher rank wins, and the copyright year agrees with it. The 2021 dates are the release dates of a book copyrighted 2022, not a different edition year, so this is logged and not treated as a dispute.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: The chapter outline was built from the publisher's Crossref chapter deposit (11 book-chapter records in DOI and page order) before rereading the page. Diffed against the 11 page headings (## 1 to ## 10 plus Appendices): 0 differences in title, order or numbering. The swisscovery 505 contents note, which is independent, gives the same 10 chapter titles in the same order. Omissions: the Crossref deposit also has front matter (i-xx) and back matter (341-345). Neither is a titled division, and nothing else is missing at chapter level. Section-level titles could not be reached (World Scientific returned 403, Google Books API 429, WorldCat 429), so that gap is filed as F-002. Frontmatter checks: title and authors (Wai-Sum Chan and Yiu-Kuen Tse, in that order) against Crossref and MARC 245; publisher World Scientific; edition against Crossref edition-number 3 and MARC 250 'Third edition'; Year 2022 against syllabus p.7 and MARC 264 ©2022 (the Crossref and Google Books 2021 release dates are logged in a comment); ISBN 978-981-12-4327-1 is the syllabus's hardcover ISBN, check digit valid. The paperback 978-981-12-4567-1 is also valid, and the page carries one ISBN as the standard allows. There is no Available from, which is correct for a book for sale. Every clause of the lead traced to the publisher's summary (MARC 520 in both catalogues and Google Books): fundamental concepts, present and future values under different interest rate environments, the SOA FM body of knowledge, examples and exercises adapted from past FM exams, R Laboratory in every chapter except Chapter 9, revised key definitions, altered theme structure. The syllabus callout matches Dec 2026 PDF p.5 ('not a single textbook required') and p.7 word for word (Ch.1; 2 excl. 2.4; 3 excl. 3.5; 4 excl. 4.2 and 4.5; 5 excl. 5.3; 6 excl. 6.4; 7; 8 excl. 8.6, 8.7 and 8.8) and is identical in the Jun, Aug, Oct and Dec 2026 syllabi. Each Sources note checked against what that source actually gives. All three Sources URLs fetched (HTTP 200). One [[link]] resolves, and the cover exists. resource_lint: 0 errors. Confidence is low because no page of the book itself (not even its contents pages) could be read, and the chapter titles rest on publisher metadata and a library contents note.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks (Chan & Tse entry), PDF p.5, 7, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; World Scientific's Crossref deposit for Financial Mathematics for Actuaries, 3rd ed.: chapter records 10.1142/9789811243288_0001–_0011 with titles and page ranges, sha256:8a015cb140eaa779b82f41856ee5800df2af336f25d2ed78a0fc2b5a44b964ee — https://api.crossref.org/works?filter=isbn:9789811243271&rows=40&select=DOI,title,page,type ; book record 10.1142/12464 (authors, edition 3, ISBNs), sha256:74cea9eb5518d3b87a36f73d0a28b98583dfa05e6f69492ebea08c586def22b5 — https://api.crossref.org/works/10.1142/12464; swisscovery (SLSP) catalogue, MARC records for ISBN 9789811243271: 020, 250 'Third edition', 264 '[2022]' / '©2022', 300, 505 chapter contents note, 520 publisher's summary, sha256:95af423bb8fd52d3e2335e6c72f33c55f8fc1799a7a1e0e7713aaa0fa7fb5069 — https://swisscovery.slsp.ch/view/sru/41SLSP_NETWORK?version=1.2&operation=searchRetrieve&recordSchema=marcxml&query=alma.isbn=9789811243271; K10plus catalogue, MARC record for ISBN 9789811243271 (020 hardcover/paperback ISBNs, 250, 264, 300 'xx, 345 Seiten', 520 publisher's summary), sha256:15a11a7c9d80ff71176946f2ec50aa858f923583e77cd5d02c5d30389ce75fe8 — https://sru.k10plus.de/opac-de-627?version=1.1&operation=searchRetrieve&query=pica.isb%3D9789811243271&maximumRecords=5&recordSchema=marcxml

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: The scope source in ## Sources is now '[SOA Exam FM Syllabus, December 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf) — … the assigned chapters and exclusions (p. 7)' (URL HTTP 200; the PDF's sha256 is b4189b65…). The callout was diffed against Dec 2026 p.7 again and is unchanged: Chapter 1; Chapter 2 (excluding 2.4); Chapter 3 (excluding 3.5); Chapter 4 (excluding 4.2 and 4.5); Chapter 5 (excluding 5.3); Chapter 6 (excluding 6.4); Chapter 7; Chapter 8 (excluding 8.6, 8.7 and 8.8), with the same ISBNs (978-9811243271 hard cover, 978-9811245671 paperback).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: wontfix
- note: No citable source for the 3rd edition's section titles could be reached, after a second full pass up the textbook-toc source ladder (2026-09-29). Publisher: worldscientific.com book page 10.1142/12464, front matter 10.1142/9789811243288_fmatter (/doi/pdf and /doi/epdf) — HTTP 403 (Cloudflare) to curl and WebFetch; the Wayback Machine has the book page (snapshot 2022-06-23) but web.archive.org is blocked by this environment's egress policy, and has no capture of the front-matter PDF. Crossref chapter records (e.g. 10.1142/9789811243288_0002): titles and pages only, no abstract; OpenAlex and Semantic Scholar: no abstracts for chapters 1-10. Catalogues: Library of Congress item 2021036685 (the LCCN in the ETH/swisscovery MARC 010) — notes 'Includes index.' only, no contents; swisscovery network and ETH records — MARC 505 at chapter level only (the ten chapter titles, matching the page), 504 'Inhaltstext und Inhaltsverzeichnis' but no link; K10plus — no 856 for the 3rd edition (the 2nd edition has a GBV TOC scan, a different edition); DNB, BnF, SUDOC, LIBRIS — no record; Open Library — no table_of_contents; Syndetics TOC for all four ISBNs — 'No Data Available'; WorldCat (search and record 1263246524) — 429/403; Jisc Library Hub, lobid, NLA, Stanford, Columbia, Michigan, Harvard LibraryCloud — 403, bot walls or 429. Google Books API — 429; Google Books HTML (VoZGEAAAQBAJ) — description and common terms, no contents; Google Play — 403. Retailers: Booktopia, AbeBooks, Barnes & Noble — description only; VitalSource, Kinokuniya, Blackwell's — 403; Perlego lists only the 2nd edition. Author sites: mysmu.edu (connection reset) and SMU's ink repository (502/503). Web searches for the section titles and for World Scientific's 'The following sections are included' chapter abstracts returned nothing for this edition. Reposts (dokumen.pub, Scribd) are not sources. The page keeps its sourced chapter-level outline, its Sources note that section titles were not available, and low confidence; transcribe the section titles from the World Scientific Contents (pp. i-xx) when it can be read.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: low
- checks_run: Re-pass after F-001 (the only byte change: the syllabus entry in ## Sources now cites the December 2026 syllabus, p. 7; URL HTTP 200). Callout diffed against Dec 2026 p.7 word for word: Ch.1; 2 excl. 2.4; 3 excl. 3.5; 4 excl. 4.2 and 4.5; 5 excl. 5.3; 6 excl. 6.4; 7; 8 excl. 8.6, 8.7 and 8.8; ISBNs as printed. Chapter outline diffed mechanically against the re-fetched Crossref deposit (same sha256 as the aa33 pass) and the swisscovery 505: the 10 chapter titles, their order and the Appendices match the 11 page headings exactly. Frontmatter unchanged (Year 2022 per syllabus p.7 and MARC 264 © 2022; ISBN check digit valid; no Available from). F-002 (section titles) closed wontfix after every source on the textbook-toc ladder was tried again (listed in its resolution). Low: no page of the book, not even its contents, could be read; the outline rests on publisher metadata and library records.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks (Chan & Tse entry), PDF p.5, 7, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; World Scientific's Crossref deposit for Financial Mathematics for Actuaries, 3rd ed.: chapter records 10.1142/9789811243288_0001–_0011 with titles and page ranges, re-fetched 2026-09-29, sha256:8a015cb140eaa779b82f41856ee5800df2af336f25d2ed78a0fc2b5a44b964ee — https://api.crossref.org/works?filter=isbn:9789811243271&rows=40&select=DOI,title,page,type; swisscovery (SLSP) catalogue, MARC records for ISBN 9789811243271 (010 LCCN 2021036685, 020, 250 'Third edition', 264 '[2022]' / '© 2022', 505 chapter contents note), fetched 2026-09-29, sha256:031e9406d92ead58740eaedee65d58f46a7cc35757add56993cd25d0f06475f0 — https://swisscovery.slsp.ch/view/sru/41SLSP_NETWORK?version=1.2&operation=searchRetrieve&recordSchema=marcxml&query=alma.isbn=9789811243271; Library of Congress catalog record 2021036685 (title, date 2022, note 'Includes index.'; no contents note), JSON fetched 2026-09-29, sha256:0f5a19e8fbbd6091d2e0845c8c5a8628ad14abb6752d1f890a29832b6e5a89ea — https://www.loc.gov/item/2021036685/?fo=json
- note: Section-level titles remain unavailable; see F-002/R for what was tried.
