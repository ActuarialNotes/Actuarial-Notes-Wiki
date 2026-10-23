---
target: questions/exam-astam/astam-012.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation
- claim: The test statistic is written (0.9956 - 1)/0.0638 = -0.06886 with no marker.
- evidence: SOA ASTAM sample solutions p.25 divides by 0.0638, but the stem table (questions p.17) gives se(gamma-hat) = 0.0639, and -0.06886 = -0.0044/0.0639 (with 0.0638 it would be -0.06897). The conclusion (|z| < 2, do not reject) is unaffected. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 215c638ed613

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
- locus: stem table, Burr XII log-likelihood
- claim: The Burr XII maximised log-likelihood is -3526.253, lower than the Pareto's -3515.941, with no marker.
- evidence: SOA ASTAM sample questions p.17 prints -3526.253 for the Burr XII and -3515.941 for the Pareto. The stem itself says the Pareto is the Burr XII with gamma fixed at 1, so the Burr XII maximum cannot be below the Pareto's (and gamma-hat = 0.9956 is near 1). The SOA solution (p.25) uses -3526.253 in its SBC and reaches -3535.67; the choice of the Pareto stands either way. Not listed in content-plan Appendix A.6. Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 7a8354ef95dc

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q12, p.17, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q12, p.25, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Recomputed: z = (0.9956 - 1)/0.0639 = -0.06886, do not reject gamma = 1; SBC(Pareto) = -3522.22, SBC(Burr) = -3535.67, prefer the Pareto. Agree. (a), (b), (e) are prose, transcribed verbatim from p.25, hence medium. (a) asks for four steps and the SOA lists five, which is not an error in what it states, so no marker. Two SOA slips marked: se 0.0638, and the stem's Burr log-likelihood below the nested Pareto's (not in Appendix A.6).
