---
target: Concepts/Poisson Regression.md
created: 2026-10-05
---

## [F-001] Omitting the exposure offset called a classic error; the Monograph's more common set-up models frequency with exposure as the weight
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: lead sentence (line 14) and bullet 2 'The exposure term ...' (line 21)
- claim: With log exposure entered as an offset, it is the standard model for claim Frequency. ... Leaving exposure out (or entering it as an ordinary predictor) is a classic error
- evidence: Monograph 5 sec.2.6 'Exposure Offsets' (printed pp.18-19, PDF pp.28-29): the logged-exposure offset in a claim-count model 'is distinct from modeling claims frequency, i.e., where the target variable is the number of claims divided by the number of exposures, which is the more common practice. In a frequency model, the number of exposures should be included as a weight, but not as an offset. In fact: a claim count model that includes exposure as an offset is exactly equivalent to a frequency model that includes exposure as a weight (but not as an offset)—that is, they will yield the same predictions, relativity factors and standard errors' (fn.5: true for the Poisson/ODP, not the negative binomial); sec.2.7.2 (printed p.21, PDF p.31): the GLM Poisson takes fractional values for claim frequency, 'In such instances it is usually appropriate to set the GLM weight to be the denominator of frequency'; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. Rodriguez ch.4 sec.4.3 (PDF p.10) uses log(exposure) as an offset for group totals, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf. So leaving exposure out of the linear predictor is the Monograph's 'more common practice' when the target is frequency weighted by exposure; it is an error only with a claim-count target. The page's bullet 6 (non-integer responses with weights) describes that alternative without connecting it. Entering log exposure as an estimated predictor is a different matter and is not disputed.
- source_rank: 3
- proposed_action: Qualify bullet 2: the offset is needed when the target is the claim count; with a frequency target (claims/exposure) exposure enters as the weight and not as an offset, and for the Poisson/ODP the two give identical predictions, relativities and standard errors (Monograph sec.2.6). Soften 'the standard model' in the lead.
- applied: false
- fingerprint: 8c17a5b798c0

## [F-002] Overdispersion read off deviance/df alone, without the lack-of-fit alternative
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 3 (line 22) and example 'Detecting Overdispersion' (lines 37-42)
- claim: when the residual Deviance far exceeds its degrees of freedom the data is overdispersed; example: deviance 1,840 on 600 df -> phi ~ 3.07, 'A dispersion near 3 instead of 1 means the counts are far more variable than Poisson allows — overdispersion.'
- evidence: Rodriguez ch.4 sec.4.2.2 (PDF pp.7-8): the Poisson deviance is approximately chi^2 on n-p df 'Thus, the deviance can be used directly to test the goodness of fit of the model' — a large value is lack of fit, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf. Rodriguez, 'Models for Count Data With Overdispersion' (2013, rev. 2022) sec.1 (PDF p.2): 'Normally one would consider a large value of Pearson's chi^2 as evidence of lack of fit. What we are doing here is treating that as pure error to inflate our standard errors. Obviously this requires a high degree of confidence in the systematic part of the model, so we can be reasonably sure that the lack of fit is not due to specification errors but just over-dispersion', sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf. Monograph 5 sec.2.7.2 (PDF p.31) ties overdispersion to risk variation 'not explained by our model's predictors'; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf. The vault's Logistic Regression page words the same check as 'overdispersion or a missing term'. The example's arithmetic is right (1840/600 = 3.07; sqrt = 1.75).
- source_rank: 3
- proposed_action: Add the condition: a deviance (or Pearson chi^2) well above its df indicates overdispersion only once the systematic part of the model is trusted; otherwise it signals lack of fit (a missing predictor or interaction, or a wrong link).
- applied: false
- fingerprint: 8f82a258b4c6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: model and rating-relativity interpretation vs ISLR sec.4.6.2; offset vs Rodriguez sec.4.3 and Monograph sec.2.6; V(mu) = mu, phi = 1, overdispersion sources and remedies vs Monograph sec.2.7.2 and Rodriguez c4a; tests vs Rodriguez sec.4.2.3; non-integer responses with weights vs Monograph sec.2.7.2; both examples recomputed (ln mu = -2.323, mu = 0.098; phi = 3.07, sqrt = 1.75); figure bars recomputed (0.100, 0.130, 0.196, 0.244); links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.6.2 'Poisson Regression on the Bikeshare Data' (log link, multiplicative coefficients, mean = variance, overdispersion footnote; printed pp.167-170, PDF pp.177-180); Rodriguez, GLM lecture notes (Princeton), ch.4 Poisson Models for Count Data, secs.4.2.2-4.2.3 (deviance, Pearson, tests) and 4.3 (offset) (PDF pp.7-10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion, secs.1-2 (quasi-Poisson, negative binomial) (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 exposure offsets vs weights (PDF pp.28-29); sec.2.7.2 Poisson, ODP and negative binomial (PDF pp.31-32)
- note: Two minor findings opened (F-001 offset-vs-weight framing; F-002 overdispersion read without the lack-of-fit caveat). Linked by the MAS-I exam page only.
