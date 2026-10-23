---
target: questions/exam-astam/astam-007.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, E[(Y*)^2] line
- claim: Explanation prints "- 2d(2722.8 + 3000) + d^2" with no marker.
- evidence: SOA ASTAM sample solutions p.17 prints 2722.8, but part (b) (p.16) gives 2722.38 and the next line's 34,334,283 = 2(3000)(5722.38); 2(3000)(5722.8) would be 34,336,800. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 7668c7ebb8ae

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation
- claim: Explanation equates "6899.94 = (1 - alpha)42,702.94" with no marker.
- evidence: SOA ASTAM sample solutions p.17 prints 6899.94 in (d) while (b) on p.16 prints E[S*] = 6,899.98 (recomputed 6,899.98). alpha = 0.8384 either way. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 03f71b2a51bb

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-003] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation
- claim: Explanation prints "SD[S] = 12,784.7" with no marker.
- evidence: SOA ASTAM sample solutions p.17 prints SD[S] = 12,784.7; sqrt(50 x 3,269,017) = 12,784.79, which rounds to 12,784.8. SD[S*] = 2065.8 is unaffected. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 2cc467907b55

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-003
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
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q7, p.12, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q7, pp.16-17, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: 2.5345 claims; E[Y*|Y*>0] 2,722.38; E[S*] 6,899.98; net 35,803.0; SD[S*] 8,071.2; alpha 0.8384; SD of proportional cession 2,065.8. All agree. Stem and the (a) identity match p.12; solutions pp.16-17 match row for row. Three SOA rounding slips marked.
