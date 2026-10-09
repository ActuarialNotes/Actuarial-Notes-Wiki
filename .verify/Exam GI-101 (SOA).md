---
target: Exam GI-101 (SOA).md
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
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for GI-101, all pages, sha256:deff8d9676e026ae827058576884bedf8a89f8c05d6edaeff432713d147efd48 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-101/2026-2027-gi-101-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for GI-101, all pages, sha256:deff8d9676e026ae827058576884bedf8a89f8c05d6edaeff432713d147efd48 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-101/2026-2027-gi-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.
