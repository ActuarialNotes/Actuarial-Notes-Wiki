---
target: Exam RET-201 (SOA).md
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
- claim: Topic 2: the outcomes' lead-in ('Given a context, … the Candidate will be able to:') had been run into the learning objective with no break
- evidence: SOA syllabus PDF text (sha256:794f48819c369ead198520af360c23a721ebf0edda1e0fc9d8c1e5542da0cc44) prints the two as separate cells/paragraphs; .syllabus JSON carried the merge
- proposed_action: Fix scripts/syllabus_extract.py (CODES_RE, outcome lead-in), re-extract and regenerate the page
- applied: true
- fingerprint: 6c38a52fd490

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-fetched the PDF 2026-10-09: sha256 identical to the page's syllabus block. Topic titles, weights, objectives, outcomes and bullets: syllabus_lint fidelity (word for word vs extracted JSON) 0 errors; syllabus_write --check: page = render of JSON. Independently, every prose, objective and reading line on the page (links stripped, punctuation-normalised) located in the PDF text layer; the only lines not found are the app-composed 'Outcomes …' sub-bullets and the PDF's own two-column table (PA's ISLR edition table, matched cell by cell). Sitting: soa.org's study page links this exact PDF.
- sources_checked: SOA, Mar 2027/Jul 2027 syllabus PDF for RET-201, all pages, sha256:794f48819c369ead198520af360c23a721ebf0edda1e0fc9d8c1e5542da0cc44 — https://www.soa.org/globalassets/assets/files/edu/2026/ret-201/2026-2027-ret-201-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.
