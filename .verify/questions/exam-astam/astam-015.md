---
target: questions/exam-astam/astam-015.md
created: 2026-10-23
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q15, p.20, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q15, pp.29-30, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: Pareto(4, 500); beta* = 1.5(5/6)^4 = 0.72338; Pareto(4, 600) per payment; f0..f2 0.15065, 0.22505, 0.15521; g0..g2 0.38369, 0.07738, 0.06507; Pr[S <= 100] 0.52614. All agree. Stem matches p.20; solutions pp.29-30 row for row.

## [F-001] Question points not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gave points: 5, its number of parts, as if the SOA printed a point value.
- evidence: SOA ASTAM Sample Questions (version of Feb. 23, 2026), sha256:0294cf4e8717…: 'point' occurs nowhere in the 31-page text layer (no OCR or image pages), and Q15 on p.20 carries no '(N points)' heading or per-part value (p.12, Q7, page image read); the solutions PDF (47 pages, sha256:c4206394603c…) has no 'points' either. The 5 equals the file's 5 parts, a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer's decision: set points: 0, which the app reads as 'no point value printed' and times or sizes by the paper's pace.
- applied: true
- fingerprint: 94a471c4f9ed

## [F-001/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-001
- status: resolved
- note: points: 5 -> 0 per the maintainer's decision (0 = no point value printed); dated sitting questions untouched.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: high
- checks_run: delta re-check of a points change: git diff shows only the points line changed; SOA ASTAM sample questions and solutions PDFs searched for 'point'/'points'/'marks' (none), Q15 p.20 read
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q15, p.20, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q15, pp.29-30, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Delta pass after points 5 -> 0; confidence kept at high.
