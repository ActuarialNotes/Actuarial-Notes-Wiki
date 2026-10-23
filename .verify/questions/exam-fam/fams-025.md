---
target: questions/exam-fam/fams-025.md
created: 2026-10-23
---

## [F-001] SOA's printed 0.01353 (for 0.1353) kept without an (as printed) marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- severity: minor
- status: open
- locus: Explanation, E(S ∧ 2) line
- claim: 0(0.1353) + 1(0.0902) + 2(1 - 0.01353 - 0.0902) = 1.6392
- evidence: FAM-S solutions p.13, Q25: the SOA prints '2(1 - 0.01353 - 0.0902)'; f_S(0) = e^-2 = 0.1353 two lines above, and 1.6392 follows only from 0.1353 (0.0902 + 2(0.7745)). Transcribed faithfully but unmarked.
- source_rank: 1
- proposed_action: Mark the slip in place with ' (as printed)'.
- applied: true
- fingerprint: 00c765a137ee

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
- sources_checked: SOA Exam FAM-S sample questions (June 15, 2026), Q25, p.21, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S sample solutions (July 17, 2026), Q25, p.13, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Blind recompute: E S 4; E[S ∧ 2] = 0.0902 + 2(0.7745) = 1.639; 2.361 -> B; SOA key B, vault key B. Stem, options and every formula diffed against the rendered booklet page; explanation diffed line by line against the rendered solution page (same method and figures). The SOA's printed slip is now marked '(as printed)'.
