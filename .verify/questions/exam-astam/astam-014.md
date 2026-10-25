---
target: questions/exam-astam/astam-014.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation
- claim: Explanation writes the mixture as X_1 = beta Y_1 + (1 - beta) Y_2 with no marker.
- evidence: SOA ASTAM sample solutions p.27 prints "X1 = beta Y1 + (1 - beta) Y2" for a two-point mixture of exponentials; as a random variable that expression is a weighted sum, not the mixture whose density is f_1. The mean computed from it (800) is the same either way. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 941979a87a25

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] Transcriber corrected an SOA slip (missing equals sign) without marking it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation, F_X2(500) line
- claim: Vault reads "F_{X_2}(500) = k(1 - e^{-1}) = F_{X_1}(500) = 0.6(1 - e^{-0.5}) + ..." with an equals sign after F_{X_1}(500).
- evidence: SOA ASTAM sample solutions p.28 prints "F_X2(500) = k(1 - e^-1) = F_X1(500)0.6(1 - e^-0.5) + 0.4(1 - e^-1) = 0.48893" with no equals sign between F_X1(500) and 0.6. The vault silently supplied it. Value checked: 0.6(0.393469) + 0.4(0.632121) = 0.48893.
- source_rank: 1
- proposed_action: Restore the line as printed with an "(as printed)" marker (P1: transcribe, do not correct).
- applied: true
- fingerprint: 85032aeee82f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Restored as printed ("F_{X_1}(500)0.6(...)") and marked "(as printed)" in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q14, p.19, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q14, pp.27-28, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: beta 0.6; e(200) = 823.45 (SOA 823.46 from its rounded 0.49124/0.26813, which the solutions' preface allows); VaR90(X1) 1,888; k 0.77348, c 0.99818; VaR90(X2) 2,306.3. Agree. Stem matches p.19; solutions pp.27-28. One SOA slip (mixture written as a weighted sum) marked; a missing '=' the transcriber had silently supplied in (d) restored as printed and marked.

## [F-003] Question points not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gave points: 6, its number of parts, as if the SOA printed a point value.
- evidence: SOA ASTAM Sample Questions (version of Feb. 23, 2026), sha256:0294cf4e8717…: 'point' occurs nowhere in the 31-page text layer (no OCR or image pages), and Q14 on p.19 carries no '(N points)' heading or per-part value (p.12, Q7, page image read); the solutions PDF (47 pages, sha256:c4206394603c…) has no 'points' either. The 6 equals the file's 6 parts, a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer's decision: set points: 0, which the app reads as 'no point value printed' and times or sizes by the paper's pace.
- applied: true
- fingerprint: 5c6c862ca980

## [F-003/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-003
- status: resolved
- note: points: 6 -> 0 per the maintainer's decision (0 = no point value printed); dated sitting questions untouched.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta re-check of a points change: git diff shows only the points line changed; SOA ASTAM sample questions and solutions PDFs searched for 'point'/'points'/'marks' (none), Q14 p.19 read
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q14, p.19, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q14, pp.27-28, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Delta pass after points 6 -> 0; confidence kept at high.
