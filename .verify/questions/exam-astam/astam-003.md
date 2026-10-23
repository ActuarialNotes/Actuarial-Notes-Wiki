---
target: questions/exam-astam/astam-003.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, beta-hat_0 line
- claim: The BF weight is written beta0 = 1/(f0 x f1 x ... f4) while part (b) numbers the same factors f1..f5, with no marker.
- evidence: SOA ASTAM sample solutions p.7 labels the five age-to-age factors f1..f5 (f1 = 1.50735 ... f5 = 1.01351) and p.8 prints beta0 = 1/(f0 x f1 x ... f4) = 0.54469: the same product under shifted indices. Value checked: 1/(1.50735 x 1.11224 x 1.05286 x 1.02621 x 1.01351) = 1/1.835912 = 0.54469. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: da57512deb3d

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
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q3, pp.6-7, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q3, pp.7-8, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: EP 5,800, LR reserve 2,140; volume-weighted factors 1.50735, 1.11224, 1.05286, 1.02621, 1.01351; total OCR 3,079.0; paid in 2021 3,920; BF beta0 0.54469, AY2021 OCR 2,112.7. All agree. Stem matches the current (Feb. 23, 2026) question PDF, whose version note fixed a typo in the first table. One SOA slip (f-index shift) marked.
