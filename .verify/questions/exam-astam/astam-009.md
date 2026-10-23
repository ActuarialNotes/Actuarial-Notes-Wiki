---
target: questions/exam-astam/astam-009.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation, assumption 2
- claim: Assumption 2 reads Var[X_ij | theta_j] x m_ij = v(theta_i) with no marker.
- evidence: SOA ASTAM sample solutions p.19 prints the conditioning variable as theta_j in assumption 2 (theta_i meant; the derivation below it and assumption 1 condition on theta_i). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: be6a1b11c4f5

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
- locus: Part c, stem (ii)
- claim: Stem says the weights in the estimator for mu "are proportional to Var[X-bar_i]" with no marker.
- evidence: SOA ASTAM sample questions p.14, Q9(c)(ii), prints "proportional to Var[X-bar_i]"; the Buhlmann-Straub weights Z_i are inversely proportional to Var[X-bar_i] (Var[X-bar_i] = a + v/m_i, Z_i = a/(a + v/m_i)). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 0ae1b87b8846

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
- locus: Part c, explanation (ii)
- claim: Explanation says the weights are "approximately equal to the variance of each estimate" with no marker.
- evidence: SOA ASTAM sample solutions p.20 prints "weights are approximately equal to the variance of each estimate"; a minimum-variance weighted average of unbiased estimates weights each by the inverse of its variance (the same slip as the stem's (c)(ii), not in content-plan Appendix A.6). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: f06c90554dc9

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
- confidence: medium
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q9, p.14, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q9, pp.19-20, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Conceptual question; the derivations in (a) and (c)(i) were checked step by step and agree; (b)(ii)-(iv) and (c)(ii) are prose, transcribed verbatim from pp.19-20, hence medium. Stem matches p.14. Three SOA slips marked, one of them (solution (c)(ii), weights 'equal to the variance') not in Appendix A.6.
