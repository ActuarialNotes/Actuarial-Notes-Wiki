---
target: Exam ILA-101 (SOA).md
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
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf; SOA exam study-materials page, read 2026-10-09: links this syllabus PDF as the current edition
- note: Verified high. Wave 2 mechanical pass (docs/verification-plan.md §5). Concept-link targets were not judged.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (single words with no concept page are no longer linked; chunker trims trailing participles). syllabus_lint fidelity 0 errors; syllabus_write --check clean; every prose, objective and reading line, links stripped, again located in the PDF text fetched earlier today (same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T00:02Z/6b32
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase C alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified on 2026-10-09 (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T08:57Z/4697
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table: variant spellings now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-005] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T09:03Z/80ef
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-check after a link-only regeneration (Phase D alias table, slash-separated phrases such as "legal cases/issues" now point at the concept page they mean). syllabus_lint fidelity 0 errors; syllabus_write --check clean; the page with links stripped is byte-identical to the version verified before it (same source PDF, same sha256).
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.

## [C-006] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-17T22:54Z/ad0b
- date: 2026-10-17
- status_set: verified
- confidence: high
- checks_run: Delta re-check after PR #1629 (commit 3ee3ec5, 'retarget exam links'). Last verified 2026-10-10 at commit 92845495: that version's recorded content_hash recomputes. git diff 92845495..HEAD: 3 line(s) changed, all in Readings/Source Material reading lines; with [[target|display]] reduced to its display text the page is byte-identical to the verified version (only link targets moved). Every new target resolves to an existing Resources/Books page describing the document the citation names, and each target page's On the syllabus callout names this exam. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block; each changed reading line, links stripped, located verbatim in the PDF text. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors. SOA's exam page for this exam, fetched today, links this one syllabus PDF.
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged since the 2026-10-10 verification; only reading-link targets moved, each to the page for the same document. The ILA101-104-25 reading (Ch. 11, pp. 499-512) now links the Atkinson & Dallas book page, whose file name and Code are those of the Ch. 9 reading (ILA101-103-25); the page is the whole book, lists Ch. 11 in its outline and names both readings in its On the syllabus callout, so the link lands on the right document. The Ch. 9-specific file name/Code is a resource-page matter, left for that page's own pass. Concept-link targets were not changed by the delta and were not judged.

## [C-007] Validation pass — verified (delta re-check)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:49Z/a769
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Delta re-check after a link-only re-render (syllabus_write.py: reading links kept as the page chose them, cut-short phrases grown to the page they name, noise links dropped; content plan Phase 3, C17). The verified version is the one at 3a78434d. 4 line(s) changed; with links reduced to their text and *Key concepts:* lines set aside, the page is byte-identical to the verified version. Syllabus PDF re-fetched today: sha256 identical to the page's syllabus block. syllabus_lint fidelity (every topic, weight, objective, outcome and sub-item word for word vs .syllabus JSON): 0 errors; syllabus_write --all --check clean.
- sources_checked: SOA, Nov 2026/Mar 2027/Jul 2027 syllabus PDF for ILA-101, all pages, sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf
- note: Verified high. Words unchanged; only link markup changed. Concept-link targets were not judged.
