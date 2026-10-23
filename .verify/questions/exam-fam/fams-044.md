---
target: questions/exam-fam/fams-044.md
created: 2026-10-23
---

## [F-001] SOA's printed stray (0.4) in the yachts' variance kept without an (as printed) marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- severity: minor
- status: open
- locus: Explanation, luxury yachts Var(S) line
- claim: Var(S) = 50(0.6)(0.4)(2,000,000) + 50(0.6)(0.4)(5,000^2) = 360,000,000
- evidence: FAM-S solutions p.20, Q44: the SOA prints '50(0.6)(0.4)(2,000,000)'; the first term is n q Var = 50(0.6)(2,000,000) = 60,000,000, and 60M + 300M = 360,000,000 as printed (with (0.4) it would be 324,000,000). Transcribed faithfully but unmarked.
- source_rank: 1
- proposed_action: Mark the slip in place with ' (as printed)'.
- applied: true
- fingerprint: bfcb94fb90d5

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
- sources_checked: SOA Exam FAM-S sample questions (June 15, 2026), Q44, p.36, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S sample solutions (July 17, 2026), Q44, p.20, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Blind recompute: means 9,000 + 30,000 + 150,000; variances 2.19M + 39M + 360M; 189,000 + 20,030 -> B; SOA key B, vault key B. Stem, options and every formula diffed against the rendered booklet page; explanation diffed line by line against the rendered solution page (same method and figures). The SOA's printed slip is now marked '(as printed)'.
