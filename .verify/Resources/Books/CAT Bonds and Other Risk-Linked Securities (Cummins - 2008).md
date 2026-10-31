---
target: Resources/Books/CAT Bonds and Other Risk-Linked Securities (Cummins - 2008).md
created: 2026-10-18
---

## [F-001] Contents-unavailable callout and Sources line overstate what is unpublished
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:12Z/770a
- date: 2026-10-18
- severity: minor
- status: open
- locus: [!note] Contents unavailable callout; first Sources entry
- claim: The callout says 'No free copy of this article is published'; the CAS record's Sources line says 'the article itself is not linked from this record'.
- evidence: Unpaywall and OpenAlex (queried this run for DOI 10.1111/j.1540-6296.2008.00127.x) list a green open-access location, SSRN 10.2139/ssrn.1057401 (author-posted, 2007), so a free version exists even though the published article is paywalled and the page's own Sources entry already notes a November 2007 SSRN working paper. The CAS abstract record (sha256:1a19cd53f68a92057a96808b59ed985d25297eafe958c245d3bc2635a57a0218) prints 'Link https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6296.2008.00127.x' — it links the publisher's (paywalled) landing page, though not a free text.
- source_rank: 3
- proposed_action: Restate the callout to say the published article is paywalled and supplied in the study kit, and that an earlier author-posted working-paper version is on SSRN (not read); say the CAS record links the publisher's paywalled page. Read the SSRN version from a network SSRN does not block and record whether its sections match the published article.
- applied: false
- fingerprint: c370f8eed60b

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:12Z/770a
- date: 2026-10-18
- status_set: in_review
- checks_run: Citation (title, J. David Cummins, RMIR vol. 11 no. 1 March 2008 pp.23-47, American Risk and Insurance Association) against the Fall 2026 outline p.7, the CAS record and RePEc/IDEAS; lead against the abstract (reviews the CAT bond / risk-linked securities market; financing mega-catastrophes; access capital markets directly; record risk capital 2005-2007) — matches; syllabus callout (C7 wording, 'Cummins CAT Bond', SK) against the outline pp.5,7 — matches; resource_lint 0 errors.
- note: Left in_review for the minor finding on the callout. Cummins (2008) full text unreachable: Wiley is paywalled (403), the author-posted SSRN version (10.2139/ssrn.1057401, which Unpaywall lists) is blocked to this session ('Content Blocked'), the OECD and CiteSeerX copies refused (403/503); only the abstract was read. Sources read: CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.3,5,7: tasks A4-A5 and C7, readings table (Grossi & Kunreuther Ch.2-6 incl. Section 2.4 errata, Book; Cummins CAT Bond, RMIR 11(1) pp.23-47, SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS abstract record for Cummins (2008): title, abstract, vol. 11 no. 1 pp.23-47, and a link to the Wiley landing page, sha256:1a19cd53f68a92057a96808b59ed985d25297eafe958c245d3bc2635a57a0218 — https://www.casact.org/abstract/cat-bonds-and-other-risk-linked-securities-state-market-and-recent-developments; Cummins (2008), RMIR 11(1) pp.23-47 — the article's abstract as RePEc/IDEAS prints it (complement not replace reinsurance; premia relative to expected loss down by more than a third since 2001; priced competitively with reinsurance and corporate bonds; risk swaps, ILWs and sidecars), sha256:5b9805468a50c813ddb1139dc73dcfbd5c35d93d8eec70979809e45130bca1da — https://ideas.repec.org/a/bla/rmgtin/v11y2008i1p23-47.html

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:26Z/69a5
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied the proposed restatement: the callout now says the published article is paywalled and supplied in the study kit, that the CAS record links only the publisher's paywalled page, and that an earlier author-posted working-paper version is on SSRN and was not read; the Sources entry now says the record links the publisher's paywalled page, not a free text (the CAS record prints one link, to onlinelibrary.wiley.com/doi/10.1111/j.1540-6296.2008.00127.x). SSRN 1057401 tried again this run: Delivery.cfm returned 403.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:26Z/69a5
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: title, author, journal, volume 11, number 1, pages 23-47, year 2008 against the CAS record and Crossref; March 2008 print date (Crossref published-print 2008-03); lead against the CAS record's abstract (reviews the CAT bond and risk-linked securities market; financing mega-catastrophes; access capital markets directly; record risk capital 2005-2007); syllabus callout (C7 wording, Cummins CAT Bond, SK) against outline pp.5, 7; the outline's title variant 'CAT Bond' noted on the page; callout restated (F-001); resource_lint 0 errors
- sources_checked: CAS abstract record, Cummins (2008), CAT Bonds and Other Risk-Linked Securities, title, abstract, Volume 11, Number 1, Page 23-47, Year 2008, and its one link, to the Wiley landing page, sha256:c04f8cbb75ec7638745bebac34893c0f6f2e83ae90c4017aa343b2841b4b8357 — https://www.casact.org/abstract/cat-bonds-and-other-risk-linked-securities-state-market-and-recent-developments; Crossref metadata for DOI 10.1111/j.1540-6296.2008.00127.x: title 'CAT Bonds and Other Risk-Linked Securities: State of the Market and Recent Developments', J. David Cummins, Risk Management and Insurance Review 11(1) pp.23-47, published-print 2008-03 — https://api.crossref.org/works/10.1111/j.1540-6296.2008.00127.x; CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), pp.3-7: Domains B-D tasks and readings; text references (Brehm et al. D1-D6, source SK; Coval, Jurek, and Stafford C5-C6, SK; Cummins CAT Bond C7, RMIR 11(1) pp.23-47, SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Verified at medium (D22) against outline, CAS record and abstract, and the Crossref record; the article's text (paywalled; SSRN 1057401 403 this session) was not read, and the page states nothing about its contents beyond the abstract.
