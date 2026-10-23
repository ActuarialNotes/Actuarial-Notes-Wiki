---
target: questions/exam-astam/astam-018.md
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
- claim: SBC for the negative binomial is written "= -424.5 - 5.99 = 30.49" with no marker.
- evidence: SOA ASTAM sample solutions p.34 prints "SBC = l(theta) - (2/2) ln400 = -424.5 - 5.99 = 30.49"; the arithmetic gives -430.49, which is the -430.5 in the stem table (questions p.23). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 125b3f278c1e

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
- locus: Part b, explanation
- claim: Explanation says "If H_1 is true then the test stat follows a Chi-Squared with 1 degree of freedom" with no marker.
- evidence: SOA ASTAM sample solutions p.34 prints "If H1 is true"; the likelihood ratio statistic is chi-square with 1 df under H0 (the Poisson), which is how the solution then uses it (T = 3.2 < 3.841, do not reject H0). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 135449442516

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
- locus: Part b, stem
- claim: Stem reads "H_1: population is a ZM Poison" with no marker.
- evidence: SOA ASTAM sample questions p.23, Q18(b), prints "ZM Poison" (Poisson meant). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 04bb0209b192

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-004] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e, explanation
- claim: Explanation offers "Geometric based on SBC, simplicity" with no marker.
- evidence: SOA ASTAM sample solutions p.34 prints "Geometric based on SBC"; in the stem table the best (largest) SBC is the ZM Geometric's -429.2, while the Geometric's -433.2 is the worst. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 9711c11b6426

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-004
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
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q18, p.23, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q18, p.34, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: NB SBC -430.49; LR statistic 3.2 < 3.841, do not reject H0; chi-square p-value bands 2.5-5%, 5-10%, <0.5%, 10-90%, 1-2.5%, 10-90% (exact 0.048, 0.070, 0.002, 0.26, 0.023, 0.29). Agree. (d) and (e) rest on judgment, hence medium. The stem table matches p.23 cell for cell. The SOA's three-line brace in (b) is set as an aligned chain. Four SOA slips marked.
