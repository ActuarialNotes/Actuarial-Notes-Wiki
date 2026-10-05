---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:30b0c6b0e89d28f152a5ca117be7d7310c95e520a855a07c66f0ee23fdf034fb
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), Ch 5 intro (PDF p.206), §5.2 eq. 5.8 and Fig. 5.11 (PDF pp.218-221), §5.3.4 (PDF p.227), Ex. 5.4.2 (PDF p.228), §8.2.1 'around two-thirds of the observations' (PDF p.350), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide, CAS Monograph 4 (2016), §3.2 (PDF pp.19-20), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Orloff & Bloom, MIT 18.05 Class 24 'Bootstrap confidence intervals' (prep-a), §§5-6 empirical bootstrap (PDF pp.3-4), sha256:b3d7018c2214a25a7090228e8e0fa8e500922d6eb3fef4e52e5f08962e1dd948 — https://math.mit.edu/~dav/05.dir/class24-prep-a.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bootstrap.md
---

The **bootstrap** estimates the sampling variability of a statistic by resampling the observed data *with replacement* $B$ times and looking at the spread of the statistic across the resamples. It needs no distributional assumption and no formula for the standard error.

> $$\mathrm{SE}_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1}\sum_{r=1}^{B}\left(\hat{\alpha}^{*r} - \bar{\hat{\alpha}}^{*}\right)^{2}}$$

- Each bootstrap sample has the **same size $n$** as the original, drawn with replacement — so some observations appear several times and others not at all
- The probability a given observation misses a particular resample is $\left(1 - \tfrac1n\right)^n \to e^{-1} \approx 0.368$, so each resample uses about **63.2%** of the distinct observations. Those left out are the [[Out-of-Bag Error|out-of-bag]] set
- It is the resampling engine underneath [[Bagging]] and [[Random Forest]]
- Distinct from [[Cross-Validation]]: the bootstrap measures *how variable an estimate is*, cross-validation measures *how well a model predicts*
- Not the reserving bootstrap of Exam 7: the [[ODP Bootstrap Model]] samples with replacement from the Pearson residuals of an over-dispersed Poisson model fitted to a loss triangle and builds pseudo triangles from them, rather than resampling the observations themselves

![[Media/Figures/Bootstrap.svg|340]]

> [!example]- Bootstrapping a Tail Quantile {Example}
> An actuary needs a standard error for the 95th percentile of a 250-claim severity sample. No parametric fit is assumed. How is it obtained, and roughly how many claims does each resample actually use?
>
> > [!answer]-
> > Draw $B = 1{,}000$ samples of 250 claims with replacement, compute the 95th percentile of each, and take the standard deviation of those 1,000 values — that is $\mathrm{SE}_B$.
> > Each resample contains about $0.632(250) \approx 158$ **distinct** claims; the remaining ~92 are duplicates of ones already drawn.
