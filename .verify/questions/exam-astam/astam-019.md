---
target: questions/exam-astam/astam-019.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, first sentence
- claim: Stem reads "a sample of size with complete individual data" with no marker.
- evidence: SOA ASTAM sample questions p.24, Q19, prints "a sample of size with complete individual data" (the sample size n is missing; the parts use n throughout). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: df988c984e98

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q19, p.24, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q19, pp.35-36, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Derivations checked: mu-hat = mean of log x; sigma-hat^2 = mean squared deviation; information diag(n/sigma^2, 2n/sigma^2) giving Cov diag(sigma^2/n, sigma^2/2n); delta-method Var = sigma^2 e^{2mu+sigma^2}/n + sigma^4 e^{2mu+sigma^2}/(2n). Agree with the SOA. Stem matches p.24; solutions pp.35-36. The SOA's mixed summation indices (i = 1..n over x_j) are kept as printed and unmarked as cosmetic. One SOA slip (missing n) marked.

## [F-002] Question points not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gave points: 4, its number of parts, as if the SOA printed a point value.
- evidence: SOA ASTAM Sample Questions (version of Feb. 23, 2026), sha256:0294cf4e8717…: 'point' occurs nowhere in the 31-page text layer (no OCR or image pages), and Q19 on p.24 carries no '(N points)' heading or per-part value (p.12, Q7, page image read); the solutions PDF (47 pages, sha256:c4206394603c…) has no 'points' either. The 4 equals the file's 4 parts, a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer's decision: set points: 0, which the app reads as 'no point value printed' and times or sizes by the paper's pace.
- applied: true
- fingerprint: f3177e679e2a

## [F-002/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-002
- status: resolved
- note: points: 4 -> 0 per the maintainer's decision (0 = no point value printed); dated sitting questions untouched.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta re-check of a points change: git diff shows only the points line changed; SOA ASTAM sample questions and solutions PDFs searched for 'point'/'points'/'marks' (none), Q19 p.24 read
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q19, p.24, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q19, pp.35-36, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Delta pass after points 4 -> 0; confidence kept at high.
