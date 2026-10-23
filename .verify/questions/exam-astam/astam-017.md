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
