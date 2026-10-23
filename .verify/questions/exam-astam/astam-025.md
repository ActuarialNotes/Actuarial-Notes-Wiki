---
target: questions/exam-astam/astam-025.md
created: 2026-10-23
---

## [F-001] SOA printed slip kept as printed; marker added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation
- claim: The asymptotic variance is written as the inverse of -dl/d(alpha) (a first derivative) with no marker.
- evidence: SOA ASTAM sample solutions p.47 prints Var(alpha-hat) = [-dl(alpha)/d alpha]^{-1} = [n/alpha^2]^{-1} = alpha^2/n; the information is minus the second derivative, -d^2 l/d alpha^2 = n/alpha^2, which is what the next step uses. The result alpha^2/n is right (recomputed). Kept as printed; "(as printed)" added.
- source_rank: 1
- proposed_action: Keep as printed with an (as printed) marker (P1).
- applied: true
- fingerprint: 403f05e71a7c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked "(as printed)" in place in this run; the text matches the SOA page.

## [F-002] SOA model solution drops a square in the delta-method variance; the printed (d)(ii) and (d)(iii) answers do not follow
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- severity: major
- status: open
- locus: Part d, explanation, Var(g(alpha-hat)) and the 95% interval for mu
- claim: Explanation gives Var(g(alpha-hat)) = (1/n)(100 alpha-hat/(alpha-hat - 1))^2 and the interval 100/(alpha-hat - 1) +/- 1.96 (1/sqrt n)(100 alpha-hat/(alpha-hat - 1)), as the SOA printed them.
- evidence: SOA ASTAM sample solutions p.47 prints both expressions with (alpha-hat - 1) to the first power (rank 1), immediately after printing dg/d alpha = -100/(alpha - 1)^2 itself. Independent recomputation (rank 5): Var(alpha-hat)(dg/d alpha)^2 = (alpha^2/n)(100/(alpha - 1)^2)^2 = (1/n)(100 alpha/(alpha - 1)^2)^2, so se = 100 alpha-hat/(sqrt(n)(alpha-hat - 1)^2). The printed final answers to (d)(ii) and (d)(iii) are therefore off by a factor (alpha-hat - 1). Listed in content-plan Appendix A.6 as a slip, but it changes these parts' final answers. Both rows now carry "(as printed)" (added in this run); the conflict is logged and the answer is not changed.
- source_rank: 1
- proposed_action: Maintainer decision: keep as printed with the markers, or add an editorial note giving the corrected variance (1/n)(100 alpha-hat/(alpha-hat - 1)^2)^2 and interval.
- applied: false
- fingerprint: 58c89bd92e63

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/0b13
- date: 2026-10-23
- status_set: in_review
- checks_run: independent recomputation of every computed part before reading the key and solution; stem, table and formula diff against the 130-dpi page images of the question PDF; explanation diff against the solution page images (method, figures, arithmetic, align* rows); frontmatter (type multi-part, wiki_link targets and topic page exist, validate_content.py passes)
- sources_checked: SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q25, p.31, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf; SOA ASTAM Solutions to Sample Questions, Q25, p.47, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf
- note: Stem matches p.31 and the explanation matches p.47. Recompute agrees for (a)-(c) and (d)(i): alpha-hat = n/(Sum log(x_i + 100) - n log 100), Var alpha^2/n, CI alpha-hat +/- 1.96 alpha-hat/sqrt n, mu-hat = 100/(alpha-hat - 1). It disagrees for (d)(ii)-(iii): the SOA drops the square on (alpha-hat - 1) in the delta-method variance, which Appendix A.6 lists as a slip, but it changes those parts' final answers. Major finding left open for a maintainer, so not verified. Three rows marked (as printed).
