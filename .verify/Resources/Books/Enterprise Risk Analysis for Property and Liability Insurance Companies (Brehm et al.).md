---
target: Resources/Books/Enterprise Risk Analysis for Property and Liability Insurance Companies (Brehm et al.).md
created: 2026-10-18
---

## [F-001] Topic name differs from the announcement it cites
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: nit
- status: open
- locus: lead paragraph, and the Business Insurance entry under ## Sources
- claim: Lists 'reinsurance recovery risk' among the further topics the manual covers.
- evidence: Business Insurance (15 Apr 2007), the source the page cites for the topic list, says the book covers 'models for reinsurance recoverables risk'. Both occurrences changed to 'reinsurance recoverables risk' to match.
- source_rank: 3
- proposed_action: Use the announcement's term, 'reinsurance recoverables risk'.
- applied: true
- fingerprint: d98274b448a8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Both occurrences now read 'reinsurance recoverables risk', as the cited announcement does.

## [C-001] Leads for a maintainer: the publisher's old contents page; a page-count conflict between sources
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- note: (1) The Society of Actuaries in Ireland record links to http://ermbook.guycarp.com/portal/books/contents.html?vid=1, which looks like the publisher's own online contents page for the book. The host no longer resolves (DNS failure, 2026-10-18), and web.archive.org reset every connection from this session, so it was not read. If an archived copy of that site carries the table of contents, or the text Guy Carpenter itself put online, it could supply the outline this page lacks and unblock the Exam 9 Domain D concept pages. (2) The sources disagree on length: Google Books says 291 pages, the SAI record says 273. The page attributes 273 to SAI, which is accurate, and states no length of its own. This is a conflict between sources, not a vault error. (3) The outline's reference table lists Brehm et al. against D1-D6, though Domain D has seven tasks. No reading is listed for D7, 'Assess effectiveness of risk mitigation strategies'. The page's 'objectives D1-D6' matches the outline.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: frontmatter (title, subtitle, authors and their order, publisher, year, ISBN-13) against the Google Books record and the outline's citation; syllabus callout (tasks D1-D6, chapters and exclusions, Study Kit) against outline pp.6-8; lead's topics and readers against the Business Insurance announcement; each ## Sources attribution against the source it names; resource_lint 0 errors; searched for an authorized copy and a published table of contents
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Google Books catalogue record, Enterprise Risk Analysis for Property & Liability Insurance Companies: A Practical Guide to Standard Models and Emerging Solutions (Guy Carpenter & Company, 2007; ISBN 0615133568, 9780615133560; 291 pages), sha256:0840d6dfaa10a557e53e954a860c7e23774218b2fbabaa15ff9efe5886e31e61 — https://books.google.com/books/about/Enterprise_Risk_Analysis_for_Property_Li.html?id=skTOGAAACAAJ; Business Insurance, 'Guy Carpenter publishes manual on ERM practices' (15 Apr 2007): intended readers and topics, sha256:398e6cfbed9a65f315fad1671cc3cc2fd877e7cc705df32e27653b61c62f6a37 — https://www.businessinsurance.com/guy-carpenter-publishes-manual-on-erm-practices/; Society of Actuaries in Ireland ERM resource database record: nine authors, 273 pages, sha256:92c53c87e45b5f874412925f44762a6ed6a35fdee70868fb7398dad96b205b4a — https://web.actuaries.ie/press/erm-resource-database/enterprise-risk-analysis-property-liability-insurance-companies
- note: The page claims only what the outline and the three catalogue/press records say, and all of it was checked against them this session. Medium, not high: the book itself is commercial (study kit only) and was not read, so the 'Contents unavailable' note stands in for an outline that could not be built. See C-001 for the ermbook.guycarp.com lead.

## [C-003] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.
