---
target: questions/exam-fam/fams-036.md
created: 2026-10-23
---

## [F-001] Transcriber's composed note on the SOA's slip replaced by the (as printed) marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:29Z/aed4
- date: 2026-10-23
- severity: minor
- status: open
- locus: Explanation, E[(X - 10)+] lines and the note beneath
- claim: E[(X - 10)_+]_+ = E(X) - E(X ∧ 10) = 6 - 3.75 - 2.25, followed by a vault-written sentence: 'The third line is as the SOA printed it: it means E[(X - 10)_+] = 6 - 3.75 = 2.25.'
- evidence: FAM-S solutions p.17, Q36: the SOA prints 'E[(X-10)+]+ = E(X) - E(X ∧ 10) = 6 - 3.75 - 2.25' (a stray subscript and '-' for '='). The lines match the page; the sentence after them is not on the page. Replaced by the vault's marker convention: deleting the composed sentence is transcription, and the two slips are marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark the slip in place with ' (as printed)'.
- applied: true
- fingerprint: c3f80d74f866

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
- sources_checked: SOA Exam FAM-S sample questions (June 15, 2026), Q36, p.29, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM-S sample solutions (July 17, 2026), Q36, p.17, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Blind recompute: theta 6: E X 6, E[X ∧ 10] 3.75; LER 0.625 -> B; SOA key B, vault key B. Stem, options and every formula diffed against the rendered booklet page; explanation diffed line by line against the rendered solution page (same method and figures). The SOA's printed slip is now marked '(as printed)'.
