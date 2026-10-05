---
target: Concepts/Method of Moments.md
created: 2026-10-05
---

## [F-001] Says MoM never uses the sufficient statistic; in many models it is a function of it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 4, line 23
- claim: MoM does not use the [[Sufficient Statistic]] structure of the model, which is exactly why information is left on the table
- evidence: Siegrist, Random §6.6 (point/Sufficient.html) supports this for some models - for the gamma (k, b) and the beta the MoM estimators 'are not functions of the sufficient statistics and hence suffer from loss of information' - but in others the MoM estimator is a function of the (complete) sufficient statistic: Bernoulli (M is sufficient and is the MoM estimator of p), Poisson (M), normal ((M, T^2) is minimally sufficient and is the MoM pair), gamma with known shape (M/k is both the MoM estimator and the MLE). In those models MoM leaves nothing on the table, so stated as a general property the bullet is too strong.
- source_rank: 3
- proposed_action: Narrow it: MoM is not built from a sufficient statistic, so in some models (gamma, beta) it discards information, while in others (Poisson, Bernoulli, normal) it coincides with a function of the sufficient statistic. Not applied - the fix is new wording.
- applied: false
- fingerprint: ff40edb8703a
