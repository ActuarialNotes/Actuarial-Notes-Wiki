---
target: Concepts/Logistic Regression.md
created: 2026-10-04
---

## [F-001] Binomial overdispersion said not to be a scale to estimate; deviance-vs-df check stated without the grouped-data condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 2 (canonical link and dispersion), line 21
- claim: The logit is the canonical link for the binomial, and the Dispersion Parameter is fixed at phi = 1; a residual Deviance far above its degrees of freedom signals overdispersion or a missing term rather than a scale to estimate.
- evidence: Larsen, 'Generalized Linear Models', CAS Study Note (MAS-I reading) p.1: over-dispersion 'is also mentioned in the case of the Binomial distribution where the variance observed is larger than the variance calculated using the Binomial distribution formula as described in section 7.7' [of Dobson & Barnett], and 'Through the quasi-likelihood approach, one can solve for a constant of proportionality between the mean and variance at the same time one solves for the betas' — i.e. the remedy the syllabus reading names *is* a scale to estimate, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. Rodriguez, GLM notes App. B sec.B.4.3 (PDF p.11): the binomial deviance has an asymptotic chi-square distribution 'for grouped data ... as n_i -> infinity for all i, and can be used as a goodness of fit test' — for ungrouped 0/1 responses comparing the residual deviance with its df is not a valid overdispersion check, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf. The first half of the bullet (logit canonical, phi = 1 for the binomial) is right: Larsen p.3 table; Rodriguez B.4.1.
- source_rank: 2
- proposed_action: Delete 'rather than a scale to estimate' (Larsen's quasi-likelihood remedy estimates one) and add the condition that the deviance-vs-df comparison applies to grouped binomial data.
- applied: false
- fingerprint: b3e2a9f64eff
