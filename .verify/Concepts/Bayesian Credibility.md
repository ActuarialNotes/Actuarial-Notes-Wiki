---
target: Concepts/Bayesian Credibility.md
created: 2026-10-18
---

## [F-001] Exactness claimed for every conjugate pair
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: first two bullets
- claim: When the prior and likelihood form a conjugate pair, the posterior mean is linear and Bayesian = Bühlmann; 'they agree for conjugate priors'.
- evidence: LDA §9.5.3: exact credibility 'may occur if the probability distribution for X_j is in the linear exponential family and the prior distribution is a conjugate prior'; Tse §8.4 is titled 'Linear exponential family and exact credibility'. Conjugacy alone does not give linearity (e.g. uniform(0, theta) with a Pareto prior is conjugate, and its posterior mean depends on max x_i, not on x̄).
- source_rank: 3
- proposed_action: Restate the condition as linear-exponential-family likelihood with its conjugate prior.
- applied: true
- fingerprint: f7a334aa57c8

## [F-002] Gamma parameterisation differs between table and example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- severity: minor
- status: open
- locus: conjugate-pairs table, Poisson row; example
- claim: Table: Gamma(alpha, beta) → Gamma(alpha + sum x, beta + n); example: prior Gamma(2, 0.5) with mean 2 × 0.5 = 1.
- evidence: The table's update is the rate form (LDA §9.5.1: pi(lambda) ∝ lambda^(alpha−1) e^(−beta lambda), posterior (alpha + sum x, beta + n), 'a rate parameter beta is being used'), while the example's Gamma(2, 0.5) is a scale (LDA §4.4.4 form). Read in the table's notation the example's prior would have mean 4. The answer handles the conversion, but the table does not say which form it uses.
- source_rank: 3
- proposed_action: Label the table's beta as a rate.
- applied: true
- fingerprint: 31e5d271cf9c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to 'When the likelihood is in the linear exponential family and the prior is its conjugate …' and '… they agree in these cases', per LDA §9.5.3.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Table entry now reads 'Gamma(alpha, beta), rate beta', per LDA §9.5.1.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:09Z/2f99
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: posterior ∝ likelihood × prior and posterior-mean estimate against LDA §9.5; gamma-Poisson (rate) and beta-binomial updates against LDA §§9.5.1–9.5.2; example recomputed (scale 0.5 → rate 2; posterior Gamma(5, rate 5), mean 1; Z = 3/5)
- sources_checked: Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html; Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html; Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf; CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Checked against LDA Ch. 9 §9.5 and Ch. 4 §4.4.4 (Tse §§8.1–8.2 counterpart). Two minor findings fixed and resolved. Confidence capped at medium (decision D7): the assigned reading, Tse Chs 6–9, is commercial and its free Cambridge preview carries only the front matter and Ch. 1 (its contents pages fix the section titles); the page was checked against Loss Data Analytics, an open text covering the same ground. Mahler & Dean (Foundations ch. 8) could not be found as a free CAS-hosted copy (casact.org's Foundations 4th-ed. page links no chapter PDF; the old soa.org C-21-01 link is 404).
