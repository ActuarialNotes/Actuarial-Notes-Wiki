---
target: Concepts/Sufficiency.md
created: 2026-10-05
---

## [F-001] 'An MLE is always a function of a sufficient statistic' omits the uniqueness condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullet 4, line 24
- claim: A [[Maximum Likelihood Estimation|MLE]] is always a function of a sufficient statistic, so it automatically satisfies the sufficiency criterion
- evidence: Siegrist, Random §6.6 (point/Sufficient.html): 'Suppose that U is sufficient for theta and that there exists a maximum likelihood estimator of theta. Then there exists a maximum likelihood estimator V that is a function of U' - one such MLE exists, not 'always'; the following paragraph applies it to 'the unique maximum likelihood estimator'. When the MLE is not unique the claim fails: Siegrist §6.3 (point/Likelihood.html), uniform on [a, a+1]: 'Any statistic V in [X_(n) - 1, X_(1)] is a maximum likelihood estimator of a', and §6.6 gives (X_(1), X_(n)) as minimally sufficient for a; so V = X_(n) - 1 + (1 + X_(1) - X_(n)) * 1{X_1 > X_2} is an MLE that is not a function of (X_(1), X_(n)) (rank-5 construction from the sourced facts). The syllabus section is Hogg §7.3 'Properties of a Sufficient Statistic' (contents only - the text was not read).
- source_rank: 3
- proposed_action: Add the condition: 'If the MLE is unique, it is a function of any sufficient statistic (and an MLE that is a function of T can always be chosen)'. Not applied - the fix is new wording.
- applied: false
- fingerprint: ea09a4fe7429
