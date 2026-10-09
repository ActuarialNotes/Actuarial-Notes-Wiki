---
target: Exam CFE-201 (SOA).md
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
- sources_checked: SOA, Mar 2027/Jul 2027 syllabus PDF for CFE-201, all pages, sha256:512a1a8de09701c25003379b05cc0ee60ed483cfa0f5fae20edf1fac53d637dd — https://www.soa.org/globalassets/assets/files/edu/2026/cfe-201/2026-2027-cfe-201-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Mar 2027/Jul 2027 syllabus PDF for CFE-201, all pages, sha256:512a1a8de09701c25003379b05cc0ee60ed483cfa0f5fae20edf1fac53d637dd — https://www.soa.org/globalassets/assets/files/edu/2026/cfe-201/2026-2027-cfe-201-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.
