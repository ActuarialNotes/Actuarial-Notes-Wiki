---
target: Exam CP-312 (SOA).md
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
- claim: Economic Scenario Generators reading: outcome codes '2a. 2b' had been spliced into the citation's chapter list
- evidence: SOA syllabus PDF text (sha256:7c62bff559da90773de77ad707816992f3d41dd083df0e96d78aa8b67d34e757) prints the two as separate cells/paragraphs; .syllabus JSON carried the merge
- proposed_action: Fix scripts/syllabus_extract.py (CODES_RE, outcome lead-in), re-extract and regenerate the page
- applied: true
- fingerprint: 2ecf3a5e4799

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-fetched the PDF 2026-10-09: sha256 identical to the page's syllabus block. Topic titles, weights, objectives, outcomes and bullets: syllabus_lint fidelity (word for word vs extracted JSON) 0 errors; syllabus_write --check: page = render of JSON. Independently, every prose, objective and reading line on the page (links stripped, punctuation-normalised) located in the PDF text layer; the only lines not found are the app-composed 'Outcomes …' sub-bullets and the PDF's own two-column table (PA's ISLR edition table, matched cell by cell). Sitting: soa.org's study page links this exact PDF.
- sources_checked: SOA, Nov 2026/Mar 2027 syllabus PDF for CP-312, all pages, sha256:7c62bff559da90773de77ad707816992f3d41dd083df0e96d78aa8b67d34e757 — https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.
