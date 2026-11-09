---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:55db658825af7f23d1610c969fbba17b3707555c0bcd66331cf9c6a6f95cfb67
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), Ch 5 intro (PDF p.206), §5.2 eq. 5.8 and Fig. 5.11 (PDF pp.218-221), §5.3.4 (PDF p.227), Ex. 5.4.2 (PDF p.228), §8.2.1 'around two-thirds of the observations' (PDF p.350), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide, CAS Monograph 4 (2016), §3.2 (PDF pp.19-20), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Orloff & Bloom, MIT 18.05 Class 24 'Bootstrap confidence intervals' (prep-a), §§5-6 empirical bootstrap (PDF pp.3-4), sha256:b3d7018c2214a25a7090228e8e0fa8e500922d6eb3fef4e52e5f08962e1dd948 — https://math.mit.edu/~dav/05.dir/class24-prep-a.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bootstrap.md
---

![[Media/Figures/Bootstrap.svg|340]]

A **Bootstrap** is a method of estimating the [[Sampling Distribution|sampling distribution]] of a statistic by drawing many samples from the observed data and computing the statistic on each. In the nonparametric bootstrap, each bootstrap sample is $n$ values drawn with replacement from the $n$ observed values, so some observations appear more than once and others not at all. The statistic computed on the $r$th bootstrap sample is the bootstrap estimate $\hat{\alpha}^{*r}$, for $r = 1, 2, \ldots, B$. The bootstrap standard error of the estimator $\hat{\alpha}$ is the sample standard deviation of the $B$ bootstrap estimates:

> $$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\hat{\alpha}}^{*}\right)^{2}}$$

- $\bar{\hat{\alpha}}^{*}$ is the mean of the $B$ bootstrap estimates.

The bootstrap needs no assumption about the distribution of the data and no formula for the standard error. It measures how variable an estimate is. [[Cross-Validation|Cross-validation]] instead measures how well a model predicts.

> [!example]- Five bootstrap samples of a claim sample give sample means of 10.2, 11.0, 9.6, 10.8 and 10.4. What is the bootstrap standard error of the sample mean? {Example}
> - The mean of the five bootstrap estimates is $52/5 = 10.4$.
> - Their deviations from 10.4 are $-0.2$, $0.6$, $-0.8$, $0.4$ and $0$, whose squares add up to 1.2.
> - The bootstrap standard error is $\sqrt{1.2/4} = 0.548$.

## Observations left out of a bootstrap sample

Each draw misses a given observation with probability $1 - 1/n$, so the probability that the observation is not in a bootstrap sample is

> $$\left(1 - \frac{1}{n}\right)^n$$

For large $n$ this is close to $e^{-1} = 0.368$, so a bootstrap sample holds about 63.2% of the distinct observations. The observations left out are the out-of-bag observations used to estimate the error of [[Bagging|bagging]] ([[Out-of-Bag Error|out-of-bag error]]).

> [!example]- A bootstrap sample of 250 claims is drawn with replacement from 250 claims. What is the probability that a given claim is not in it, and how many distinct claims does it hold on average? {Example}
> - The probability that a given claim is not drawn is $(1 - 1/250)^{250} = 0.367$.
> - On average the sample holds $250(1 - 0.367) = 158$ distinct claims.

## The bootstrap in other exams

A model's parameter stability can be checked by refitting it to many bootstrap samples of the data and comparing the coefficient estimates, their means, standard errors and confidence intervals. A bootstrap of observed losses builds an empirical distribution of losses, so no parametric distribution has to be chosen. The [[ODP Bootstrap Model|ODP bootstrap model]] of loss reserving resamples the residuals of a model fitted to a loss triangle rather than the observations themselves.
