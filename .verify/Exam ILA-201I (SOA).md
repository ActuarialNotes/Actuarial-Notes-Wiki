---
target: Exam ILA-201I (SOA).md
created: 2026-10-09
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-fetched the PDF 2026-10-09: sha256 identical to the page's syllabus block. Topic titles, weights, objectives, outcomes and bullets: syllabus_lint fidelity (word for word vs extracted JSON) 0 errors; syllabus_write --check: page = render of JSON. Independently, every prose, objective and reading line on the page (links stripped, punctuation-normalised) located in the PDF text layer; the only lines not found are the app-composed 'Outcomes …' sub-bullets and the PDF's own two-column table (PA's ISLR edition table, matched cell by cell). Sitting: soa.org's study page links this exact PDF.
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-201I, all pages, sha256:3721debc55d50ac6297f07f9b9d906da5aa31f56b8a37a9ac4ff74bf257fcdf3 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-201I, all pages, sha256:3721debc55d50ac6297f07f9b9d906da5aa31f56b8a37a9ac4ff74bf257fcdf3 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T00:02Z/6b32
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase C alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified on 2026-10-09 (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-201I, all pages, sha256:3721debc55d50ac6297f07f9b9d906da5aa31f56b8a37a9ac4ff74bf257fcdf3 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T08:57Z/4697
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-201I, all pages, sha256:3721debc55d50ac6297f07f9b9d906da5aa31f56b8a37a9ac4ff74bf257fcdf3 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-005] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T22:54Z/ad0b
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Delta re-check after PR #1629 (commit 3ee3ec5, 'retarget exam links'). Last verified 2026-10-10 at commit 2c83a177: that version's recorded content_hash recomputes. git diff 2c83a177..HEAD: 6 line(s) changed, all in Readings/Source Material reading lines; with [[target|display]] reduced to its display text the page is byte-identical to the verified version (only link targets moved). Every new target resolves to an existing Resources/Books page describing the document the citation names, and each target page's On the syllabus callout names this exam. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block; each changed reading line, links stripped, located verbatim in the PDF text. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors. SOA's exam page for this exam, fetched today, links this one syllabus PDF.
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-201I, all pages, sha256:3721debc55d50ac6297f07f9b9d906da5aa31f56b8a37a9ac4ff74bf257fcdf3 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf
- note: Verified high. Words unchanged since the 2026-10-10 verification; only reading-link targets moved, each to the page for the same document. E-15 now links 'OSFI AA', the Aug 31, 2023 guideline the reading cites (OSFI titles it '…Qualifications and Peer Review'; the page notes the SOA's 'External Review' wording). Concept-link targets were not changed by the delta and were not judged.
