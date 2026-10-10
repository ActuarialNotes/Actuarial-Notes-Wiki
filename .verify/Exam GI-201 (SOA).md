---
target: Exam GI-201 (SOA).md
created: 2026-10-09
---

## [F-001] Reading/objective text mangled by the syllabus extractor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: Learning Objectives / Source Material
- claim: IAA Risk Book: Reinsurance (section 9) reading: outcome codes '6a, c-d, f' had been spliced into the citation
- evidence: SOA syllabus PDF text (sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9) prints the two as separate cells/paragraphs; .syllabus JSON carried the merge
- proposed_action: Fix scripts/syllabus_extract.py (CODES_RE, outcome lead-in), re-extract and regenerate the page
- applied: true
- fingerprint: 616fdb70347f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-fetched the PDF 2026-10-09: sha256 identical to the page's syllabus block. Topic titles, weights, objectives, outcomes and bullets: syllabus_lint fidelity (word for word vs extracted JSON) 0 errors; syllabus_write --check: page = render of JSON. Independently, every prose, objective and reading line on the page (links stripped, punctuation-normalised) located in the PDF text layer; the only lines not found are the app-composed 'Outcomes …' sub-bullets and the PDF's own two-column table (PA's ISLR edition table, matched cell by cell). Sitting: soa.org's study page links this exact PDF.
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for GI-201, all pages, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for GI-201, all pages, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T00:02Z/6b32
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase C alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified on 2026-10-09 (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for GI-201, all pages, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T08:57Z/4697
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for GI-201, all pages, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T09:03Z/80ef
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table, slash-separated phrases such as "legal cases/issues" now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for GI-201, all pages, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.
