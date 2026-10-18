---
target: Exam ATPA (SOA).md
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
- sources_checked: SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:49Z/a769
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Delta re-check after a link-only re-render (syllabus_write.py: reading links kept as the page chose them, cut-short phrases grown to the page they name, noise links dropped; content plan Phase 3, C17). The verified version is the one at 3a78434d. 32 line(s) changed; with links reduced to their text and *Key concepts:* lines set aside, the page is byte-identical to the verified version. 5 `*Key concepts:*` line(s) added — editorial links to existing concept pages for objectives whose own words name no concept; they carry no syllabus text and fidelity ignores them. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors; syllabus_write --all --check clean.
- sources_checked: SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-004] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:54Z/4220
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Delta re-check after a link-only re-render (syllabus_write.py: catch-all links retargeted — mortality probabilities to Mortality, future lifetime distributions to Survival Model, preparing data to Data Preparation, internal consistency to Data Validation — and "state" read as a noun inside "multiple state models"; content plan Phase 3, C17). Last verified at HEAD 5ba410c2. 2 line(s) changed; with links reduced to their text and *Key concepts:* lines set aside, the page is byte-identical to the verified version. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors; syllabus_write --all --check clean.
- sources_checked: SOA, current syllabus PDF for ATPA, all pages, sha256:16d5e74841e90fdb61402248cb585dc8d7a3ceedbf678341478145a9e2fb4410 — https://www.soa.org/globalassets/assets/files/edu/2022/2022-01-atpa-learning-objectives.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.
