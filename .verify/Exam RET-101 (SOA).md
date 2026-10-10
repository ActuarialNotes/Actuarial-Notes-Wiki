---
target: Exam RET-101 (SOA).md
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
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for RET-101, all pages, sha256:d33bc465548ca0595f8f716f3bcd30ef23c54843c4ed46a6d01ba46c67d10bc6 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for RET-101, all pages, sha256:d33bc465548ca0595f8f716f3bcd30ef23c54843c4ed46a6d01ba46c67d10bc6 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T00:02Z/6b32
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase C alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified on 2026-10-09 (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for RET-101, all pages, sha256:d33bc465548ca0595f8f716f3bcd30ef23c54843c4ed46a6d01ba46c67d10bc6 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-101/2026-2027-ret-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.
