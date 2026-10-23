---
target: questions/exam-astam/astam-2023f-q2.md
created: 2026-10-23
---

## [F-001] Solution part letters re-filed without the SOA's labels
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Parts c-f explanations
- claim: The vault labels the Pareto proof '(i)' and the Weibull, limit and Gumbel solutions '(i)', unlabelled and unlabelled.
- evidence: Solutions PDF pp.5-6: the Pareto proof is unlabelled ('For the Pareto distribution with alpha > 1'), then '(ii) The hazard rate'; the Weibull answer is labelled '(c)(i)', the survival-function limit '(d)' and the Gumbel answer '(e)', one letter behind the question’s (d), (e), (f) (booklet p.4). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 77ce6ebfc355

## [F-002] Missing X subscript in the SOA proof not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation, y-substitution line
- claim: The line has (theta + d + y)^{alpha+1} with no note.
- evidence: Solutions PDF p.5 prints (theta + d + y)^{alpha+1} where the lines around it have theta_X. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 5f9cc8d0e616

## [F-003] Wrong denominator expansion in the SOA limit not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part e explanation, second line of the limit
- claim: The denominator reads 2 theta_X theta_Y y^2 + theta_X y^4 with no note.
- evidence: Solutions PDF p.6 prints this; (theta_X + theta_Y y^2)^2 = theta_X^2 + 2 theta_X theta_Y y^2 + theta_Y^2 y^4. The conclusion (limit = infinity, X heavier-tailed) is unaffected; recompute agrees. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 483e2f9339ba

## [F-004] Examiners' 'maximum excess loss formula' not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c examiner report
- claim: The comment reads 'a proof of the maximum excess loss formula' with no note.
- evidence: Solutions PDF p.7 prints 'maximum excess loss formula' (mean meant). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 362a8bb68de4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Restored the SOA’s labels as printed under the parts they answer: Pareto proof unlabelled; '(c)(i)', '(d)', '(e)' each marked '(as printed)'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-004
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Fall 2023, question booklet, Q2, p.4, sha256:94277623c3540e1ab20e885d53ae2c5a1e1290e3e1061dc162aa832e8e3efd92 — https://www.soa.org/globalassets/assets/files/edu/2023/fall/exams/fall-2023-astam-exam.pdf; SOA ASTAM Fall 2023 Model Solutions (revised February 20, 2024), Q2, pp.5-7, sha256:0e43330341132ce0ac5392dd785e2897506886c307700d7bdd5c03f55b57502c — https://www.soa.org/globalassets/assets/files/edu/2023/fall/solutions/astam-fall-2023-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: proofs and limits checked; tau <= 1 heavy; X heavier. 4 SOA printed slip(s) marked '(as printed)'.
