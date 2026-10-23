---
target: questions/exam-fam/fams-010.md
created: 2026-10-23
---

## [F-001] SOA's printed slip in the variance line kept without an (as printed) marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- severity: minor
- status: open
- locus: Explanation, sigma^2 line
- claim: sigma^2 = (1/5)(0^2) + (1/5)(25) + ... - 105^2 = 8100, with no note that (1/5)(25) is the SOA's own slip.
- evidence: FAM-S solutions p.5, Q10: the SOA prints '(1/5)(25)' where the second moment needs (1/5)(25^2); with 25^2 the line gives 19,125 - 11,025 = 8,100 as printed, with 25 it would give 7,980. The vault transcribes the slip faithfully (P1) but unmarked, so it reads as a vault error.
- source_rank: 1
- proposed_action: Mark the slip in place with ' (as printed)'.
- applied: true
- fingerprint: af24dce590e3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with ' (as printed)' (Exam 5 convention); no figure, key or method changed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute before reading the key; stem, options and formulas diffed against the rendered booklet page; explanation diffed against the rendered SOA solution; answer key vs SOA key; wiki_link and topic targets exist; validate_content
- sources_checked: SOA Exam FAM-S sample questions (June 15, 2026), Q10, p.9, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S sample solutions (July 17, 2026), Q10, p.5, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Blind recompute: aggregate distribution: E S 105, E S^2 19,125, Var 8,100 -> B; SOA key B, vault key B. Stem, options and every formula diffed against the rendered booklet page; explanation diffed line by line against the rendered solution page (same method and figures). The SOA's printed slip is now marked '(as printed)'.
