---
target: Exam FAM (SOA).md
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
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T00:02Z/6b32
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase C alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified on 2026-10-09 (same source PDF, same sha256).
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T08:57Z/4697
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-005] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:49Z/a769
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Delta re-check after a link-only re-render (syllabus_write.py: reading links kept as the page chose them, cut-short phrases grown to the page they name, noise links dropped; content plan Phase 3, C17). The verified version is the one at 3a78434d. 29 line(s) changed; with links reduced to their text and *Key concepts:* lines set aside, the page is byte-identical to the verified version. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors; syllabus_write --all --check clean.
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-006] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:54Z/4220
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Delta re-check after a link-only re-render (syllabus_write.py: catch-all links retargeted — mortality probabilities to Mortality, future lifetime distributions to Survival Model, preparing data to Data Preparation, internal consistency to Data Validation — and "state" read as a noun inside "multiple state models"; content plan Phase 3, C17). Last verified at HEAD 5ba410c2. 3 line(s) changed; with links reduced to their text and *Key concepts:* lines set aside, the page is byte-identical to the verified version. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors; syllabus_write --all --check clean.
- sources_checked: SOA, October 2026 syllabus PDF for FAM, all pages, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-007] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:05Z/d6a7
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Fetched the February 2027 FAM syllabus (sha256 da98474b…, a new document vs the page's October 2026 one, 90172025…). Ran syllabus_extract.extract() on it into a scratch dir (not .syllabus/) and diffed the JSON against the committed .syllabus/fam-1/syllabus.json: the only differing fields are sitting (October 2026 -> February 2027), source_url, source_sha256 and extracted_at; title, intro, every topic, weight range, objective, outcome, sub-item and every reading with its chapter scope are identical. syllabus_lint on the page: 0 errors (fidelity to the committed JSON holds, so the page matches the February 2027 text word for word).
- sources_checked: SOA, February 2027 syllabus PDF for FAM, all pages, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf; SOA FAM exam study page (https://www.soa.org/education/exam-req/edu-exam-fam/study/), read 2026-10-31: lists the October 2026 and February 2027 syllabi
- note: Verified high against the February 2027 syllabus, the next sitting a candidate can sit (the October 2026 FAM window closed 2026-10-29). Page not regenerated, per instruction: its syllabus: block and the pipeline's SOURCES / examPdfLinks.ts still name the October 2026 PDF; a re-extract + re-render for the new sitting would update only that metadata.
