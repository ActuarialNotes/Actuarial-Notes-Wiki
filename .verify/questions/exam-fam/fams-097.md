---
target: questions/exam-fam/fams-097.md
created: 2026-10-23
---

## [F-001] SOA typo 'Borhuetter' kept without the as-printed marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, first sentence
- claim: 'First, use the Borhuetter-Ferguson method…', unmarked.
- evidence: SOA FAM-S sample solutions p.38, Q97, prints 'Borhuetter-Ferguson'. Kept as printed; marker added.
- source_rank: 1
- proposed_action: Mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: fa93dd7a7738

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: '(as printed)' marker added in this run; the explanation now reads as the SOA printed it, marked.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before the key; stem, every formula, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q97, p.79, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q97, p.38, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem, formulas, tables and options match booklet p.79; explanation matches the SOA solution p.38 in method and figures, arithmetic resolves; answer equals the SOA key. Recompute: U=47,387/(1-1/1.08)=639,724.5; ELR IBNR 209,672.5, CL IBNR 34,404.2; difference 175,268 (E). SOA's 'Borhuetter' marked '(as printed)' (F-001).
