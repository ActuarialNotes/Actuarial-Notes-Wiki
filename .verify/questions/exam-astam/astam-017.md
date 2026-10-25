---
target: questions/exam-astam/astam-017.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation
- claim: Explanation defines Y = max(X, 1000) with no marker.
- evidence: SOA ASTAM sample solutions p.33 prints "Y = max(X,1000)"; a limit of 1000 makes Y = min(X, 1000) = X ^ 1000, which is what the next line computes: E[Y] = theta(1 - e^{-1000/theta}) = 960(0.64713) = 621.25 (recomputed 621.249). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: c4356abe1595

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
- locus: Part e, stem
- claim: Stem asks to "construct an approximate 80% confidence for E[Y]" with no marker.
- evidence: SOA ASTAM sample questions p.22, Q17(e), omits "interval" after "80% confidence". Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: e940ab693370

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-003] SOA model solution differentiates g(theta) with the wrong sign; the printed 80% interval does not follow
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: major
- status: open
- locus: Part e, explanation, g'(theta) line and the interval
- claim: Explanation gives g'(theta) = 1 - e^{-1000/theta} + (1000/theta)e^{-1000/theta}, g'(960) = 1.0147, V = 435.6^2 and the 80% CI (62.96, 1179.54), as the SOA printed them.
- evidence: The vault transcribes the SOA faithfully: sample solutions p.33 prints exactly this (rank 1). Independent recomputation (rank 5): g(theta) = theta(1 - e^{-1000/theta}) gives g'(theta) = 1 - e^{-1000/theta} - (1000/theta)e^{-1000/theta}; at theta = 960, 1 - 0.352866 - 1.041667(0.352866) = 0.279565, so SD[g] = 0.279565 x 429.33 = 120.02 and the 80% CI is 621.25 +/- 1.2816(120.02) = (467.4, 775.1), not (62.96, 1179.54). Conflict between the publisher's solution and recomputation logged; the vault's key is not changed. Not listed in content-plan Appendix A.6.
- source_rank: 1
- proposed_action: Maintainer decision on the answer: keep the SOA's solution as printed (now marked "(as printed)" on the g'(theta) row in this run) or add an editorial note giving the corrected derivative and interval (467.4, 775.1). The answer itself was not changed (P2: the publisher's solution is rank 1; the recompute can falsify but not replace it).
- applied: false
- fingerprint: 06f2ea5454ca

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: in_review
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q17, p.22, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q17, p.33, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Stem matches p.22 and the explanation matches p.33 row for row. Recompute agrees with the SOA for (a)-(d): theta-hat 960, V 184,320, SD 429.3, E[Y] 621.25. It disagrees in (e): the SOA differentiates theta(1 - e^{-1000/theta}) with a + sign, so its 80% interval (62.96, 1179.54) does not follow; the recompute gives (467.4, 775.1). Major finding left open for a maintainer, so not verified. The three align* rows the linter once split now read as the SOA printed them. Three SOA slips marked (two in Appendix A.6, plus the derivative row now carrying the marker).

## [F-004] Question points not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gave points: 5, its number of parts, as if the SOA printed a point value.
- evidence: SOA ASTAM Sample Questions (version of Feb. 23, 2026), sha256:0294cf4e8717…: 'point' occurs nowhere in the 31-page text layer (no OCR or image pages), and Q17 on p.22 carries no '(N points)' heading or per-part value (p.12, Q7, page image read); the solutions PDF (47 pages, sha256:c4206394603c…) has no 'points' either. The 5 equals the file's 5 parts, a converter default rather than a transcribed figure.
- source_rank: 1
- proposed_action: Maintainer's decision: set points: 0, which the app reads as 'no point value printed' and times or sizes by the paper's pace.
- applied: true
- fingerprint: 94a471c4f9ed

## [F-004/R] points set to 0
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-004
- status: resolved
- note: points: 5 -> 0 per the maintainer's decision (0 = no point value printed); dated sitting questions untouched.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:writer
- run_id: 2026-10-25T14:24Z/0282
- date: 2026-10-25
- resolves: F-003
- status: resolved
- note: Maintainer decision applied: an editor's note now sits immediately after the SOA's part (e) interval, giving the corrected derivative g'(theta) = 1 - e^{-1000/theta} - (1000/theta)e^{-1000/theta}, g'(960) = 0.2796, V = 0.2796^2(184,320) = 14,406 = 120.0^2 and the 80% interval 621.25 +/- 1.2816(120.0) = (467.4, 775.1). Re-derived by the writer before writing: e^{-1000/960} = 0.352866, g' = 0.279565, SD 120.024, interval (467.43, 775.07) with z = 1.2816 ((467.6, 774.9) with the SOA's 1.28). SOA's text, figures and (as printed) markers unchanged; checked against SOA ASTAM Solutions to Sample Questions, Q17, p.33 (rendered), sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:34Z/a780
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: checker for the writer's run 2026-10-25T14:24Z/0282: editor's note figures re-derived independently before reading the writer's working; note checked for accuracy, length, marking and placement directly after the passage it corrects; git diff HEAD confirms only the note (and agent soa-residue's points: line, already recorded) changed, publisher text, key and figures untouched; source pages re-rendered and read this session
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q17, p.22, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q17, p.33, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Re-derived: g(theta) = theta(1 - e^{-1000/theta}) differentiates to 1 - e^{-1000/theta} - (1000/theta)e^{-1000/theta}; at 960, e^{-1000/960} = 0.352866, g' = 0.279565 (the SOA's + sign gives 1.014703, its 1.0147), V = 0.279565^2 x 184,320 = 14,405.8, SD 120.02, 80% CI with z = 1.2816 (467.43, 775.07), so the note's (467.4, 775.1) is right. The note's displayed 0.2796^2(184,320) multiplies to 14,409; its 14,406 is the unrounded product, within the note's approximation. Stem matches p.22 (rendered) and every SOA row of the explanation matches p.33 (rendered), (as printed) markers intact. Medium: part (e)'s correction rests on recomputation against the SOA's printed solution.
